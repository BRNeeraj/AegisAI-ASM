import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { useState } from "react";
import { api } from "@/lib/api";

export const Route = createFileRoute("/ai-assistant")({
  component: AIPage,
});

function AIPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const { data } = await api.post("/ai/ask", {
        question,
      });

      setAnswer(data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("Unable to contact AI service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell
      title="AI Security Assistant"
      subtitle="AI powered cybersecurity recommendations"
    >
      <div className="space-y-6">

        <div className="rounded-xl border border-border bg-card p-6">

          <h2 className="text-xl font-semibold">
            Ask AegisAI
          </h2>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Example: Explain CVE-2024-3094"
            className="mt-5 h-40 w-full rounded-lg border bg-background p-4 outline-none"
          />

          <button
            onClick={askAI}
            disabled={loading}
            className="mt-5 rounded-lg bg-primary px-6 py-3 text-primary-foreground disabled:opacity-50"
          >
            {loading ? "Thinking..." : "Ask AI"}
          </button>

        </div>

        {answer && (

          <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-6">

            <h2 className="text-lg font-semibold text-cyan-400">
              AI Response
            </h2>

            <p className="mt-4 whitespace-pre-line text-muted-foreground">
              {answer}
            </p>

          </div>

        )}

      </div>
    </AppShell>
  );
}