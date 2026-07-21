import type { TerminalCommand } from "../types/module";
import { getVisibleModules, getModulePath, findModuleById } from "./moduleRegistry";

/**
 * Global terminal commands. Like the module registry, this is additive:
 * new commands can be appended here without touching the Terminal
 * component itself.
 */
export const commandRegistry: TerminalCommand[] = [
  {
    name: "help",
    description: "List available commands",
    run: (_args, ctx) => {
      ctx.print(
        <div className="space-y-1">
          <p className="text-text-dim">Available commands:</p>
          {commandRegistry.map((c) => (
            <p key={c.name}>
              <span className="text-accent">{c.name}</span>
              <span className="text-text-dim"> — {c.description}</span>
            </p>
          ))}
        </div>
      );
    },
  },
  {
    name: "open",
    description: "Open a module by id",
    usage: "open <module-id>",
    run: (args, ctx) => {
      const id = args[0];
      if (!id) {
        ctx.print(
          <p className="text-warning">
            usage: open &lt;module-id&gt; — try one of:{" "}
            {getVisibleModules()
              .map((m) => m.id)
              .join(", ")}
          </p>
        );
        return;
      }
      const mod = findModuleById(id);
      if (!mod) {
        ctx.print(<p className="text-danger">No module named "{id}"</p>);
        return;
      }
      ctx.navigate(getModulePath(mod));
      ctx.print(<p className="text-success">Opening {mod.label}...</p>);
    },
  },
  {
    name: "about",
    description: "Print information about Engineer OS",
    run: (_args, ctx) => {
      ctx.print(
        <p>
          Engineer OS is an interactive engineering notebook — a living,
          modular system for demonstrating engineering thinking through
          working software rather than static pages.
        </p>
      );
    },
  },
  {
    name: "whoami",
    description: "Print the current user",
    run: (_args, ctx) => {
      ctx.print(<p>guest@engineer-os — read-only visitor session</p>);
    },
  },
  {
    name: "roadmap",
    description: "Show the long-term module roadmap",
    run: (_args, ctx) => {
      const future = [
        "Git Time Machine",
        "Linux Lab",
        "Cybersecurity Playground",
        "Network Observatory",
        "Database Studio",
        "AI Engineering Lab",
        "System Design Studio",
      ];
      ctx.print(
        <div>
          <p className="text-text-dim">Planned future modules:</p>
          {future.map((f) => (
            <p key={f}>
              <span className="text-accent">▸</span> {f}
            </p>
          ))}
        </div>
      );
    },
  },
  {
    name: "clear",
    description: "Clear the terminal",
    run: (_args, ctx) => ctx.clear(),
  },
];

export function findCommand(name: string): TerminalCommand | undefined {
  return commandRegistry.find((c) => c.name === name.toLowerCase());
}
