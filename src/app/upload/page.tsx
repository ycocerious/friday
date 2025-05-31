"use client";

import { useAtom } from "jotai/react";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { userAtom } from "~/lib/auth";

import { createSupabaseClient } from "~/lib/db/supabase.client";
import { cn } from "~/lib/utils";
import { addVideo } from "~/server/actions/add-video";
import { updateVideo } from "~/server/actions/update-video";

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
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

      setIsUploading(true);

      // 1. Get signed URL
      const result = await addVideo({
        creatorId: storedUser.id,
        location: "Bengaluru",
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

      toast.success("Video uploaded and analyzed successfully.");
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
    <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 py-8">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Upload Video
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed p-6",
              dragActive
                ? "border-primary bg-primary/10"
                : "border-muted-foreground/25",
            )}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
          >
            <Upload className="text-muted-foreground h-10 w-10" />
            <div className="space-y-2 text-center">
              <p className="text-sm font-medium">
                Drag and drop your video here, or
              </p>
              <div>
                <Button
                  disabled={isUploading}
                  variant="secondary"
                  className="relative"
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
              <p className="text-muted-foreground text-xs">
                Supported formats: MP4, MOV, AVI
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
