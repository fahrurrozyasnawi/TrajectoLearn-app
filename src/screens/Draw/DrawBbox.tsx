import HStack from '@components/stack view/HStack';
import {VideoProcessingContext} from '@context/VideoProcessing';
import useExtractFrame from '@hooks/useExtractFrame';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@routes/entity';
import {ImageManipulator} from 'expo-image-manipulator';
import React, {useContext, useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {Button, Icon, Text} from 'react-native-paper';
import {useSharedValue} from 'react-native-reanimated';
import {
  fitContainer,
  ResumableZoom,
  useImageResolution,
} from 'react-native-zoom-toolkit';

type Props = {};

type BoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const DrawBbox = (props: Props) => {
  const navigation = useNavigation<RootNavigationProp>();

  const {frameResult, updateBbox, imageCropped, updateImageCropped} =
    useContext(VideoProcessingContext);

  const {trackObject} = useExtractFrame();

  const {width, height} = useWindowDimensions();

  const {resolution} = useImageResolution({uri: frameResult as string});
  const startDraw = useSharedValue({x: 0, y: 0, width: 0, height: 0});
  const generatedDraw = useSharedValue({x: 0, y: 0, width: 0, height: 0});

  const [bboxDisplay, setBboxDisplay] = useState<BoundingBox | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  if (resolution === undefined) {
    return null;
  }

  const size = fitContainer(resolution.width / resolution.height, {
    width,
    height,
  });

  const drawGesture = Gesture.Pan()
    .enabled(isDrawing)
    .onBegin(event => {
      // console.log('draw start', event);
      startDraw.value = {
        ...startDraw.value,
        x: event.x,
        y: event.y,
      };

      generatedDraw.value = {
        ...generatedDraw.value,
        x: event.x,
        y: event.y,
      };
    })
    .onTouchesMove(event => {
      // console.log('event move', event);
      startDraw.value = {
        ...startDraw.value,
        width: event.changedTouches[0].x - startDraw.value.x,
        height: event.changedTouches[0].y - startDraw.value.y,
      };

      generatedDraw.value = {
        ...generatedDraw.value,
        width: Math.abs(generatedDraw.value.x - event.changedTouches[0].x),
        height: Math.abs(generatedDraw.value.y - event.changedTouches[0].y),
      };

      setBboxDisplay(startDraw.value);
    })
    .onEnd(async event => {
      // console.log('event end', event);
      const widthRatio = resolution.width / size.width;
      const heightRatio = resolution.height / size.height;

      generatedDraw.value = {
        ...generatedDraw.value,
        x: Math.abs(generatedDraw.value.x * widthRatio),
        y: Math.abs(generatedDraw.value.y * heightRatio),
        width: Math.abs((generatedDraw.value.x - event.x) * widthRatio),
        height: Math.abs((generatedDraw.value.y - event.y) * heightRatio),
      };

      setBboxDisplay(startDraw.value);

      const cropSize = {
        originX: Math.abs(generatedDraw.value.x * widthRatio),
        originY: Math.abs(generatedDraw.value.y * heightRatio),
        width: Math.abs((generatedDraw.value.x - event.x) * widthRatio),
        height: Math.abs((generatedDraw.value.y - event.y) * heightRatio),
      };

      const imgSrc = ImageManipulator.manipulate(frameResult as string).crop(
        cropSize,
      );

      const imgRend = await imgSrc.renderAsync();
      const imgResult = await imgRend.saveAsync();

      updateImageCropped(imgResult.uri);
    })
    .runOnJS(true);

  const onCancel = () => {
    setBboxDisplay(null);
    updateBbox(null);
    updateImageCropped(null);

    navigation.goBack();
  };

  const onSaveSelection = async () => {
    if (!bboxDisplay) return;

    updateBbox(generatedDraw.value);

    try {
      await trackObject(generatedDraw.value);
      navigation.navigate('Result');
    } catch (error) {
      console.log('error tracking object', error);
    }
  };

  return (
    <View style={styles.container}>
      <HStack style={styles.topBtn}>
        <Button onPress={onCancel} mode="contained-tonal">
          Cancel
        </Button>
        <Button onPress={onSaveSelection} mode="contained-tonal">
          Save
        </Button>
      </HStack>
      <ResumableZoom
        panEnabled={!isDrawing}
        pinchEnabled={!isDrawing}
        tapsEnabled={!isDrawing}>
        <GestureDetector gesture={drawGesture}>
          <>
            <Image
              source={{uri: frameResult as string}}
              style={{...size}}
              resizeMethod="scale"
            />
            {bboxDisplay && (
              <View
                style={[
                  styles.box,
                  {
                    left: bboxDisplay.x,
                    top: bboxDisplay.y,
                    width: bboxDisplay.width,
                    height: bboxDisplay.height,
                  },
                ]}
              />
            )}
            {/* {bboxDisplay && (
              <Canvas style={{position: 'absolute', ...size}}>
                <Rect
                  x={bboxDisplay.x}
                  y={bboxDisplay.y}
                  width={bboxDisplay.width}
                  height={bboxDisplay.height}
                  color="blue"
                  style="stroke"
                />
              </Canvas>
            )} */}
          </>
        </GestureDetector>
      </ResumableZoom>

      {imageCropped && (
        <View style={styles.cropResult}>
          <Text variant="titleSmall">Result</Text>
          <Image
            source={{uri: imageCropped}}
            style={{
              width: generatedDraw.value.width,
              height: generatedDraw.value.height,
            }}
          />
        </View>
      )}

      <View style={styles.tools}>
        <TouchableOpacity
          onPress={() => setIsDrawing(false)}
          style={styles.drawBtn}>
          <Icon
            color={!isDrawing ? styles.isDraw.color : undefined}
            size={30}
            source="hand-back-right"
          />
          <Text style={[!isDrawing && styles.isDraw]}>Move & Zoom</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsDrawing(true)}
          style={styles.drawBtn}>
          <Icon
            color={isDrawing ? styles.isDraw.color : undefined}
            size={30}
            source="shape-square-plus"
          />
          <Text style={[isDrawing && styles.isDraw]}>Draw Box</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setBboxDisplay(null);
            updateImageCropped(null);
          }}
          disabled={!!bboxDisplay && !isDrawing}
          style={styles.drawBtn}>
          <Icon
            color={isDrawing ? styles.isDraw.color : undefined}
            size={30}
            source="delete-forever"
          />
          <Text style={[isDrawing && styles.isDraw]}>Delete Box</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawBbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cropResult: {
    gap: 3,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 100,
  },
  topBtn: {
    width: '100%',
    padding: 12,
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  box: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#b58df1',
    zIndex: 99,
  },
  drawBtn: {
    flex: 1,
    alignItems: 'center',
  },
  isDraw: {
    color: 'green',
  },
  tools: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 24,
    position: 'absolute',
    bottom: 0,
  },
});
