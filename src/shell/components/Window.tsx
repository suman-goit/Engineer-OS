import type { ReactNode } from "react";

interface WindowProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
}

/**
 * Window is the shared "workstation panel" chrome used by every module page.
 * It gives Engineer OS its consistent terminal/IDE aesthetic without each
 * module having to reimplement a header bar, border, and scroll region.
 */
export function Window({ title, subtitle, children, actions }: WindowProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-md border border-border bg-panel">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex gap-1.5 shrink-0">
            <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          </div>
          <div className="min-w-0 ml-2">
            <p className="truncate text-sm font-medium text-text">{title}</p>
            {subtitle && <p className="truncate text-[11px] text-text-dim">{subtitle}</p>}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
      <div className="flex-1 overflow-y-auto p-5">{children}</div>
    </div>
  );
}
