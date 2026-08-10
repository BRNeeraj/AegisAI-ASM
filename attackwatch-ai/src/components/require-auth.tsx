import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useSession } from "@/lib/auth";
import { LoadingBlock } from "@/components/spinner";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { ready, authenticated } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !authenticated) navigate({ to: "/", replace: true });
  }, [ready, authenticated, navigate]);

  if (!ready || !authenticated) {
    return (
      <div className="min-h-screen">
        <LoadingBlock label="Verifying session" />
      </div>
    );
  }

  return <>{children}</>;
}
