import { useLocation } from "wouter";
import type { YouTubeVideo, YouTubeVideoDetails } from "@shared/schema";
import { formatDuration, formatViewCount, formatPublishedDate } from "@/lib/youtube-api";

interface VideoCardProps {
  video: YouTubeVideo | YouTubeVideoDetails;
}

export function VideoCard({ video }: VideoCardProps) {
  const [, setLocation] = useLocation();

  const isSearchResult = 'id' in video && typeof video.id === 'object';
  const videoId = isSearchResult ? (video as YouTubeVideo).id.videoId : (video as YouTubeVideoDetails).id;
  const duration = 'contentDetails' in video ? formatDuration(video.contentDetails.duration) : "";
  const viewCount = 'statistics' in video ? formatViewCount(video.statistics.viewCount) : "";
  
  const handleClick = () => {
    setLocation(`/watch?v=${videoId}`);
  };

  const getChannelInitial = (channelTitle: string) => {
    return channelTitle.charAt(0).toUpperCase();
  };

  const getChannelColor = (channelTitle: string) => {
    const colors = [
      "from-purple-500 to-pink-500",
      "from-green-500 to-blue-500",
      "from-orange-500 to-red-500",
      "from-blue-500 to-purple-500",
      "from-teal-500 to-green-500",
      "from-indigo-500 to-purple-500",
      "from-yellow-500 to-orange-500",
      "from-gray-500 to-blue-500"
    ];
    const index = channelTitle.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="group cursor-pointer" onClick={handleClick}>
      <div className="relative mb-3">
        <img
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        {duration && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
            {duration}
          </div>
        )}
      </div>
      <div className="flex space-x-3">
        <div className={`w-9 h-9 bg-gradient-to-br ${getChannelColor(video.snippet.channelTitle)} rounded-full flex items-center justify-center text-white text-sm font-medium`}>
          {getChannelInitial(video.snippet.channelTitle)}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {video.snippet.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {video.snippet.channelTitle}
          </p>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
            {viewCount && (
              <>
                <span>{viewCount}回視聴</span>
                <span>•</span>
              </>
            )}
            <span>{formatPublishedDate(video.snippet.publishedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
