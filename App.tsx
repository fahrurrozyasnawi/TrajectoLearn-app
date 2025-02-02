/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import LessonsProvider from '@context/Lessons';
import MultiProvider from '@context/MultiProvider';
import VideoProcessingProvider from '@context/VideoProcessing';
import RootStack from '@routes';
import React from 'react';

function App(): React.JSX.Element {
  const generateProviders = () => {
    const providers = [VideoProcessingProvider, LessonsProvider];

    return providers.map(provider => React.createElement(provider));
  };

  const generatedProviders = generateProviders();

  return (
    <MultiProvider providers={generatedProviders}>
      <RootStack />
    </MultiProvider>
  );
}

export default App;
