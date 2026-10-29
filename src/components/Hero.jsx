import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NeuralWeb from "./NeuralWeb";

const words = ["Control Your Mind", "Upgrade Your Reality", "Manifest Your Dream"];

export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % words.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden px-6">
      <NeuralWeb />

      <AnimatePresence mode="wait">
        <motion.h1
          key={i}
          exit={{ opacity: 0, filter: "blur(12px)", y: -30 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center text-6xl font-light tracking-tight md:text-8xl"
        >
          {words[i].split(" ").map((w, k) => (
            <motion.span
              key={k}
              initial={{ opacity: 0, y: 50, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: k * 0.18 }}
              className="mr-4 inline-block"
            >
              {w}
            </motion.span>
          ))}
        </motion.h1>
      </AnimatePresence>
    </section>
  );
}