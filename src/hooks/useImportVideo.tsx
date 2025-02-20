import {LessonsContext} from '@context/Lessons';
import {VideoProcessingContext} from '@context/VideoProcessing';
import {useContext} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';

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
      updateVideoUri(uri);
      updateFilename(filename);
    }
  };

  const resetState = () => {
    resetAllForms();
    resetStateVideoProcessing();
  };

  return {videoUri, filename, assets, browseVideo, resetState};
};

export default useImportVideo;
