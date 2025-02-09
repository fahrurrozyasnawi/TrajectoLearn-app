import React from 'react';
import {
  Dimensions,
  Image,
  ImageStyle,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Card} from 'react-native-paper';

type Props = {
  children?: React.ReactNode;
  bgImg?: 'home' | 'projectile-motion' | 'viscosity' | 'pendulum';
  bgHeight?: number;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
};

function DoubleLayer({
  children,
  bgImg = 'home',
  containerStyle,
  imageStyle,
  bgHeight = 5.5,
}: Props) {
  const img = listLesson.find(item => item.name === bgImg)?.img;
  return (
    <View style={styles.continer}>
      <Image
        source={img}
        style={[
          styles.bgImg,
          {height: Dimensions.get('window').height / bgHeight},
          imageStyle,
        ]}
      />
      <Card style={[styles.cardLayout, containerStyle]}>{children}</Card>
    </View>
  );
}

export default DoubleLayer;

const listLesson = [
  {
    name: 'home',
    img: require('../../assets/bg.jpg'),
  },
  {
    name: 'projectile-motion',
    img: require('../../assets/projectile-illustrate.png'),
  },
  {
    name: 'pendulum',
    img: require('../../assets/pendulum-illustrate.png'),
  },
  {
    name: 'viscosity',
    img: require('../../assets/viscosity-illustrate.png'),
  },
];

const styles = StyleSheet.create({
  continer: {
    flex: 1,
  },
  cardLayout: {
    // flex: 1,
    // zIndex: 20,
    marginTop: -24,
    paddingTop: 20,
    position: 'relative',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  bgImg: {
    width: '100%',
    objectFit: 'cover',
  },
});
