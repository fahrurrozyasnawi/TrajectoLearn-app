import React, {createContext, ReactNode, useState} from 'react';

type Props = {
  children: ReactNode;
};

type DurationTimeline = {
  start: number;
  end: number;
};

type BoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type ContextValues = {
  taskId: string | null;
  frameResult: string | null;
  imageCropped: string | null;
  videoUri: string | null;
  pathFile: string;
  filename: string;
  durationTimeline: DurationTimeline;
  bbox: BoundingBox | null;
  assets: any;

  updateDurationTimeline: Function;
  updateFrame: Function;
  updateVideoUri: Function;
  updateFilename: Function;
  updateAssets: Function;
  updatePathFile: Function;
  updateBbox: Function;
  updateImageCropped: Function;
  updateTaskId: Function;
  resetState: Function;
};

export const VideoProcessingContext = createContext<ContextValues>({
  bbox: null,
  taskId: null,
  imageCropped: null,
  frameResult: null,
  videoUri: null,
  pathFile: '',
  filename: '',
  assets: null,
  durationTimeline: {
    start: 0,
    end: 0,
  },

  updateDurationTimeline: Function,
  updateFrame: Function,
  updateVideoUri: Function,
  updateFilename: Function,
  updateAssets: Function,
  updateBbox: Function,
  updatePathFile: Function,
  updateImageCropped: Function,
  resetState: Function,
  updateTaskId: Function,
});

export default function VideoProcessingProvider({children}: Props) {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [pathFile, setPathFile] = useState<string>('');
  const [bbox, setBbox] = useState<BoundingBox | null>(null);
  const [imageCropped, setImageCropped] = useState<string | null>(null);
  const [frameResult, setFrameResult] = useState<string | null>(null);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [filename, setFilename] = useState<string>('');
  const [assets, setAssets] = useState<any>(null);
  const [durationTimeline, setDurationTimeline] = useState({
    start: 0,
    end: 0,
  });

  const updateVideoUri = (value: string | null) => {
    setVideoUri(value);
  };
  const updateBbox = (value: BoundingBox | null) => {
    setBbox(value);
  };
  const updateImageCropped = (value: string | null) => {
    setImageCropped(value);
  };
  const updateTaskId = (value: string | null) => {
    setTaskId(value);
  };
  const updateFilename = (value: string) => {
    setFilename(value);
  };
  const updatePathFile = (value: string) => {
    setPathFile(value);
  };
  const updateAssets = (value: any) => {
    setAssets(value);
  };

  const updateFrame = (value: string | null) => {
    setFrameResult(value);
  };

  const updateDurationTimeline = (type: 'start' | 'end', value: number) => {
    setDurationTimeline(prev => ({...prev, [type]: value}));
  };

  const resetState = () => {
    setTaskId(null);
    setVideoUri(null);
    setBbox(null);
    setImageCropped(null);
    setFilename('');
    setPathFile('');
    setAssets(null);
    setFrameResult(null);
    setDurationTimeline({start: 0, end: 0});
  };

  return (
    <VideoProcessingContext.Provider
      value={{
        frameResult,
        videoUri,
        filename,
        durationTimeline,
        assets,
        bbox,
        imageCropped,
        pathFile,
        taskId,

        updateTaskId,
        updatePathFile,
        updateBbox,
        updateImageCropped,
        updateFrame,
        updateDurationTimeline,
        updateVideoUri,
        updateFilename,
        updateAssets,
        resetState,
      }}>
      {children}
    </VideoProcessingContext.Provider>
  );
}
