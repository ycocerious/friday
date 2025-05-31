"use server";

import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/server/db";
import { creatorProfiles, userRoleSchema, users } from "~/server/db/schema";

const CREATOR_INVITE_CODE = "FRIDAY2024"; // Move this to env variables in production

const signUpSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    role: userRoleSchema,
    inviteCode: z.string().optional(),
    bio: z.string().optional(),
    socialLinks: z
      .object({
        instagram: z.string().optional(),
        youtube: z.string().optional(),
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpValues = z.infer<typeof signUpSchema>;

export async function signUp(data: SignUpValues) {
  try {
    // Validate the input data
    const validatedData = signUpSchema.parse(data);

    // Check if creator invite code is valid
    if (
      validatedData.role === "CREATOR" &&
      validatedData.inviteCode !== CREATOR_INVITE_CODE
    ) {
      return {
        error: "Invalid creator invite code",
      };
    }

    // Check if email already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, validatedData.email),
    });

    if (existingUser) {
      return {
        error: "Email already exists",
      };
    }

    // Hash the password
    const hashedPassword = await hash(validatedData.password, 12);

    // Create the user
    const [user] = await db
      .insert(users)
      .values({
        email: validatedData.email,
        name: validatedData.name,
        role: validatedData.role,
        password: hashedPassword,
      })
      .returning();

    if (!user) {
      return {
        error: "Something went wrong while creating your account",
      };
    }

    // If user is a creator, create their profile
    if (validatedData.role === "CREATOR") {
      await db.insert(creatorProfiles).values({
        userId: user.id,
        bio: validatedData.bio,
        socialLinks: {
          instagram: validatedData.socialLinks?.instagram,
          youtube: validatedData.socialLinks?.youtube,
        },
      });
    }

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("Sign up error:", error);
    return {
      error: "Something went wrong while creating your account",
    };
  }
}
