import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {hp, wp} from '../values/ResposiveSizes';
import {colors} from '../values/Colors';

interface CharacterCardProps {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  status,
  species,
  gender,
  origin,
  location,
  image,
}) => {
  console.log('status', status);
  const RowText = ({title, value}: {title: string; value: string}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: wp(65),
        }}>
        <Text style={{fontWeight: 'bold'}}>
          {title}:{' '}
          <Text adjustsFontSizeToFit style={{fontWeight: 'thin'}}>
            {value}
          </Text>
        </Text>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.card,
        {
          borderColor:
            status === 'Alive'
              ? colors.main.borderAlive
              : status === 'Dead'
              ? colors.main.borderDead
              : 'transparent',
        },
      ]}>
      <View
        style={[
          styles.imageView,
          {
            backgroundColor:
              gender === 'Male'
                ? colors.main.male
                : gender === 'Female'
                ? colors.main.female
                : colors.main.otherGender,
          },
        ]}>
        <Image source={{uri: image}} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <RowText title="Status" value={status} />
        <RowText title="Species" value={species} />
        <RowText title="Gender" value={gender} />
        <RowText title="Origin" value={origin.name} />
        <RowText title="Location" value={location.name} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp(95),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1.5,

    padding: 10,
    margin: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: wp(20),
    width: wp(20),
    borderRadius: wp(10),
    // backgroundColor: colors.main.green,
  },
  image: {
    height: wp(18),
    width: wp(18),
    borderRadius: wp(9),
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CharacterCard;
