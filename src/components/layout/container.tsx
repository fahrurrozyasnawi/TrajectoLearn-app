import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

type ContainerType = {
  style?: ViewStyle;
  children: React.ReactNode;
};

const Container: React.FC<ContainerType> = ({style, children}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
});

export default Container;
