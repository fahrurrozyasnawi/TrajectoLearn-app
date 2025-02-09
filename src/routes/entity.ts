import {NavigationProp} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Result: undefined;
  Lessons: undefined;
  'Gerak Parabola': undefined;
  'Gerak Harmonik': undefined;
  Viskositas: undefined;
  'Select Object Track': undefined;
  'Frame Extract': undefined;
};

export type RootNavigationProp = NavigationProp<RootStackParamList>;
