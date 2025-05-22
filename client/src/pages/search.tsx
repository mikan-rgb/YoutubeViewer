import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { VideoGrid } from "@/components/video-grid";
import { searchVideos } from "@/lib/youtube-api";

export default function Search() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1] || '');
    const query = params.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [location]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["/api/youtube/search", searchQuery],
    queryFn: () => searchVideos(searchQuery, 12),
    enabled: !!searchQuery,
  });

  if (!searchQuery) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center p-8">
          <p className="text-muted-foreground">検索キーワードを入力してください</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-2">検索結果</h2>
        <p className="text-sm text-muted-foreground">
          "{searchQuery}" の検索結果{data?.pageInfo.totalResults ? ` 約 ${data.pageInfo.totalResults.toLocaleString()} 件` : ''}
        </p>
      </div>
      
      <VideoGrid 
        videos={data?.items || []} 
        loading={isLoading} 
        error={error?.message || null}
      />
    </div>
  );
}
