import React, {useState} from 'react';
import {
  Image,
  ImageLoadEventData,
  ImageSourcePropType,
  NativeSyntheticEvent,
  View,
} from 'react-native';

type Props = {
  source: ImageSourcePropType;
};

const DynamicSizeImage = (props: Props) => {
  const [aspectRatio, setAspectRatio] = useState<number>(1); // Default aspect ratio

  const handleImageLoad = (event: NativeSyntheticEvent<ImageLoadEventData>) => {
    const {width, height} = event.nativeEvent.source;
    setAspectRatio(width / height);
  };

  return (
    <View style={{width: '100%', aspectRatio}}>
      <Image
        source={props.source}
        style={{width: '100%', height: '100%'}}
        resizeMode="contain"
        onLoad={handleImageLoad}
      />
    </View>
  );
};

export default DynamicSizeImage;
