import { useEffect, useRef, useState } from "react";

/**
 * useStepPlayer drives step-by-step playback through any array of frames.
 * It's generic over the frame type so it can be reused by any future
 * algorithm or simulation module, not just the graph visualizer.
 */
export function useStepPlayer<T>(steps: T[]) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(4); // steps per second
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setIndex(0);
    setPlaying(false);
  }, [steps]);

  useEffect(() => {
    if (!playing) {
      if (timerRef.current) window.clearInterval(timerRef.current);
      return;
    }
    timerRef.current = window.setInterval(() => {
      setIndex((i) => {
        if (i >= steps.length - 1) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, 1000 / speed);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [playing, speed, steps.length]);

  return {
    index,
    current: steps[index],
    isFirst: index === 0,
    isLast: index >= steps.length - 1,
    playing,
    speed,
    setSpeed,
    play: () => setPlaying(true),
    pause: () => setPlaying(false),
    toggle: () => setPlaying((p) => !p),
    reset: () => {
      setPlaying(false);
      setIndex(0);
    },
    stepForward: () => setIndex((i) => Math.min(i + 1, steps.length - 1)),
    stepBackward: () => setIndex((i) => Math.max(i - 1, 0)),
    seek: (i: number) => setIndex(Math.max(0, Math.min(i, steps.length - 1))),
  };
}
