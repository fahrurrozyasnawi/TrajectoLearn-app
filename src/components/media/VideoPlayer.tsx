import React, {useRef} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import Video, {
  OnBufferData,
  OnVideoErrorData,
  ReactVideoProps,
  VideoRef,
} from 'react-native-video';

type VideoPlayerType = {
  src?: string;
  onBuffer?: (e: OnBufferData) => void;
  onError?: (e: OnVideoErrorData) => void;
  style?: ViewStyle;
} & ReactVideoProps;

const VideoPlayer = ({
  src,
  style,
  onBuffer,
  onError,
  ...rest
}: VideoPlayerType) => {
  const videRef = useRef<VideoRef>(null);

  if (src) {
    return (
      <Video
        source={{
          uri: encodeURI(src),
          bufferConfig: {
            minBufferMs: 2500, // Minimum buffer before playback starts
            maxBufferMs: 3000, // Maximum buffer allowed
            bufferForPlaybackMs: 2500, // Buffer required to start playback
            bufferForPlaybackAfterRebufferMs: 2500,
          },
        }}
        ref={videRef}
        onBuffer={onBuffer}
        onError={onError}
        style={[styles.backgroundVideo, style]}
        {...rest}
      />
    );
  }

  return (
    <Video
      ref={videRef}
      onBuffer={onBuffer}
      onError={onError}
      style={[styles.backgroundVideo, style]}
      {...rest}
    />
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  backgroundVideo: {
    width: '100%',
    height: 300,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
});
