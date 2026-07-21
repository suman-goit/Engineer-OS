import type { ComponentType, ReactNode } from "react";

/**
 * ModuleDefinition is the contract every feature module must satisfy to
 * plug into the Engineer OS shell. The shell (Sidebar, Router, OSShell)
 * only ever depends on this interface -- never on concrete modules --
 * so new modules can be added by writing a module and registering it,
 * without touching shell code.
 */
export interface ModuleDefinition {
  /** Unique, URL-safe identifier. Also used as the route path segment. */
  id: string;
  /** Label shown in the sidebar. */
  label: string;
  /** Short one-line description shown as a sidebar tooltip / subtitle. */
  description?: string;
  /** Single-character or short glyph used as the module's icon in the sidebar. */
  icon: string;
  /** Route path, defaults to `/${id}` if omitted. */
  path?: string;
  /** Lazily-loaded page component rendered inside the shell's Window. */
  component: ComponentType;
  /** Where the module appears in the sidebar. Higher = lower on the list. */
  order?: number;
  /** Set true to hide from the sidebar while still keeping the route active (e.g. for future/experimental modules). */
  hidden?: boolean;
}

export interface TerminalCommandContext {
  navigate: (path: string) => void;
  print: (node: ReactNode) => void;
  clear: () => void;
  registry: ModuleDefinition[];
}

/**
 * TerminalCommand is the contract for global terminal commands.
 * Modules may register their own commands (e.g. `open algorithms-lab`)
 * without the Terminal component knowing about them ahead of time.
 */
export interface TerminalCommand {
  name: string;
  description: string;
  usage?: string;
  run: (args: string[], ctx: TerminalCommandContext) => void;
}
