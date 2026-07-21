import { Window } from "../../shell/components/Window";
import { Link } from "react-router-dom";

const focus = [
  { label: "Graph algorithms & pathfinding", status: "active" },
  { label: "React architecture patterns", status: "active" },
  { label: "Systems design fundamentals", status: "queued" },
];

const principles = [
  "Modular architecture over monoliths",
  "Reusable components over copy-paste",
  "Clean, readable code over clever code",
  "Scalability over premature optimization",
  "Working demonstrations over static descriptions",
];

const roadmap = [
  { version: "v1.0", detail: "Shell, Algorithms Lab (BFS/DFS/Dijkstra), Engineering Log, About" },
  { version: "v1.x", detail: "More algorithms: A*, sorting visualizers, DP grids" },
  { version: "v2.0", detail: "Git Time Machine — visualize commit graphs & merges" },
  { version: "v2.x", detail: "Linux Lab, Network Observatory" },
  { version: "v3.0", detail: "Database Studio, AI Engineering Lab, System Design Studio" },
];

export default function HomePage() {
  return (
    <Window title="home" subtitle="~/engineer-os">
      <div className="mx-auto max-w-3xl space-y-10">
        <section>
          <p className="text-text-dim text-sm">$ cat welcome.md</p>
          <h1 className="mt-2 text-2xl font-bold text-text">Engineer OS</h1>
          <p className="mt-2 text-text-dim leading-relaxed">
            This isn't a portfolio. It's an interactive engineering notebook —
            every section demonstrates a concept through a working simulation,
            visualization, or tool instead of a paragraph describing one.
            Explore the modules on the left, or open the terminal below.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-accent mb-3">// current focus</h2>
          <ul className="space-y-2">
            {focus.map((f) => (
              <li
                key={f.label}
                className="flex items-center justify-between rounded border border-border px-3 py-2 text-sm"
              >
                <span>{f.label}</span>
                <span
                  className={
                    f.status === "active"
                      ? "text-success text-xs"
                      : "text-text-dim text-xs"
                  }
                >
                  {f.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-accent mb-3">// engineering philosophy</h2>
          <ul className="space-y-1.5 text-sm text-text-dim">
            {principles.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="text-accent">▸</span>
                {p}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-accent mb-3">// latest work</h2>
          <div className="rounded border border-border p-4 text-sm">
            <p className="text-text">Algorithms Lab — graph traversal visualizer</p>
            <p className="text-text-dim mt-1">
              Step-by-step BFS, DFS, and Dijkstra with adjustable playback speed,
              pseudocode, and source viewer.
            </p>
            <Link to="/algorithms-lab" className="mt-2 inline-block text-accent text-xs hover:underline">
              open module →
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-accent mb-3">// roadmap</h2>
          <ol className="space-y-2 text-sm">
            {roadmap.map((r) => (
              <li key={r.version} className="flex gap-3">
                <span className="text-accent w-12 shrink-0">{r.version}</span>
                <span className="text-text-dim">{r.detail}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </Window>
  );
}
