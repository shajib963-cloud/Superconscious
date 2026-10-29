import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import PhoneSection from "./components/PhoneSection";
import Marquee from "./components/Marquee";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import CursorGlow from "./components/CursorGlow";
import HoverSound from "./components/HoverSound";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="page-bg min-h-screen p-3">
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-violet-400 to-indigo-400"
      />
      <CursorGlow />
      <HoverSound />

      <div className="frame-bg relative overflow-hidden rounded-[28px] border border-violet-400/30">
        <div className="glow-breathe pointer-events-none absolute -bottom-40 left-1/2 h-[500px] w-[900px] rounded-full bg-violet-600/40 blur-[120px]" />
        <Navbar />
        <Hero />
        <About />
        <Features />
        <PhoneSection />
        <Marquee />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}