"use server";

import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignInValues = z.infer<typeof signInSchema>;

export async function signIn(data: SignInValues) {
  try {
    // Validate the input data
    const validatedData = signInSchema.parse(data);

    // Find the user
    const user = await db.query.users.findFirst({
      where: eq(users.email, validatedData.email),
    });

    if (!user) {
      return {
        error: "Invalid email",
      };
    }

    // Compare passwords
    const isValidPassword = await compare(
      validatedData.password,
      user.password,
    );

    if (!isValidPassword) {
      return {
        error: "Incorrect password",
      };
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("Sign in error:", error);
    return {
      error: "Something went wrong while signing in",
    };
  }
}
