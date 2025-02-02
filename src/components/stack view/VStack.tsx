import {View, Text, ViewStyle, StyleSheet} from 'react-native';
import React from 'react';

type VStackType = {
  style?: ViewStyle;
  children: React.ReactNode;
};

const VStack: React.FC<VStackType> = ({style, children}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
});

export default VStack;
