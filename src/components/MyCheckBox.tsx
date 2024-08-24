import React, {useState} from 'react';
import {View, Pressable, Text} from 'react-native';
import {colors} from '../values/Colors';
import {wp} from '../values/ResposiveSizes';

interface MyCheckBoxProps {
  isSelected: boolean;
  size?: number;
  onPress: () => void;
  text?: string;
}

const MyCheckBox: React.FC<MyCheckBoxProps> = ({
  isSelected,
  size = 24,
  onPress,
  text = '',
}) => {
  const viewSize = size;
  const innerSize = size * 0.6;

  return (
    <Pressable
      style={{
        marginHorizontal: wp(2),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <View
        style={{
          height: viewSize,
          width: viewSize,
          borderRadius: 4, // Square shape
          borderWidth: 2,
          borderColor: colors.main.blue,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isSelected ? colors.main.light : '#fff',
        }}>
        {isSelected && (
          <View
            style={{
              height: innerSize,
              width: innerSize,
              borderRadius: 2, // Square shape
              backgroundColor: colors.main.green,
            }}
          />
        )}
      </View>
      <Text style={{fontWeight: '300', marginLeft: wp(1)}}> {text} </Text>
    </Pressable>
  );
};

export default MyCheckBox;
