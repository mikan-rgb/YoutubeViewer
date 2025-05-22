import { useQuery } from "@tanstack/react-query";
import { VideoGrid } from "@/components/video-grid";
import { getPopularVideos } from "@/lib/youtube-api";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/youtube/popular"],
    queryFn: () => getPopularVideos(12),
  });

  return (
    <div className="p-6">
      <VideoGrid 
        videos={data?.items || []} 
        loading={isLoading} 
        error={error?.message || null}
      />
    </div>
  );
}
