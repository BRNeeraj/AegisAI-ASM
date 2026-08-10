import { useCallback, useEffect, useState } from "react";

const TOKEN_KEY = "aegis_token";
const USER_KEY = "aegis_user";

export type AuthUser = { name: string; email: string };

export function saveSession(token: string, user: AuthUser) {
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("aegis-auth"));
}

export function clearSession() {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event("aegis-auth"));
}

export function readUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function hasToken(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(window.localStorage.getItem(TOKEN_KEY));
}

export function useSession() {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  const sync = useCallback(() => {
    setUser(readUser());
    setAuthenticated(hasToken());
    setReady(true);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("aegis-auth", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("aegis-auth", sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);

  return { ready, user, authenticated };
}
