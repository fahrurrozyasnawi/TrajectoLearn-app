import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import DoubleLayer from '@components/layout/double-layer';
import {Divider, Text} from 'react-native-paper';
import DynamicSizeImage from '@components/media/DynamicSizeImage';

const Tutorial = () => {
  return (
    <DoubleLayer>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.mainTitle} variant="displaySmall">
            Panduan
          </Text>

          <View>
            <Text style={styles.title} variant="titleLarge">
              Extract Frame
            </Text>
            <View style={styles.content}>
              <Text variant="bodyLarge">
                Gunakan slider untuk menggeser timecode video.
              </Text>
              <DynamicSizeImage
                style={styles.image}
                source={require('../../assets/tutorial/Extract-frame_1.png')}
              />
              <Text variant="bodyLarge">
                Tentukan durasi video untuk proses tracking dengan mengatur
                waktu proses tracking dimulai (Time Start) dan waktu proses
                tracking berakhir (Time End).
              </Text>
              <Divider style={styles.divider} />
              <Text variant="bodyLarge">
                Gunakan tombol <Text style={{fontWeight: 'bold'}}>Set</Text>{' '}
                untuk menentukan{' '}
                <Text style={{fontWeight: 'bold'}}>Time Start</Text> dan{' '}
                <Text style={{fontWeight: 'bold'}}>Time End</Text> berdasarkan
                timecode dari slider.
              </Text>
              <DynamicSizeImage
                style={styles.image}
                source={require('../../assets/tutorial/Extract-frame_2.png')}
              />
            </View>

            <Text style={[styles.title, {marginTop: 24}]} variant="titleLarge">
              Draw Box
            </Text>
            <View style={styles.content}>
              <Image
                source={require('../../assets/tutorial/icon-db-1.png')}
                style={{height: 50, width: 70, borderRadius: 8}}
              />
              <Text variant="bodyLarge">
                Gunakan tombol{' '}
                <Text style={{fontWeight: 'bold'}}>Move/Drag</Text> untuk
                menggeser ataupun zoom gambar untuk memudahkan dalam seleksi
                objek.
              </Text>
              <DynamicSizeImage
                style={styles.image}
                source={require('../../assets/tutorial/db-1.png')}
              />

              <Divider style={styles.divider} />

              <Image
                source={require('../../assets/tutorial/icon-db-2.png')}
                style={{height: 50, width: 70, borderRadius: 6}}
              />
              <Text variant="bodyLarge">
                Gunakan tombol <Text style={{fontWeight: 'bold'}}>Draw</Text>{' '}
                untuk menyeleksi objek dengan gambar box sebagai objek yang akan
                ditracking.
              </Text>
              <DynamicSizeImage
                style={styles.image}
                source={require('../../assets/tutorial/db-2.png')}
              />

              <Divider style={styles.divider} />

              <Image
                source={require('../../assets/tutorial/icon-db-3.png')}
                style={{height: 50, width: 70, borderRadius: 6}}
              />
              <Text variant="bodyLarge">
                Jika hasil dirasa seleksi kurang bagus, gunakan tombol{' '}
                <Text style={{fontWeight: 'bold'}}>Delete Box</Text> untuk
                menghapus hasil seleksi.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </DoubleLayer>
  );
};

export default Tutorial;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingBottom: 12,
  },
  mainTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontWeight: '800',
  },
  content: {
    marginTop: 8,
    paddingLeft: 12,
    gap: 2,
  },
  divider: {
    marginVertical: 12,
  },
  image: {
    borderRadius: 12,
  },
});
