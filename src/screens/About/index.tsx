import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import Container from '@components/layout/container';

type Props = {};

const About = (props: Props) => {
  return (
    <Container>
      <Text style={styles.title} variant="displaySmall">
        About Us
      </Text>

      <View style={styles.mainText}>
        <Text variant="bodyMedium">
          Selamat datang di TrajectoLearn, aplikasi edukasi berbasis kecerdasan
          buatan yang memudahkan siswa memahami fisika secara interaktif dan
          menyenangkan.
        </Text>
        <Text variant="bodyMedium">
          Dikembangkan oleh Muhammad Khalil Sukur, Fatin Atikah Jafar, dan Yurmi
          Rengke, TrajectoLearn menyederhanakan konsep-konsep fisika seperti:
        </Text>
        <View style={styles.list}>
          <Text style={styles.titleList} variant="titleSmall">
            Gerak Parabola
          </Text>
          <Text variant="bodyMedium">
            : Mengukur lintasan, kecepatan, dan ketinggian.
          </Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.titleList} variant="titleSmall">
            Gerak Harmonik Sederhana
          </Text>
          <Text variant="bodyMedium">: Menganalisis osilasi dan periode.</Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.titleList} variant="titleSmall">
            Viskositas
          </Text>
          <Text variant="bodyMedium">: Menghitung nilai viskositas.</Text>
        </View>

        <Text variant="bodyMedium">
          Dengan antarmuka yang user-friendly dan teknologi AI, TrajectoLearn
          membuat belajar fisika lebih mudah dipahami dan menyenangkan.
        </Text>

        <Text style={styles.slogan} variant="bodyLarge">
          TrajectoLearn - Solusi Cerdas untuk Belajar Fisika!
        </Text>
      </View>
    </Container>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  mainText: {
    // paddingHorizontal: 12,
    textAlign: 'center',
    gap: 8,
    marginTop: 12,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
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
