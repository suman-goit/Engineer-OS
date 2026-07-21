import type { CaseStudy } from "../types";

export const algorithmsLabEngine: CaseStudy = {
  id: "algorithms-lab-engine",
  title: "One visualizer, three algorithms: building a reusable step-playback engine",
  date: "2026-07",
  tags: ["algorithms", "visualization", "react"],
  problem:
    "BFS, DFS, and Dijkstra needed interactive visualizations with identical playback UX (play/pause/step/speed), without duplicating the player or canvas code three times.",
  constraints: [
    "Must be trivial to add a 4th, 5th, Nth algorithm later",
    "Playback controls must be algorithm-agnostic",
    "Pure functions preferred over stateful class-based simulations for testability",
  ],
  architecture:
    "Each algorithm is implemented as a pure function that takes a graph and returns a flat array of AlgorithmStep frames up front (rather than stepping live). A generic useStepPlayer hook indexes into that array to drive play/pause/reset/speed for any algorithm. AlgorithmVisualizer only depends on the AlgorithmModule interface, so GraphCanvas, PlaybackControls, and AlgorithmDetailsTabs never change when a new algorithm is added.",
  tradeoffs: [
    "Precomputing all steps up front (vs. generators/coroutines) trades some memory for much simpler, testable, replayable logic — fine at this graph size.",
    "A hand-rolled O(n log n)-via-sort priority queue over a real binary heap — readability for a teaching tool over micro-optimized performance.",
  ],
  implementation:
    "AlgorithmModule { run(nodes, cols, rows, start, end) => { steps, pathFound } }. algorithmRegistry.ts is the only file that lists concrete algorithms; AlgorithmsLabPage renders whichever is selected through the exact same AlgorithmVisualizer.",
  lessonsLearned: [
    "Separating 'what happened' (step data) from 'how it's shown' (playback UI) made 3 very different algorithms share 100% of the UI code.",
    "A shared demo grid graph makes cross-algorithm comparison (e.g. BFS vs Dijkstra shortest path) meaningful instead of arbitrary.",
  ],
  futureImprovements: [
    "Add A* with a heuristic overlay to compare against Dijkstra directly.",
    "Let users edit the grid (draw walls, drag start/end) instead of a fixed demo graph.",
  ],
};
