"use server";

import { eq, inArray } from "drizzle-orm";
import { db } from "~/server/db";
import { users, videos, type Video } from "~/server/db/schema";
import { getRelevantVideos } from "./get-relevant-videos";

export async function getVideos(userQuery: string) {
  let allVideos: Video[] = [];
  if (userQuery !== "") {
    const relevantVideos = await getRelevantVideos(userQuery);
    allVideos = await db
      .select()
      .from(videos)
      .where(
        inArray(
          videos.id,
          relevantVideos.map((video) => video.videoId),
        ),
      );

    // Sort allVideos based on the similarity scores from relevantVideos
    allVideos.sort((a, b) => {
      const aScore =
        relevantVideos.find((v) => v.videoId === a.id)?.similarity ?? 0;
      const bScore =
        relevantVideos.find((v) => v.videoId === b.id)?.similarity ?? 0;
      return bScore - aScore; // Sort in descending order (highest similarity first)
    });
  } else {
    allVideos = await db.select().from(videos);
  }

  const allCreators = await db
    .select()
    .from(users)
    .where(eq(users.role, "CREATOR"));

  if (!allVideos[0]?.id) {
    console.log("no videos found");
    return [];
  }

  const videosWithCreators = allVideos.map((video) => ({
    ...video,
    creator: allCreators.find((creator) => creator.id === video.creatorId),
  }));

  // If we have less than 20 videos, repeat them to make up to 20
  const repeatedVideos = [];
  while (repeatedVideos.length < 20) {
    repeatedVideos.push(...videosWithCreators);
  }

  // Return only first 20
  return repeatedVideos.slice(0, 20);
}
