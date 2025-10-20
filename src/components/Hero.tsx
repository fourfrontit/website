import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { testimonials } from "../data/testimonials";
import { smoothScroll } from "../utils/smoothScroll";

export default function Hero() {
  return (
    <section id="home" className="grid lg:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Projects that{" "}
          <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
            scale, automate
          </span>
          , and{" "}
          <span className="bg-gradient-to-r from-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">
            strengthen
          </span>{" "}
          your stack.
        </h1>
        <p className="mt-4 text-slate-300 max-w-xl">
          Structured, partner-ready projects with validation and handover.
          Transparent pricing, lean timelines, measurable outcomes.
        </p>
        <div className="mt-6 flex gap-3">
          <Button
            onClick={() => smoothScroll("projects")}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900"
          >
            Explore Projects
          </Button>
          <Button
            onClick={() => smoothScroll("process")}
            className="bg-violet-500 hover:bg-violet-400 text-slate-900"
          >
            How We Work
          </Button>
        </div>
      </div>
      <HeroTestimonials />
    </section>
  );
}

function HeroTestimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setIdx((i) => (i + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(t);
  }, []);
  const t = testimonials[idx];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur shadow-2xl">
      <div className="text-sm text-cyan-300 font-semibold">Testimonials</div>
      <figure className="mt-4">
        <blockquote className="text-lg leading-relaxed">“{t.quote}”</blockquote>
        <figcaption className="mt-3 text-slate-300 text-sm">
          — {t.author}, {t.role}
        </figcaption>
      </figure>
      <div className="mt-4 flex gap-2">
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === idx ? "bg-cyan-400" : "bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
