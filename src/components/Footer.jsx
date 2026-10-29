import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";

const EMAIL = "shajib963@gmail.com";
const socials = [
  { name: "Facebook", icon: FaFacebookF, href: "https://facebook.com" },
  { name: "Instagram", icon: FaInstagram, href: "https://instagram.com" },
  { name: "TikTok", icon: FaTiktok, href: "https://tiktok.com" },
  { name: "Twitter", icon: FaXTwitter, href: "https://x.com" },
];

export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], [140, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <footer ref={ref} id="contacts" className="overflow-hidden px-6 pt-24">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        {/* বাঁদিক: ইমেইল */}
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-violet-300">Contact Us</p>
          <a
  href={`mailto:${EMAIL}`}
  className="text-3xl font-light transition hover:text-violet-300"
>
  {EMAIL}
</a>
        </div>

        {/* ডানদিক: সোশ্যাল আইকন */}
        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <motion.a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.name}
              whileHover={{ y: -6, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-white/70 backdrop-blur transition-colors hover:border-violet-400/60 hover:text-white hover:shadow-[0_0_25px_rgba(124,77,255,0.5)]"
            >
              <s.icon />
            </motion.a>
          ))}
        </div>
      </div>

      <motion.p
        style={{ y, opacity }}
        className="mt-16 select-none bg-gradient-to-b from-white to-violet-500/40 bg-clip-text text-center text-[14vw] font-semibold leading-none text-transparent"
      >
        <motion.svg
  viewBox="0 0 1000 100"
  style={{ y, opacity }}
  className="mt-16 block w-full select-none"
  aria-label="SUPERCONSCIOUS"
>
  <defs>
    <linearGradient id="wordGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#ffffff" />
      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5" />
    </linearGradient>
  </defs>
  <text
    x="0"
    y="85"
    textLength="1000"
    lengthAdjust="spacingAndGlyphs"
    fill="url(#wordGrad)"
    fontSize="100"
    fontWeight="600"
  >
    SUPERCONSCIOUS
  </text>
</motion.svg>
      </motion.p><div className="flex flex-col items-center justify-between gap-2 border-t border-white/10 py-6 text-xs text-white/40 md:flex-row">
  <p>© 2026 Superconscious. All rights reserved.</p>
  <div className="flex gap-5">
    <a href="#" className="hover:text-white">Privacy Policy</a>
    <a href="#" className="hover:text-white">Terms</a>
  </div>
</div>
    </footer>
  );
}