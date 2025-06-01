"use client";

import { useAtom } from "jotai/react";
import { MapPin, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { userAtom } from "~/lib/auth";

import { createSupabaseClient } from "~/lib/db/supabase.client";
import { cn } from "~/lib/utils";
import { addVideo } from "~/server/actions/add-video";
import { updateVideo } from "~/server/actions/update-video";

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [location, setLocation] = useState("");
  const [storedUser] = useAtom(userAtom);
  const supabase = createSupabaseClient();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      if (!storedUser) {
        router.push("/sign-up");
      } else if (storedUser.role !== "CREATOR") {
        router.push("/");
      }
    }
  }, [isClient, storedUser, router]);

  const handleFileUpload = async (file: File) => {
    try {
      if (!file) return;
      if (!storedUser) return;
      if (!location.trim()) {
        toast.error("Please enter a location");
        return;
      }

      setIsUploading(true);
      toast.loading("Uploading and analyzing video...", {
        id: "uploading-video",
      });

      // 1. Get signed URL
      const result = await addVideo({
        creatorId: storedUser.id,
        location: location.trim(),
      });

      if (!result.success || !result.signedResponse) {
        throw new Error(result.error);
      }

      const { signedResponse, videoId } = result;
      console.log("result", result);

      if (!signedResponse.data) {
        throw new Error("Failed to get signed URL");
      }

      // 2. Upload to Supabase
      console.log("Uploading to Supabase");
      const uploadResult = await supabase.storage
        .from("creator-videos")
        .uploadToSignedUrl(
          signedResponse.data.path,
          signedResponse.data.token,
          file,
          {
            upsert: true,
            contentType: file.type,
          },
        );

      if (uploadResult.error) {
        console.log("Error uploading to Supabase", uploadResult.error);
        throw uploadResult.error;
      }
      console.log("Uploaded to Supabase");

      console.log("Updating video");
      await updateVideo({ videoId });
      console.log("Updated video");

      toast.success("Video uploaded and analyzed!", {
        id: "uploading-video",
      });
      router.push("/");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to upload video",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await handleFileUpload(file);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) await handleFileUpload(file);
  };

  return (
    <div className="flex h-full min-h-[calc(100vh-4rem)] w-full items-center justify-center">
      <div className="flex h-full w-full max-w-[26rem] items-center justify-center border-2">
        <Card
          className={cn(
            "relative w-[90%] overflow-hidden",
            "before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
            "shadow-xl transition-shadow duration-300 hover:shadow-2xl",
            "bg-gradient-to-br from-blue-500 via-blue-700 to-purple-700",
            "border-0",
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-purple-400/30 to-purple-600/30 backdrop-blur-[2px]" />

          <CardHeader className="relative z-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-purple-400 p-1.5 shadow-lg">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-12 w-12 text-yellow-200"
                >
                  <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
                </svg>
              </div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-blue-50">
              Upload Your Video
            </h2>
          </CardHeader>

          <CardContent className="relative z-10 space-y-6 px-8 py-2">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold tracking-wider text-blue-200 uppercase">
                Location Details
              </h3>
              <div className="group rounded-lg bg-blue-600/10 p-3 ring-1 ring-blue-300/20">
                <Label
                  htmlFor="location"
                  className="mb-2 flex items-center gap-2 text-blue-100"
                >
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm font-medium">Video Location</span>
                </Label>
                <Input
                  id="location"
                  placeholder="Enter the filming location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={isUploading}
                  className="border-blue-400/20 bg-blue-950/30 text-blue-50 placeholder:text-blue-200/50 focus:border-blue-300/30 focus:ring-blue-300/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold tracking-wider text-blue-200 uppercase">
                Upload Video
              </h3>
              <div
                className={cn(
                  "flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed p-8",
                  "transition-all duration-200",
                  dragActive
                    ? "border-yellow-300 bg-blue-400/10"
                    : "border-blue-400/30 hover:border-blue-300/50",
                )}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-blue-100" />
                <div className="space-y-2 text-center">
                  <p className="text-lg font-medium text-blue-100">
                    Drag and drop your video here
                  </p>
                  <p className="text-sm text-blue-200">or</p>
                  <div>
                    <Button
                      disabled={isUploading}
                      variant="secondary"
                      className="relative bg-blue-500/20 text-blue-100 hover:bg-blue-400/30"
                    >
                      {isUploading ? "Uploading..." : "Choose file"}
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleChange}
                        disabled={isUploading}
                        className="absolute inset-0 cursor-pointer opacity-0"
                      />
                    </Button>
                  </div>
                  <p className="text-sm text-blue-200">
                    Supported formats: MP4, MOV, AVI
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
