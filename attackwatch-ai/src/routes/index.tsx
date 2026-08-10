import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { api, apiErrorMessage } from "@/lib/api";
import { saveSession } from "@/lib/auth";
import { Spinner } from "@/components/spinner";
import { AuthAside } from "@/components/auth-aside";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign in — AegisAI ASM Platform" },
      {
        name: "description",
        content:
          "Sign in to AegisAI-ASM to monitor your external attack surface, assets and prioritized vulnerabilities.",
      },
      { property: "og:title", content: "Sign in — AegisAI ASM Platform" },
      {
        property: "og:description",
        content: "Attack surface management console for continuous asset and vulnerability visibility.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Email and password are required");
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email: email.trim(), password });
      saveSession(data?.access_token ?? data?.token ?? "session", {
        name: data?.user?.name ?? email.split("@")[0],
        email: data?.user?.email ?? email.trim(),
      });
      toast.success("Welcome back to AegisAI");
      navigate({ to: "/dashboard" });
    } catch (error) {
      toast.error(apiErrorMessage(error), {
        description: "Continuing in demo mode with sample telemetry.",
      });
      saveSession("demo-session", { name: email.split("@")[0] || "Operator", email: email.trim() });
      navigate({ to: "/dashboard" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthAside />
      <div className="flex items-center justify-center px-6 py-14">
        <div className="glass w-full max-w-md p-8">
          <div className="mb-8 flex items-center gap-2.5">
            <div className="grid size-9 place-items-center rounded-lg border border-cyan/40 bg-primary/20">
              <ShieldCheck className="size-5 text-cyan" />
            </div>
            <span className="font-display text-lg font-semibold">AegisAI-ASM</span>
          </div>
          <h2 className="text-2xl font-semibold">Sign in to your console</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Use your operator credentials to access the attack surface console.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Email
              </span>
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-input bg-secondary/50 px-3 focus-within:border-cyan/60">
                <Mail className="size-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@company.com"
                  maxLength={255}
                  className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Password
              </span>
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-input bg-secondary/50 px-3 focus-within:border-cyan/60">
                <Lock className="size-4 text-muted-foreground" />
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  maxLength={128}
                  className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
                />
                <button type="button" onClick={() => setShow((s) => !s)} aria-label="Toggle password">
                  {show ? (
                    <EyeOff className="size-4 text-muted-foreground" />
                  ) : (
                    <Eye className="size-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading && <Spinner className="size-4 text-primary-foreground" />}
              {loading ? "Authenticating" : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            No account yet?{" "}
            <Link to="/register" className="font-medium text-cyan hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
