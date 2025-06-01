"use client";

import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { Instagram, Mail, Shield, Tags, Video, Youtube } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { userAtom } from "~/lib/auth";
import { cn } from "~/lib/utils";
import { getProfile } from "~/server/actions/get-profile";

export default function ProfilePage() {
  const [user] = useAtom(userAtom);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => (user?.id ? getProfile(user.id) : null),
    enabled: !!user?.id,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation (maximum 10 degrees)
    const rotateY = ((x - rect.width / 2) / rect.width) * 10;
    const rotateX = ((rect.height / 2 - y) / rect.height) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-full w-full max-w-[450px] items-center justify-center border-2 p-4">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (isClient && !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">
          Please sign in to view your profile
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-full w-full max-w-[450px] items-center justify-center border-2 bg-gray-900 p-4">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          style={{
            transform: isHovered
              ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
              : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
            transition: isHovered ? "none" : "transform 0.5s ease-out",
          }}
          className="w-full max-w-md"
        >
          <Card
            className={cn(
              "relative overflow-hidden",
              "before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
              "shadow-xl transition-shadow duration-300 hover:shadow-2xl",
              "bg-gradient-to-br from-blue-500 via-blue-700 to-purple-700",
              "border-0",
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-purple-400/30 to-purple-600/30 backdrop-blur-[2px]" />

            <CardHeader className="relative z-10">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-purple-400 p-1.5 shadow-lg">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-16 w-16 text-yellow-200"
                  >
                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                  </svg>
                </div>
              </div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-blue-50">
                {profile?.user.name ?? "Anonymous User"}
              </h2>
            </CardHeader>

            <CardContent className="relative z-10 space-y-6 p-8">
              <div className="flex items-center space-x-4 text-blue-100">
                <Mail className="h-6 w-6" />
                <span className="text-lg">{profile?.user.email}</span>
              </div>
              <div className="flex items-center space-x-4 text-blue-100">
                <Shield className="h-6 w-6" />
                <span className="text-lg capitalize">{profile?.user.role}</span>
              </div>

              {profile?.user.tags && profile.user.tags.length > 0 && (
                <div className="flex items-center space-x-4 text-blue-100">
                  <Tags className="h-6 w-6" />
                  <div className="flex flex-wrap gap-2">
                    {profile.user.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-blue-500/40 px-3 py-1.5 text-base font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {profile?.creator && (
                <div className="mt-8 space-y-6 border-t border-blue-400/30 pt-6">
                  {profile.creator.bio && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold tracking-wider text-blue-200 uppercase">
                        Bio
                      </h3>
                      <p className="text-lg leading-relaxed text-blue-100">
                        {profile.creator.bio}
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold tracking-wider text-blue-200 uppercase">
                      Content
                    </h3>
                    <div className="flex items-center space-x-4 text-blue-100">
                      <Video className="h-6 w-6" />
                      <span className="text-lg">
                        {profile.creator.videoCount} videos
                      </span>
                    </div>
                  </div>

                  {profile.creator.socialLinks && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold tracking-wider text-blue-200 uppercase">
                        Social Links
                      </h3>
                      <div className="flex gap-6">
                        {profile.creator.socialLinks.instagram && (
                          <a
                            href={profile.creator.socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 rounded-lg bg-blue-500/20 px-4 py-2 text-blue-100 transition-all duration-200 hover:bg-blue-400/30 hover:text-blue-50"
                          >
                            <Instagram className="h-7 w-7" />
                            <span className="text-sm font-medium">
                              Instagram
                            </span>
                          </a>
                        )}
                        {profile.creator.socialLinks.youtube && (
                          <a
                            href={profile.creator.socialLinks.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 rounded-lg bg-blue-500/20 px-4 py-2 text-blue-100 transition-all duration-200 hover:bg-blue-400/30 hover:text-blue-50"
                          >
                            <Youtube className="h-7 w-7" />
                            <span className="text-sm font-medium">YouTube</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
