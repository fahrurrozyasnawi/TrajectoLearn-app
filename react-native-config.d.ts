declare module 'react-native-config' {
  export interface NativeConfig {
    REACT_APP_URL_API?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
