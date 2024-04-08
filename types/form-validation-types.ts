import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long!" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter!",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Password must contain at least one number!",
  });

export const loginSchema = z
  .object({
    username: z.string().min(6).optional(),
    email: z.string().email(),
    password: passwordSchema,

    // password: z.string().regex(/^(?=.*[A-Z])(?=.*\d).{8,}$/, {
    //   message:
    //     "Password should contain 8 characters, including one big letter and a number",
    // }),
  })
  .strict();

export type LoginData = z.infer<typeof loginSchema>;

export const editSettingsSchema = z.object({
  username: z.string().min(6),
  description: z.string().optional(),
  avatar: z.string().optional(),
});

export type EditSettingsData = z.infer<typeof editSettingsSchema>;

export const editEmailSchema = z
  .object({
    email: z.string().email(),
    confirmEmail: z.string().email(),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Emails do not match!",
  });

export type EditEmailData = z.infer<typeof editEmailSchema>;
export const editPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
  });
export type EditPasswordData = z.infer<typeof editPasswordSchema>;
