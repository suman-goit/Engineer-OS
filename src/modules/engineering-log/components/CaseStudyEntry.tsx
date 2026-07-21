import { useState } from "react";
import type { CaseStudy } from "../types";

const SECTIONS: { key: keyof CaseStudy; label: string }[] = [
  { key: "problem", label: "Problem" },
  { key: "constraints", label: "Constraints" },
  { key: "architecture", label: "Architecture" },
  { key: "tradeoffs", label: "Trade-offs" },
  { key: "implementation", label: "Implementation" },
  { key: "lessonsLearned", label: "Lessons Learned" },
  { key: "futureImprovements", label: "Future Improvements" },
];

export function CaseStudyEntry({ entry }: { entry: CaseStudy }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="rounded border border-border">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <div>
          <p className="text-text font-medium">{entry.title}</p>
          <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-text-dim">
            <span>{entry.date}</span>
            {entry.tags.map((t) => (
              <span key={t} className="rounded border border-border px-1.5">
                {t}
              </span>
            ))}
          </div>
        </div>
        <span className="text-text-dim text-xs shrink-0 ml-3">{expanded ? "▾" : "▸"}</span>
      </button>

      {expanded && (
        <div className="border-t border-border px-4 py-4 space-y-4 text-sm">
          {SECTIONS.map(({ key, label }) => {
            const value = entry[key];
            if (!value || (Array.isArray(value) && value.length === 0)) return null;
            return (
              <div key={key}>
                <p className="text-[11px] font-semibold text-accent mb-1.5">{label}</p>
                {Array.isArray(value) ? (
                  <ul className="space-y-1 text-text-dim">
                    {(value as string[]).map((v, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-accent">▸</span>
                        {v}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-text-dim leading-relaxed">{value as string}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}
