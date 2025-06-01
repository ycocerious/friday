"use client";

import { useAtom } from "jotai/react";
import {
  CircleUser,
  User,
  UserCircle,
  UserCog,
  UserRound,
  UserSquare,
  UserSquare2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ComponentProps } from "react";
import { userAtom } from "~/lib/auth";
import { cn } from "~/lib/utils";

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

interface VideoScrollProps extends ComponentProps<"div"> {
  videos: {
    id: string;
    videoUrl: string | null;
    creator: { name: string } | undefined;
  }[];
}

export function VideoScroll({ videos, className, ...props }: VideoScrollProps) {
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const [storedUser] = useAtom(userAtom);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && !storedUser) {
      router.push("/sign-in");
    }
  }, [isClient, storedUser, router]);

  // Update the repeated videos creation to use deterministic selection
  const repeatedVideos = Array.from({ length: 20 }, (_, index) => {
    const videoIndex = index % videos.length;
    const video = videos[videoIndex];
    const instanceId = `${video!.id}-${index}`;

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
  });

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

  return (
    <div
      className={cn(
        "flex w-full snap-y snap-mandatory flex-col overflow-y-auto bg-black",
        "h-[100dvh]",
        className,
      )}
      {...props}
    >
      {repeatedVideos.map((video) => (
        <div
          key={video.instanceId}
          className="relative flex h-[100dvh] w-full flex-shrink-0 snap-start snap-always items-center justify-center bg-black"
        >
          {video.videoUrl && (
            <div className="relative">
              {video.creator && (
                <div className="absolute top-0 right-0 left-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4">
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
  );
}
