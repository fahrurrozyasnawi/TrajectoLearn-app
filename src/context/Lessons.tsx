import {
  PendulumFormValues,
  ProjectileMotionFormValues,
  ViscosityFormValues,
} from '@screens/Lessons/entity';
import React, {createContext, ReactNode, useState} from 'react';

type Props = {
  children: ReactNode;
};

type LessonsType = 'viscosity' | 'projectile-motion' | 'pendulum';

type ContextValues = {
  projectileMotionForm: ProjectileMotionFormValues;
  pendulumForm: PendulumFormValues;
  viscosityForm: ViscosityFormValues;
  lessonType: LessonsType;
  formulaResult: any;
  videoResult: string | null;

  updateViscosityForm: Function;
  updatePendulumForm: Function;
  updateProjectileMotionForm: Function;
  updateFormulaResult: Function;
  updateLessonType: Function;
  updateVideoResult: Function;
  resetAllForms: Function;
};

export const LessonsContext = createContext<ContextValues>({
  lessonType: 'viscosity',
  formulaResult: 0,
  videoResult: null,
  projectileMotionForm: {yVal: 0, xVal: 0},
  pendulumForm: {
    time: 0,
    freq: 0,
  },
  viscosityForm: {
    radius: 0,
    densityF: 0,
    densityT: 0,
  },

  updateViscosityForm: Function,
  updatePendulumForm: Function,
  updateProjectileMotionForm: Function,
  updateFormulaResult: Function,
  updateLessonType: Function,
  updateVideoResult: Function,
  resetAllForms: Function,
});

export default function LessonsProvider({children}: Props) {
  const [videoResult, setVideoResult] = useState<string | null>(null);
  const [formulaResult, setFormulaResult] = useState<any>(0);
  const [lessonType, setLessonType] = useState<LessonsType>('viscosity');

  const [projectileMotionForm, setProjectileMotionForm] =
    useState<ProjectileMotionFormValues>({
      yVal: 0,
      xVal: 0,
    });
  const [pendulumForm, setPendulumForm] = useState<PendulumFormValues>({
    time: 0,
    freq: 0,
  });
  const [viscosityForm, setViscosityForm] = useState<ViscosityFormValues>({
    radius: 0,
    densityT: 0,
    densityF: 0,
  });

  const updateLessonType = (value: LessonsType) => {
    setLessonType(value);
  };

  const updateFormulaResult = (value: any) => {
    setFormulaResult(value);
  };

  const updateVideoResult = (value: string | null) => {
    setVideoResult(value);
  };

  const updateViscosityForm = (values: ViscosityFormValues) => {
    setViscosityForm(prev => ({...prev, ...values}));
  };

  const updatePendulumForm = (values: PendulumFormValues) => {
    setPendulumForm(prev => ({...prev, ...values}));
  };

  const updateProjectileMotionForm = (values: ProjectileMotionFormValues) => {
    setProjectileMotionForm(prev => ({...prev, ...values}));
  };

  const resetAllForms = () => {
    setViscosityForm(prev => ({...prev, radius: 0, densityT: 0, densityF: 0}));
    setPendulumForm(prev => ({...prev, time: 0, freq: 0}));
    setProjectileMotionForm(prev => ({...prev, yVal: 0, xVal: 0}));
  };

  return (
    <LessonsContext.Provider
      value={{
        projectileMotionForm,
        pendulumForm,
        viscosityForm,
        videoResult,
        formulaResult,
        lessonType,

        updateViscosityForm,
        updatePendulumForm,
        updateProjectileMotionForm,
        updateFormulaResult,
        updateLessonType,
        updateVideoResult,
        resetAllForms,
      }}>
      {children}
    </LessonsContext.Provider>
  );
}
