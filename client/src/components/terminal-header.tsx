interface TerminalHeaderProps {
  title: string;
}

export function TerminalHeader({ title }: TerminalHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-card border border-b-0 border-primary/30 rounded-t-md px-4 py-2">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-destructive/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-primary/80" />
      </div>
      <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
        {title}
      </span>
      <div className="w-16" />
    </div>
  );
}
