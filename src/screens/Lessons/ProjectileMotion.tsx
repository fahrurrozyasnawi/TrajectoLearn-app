import HFNumberInput from '@components/input/HFNumberInput';
import Container from '@components/layout/container';
import VideoPlayer from '@components/media/VideoPlayer';
import VStack from '@components/stack view/VStack';
import {zodResolver} from '@hookform/resolvers/zod';
import React, {useContext} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import useImportVideo from 'src/hooks/useImportVideo';
import {ProjectileMotionFormValues, projectileMotionSchema} from './entity';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@routes/entity';
import {LessonsContext} from '@context/Lessons';

const ProjectileMotion = () => {
  const navigation = useNavigation<RootNavigationProp>();

  const {projectileMotionForm, updateProjectileMotionForm} =
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

  return (
    <Container>
      <Text variant="titleMedium">Masukkan Nilai</Text>
      <VStack style={styles.inputLayout}>
        <HFNumberInput name="xVal" control={control} label="Jarak" />
        <HFNumberInput name="yVal" control={control} label="Tinggi" />
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
    </Container>
  );
};

export default ProjectileMotion;

const styles = StyleSheet.create({
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
