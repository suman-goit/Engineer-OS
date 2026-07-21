import { useState } from "react";
import { Window } from "../../shell/components/Window";
import { algorithmRegistry } from "./engine/algorithmRegistry";
import { AlgorithmVisualizer } from "./components/AlgorithmVisualizer";

export default function AlgorithmsLabPage() {
  const [activeId, setActiveId] = useState(algorithmRegistry[0].id);
  const active = algorithmRegistry.find((a) => a.id === activeId) ?? algorithmRegistry[0];

  return (
    <Window
      title="algorithms-lab"
      subtitle={`${active.category} · ${active.name}`}
      actions={
        <div className="flex gap-1">
          {algorithmRegistry.map((a) => (
            <button
              key={a.id}
              onClick={() => setActiveId(a.id)}
              className={[
                "rounded px-2.5 py-1 text-xs border",
                a.id === activeId
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-border text-text-dim hover:text-text",
              ].join(" ")}
            >
              {a.name.split(" ")[0]}
            </button>
          ))}
        </div>
      }
    >
      <div className="mb-4">
        <p className="text-text-dim text-sm">
          Same demo grid, same start/end nodes — swap algorithms to compare how each one explores
          the graph and whether it finds the shortest path.
        </p>
      </div>
      <AlgorithmVisualizer key={active.id} algorithm={active} />
    </Window>
  );
}
