import {LessonsContext} from '@context/Lessons';
import {VideoProcessingContext} from '@context/VideoProcessing';
import {BoundingBox} from '@screens/Draw/entity';
import {useContext, useState} from 'react';
import API from 'src/apis';

type DurationTimeline = {
  start: number;
  end: number;
};

type ExtractForm = {
  frameResult: any;
  durationTimeline: DurationTimeline;
  extractFrame: () => Promise<void>;
  trackObject: () => Promise<void>;
  updateDurationTimeline: Function;
  resetFrameResult: Function;
};

type Props = {
  filePath?: string;
};

const useExtractFrame = ({filePath = ''}: Props = {}): ExtractForm => {
  const {
    bbox,
    pathFile,
    filename,
    frameResult,
    assets,
    videoUri,
    updateFrame,
    updateFilename,
    durationTimeline,
    updateDurationTimeline,
    updatePathFile,
    updateTaskId,
  } = useContext(VideoProcessingContext);

  const {
    lessonType,
    viscosityForm,
    pendulumForm,
    projectileMotionForm,
    updateFormulaResult,
    updateVideoResult,
  } = useContext(LessonsContext);

  const uploadVideo = async (): Promise<string> => {
    const formData = new FormData();

    const filename = `Vid-${new Date().getTime()}.mp4`;

    formData.append('file', {
      uri: videoUri,
      type: assets.type,
      name: filename,
    });
    try {
      const result = await API.uploadFile(formData, filePath);

      const {data} = result.data;

      updateFilename(filename);

      return data;
    } catch (error) {
      console.log('error upload video', error);
      throw new Error('error uploading video');
    }
  };

  const extractFrame = async () => {
    try {
      const response: any = await uploadVideo();

      updatePathFile(response.path);
      const body = {
        path: response.path,
        filename: response.filename,
        timeStart: durationTimeline.start,
        timeEnd: durationTimeline.end,
      };

      const result = await API.extractFrame(body);

      const {success, data} = result.data;

      if (success) {
        const base64 = data.frame;
        const uri = `data:image/jpeg;base64,${base64}`;

        updateFrame(uri);
        return;
      }

      console.log('error extract frame');
    } catch (error) {
      console.log('error ', error);
      throw new Error('Error extract frame');
    }
  };

  const trackObject = async () => {
    let lessonData: any = viscosityForm;

    if (lessonType === 'pendulum') {
      lessonData = pendulumForm;
    }

    if (lessonType === 'projectile-motion') {
      lessonData = projectileMotionForm;
    }

    const body = {
      lessonData,
      lessonType,
      bbox: bbox as BoundingBox,
      timeStart: durationTimeline.start,
      timeEnd: durationTimeline.end,
      videoSrc: videoUri as string,
      filename: filename,
      path: pathFile,
    };

    console.log('body', body);
    try {
      const result = await API.trackObject(body);

      const {success, data} = result.data;
      if (success) {
        updateTaskId(data);
        // updateFormulaResult(data.result);
        // updateVideoResult(data.video);
      }
    } catch (error) {
      console.log('error track object', error);
    }
  };

  const resetFrameResult = () => {
    updateFrame(null);
  };

  return {
    frameResult,
    durationTimeline,

    updateDurationTimeline,
    extractFrame,
    trackObject,
    resetFrameResult,
  };
};

export default useExtractFrame;
