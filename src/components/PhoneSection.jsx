import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";

/* ---------- চার্টের ডেটা ---------- */
const data = [20, 35, 30, 55, 50, 75, 89];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const pts = data.map((v, i) => [i * 50, 120 - v * 1.1]);

const line = pts
  .map(([x, y], i) => {
    if (i === 0) return `M${x},${y}`;
    const [px, py] = pts[i - 1];
    const mx = (px + x) / 2;
    return `C${mx},${py} ${mx},${y} ${x},${y}`;
  })
  .join(" ");
const area = `${line} L300,140 L0,140 Z`;

/* ---------- ডায়াগ্রাম ১: Daily Insights ---------- */
function GrowthCard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, 89, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => c.stop();
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur"
    >
      {/* উপরের অংশ: রিং + লেখা */}
      <div className="flex items-center gap-5">
        <div className="relative h-20 w-20 shrink-0">
          <svg viewBox="0 0 80 80" className="h-full w-full">
            <g transform="rotate(-90 40 40)">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
              <motion.circle
                cx="40"
                cy="40"
                r="34"
                fill="none"
                stroke="#a78bfa"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: inView ? 0.89 : 0 }}
                transition={{ duration: 2.2, ease: "easeOut" }}
              />
            </g>
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-lg font-medium">
            {n}%
          </span>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-violet-300">Daily Insights</p>
          <h3 className="mt-1 text-xl font-light">Your mindset score</h3>
          <motion.span
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mt-2 inline-block rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-300"
          >
            ▲ +12% this week
          </motion.span>
        </div>
      </div>

      {/* চার্ট */}
      <div className="relative mt-8">
        <svg viewBox="-10 0 320 140" className="w-full overflow-visible">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[30, 70, 110].map((y) => (
            <line key={y} x1="-10" x2="310" y1={y} y2={y} stroke="rgba(255,255,255,0.07)" strokeDasharray="4 4" />
          ))}

          <motion.path
            d={area}
            fill="url(#areaGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
          <motion.path
            d={line}
            fill="none"
            stroke="#c4b5fd"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: inView ? 1 : 0 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          />

          {pts.slice(0, -1).map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="3.5"
              fill="#0a0a0c"
              stroke="#c4b5fd"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.3 + i * 0.3 }}
            />
          ))}
        </svg>

        {/* শেষ বিন্দুতে স্পন্দন */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ delay: 2.2 }}
          className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2"
          style={{ left: "96.875%", top: "15.8%" }}
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-violet-400/70" />
          <span className="absolute inset-0 rounded-full bg-violet-200" />
        </motion.span>
      </div>

      <div className="mt-3 flex justify-between text-[10px] text-white/40">
        {days.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------- ডায়াগ্রাম ২: Manifestation Orbit ---------- */
const rings = [
  { size: 130, duration: 8, dot: "bg-violet-300", reverse: false },
  { size: 200, duration: 14, dot: "bg-indigo-300", reverse: true },
  { size: 270, duration: 22, dot: "bg-fuchsia-300", reverse: false },
];

const legend = [
  { name: "Belief", color: "bg-violet-300" },
  { name: "Focus", color: "bg-indigo-300" },
  { name: "Action", color: "bg-fuchsia-300" },
];

function OrbitCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur"
    >
      <p className="text-xs uppercase tracking-[0.25em] text-violet-300">Manifestation Orbit</p>
      <h3 className="mt-1 text-xl font-light">Everything moves toward you</h3>

      <div className="relative mx-auto mt-6 flex h-[290px] w-full items-center justify-center overflow-hidden">
        {/* কক্ষপথগুলো */}
        {rings.map((r, i) => (
          <motion.div
            key={i}
            animate={{ rotate: r.reverse ? -360 : 360 }}
            transition={{ duration: r.duration, repeat: Infinity, ease: "linear" }}
            className="absolute rounded-full border border-white/10"
            style={{ width: r.size, height: r.size }}
          >
            <span
              className={`absolute left-1/2 top-0 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${r.dot} shadow-[0_0_18px_rgba(196,181,253,0.9)]`}
            />
          </motion.div>
        ))}

        {/* মাঝের জ্বলন্ত গোলক */}
        <motion.div
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-indigo-700 shadow-[0_0_60px_rgba(139,92,246,0.9)]"
        >
          <span className="text-xs font-medium tracking-widest text-white/90">YOU</span>
        </motion.div>
      </div>

      <div className="mt-2 flex justify-center gap-6 text-xs text-white/60">
        {legend.map((l) => (
          <div key={l.name} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${l.color}`} />
            {l.name}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------- মূল সেকশন ---------- */
export default function PhoneSection() {
  return (
    <section id="for-whom" className="px-6 py-24">
      <div className="mx-auto max-w-6xl rounded-[32px] bg-gradient-to-br from-violet-700/50 via-indigo-900/40 to-[#0a0a0c] p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-violet-300">For Everyone</p>
          <h2 className="text-4xl font-light md:text-5xl">
            Built for every <span className="italic text-white/40">mind</span>
          </h2>
          <p className="mt-4 text-white/60">
            Whether you are chasing a big goal or a calmer day, watch your growth take shape.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <GrowthCard />
          <OrbitCard />
        </div>
      </div>
    </section>
  );
}