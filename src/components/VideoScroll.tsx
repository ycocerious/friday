"use client";

import { useAtom } from "jotai/react";
import {
  CircleUser,
  Search,
  User,
  UserCircle,
  UserCog,
  UserRound,
  UserSquare,
  UserSquare2,
} from "lucide-react";
import { Outfit } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useVideos } from "~/hooks/use-videos";
import { userAtom } from "~/lib/auth";
import { cn } from "~/lib/utils";

const outfit = Outfit({ subsets: ["latin"] });

// Array of avatar icons
const AVATAR_ICONS = [
  User,
  UserCircle,
  UserCog,
  UserRound,
  CircleUser,
  UserSquare2,
  UserSquare,
] as const;

// Array of tailwind colors for avatars
const AVATAR_COLORS = [
  "text-red-500",
  "text-blue-500",
  "text-green-500",
  "text-purple-500",
  "text-yellow-500",
  "text-pink-500",
  "text-indigo-500",
] as const;

// Add this utility function at the top of the file after the constants
function getConsistentRandomIndex(str: string, arrayLength: number) {
  // Create a simple hash of the string
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  // Get a positive number and mod it by array length
  return Math.abs(hash) % arrayLength;
}

export function VideoScroll() {
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const [storedUser] = useAtom(userAtom);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [userQuery, setUserQuery] = useState("");

  const handleSearch = () => {
    setUserQuery(searchInput);
  };

  const { data: videos = [], isLoading } = useVideos(userQuery);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !storedUser) {
      router.replace("/sign-in");
    }
  }, [isClient, storedUser, router]);

  useEffect(() => {
    const videos = videoRefs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            void video.play().catch(() => {
              console.log("Autoplay failed");
            });
          } else {
            video.pause();
            video.currentTime = 0;
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    videos.forEach((video) => {
      observer.observe(video);
    });

    return () => {
      videos.forEach((video) => {
        observer.unobserve(video);
      });
    };
  }, []);

  // Show nothing until we confirm client-side and auth
  if (!isClient || !storedUser) {
    return null;
  }

  // Update the repeated videos creation to use deterministic selection
  const repeatedVideos =
    videos.length === 0
      ? []
      : Array.from({ length: 20 }, (_, index) => {
          const videoIndex = index % videos.length;
          const video = videos[videoIndex];
          if (!video) return null;
          const instanceId = `${video.id}-${index}`;

          // Use the instanceId to consistently select avatar and color
          const avatarIndex = getConsistentRandomIndex(
            instanceId,
            AVATAR_ICONS.length,
          );
          const colorIndex = getConsistentRandomIndex(
            instanceId + "color",
            AVATAR_COLORS.length,
          );

          return {
            ...video,
            instanceId,
            avatarIcon: AVATAR_ICONS[avatarIndex],
            avatarColor: AVATAR_COLORS[colorIndex],
          };
        }).filter(Boolean);

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[calc(100vh-4rem)] w-full items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center">
      <div className="absolute top-0 z-50 w-full max-w-[26rem] bg-transparent">
        <div className="bg-background/80 container mx-auto flex h-16 items-center justify-between border-y-2 px-4">
          <div className="flex gap-2">
            <Input
              type="search"
              placeholder="Search videos..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-36 rounded-b-lg bg-white/10 text-gray-500 placeholder:text-gray-400"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Button
              onClick={handleSearch}
              variant="secondary"
              size="icon"
              className="border bg-white/10 text-gray-500 hover:bg-white/20"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-md border bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-2 py-1"
          >
            <span className={`${outfit.className} text-xl text-purple-400`}>
              Friday
            </span>
            <div className="relative h-8 w-8">
              <Image
                src="/logo.png"
                alt="Friday Logo"
                fill
                className="rounded-full object-cover"
                priority
              />
            </div>
          </Link>
        </div>
      </div>
      <div
        className={cn(
          "scrollbar-hide flex w-full snap-y snap-mandatory flex-col overflow-y-auto bg-white",
          "h-[100dvh]",
        )}
      >
        {repeatedVideos.map((video) => (
          <div
            key={video?.instanceId}
            className="relative flex h-[100dvh] w-full flex-shrink-0 snap-start snap-always items-center justify-center bg-white"
          >
            {video?.videoUrl && (
              <div className="relative w-full">
                {video.creator && (
                  <div className="absolute top-0 right-0 left-0 z-10 bg-gradient-to-b from-gray-900/70 to-transparent p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "rounded-full bg-white/90 p-2",
                          video.avatarColor,
                        )}
                      >
                        {video.avatarIcon && (
                          <video.avatarIcon className="h-5 w-5" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-white">
                        {video.creator.name}
                      </span>
                    </div>
                  </div>
                )}
                <video
                  ref={(el) => {
                    if (el) {
                      videoRefs.current.set(video.instanceId, el);
                    } else {
                      videoRefs.current.delete(video.instanceId);
                    }
                  }}
                  src={video.videoUrl}
                  className="h-full w-full object-contain"
                  playsInline
                  loop
                  controls
                  muted
                  autoPlay
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
