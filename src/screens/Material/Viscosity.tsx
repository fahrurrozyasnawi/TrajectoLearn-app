import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import DoubleLayer from '@components/layout/double-layer';
import {Text} from 'react-native-paper';
import DynamicSizeImage from '@components/media/DynamicSizeImage';

type Props = {};

const Viscosity = (props: Props) => {
  return (
    <DoubleLayer>
      <Text variant="titleLarge" style={styles.title}>
        Materi Viskositas
      </Text>
      <ScrollView>
        <View style={styles.container}>
          <DynamicSizeImage
            source={require('../../assets/material/Viskositas/Visko.jpg')}
          />
        </View>
      </ScrollView>
    </DoubleLayer>
  );
};

export default Viscosity;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingBottom: 12,
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
});
