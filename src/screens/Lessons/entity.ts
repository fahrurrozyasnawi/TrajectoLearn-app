import {z} from 'zod';

export const viscositySchema = z.object({
  radius: z.number(),
  densityT: z.number(),
  densityF: z.number(),
});

export type ViscosityFormValues = z.infer<typeof viscositySchema>;

export const projectileMotionSchema = z.object({
  yVal: z.number().optional(),
  xVal: z.number(),
});

export type ProjectileMotionFormValues = z.infer<typeof projectileMotionSchema>;

export const pendulumSchema = z
  .object({
    type: z.union([z.literal('bandul'), z.literal('pegas')]),
    time: z.number().optional(),
    lRope: z.number().optional(),
    theta: z.number().optional(),
    xInit: z.number().optional(),
    xLast: z.number().optional(),
    mass: z.number().optional(),
  })
  .superRefine((val, ctx) => {
    if (!val.type) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Jenis benda tidak boleh kosong',
        path: ['type'],
      });
    }

    if (val.type === 'bandul') {
      if (!val.mass) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Massa tidak boleh kosong',
          path: ['mass'],
        });
      }

      if (!val.lRope) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Panjang tali tidak boleh kosong',
          path: ['lRope'],
        });
      }

      if (!val.theta) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Panjang tali tidak boleh kosong',
          path: ['theta'],
        });
      }
    }

    if (val.type === 'pegas') {
      if (!val.mass) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Massa tidak boleh kosong',
          path: ['mass'],
        });
      }

      if (!val.xInit) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Panjang awal tidak boleh kosong',
          path: ['xInit'],
        });
      }

      if (!val.xLast) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Panjang akhir tidak boleh kosong',
          path: ['xLast'],
        });
      }
    }
  });

export type PendulumFormValues = z.infer<typeof pendulumSchema>;
