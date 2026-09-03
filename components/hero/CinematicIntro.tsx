"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { roles } from "@/lib/data";

export default function CinematicIntro() {
  const sceneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    // Deterministic opening frame: never resume mid-scene where the scrub
    // timeline and the load intro would fight over the same glass properties.
    // But respect slow-network readers: if they already scrolled deep before
    // hydration, never yank them back — land the intro instantly instead.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const startY = window.scrollY;
    const enteredDeep = startY > 300;
    if (!enteredDeep) window.scrollTo(0, 0);
    // Viewport-aware intensity: same identity, full cinematic fly-through on
    // every screen (mid-transition zoom inside the clipped stage is the shot,
    // not a cropping bug — resting states stay within the viewport).
    const viewport = () => ({ w: window.innerWidth, h: window.innerHeight });
    const intensity = () => {
      const { w } = viewport();
      if (w <= 580) return { peak: 2.1, mid: 1.28, drift: -8, glassX: -6, glassScale: 1.06 };
      if (w <= 900) return { peak: 2.3, mid: 1.3, drift: -10, glassX: -10, glassScale: 1.1 };
      return { peak: 2.8, mid: 1.35, drift: -12, glassX: -15, glassScale: 1.16 };
    };
    let raf = 0;
    let introDone = false;
    let introTl: gsap.core.Timeline | null = null;
    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: scene, start: "top top", end: "bottom bottom", scrub: 1.5, invalidateOnRefresh: true },
      });

      // Keep the identity panel available if motion is interrupted during hydration.
      gsap.set(".intro-name span", { autoAlpha: 0 });
      gsap.set(".intro-name span", { yPercent: 16, filter: "blur(6px)" });
      gsap.set(".intro-glass-plane", { autoAlpha: 0, xPercent: 16, yPercent: 3, rotateY: -8, rotateZ: -2, scale: .86 });

      intro.to(".intro-background", { autoAlpha: .48, duration: 2.2, ease: "power2.inOut" })
        .to(".intro-name span:nth-child(1)", { autoAlpha: 1, yPercent: 0, filter: "blur(0px)", duration: 1.5 })
        .to(".intro-name span:nth-child(2)", { autoAlpha: 1, yPercent: 0, filter: "blur(0px)", duration: 1.5 }, "-=.8")
        .to(".intro-name span:nth-child(3)", { autoAlpha: 1, yPercent: 0, filter: "blur(0px)", duration: 1.5 }, "-=.8")
        .addLabel("glassIn", "-=1.0")
        // Glass leads; the full copy block follows a beat later as ONE unit.
        .to(".intro-glass-plane", { autoAlpha: .92, xPercent: 0, yPercent: 0, rotateY: -2, rotateZ: -1, scale: 1, duration: 1.15, ease: "expo.out" }, "glassIn")
        .fromTo(".intro-glass-plane .panel-copy", { clipPath: "inset(0 0 100% 0)", autoAlpha: 0, y: 14 }, { clipPath: "inset(0 0 0% 0)", autoAlpha: 1, y: 0, duration: .95, ease: "expo.out" }, "glassIn+=0.22")
        .fromTo([".intro-micro", ".intro-footer"], { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, ease: "power2.out" }, "glassIn");
      intro.eventCallback("onComplete", () => { introDone = true; });
      introTl = intro;

      timeline
        .to(".intro-stage", { "--exposure": .72, duration: .22, ease: "none" })
        .to(".intro-background", { scale: 1.1, xPercent: -1.5, duration: .3, ease: "power2.inOut" }, "<")
        .to(".intro-name", { scale: 1.12, yPercent: -4, duration: .3, ease: "power2.inOut" })
        .to(".intro-glass-plane", { xPercent: -2, yPercent: -2, rotateZ: 1, duration: .28, ease: "power2.inOut" }, "<")
        .to(".intro-name span:nth-child(1)", { xPercent: 1.5, duration: .24 }, "<")
        .to(".intro-name span:nth-child(2)", { xPercent: -1, duration: .24 }, "<")
        .to(".intro-name span:nth-child(3)", { scale: 1.16, duration: .28 }, "<")
        .to(".intro-name", { scale: () => intensity().mid, yPercent: -7, autoAlpha: .94, duration: .28, ease: "power2.inOut", invalidateOnRefresh: true })
        .to(".intro-glass-plane", { xPercent: -8, yPercent: -4, autoAlpha: .72, duration: .28, ease: "power2.inOut" }, "<")
        .to(".intro-name", { scale: () => intensity().peak, yPercent: () => intensity().drift, duration: .42, ease: "power2.inOut", invalidateOnRefresh: true })
        .to(".intro-glass-plane", { xPercent: () => intensity().glassX, yPercent: -9, scale: () => intensity().glassScale, autoAlpha: .48, duration: .42, ease: "power2.inOut", invalidateOnRefresh: true }, "<")
        .to([".intro-micro", ".intro-footer"], { autoAlpha: 0, yPercent: 24, duration: .3, ease: "power1.in" }, "<+.05")
        .to(".intro-stage", { "--exposure": .2, duration: .23, ease: "power2.inOut" });
    }, scene);
    // Fonts / images change glyph bounds — recalc viewport-aware values.
    const refresh = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => ScrollTrigger.refresh()); };
    // Failsafe: the glass + copy must always land visible, even if the intro
    // is ever interrupted (background tab, scroll collision, slow device).
    const failsafe = window.setTimeout(() => { if (!introDone && introTl) introTl.progress(1); }, 9000);
    if (enteredDeep) { const landed = introTl as gsap.core.Timeline | null; if (landed) { landed.progress(1); introDone = true; refresh(); } }
    if (document.fonts?.ready) void document.fonts.ready.then(refresh).catch(() => undefined);
    window.addEventListener("load", refresh);
    window.addEventListener("orientationchange", refresh);
    window.addEventListener("resize", refresh);
    return () => { cancelAnimationFrame(raf); window.clearTimeout(failsafe); window.removeEventListener("load", refresh); window.removeEventListener("orientationchange", refresh); window.removeEventListener("resize", refresh); context.revert(); };
  }, []);

  return <section className="cinematic-intro" ref={sceneRef} aria-labelledby="intro-title">
    <div className="intro-stage">
      <div className="intro-background" aria-hidden="true" />
      <div className="intro-light-field" aria-hidden="true" />
      <div className="intro-micro"><span>RITU RAJ BORA</span><span>PORTFOLIO / 2026</span><span>SCENE 01 / 08</span></div>
      <h1 className="intro-name" id="intro-title"><span>RITU</span><span>RAJ</span><span>BORA</span></h1>
      <div className="intro-glass-plane" aria-label="Ritu Raj Bora identity statement"><div className="panel-copy"><p>{roles.join(" · ")}</p><strong>I make digital<br />things <em>feel alive.</em></strong><span>PRODUCT / FRONTEND / GRAPHIC / MOTION</span></div><i aria-hidden="true" /></div>
      <div className="intro-footer"><span>RITU RAJ BORA / 01</span><span>SCROLL TO ENTER <b>↓</b></span></div>
    </div>
  </section>;
}
