const words = [
  "Manifest", "Believe", "Receive", "Align", "Grow",
  "Imagine", "Transform", "Attract",
];

export default function Marquee() {
  const list = [...words, ...words];

  return (
    <div className="overflow-hidden border-y border-white/10 py-6">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {[...list, ...list].map((w, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="text-5xl font-light tracking-tight text-white/80 md:text-7xl">
              {w}
            </span>
            <span className="text-3xl text-violet-400">✺</span>
          </div>
        ))}
      </div>
    </div>
  );
}