import DoubleLayer from '@components/layout/double-layer';
import DynamicSizeImage from '@components/media/DynamicSizeImage';
import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {Icon, Text, TouchableRipple, useTheme} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';

type Props = {};

type MaterialProps = {
  id: string;
  title: string;
  name: string;
};

const materials: MaterialProps[] = [
  {
    id: '1',
    title: 'Gerak Parabola',
    name: 'ProjectileMaterial',
  },
  {
    id: '2',
    title: 'Gerak Harmonik',
    name: 'HarmonicMaterial',
  },
  {
    id: '3',
    title: 'Viskositas',
    name: 'ViscoMaterial',
  },
];

const Material = (props: Props) => {
  const navigate = useNavigation();
  const {colors} = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const RenderItem = ({title, name}: Partial<MaterialProps>) => {
    return (
      <View style={styles.rippleContainer}>
        <TouchableRipple
          style={styles.ripple}
          onPress={() => navigate.navigate(name as never)}
          rippleColor="rgba(0, 0, 0, .32)">
          <View style={styles.item}>
            <Text>{title}</Text>
            <Icon source="arrow-right-drop-circle-outline" size={30} />
          </View>
        </TouchableRipple>
      </View>
    );
  };

  return (
    <DoubleLayer>
      <Text variant="titleLarge" style={styles.title}>
        Bahan Ajar
      </Text>
      <View style={styles.container}>
        <FlatList
          data={materials}
          renderItem={({item}) => (
            <RenderItem title={item.title} name={item.name} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </DoubleLayer>
  );
};

export default Material;

const makeStyles = (colors: MD3Colors) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 18,
      paddingBottom: 12,
    },
    title: {
      textAlign: 'center',
      marginBottom: 12,
    },
    ripple: {
      // margin: 2,
      // borderRadius: 18,
    },
    rippleContainer: {
      backgroundColor: colors.inversePrimary,
      color: colors.background,

      marginVertical: 12,
      marginHorizontal: 8,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
    },
  });
