import { useEffect, useRef } from "react";

export default function NeuralWeb() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let nodes = [];
    let pulses = [];
    let frame = 0;
    let raf;
    const mouse = { x: -9999, y: -9999 };
    const LINK = 140;

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(120, Math.floor((w * h) / 9000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 1,
      }));
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      // নিউরনগুলো নড়ছে
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        // মাউস কাছে এলে নরমভাবে সরে যায়
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 110 && d > 0) {
          n.x += (dx / d) * 0.9;
          n.y += (dy / d) * 0.9;
        }
      }

      // নিউরনের মাঝের রেখা
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(167,139,250,${(1 - d / LINK) * 0.45})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // মাউসের সাথে জোড়া লাগা রেখা
      for (const n of nodes) {
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (d < 170) {
          ctx.strokeStyle = `rgba(221,214,254,${(1 - d / 170) * 0.8})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      // নিউরন আঁকা (জ্বলজ্বলে)
      for (const n of nodes) {
        ctx.shadowColor = "rgba(167,139,250,0.9)";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "rgba(237,233,254,0.95)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // নতুন সিগন্যাল ছাড়া
      if (frame % 25 === 0 && nodes.length) {
        const a = Math.floor(Math.random() * nodes.length);
        const near = [];
        for (let k = 0; k < nodes.length; k++) {
          if (k !== a && Math.hypot(nodes[a].x - nodes[k].x, nodes[a].y - nodes[k].y) < LINK) {
            near.push(k);
          }
        }
        if (near.length) {
          pulses.push({ a, b: near[Math.floor(Math.random() * near.length)], t: 0 });
        }
      }

      // সিগন্যাল রেখা ধরে ছুটছে
      pulses = pulses.filter((p) => p.t < 1);
      for (const p of pulses) {
        p.t += 0.025;
        const A = nodes[p.a];
        const B = nodes[p.b];
        const x = A.x + (B.x - A.x) * p.t;
        const y = A.y + (B.y - A.y) * p.t;
        ctx.shadowColor = "rgba(196,181,253,1)";
        ctx.shadowBlur = 18;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(x, y, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    };

    setup();
    draw();
    window.addEventListener("resize", setup);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setup);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        WebkitMaskImage: "radial-gradient(ellipse at center, black 55%, transparent 100%)",
        maskImage: "radial-gradient(ellipse at center, black 55%, transparent 100%)",
      }}
    />
  );
}