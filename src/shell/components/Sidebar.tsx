import { NavLink } from "react-router-dom";
import { getVisibleModules, getModulePath } from "../registry/moduleRegistry";

/**
 * Sidebar renders navigation purely from the module registry. It has zero
 * knowledge of individual modules -- add a module to the registry and it
 * appears here automatically.
 */
export function Sidebar() {
  const modules = getVisibleModules();

  return (
    <aside className="hidden md:flex w-56 shrink-0 flex-col border-r border-border bg-panel">
      <div className="px-4 py-4 border-b border-border">
        <p className="text-accent font-bold tracking-tight">Engineer OS</p>
        <p className="text-[11px] text-text-dim mt-0.5">v1.0 — interactive notebook</p>
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {modules.map((mod) => (
          <NavLink
            key={mod.id}
            to={getModulePath(mod)}
            end={getModulePath(mod) === "/"}
            className={({ isActive }) =>
              [
                "flex items-center gap-2 rounded px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-accent/10 text-accent border border-accent/30"
                  : "text-text-dim border border-transparent hover:bg-border/30 hover:text-text",
              ].join(" ")
            }
            title={mod.description}
          >
            <span className="w-4 text-center text-accent/80">{mod.icon}</span>
            <span>{mod.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-3 border-t border-border text-[11px] text-text-dim">
        <p>Terminal: always on</p>
        <p className="text-text-dim/70">Static · client-only · no backend</p>
      </div>
    </aside>
  );
}
