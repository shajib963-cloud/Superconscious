import { motion } from "framer-motion";

const items = [
  { title: "Hyper-Personalized Sessions", text: "Tailored to your emotions and challenges." },
  { title: "Manifestation Tools", text: "Daily practices to stay on track." },
  { title: "Results-Oriented Mindset", text: "Reprogram limiting beliefs." },
  { title: "Daily Journals & AI Feedback", text: "Reflect and grow every day." },
];

export default function Features() {
  return (
    <section id="how-it-works" className="grid gap-4 px-6 py-24 md:grid-cols-4">
      {items.map((it, idx) => (
        <motion.div
          key={it.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -8, scale: 1.03 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors hover:border-violet-400/60 hover:shadow-[0_0_30px_rgba(124,77,255,0.35)]"
>
          <div className="mb-4 h-10 w-10 rounded-full bg-violet-500/30" />
          <h3 className="mb-2 text-sm font-medium">{it.title}</h3>
          <p className="text-xs text-white/50">{it.text}</p>
        </motion.div>
      ))}
    </section>
  );
}