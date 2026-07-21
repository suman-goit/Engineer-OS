import { useState } from "react";
import type { AlgorithmModule } from "../engine/types";

type Tab = "overview" | "pseudocode" | "source";

export function AlgorithmDetailsTabs({ algorithm }: { algorithm: AlgorithmModule }) {
  const [tab, setTab] = useState<Tab>("overview");

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "pseudocode", label: "Pseudocode" },
    { id: "source", label: "Source" },
  ];

  return (
    <div className="rounded border border-border">
      <div className="flex border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={[
              "px-3 py-2 text-xs border-r border-border last:border-r-0",
              tab === t.id ? "bg-accent/10 text-accent" : "text-text-dim hover:text-text",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-4 text-sm max-h-80 overflow-y-auto">
        {tab === "overview" && (
          <div className="space-y-3">
            <p className="text-text-dim leading-relaxed">{algorithm.summary}</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded border border-border p-2.5">
                <p className="text-[11px] text-text-dim">Time Complexity</p>
                <p className="text-accent font-medium">{algorithm.timeComplexity}</p>
              </div>
              <div className="rounded border border-border p-2.5">
                <p className="text-[11px] text-text-dim">Space Complexity</p>
                <p className="text-accent font-medium">{algorithm.spaceComplexity}</p>
              </div>
            </div>
          </div>
        )}

        {tab === "pseudocode" && (
          <pre className="whitespace-pre-wrap text-xs leading-relaxed text-text-dim">
            {algorithm.pseudocode}
          </pre>
        )}

        {tab === "source" && (
          <pre className="whitespace-pre-wrap text-xs leading-relaxed text-text-dim">
            <code>{algorithm.sourceCode}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
