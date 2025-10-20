import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { smoothScroll } from "../utils/smoothScroll";

export default function ProcessSection() {
  const steps = [
    { title: "Discover", copy: "Short questionnaire + call to confirm scope, risks, and timelines." },
    { title: "Design", copy: "We finalize the SOW with milestones, acceptance criteria, and prerequisites." },
    { title: "Deliver", copy: "Engineers execute with validation checklists and evidence collection." },
    { title: "Document", copy: "Partner-ready handover including configs, accounts, backups, and runbooks." },
  ];
  const [active, setActive] = useState(0);

  return (
    <section id="process">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
          How We Work
        </span>
      </h2>
      <p className="mt-2 text-slate-300">
        A four-step, automation-first approach designed for MSP delivery.
      </p>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {steps.map((s, i) => (
          <Card
            key={s.title}
            onMouseEnter={() => setActive(i)}
            className="border-white/10 bg-white/5 hover:bg-white/10 transition-all"
          >
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl font-extrabold">{s.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-300 text-sm">{s.copy}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="text-xl font-semibold text-white">{steps[active].title}</div>
        <p className="mt-2 text-slate-300">{steps[active].copy}</p>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Button onClick={() => smoothScroll("projects")} className="bg-cyan-500 hover:bg-cyan-400 text-slate-900">
          See Projects
        </Button>
        <Button className="bg-violet-500 hover:bg-violet-400 text-slate-900" onClick={() => smoothScroll("contact")}>
          Book a scoping call
        </Button>
      </div>
    </section>
  );
}
