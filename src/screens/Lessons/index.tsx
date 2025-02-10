import DoubleLayer from '@components/layout/double-layer';
import {LessonsContext} from '@context/Lessons';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@routes/entity';
import React, {useContext} from 'react';
import {Dimensions, FlatList, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';

type ListLesson = {
  title: string;
  name: string;
  img: any;
  desc?: string;
  color?: string;
};

const Lessons = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const {updateLessonType} = useContext(LessonsContext);

  const renderCarouselItem = ({item}: {item: ListLesson}) => {
    return (
      <Card
        onPress={() => {
          updateLessonType(item.name);
          navigation.navigate(item.title as never);
        }}
        style={[styles.cardCarousel, {backgroundColor: item.color}]}>
        <Card.Title
          title={item.title}
          titleVariant="titleLarge"
          titleStyle={styles.title}
        />
        <Card.Cover source={item.img} />
      </Card>
    );
  };

  return (
    <DoubleLayer>
      <FlatList
        data={listLesson}
        renderItem={renderCarouselItem}
        keyExtractor={item => item.title}
        contentContainerStyle={styles.carouselContainer}
      />
    </DoubleLayer>
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
  bgImg: {
    height: Dimensions.get('window').height / 6,
    width: '100%',
    objectFit: 'cover',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    // marginBottom: 24,
  },
  flatlist: {
    flex: 1,
  },
  carouselContainer: {
    paddingHorizontal: 12,
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  cardCarousel: {
    width: Dimensions.get('window').width - 50,
  },
});

export default Lessons;
