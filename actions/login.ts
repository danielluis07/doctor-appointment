"use server";

import { z } from "zod";
import { AuthError } from "next-auth";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { eq } from "drizzle-orm";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";

const logInSchema = z.object({
  email: z
    .string()
    .email("Email inválido")
    .min(1, "É necessário informar um email"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  /* code: z
    .string()
    .min(6, "O código de autenticação deve ter pelo menos 6 caracteres"), */
});

export const login = async (
  values: z.infer<typeof logInSchema>,
  callbackUrl?: string | null
) => {
  const validatedFields = logInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Email ou senha incorretos!" };
  }

  const { email, password } = validatedFields.data;

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email não cadastrado!" };
  }

  /*   if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Email de confirmação enviado!" };
  } */

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return { error: "Senha incorreta!" };
    }

    /* TO DO: Send two-factor token */
    /* if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Código inválido!" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Código inválido!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Código expirado!" };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    } */
  }

  try {
    return {
      success: "Login efetuado com sucesso!",
      role: existingUser.role?.toLocaleLowerCase(),
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciais inválidas!" };
        default:
          return { error: "Algo deu errado!" };
      }
    }

    throw error;
  }
};
