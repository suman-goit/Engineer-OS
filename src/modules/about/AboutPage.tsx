import { Window } from "../../shell/components/Window";

export default function AboutPage() {
  return (
    <Window title="about" subtitle="~/engineer-os/about">
      <div className="mx-auto max-w-2xl space-y-8 text-sm">
        <section>
          <h2 className="text-accent font-semibold mb-2">// who I am</h2>
          <p className="text-text-dim leading-relaxed">
           I'm Suman Goit, a computer engineering student who turns curiosity into working software. Engineer OS isn't a portfolio—it's an engineering notebook where every module is built to explore, test, and master a concept through implementation.
          </p>
        </section>

        <section>
          <h2 className="text-accent font-semibold mb-2">// why Engineer OS exists</h2>
          <p className="text-text-dim leading-relaxed">
            Most portfolios describe finished projects. Engineer OS instead tries to show the
            underlying thinking — the constraints, trade-offs, and architecture decisions —
            through interactive tools you can actually run, not just read about.
          </p>
        </section>

        <section>
          <h2 className="text-accent font-semibold mb-2">// what I'm currently learning</h2>
          <ul className="space-y-1.5 text-text-dim">
            <li className="flex gap-2"><span className="text-accent">▸</span>Graph algorithms and pathfinding (Algorithms Lab)</li>
            <li className="flex gap-2"><span className="text-accent">▸</span>Scalable, registry-driven React architecture</li>
            <li className="flex gap-2"><span className="text-accent">▸</span>Systems design fundamentals for future modules</li>
          </ul>
        </section>

        <section>
          <h2 className="text-accent font-semibold mb-2">// long-term roadmap</h2>
          <p className="text-text-dim leading-relaxed">
            Engineer OS is designed to keep growing for years: Git Time Machine, Linux Lab,
            Cybersecurity Playground, Network Observatory, Database Studio, AI Engineering Lab,
            and System Design Studio are all planned as independent modules that plug into the
            same stable shell. Type <span className="text-accent">roadmap</span> in the terminal
            for the live list.
          </p>
        </section>
      </div>
    </Window>
  );
}
