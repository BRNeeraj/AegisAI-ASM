import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { NotificationPanel } from "@/components/notification-panel";
import { AlertTriangle, Boxes, Bug, Gauge } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { RequireAuth } from "@/components/require-auth";
import { LoadingBlock } from "@/components/spinner";
import { PriorityBadge, ScorePill, SeverityBadge } from "@/components/severity-badge";
import { api, apiErrorMessage } from "@/lib/api";
import {
  demoPriorityStats,
  demoServiceStats,
  demoSummary,
  demoVulnerabilities,
  type Summary,
  type Vulnerability,
} from "@/lib/demo-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Risk Dashboard — AegisAI ASM" },
      {
        name: "description",
        content:
          "Executive view of assets, vulnerability severity distribution, service exposure and the latest critical findings.",
      },
      { property: "og:title", content: "Risk Dashboard — AegisAI ASM" },
      {
        property: "og:description",
        content: "Assets, average risk score and prioritized vulnerabilities in one console.",
      },
    ],
  }),
  component: () => (
    <RequireAuth>
      <DashboardPage />
    </RequireAuth>
  ),
});

const severityColors: Record<string, string> = {
  Critical: "var(--critical)",
  High: "var(--high)",
  Medium: "var(--medium)",
  Low: "var(--low)",
};

function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<Summary>(demoSummary);
  const [priority, setPriority] = useState(demoPriorityStats);
  const [services, setServices] = useState(demoServiceStats);
  const [vulns, setVulns] = useState<Vulnerability[]>(demoVulnerabilities);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [s, p, sv, rv] = await Promise.all([
          api.get("/dashboard/summary"),
          api.get("/dashboard/priority-stats"),
          api.get("/dashboard/service-stats"),
          api.get("/dashboard/recent-vulnerabilities"),
        ]);
        if (cancelled) return;
        if (s.data) setSummary(s.data);
        if (Array.isArray(p.data)) setPriority(p.data);
        if (Array.isArray(sv.data)) setServices(sv.data);
        if (Array.isArray(rv.data)) setVulns(rv.data);
      } catch (error) {
        if (!cancelled)
          toast.error(apiErrorMessage(error), { description: "Showing sample telemetry instead." });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);
  const trendData = [
  { day: "Mon", risk: 78 },
  { day: "Tue", risk: 72 },
  { day: "Wed", risk: 68 },
  { day: "Thu", risk: 63 },
  { day: "Fri", risk: 59 },
  { day: "Sat", risk: 55 },
  {
    day: "Sun",
    risk: Number(summary.average_risk_score ?? 50),
  },
];
  const cards = [
    
    { label: "Total Assets", value: summary.total_assets, icon: Boxes, tone: "text-cyan" },
    {
      label: "Total Vulnerabilities",
      value: summary.total_vulnerabilities,
      icon: Bug,
      tone: "text-primary",
    },
    {
      label: "Average Risk Score",
      value: Number(summary.average_risk_score ?? 0).toFixed(1),
      icon: Gauge,
      tone: "text-medium",
    },
    {
      label: "Critical Vulnerabilities",
      value: summary.critical_vulnerabilities,
      icon: AlertTriangle,
      tone: "text-critical",
    },
  ];

  return (
    <AppShell title="Risk Dashboard" subtitle="Consolidated exposure across your external estate">
      {loading ? (
        <LoadingBlock label="Loading dashboard telemetry" />
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((c) => (
              <div key={c.label} className="glass glass-hover p-5">
                <div className="flex items-start justify-between">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {c.label}
                  </p>
                  <c.icon className={`size-4 ${c.tone}`} />
                </div>
                <p className="mt-4 font-display text-3xl font-semibold">{c.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-5">
            <div className="glass p-5 lg:col-span-2">
              <h2 className="text-sm font-semibold">Severity distribution</h2>
              <p className="text-xs text-muted-foreground">Findings grouped by severity class</p>
              <div className="mt-4 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={priority}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={95}
                      paddingAngle={3}
                      stroke="transparent"
                    >
                      {priority.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={severityColors[entry.name] ?? "var(--primary)"}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "var(--popover)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        fontSize: 12,
                      }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass p-5 lg:col-span-3">
              <h2 className="text-sm font-semibold">Vulnerabilities by service</h2>
              <p className="text-xs text-muted-foreground">Exposure concentration per protocol</p>
              <div className="mt-4 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={services}>
                    <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="4 4" />
                    <XAxis
                      dataKey="service"
                      stroke="var(--muted-foreground)"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="var(--muted-foreground)"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "color-mix(in oklab, var(--cyan) 8%, transparent)" }}
                      contentStyle={{
                        background: "var(--popover)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="var(--cyan)" maxBarSize={54} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="glass overflow-hidden lg:col-span-2">
              <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
                <div>
                  <h2 className="text-sm font-semibold">Recent Vulnerabilities</h2>
                  <p className="text-xs text-muted-foreground">
                    Latest 10 findings by detection time
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] text-sm">
                  <thead>
                    <tr className="border-b border-border/70 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                      {["ID", "CVE", "Service", "Severity", "Priority", "Risk Score", "CVSS"].map((h) => (
                        <th key={h} className="px-5 py-3 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {vulns.slice(0, 10).map((v) => (
                      <tr
                        key={v.id}
                        className="border-b border-border/40 hover:bg-secondary/40"
                      >
                        <td className="px-5 py-3">{v.id}</td>
                        <td className="px-5 py-3">{v.cve}</td>
                        <td className="px-5 py-3">{v.service}</td>
                        <td className="px-5 py-3">
                          <SeverityBadge severity={v.severity} />
                        </td>
                        <td className="px-5 py-3">
                          <PriorityBadge priority={v.priority} />
                        </td>
                        <td className="px-5 py-3">
                          <ScorePill value={v.risk_score} />
                        </td>
                        <td className="px-5 py-3">{Number(v.cvss).toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4">
              <NotificationPanel />

              <div className="glass p-5">
                <h2 className="text-sm font-semibold">Weekly Risk Trend</h2>
                <p className="text-xs text-muted-foreground">Average Risk Score (Last 7 Days)</p>

                <div className="mt-5 h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="risk"
                        stroke="#06b6d4"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}