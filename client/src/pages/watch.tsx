import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { VideoPlayer } from "@/components/video-player";
import { getVideoDetails } from "@/lib/youtube-api";

export default function Watch() {
  const [location] = useLocation();
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    // URLからビデオIDを抽出
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('v');
    console.log('Video ID from URL:', id); // デバッグ用
    if (id) {
      setVideoId(id);
    }
  }, [location]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/youtube/videos", videoId],
    queryFn: () => getVideoDetails(videoId),
    enabled: !!videoId,
  });

  if (!videoId) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center p-8">
          <p className="text-muted-foreground">動画IDが指定されていません</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <p className="text-destructive mb-2">エラーが発生しました</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const videoDetails = data?.items[0] || null;

  return (
    <div className="p-6">
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <p className="text-muted-foreground">動画を読み込み中...</p>
        </div>
      ) : (
        <VideoPlayer
          videoId={videoId}
          videoDetails={videoDetails}
          isOpen={true}
          onClose={() => window.history.back()}
        />
      )}
    </div>
  );
}
