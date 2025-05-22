import { VideoCard } from "./video-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { YouTubeVideo, YouTubeVideoDetails } from "@shared/schema";

interface VideoGridProps {
  videos: YouTubeVideo[] | YouTubeVideoDetails[];
  loading?: boolean;
  error?: string | null;
}

export function VideoGrid({ videos, loading, error }: VideoGridProps) {
  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-destructive mb-2">エラーが発生しました</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="flex space-x-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">動画が見つかりませんでした</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {videos.map((video) => {
        const videoId = 'id' in video && typeof video.id === 'object' 
          ? video.id.videoId 
          : typeof video.id === 'string' 
            ? video.id 
            : '';
        
        return <VideoCard key={videoId} video={video} />;
      })}
    </div>
  );
}
