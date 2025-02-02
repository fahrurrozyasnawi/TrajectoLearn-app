import Container from '@components/layout/container';
import {LessonsContext} from '@context/Lessons';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@routes/entity';
import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import Config from 'react-native-config';

const Home = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const {updateLessonType} = useContext(LessonsContext);
  console.log('config', Config.REACT_APP_URL_API);
  console.log('process env', process.env);

  return (
    <Container style={styles.container}>
      {listLesson.map(item => (
        <Card
          onPress={() => {
            // navigation.navigate('Lessons', {screen: item.title});
            updateLessonType(item.name);
            navigation.navigate(item.title as never);
          }}
          style={styles.card}
          key={item.title}>
          <Card.Title
            title={item.title}
            titleVariant="titleLarge"
            titleStyle={styles.title}
          />
          <Card.Cover source={item.img} />
        </Card>
      ))}
    </Container>
  );
};

const listLesson = [
  {
    title: 'Gerak Parabola',
    name: 'projectile-motion',
    img: require('../../assets/projectile-motion.png'),
  },
  {
    title: 'Gerak Harmonik',
    name: 'pendulum',
    img: require('../../assets/pendulum.png'),
  },
  {
    title: 'Viskositas',
    name: 'viscosity',
    img: require('../../assets/viscosity.png'),
  },
];

const styles = StyleSheet.create({
  container: {
    gap: 12,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  card: {
    // flexGrow: 1,
    // height: 90,
    width: '100%',
  },
});

export default Home;
