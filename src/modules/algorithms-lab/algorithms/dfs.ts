import type { AlgorithmModule, AlgorithmStep, NodeStatus } from "../engine/types";
import { neighbors } from "../engine/graph";

const dfs: AlgorithmModule = {
  id: "dfs",
  name: "Depth-First Search",
  category: "Graph Traversal",
  summary:
    "Explores as far as possible down each branch using a LIFO stack before backtracking. Does not guarantee shortest path.",
  timeComplexity: "O(V + E)",
  spaceComplexity: "O(V)",
  pseudocode: `DFS(graph, start, end):
    stack <- [start]
    visited <- {}
    parent <- {}

    while stack is not empty:
        node <- stack.pop()
        if node in visited:
            continue
        visited.add(node)

        if node == end:
            return reconstructPath(parent, end)

        for neighbor in graph.neighbors(node):
            if neighbor not in visited:
                parent[neighbor] <- node
                stack.push(neighbor)

    return no path found`,
  sourceCode: `export function dfs(nodes, cols, rows, startId, endId) {
  const nodesById = new Map(nodes.map((n) => [n.id, n]));
  const stack = [startId];
  const visited = new Set();
  const parent = new Map();
  const steps = [];

  while (stack.length > 0) {
    const currentId = stack.pop();
    if (visited.has(currentId)) continue;
    visited.add(currentId);
    steps.push(frame(visited, stack, currentId));

    if (currentId === endId) {
      return { steps: [...steps, pathFrame(parent, startId, endId)], pathFound: true };
    }

    const current = nodesById.get(currentId);
    for (const n of neighbors(current, nodesById, cols, rows)) {
      if (!visited.has(n.id)) {
        parent.set(n.id, currentId);
        stack.push(n.id);
      }
    }
  }

  return { steps, pathFound: false };
}`,
  run: (nodes, cols, rows, startId, endId) => {
    const nodesById = new Map(nodes.map((n) => [n.id, n]));
    const stack: string[] = [startId];
    const visited = new Set<string>();
    const parent = new Map<string, string>();
    const steps: AlgorithmStep[] = [];

    const snapshot = (currentId: string): Record<string, NodeStatus> => {
      const statuses: Record<string, NodeStatus> = {};
      visited.forEach((id) => (statuses[id] = "visited"));
      stack.forEach((id) => (statuses[id] = statuses[id] ?? "frontier"));
      statuses[currentId] = "current";
      statuses[startId] = "start";
      return statuses;
    };

    let found = false;
    while (stack.length > 0) {
      const currentId = stack.pop()!;
      if (visited.has(currentId)) continue;
      visited.add(currentId);

      steps.push({
        statuses: snapshot(currentId),
        note: `Visit ${currentId}. Stack size: ${stack.length}.`,
        structure: [...stack],
      });

      if (currentId === endId) {
        found = true;
        break;
      }

      const current = nodesById.get(currentId)!;
      for (const n of neighbors(current, nodesById, cols, rows)) {
        if (!visited.has(n.id)) {
          parent.set(n.id, currentId);
          stack.push(n.id);
        }
      }
    }

    if (found) {
      const path: string[] = [endId];
      let cur = endId;
      while (cur !== startId) {
        cur = parent.get(cur)!;
        path.push(cur);
      }
      const statuses: Record<string, NodeStatus> = {};
      visited.forEach((id) => (statuses[id] = "visited"));
      path.forEach((id) => (statuses[id] = "path"));
      statuses[startId] = "start";
      statuses[endId] = "end";
      steps.push({ statuses, note: `Path found! Length: ${path.length - 1} steps (not guaranteed shortest).` });
    } else {
      steps.push({
        statuses: Object.fromEntries([...visited].map((id) => [id, "visited" as NodeStatus])),
        note: "Stack exhausted — no path exists.",
      });
    }

    return { steps, pathFound: found };
  },
};

export default dfs;
