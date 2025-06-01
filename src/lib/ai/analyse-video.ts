// actions/analyze-video.ts
import { google } from "@ai-sdk/google";
import {
  generateObject,
  type FilePart,
  type ImagePart,
  type TextPart,
} from "ai";
import { z } from "zod";

export const travelVideoAnalysisSchema = z.object({
  atmosphere: z.object({
    types: z
      .array(z.string())
      .describe(
        "Location types (e.g., beach, mountain, city, rural, forest, etc.). Be specific and add any relevant types.",
      ),
    climate: z
      .array(z.string())
      .describe(
        "Climate characteristics (e.g., tropical, temperate, cold, etc.)",
      ),
  }),
  activities: z
    .array(z.string())
    .describe(
      "Categories this activity falls under (e.g., adventure, relaxation, cultural, food, etc.)",
    ),
  visualElements: z.object({
    timeOfDay: z
      .array(z.string())
      .describe(
        "When the video was shot (e.g., day, sunset, night, golden hour, etc.)",
      ),
    sceneryType: z
      .array(z.string())
      .describe(
        "Types of scenery shown (e.g., scenic, urban, architectural, etc.)",
      ),
    crowdLevel: z
      .string()
      .describe("Description of how crowded the location is"),
  }),
  travelStyle: z
    .array(z.string())
    .describe(
      "Travel styles represented (e.g., luxury, budget, adventure, cultural, etc.)",
    ),
  mood: z
    .array(z.string())
    .describe("Emotional qualities and atmosphere of the video"),
  keywords: z
    .array(z.string())
    .describe(
      "Relevant search terms for this video - return maximum of 8 keywords not more than that STRICTLY",
    ),
});
export type TravelVideoAnalysis = z.infer<typeof travelVideoAnalysisSchema>;

export async function analyzeVideo(uploadedVideoUrl: string) {
  const content = [
    {
      type: "text",
      text: `Analyze this travel video and provide a detailed, structured response.
  
          For each category, be specific and creative in your classifications. For example:
          - Instead of just "beach", you might say "hidden cove", "volcanic beach", or "surf spot"
          - Rather than "cultural", specify "traditional pottery workshop" or "local festival"
          - For mood, combine descriptors like "mysteriously peaceful" or "energetically cultural"
  
          Think beyond conventional categories and capture what makes this content unique.`,
    },
    {
      type: "file",
      data: uploadedVideoUrl,
      mimeType: "video/mp4",
    },
  ] as Array<TextPart | ImagePart | FilePart>;

  const { object, usage } = await generateObject({
    model: google("gemini-2.0-flash"),
    schema: travelVideoAnalysisSchema,
    schemaName: "TravelVideoAnalysisSchema",
    schemaDescription: "A comprehensive analysis of a travel video",
    system: [
      `You are an expert travel content analyst with deep knowledge of global destinations, 
        travel styles, and content categorization. Your task is to provide rich, nuanced analysis 
        of travel videos that will power a sophisticated recommendation system.`,

      `Guidelines for Analysis:
  
        1. Location Analysis:
           - Be specific with location names
           - Consider multiple aspects of the environment
           - Identify unique geographical features
           - Note any distinctive local characteristics
  
        2. Activity Recognition:
           - Identify both obvious and subtle activities
           - Consider cultural significance
           - Note skill levels or accessibility
           - Capture unique or memorable moments
  
        3. Visual Analysis:
           - Pay attention to lighting, composition, and color
           - Note atmospheric conditions
           - Consider time of day effects
           - Observe crowd dynamics and human elements
  
        4. Travel Style & Mood:
           - Identify multiple overlapping styles
           - Consider target audiences
           - Note emotional qualities
           - Capture the overall experience
  
        5. Keyword Generation:
           - Include specific and general terms
           - Consider seasonal aspects
           - Include cultural references
           - Think about searchable attributes
  
        Be creative and thorough in your categorizations. Don't limit yourself to common 
        descriptors - if you notice unique or specific attributes, include them. Your analysis 
        should capture both obvious features and subtle nuances that make the content unique.`,
    ].join("\n"),
    messages: [{ role: "user", content }],
  });

  console.log("usage", usage);
  console.log(
    "cost of call",
    ((usage.promptTokens * 0.1) / 1000000 +
      (usage.completionTokens * 0.4) / 1000000) *
      85,
    "rupees",
  );

  return object;
}
