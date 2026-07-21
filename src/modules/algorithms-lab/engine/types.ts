import type { ComponentType } from "react";

/** A single cell in the visualizer's grid graph. */
export interface GridNode {
  id: string;
  row: number;
  col: number;
  /** Walls are non-traversable nodes; used to make the demo graph interesting. */
  wall: boolean;
  /** Edge weight used when leaving this node (Dijkstra). 1 for unweighted algorithms. */
  weight: number;
}

export type NodeStatus = "idle" | "frontier" | "visited" | "current" | "path" | "wall" | "start" | "end";

/** One frame of algorithm execution, used to drive the step-by-step player. */
export interface AlgorithmStep {
  /** Node id -> visual status for this frame. */
  statuses: Record<string, NodeStatus>;
  /** Short human-readable narration of what happened in this step. */
  note: string;
  /** Optional running data structure snapshot (queue/stack/priority queue contents). */
  structure?: string[];
}

export interface AlgorithmResult {
  steps: AlgorithmStep[];
  pathFound: boolean;
}

/**
 * AlgorithmModule is the contract every algorithm (BFS, DFS, Dijkstra, and
 * anything added later) must implement to plug into the Algorithms Lab
 * visualizer. The visualizer component only depends on this shape.
 */
export interface AlgorithmModule {
  id: string;
  name: string;
  category: "Graph Traversal" | "Shortest Path";
  summary: string;
  timeComplexity: string;
  spaceComplexity: string;
  pseudocode: string;
  sourceCode: string;
  /** Pure function: given a grid + start/end, produce the full list of animation steps. */
  run: (nodes: GridNode[], cols: number, rows: number, startId: string, endId: string) => AlgorithmResult;
}

export interface AlgorithmMeta {
  id: string;
  name: string;
  category: string;
  summary: string;
}

export interface AlgorithmRegistryEntry extends AlgorithmMeta {
  load: () => Promise<{ default: AlgorithmModule }>;
}

export type IconComponent = ComponentType<{ className?: string }>;
