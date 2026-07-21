import type { AlgorithmModule, AlgorithmStep, NodeStatus } from "../engine/types";
import { neighbors } from "../engine/graph";

/** Minimal binary-heap-free priority queue -- fine at this grid's scale, and keeps the demo readable. */
class SimplePriorityQueue {
  private items: { id: string; priority: number }[] = [];
  push(id: string, priority: number) {
    this.items.push({ id, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }
  pop() {
    return this.items.shift();
  }
  get length() {
    return this.items.length;
  }
  ids() {
    return this.items.map((i) => i.id);
  }
}

const dijkstra: AlgorithmModule = {
  id: "dijkstra",
  name: "Dijkstra's Algorithm",
  category: "Shortest Path",
  summary:
    "Greedily expands the lowest-cost frontier node using a priority queue, guaranteeing the shortest path in a weighted graph with non-negative weights.",
  timeComplexity: "O((V + E) log V)",
  spaceComplexity: "O(V)",
  pseudocode: `Dijkstra(graph, start, end):
    dist <- {node: infinity for all nodes}
    dist[start] <- 0
    pq <- priority queue with (start, 0)
    parent <- {}

    while pq is not empty:
        node <- pq.popMin()
        if node == end:
            return reconstructPath(parent, end)

        for (neighbor, weight) in graph.neighbors(node):
            newDist <- dist[node] + weight
            if newDist < dist[neighbor]:
                dist[neighbor] <- newDist
                parent[neighbor] <- node
                pq.push(neighbor, newDist)

    return no path found`,
  sourceCode: `export function dijkstra(nodes, cols, rows, startId, endId) {
  const nodesById = new Map(nodes.map((n) => [n.id, n]));
  const dist = new Map(nodes.map((n) => [n.id, Infinity]));
  dist.set(startId, 0);
  const pq = new SimplePriorityQueue();
  pq.push(startId, 0);
  const parent = new Map();
  const visited = new Set();
  const steps = [];

  while (pq.length > 0) {
    const { id: currentId } = pq.pop();
    if (visited.has(currentId)) continue;
    visited.add(currentId);
    steps.push(frame(visited, pq, currentId));

    if (currentId === endId) {
      return { steps: [...steps, pathFrame(parent, startId, endId)], pathFound: true };
    }

    const current = nodesById.get(currentId);
    for (const n of neighbors(current, nodesById, cols, rows)) {
      const newDist = dist.get(currentId) + n.weight;
      if (newDist < dist.get(n.id)) {
        dist.set(n.id, newDist);
        parent.set(n.id, currentId);
        pq.push(n.id, newDist);
      }
    }
  }

  return { steps, pathFound: false };
}`,
  run: (nodes, cols, rows, startId, endId) => {
    const nodesById = new Map(nodes.map((n) => [n.id, n]));
    const dist = new Map<string, number>(nodes.map((n) => [n.id, Infinity]));
    dist.set(startId, 0);
    const pq = new SimplePriorityQueue();
    pq.push(startId, 0);
    const parent = new Map<string, string>();
    const visited = new Set<string>();
    const steps: AlgorithmStep[] = [];

    const snapshot = (currentId: string): Record<string, NodeStatus> => {
      const statuses: Record<string, NodeStatus> = {};
      visited.forEach((id) => (statuses[id] = "visited"));
      pq.ids().forEach((id) => (statuses[id] = statuses[id] ?? "frontier"));
      statuses[currentId] = "current";
      statuses[startId] = "start";
      return statuses;
    };

    let found = false;
    while (pq.length > 0) {
      const popped = pq.pop()!;
      const currentId = popped.id;
      if (visited.has(currentId)) continue;
      visited.add(currentId);

      steps.push({
        statuses: snapshot(currentId),
        note: `Settle ${currentId} at distance ${dist.get(currentId)}.`,
        structure: pq.ids().map((id) => `${id} (${dist.get(id)})`),
      });

      if (currentId === endId) {
        found = true;
        break;
      }

      const current = nodesById.get(currentId)!;
      for (const n of neighbors(current, nodesById, cols, rows)) {
        const newDist = dist.get(currentId)! + n.weight;
        if (newDist < (dist.get(n.id) ?? Infinity)) {
          dist.set(n.id, newDist);
          parent.set(n.id, currentId);
          pq.push(n.id, newDist);
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
      steps.push({
        statuses,
        note: `Shortest path found! Total cost: ${dist.get(endId)}.`,
      });
    } else {
      steps.push({
        statuses: Object.fromEntries([...visited].map((id) => [id, "visited" as NodeStatus])),
        note: "Priority queue exhausted — no path exists.",
      });
    }

    return { steps, pathFound: found };
  },
};

export default dijkstra;
