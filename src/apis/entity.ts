import {BoundingBox} from '@screens/Draw/entity';
import {
  PendulumFormValues,
  ProjectileMotionFormValues,
  ViscosityFormValues,
} from '@screens/Lessons/entity';

export type ExtractFrame = {
  path: string;
  filename: string;
  timeStart: number;
  timeEnd: number;
};

export type TrackObject = {
  lessonType: string;
  videoSrc: string;
  filename: string;
  path: string;
  bbox: BoundingBox;
  timeStart: number;
  timeEnd: number;
  lessonData: any;
};
