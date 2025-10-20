import { useRef, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "../data/projects";

export default function ProjectsSlides({ onRequestSOW }: { onRequestSOW: (projectKey: string) => void }) {
  const scroller = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    const el = scroller.current;
    if (!el || intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      const max = el.scrollWidth - el.clientWidth;
      const nextLeft = el.scrollLeft + 360;

      if (nextLeft >= max - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 360, behavior: "smooth" });
      }
    }, 4000);
  };

  const stopAuto = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    // Wait for layout
    const t = setTimeout(startAuto, 500);

    // Pause on tab hidden, resume when visible
    const handleVisibility = () => {
      if (document.hidden) stopAuto();
      else startAuto();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearTimeout(t);
      stopAuto();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const slideBy = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    const width = el.querySelector<HTMLDivElement>("[data-card]")?.clientWidth ?? 320;
    el.scrollBy({ left: dir * (width + 24), behavior: "smooth" });
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
      <p className="mt-2 text-slate-300">Select a project to view scope and start your questionnaire.</p>

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
        onMouseEnter={stopAuto}
        onMouseLeave={startAuto}
        className="mt-8 overflow-x-auto [scroll-snap-type:x_mandatory] hide-scrollbar"
        aria-label="project-cards-carousel"
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
                  <span className="pr-2 whitespace-normal break-words">{p.title}</span>
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

              <CardContent className="text-left">
                <p className="text-sm text-slate-300 min-h-[3.5rem]">{p.blurb}</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-200">
                  {p.details.slice(0, 4).map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400" /> {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between">
                  <span
                    className={`text-lg font-semibold ${
                      p.tier === "Standard"
                        ? "text-cyan-300"
                        : p.tier === "Advanced"
                        ? "text-violet-300"
                        : p.tier === "Premium"
                        ? "text-fuchsia-300"
                        : "text-emerald-300"
                    }`}
                  >
                    {p.rate}
                  </span>
                  <Button
                    className={`text-white px-3 py-1 rounded-full ${
                      p.tier === "Standard"
                        ? "bg-cyan-500 hover:bg-cyan-400"
                        : p.tier === "Advanced"
                        ? "bg-violet-500 hover:bg-violet-400"
                        : p.tier === "Premium"
                        ? "bg-fuchsia-500 hover:bg-fuchsia-400"
                        : "bg-emerald-500 hover:bg-emerald-400"
                    }`}
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
