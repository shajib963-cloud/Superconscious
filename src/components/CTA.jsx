import { useState } from "react";
import { motion } from "framer-motion";
import CTAPeople from "./CTAPeople";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
  };

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6 py-28">
      {/* চারদিকের মানুষ ও মন্তব্য */}
      <CTAPeople />

      {/* স্পন্দিত বৃত্ত */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.3, opacity: 0.6 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 6, repeat: Infinity, delay: i * 1.5, ease: "easeOut" }}
            className="absolute h-[400px] w-[400px] rounded-full border border-violet-400/40"
          />
        ))}
        <div className="absolute h-64 w-64 rounded-full bg-violet-600/40 blur-3xl" />
      </div>

      {/* মাঝের কনটেন্ট */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl text-center"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-violet-300">
          Coming Soon
        </p>
        <h2 className="text-5xl font-light leading-tight md:text-7xl">
          Upgrade Your <span className="italic text-white/40">Reality</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-white/60">
          Join the waitlist and get early access to your personal manifestation journey.
        </p>

        <form
          onSubmit={submit}
          className="mx-auto mt-10 flex max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/5 p-2 backdrop-blur"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={done}
            className="w-full bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/40"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              done ? "bg-violet-500 text-white" : "bg-white text-black"
            }`}
          >
            {done ? "You're in ✨" : "Join Waitlist"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}