import { Window } from "../../shell/components/Window";
import { entryRegistry } from "./entryRegistry";
import { CaseStudyEntry } from "./components/CaseStudyEntry";

export default function EngineeringLogPage() {
  return (
    <Window title="engineering-log" subtitle={`${entryRegistry.length} case studies`}>
      <div className="mx-auto max-w-3xl space-y-4">
        <p className="text-text-dim text-sm mb-2">
          Case studies, not project cards — each entry documents the actual decisions, trade-offs,
          and lessons behind a piece of Engineer OS.
        </p>
        {entryRegistry.map((entry) => (
          <CaseStudyEntry key={entry.id} entry={entry} />
        ))}
      </div>
    </Window>
  );
}
