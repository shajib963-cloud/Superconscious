import { motion } from "framer-motion";

// ছবি আসছে pravatar থেকে (ইন্টারনেট লাগবে)। নিজের ছবি চাইলে নিচের টিপস দেখুন।
const img = (n) => `https://i.pravatar.cc/200?img=${n}`;

const items = [
  { type: "card", name: "Sarah K.", text: "I finally feel in control of my mindset.", img: 47, left: "3%", dur: 18, delay: 0, sway: 14 },
  { type: "photo", img: 12, left: "20%", dur: 14, delay: 2, size: 72, sway: 10 },
  { type: "card", name: "James R.", text: "Daily journals changed how I start my mornings.", img: 33, left: "72%", dur: 20, delay: 1, sway: 12 },
  { type: "photo", img: 5, left: "90%", dur: 15, delay: 4, size: 64, sway: 8 },
  { type: "card", name: "Aisha M.", text: "Feels like having a coach in my pocket.", img: 25, left: "8%", dur: 22, delay: 9, sway: 16 },
  { type: "photo", img: 68, left: "78%", dur: 17, delay: 8, size: 80, sway: 10 },
  { type: "card", name: "Daniel W.", text: "My focus is the best it has ever been.", img: 15, left: "62%", dur: 19, delay: 11, sway: 12 },
  { type: "photo", img: 44, left: "32%", dur: 16, delay: 6, size: 56, sway: 9 },
];

function Card({ name, text, img: src }) {
  return (
    <div className="w-56 rounded-2xl border border-white/15 bg-white/10 p-3 shadow-[0_0_30px_rgba(124,77,255,0.25)] backdrop-blur-md">
      <div className="flex items-center gap-2">
        <img src={src} alt={name} className="h-9 w-9 rounded-full object-cover" />
        <div>
          <p className="text-xs font-medium">{name}</p>
          <p className="text-[10px] text-amber-300">★★★★★</p>
        </div>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-white/70">{text}</p>
    </div>
  );
}

function Photo({ src, size }) {
  return (
    <img
      src={src}
      alt=""
      style={{ width: size, height: size }}
      className="rounded-2xl border border-white/20 object-cover shadow-[0_0_30px_rgba(124,77,255,0.4)]"
    />
  );
}

export default function FloatingPeople() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it, i) => (
        <motion.div
          key={i}
          className={`absolute top-1/2 ${it.type === "card" ? "hidden md:block" : ""}`}
          style={{ left: it.left }}
          initial={{ y: "60vh", opacity: 0 }}
          animate={{
            y: ["60vh", "-60vh"],
            x: [0, it.sway, -it.sway, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            y: { duration: it.dur, repeat: Infinity, ease: "linear", delay: it.delay },
            x: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: it.delay },
            opacity: {
              duration: it.dur,
              repeat: Infinity,
              ease: "linear",
              delay: it.delay,
              times: [0, 0.15, 0.85, 1],
            },
          }}
        >
          {it.type === "card" ? (
            <Card name={it.name} text={it.text} img={img(it.img)} />
          ) : (
            <Photo src={img(it.img)} size={it.size} />
          )}
        </motion.div>
      ))}
    </div>
  );
}