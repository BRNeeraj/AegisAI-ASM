import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cn("size-5 animate-spin text-cyan", className)} />;
}

export function LoadingBlock({ label = "Loading data" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-sm text-muted-foreground">
      <Spinner />
      <span>{label}...</span>
    </div>
  );
}
