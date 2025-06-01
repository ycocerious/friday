"use server";

import { count, eq } from "drizzle-orm";
import { db } from "~/server/db";
import { creatorProfiles, users, videos } from "~/server/db/schema";

export type ProfileData = {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    tags: string[] | null;
  };
  creator?: {
    bio: string | null;
    socialLinks: {
      instagram?: string;
      youtube?: string;
    } | null;
    videoCount: number;
  };
};

export async function getProfile(userId: string): Promise<ProfileData> {
  const userData = await db.query.users.findFirst({
    where: eq(users.id, userId),
    columns: {
      id: true,
      email: true,
      name: true,
      role: true,
      tags: true,
    },
  });

  if (!userData) {
    throw new Error("User not found");
  }

  // If user is a creator, get additional details
  let creatorData = undefined;
  if (userData.role === "CREATOR") {
    const creatorProfile = await db.query.creatorProfiles.findFirst({
      where: eq(creatorProfiles.userId, userId),
    });

    const videoCount = await db
      .select({ count: count() })
      .from(videos)
      .where(eq(videos.creatorId, userId))
      .then((result) => result[0]?.count ?? 0);

    creatorData = {
      bio: creatorProfile?.bio ?? null,
      socialLinks: creatorProfile?.socialLinks ?? null,
      videoCount,
    };
  }

  return {
    user: userData,
    creator: creatorData,
  };
}
