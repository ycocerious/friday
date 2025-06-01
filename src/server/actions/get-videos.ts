import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { users, videos } from "~/server/db/schema";

export async function getVideos() {
  const allVideos = await db.select().from(videos);
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
