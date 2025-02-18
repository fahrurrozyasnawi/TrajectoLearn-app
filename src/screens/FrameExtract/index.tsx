import Container from '@components/layout/container';
import VideoPlayer from '@components/media/VideoPlayer';
import HStack from '@components/stack view/HStack';
import VStack from '@components/stack view/VStack';
import {VideoProcessingContext} from '@context/VideoProcessing';
import useExtractFrame from '@hooks/useExtractFrame';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@routes/entity';
import React, {useContext, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {OnProgressData} from 'react-native-video';

const controlOptions = {
  hidePlayPause: true,
  hideForward: true,
  hideRewind: true,
  hideNext: true,
  hidePrevious: true,
  hideFullscren: true,
};

const FrameExtract = () => {
  const navigation = useNavigation<RootNavigationProp>();

  const {videoUri} = useContext(VideoProcessingContext);

  const {extractFrame, durationTimeline, updateDurationTimeline} =
    useExtractFrame({filePath: '/viscosity/vid'});

  const [seekTime, setSeekTime] = useState<number>(0);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const handleProgressChange = (event: OnProgressData) => {
    setSeekTime(event.currentTime);
  };

  const onSaveDuration = (timeline: 'start' | 'end') => {
    updateDurationTimeline(timeline, seekTime);
  };

  const onSubmit = async (): Promise<void> => {
    if (Object.values(durationTimeline).find(val => val === 0)) {
      Alert.alert('Pleas set time start!/end first!');
      return;
    }

    setBtnLoading(true);
    try {
      await extractFrame();
      navigation.navigate('Select Object Track');
    } catch (error) {
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <Container>
      <VStack>
        <VideoPlayer
          src={videoUri as string}
          paused={true}
          controls={true}
          controlsStyles={controlOptions}
          onProgress={handleProgressChange}
        />

        <VStack>
          <HStack style={styles.timeline}>
            <Text style={styles.durationTitle}>Time Start</Text>
            <Text style={styles.durationValue} variant="titleMedium">
              {durationTimeline.start}
            </Text>
            <Button
              mode="elevated"
              style={styles.setBtn}
              onPress={() => onSaveDuration('start')}>
              Set
            </Button>
          </HStack>
          <HStack style={styles.timeline}>
            <Text style={styles.durationTitle}>Time End</Text>
            <Text style={styles.durationValue} variant="titleMedium">
              {durationTimeline.end}
            </Text>
            <Button
              mode="elevated"
              style={styles.setBtn}
              onPress={() => onSaveDuration('end')}>
              Set
            </Button>
          </HStack>
        </VStack>

        <Button
          style={styles.processBtn}
          mode="contained"
          disabled={btnLoading}
          loading={btnLoading}
          onPress={() => onSubmit()}>
          Process
        </Button>
      </VStack>
    </Container>
  );
};

export default FrameExtract;

const styles = StyleSheet.create({
  durationTitle: {
    flex: 1,
  },
  setBtn: {
    // flex: 1,
    // alignItems: 'flex-end',
  },
  processBtn: {
    marginVertical: 14,
  },
  durationValue: {
    flex: 2,
    fontWeight: '700',
    textAlign: 'center',
  },
  timeline: {
    margin: 4,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2,
  },
});
