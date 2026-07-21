import { useMemo } from "react";
import type { AlgorithmModule } from "../engine/types";
import { buildDemoGrid, GRID_COLS, GRID_ROWS } from "../engine/graph";
import { useStepPlayer } from "../engine/useStepPlayer";
import { GraphCanvas } from "./GraphCanvas";
import { PlaybackControls } from "./PlaybackControls";
import { AlgorithmDetailsTabs } from "./AlgorithmDetailsTabs";

/**
 * AlgorithmVisualizer is fully generic over `AlgorithmModule`. It doesn't
 * know whether it's rendering BFS, DFS, or Dijkstra -- swapping the
 * `algorithm` prop is the entire integration surface for a new algorithm.
 */
export function AlgorithmVisualizer({ algorithm }: { algorithm: AlgorithmModule }) {
  const { nodes, startId, endId } = useMemo(() => buildDemoGrid(), []);

  const result = useMemo(
    () => algorithm.run(nodes, GRID_COLS, GRID_ROWS, startId, endId),
    [algorithm, nodes, startId, endId]
  );

  const player = useStepPlayer(result.steps);
  const currentStep = player.current ?? result.steps[0];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded border border-border p-4">
          <GraphCanvas
            nodes={nodes}
            cols={GRID_COLS}
            rows={GRID_ROWS}
            statuses={currentStep?.statuses ?? {}}
            startId={startId}
            endId={endId}
          />
        </div>

        <div className="space-y-3">
          <div className="rounded border border-border p-3 text-sm min-h-[88px]">
            <p className="text-[11px] text-text-dim mb-1">narration</p>
            <p className="text-text">{currentStep?.note ?? "Ready."}</p>
          </div>
          {currentStep?.structure && (
            <div className="rounded border border-border p-3 text-xs">
              <p className="text-[11px] text-text-dim mb-1">
                {algorithm.id === "dijkstra" ? "priority queue" : algorithm.id === "dfs" ? "stack" : "queue"}
              </p>
              <p className="text-accent break-words">
                {currentStep.structure.length > 0 ? currentStep.structure.join(", ") : "empty"}
              </p>
            </div>
          )}
          <Legend />
        </div>
      </div>

      <PlaybackControls
        playing={player.playing}
        onToggle={player.toggle}
        onReset={player.reset}
        onStepBack={player.stepBackward}
        onStepForward={player.stepForward}
        isFirst={player.isFirst}
        isLast={player.isLast}
        speed={player.speed}
        onSpeedChange={player.setSpeed}
        index={player.index}
        total={result.steps.length}
      />

      <AlgorithmDetailsTabs algorithm={algorithm} />
    </div>
  );
}

function Legend() {
  const items: { label: string; color: string }[] = [
    { label: "start", color: "#3fb950" },
    { label: "end", color: "#f85149" },
    { label: "frontier", color: "#d29922" },
    { label: "visited", color: "#1f6feb" },
    { label: "current", color: "#58a6ff" },
    { label: "path", color: "#3fb950" },
    { label: "wall", color: "#30363d" },
  ];
  return (
    <div className="rounded border border-border p-3">
      <p className="text-[11px] text-text-dim mb-2">legend</p>
      <div className="flex flex-wrap gap-2.5">
        {items.map((i) => (
          <div key={i.label} className="flex items-center gap-1.5 text-[11px] text-text-dim">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: i.color }} />
            {i.label}
          </div>
        ))}
      </div>
    </div>
  );
}
