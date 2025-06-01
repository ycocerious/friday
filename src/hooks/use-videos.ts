import { useQuery } from "@tanstack/react-query";
import { getVideos } from "~/server/actions/get-videos";

export function useVideos(userQuery: string) {
  return useQuery({
    queryKey: ["videos", userQuery],
    queryFn: () => getVideos(userQuery),
  });
}
