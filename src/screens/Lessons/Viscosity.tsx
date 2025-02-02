import HFNumberInput from '@components/input/HFNumberInput';
import Container from '@components/layout/container';
import VideoPlayer from '@components/media/VideoPlayer';
import VStack from '@components/stack view/VStack';
import {LessonsContext} from '@context/Lessons';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@routes/entity';
import React, {useContext, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Alert, BackHandler, ScrollView, StyleSheet} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {OnVideoErrorData} from 'react-native-video';
import useImportVideo from 'src/hooks/useImportVideo';
import {ViscosityFormValues, viscositySchema} from './entity';

const Viscosity = () => {
  // const theme = useTheme();
  const navigation = useNavigation<RootNavigationProp>();

  const {videoUri, browseVideo, resetState} = useImportVideo();

  const {viscosityForm, updateViscosityForm} = useContext(LessonsContext);

  const {control, handleSubmit} = useForm<ViscosityFormValues>({
    resolver: zodResolver(viscositySchema),
    defaultValues: viscosityForm,
  });

  const onError = (error: OnVideoErrorData) => {
    console.log('error', error);
  };

  const onSubmit: SubmitHandler<ViscosityFormValues> = async values => {
    if (!videoUri) {
      Alert.alert('Video Not Import', 'Please import video first!');
      return;
    }
    console.log('values', values);
    updateViscosityForm(values);

    navigation.navigate('Frame Extract');
  };

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        resetState();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  // console.log('frame', frameResult);
  return (
    <>
      <Container style={styles.container}>
        <ScrollView>
          <Text variant="titleMedium">Masukkan Nilai</Text>
          <VStack style={styles.inputLayout}>
            <HFNumberInput
              name="radius"
              control={control}
              label="Jari-jari"
              right={<TextInput.Affix text="m" />}
            />
            <HFNumberInput
              name="densityT"
              control={control}
              label="Massa Jenis Benda"
              right={<TextInput.Affix text="kg/m^3" />}
            />
            <HFNumberInput
              name="densityF"
              control={control}
              label="Massa Jenis Fluida"
              right={<TextInput.Affix text="kg/m^3" />}
            />
          </VStack>
          <VStack style={styles.uploadLayout}>
            <Text variant="titleMedium">Import Video</Text>
            {videoUri && (
              <VideoPlayer
                src={videoUri}
                onError={onError}
                paused={true}
                controls={true}
              />
            )}
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
        </ScrollView>
      </Container>
    </>
  );
};

export default Viscosity;

const styles = StyleSheet.create({
  container: {
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
