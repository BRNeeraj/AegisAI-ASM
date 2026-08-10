import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Globe, Radar, Search } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { RequireAuth } from "@/components/require-auth";
import { Spinner } from "@/components/spinner";
import { api, apiErrorMessage } from "@/lib/api";
import { demoAssets, type Asset } from "@/lib/demo-data";

export const Route = createFileRoute("/asset-discovery")({
  head: () => ({
    meta: [
      { title: "Asset Discovery — AegisAI ASM" },
      {
        name: "description",
        content:
          "Enumerate subdomains, IPs and exposed services for any domain to reveal unmanaged internet-facing assets.",
      },
      { property: "og:title", content: "Asset Discovery — AegisAI ASM" },
      {
        property: "og:description",
        content: "Discover shadow IT and internet-facing assets across your estate.",
      },
    ],
  }),
  component: () => (
    <RequireAuth>
      <AssetDiscoveryPage />
    </RequireAuth>
  ),
});

function AssetDiscoveryPage() {
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState<Asset[] | null>(null);

  async function discover(e: React.FormEvent) {
    e.preventDefault();
    const value = target.trim();
    if (!value) {
      toast.error("Enter a domain or IP to discover");
      return;
    }
    if (value.length > 253 || /\s/.test(value)) {
      toast.error("Enter a valid domain or IP address");
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post("/assets/discover", { target: value, domain: value });
      const list: Asset[] = Array.isArray(data) ? data : (data?.assets ?? []);
      setAssets(list);
      toast.success(`Discovery complete — ${list.length} assets found`);
    } catch (error) {
      toast.error(apiErrorMessage(error), { description: "Showing sample discovery results." });
      setAssets(demoAssets);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell title="Asset Discovery" subtitle="Enumerate the internet-facing footprint of a target">
      <div className="space-y-6">
        <form onSubmit={discover} className="glass p-5">
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Domain / IP
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-input bg-secondary/50 px-3 focus-within:border-cyan/60">
              <Globe className="size-4 text-muted-foreground" />
              <input
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="example.com or 93.184.216.34"
                maxLength={253}
                className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? <Spinner className="size-4 text-primary-foreground" /> : <Search className="size-4" />}
              {loading ? "Discovering" : "Discover"}
            </button>
          </div>
        </form>

        {loading && (
          <div className="glass flex items-center gap-3 p-5 text-sm text-muted-foreground">
            <Spinner />
            Resolving DNS records, certificates and open ports...
          </div>
        )}

        {!loading && assets === null && (
          <div className="glass flex flex-col items-center gap-3 px-6 py-16 text-center">
            <div className="grid size-12 place-items-center rounded-full border border-cyan/30 bg-primary/15">
              <Radar className="size-5 text-cyan" />
            </div>
            <p className="text-sm font-medium">No discovery run yet</p>
            <p className="max-w-sm text-xs text-muted-foreground">
              Enter a domain or IP above to enumerate subdomains, hosts and exposed services.
            </p>
          </div>
        )}

        {!loading && assets !== null && (
          <div className="glass overflow-hidden">
            <div className="border-b border-border/70 px-5 py-4">
              <h2 className="text-sm font-semibold">Discovered assets</h2>
              <p className="text-xs text-muted-foreground">{assets.length} results</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead>
                  <tr className="border-b border-border/70 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                    {["Asset", "IP Address", "Type", "Open Ports", "Status"].map((h) => (
                      <th key={h} className="px-5 py-3 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {assets.map((a) => (
                    <tr
                      key={a.id ?? a.asset}
                      className="border-b border-border/40 transition-colors last:border-0 hover:bg-secondary/40"
                    >
                      <td className="px-5 py-3 font-medium">{a.asset}</td>
                      <td className="px-5 py-3 font-mono text-xs text-cyan">{a.ip}</td>
                      <td className="px-5 py-3 text-muted-foreground">{a.type}</td>
                      <td className="px-5 py-3 font-mono text-xs">{a.ports ?? "—"}</td>
                      <td className="px-5 py-3">
                        <span className="rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-[11px]">
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
