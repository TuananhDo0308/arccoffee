// components/LenisScrollProvider.tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 1.0,
      smoothWheel: false,
    });

    const animate = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return () => lenis.destroy();
  }, []);

  return <div className="bg-zinc-950">{children}</div>;
}
