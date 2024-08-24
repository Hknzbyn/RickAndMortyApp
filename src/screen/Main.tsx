import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getCharacters} from '../helper/Functions';
import {hp, wp} from '../values/ResposiveSizes';
import {colors} from '../values/Colors';
import CharacterCard from '../components/CharacterCard';
import MyCheckBox from '../components/MyCheckBox';
import {Character} from '../values/types'; // doğru yolu ayarlayın

function Main(): React.JSX.Element {
  const [data, setData] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(''); // alive, dead, uknown
  const [gender, setGender] = useState<string>(''); // male, female, genderless, unknown

  const fetchCharacters = async (pageNumber: number) => {
    try {
      const response = await getCharacters(pageNumber, status, gender);
      if (pageNumber > 1) {
        setData(prevData => [...prevData, ...response.results]);
      } else {
        setData(response.results);
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchCharacters(page);
  }, [page, gender, status]);

  const handleLoadMore = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  const FilterView = () => {
    const handleStatusChange = (newStatus: string) => {
      setStatus(prevStatus => (prevStatus === newStatus ? '' : newStatus));
      setPage(1);
      setLoading(true);
    };

    const handleGenderChange = (newGender: string) => {
      setGender(prevGender => (prevGender === newGender ? '' : newGender));
      setPage(1);
      setLoading(true);
    };

    return (
      <View style={styles.topView}>
        <View style={styles.checkboxContainer}>
          <Text style={styles.label}>Status</Text>
          <MyCheckBox
            isSelected={status === 'dead'}
            onPress={() => handleStatusChange('dead')}
            text="Dead"
          />
          <MyCheckBox
            isSelected={status === 'alive'}
            onPress={() => handleStatusChange('alive')}
            text="Alive"
          />
        </View>

        <View style={styles.checkboxContainer}>
          <Text style={styles.label}>Gender</Text>
          <MyCheckBox
            isSelected={gender === 'male'}
            onPress={() => handleGenderChange('male')}
            text="Male "
          />
          <MyCheckBox
            isSelected={gender === 'female'}
            onPress={() => handleGenderChange('female')}
            text="Female"
          />
          <MyCheckBox
            isSelected={gender === 'genderless'}
            onPress={() => handleGenderChange('genderless')}
            text="Genderless"
          />
        </View>

        <Button
          title="Reset"
          disabled={status === '' && gender === ''}
          onPress={() => {
            setStatus('');
            setGender('');
            setPage(1);
            setLoading(true);
          }}
        />
      </View>
    );
  };

  const ListView = () => {
    if (loading && page === 1) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading...</Text>
          <ActivityIndicator size="large" color={colors.main.blue} />
        </View>
      );
    }

    if (data.length === 0 && !loading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No data found</Text>
        </View>
      );
    }
    return (
      <ScrollView horizontal bounces={false}>
        <FlatList
          data={data}
          renderItem={({item}) => <CharacterCard {...item} />}
          keyExtractor={item => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator size="small" color={colors.main.blue} />
            ) : null
          }
        />
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <FilterView />
      <ListView />
    </View>
  );
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontWeight: '500',
    width: wp(15),
  },

  topView: {
    height: hp(15),
    width: wp(90),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderBottomWidth: 2,
    borderBottomColor: colors.main.border,
    // backgroundColor: colors.main.blue,
  },
  checkboxContainer: {
    width: wp(90),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: wp(2),
  },
});
