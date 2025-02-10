import HomeLayout from '@components/layout/home-layout';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@routes/entity';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';

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

        {/* <Text>{`Url api : ${process.env.REACT_APP_URL_API}`}</Text> */}
      </View>
    </HomeLayout>
  );
};

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
