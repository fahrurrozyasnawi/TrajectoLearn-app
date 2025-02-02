import {LessonsContext} from '@context/Lessons';
import {VideoProcessingContext} from '@context/VideoProcessing';
import {useContext, useEffect, useState} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {cleanFiles, showEditor} from 'react-native-video-trim';

type UseUploadVideoResults = {
  videoUri: string | null;
  filename: string;
  assets: any;
  browseVideo: () => Promise<void>;
  resetState: Function;
};

type Props = {
  enableVideoTrim?: boolean;
};

const useImportVideo = (props: Props = {}): UseUploadVideoResults => {
  const {enableVideoTrim = false} = props;

  const {
    assets,
    videoUri,
    filename,
    updateAssets,
    updateFilename,
    updateVideoUri,
    resetState: resetStateVideoProcessing,
  } = useContext(VideoProcessingContext);

  const {resetAllForms} = useContext(LessonsContext);
  const browseVideo = async () => {
    const result = await launchImageLibrary({
      mediaType: 'video',
    });

    updateAssets(result.assets![0]);
    const uri = result.assets![0]?.uri || '';
    const filename = result.assets![0]?.fileName || '';
    if (uri) {
      if (enableVideoTrim) {
        await cleanFiles();
        showEditor(uri, {
          minDuration: 8,
        });
      } else {
        updateVideoUri(uri);
        updateFilename(filename);
      }
    }
  };

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.VideoTrim);
    const subscription = eventEmitter.addListener('VideoTrim', event => {
      switch (event.name) {
        case 'onFinishTrimming': {
          console.log('onFinishTrimming', event);

          const filePath = `file://${event.outputPath}`;
          updateVideoUri(filePath);
          break;
        }
        case 'onLoad': {
          console.log('onLoad', event);
          break;
        }
        case 'onError': {
          console.log('onError', event);
          break;
        }
        default:
          break;
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const resetState = () => {
    resetAllForms();
    resetStateVideoProcessing();
  };

  return {videoUri, filename, assets, browseVideo, resetState};
};

export default useImportVideo;
