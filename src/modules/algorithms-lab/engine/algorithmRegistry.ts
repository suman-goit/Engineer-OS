import type { AlgorithmModule } from "./types";
import bfs from "../algorithms/bfs";
import dfs from "../algorithms/dfs";
import dijkstra from "../algorithms/dijkstra";

/**
 * To add a new algorithm to the lab: implement `AlgorithmModule` in
 * `algorithms/<name>.ts` and add it to this array. Nothing else in the
 * Algorithms Lab needs to change.
 */
export const algorithmRegistry: AlgorithmModule[] = [bfs, dfs, dijkstra];

export function findAlgorithm(id: string): AlgorithmModule | undefined {
  return algorithmRegistry.find((a) => a.id === id);
}
