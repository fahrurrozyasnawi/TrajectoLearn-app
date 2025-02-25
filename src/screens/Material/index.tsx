import DoubleLayer from '@components/layout/double-layer';
import DynamicSizeImage from '@components/media/DynamicSizeImage';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

type Props = {};

const Material = (props: Props) => {
  return (
    <DoubleLayer>
      <ScrollView>
        <Text variant="titleLarge" style={styles.title}>
          Materi
        </Text>
        <View style={styles.container}>
          <DynamicSizeImage
            source={require('../../assets/material/parabol materi.jpg')}
          />
          <DynamicSizeImage
            source={require('../../assets/material/Visko.jpg')}
          />
          <DynamicSizeImage
            source={require('../../assets/material/harmonik 1.jpg')}
          />
          <DynamicSizeImage
            source={require('../../assets/material/harmonik 2.jpg')}
          />
          <DynamicSizeImage
            source={require('../../assets/material/harmonik 3.jpg')}
          />
        </View>
      </ScrollView>
    </DoubleLayer>
  );
};

export default Material;

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
