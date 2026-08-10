import { cn } from "@/lib/utils";
import type { Severity } from "@/lib/demo-data";

const styles: Record<string, string> = {
  critical: "bg-critical/15 text-critical border-critical/40",
  high: "bg-high/15 text-high border-high/40",
  medium: "bg-medium/15 text-medium border-medium/40",
  low: "bg-low/15 text-low border-low/40",
};

export function SeverityBadge({
  severity,
  className,
}: {
  severity: Severity | string;
  className?: string;
}) {
  const key = String(severity).toLowerCase();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider",
        styles[key] ?? "bg-muted text-muted-foreground border-border",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {severity}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: string }) {
  return (
    <span className="inline-flex rounded-md border border-primary/40 bg-primary/15 px-2 py-0.5 font-mono text-[11px] font-semibold text-cyan">
      {priority}
    </span>
  );
}

export function ScorePill({ value, max = 10 }: { value: number; max?: number }) {
  const pct = Math.min(100, (Number(value) / max) * 100);
  const tone = pct >= 80 ? "bg-critical" : pct >= 60 ? "bg-high" : pct >= 35 ? "bg-medium" : "bg-low";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
        <div className={cn("h-full rounded-full", tone)} style={{ width: `${pct}%` }} />
      </div>
      <span className="font-mono text-xs text-foreground">{Number(value).toFixed(1)}</span>
    </div>
  );
}
