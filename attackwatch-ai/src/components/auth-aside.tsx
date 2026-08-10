import { Activity, Radar, ShieldCheck, Sparkles } from "lucide-react";

const points = [
  { icon: Radar, title: "Continuous discovery", body: "Map shadow IT, subdomains and exposed services." },
  { icon: Activity, title: "AI prioritization", body: "CVSS + EPSS fused into a single exploitable risk score." },
  { icon: Sparkles, title: "Guided remediation", body: "Actionable fixes generated for every finding." },
];

export function AuthAside() {
  return (
    <div className="relative hidden overflow-hidden border-r border-border/60 lg:flex lg:flex-col lg:justify-center lg:px-14">
      <div className="grid-lines absolute inset-0 opacity-70" />
      <div
        className="absolute -left-24 top-1/3 size-[420px] rounded-full blur-3xl"
        style={{ background: "var(--gradient-accent)", opacity: 0.18 }}
      />
      <div className="relative">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-cyan">
          <ShieldCheck className="size-3.5" /> Attack surface management
        </div>
        <h1 className="max-w-lg text-4xl font-semibold leading-tight">
          See every exposed asset <span className="text-gradient">before attackers do</span>
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          AegisAI-ASM correlates discovery, vulnerability intelligence and exploit likelihood into a
          single prioritized queue for your SOC.
        </p>

        <div className="mt-10 space-y-4">
          {points.map((p) => (
            <div key={p.title} className="glass glass-hover flex items-start gap-3 p-4">
              <div className="grid size-9 shrink-0 place-items-center rounded-lg border border-cyan/30 bg-primary/20">
                <p.icon className="size-4 text-cyan" />
              </div>
              <div>
                <p className="text-sm font-medium">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
