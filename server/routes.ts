import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import axios from "axios";

const YT_BASE_URL = "http://206.183.130.71:5000";
const TIKTOK_BASE_URL = "https://downloader-pro.cgd-priv.uk";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // YouTube Video Download
  app.post("/api/youtube/video", async (req: Request, res: Response) => {
    try {
      const { url } = req.body;
      if (!url || !url.includes("youtu")) {
        return res.status(400).json({ message: "Invalid YouTube URL" });
      }

      const encodedUrl = encodeURIComponent(url);
      const apiUrl = `${YT_BASE_URL}//api/download_by_url?url=${encodedUrl}&cookies_file=/root/scratube/youtube_cookies.txt`;

      const response = await axios.get(apiUrl, {
        responseType: "stream",
        timeout: 300000,
        headers: { "User-Agent": "Mozilla/5.0" }
      });

      const filename = `youtube_video_${Date.now()}.mp4`;
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Type", "video/mp4");
      
      response.data.pipe(res);
    } catch (error: any) {
      console.error("YouTube video error:", error.message);
      res.status(500).json({ message: "Failed to download YouTube video" });
    }
  });

  // YouTube Audio Download
  app.post("/api/youtube/audio", async (req: Request, res: Response) => {
    try {
      const { url } = req.body;
      if (!url || !url.includes("youtu")) {
        return res.status(400).json({ message: "Invalid YouTube URL" });
      }

      const encodedUrl = encodeURIComponent(url);
      const apiUrl = `${YT_BASE_URL}//api/download_audio_by_url?url=${encodedUrl}&cookies_file=/root/scratube/youtube_cookies.txt`;

      const response = await axios.get(apiUrl, {
        responseType: "stream",
        timeout: 300000,
        headers: { "User-Agent": "Mozilla/5.0" }
      });

      const filename = `youtube_audio_${Date.now()}.mp3`;
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Type", "audio/mpeg");
      
      response.data.pipe(res);
    } catch (error: any) {
      console.error("YouTube audio error:", error.message);
      res.status(500).json({ message: "Failed to download YouTube audio" });
    }
  });

  // YouTube Search and Download
  app.post("/api/youtube/search", async (req: Request, res: Response) => {
    try {
      const { query } = req.body;
      if (!query) {
        return res.status(400).json({ message: "Search query required" });
      }

      const encodedQuery = encodeURIComponent(query);
      const apiUrl = `${YT_BASE_URL}//api/download_audio?query=${encodedQuery}&cookies_file=/root/scratube/youtube_cookies.txt`;

      const response = await axios.get(apiUrl, {
        responseType: "stream",
        timeout: 300000,
        headers: { "User-Agent": "Mozilla/5.0" }
      });

      const filename = `youtube_search_${query.replace(/[^a-zA-Z0-9]/g, "_")}_${Date.now()}.mp3`;
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Type", "audio/mpeg");
      
      response.data.pipe(res);
    } catch (error: any) {
      console.error("YouTube search error:", error.message);
      res.status(500).json({ message: "Failed to search and download from YouTube" });
    }
  });

  // TikTok Video Download
  app.post("/api/tiktok/video", async (req: Request, res: Response) => {
    try {
      const { url } = req.body;
      if (!url || !url.includes("tiktok")) {
        return res.status(400).json({ message: "Invalid TikTok URL" });
      }

      const encodedUrl = encodeURIComponent(url);
      const apiUrl = `${TIKTOK_BASE_URL}/api/tiktok/download/video?url=${encodedUrl}`;

      const response = await axios.get(apiUrl, {
        responseType: "stream",
        timeout: 60000,
        headers: { "User-Agent": "Mozilla/5.0" }
      });

      const filename = `tiktok_video_${Date.now()}.mp4`;
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Type", "video/mp4");
      
      response.data.pipe(res);
    } catch (error: any) {
      console.error("TikTok video error:", error.message);
      res.status(500).json({ message: "Failed to download TikTok video" });
    }
  });

  // TikTok Audio Download
  app.post("/api/tiktok/audio", async (req: Request, res: Response) => {
    try {
      const { url } = req.body;
      if (!url || !url.includes("tiktok")) {
        return res.status(400).json({ message: "Invalid TikTok URL" });
      }

      const encodedUrl = encodeURIComponent(url);
      const apiUrl = `${TIKTOK_BASE_URL}/api/tiktok/download/audio?url=${encodedUrl}`;

      const response = await axios.get(apiUrl, {
        responseType: "stream",
        timeout: 60000,
        headers: { "User-Agent": "Mozilla/5.0" }
      });

      const filename = `tiktok_audio_${Date.now()}.mp3`;
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Type", "audio/mpeg");
      
      response.data.pipe(res);
    } catch (error: any) {
      console.error("TikTok audio error:", error.message);
      res.status(500).json({ message: "Failed to download TikTok audio" });
    }
  });

  // TikTok Search by Username
  app.post("/api/tiktok/search", async (req: Request, res: Response) => {
    try {
      const { query } = req.body;
      if (!query) {
        return res.status(400).json({ message: "Username/keyword required" });
      }

      const searchTerm = query.replace(/^@/, "");
      const apiUrl = `${TIKTOK_BASE_URL}/api/tiktok/searchkeyword/${encodeURIComponent(searchTerm)}`;

      const response = await axios.get(apiUrl, {
        responseType: "stream",
        timeout: 30000,
        headers: { "User-Agent": "Mozilla/5.0" }
      });

      const filename = `tiktok_search_${searchTerm}_${Date.now()}.mp4`;
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Type", "video/mp4");
      
      response.data.pipe(res);
    } catch (error: any) {
      console.error("TikTok search error:", error.message);
      res.status(500).json({ message: "Failed to search TikTok" });
    }
  });

  return httpServer;
}
