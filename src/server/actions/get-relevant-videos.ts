"use server";

import { findRelevantContent } from "~/lib/ai/embedding";

export const getRelevantVideos = async (searchTags: string[]) => {
  const videos = await findRelevantContent(searchTags);
  return videos.map((video) => video.videoId);
};
