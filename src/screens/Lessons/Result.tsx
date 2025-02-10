import Container from '@components/layout/container';
import VideoPlayer from '@components/media/VideoPlayer';
import HStack from '@components/stack view/HStack';
import StaticVar from '@config/StaticVar';
import {LessonsContext} from '@context/Lessons';
import {VideoProcessingContext} from '@context/VideoProcessing';
import useExtractFrame from '@hooks/useExtractFrame';
import useImportVideo from '@hooks/useImportVideo';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@routes/entity';
import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Chip, ProgressBar, Text} from 'react-native-paper';
import API from 'src/apis';

type Props = {};

const Result = (props: Props) => {
  const navigation = useNavigation<RootNavigationProp>();
  const {taskId} = useContext(VideoProcessingContext);
  const {
    videoResult,
    formulaResult,
    lessonType,
    pendulumForm,
    projectileMotionForm,
    viscosityForm,
    updateVideoResult,
  } = useContext(LessonsContext);
  const {durationTimeline, filename, pathFile, imageCropped} = useContext(
    VideoProcessingContext,
  );

  const {resetState} = useImportVideo();
  const {getFormulaResult} = useExtractFrame();

  const [progressTrack, setProgressTrack] = useState({
    status: 'Initialize',
    progress: 0,
  });

  const Summary = () => {
    if (lessonType === 'viscosity') {
      return (
        <View style={styles.infoLayout}>
          <View style={styles.imgCropLayout}>
            {/* <Text variant="titleMedium">Object</Text> */}
            <Image
              source={{uri: imageCropped as string}}
              style={styles.imgCropped}
            />
          </View>
          <View style={styles.inputLayout}>
            {/* <Text variant="titleMedium">Input</Text> */}
            <HStack style={styles.inputs}>
              <View style={styles.inputContainer}>
                <Chip>Waktu</Chip>
                <Text>{`${
                  Math.round(
                    (durationTimeline.end - durationTimeline.start) * 100,
                  ) / 100
                } s`}</Text>
              </View>
              <View style={styles.inputContainer}>
                <Chip>Jari-jari</Chip>
                <Text>{`${viscosityForm.radius} m`}</Text>
              </View>
              <View style={styles.inputContainer}>
                <Chip>Massa Jenis Benda</Chip>
                <Text>{`${viscosityForm.densityT} kg/m^3`}</Text>
              </View>
              <View style={styles.inputContainer}>
                <Chip>Massa Jenis Fluida</Chip>
                <Text>{`${viscosityForm.densityF} kg/m^3`}</Text>
              </View>
            </HStack>
          </View>
        </View>
      );
    }

    if (lessonType === 'pendulum') {
      return (
        <View style={styles.infoLayout}>
          <View style={styles.imgCropLayout}>
            {/* <Text variant="titleMedium">Object</Text> */}
            <Image
              source={{uri: imageCropped as string}}
              style={styles.imgCropped}
            />
          </View>
          <View style={styles.inputLayout}>
            {/* <Text variant="titleMedium">Input</Text> */}
            <HStack style={styles.inputs}>
              <View style={styles.inputContainer}>
                <Chip>Waktu</Chip>
                <Text>{`${
                  Math.round(
                    (durationTimeline.end - durationTimeline.start) * 100,
                  ) / 100
                } s`}</Text>
              </View>
              <View style={styles.inputContainer}>
                <Chip>Frekuensi</Chip>
                <Text>{`${pendulumForm.freq} Hz`}</Text>
              </View>
            </HStack>
          </View>
        </View>
      );
    }

    if (lessonType === 'projectile-motion') {
      return (
        <View style={styles.infoLayout}>
          <View style={styles.imgCropLayout}>
            {/* <Text variant="titleMedium">Object</Text> */}
            <Image
              source={{uri: imageCropped as string}}
              style={styles.imgCropped}
            />
          </View>
          <View style={styles.inputLayout}>
            {/* <Text variant="titleMedium">Input</Text> */}
            <HStack style={styles.inputs}>
              <View style={styles.inputContainer}>
                <Chip>Waktu</Chip>
                <Text>{`${
                  Math.round(
                    (durationTimeline.end - durationTimeline.start) * 100,
                  ) / 100
                } s`}</Text>
              </View>
              <View style={styles.inputContainer}>
                <Chip>Jarak</Chip>
                <Text>{`${projectileMotionForm.xVal} m`}</Text>
              </View>
              <View style={styles.inputContainer}>
                <Chip>Tinggi</Chip>
                <Text>{`${projectileMotionForm.yVal} m`}</Text>
              </View>
            </HStack>
          </View>
        </View>
      );
    }
  };

  const Value = () => {
    if (lessonType === 'viscosity') {
      return (
        <View>
          <HStack style={styles.inputs}>
            <View style={styles.inputContainer}>
              <Chip>Viskositas</Chip>
              <Text>{`${
                Math.round(formulaResult.result * 100) / 100
              } N.s/m^2`}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Chip>Kecepatan</Chip>
              <Text>{`${
                Math.round(formulaResult.amplitude * 100) / 100
              } m/s`}</Text>
            </View>
          </HStack>
        </View>
      );
    }

    if (lessonType === 'pendulum') {
      return (
        <View>
          <HStack style={styles.inputs}>
            <View style={styles.inputContainer}>
              <Chip>Simpangan</Chip>
              <Text>{`${
                Math.round(formulaResult.result * 100) / 100
              } rad/s`}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Chip>Amplitudo</Chip>
              <Text>{`${
                Math.round(formulaResult.amplitude * 100) / 100
              } m`}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Chip>Periode (T)</Chip>
              <Text>{`${Math.round(formulaResult.period * 100) / 100} s`}</Text>
            </View>
          </HStack>
        </View>
      );
    }

    if (lessonType === 'projectile-motion') {
      return (
        <View>
          <HStack style={styles.inputs}>
            <View style={styles.inputContainer}>
              <Chip>Vx</Chip>
              <Text>{`${Math.round(formulaResult.vx * 100) / 100} m/s`}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Chip>Vy</Chip>
              <Text>{`${Math.round(formulaResult.vy * 100) / 100} m/s`}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Chip>V0</Chip>
              <Text>{`${Math.round(formulaResult.v0 * 100) / 100} m/s`}</Text>
            </View>
            <View style={styles.inputContainer}>
              <Chip>Sudut Elevasi</Chip>
              <Text>{`${
                Math.round(formulaResult.elevation * 100) / 100
              } deg`}</Text>
            </View>
          </HStack>
        </View>
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.getProgress(taskId as string);
        const {data} = response.data;
        console.log('data', data);
        setProgressTrack(data);
      } catch (error) {
        console.log('error get progress', error);
      }
    };

    const interValId = setInterval(fetchData, 2000);

    if (progressTrack.progress === 1) {
      clearInterval(interValId);
    }

    return () => clearInterval(interValId);
  }, [taskId, progressTrack.progress]);

  useEffect(() => {
    if (progressTrack.progress === 1) {
      getFormulaResult(taskId as string);

      const name = filename.split('.')[0];
      const url = `${StaticVar.URL_API}/api/video/result${pathFile}/${name}-result.mp4`;

      console.log('url', url);
      updateVideoResult(url);
    }

    return () => {};
  }, [progressTrack.progress]);

  // console.log('pro')
  return (
    <Container style={styles.container}>
      <Text style={styles.title} variant="titleLarge">
        Information
      </Text>

      <View style={styles.mainLayout}>
        <Summary />

        <View style={styles.progressLayout}>
          <Text style={{textAlign: 'center'}}>{progressTrack.status}</Text>
          <ProgressBar progress={progressTrack.progress} />
        </View>

        {videoResult ? <VideoPlayer src={videoResult} controls={true} /> : null}

        {formulaResult ? (
          <View style={styles.layoutValue}>
            <Text variant="titleMedium">Hasil</Text>
            <Value />
          </View>
        ) : null}
      </View>

      <Button
        mode="outlined"
        onPress={() => {
          resetState();
          navigation.reset({
            index: 1,
            routes: [
              {
                name: 'Home',
              },
              {
                name: 'Lessons',
              },
            ],
          });
        }}>
        Back To Menu
      </Button>
    </Container>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  layoutValue: {
    marginTop: 18,
    gap: 8,
    paddingHorizontal: 12,
  },
  titleValue: {
    fontWeight: '900',
    fontSize: 18,
  },
  progressLayout: {
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 24,
    marginVertical: 12,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoLayout: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 24,
    // gap: 24,
  },
  imgCropLayout: {
    flex: 1,
  },
  inputLayout: {
    flex: 3,
  },
  imgCropped: {
    height: 100,
    width: 100,
    borderRadius: 12,
  },
  inputs: {
    gap: 12,
    flexWrap: 'wrap',
    // paddingHorizontal: 12,
    paddingLeft: 12,
    // justifyContent: 'space-between',
  },
  inputContainer: {
    // width: '25%',
    gap: 4,
    alignItems: 'center',
  },
  mainLayout: {
    flex: 1,
  },
  layoutText: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  normalText: {
    fontSize: 20,
    lineHeight: 30,
  },
  superscript: {
    fontSize: 15,
    lineHeight: 18,
  },
});
