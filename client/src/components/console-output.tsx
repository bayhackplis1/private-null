import { motion } from "framer-motion";

interface ConsoleOutputProps {
  lines: string[];
}

export function ConsoleOutput({ lines }: ConsoleOutputProps) {
  return (
    <div className="bg-background/80 border border-primary/20 rounded-md overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 bg-card/50 border-b border-primary/10">
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
          CONSOLE_OUTPUT
        </span>
      </div>
      <div className="p-4 max-h-40 overflow-y-auto">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-xs text-primary/80 leading-relaxed"
          >
            {line}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
