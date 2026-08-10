import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  LayoutDashboard,
  LogOut,
  Radar,
  Settings,
  ShieldCheck,
  User,
  Menu,
  X,
  FileText,
  Bot,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { clearSession, useSession } from "@/lib/auth";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },

  { to: "/asset-discovery", label: "Asset Discovery", icon: Radar },

  { to: "/vulnerability-scanner", label: "Vulnerability Scanner", icon: Activity },

  { to: "/reports", label: "Reports", icon: FileText },

  { to: "/ai-assistant", label: "AI Assistant", icon: Bot },

  { to: "/settings", label: "Settings", icon: Settings },

  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useSession();
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  function logout() {
    clearSession();
    toast.success("Signed out");
    navigate({ to: "/", replace: true });
  }

  return (
    <div className="flex min-h-screen">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-sidebar-border bg-sidebar/95 backdrop-blur-xl transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-2.5 px-5 py-5">
          <div className="grid size-9 place-items-center rounded-lg border border-cyan/40 bg-primary/20">
            <ShieldCheck className="size-5 text-cyan" />
          </div>

          <div>
            <p className="font-display text-sm font-semibold leading-tight">
              AegisAI
            </p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              ASM
            </p>
          </div>

          <button
            className="ml-auto lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          >
            <X className="size-4 text-muted-foreground" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {nav.map((item) => {
            const active = pathname === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "border border-cyan/30 bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon
                  className={cn("size-4", active && "text-cyan")}
                />

                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <div className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="grid size-8 place-items-center rounded-full bg-primary/25 font-mono text-xs text-cyan">
              {(user?.name ?? "SO").slice(0, 2).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-medium">
                {user?.name ?? "Security Operator"}
              </p>

              <p className="truncate text-[11px] text-muted-foreground">
                {user?.email ?? "soc@aegisai.io"}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-background/70 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border/70 bg-background/80 px-4 py-4 backdrop-blur-xl sm:px-8">
          <button
            className="lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold sm:text-xl">
              {title}
            </h1>

            {subtitle && (
              <p className="truncate text-xs text-muted-foreground sm:text-sm">
                {subtitle}
              </p>
            )}
          </div>

          <div className="ml-auto hidden items-center gap-2 rounded-full border border-low/30 bg-low/10 px-3 py-1.5 text-[11px] font-medium text-low sm:flex">
            <span className="size-1.5 rounded-full bg-low pulse-ring" />
            Continuous monitoring active
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}