import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Radar, Server, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { RequireAuth } from "@/components/require-auth";
import { API_BASE_URL } from "@/lib/api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — AegisAI ASM" },
      {
        name: "description",
        content: "Configure scan cadence, alert thresholds and backend connectivity for AegisAI-ASM.",
      },
      { property: "og:title", content: "Settings — AegisAI ASM" },
      { property: "og:description", content: "Tune scanning, alerting and platform connectivity." },
    ],
  }),
  component: () => (
    <RequireAuth>
      <SettingsPage />
    </RequireAuth>
  ),
});

function Toggle({
  label,
  description,
  defaultOn,
}: {
  label: string;
  description: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(Boolean(defaultOn));
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/40 py-4 last:border-0">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        onClick={() => {
          setOn((v) => !v);
          toast.success(`${label} ${on ? "disabled" : "enabled"}`);
        }}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          on ? "bg-primary" : "bg-secondary",
        )}
        aria-pressed={on}
        aria-label={label}
      >
        <span
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-foreground transition-transform",
            on ? "translate-x-5.5" : "translate-x-0.5",
          )}
        />
      </button>
    </div>
  );
}

function SettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Platform configuration and detection preferences">
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="glass p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Radar className="size-4 text-cyan" /> Discovery &amp; scanning
          </h2>
          <div className="mt-2">
            <Toggle
              label="Continuous discovery"
              description="Re-enumerate the attack surface every 6 hours."
              defaultOn
            />
            <Toggle
              label="Aggressive service fingerprinting"
              description="Deeper banner grabbing; higher scan noise."
            />
            <Toggle
              label="EPSS-weighted prioritization"
              description="Blend exploit prediction scores into risk ranking."
              defaultOn
            />
          </div>
        </section>

        <section className="glass p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Bell className="size-4 text-cyan" /> Alerting
          </h2>
          <div className="mt-2">
            <Toggle label="Critical finding alerts" description="Page on-call for any P1 finding." defaultOn />
            <Toggle label="Weekly executive digest" description="Summary of posture trend by email." defaultOn />
            <Toggle label="New asset notifications" description="Notify when shadow IT is discovered." />
          </div>
        </section>

        <section className="glass p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Server className="size-4 text-cyan" /> Backend connectivity
          </h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg border border-border/60 bg-secondary/40 px-3 py-2.5">
              <span className="text-muted-foreground">API base URL</span>
              <span className="font-mono text-xs text-cyan">{API_BASE_URL}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/60 bg-secondary/40 px-3 py-2.5">
              <span className="text-muted-foreground">Auth mode</span>
              <span className="font-mono text-xs">Bearer token</span>
            </div>
          </div>
        </section>

        <section className="glass p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <ShieldCheck className="size-4 text-cyan" /> Compliance
          </h2>
          <div className="mt-2">
            <Toggle label="Data residency lock" description="Keep scan artifacts in-region." defaultOn />
            <Toggle label="Audit trail export" description="Stream operator actions to your SIEM." />
          </div>
        </section>
      </div>
    </AppShell>
  );
}
