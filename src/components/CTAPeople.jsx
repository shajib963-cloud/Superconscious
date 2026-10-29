import { motion } from "framer-motion";

const img = (n) => `https://i.pravatar.cc/200?img=${n}`;

// pos দিয়ে ঠিক হয় কোন দিকে বসবে: উপর, নিচ, বাঁ, ডান
const items = [
  // উপরে
  { type: "card", name: "Sarah K.", text: "I finally feel in control of my mindset.", img: 47, pos: { left: "4%", top: "8%" }, dur: 5, delay: 0 },
  { type: "photo", img: 12, size: 64, pos: { left: "38%", top: "4%" }, dur: 4.5, delay: 0.2, mobile: true },
  { type: "photo", img: 5, size: 76, pos: { right: "8%", top: "7%" }, dur: 5.5, delay: 0.4, mobile: true },
  // ডানে
  { type: "card", name: "James R.", text: "Daily journals changed how I start my mornings.", img: 33, pos: { right: "3%", top: "38%" }, dur: 6, delay: 0.6 },
  // বাঁয়ে
  { type: "photo", img: 68, size: 72, pos: { left: "5%", top: "50%" }, dur: 5, delay: 0.8 },
  // নিচে
  { type: "card", name: "Aisha M.", text: "Feels like having a coach in my pocket.", img: 25, pos: { left: "7%", bottom: "7%" }, dur: 5.5, delay: 1 },
  { type: "photo", img: 44, size: 60, pos: { left: "46%", bottom: "3%" }, dur: 4.8, delay: 1.2, mobile: true },
  { type: "card", name: "Daniel W.", text: "My focus is the best it has ever been.", img: 15, pos: { right: "6%", bottom: "8%" }, dur: 6.2, delay: 1.4 },
];

function Card({ name, text, src }) {
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

export default function CTAPeople() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {items.map((it, i) => {
        const show =
          it.type === "card" ? "hidden lg:block" : it.mobile ? "" : "hidden md:block";

        return (
          <motion.div
            key={i}
            className={`absolute ${show}`}
            style={it.pos}
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: it.delay }}
          >
            {/* ভেসে থাকার দোলা */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: it.dur, repeat: Infinity, ease: "easeInOut" }}
            >
              {it.type === "card" ? (
                <Card name={it.name} text={it.text} src={img(it.img)} />
              ) : (
                <Photo src={img(it.img)} size={it.size} />
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}