import DoubleLayer from '@components/layout/double-layer';
import HomeLayout from '@components/layout/home-layout';
import {LessonsContext} from '@context/Lessons';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@routes/entity';
import React, {useContext} from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';

type ListLesson = {
  title: string;
  name: string;
  img: any;
  desc?: string;
  color?: string;
};

const Home = () => {
  const navigation = useNavigation<RootNavigationProp>();

  return (
    <HomeLayout bgImg={require('../../assets/bg.jpg')}>
      <View style={styles.container}>
        <Button onPress={() => navigation.navigate('Lessons')} mode="contained">
          Menu
        </Button>
        <Button onPress={() => navigation.navigate('About')} mode="contained">
          About Us
        </Button>
      </View>
    </HomeLayout>
  );
};

const listLesson: ListLesson[] = [
  {
    title: 'Gerak Parabola',
    name: 'projectile-motion',
    img: require('../../assets/projectile-illustrate.png'),
    color: '#4930be',
    desc: 'Gerak parabola adalah gabungan antara gerak lurus beraturan (GLB) dan gerak lurus berubah beraturan (GLBB). Pengertian gerak parabola sendiri adalah gerak dua dimensi suatu benda yang bergerak membentuk sudut elevasi dengan sumbu x atau sumbu y.',
  },
  {
    title: 'Gerak Harmonik',
    name: 'pendulum',
    img: require('../../assets/pendulum-illustrate.png'),
    color: '#739bfd',
    desc: 'Gerak harmonik sederhana adalah gerak bolak - balik benda melalui suatu titik keseimbangan tertentu dengan banyaknya getaran benda dalam setiap sekon selalu konstan.',
  },
  {
    title: 'Viskositas',
    name: 'viscosity',
    img: require('../../assets/viscosity-illustrate.png'),
    color: '#f3cb39',
    desc: 'Viskositas atau disebut juga kekentalan adalah tingkat ketahanan suatu fluida terhadap tegangan yang diterimanya. Viskositas itu disebabkan oleh adanya gaya kohesi antar partikel fluida.',
  },
];

const styles = StyleSheet.create({
  container: {
    gap: 12,
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: 100,
  },
});

export default Home;
