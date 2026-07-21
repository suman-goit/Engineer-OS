import type { AlgorithmModule, AlgorithmStep, NodeStatus } from "../engine/types";
import { neighbors } from "../engine/graph";

const bfs: AlgorithmModule = {
  id: "bfs",
  name: "Breadth-First Search",
  category: "Graph Traversal",
  summary:
    "Explores the graph level by level using a FIFO queue, guaranteeing the shortest path in an unweighted graph.",
  timeComplexity: "O(V + E)",
  spaceComplexity: "O(V)",
  pseudocode: `BFS(graph, start, end):
    queue <- [start]
    visited <- {start}
    parent <- {}

    while queue is not empty:
        node <- queue.dequeue()
        if node == end:
            return reconstructPath(parent, end)

        for neighbor in graph.neighbors(node):
            if neighbor not in visited:
                visited.add(neighbor)
                parent[neighbor] <- node
                queue.enqueue(neighbor)

    return no path found`,
  sourceCode: `export function bfs(nodes, cols, rows, startId, endId) {
  const nodesById = new Map(nodes.map((n) => [n.id, n]));
  const queue = [startId];
  const visited = new Set([startId]);
  const parent = new Map();
  const steps = [];

  while (queue.length > 0) {
    const currentId = queue.shift();
    steps.push(frame(visited, queue, currentId));

    if (currentId === endId) {
      return { steps: [...steps, pathFrame(parent, startId, endId)], pathFound: true };
    }

    const current = nodesById.get(currentId);
    for (const n of neighbors(current, nodesById, cols, rows)) {
      if (!visited.has(n.id)) {
        visited.add(n.id);
        parent.set(n.id, currentId);
        queue.push(n.id);
      }
    }
  }

  return { steps, pathFound: false };
}`,
  run: (nodes, cols, rows, startId, endId) => {
    const nodesById = new Map(nodes.map((n) => [n.id, n]));
    const queue: string[] = [startId];
    const visited = new Set<string>([startId]);
    const parent = new Map<string, string>();
    const steps: AlgorithmStep[] = [];

    const snapshot = (currentId: string): Record<string, NodeStatus> => {
      const statuses: Record<string, NodeStatus> = {};
      visited.forEach((id) => (statuses[id] = "visited"));
      queue.forEach((id) => (statuses[id] = "frontier"));
      statuses[currentId] = "current";
      statuses[startId] = "start";
      return statuses;
    };

    let found = false;
    while (queue.length > 0) {
      const currentId = queue.shift()!;
      steps.push({
        statuses: snapshot(currentId),
        note: `Dequeue ${currentId}. Queue size: ${queue.length}.`,
        structure: [...queue],
      });

      if (currentId === endId) {
        found = true;
        break;
      }

      const current = nodesById.get(currentId)!;
      for (const n of neighbors(current, nodesById, cols, rows)) {
        if (!visited.has(n.id)) {
          visited.add(n.id);
          parent.set(n.id, currentId);
          queue.push(n.id);
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
      steps.push({ statuses, note: `Path found! Length: ${path.length - 1} steps.` });
    } else {
      steps.push({
        statuses: Object.fromEntries([...visited].map((id) => [id, "visited" as NodeStatus])),
        note: "Queue exhausted — no path exists.",
      });
    }

    return { steps, pathFound: found };
  },
};

export default bfs;
