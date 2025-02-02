import {Image, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Container from '@components/layout/container';
import {Button, Chip, ProgressBar, Text} from 'react-native-paper';
import {LessonsContext} from '@context/Lessons';
import {StackActions, useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@routes/entity';
import VideoPlayer from '@components/media/VideoPlayer';
import useExtractFrame from '@hooks/useExtractFrame';
import {VideoProcessingContext} from '@context/VideoProcessing';
import HStack from '@components/stack view/HStack';
import useImportVideo from '@hooks/useImportVideo';
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
  } = useContext(LessonsContext);
  const {bbox, imageCropped} = useContext(VideoProcessingContext);

  const {resetState} = useImportVideo();
  const {durationTimeline} = useExtractFrame();

  const [progressTrack, setProgressTrack] = useState(0);

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
                  durationTimeline.end - durationTimeline.start
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
                durationTimeline.end - durationTimeline.start
              } s`}</Text>
            </View>
          </HStack>
        </View>
      </View>;
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
                  durationTimeline.end - durationTimeline.start
                } s`}</Text>
              </View>
              <View style={styles.inputContainer}>
                <Chip>Jarak</Chip>
                <Text>{`${projectileMotionForm.xVal} m`}</Text>
              </View>
              <View style={styles.inputContainer}>
                <Chip>Tinggi</Chip>
                <Text>{`${projectileMotionForm.yVal} kg/m^3`}</Text>
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
        <View style={styles.layoutText}>
          <Text style={styles.normalText}>{formulaResult}</Text>
          <Text style={styles.normalText}> N.s/m</Text>
          <Text style={styles.superscript}>2</Text>
        </View>
      );
    }

    if (lessonType === 'pendulum') {
      return (
        <View style={styles.layoutText}>
          <Text style={styles.normalText}>{formulaResult}</Text>
          <Text style={styles.normalText}> rad/s</Text>
        </View>
      );
    }

    if (lessonType === 'projectile-motion') {
      return (
        <View>
          <View style={styles.layoutText}>
            <Text style={styles.normalText}>Vx : </Text>
            <Text style={styles.normalText}>{formulaResult.x}</Text>
            <Text style={styles.normalText}> m/s</Text>
          </View>

          <View style={styles.layoutText}>
            <Text style={styles.normalText}>Vy : </Text>
            <Text style={styles.normalText}>{formulaResult.y}</Text>
            <Text style={styles.normalText}> m/s</Text>
          </View>
        </View>
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.getProgress(taskId as string);
        const {data} = response.data;

        setProgressTrack(data);
      } catch (error) {
        console.log('error get progress', error);
      }
    };

    const interValId = setInterval(fetchData, 1000);

    return () => clearInterval(interValId);
  }, [taskId]);

  return (
    <Container style={styles.container}>
      <Text style={styles.title} variant="titleLarge">
        Information
      </Text>

      <View style={styles.mainLayout}>
        <Summary />

        <ProgressBar progress={progressTrack} />
        {/* <Button mode="contained" onPress={trackObject}>
          Analyze
        </Button> */}

        {videoResult && <VideoPlayer src={videoResult} controls={true} />}

        {formulaResult && <Value />}
      </View>

      <Button
        mode="outlined"
        onPress={() => {
          resetState();
          navigation.dispatch(StackActions.popToTop());
        }}>
        Back To Menu
      </Button>
    </Container>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
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
