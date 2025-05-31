ALTER TABLE "video" ALTER COLUMN "video_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "video" ADD COLUMN "video_key" text NOT NULL;