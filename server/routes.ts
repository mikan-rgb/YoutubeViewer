import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || process.env.YOUTUBE_API_KEY_ENV_VAR || "";

export async function registerRoutes(app: Express): Promise<Server> {
  // YouTube API proxy endpoints
  
  // Search videos
  app.get("/api/youtube/search", async (req, res) => {
    try {
      const { q, maxResults = 12, pageToken } = req.query;
      
      if (!q) {
        return res.status(400).json({ error: "Search query is required" });
      }

      if (!YOUTUBE_API_KEY) {
        return res.status(500).json({ error: "YouTube API key is not configured" });
      }

      const params = new URLSearchParams({
        part: "snippet",
        q: q as string,
        type: "video",
        maxResults: maxResults as string,
        key: YOUTUBE_API_KEY,
        ...(pageToken && { pageToken: pageToken as string })
      });

      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ 
          error: "YouTube API error", 
          details: errorData 
        });
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("YouTube search error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get video details
  app.get("/api/youtube/videos", async (req, res) => {
    try {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ error: "Video ID is required" });
      }

      if (!YOUTUBE_API_KEY) {
        return res.status(500).json({ error: "YouTube API key is not configured" });
      }

      const params = new URLSearchParams({
        part: "snippet,statistics,contentDetails",
        id: id as string,
        key: YOUTUBE_API_KEY
      });

      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?${params}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ 
          error: "YouTube API error", 
          details: errorData 
        });
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("YouTube video details error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get popular videos (trending)
  app.get("/api/youtube/popular", async (req, res) => {
    try {
      const { maxResults = 12, pageToken } = req.query;

      if (!YOUTUBE_API_KEY) {
        return res.status(500).json({ error: "YouTube API key is not configured" });
      }

      const params = new URLSearchParams({
        part: "snippet,statistics,contentDetails",
        chart: "mostPopular",
        regionCode: "JP",
        maxResults: maxResults as string,
        key: YOUTUBE_API_KEY,
        ...(pageToken && { pageToken: pageToken as string })
      });

      const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?${params}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ 
          error: "YouTube API error", 
          details: errorData 
        });
      }

      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("YouTube popular videos error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
