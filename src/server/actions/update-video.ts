"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import { analyzeVideo } from "~/lib/ai/analyse-video";
import { generateEmbedding } from "~/lib/ai/embedding";
import { createSupabaseServerClient } from "~/lib/db/supabase.server";
import { db } from "../db";
import { videos, videoTagEmbeddings } from "../db/schema";

const updateVideoSchema = z.object({
  videoId: z.string(),
});
type UpdateVideoParams = z.infer<typeof updateVideoSchema>;

export const updateVideo = async (input: UpdateVideoParams) => {
  const supabase = createSupabaseServerClient();

  const { videoId } = updateVideoSchema.parse(input);

  const video = await db.query.videos.findFirst({
    where: eq(videos.id, videoId),
  });

  if (!video) {
    throw new Error("Video not found");
  }

  const {
    data: { publicUrl: uploadedVideoUrl },
  } = supabase.storage.from("creator-videos").getPublicUrl(video.videoKey);

  console.log("uploadedVideoUrl", uploadedVideoUrl);

  const analysis = await analyzeVideo(uploadedVideoUrl);

  console.log("analysis", analysis);

  const tags = [
    video.location,
    ...analysis.atmosphere.types,
    ...analysis.atmosphere.climate,
    ...analysis.activities,
    ...analysis.visualElements.timeOfDay,
    ...analysis.visualElements.sceneryType,
    analysis.visualElements.crowdLevel,
    ...analysis.travelStyle,
    ...analysis.mood,
    ...analysis.keywords,
  ];

  await db
    .update(videos)
    .set({
      videoUrl: uploadedVideoUrl,
      tags,
    })
    .where(eq(videos.id, videoId));

  const embeddings = await generateEmbedding(tags.join(", "));
  await db
    .insert(videoTagEmbeddings)
    .values({
      videoId,
      embedding: embeddings,
    })
    .onConflictDoNothing();
  return "Resource successfully created and embedded.";
};
