"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function CameraRuntime() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    // Lenis owns smooth scrolling (anchors included) so it never fights CSS.
    const lenis = new Lenis({ lerp: coarse ? 0.11 : 0.09, smoothWheel: !coarse, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(1000, 16);
    const atmosphere = { value: 0 };
    const scenes = gsap.utils.toArray<HTMLElement>("[data-atmosphere]").map((scene) => ScrollTrigger.create({ trigger: scene, start: "top 62%", end: "bottom 38%", onToggle: ({ isActive }) => { if (!isActive) return; gsap.to(atmosphere, { value: 1, duration: 1.8, ease: "power2.out", onUpdate: () => document.documentElement.style.setProperty("--scene-progress", String(atmosphere.value)) }); } }));
    const camera = gsap.utils.toArray<HTMLElement>("[data-camera]").map((item) => gsap.fromTo(item, { y: 36, opacity: 0.45 }, { y: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: item, start: "top 88%", end: "top 52%", scrub: true, invalidateOnRefresh: true } }));
    // Pointer parallax is a fine-pointer enhancement only — never drive it
    // from touch drags, and keep the native cursor (no custom cursor).
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const pointer = (event: PointerEvent) => { if (!finePointer || event.pointerType === "touch") return; const x = (event.clientX / window.innerWidth - .5) * 2; const y = (event.clientY / window.innerHeight - .5) * 2; gsap.to(".intro-background", { x: x * -8, y: y * -5, duration: 1.2, ease: "power3.out", overwrite: true }); gsap.to(".intro-glass-plane", { rotateY: x * 2.2, rotateX: y * -1.4, duration: 1.1, ease: "power3.out", overwrite: true }); };
    if (finePointer) window.addEventListener("pointermove", pointer, { passive: true });
    const refreshAll = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) void document.fonts.ready.then(refreshAll).catch(() => undefined);
    window.addEventListener("load", refreshAll);
    window.addEventListener("orientationchange", refreshAll);
    return () => { scenes.forEach((scene) => scene.kill()); camera.forEach((animation) => animation.kill()); lenis.destroy(); gsap.ticker.remove(ticker); if (finePointer) window.removeEventListener("pointermove", pointer); window.removeEventListener("load", refreshAll); window.removeEventListener("orientationchange", refreshAll); };
  }, []);
  return null;
}
