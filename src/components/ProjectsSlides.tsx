import { useRef, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "../data/projects";

export default function ProjectsSlides({
  onRequestSOW,
}: {
  onRequestSOW: (projectKey: string) => void;
}) {
  const scroller = useRef<HTMLDivElement | null>(null);
  const direction = useRef<"forward" | "backward">("forward");

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    let lastTime = 0;
    let scrollSpeed = 0.6; // pixels per frame (60fps ≈ 36px/sec)
    let frameId: number;

    const animate = (time: number) => {
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (time - lastTime > 16) {
        if (direction.current === "forward") {
          el.scrollLeft += scrollSpeed;
          if (el.scrollLeft >= maxScroll - 2) direction.current = "backward";
        } else {
          el.scrollLeft -= scrollSpeed;
          if (el.scrollLeft <= 0) direction.current = "forward";
        }
        lastTime = time;
      }
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    // pause on hover
    const stop = () => cancelAnimationFrame(frameId);
    const start = () => (frameId = requestAnimationFrame(animate));

    el.addEventListener("mouseenter", stop);
    el.addEventListener("mouseleave", start);

    return () => {
      cancelAnimationFrame(frameId);
      el.removeEventListener("mouseenter", stop);
      el.removeEventListener("mouseleave", start);
    };
  }, []);

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

      {/* arrows */}
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
                        : "text-fuchsia-300"
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
