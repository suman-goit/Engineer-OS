import type { GridNode, NodeStatus } from "../engine/types";

const STATUS_COLORS: Record<NodeStatus, string> = {
  idle: "#161b22",
  wall: "#30363d",
  frontier: "#d29922",
  visited: "#1f6feb",
  current: "#58a6ff",
  path: "#3fb950",
  start: "#3fb950",
  end: "#f85149",
};

interface GraphCanvasProps {
  nodes: GridNode[];
  cols: number;
  rows: number;
  statuses: Record<string, NodeStatus>;
  startId: string;
  endId: string;
}

const CELL = 34;
const GAP = 3;

export function GraphCanvas({ nodes, cols, rows, statuses, startId, endId }: GraphCanvasProps) {
  const width = cols * (CELL + GAP);
  const height = rows * (CELL + GAP);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto max-w-full"
      role="img"
      aria-label="Graph traversal grid"
    >
      {nodes.map((n) => {
        const status: NodeStatus = n.wall ? "wall" : statuses[n.id] ?? "idle";
        const x = n.col * (CELL + GAP);
        const y = n.row * (CELL + GAP);
        const isEndpoint = n.id === startId || n.id === endId;
        return (
          <g key={n.id}>
            <rect
              x={x}
              y={y}
              width={CELL}
              height={CELL}
              rx={4}
              fill={STATUS_COLORS[status]}
              stroke={status === "idle" ? "#30363d" : "transparent"}
              strokeWidth={1}
              className="transition-colors duration-150"
            />
            {isEndpoint && (
              <text
                x={x + CELL / 2}
                y={y + CELL / 2 + 4}
                textAnchor="middle"
                fontSize="12"
                fontWeight={700}
                fill="#0d1117"
              >
                {n.id === startId ? "S" : "E"}
              </text>
            )}
            {!isEndpoint && n.weight > 1 && !n.wall && (
              <text
                x={x + CELL / 2}
                y={y + CELL / 2 + 4}
                textAnchor="middle"
                fontSize="10"
                fill="#8b949e"
              >
                {n.weight}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export { STATUS_COLORS };
