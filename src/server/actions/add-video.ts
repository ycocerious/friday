"use server";

import { z } from "zod";
import { generateEmbedding } from "~/lib/ai/embedding";
import { db } from "../db";
import { videos, videoTagEmbeddings } from "../db/schema";

const addVideoSchema = z.object({
  creatorId: z.string(),
  videoUrl: z.string(),
  location: z.string(),
  tags: z.array(z.string()),
});

type AddVideoParams = z.infer<typeof addVideoSchema>;

export const addVideo = async (input: AddVideoParams) => {
  try {
    const { creatorId, videoUrl, location, tags } = addVideoSchema.parse(input);

    const [video] = await db
      .insert(videos)
      .values({ creatorId, videoUrl, location, tags })
      .returning();

    if (!video) {
      throw new Error("Video not found");
    }

    const embeddings = await generateEmbedding(tags.join(", "));
    await db
      .insert(videoTagEmbeddings)
      .values({
        videoId: video?.id,
        embedding: embeddings,
      })
      .onConflictDoNothing();
    return "Resource successfully created and embedded.";
  } catch (error) {
    return error instanceof Error && error.message.length > 0
      ? error.message
      : "Error, please try again.";
  }
};
