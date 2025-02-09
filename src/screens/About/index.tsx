import DoubleLayer from '@components/layout/double-layer';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';

type Props = {};

const About = (props: Props) => {
  return (
    <DoubleLayer bgImg="home">
      <Text style={styles.title} variant="displaySmall">
        About Us
      </Text>

      <Card style={styles.aboutCard}>
        <View style={styles.mainText}>
          <Text variant="bodyLarge">
            Selamat datang di TrajectoLearn, aplikasi edukasi berbasis
            kecerdasan buatan yang memudahkan siswa memahami fisika secara
            interaktif dan menyenangkan.
          </Text>
          <Text variant="bodyLarge">
            Dikembangkan oleh Muhammad Khalil Sukur, Fatin Atikah Jafar, dan
            Yurmi Rengke, TrajectoLearn menyederhanakan konsep-konsep fisika
            seperti:
          </Text>
          <View style={styles.list}>
            <Text>
              <Text style={styles.titleList} variant="titleMedium">
                Gerak Parabola
              </Text>
              <Text variant="bodyLarge">
                : Mengukur lintasan, kecepatan, dan ketinggian.
              </Text>
            </Text>
          </View>
          <View style={styles.list}>
            <Text>
              <Text style={styles.titleList} variant="titleMedium">
                Gerak Harmonik Sederhana
              </Text>
              <Text variant="bodyLarge">
                : Menganalisis osilasi dan periode.
              </Text>
            </Text>
          </View>
          <View style={styles.list}>
            <Text>
              <Text style={styles.titleList} variant="titleMedium">
                Viskositas
              </Text>
              <Text variant="bodyLarge">: Menghitung nilai viskositas.</Text>
            </Text>
          </View>

          <Text variant="bodyLarge">
            Dengan antarmuka yang user-friendly dan teknologi AI, TrajectoLearn
            membuat belajar fisika lebih mudah dipahami dan menyenangkan.
          </Text>

          <Text style={styles.slogan} variant="titleLarge">
            TrajectoLearn - Solusi Cerdas untuk Belajar Fisika!
          </Text>
        </View>
      </Card>
    </DoubleLayer>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 32,
  },
  cardLayout: {
    marginTop: -24,
    paddingTop: 20,
    position: 'relative',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  bgImg: {
    height: Dimensions.get('window').height / 5,
    width: '100%',
    objectFit: 'cover',
  },
  title: {
    textAlign: 'center',
  },
  aboutCard: {
    marginTop: 24,
    marginHorizontal: 32,
    padding: 12,
  },
  mainText: {
    // paddingHorizontal: 12,
    textAlign: 'center',
    gap: 8,
    marginTop: 12,
  },
  list: {
    // flexDirection: 'row',
    // alignItems: 'center',
    gap: 1,
    marginLeft: 8,
  },
  titleList: {
    fontWeight: 'bold',
  },
  slogan: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
