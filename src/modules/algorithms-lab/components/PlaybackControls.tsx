interface PlaybackControlsProps {
  playing: boolean;
  onToggle: () => void;
  onReset: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  isFirst: boolean;
  isLast: boolean;
  speed: number;
  onSpeedChange: (n: number) => void;
  index: number;
  total: number;
}

export function PlaybackControls({
  playing,
  onToggle,
  onReset,
  onStepBack,
  onStepForward,
  isFirst,
  isLast,
  speed,
  onSpeedChange,
  index,
  total,
}: PlaybackControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded border border-border bg-bg/40 p-3">
      <button
        onClick={onReset}
        className="rounded border border-border px-2.5 py-1.5 text-xs text-text-dim hover:border-accent hover:text-accent"
        title="Reset"
      >
        ⟲ reset
      </button>
      <button
        onClick={onStepBack}
        disabled={isFirst}
        className="rounded border border-border px-2.5 py-1.5 text-xs disabled:opacity-30 hover:border-accent hover:text-accent"
        title="Step back"
      >
        ◂
      </button>
      <button
        onClick={onToggle}
        disabled={isLast && !playing}
        className="rounded border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent disabled:opacity-30 hover:bg-accent/20"
      >
        {playing ? "❚❚ pause" : "▶ play"}
      </button>
      <button
        onClick={onStepForward}
        disabled={isLast}
        className="rounded border border-border px-2.5 py-1.5 text-xs disabled:opacity-30 hover:border-accent hover:text-accent"
        title="Step forward"
      >
        ▸
      </button>

      <div className="flex items-center gap-2 ml-auto">
        <span className="text-[11px] text-text-dim">
          step {Math.min(index + 1, total)}/{total}
        </span>
        <label className="flex items-center gap-1.5 text-[11px] text-text-dim">
          speed
          <input
            type="range"
            min={1}
            max={10}
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="accent-accent"
          />
          <span className="text-accent w-6">{speed}x</span>
        </label>
      </div>
    </div>
  );
}
