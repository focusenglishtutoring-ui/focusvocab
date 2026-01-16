import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className }: ProgressBarProps) {
  const progress = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex justify-between text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <span>Progress</span>
        <span>{current} / {total}</span>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
