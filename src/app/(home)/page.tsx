import { VideoScroll } from "~/components/VideoScroll";
import { getVideos } from "~/server/actions/get-videos";

export default async function HomePage() {
  const videos = await getVideos();

  return (
    <main className="min-h-screen w-full">
      <VideoScroll videos={videos} />
    </main>
  );
}
