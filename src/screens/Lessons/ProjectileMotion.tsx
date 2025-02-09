import HFNumberInput from '@components/input/HFNumberInput';
import DoubleLayer from '@components/layout/double-layer';
import VideoPlayer from '@components/media/VideoPlayer';
import VStack from '@components/stack view/VStack';
import {LessonsContext} from '@context/Lessons';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@routes/entity';
import React, {useContext, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {BackHandler, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import useImportVideo from 'src/hooks/useImportVideo';
import {ProjectileMotionFormValues, projectileMotionSchema} from './entity';

const ProjectileMotion = () => {
  const navigation = useNavigation<RootNavigationProp>();

  const {lessonType, projectileMotionForm, updateProjectileMotionForm} =
    useContext(LessonsContext);

  const {videoUri, browseVideo, resetState} = useImportVideo();

  const {control, handleSubmit} = useForm<ProjectileMotionFormValues>({
    resolver: zodResolver(projectileMotionSchema),
    defaultValues: projectileMotionForm,
  });

  const onSubmit: SubmitHandler<ProjectileMotionFormValues> = async values => {
    console.log('values', values);

    updateProjectileMotionForm(values);

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

  return (
    <DoubleLayer bgImg={lessonType}>
      <View style={styles.container}>
        <Text variant="titleMedium">Masukkan Nilai</Text>
        <VStack style={styles.inputLayout}>
          <HFNumberInput
            name="xVal"
            control={control}
            label="Jarak"
            right={<TextInput.Affix text="m" />}
          />
          <HFNumberInput
            name="yVal"
            control={control}
            label="Tinggi"
            right={<TextInput.Affix text="m" />}
          />
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

export default ProjectileMotion;

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
