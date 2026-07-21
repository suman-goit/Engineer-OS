import { lazy } from "react";
import type { ModuleDefinition } from "../types/module";

/**
 * moduleRegistry
 * ----------------
 * This is the ONLY place new modules get registered. The Sidebar and the
 * Router both read from this array, so adding a new module never requires
 * modifying shell components -- just add an entry here (and, if it grows
 * large, split into `<module>/index.ts` and re-export).
 *
 * Components are lazy-loaded so Version 1 stays a small, fast bundle even
 * as more modules (Git Time Machine, Linux Lab, etc.) are added later.
 */
export const moduleRegistry: ModuleDefinition[] = [
  {
    id: "home",
    label: "Home",
    description: "Philosophy, focus & roadmap",
    icon: "~",
    path: "/",
    order: 0,
    component: lazy(() => import("../../modules/home/HomePage")),
  },
  {
    id: "algorithms-lab",
    label: "Algorithms Lab",
    description: "Interactive algorithm visualizations",
    icon: "λ",
    order: 1,
    component: lazy(() => import("../../modules/algorithms-lab/AlgorithmsLabPage")),
  },
  {
    id: "engineering-log",
    label: "Engineering Log",
    description: "Case studies, not project cards",
    icon: "#",
    order: 2,
    component: lazy(() => import("../../modules/engineering-log/EngineeringLogPage")),
  },
  {
    id: "about",
    label: "About",
    description: "Who's behind Engineer OS",
    icon: "@",
    order: 3,
    component: lazy(() => import("../../modules/about/AboutPage")),
  },
];

export function getModulePath(mod: ModuleDefinition): string {
  return mod.path ?? `/${mod.id}`;
}

export function getVisibleModules(): ModuleDefinition[] {
  return [...moduleRegistry]
    .filter((m) => !m.hidden)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function findModuleById(id: string): ModuleDefinition | undefined {
  return moduleRegistry.find((m) => m.id === id);
}
