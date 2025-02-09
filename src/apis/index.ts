import axios from 'axios';
import {ExtractFrame, TrackObject} from './entity';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_URL_API}/api`,
  headers: {
    Accept: '*/*',
  },
});

const checkConnect = () => api.get('');
const uploadFile = (data: FormData, filePath?: string) =>
  api.post(`/upload${filePath}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

const extractFrame = (data: ExtractFrame) =>
  api.post('/video/extract-frame', data, {
    // responseType: 'arraybuffer',
  });
const trackObject = (data: TrackObject) =>
  api.post('/video/track-object', data);
const getResult = (path: string) => api.get(`/video/result/${path}`);
const getFormula = (taskId: string) =>
  api.get(`/video/formula-result/${taskId}`);
const getProgress = (taskId: string) => api.get(`/video/progress/${taskId}`);

const API = {
  checkConnect,
  uploadFile,
  extractFrame,
  trackObject,
  getResult,
  getProgress,
  getFormula,
};

export default API;
