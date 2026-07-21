import type { GridNode } from "./types";

export const GRID_COLS = 12;
export const GRID_ROWS = 8;

export function nodeId(row: number, col: number): string {
  return `${row}-${col}`;
}

/**
 * Builds a deterministic demo grid with a handful of walls, so BFS, DFS and
 * Dijkstra all traverse a nontrivial, comparable graph. Weights are mostly 1
 * with a few "slow terrain" cells of weight 4, which makes Dijkstra's
 * shortest-path behavior visibly different from BFS's step count.
 */
export function buildDemoGrid(): { nodes: GridNode[]; startId: string; endId: string } {
  const wallCells = new Set([
    "1-3", "2-3", "3-3", "4-3",
    "3-6", "3-7", "3-8", "4-8", "5-8",
    "6-1", "6-2", "6-3", "6-4",
  ]);
  const slowCells = new Set(["2-5", "2-6", "2-7", "5-4", "5-5", "5-6"]);

  const nodes: GridNode[] = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const id = nodeId(row, col);
      nodes.push({
        id,
        row,
        col,
        wall: wallCells.has(id),
        weight: slowCells.has(id) ? 4 : 1,
      });
    }
  }

  return { nodes, startId: nodeId(0, 0), endId: nodeId(GRID_ROWS - 1, GRID_COLS - 1) };
}

export function neighbors(node: GridNode, nodesById: Map<string, GridNode>, cols: number, rows: number): GridNode[] {
  const deltas = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
  ];
  const result: GridNode[] = [];
  for (const [dr, dc] of deltas) {
    const r = node.row + dr;
    const c = node.col + dc;
    if (r < 0 || c < 0 || r >= rows || c >= cols) continue;
    const n = nodesById.get(nodeId(r, c));
    if (n && !n.wall) result.push(n);
  }
  return result;
}
