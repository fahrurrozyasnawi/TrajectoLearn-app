import VideoPlayer from '@components/media/VideoPlayer';
import VStack from '@components/stack view/VStack';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Modal, useTheme} from 'react-native-paper';
import {OnProgressData} from 'react-native-video';

type FrameProps = {
  visible: boolean;
  videoUri: string;
  onDismiss: () => void;
  onExtract: (duration: number) => Promise<void>;
};

const controlOptions = {
  hidePlayPause: true,
  hideForward: true,
  hideRewind: true,
  hideNext: true,
  hidePrevious: true,
  hideFullscren: true,
};

const FrameExtract = ({
  visible,
  videoUri,
  onDismiss,
  onExtract,
}: FrameProps) => {
  const theme = useTheme();

  const [duration, setDuration] = useState<number>(0);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const handleProgressChange = (event: OnProgressData) => {
    console.log('event', event);

    setDuration(event.currentTime);
  };

  const onSubmit = async (): Promise<void> => {
    setBtnLoading(true);
    try {
      await onExtract(duration);
    } catch (error) {
      console.log('error');
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <Modal contentContainerStyle={styles.container} visible={visible}>
      <VStack style={styles.video}>
        <VideoPlayer
          src={videoUri}
          paused={true}
          controls={true}
          controlsStyles={controlOptions}
          onProgress={handleProgressChange}
        />

        <VStack style={styles.buttonLayout}>
          <Button
            mode="contained"
            disabled={btnLoading}
            loading={btnLoading}
            onPress={() => onSubmit()}>
            Extract Frame
          </Button>
          <Button
            disabled={btnLoading}
            loading={btnLoading}
            textColor="white"
            onPress={onDismiss}
            buttonColor={theme.colors.error}>
            Cancel
          </Button>
        </VStack>
      </VStack>
    </Modal>
  );
};

export default FrameExtract;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 2,
  },
  video: {
    gap: 2,
  },
  buttonLayout: {
    marginVertical: 12,
    gap: 4,
    justifyContent: 'center',
  },
});
