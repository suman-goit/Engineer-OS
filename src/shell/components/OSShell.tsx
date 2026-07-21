import { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Terminal } from "./Terminal";
import { MobileNav } from "./MobileNav";

/**
 * OSShell is the stable foundation of Engineer OS. It never changes when
 * new modules are added -- it only renders the Sidebar (from the registry)
 * and an <Outlet /> for whichever module the router has matched, plus the
 * always-available Terminal.
 */
export function OSShell() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const location = useLocation();

  // Toggle terminal with the backtick key, close with Escape.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "`") {
        e.preventDefault();
        setTerminalOpen((o) => !o);
      }
      if (e.key === "Escape") setTerminalOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex h-screen w-screen bg-bg text-text">
      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex items-center justify-between border-b border-border px-4 py-2 md:hidden">
          <p className="text-accent font-bold">Engineer OS</p>
          <MobileNav />
        </header>

        <main className="flex-1 min-h-0 p-4">
          <Suspense fallback={<PageLoading />}>
            <Outlet key={location.pathname} />
          </Suspense>
        </main>

        <button
          onClick={() => setTerminalOpen((o) => !o)}
          className="fixed bottom-4 right-4 z-30 rounded-full border border-border bg-panel px-4 py-2 text-xs text-text-dim shadow-lg hover:border-accent hover:text-accent md:right-6"
        >
          {terminalOpen ? "hide" : "▸_"} terminal <kbd className="ml-1 opacity-60">`</kbd>
        </button>

        <Terminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
      </div>
    </div>
  );
}

function PageLoading() {
  return (
    <div className="flex h-full items-center justify-center text-text-dim text-sm">
      <span className="caret">loading module</span>
    </div>
  );
}
