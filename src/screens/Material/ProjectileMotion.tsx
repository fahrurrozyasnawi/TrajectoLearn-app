import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import DoubleLayer from '@components/layout/double-layer';
import DynamicSizeImage from '@components/media/DynamicSizeImage';
import {Text} from 'react-native-paper';

type Props = {};

const items = [
  {
    id: '1',
    source: require('../../assets/material/Gerak Parabola/parabol materi 1.jpg'),
  },
  {
    id: '2',
    source: require('../../assets/material/Gerak Parabola/parabol materi 2.jpg'),
  },
  {
    id: '3',
    source: require('../../assets/material/Gerak Parabola/parabol materi 3.jpg'),
  },
];

const ProjectileMotion = (props: Props) => {
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

export default ProjectileMotion;

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
