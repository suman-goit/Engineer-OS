# Engineer OS

An interactive engineering notebook — not a portfolio. Every section demonstrates
an engineering concept through a working simulation, visualization, or tool.

## Stack

React · TypeScript · Vite · Tailwind CSS v4 · React Router

100% static, client-only: no backend, no auth, no database.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. Press `` ` `` anywhere to toggle the global terminal
(try `help`, `open algorithms-lab`, `roadmap`).

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Architecture

The shell (`src/shell`) is the stable foundation and should never need to change
when a module is added:

- `shell/registry/moduleRegistry.ts` — single source of truth for sidebar + routes
- `shell/registry/commandRegistry.tsx` — single source of truth for terminal commands
- `shell/components` — `OSShell`, `Sidebar`, `Window`, `Terminal`, `MobileNav`

### Adding a new module

1. Create `src/modules/<name>/<Name>Page.tsx`
2. Add one entry to `moduleRegistry.ts` pointing at a lazy import of that page
3. Done — no shell code changes required

### Algorithms Lab

`src/modules/algorithms-lab` implements a reusable visualization engine:

- `engine/types.ts` — the `AlgorithmModule` contract (pseudocode, source, complexity, `run()`)
- `engine/graph.ts` — shared demo grid graph used by every algorithm
- `engine/useStepPlayer.ts` — generic play/pause/reset/step/speed hook
- `algorithms/{bfs,dfs,dijkstra}.ts` — pure functions producing an array of animation steps
- `engine/algorithmRegistry.ts` — list of available algorithms

To add a new algorithm: implement `AlgorithmModule` in `algorithms/<name>.ts` and add
it to `algorithmRegistry.ts`. `AlgorithmVisualizer` and the UI need no changes.

### Engineering Log

`src/modules/engineering-log` renders case studies (Problem / Constraints /
Architecture / Trade-offs / Implementation / Lessons Learned / Future Improvements)
from `entryRegistry.ts`. Add a new case study by creating a file in `entries/`
and appending it to the registry.

## Roadmap

v1 ships Home, Algorithms Lab (BFS/DFS/Dijkstra), Engineering Log, About, and the
global Terminal. Planned future modules (see `roadmap` in the terminal): Git Time
Machine, Linux Lab, Cybersecurity Playground, Network Observatory, Database Studio,
AI Engineering Lab, System Design Studio.
