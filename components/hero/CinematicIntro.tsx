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
    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: scene, start: "top top", end: "bottom bottom", scrub: 1.1, invalidateOnRefresh: true },
      });

      // Keep the identity panel available if motion is interrupted during hydration.
      gsap.set(".intro-name span", { autoAlpha: 0 });
      gsap.set(".intro-name span", { yPercent: 12, filter: "blur(4px)" });
      gsap.set(".intro-glass-plane", { xPercent: 16, yPercent: 3, rotateY: -8, rotateZ: -2, scale: .86 });

      intro.to(".intro-background", { autoAlpha: .48, duration: 1.5, ease: "power2.inOut" })
        .to(".intro-name span:nth-child(1)", { autoAlpha: 1, yPercent: 0, filter: "blur(0px)", duration: 1.1 })
        .to(".intro-name span:nth-child(2)", { autoAlpha: 1, yPercent: 0, filter: "blur(0px)", duration: 1.1 }, "-=.65")
        .to(".intro-name span:nth-child(3)", { autoAlpha: 1, yPercent: 0, filter: "blur(0px)", duration: 1.1 }, "-=.65")
        .to(".intro-glass-plane", { autoAlpha: .9, xPercent: 0, yPercent: 0, rotateY: -2, rotateZ: -1, scale: 1, duration: 1.4, ease: "power2.out" }, "-=.35")
        .fromTo(".intro-glass-plane .panel-copy", { clipPath: "inset(0 0 100%)" }, { clipPath: "inset(0)", duration: 1.1, ease: "power3.out" }, "-=.9");

      timeline
        .to(".intro-stage", { "--exposure": .72, duration: .22, ease: "none" })
        .to(".intro-background", { scale: 1.1, xPercent: -1.5, duration: .3, ease: "power2.inOut" }, "<")
        .to(".intro-name", { scale: 1.12, yPercent: -4, duration: .3, ease: "power2.inOut" })
        .to(".intro-glass-plane", { xPercent: -2, yPercent: -2, rotateZ: 1, duration: .28, ease: "power2.inOut" }, "<")
        .to(".intro-name span:nth-child(1)", { xPercent: 1.5, duration: .24 }, "<")
        .to(".intro-name span:nth-child(2)", { xPercent: -1, duration: .24 }, "<")
        .to(".intro-name span:nth-child(3)", { scale: 1.16, duration: .28 }, "<")
        .to(".intro-name", { scale: 1.35, yPercent: -7, autoAlpha: .94, duration: .28, ease: "power2.inOut" })
        .to(".intro-glass-plane", { xPercent: -8, yPercent: -4, autoAlpha: .72, duration: .28, ease: "power2.inOut" }, "<")
        .to(".intro-name", { scale: 2.8, yPercent: -12, duration: .42, ease: "power2.inOut" })
        .to(".intro-glass-plane", { xPercent: -15, yPercent: -9, scale: 1.16, autoAlpha: .48, duration: .42, ease: "power2.inOut" }, "<")
        .to(".intro-stage", { "--exposure": .2, duration: .23, ease: "power2.inOut" });
    }, scene);
    return () => context.revert();
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
