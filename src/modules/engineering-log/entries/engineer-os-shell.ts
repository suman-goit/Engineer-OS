import type { CaseStudy } from "../types";

export const engineerOsShell: CaseStudy = {
  id: "engineer-os-shell",
  title: "Designing a shell architecture that survives years of new modules",
  date: "2026-07",
  tags: ["architecture", "react", "modularity"],
  problem:
    "Engineer OS needs to grow for years without the core shell (sidebar, routing, terminal) becoming a bottleneck every time a new module is added.",
  constraints: [
    "Static site only — no backend, no build-time content pipeline",
    "New modules must not require editing shell components",
    "Must stay a small, fast bundle even as modules are added",
  ],
  architecture:
    "A single moduleRegistry array is the source of truth for navigation. Sidebar and the router both read from it; neither has hardcoded knowledge of Home, Algorithms Lab, or any other page. Each module exports a lazy-loaded page component that satisfies a shared ModuleDefinition interface. The Terminal follows the same pattern via a separate commandRegistry, so commands are additive too.",
  tradeoffs: [
    "Chose a plain array + interface over a plugin system with lifecycle hooks — simpler to reason about, sufficient for a client-only static site.",
    "Chose client-side lazy loading over a static site generator, trading some initial complexity for a simpler mental model (it's just React Router).",
  ],
  implementation:
    "ModuleDefinition { id, label, icon, path, component } is the whole contract. Adding a module means: create modules/<name>/<Name>Page.tsx, add one entry to moduleRegistry.ts. The OSShell component only ever imports the registry, never a concrete module.",
  lessonsLearned: [
    "Registries are a cheap way to buy modularity without inventing a plugin framework.",
    "Keeping the shell 'dumb' (registry-driven) is what actually makes it stable across years of changes.",
  ],
  futureImprovements: [
    "Add per-module metadata for search/command-palette indexing.",
    "Consider code-splitting the registry itself if the module count grows very large.",
  ],
};
