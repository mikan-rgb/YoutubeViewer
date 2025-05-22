import { apiRequest } from "./queryClient";
import type { YouTubeSearchResponse, YouTubeVideoDetailsResponse } from "@shared/schema";

export async function searchVideos(query: string, maxResults = 12, pageToken?: string): Promise<YouTubeSearchResponse> {
  const params = new URLSearchParams({
    q: query,
    maxResults: maxResults.toString(),
    ...(pageToken && { pageToken })
  });

  const response = await apiRequest("GET", `/api/youtube/search?${params}`);
  return response.json();
}

export async function getVideoDetails(videoId: string): Promise<YouTubeVideoDetailsResponse> {
  const response = await apiRequest("GET", `/api/youtube/videos?id=${videoId}`);
  return response.json();
}

export async function getPopularVideos(maxResults = 12, pageToken?: string): Promise<YouTubeVideoDetailsResponse> {
  const params = new URLSearchParams({
    maxResults: maxResults.toString(),
    ...(pageToken && { pageToken })
  });

  const response = await apiRequest("GET", `/api/youtube/popular?${params}`);
  return response.json();
}

export function formatDuration(duration: string): string {
  // Convert ISO 8601 duration (PT4M13S) to readable format (4:13)
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";

  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function formatViewCount(count: string): string {
  const num = parseInt(count);
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

export function formatPublishedDate(publishedAt: string): string {
  const now = new Date();
  const published = new Date(publishedAt);
  const diffInMs = now.getTime() - published.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "今日";
  } else if (diffInDays === 1) {
    return "昨日";
  } else if (diffInDays < 7) {
    return `${diffInDays}日前`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks}週間前`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months}ヶ月前`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `${years}年前`;
  }
}
