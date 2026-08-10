import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut, Mail, Shield, User } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { RequireAuth } from "@/components/require-auth";
import { clearSession, useSession } from "@/lib/auth";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Operator Profile — AegisAI ASM" },
      {
        name: "description",
        content: "Review your AegisAI-ASM operator identity, role and session details.",
      },
      { property: "og:title", content: "Operator Profile — AegisAI ASM" },
      { property: "og:description", content: "Operator identity and access details." },
    ],
  }),
  component: () => (
    <RequireAuth>
      <ProfilePage />
    </RequireAuth>
  ),
});

function ProfilePage() {
  const { user } = useSession();
  const navigate = useNavigate();

  return (
    <AppShell title="Profile" subtitle="Your operator identity and access scope">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass p-6 lg:col-span-1">
          <div className="flex items-center gap-4">
            <div className="grid size-14 place-items-center rounded-2xl border border-cyan/30 bg-primary/20 font-display text-lg text-cyan">
              {(user?.name ?? "SO").slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate font-display text-lg font-semibold">
                {user?.name ?? "Security Operator"}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {user?.email ?? "soc@aegisai.io"}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              clearSession();
              toast.success("Signed out");
              navigate({ to: "/", replace: true });
            }}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"
          >
            <LogOut className="size-4" /> Logout
          </button>
        </div>

        <div className="glass p-6 lg:col-span-2">
          <h2 className="text-sm font-semibold">Account details</h2>
          <div className="mt-4 space-y-3">
            {[
              { icon: User, label: "Full name", value: user?.name ?? "Security Operator" },
              { icon: Mail, label: "Email", value: user?.email ?? "soc@aegisai.io" },
              { icon: Shield, label: "Role", value: "SOC Analyst — Tier 2" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center gap-3 rounded-lg border border-border/60 bg-secondary/40 px-4 py-3"
              >
                <row.icon className="size-4 text-cyan" />
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {row.label}
                </span>
                <span className="ml-auto text-sm">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Assets owned", value: "148" },
              { label: "Open P1 findings", value: "24" },
              { label: "Scans this month", value: "312" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-border/60 bg-secondary/40 p-4">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
                <p className="mt-1 font-display text-2xl font-semibold">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
