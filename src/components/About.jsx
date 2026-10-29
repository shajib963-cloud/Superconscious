import { motion } from "framer-motion";

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "89%", label: "Report Clearer Focus" },
  { value: "1M+", label: "Journal Entries" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7 } },
};

export default function About() {
  return (
    <section id="about" className="px-6 py-28">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-4xl text-center"
      >
        <motion.p variants={item} className="mb-4 text-xs uppercase tracking-[0.3em] text-violet-300">
          About Us
        </motion.p>

        <motion.h2 variants={item} className="text-4xl font-light leading-tight md:text-6xl">
          Everything you seek is already{" "}
          <span className="italic text-white/40">within you.</span>
        </motion.h2>

        <motion.p variants={item} className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/60">
          Superconscious is an AI-powered self-growth companion. It listens to your goals,
          finds the hidden thoughts and beliefs that hold you back, and guides you toward
          the life you imagine through daily practices that feel natural and effortless.
        </motion.p>

        <motion.div variants={item} className="mt-14 grid gap-4 md:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-violet-400/50"
            >
              <p className="text-4xl font-light">{s.value}</p>
              <p className="mt-2 text-xs text-white/50">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}