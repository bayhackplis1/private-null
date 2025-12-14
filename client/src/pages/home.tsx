import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Music, Video, Search, X, Loader2 } from "lucide-react";
import { SiYoutube, SiTiktok } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { MatrixRain } from "@/components/matrix-rain";
import { DownloadProgress } from "@/components/download-progress";
import { ConsoleOutput } from "@/components/console-output";

type Platform = "youtube" | "tiktok";
type DownloadType = "video" | "audio" | "search";

interface DownloadState {
  status: "idle" | "processing" | "downloading" | "complete" | "error";
  progress: number;
  message: string;
  downloadUrl?: string;
  filename?: string;
}

export default function Home() {
  const [platform, setPlatform] = useState<Platform>("youtube");
  const [downloadType, setDownloadType] = useState<DownloadType>("video");
  const [inputValue, setInputValue] = useState("");
  const [downloadState, setDownloadState] = useState<DownloadState>({
    status: "idle",
    progress: 0,
    message: "",
  });
  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const addConsoleLine = (line: string) => {
    setConsoleLines(prev => [...prev.slice(-10), `[${new Date().toLocaleTimeString()}] ${line}`]);
  };

  const getPlaceholder = () => {
    if (platform === "tiktok" && downloadType === "search") {
      return "enter_username (e.g., @badbunny)";
    }
    return platform === "youtube" ? "paste_youtube_url_here" : "paste_tiktok_url_here";
  };

  const validateInput = (): boolean => {
    if (!inputValue.trim()) {
      toast({
        title: "ERROR.EMPTY_INPUT",
        description: downloadType === "search" ? "Please provide a username" : "Please provide a URL",
        variant: "destructive",
      });
      return false;
    }

    if (downloadType !== "search") {
      if (platform === "youtube" && !inputValue.includes("youtu")) {
        toast({
          title: "ERROR.INVALID_URL",
          description: "Please provide a valid YouTube URL",
          variant: "destructive",
        });
        return false;
      }
      if (platform === "tiktok" && !inputValue.includes("tiktok")) {
        toast({
          title: "ERROR.INVALID_URL",
          description: "Please provide a valid TikTok URL",
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const handleDownload = async () => {
    if (!validateInput()) return;

    setDownloadState({ status: "processing", progress: 0, message: "INITIALIZING_CONNECTION..." });
    addConsoleLine(`> INIT ${platform.toUpperCase()} ${downloadType.toUpperCase()} PROTOCOL`);
    addConsoleLine(`> TARGET: ${inputValue.slice(0, 50)}${inputValue.length > 50 ? '...' : ''}`);

    try {
      const endpoint = `/api/${platform}/${downloadType}`;
      const body = downloadType === "search" ? { query: inputValue } : { url: inputValue };

      addConsoleLine(`> CONNECTING TO API ENDPOINT...`);
      setDownloadState({ status: "processing", progress: 20, message: "ESTABLISHING_SECURE_CONNECTION..." });

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        let errorMessage = "Download failed";
        try {
          const error = await response.json();
          errorMessage = error.message || errorMessage;
        } catch {
          errorMessage = `Server error: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      addConsoleLine(`> CONNECTION_ESTABLISHED`);
      setDownloadState({ status: "downloading", progress: 50, message: "EXTRACTING_MEDIA_STREAM..." });

      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = `${platform}_${downloadType}_${Date.now()}`;
      
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^";\n]+)"?/);
        if (match) filename = match[1];
      }

      const ext = downloadType === "audio" ? ".mp3" : ".mp4";
      if (!filename.includes(".")) filename += ext;

      addConsoleLine(`> DOWNLOADING: ${filename}`);
      setDownloadState({ status: "downloading", progress: 70, message: "STREAMING_DATA..." });

      const blob = await response.blob();
      
      if (blob.size < 1024) {
        throw new Error("Downloaded file is too small - may be invalid");
      }

      addConsoleLine(`> DOWNLOAD_COMPLETE: ${(blob.size / 1024 / 1024).toFixed(2)} MB`);
      setDownloadState({ status: "complete", progress: 100, message: "DOWNLOAD.COMPLETE", filename });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      addConsoleLine(`> FILE_SAVED: ${filename}`);
      
      toast({
        title: "DOWNLOAD.SUCCESS",
        description: `${filename} downloaded successfully`,
      });
    } catch (error: any) {
      addConsoleLine(`> ERROR: ${error.message}`);
      setDownloadState({ 
        status: "error", 
        progress: 0, 
        message: `ERROR: ${error.message}` 
      });
      toast({
        title: "ERROR.DOWNLOAD_FAILED",
        description: error.message || "Failed to process download request",
        variant: "destructive",
      });
    }
  };

  const resetState = () => {
    setDownloadState({ status: "idle", progress: 0, message: "" });
    setInputValue("");
    setConsoleLines([]);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      <MatrixRain />
      
      <div className="relative z-10 w-full px-4 md:px-8">
        {/* Main Download Interface */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-primary/30 bg-card/95 backdrop-blur-sm overflow-visible">
                <div className="p-6 md:p-8">
                  {/* Platform Tabs */}
                  <Tabs value={platform} onValueChange={(v) => {
                    setPlatform(v as Platform);
                    if (v === "youtube" && downloadType === "search") {
                      setDownloadType("video");
                    }
                  }} className="mb-6">
                    <TabsList className="grid w-full grid-cols-2 bg-background/50 border border-primary/20">
                      <TabsTrigger 
                        value="youtube" 
                        className="font-mono uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        data-testid="tab-youtube"
                      >
                        <SiYoutube className="w-4 h-4 mr-2" />
                        YOUTUBE
                      </TabsTrigger>
                      <TabsTrigger 
                        value="tiktok"
                        className="font-mono uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        data-testid="tab-tiktok"
                      >
                        <SiTiktok className="w-4 h-4 mr-2" />
                        TIKTOK
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  {/* Download Type Selector */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(platform === "tiktok" ? ["video", "audio", "search"] : ["video", "audio"] as DownloadType[]).map((type) => (
                      <Button
                        key={type}
                        variant={downloadType === type ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDownloadType(type as DownloadType)}
                        className="font-mono uppercase tracking-wider"
                        data-testid={`button-type-${type}`}
                      >
                        {type === "video" && <Video className="w-4 h-4 mr-2" />}
                        {type === "audio" && <Music className="w-4 h-4 mr-2" />}
                        {type === "search" && <Search className="w-4 h-4 mr-2" />}
                        {type}
                      </Button>
                    ))}
                  </div>

                  {/* Input Field */}
                  <div className="relative mb-6">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-mono text-lg">
                      {">"}
                    </span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleDownload()}
                      placeholder={getPlaceholder()}
                      className="terminal-input w-full pl-10 h-14 text-base"
                      disabled={downloadState.status === "processing" || downloadState.status === "downloading"}
                      data-testid="input-url"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <Button
                      onClick={handleDownload}
                      disabled={downloadState.status === "processing" || downloadState.status === "downloading"}
                      className="flex-1 min-w-[200px] h-12 font-mono uppercase tracking-wider animate-glow-pulse"
                      data-testid="button-download"
                    >
                      {downloadState.status === "processing" || downloadState.status === "downloading" ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          PROCESSING...
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5 mr-2" />
                          EXECUTE DOWNLOAD
                        </>
                      )}
                    </Button>
                    {downloadState.status !== "idle" && (
                      <Button
                        variant="outline"
                        onClick={resetState}
                        className="h-12 font-mono uppercase tracking-wider"
                        data-testid="button-reset"
                      >
                        <X className="w-5 h-5 mr-2" />
                        RESET
                      </Button>
                    )}
                  </div>

                  {/* Progress Indicator */}
                  <AnimatePresence>
                    {downloadState.status !== "idle" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6"
                      >
                        <DownloadProgress 
                          status={downloadState.status}
                          progress={downloadState.progress}
                          message={downloadState.message}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Console Output */}
                  <AnimatePresence>
                    {consoleLines.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6"
                      >
                        <ConsoleOutput lines={consoleLines} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
