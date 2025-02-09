import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Card, Text} from 'react-native-paper';

type Props = {
  children?: React.ReactNode;
  bgImg: ImageSourcePropType;
  containerStyle?: ViewStyle;
};

function HomeLayout({children, bgImg, containerStyle}: Props) {
  return (
    <ImageBackground source={bgImg} resizeMode="repeat" style={styles.bgImg}>
      <View style={styles.container}>
        <View style={styles.logoLayout}>
          <View style={styles.bgLogo}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
            />
          </View>
          <Text variant="displayMedium" style={styles.title}>
            TrajectoLearn App
          </Text>
          <Card style={[styles.cardLayout, containerStyle]}>{children}</Card>
        </View>
      </View>
    </ImageBackground>
  );
}

export default HomeLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    color: 'white',
    fontWeight: '800',
  },
  cardLayout: {
    marginTop: 20,
    justifyContent: 'center',
    padding: 24,
    height: 150,
    borderRadius: 32,
  },
  logoLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  bgLogo: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: '50%',
  },
  logo: {
    height: 70,
    width: 70,
  },
  bgImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
