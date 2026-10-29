import Logo from "./Logo";
import { motion } from "framer-motion";

const links = [
  { label: "About", id: "about" },
  { label: "How it Works", id: "how-it-works" },
  { label: "For Whom", id: "for-whom" },
  { label: "Contacts", id: "contacts" },
];

export default function Navbar() {
  return (
    <div className="fixed inset-x-0 top-8 z-50 flex justify-center">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center gap-6 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-md"
      >
        <a href="#" aria-label="Home">
  <Logo size={36} />
</a>
        {links.map((l) => (
  <a key={l.id} href={`#${l.id}`} className="text-white/70 transition hover:text-white">
    {l.label}
  </a>
))}
      </motion.nav>
    </div>
  );
}