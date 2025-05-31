import { google } from "@ai-sdk/google";
import { embed } from "ai";
import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { db } from "~/server/db";
import { videoTagEmbeddings } from "~/server/db/schema";

const embeddingModel = google.textEmbeddingModel("text-embedding-004");

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll("\n", " ");
  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });
  return embedding;
};

export const findRelevantContent = async (searchTags: string[]) => {
  const searchTagsEmbedded = await generateEmbedding(searchTags.join(", "));
  const similarity = sql<number>`1 - (${cosineDistance(videoTagEmbeddings.embedding, searchTagsEmbedded)})`;
  const similarGuides = await db
    .select({ videoId: videoTagEmbeddings.videoId, similarity })
    .from(videoTagEmbeddings)
    .where(gt(similarity, 0.3))
    .orderBy((t) => desc(t.similarity))
    .limit(10);
  return similarGuides;
};
