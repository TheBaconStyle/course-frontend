import { z } from 'zod';

export const signInSchema = z.object({
  identifier: z
    .string()
    .min(8, 'Имя пользователя не должно быть короче 8-ми символов'),
  password: z.string().min(8, 'Пароль не должен быть короче 8-ми символов'),
});

export type TSignInData = z.infer<typeof signInSchema>;
