import { useState, useEffect } from "react";
import { X, ThumbsUp, ThumbsDown, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { YouTubeVideoDetails } from "@shared/schema";
import { formatViewCount, formatPublishedDate } from "@/lib/youtube-api";

interface VideoPlayerProps {
  videoId: string;
  videoDetails: YouTubeVideoDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoPlayer({ videoId, videoDetails, isOpen, onClose }: VideoPlayerProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const getChannelInitial = (channelTitle: string) => {
    return channelTitle?.charAt(0).toUpperCase() || 'C';
  };

  if (!videoDetails) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full max-h-screen overflow-y-auto p-0">
        {/* Video Player */}
        <div className="relative aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={videoDetails.snippet.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 hover:bg-black/20"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Video Details */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">
            {videoDetails.snippet.title}
          </h2>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {formatViewCount(videoDetails.statistics.viewCount)}回視聴
                </span>
                <span className="text-sm text-muted-foreground">
                  {formatPublishedDate(videoDetails.snippet.publishedAt)}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{formatViewCount(videoDetails.statistics.likeCount)}</span>
              </Button>
              <Button variant="outline" size="sm">
                <ThumbsDown className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-1">
                <Share className="h-4 w-4" />
                <span>共有</span>
              </Button>
            </div>
          </div>

          {/* Channel Info */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
              {getChannelInitial(videoDetails.snippet.channelTitle)}
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{videoDetails.snippet.channelTitle}</h3>
              <p className="text-sm text-muted-foreground">チャンネル登録者数</p>
            </div>
            <Button
              variant={isSubscribed ? "outline" : "default"}
              onClick={() => setIsSubscribed(!isSubscribed)}
              className={!isSubscribed ? "bg-youtube-red hover:bg-red-600 text-white" : ""}
            >
              {isSubscribed ? "登録済み" : "チャンネル登録"}
            </Button>
          </div>

          {/* Description */}
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm whitespace-pre-wrap">
              {videoDetails.snippet.description}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
