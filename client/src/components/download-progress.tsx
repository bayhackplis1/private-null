import { Check, X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface DownloadProgressProps {
  status: "idle" | "processing" | "downloading" | "complete" | "error";
  progress: number;
  message: string;
}

export function DownloadProgress({ status, progress, message }: DownloadProgressProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "processing":
      case "downloading":
        return <Loader2 className="w-4 h-4 animate-spin text-primary" />;
      case "complete":
        return <Check className="w-4 h-4 text-primary" />;
      case "error":
        return <X className="w-4 h-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getProgressColor = () => {
    if (status === "error") return "bg-destructive";
    if (status === "complete") return "bg-primary";
    return "bg-primary";
  };

  const generateProgressBlocks = () => {
    const totalBlocks = 30;
    const filledBlocks = Math.floor((progress / 100) * totalBlocks);
    const filled = "█".repeat(filledBlocks);
    const empty = "░".repeat(totalBlocks - filledBlocks);
    return filled + empty;
  };

  return (
    <div className="bg-background/50 border border-primary/20 rounded-md p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="font-mono text-xs uppercase tracking-wider text-foreground">
            {message}
          </span>
        </div>
        <span className="font-mono text-xs text-primary">
          {progress}%
        </span>
      </div>
      
      {/* ASCII Progress Bar */}
      <div className="font-mono text-xs text-primary mb-2 overflow-hidden">
        [{generateProgressBlocks()}]
      </div>

      {/* Modern Progress Bar */}
      <div className="h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${getProgressColor()} ${status === "downloading" || status === "processing" ? "progress-animated" : ""}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
