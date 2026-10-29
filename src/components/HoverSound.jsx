import { useEffect, useRef, useState } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

// যেসব জায়গায় মাউস নিলে শব্দ হবে
const SELECTOR = "a, button, input, [role='button'], .hover-sound";

export default function HoverSound() {
  const [on, setOn] = useState(true);
  const onRef = useRef(true);
  const ctxRef = useRef(null);

  useEffect(() => {
    onRef.current = on;
  }, [on]);

  useEffect(() => {
    let unlocked = false;
    let last = null;

    const getCtx = () => {
      if (!ctxRef.current) {
        const AC = window.AudioContext || window.webkitAudioContext;
        ctxRef.current = new AC();
      }
      if (ctxRef.current.state === "suspended") ctxRef.current.resume();
      return ctxRef.current;
    };

    // একটা ছোট নরম শব্দ বানানো
    const blip = (freq, dur, vol) => {
      const ctx = getCtx();
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + dur);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(vol, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + dur + 0.02);
    };

    // ব্রাউজার প্রথম ক্লিক বা কী-প্রেসের আগে শব্দ করতে দেয় না
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      getCtx();
    };

    const onOver = (e) => {
      if (!unlocked || !onRef.current) return;
      const el = e.target.closest ? e.target.closest(SELECTOR) : null;
      if (el && el !== last) blip(660, 0.09, 0.05);
      last = el || null;
    };

    const onDown = (e) => {
      unlock();
      if (!onRef.current) return;
      const el = e.target.closest ? e.target.closest(SELECTOR) : null;
      if (el) blip(440, 0.14, 0.08);
    };

    window.addEventListener("mouseover", onOver);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", unlock);

    return () => {
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  return (
    <button
      onClick={() => setOn((v) => !v)}
      aria-label={on ? "Mute sound" : "Unmute sound"}
      className="fixed bottom-5 left-5 z-[70] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 backdrop-blur transition hover:border-violet-400/60 hover:text-white"
    >
      {on ? <FiVolume2 /> : <FiVolumeX />}
    </button>
  );
}