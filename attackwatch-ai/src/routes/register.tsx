import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, Mail, ShieldCheck, User } from "lucide-react";
import { toast } from "sonner";
import { api, apiErrorMessage } from "@/lib/api";
import { Spinner } from "@/components/spinner";
import { AuthAside } from "@/components/auth-aside";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create account — AegisAI ASM" },
      {
        name: "description",
        content:
          "Create an AegisAI-ASM operator account to start discovering assets and scanning for vulnerabilities.",
      },
      { property: "og:title", content: "Create account — AegisAI ASM" },
      {
        property: "og:description",
        content: "Register for the AegisAI attack surface management console.",
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [loading, setLoading] = useState(false);

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      toast.error("All fields are required");
      return;
    }

    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", {
        username: form.name.trim(), // ✅ FIXED
        email: form.email.trim(),
        password: form.password,
      });

      toast.success("Account created successfully!");

      navigate({
        to: "/",
      });
    } catch (error) {
      toast.error(apiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    {
      key: "name" as const,
      label: "Name",
      type: "text",
      icon: User,
      placeholder: "Jane Analyst",
    },
    {
      key: "email" as const,
      label: "Email",
      type: "email",
      icon: Mail,
      placeholder: "analyst@company.com",
    },
    {
      key: "password" as const,
      label: "Password",
      type: "password",
      icon: Lock,
      placeholder: "••••••••",
    },
    {
      key: "confirm" as const,
      label: "Confirm Password",
      type: "password",
      icon: Lock,
      placeholder: "••••••••",
    },
  ];

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <AuthAside />

      <div className="flex items-center justify-center px-6 py-14">
        <div className="glass w-full max-w-md p-8">
          <div className="mb-8 flex items-center gap-2.5">
            <div className="grid size-9 place-items-center rounded-lg border border-cyan/40 bg-primary/20">
              <ShieldCheck className="size-5 text-cyan" />
            </div>

            <span className="font-display text-lg font-semibold">
              AegisAI-ASM
            </span>
          </div>

          <h2 className="text-2xl font-semibold">
            Create operator account
          </h2>

          <p className="mt-1.5 text-sm text-muted-foreground">
            Register to onboard your organization's attack surface.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            {fields.map((f) => (
              <label className="block" key={f.key}>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {f.label}
                </span>

                <div className="mt-2 flex items-center gap-2 rounded-lg border border-input bg-secondary/50 px-3 focus-within:border-cyan/60">
                  <f.icon className="size-4 text-muted-foreground" />

                  <input
                    type={f.type}
                    value={form[f.key]}
                    onChange={set(f.key)}
                    placeholder={f.placeholder}
                    maxLength={255}
                    className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </label>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading && (
                <Spinner className="size-4 text-primary-foreground" />
              )}

              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already registered?{" "}
            <Link
              to="/"
              className="font-medium text-cyan hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}