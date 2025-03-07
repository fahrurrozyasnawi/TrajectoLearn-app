import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import DoubleLayer from '@components/layout/double-layer';
import {Text} from 'react-native-paper';
import DynamicSizeImage from '@components/media/DynamicSizeImage';

type Props = {};

const items = [
  {
    id: '1',
    source: require('../../assets/material/Gerak Harmonik/harmonik 11.jpg'),
  },
  {
    id: '2',
    source: require('../../assets/material/Gerak Harmonik/harmonik 12.jpg'),
  },
  {
    id: '3',
    source: require('../../assets/material/Gerak Harmonik/harmonik 13.jpg'),
  },
  {
    id: '4',
    source: require('../../assets/material/Gerak Harmonik/harmonik 14.jpg'),
  },
  {
    id: '5',
    source: require('../../assets/material/Gerak Harmonik/harmonik 21.jpg'),
  },
  {
    id: '6',
    source: require('../../assets/material/Gerak Harmonik/harmonik 22.jpg'),
  },
  {
    id: '7',
    source: require('../../assets/material/Gerak Harmonik/harmonik 23.jpg'),
  },
  {
    id: '8',
    source: require('../../assets/material/Gerak Harmonik/harmonik 24.jpg'),
  },
  {
    id: '9',
    source: require('../../assets/material/Gerak Harmonik/harmonik 31.jpg'),
  },
  {
    id: '10',
    source: require('../../assets/material/Gerak Harmonik/harmonik 32.jpg'),
  },
  {
    id: '11',
    source: require('../../assets/material/Gerak Harmonik/harmonik 33.jpg'),
  },
  {
    id: '12',
    source: require('../../assets/material/Gerak Harmonik/harmonik 34.jpg'),
  },
];

const HarmonicMove = (props: Props) => {
  return (
    <DoubleLayer>
      <Text variant="titleLarge" style={styles.title}>
        Materi Gerak Parabola
      </Text>
      <ScrollView>
        <View style={styles.container}>
          {items.map(item => (
            <DynamicSizeImage key={item.id} source={item.source} />
          ))}
        </View>
      </ScrollView>
    </DoubleLayer>
  );
};

export default HarmonicMove;

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
