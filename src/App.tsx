import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OSShell } from "./shell/components/OSShell";
import { getVisibleModules, getModulePath } from "./shell/registry/moduleRegistry";

/**
 * App builds the route table entirely from the module registry. Adding a
 * new module means adding one entry to `moduleRegistry.ts` -- this file
 * never has to change.
 */
export default function App() {
  const modules = getVisibleModules();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<OSShell />}>
          {modules.map((mod) => {
            const Component = mod.component;
            return (
              <Route key={mod.id} path={getModulePath(mod)} element={<Component />} />
            );
          })}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div className="flex h-full items-center justify-center text-text-dim">
      <p>404 — module not found. Try the terminal: `open home`</p>
    </div>
  );
}
