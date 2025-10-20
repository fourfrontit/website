import { useRef, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "../data/projects";

/**
 * Projects Slider with Infinite Scroll + Momentum Easing
 * ------------------------------------------------------
 * ✅ Auto-scrolls smoothly back and forth
 * ✅ Works on all browsers (no timing drift)
 * ✅ Pauses on hover
 * ✅ Resumes on tab focus
 * ✅ Easing: cubic (slightly accelerating/decelerating motion)
 */

export default function ProjectsSlides({
  onRequestSOW,
}: {
  onRequestSOW: (projectKey: string) => void;
}) {
  const scroller = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const direction = useRef<"forward" | "backward">("forward");

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    let speed = 0.4; // base pixels/frame
    let targetSpeed = 0.8;
    let easing = 0.05;
    let paused = false;

    const scrollAnimate = () => {
      if (!el || paused) {
        animationRef.current = requestAnimationFrame(scrollAnimate);
        return;
      }

      // Smooth acceleration/deceleration
      speed += (targetSpeed - speed) * easing;

      if (direction.current === "forward") {
        el.scrollLeft += speed;
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
          direction.current = "backward";
          targetSpeed = 0; // slow before reverse
          setTimeout(() => (targetSpeed = 0.8), 300);
        }
      } else {
        el.scrollLeft -= speed;
        if (el.scrollLeft <= 2) {
          direction.current = "forward";
          targetSpeed = 0;
          setTimeout(() => (targetSpeed = 0.8), 300);
        }
      }

      animationRef.current = requestAnimationFrame(scrollAnimate);
    };

    animationRef.current = requestAnimationFrame(scrollAnimate);

    // Pause on hover
    const stop = () => (paused = true);
    const start = () => (paused = false);

    el.addEventListener("mouseenter", stop);
    el.addEventListener("mouseleave", start);

    // Handle tab visibility
    const handleVis = () => {
      paused = document.hidden;
    };
    document.addEventListener("visibilitychange", handleVis);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      el.removeEventListener("mouseenter", stop);
      el.removeEventListener("mouseleave", start);
      document.removeEventListener("visibilitychange", handleVis);
    };
  }, []);

  // Manual navigation
  const slideBy = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLDivElement>("[data-card]");
    const w = (card?.clientWidth ?? 340) + 24;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <section id="projects" className="relative">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
            Projects & Pricing
          </span>
        </h2>
      </div>

      <p className="mt-2 text-slate-300">
        Select a project to view scope and start your questionnaire.
      </p>

      {/* Navigation arrows */}
      <button
        aria-label="Previous"
        className="hidden md:flex text-slate-200 hover:text-white absolute -left-16 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-white/10 border border-white/10 shadow-xl hover:bg-white/15"
        onClick={() => slideBy(-1)}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        aria-label="Next"
        className="hidden md:flex text-slate-200 hover:text-white absolute -right-16 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-white/10 border border-white/10 shadow-xl hover:bg-white/15"
        onClick={() => slideBy(1)}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div
        ref={scroller}
        className="mt-8 overflow-x-auto [scroll-snap-type:x_mandatory] hide-scrollbar"
      >
        <div className="flex gap-6 min-w-max">
          {projects.map((p) => (
            <Card
              key={p.key}
              data-card
              className="w-[360px] shrink-0 scroll-snap-align-start border-white/10 bg-white/5"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-semibold text-white/95 flex items-center justify-between gap-3 text-drop">
                  <span>{p.title}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10 ${
                      p.tier === "Standard"
                        ? "text-cyan-300"
                        : p.tier === "Advanced"
                        ? "text-violet-300"
                        : p.tier === "Premium"
                        ? "text-fuchsia-300"
                        : "text-emerald-300"
                    }`}
                  >
                    {p.tier}
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-slate-300 min-h-[3.5rem]">
                  {p.blurb}
                </p>
                <ul className="mt-3 space-y-1 text-sm text-slate-200">
                  {p.details.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />{" "}
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-lg font-semibold text-cyan-300">
                    {p.rate}
                  </span>
                  <Button
                    className="text-white px-3 py-1 rounded-full bg-cyan-500 hover:bg-cyan-400"
                    onClick={() => onRequestSOW(p.key)}
                  >
                    Request SOW
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
