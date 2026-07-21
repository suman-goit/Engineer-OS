import { useState } from "react";
import { NavLink } from "react-router-dom";
import { getVisibleModules, getModulePath } from "../registry/moduleRegistry";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const modules = getVisibleModules();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="rounded border border-border px-2 py-1 text-xs text-text-dim"
      >
        menu
      </button>
      {open && (
        <div className="absolute right-0 top-8 z-50 w-48 rounded border border-border bg-panel shadow-xl">
          {modules.map((mod) => (
            <NavLink
              key={mod.id}
              to={getModulePath(mod)}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm text-text-dim hover:bg-border/30 hover:text-text"
            >
              {mod.icon} {mod.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
