import {z} from 'zod';

export const viscositySchema = z.object({
  radius: z.number(),
  densityT: z.number(),
  densityF: z.number(),
});

export type ViscosityFormValues = z.infer<typeof viscositySchema>;

export const projectileMotionSchema = z.object({
  yVal: z.number(),
  xVal: z.number(),
});

export type ProjectileMotionFormValues = z.infer<typeof projectileMotionSchema>;

export const pendulumSchema = z.object({
  time: z.number(),
  freq: z.number(),
  mass: z.number().optional(),
});

export type PendulumFormValues = z.infer<typeof pendulumSchema>;
