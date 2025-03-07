import DoubleLayer from '@components/layout/double-layer';
import React from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import {Card, Divider, Text} from 'react-native-paper';

type Props = {};

const About = (props: Props) => {
  return (
    <DoubleLayer bgImg="home">
      <View>
        <ScrollView>
          <Text style={styles.title} variant="displaySmall">
            Tentang Kami
          </Text>

          <Card style={styles.aboutCard}>
            <View style={styles.mainText}>
              <Text variant="bodyLarge">
                TrajectoLearn adalah aplikasi edukasi berbasis AI yang membantu
                siswa memahami konsep fisika secara interaktif. Dikembangkan
                oleh Muhammad Khalil Sukur, Fatin Atikah Jafar, dan Yurmi
                Rengke, mahasiswa Pendidikan Fisika Universitas Negeri Makassar,
                di bawah bimbingan Prof. Drs. Subaer, M.Phil., Ph.D.
              </Text>
              <Text variant="bodyLarge">
                Aplikasi ini menggunakan AI dan video tracking untuk
                menganalisis gerak parabola, gerak harmonik sederhana, dan
                viskositas secara real-time. Teknologi yang digunakan meliputi:
              </Text>
              <View style={styles.list}>
                <Image
                  source={require('../../assets/react-icon.png')}
                  style={{
                    width: 56,
                    height: 50,
                  }}
                />
                <Text>
                  <Text style={styles.titleList} variant="titleMedium">
                    Ract Native{' '}
                  </Text>
                  <Text variant="bodyLarge">
                    dengan TypeScript untuk UI yang responsif.
                  </Text>
                </Text>
              </View>

              <Divider style={styles.divider} />

              <View style={styles.list}>
                <Image
                  source={require('../../assets/fast-api.png')}
                  style={{
                    width: 120,
                    height: 50,
                  }}
                />
                <Text>
                  <Text style={styles.titleList} variant="titleMedium">
                    FastAPI{' '}
                  </Text>
                  <Text variant="bodyLarge">
                    dengan Python sebagai backend berbasis REST API.
                  </Text>
                </Text>
              </View>

              <Divider style={styles.divider} />

              <View style={styles.list}>
                <Image
                  source={require('../../assets/sam2.png')}
                  style={{
                    width: 120,
                    height: 50,
                  }}
                />
                <Text>
                  <Text style={styles.titleList} variant="titleMedium">
                    SAM2{' '}
                  </Text>
                  <Text variant="bodyLarge">
                    untuk tracking objek dalam video.
                  </Text>
                </Text>
              </View>

              <Divider style={styles.divider} />

              <View style={styles.list}>
                <Image
                  source={require('../../assets/gcp.png')}
                  style={{
                    width: 110,
                    height: 50,
                  }}
                />
                <Text>
                  <Text style={styles.titleList} variant="titleMedium">
                    Google Cloud Computing{' '}
                  </Text>
                  <Text variant="bodyLarge">
                    untuk akses backend yang cepat dan aman.
                  </Text>
                </Text>
              </View>

              <Divider style={styles.divider} />

              <Text
                style={[styles.titleList, {textAlign: 'center'}]}
                variant="titleMedium">
                Visi dan Misi
              </Text>

              <Text style={{textAlign: 'center'}} variant="bodyLarge">
                Kami berkomitmen menghadirkan pembelajaran fisika yang lebih
                inovatif, praktis, dan menarik dengan teknologi AI.
              </Text>

              <Text style={styles.slogan} variant="titleLarge">
                TrajectoLearn - Solusi Cerdas untuk Belajar Fisika!
              </Text>
            </View>
          </Card>
        </ScrollView>
      </View>
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
  divider: {
    marginVertical: 12,
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
    marginBottom: 12,
  },
  mainText: {
    // paddingHorizontal: 12,
    textAlign: 'center',
    gap: 8,
    marginTop: 12,
  },
  list: {
    // flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
    marginLeft: 8,
  },
  titleList: {
    fontWeight: 'bold',
  },
  slogan: {
    marginTop: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
