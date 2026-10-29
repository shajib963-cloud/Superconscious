import { motion } from "framer-motion";

// Flower of Life: মাঝখানে ১টা, তারপর ১৮টা গোল
const r = 10;
const circles = [[0, 0]];
for (let k = 0; k < 6; k++) {
  const a = (k * Math.PI) / 3;
  const b = a + Math.PI / 6;
  circles.push([r * Math.cos(a), r * Math.sin(a)]);
  circles.push([2 * r * Math.cos(a), 2 * r * Math.sin(a)]);
  circles.push([r * Math.sqrt(3) * Math.cos(b), r * Math.sqrt(3) * Math.sin(b)]);
}

export default function Logo({ size = 40 }) {
  return (
    <motion.div
      whileHover={{ scale: 1.15 }}
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* পেছনের নরম আলো */}
      <div className="absolute inset-0 rounded-full bg-violet-500/30 blur-md" />

      {/* ধীরে ঘুরবে */}
      <motion.svg
        viewBox="-36 -36 72 72"
        width={size}
        height={size}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        {/* বাইরের বৃত্ত */}
        <motion.circle
          cx="0"
          cy="0"
          r="33"
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeOpacity="0.8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />

        {/* ভেতরের ১৯টা গোল, একটার পর একটা আঁকা হবে */}
        {circles.map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="white"
            strokeWidth="0.9"
            strokeOpacity="0.75"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.07, ease: "easeInOut" }}
          />
        ))}
      </motion.svg>
    </motion.div>
  );
}