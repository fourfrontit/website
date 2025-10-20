import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WhyUs() {
  const items = [
    { title: "MSP-Centric", copy: "We understand RMMs, PSAs, and partner workflows." },
    { title: "Automation-First", copy: "We streamline and automate wherever possible." },
    { title: "Structured Delivery", copy: "Every project includes validation checklists and handover docs." },
    { title: "Transparent Pricing", copy: "No hidden costs. Simple hourly or fixed-rate projects." },
    { title: "Future-Focused", copy: "Our scopes evolve with technology to keep you ahead." },
  ];
  return (
    <section className="mt-12" aria-label="why-us">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center">
        <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
          Why partners choose us
        </span>
      </h2>
      <div className="mt-8 grid md:grid-cols-5 gap-8 items-stretch">
        {items.map((f) => (
          <Card key={f.title} className="card-zoom border-white/10 bg-white/5 h-full flex flex-col">
            <CardHeader className="pb-1 text-center px-4">
              <CardTitle className="text-white text-2xl font-extrabold text-drop break-words whitespace-normal leading-tight">
                {f.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center px-4 pb-6 flex-1">
              <p className="text-base text-slate-200 leading-relaxed">{f.copy}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
