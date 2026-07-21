import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { findCommand, commandRegistry } from "../registry/commandRegistry";
import { moduleRegistry } from "../registry/moduleRegistry";

interface HistoryLine {
  id: number;
  kind: "input" | "output";
  node: ReactNode;
}

let lineId = 0;

/**
 * Terminal is a globally-available command console. It resolves commands
 * through the command registry so it never needs to know about specific
 * modules or features directly.
 */
export function Terminal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryLine[]>([
    {
      id: lineId++,
      kind: "output",
      node: (
        <p className="text-text-dim">
          Engineer OS terminal — type <span className="text-accent">help</span> to get started.
        </p>
      ),
    },
  ]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const print = (node: ReactNode) =>
    setHistory((h) => [...h, { id: lineId++, kind: "output", node }]);

  const clear = () => setHistory([]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const raw = value.trim();
    setValue("");
    if (!raw) return;

    setHistory((h) => [
      ...h,
      { id: lineId++, kind: "input", node: <span>{raw}</span> },
    ]);

    const [name, ...args] = raw.split(/\s+/);
    const cmd = findCommand(name);
    if (!cmd) {
      print(
        <p className="text-danger">
          command not found: {name}. Try <span className="text-accent">help</span>.
        </p>
      );
      return;
    }
    cmd.run(args, { navigate, print, clear, registry: moduleRegistry });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-panel/95 backdrop-blur md:left-56">
      <div className="flex items-center justify-between border-b border-border px-4 py-1.5">
        <p className="text-[11px] text-text-dim">
          TERMINAL — {commandRegistry.length} commands available
        </p>
        <button
          onClick={onClose}
          className="text-text-dim hover:text-danger text-xs px-2"
          aria-label="Close terminal"
        >
          ✕
        </button>
      </div>
      <div className="max-h-56 overflow-y-auto px-4 py-2 text-sm space-y-1">
        {history.map((line) => (
          <div key={line.id}>
            {line.kind === "input" ? (
              <p>
                <span className="text-success">guest@engineer-os</span>
                <span className="text-text-dim">:~$ </span>
                {line.node}
              </p>
            ) : (
              line.node
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center border-t border-border px-4 py-2">
        <span className="text-success text-sm">guest@engineer-os</span>
        <span className="text-text-dim text-sm">:~$&nbsp;</span>
        <input
          ref={inputRef}
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-text-dim/50"
          placeholder="type a command..."
          spellCheck={false}
        />
      </form>
    </div>
  );
}
