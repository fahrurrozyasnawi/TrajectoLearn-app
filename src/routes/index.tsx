import 'react-native-gesture-handler';

import {createStackNavigator} from '@react-navigation/stack';
import About from '@screens/About';
import DrawBbox from '@screens/Draw/DrawBbox';
import FrameExtract from '@screens/FrameExtract';
import Lessons from '@screens/Lessons';
import Pendulum from '@screens/Lessons/Pendulum';
import ProjectileMotion from '@screens/Lessons/ProjectileMotion';
import Result from '@screens/Lessons/Result';
import Viscosity from '@screens/Lessons/Viscosity';
import React from 'react';
import Home from '../screens/Home';
import Tutorial from '@screens/Tutorial';
import Material from '@screens/Material';
import ViscosityMaterial from '@screens/Material/Viscosity';
import ProjectileMotionMaterial from '@screens/Material/ProjectileMotion';
import HarmonicMaterial from '@screens/Material/HarmonicMove';

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      // screenOptions={{
      //   header: props => <Header {...props} />,
      // }}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Tutorial" component={Tutorial} />
      <Stack.Screen name="Material" component={Material} />
      <Stack.Screen name="ViscoMaterial" component={ViscosityMaterial} />
      <Stack.Screen
        name="ProjectileMaterial"
        component={ProjectileMotionMaterial}
      />
      <Stack.Screen name="HarmonicMaterial" component={HarmonicMaterial} />
      <Stack.Screen name="Result" component={Result} />
      <Stack.Screen name="Lessons" component={Lessons} />
      <Stack.Screen name="Viskositas" component={Viscosity} />
      <Stack.Screen name="Gerak Parabola" component={ProjectileMotion} />
      <Stack.Screen name="Gerak Harmonik" component={Pendulum} />
      <Stack.Screen
        name="Select Object Track"
        // options={{headerShown: false}}
        component={DrawBbox}
      />
      <Stack.Screen name="Frame Extract" component={FrameExtract} />
    </Stack.Navigator>
  );
}
