import HFNumberInput from '@components/input/HFNumberInput';
import Container from '@components/layout/container';
import VideoPlayer from '@components/media/VideoPlayer';
import VStack from '@components/stack view/VStack';
import {zodResolver} from '@hookform/resolvers/zod';
import React, {useContext, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Alert, BackHandler, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import useImportVideo from 'src/hooks/useImportVideo';
import {PendulumFormValues, pendulumSchema} from './entity';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@routes/entity';
import DoubleLayer from '@components/layout/double-layer';
import {LessonsContext} from '@context/Lessons';

const Pendulum = () => {
  const navigation = useNavigation<RootNavigationProp>();

  const {lessonType, pendulumForm, updatePendulumForm} =
    useContext(LessonsContext);

  const {videoUri, browseVideo, resetState} = useImportVideo();
  const {control, handleSubmit} = useForm<PendulumFormValues>({
    resolver: zodResolver(pendulumSchema),
    defaultValues: pendulumForm,
  });

  const onSubmit: SubmitHandler<PendulumFormValues> = async values => {
    console.log('values', values);

    if (!videoUri) {
      Alert.alert('Video Not Import', 'Please import video first!');
      return;
    }

    updatePendulumForm(values);
    navigation.navigate('Frame Extract');
  };

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        resetState();
        navigation.goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  console.log('lesson type', lessonType);

  return (
    <DoubleLayer bgImg={lessonType}>
      <View style={styles.container}>
        <Text variant="titleMedium">Masukkan Nilai</Text>
        <VStack style={styles.inputLayout}>
          {/* <HFNumberInput name="time" control={control} label="Waktu" /> */}
          <HFNumberInput name="freq" control={control} label="Frekuensi" />
        </VStack>

        <VStack style={styles.uploadLayout}>
          <Text variant="titleMedium">Import Video</Text>
          {videoUri && <VideoPlayer src={videoUri} controls={true} />}
          <Button onPress={browseVideo} mode="contained">
            Select Video
          </Button>
        </VStack>

        <Button
          onPress={handleSubmit(onSubmit)}
          style={styles.submit}
          mode="contained">
          Submit
        </Button>
      </View>
    </DoubleLayer>
  );
};

export default Pendulum;

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // height: '100%',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  inputLayout: {
    gap: 2,
  },
  uploadLayout: {
    marginTop: 8,
    gap: 12,
  },
  submit: {
    marginTop: 12,
  },
});
