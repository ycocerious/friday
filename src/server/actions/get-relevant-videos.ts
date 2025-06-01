"use server";

import { findRelevantContent } from "~/lib/ai/embedding";

export const getRelevantVideos = async (searchTags: string) => {
  return await findRelevantContent(searchTags);
};
