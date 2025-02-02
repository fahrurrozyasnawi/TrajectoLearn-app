import {View, Text, ViewStyle, StyleSheet} from 'react-native';
import React from 'react';

type HStackType = {
  style?: ViewStyle;
  children: React.ReactNode;
};

const HStack: React.FC<HStackType> = ({style, children}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default HStack;
