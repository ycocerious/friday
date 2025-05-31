"use server";

import { createHash } from "crypto";
import { z } from "zod";
import { createSupabaseServerClient } from "~/lib/db/supabase.server";
import { db } from "../db";
import { videos } from "../db/schema";

const addVideoSchema = z.object({
  creatorId: z.string(),
  location: z.string(),
});

type AddVideoParams = z.infer<typeof addVideoSchema>;

export const addVideo = async (input: AddVideoParams) => {
  try {
    const { creatorId, location } = addVideoSchema.parse(input);

    const supabaseAdmin = createSupabaseServerClient();

    const inputHash = createHash("sha256")
      .update(
        JSON.stringify({
          timestamp: Date.now(),
          creatorId,
        }),
      )
      .digest("hex");
    const fileNameInBucket = `video_${inputHash}.mp4`;
    const videoKey = `${creatorId}/${fileNameInBucket}`;

    const [video] = await db
      .insert(videos)
      .values({ creatorId, location, videoKey })
      .returning();

    if (!video) {
      throw new Error("Video not found");
    }

    const signedResponse = await supabaseAdmin.storage
      .from("creator-videos")
      .createSignedUploadUrl(videoKey);

    return { success: true, signedResponse, videoId: video.id };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error && error.message.length > 0
          ? error.message
          : "Error, please try again.",
    };
  }
};
