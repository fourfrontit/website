import React from "react";
import { Button } from "@/components/ui/button";
import { Cpu, Twitter, Linkedin, Youtube } from "lucide-react";
import { smoothScroll } from "../utils/smoothScroll";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-slate-100 relative">
      <style>{`
        .hide-scrollbar{scrollbar-width:none;-ms-overflow-style:none}
        .hide-scrollbar::-webkit-scrollbar{display:none}
        .text-drop{ text-shadow:0 2px 8px rgba(0,0,0,.45) }
        .card-zoom{ transition:transform .25s ease, box-shadow .25s ease }
        .card-zoom:hover{ transform:scale(1.04) }
      `}</style>

      {/* background glow */}
      <div className="absolute inset-0 -z-10 opacity-40" aria-hidden>
        <div className="absolute -top-20 right-0 h-[40rem] w-[40rem] rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-600/30 blur-3xl" />
        <div className="absolute top-40 -left-10 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tr from-blue-500/20 to-fuchsia-500/20 blur-3xl" />
      </div>

      {/* header */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-slate-900/40 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold tracking-tight text-xl md:text-2xl">
            <Cpu className="h-6 w-6 text-cyan-400" /> FourFront IT
          </div>
          <nav className="hidden md:flex gap-6 text-base md:text-lg">
            {[
              { label: "Home", href: "home" },
              { label: "Projects", href: "projects" },
              { label: "Bundles", href: "bundles" },
              { label: "Process", href: "process" },
              { label: "Contact", href: "contact" },
            ].map((n) => (
              <button
                key={n.href}
                onClick={() => smoothScroll(n.href)}
                className="hover:text-cyan-300 transition text-slate-200"
              >
                {n.label}
              </button>
            ))}
          </nav>
          <Button
            onClick={() => smoothScroll("contact")}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900"
          >
            Get a scoped project
          </Button>
        </div>
      </header>

      {/* content */}
      <main className="mx-auto max-w-7xl px-4 py-16 space-y-36">{children}</main>

      {/* footer */}
      <footer className="mt-20 border-t border-white/10 bg-white/5">
        <div className="mx-auto max-w-7xl px-4 py-12 grid lg:grid-cols-4 gap-8 text-sm text-slate-300">
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <Cpu className="h-5 w-5 text-cyan-400" /> FourFront IT
            </div>
            <p className="mt-2 opacity-80">
              Automation-first project delivery for MSPs and modern businesses.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/15">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/15">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/15">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <div className="font-semibold">Head office</div>
            <address className="mt-2 not-italic leading-relaxed">
              401–570 East 8th Avenue,
              <br />
              Vancouver, BC V5T 1S8, Canada.
            </address>
          </div>
          <div>
            <div className="font-semibold">Call Us</div>
            <p className="mt-2">Mon–Fri, 8am–5pm (PT)</p>
            <p className="font-medium">+1 (672) 762-3822</p>
          </div>
          <div>
            <div className="font-semibold">Quick Links</div>
            <div className="mt-2 flex flex-wrap gap-3">
              {[
                "home",
                "projects",
                "bundles",
                "process",
                "contact",
              ].map((n) => (
                <button
                  key={n}
                  className="underline-offset-4 hover:underline text-slate-200"
                  onClick={() => smoothScroll(n)}
                >
                  {n.charAt(0).toUpperCase() + n.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
