"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const OFFSET = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
} as const;

/**
 * Satu-satunya titik masuk animasi. GSAP + ScrollTrigger di-import dinamis setelah
 * render awal, dan hanya aktif bila pengguna tidak meminta reduced motion.
 * Keadaan awal (opacity 0) baru diterapkan di sini, jadi tanpa JS konten tetap terbaca.
 * Hanya transform + opacity yang dianimasikan.
 */
export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;

    async function start() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Reveal: naik 24px + fade, stagger 80 ms untuk elemen yang masuk bersamaan.
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        items.forEach((el) => {
          const dir = (el.dataset.reveal ?? "up") as keyof typeof OFFSET;
          gsap.set(el, { opacity: 0, x: 0, y: 0, ...OFFSET[dir] });
        });
        ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.7,
              ease: "expo.out",
              stagger: 0.08,
              overwrite: true,
            }),
        });

        // Garis timeline terhubung ke scroll.
        gsap.utils
          .toArray<HTMLElement>("[data-timeline]")
          .forEach((timeline) => {
            const line = timeline.querySelector("[data-timeline-progress]");
            if (!line) return;
            gsap.fromTo(
              line,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: timeline,
                  start: "top 70%",
                  end: "bottom 70%",
                  scrub: true,
                },
              },
            );
          });

        // Scroll progress tipis di atas halaman.
        gsap.to("#scroll-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: true },
        });
      });

      revert = () => mm.revert();
    }

    // Tunda sampai browser idle agar tidak bersaing dengan render awal.
    const run = () => void start();
    const useIdle = typeof window.requestIdleCallback === "function";
    const handle = useIdle
      ? window.requestIdleCallback(run)
      : window.setTimeout(run, 200);

    return () => {
      cancelled = true;
      if (useIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      revert?.();
    };
  }, [pathname]);

  return null;
}
