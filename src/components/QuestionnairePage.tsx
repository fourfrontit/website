import React, { useState } from "react";
import { projects } from "../data/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function QuestionnairePage({
  projectKey,
  onDone,
  onBackToMain,
}: {
  projectKey: string;
  onDone: () => void;
  onBackToMain: () => void;
}) {
  const project = projects.find((p) => p.key === projectKey);
  const [submitted, setSubmitted] = useState(false);

  if (!project)
    return (
      <section className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
            Project not found
          </span>
        </h2>
        <p className="mt-2 text-slate-300">
          The selected project questionnaire could not be loaded.
        </p>
        <div className="mt-6 flex gap-3">
          <Button
            onClick={onBackToMain}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900"
          >
            Back to main page
          </Button>
        </div>
      </section>
    );

  if (submitted)
    return (
      <section className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
            Thank you!
          </span>
        </h2>
        <p className="mt-3 text-slate-300">
          A member of our team will review your {project.title} questionnaire and contact you with a scoped SOW.
        </p>
        <Button
          className="mt-6 bg-cyan-500 hover:bg-cyan-400 text-slate-900"
          onClick={onBackToMain}
        >
          Back to main page
        </Button>
      </section>
    );

  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
          {project.title} – Questionnaire
        </span>
      </h2>
      <p className="mt-2 text-slate-300">
        Please complete the form below. This helps us validate scope, risks, and timelines.
      </p>

      <form className="mt-6 grid gap-4">
        <div className="grid md:grid-cols-2 gap-3">
          <Input placeholder="Your name" className="bg-white/10 border-white/20 placeholder:text-slate-400" />
          <Input type="email" placeholder="Work email" className="bg-white/10 border-white/20 placeholder:text-slate-400" />
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <Input placeholder="Company / MSP" className="bg-white/10 border-white/20 placeholder:text-slate-400" />
          <Input placeholder="Phone (optional)" className="bg-white/10 border-white/20 placeholder:text-slate-400" />
        </div>
        <Textarea placeholder="Environment overview (versions, platforms, number of servers/users)" className="bg-white/10 border-white/20 placeholder:text-slate-400 min-h-[120px]" />
        <Textarea placeholder="Access & licensing available (admin creds, OS/M365/hypervisor licenses)" className="bg-white/10 border-white/20 placeholder:text-slate-400 min-h-[120px]" />
        <Textarea placeholder="Business requirements & downtime window" className="bg-white/10 border-white/20 placeholder:text-slate-400 min-h-[120px]" />
        <div>
          <div className="text-sm text-slate-300 mb-2">Key items (tick those you need):</div>
          <div className="grid md:grid-cols-2 gap-2">
            {project.details.map((d) => (
              <label key={d} className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="h-4 w-4" /> <span>{d}</span>
              </label>
            ))}
          </div>
        </div>
        <Textarea placeholder="Anything else we should know?" className="bg-white/10 border-white/20 placeholder:text-slate-400 min-h-[120px]" />
        <div className="pt-2 flex items-center gap-3">
          <Button
            type="button"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-900"
            onClick={() => {
              onDone();
              setSubmitted(true);
            }}
          >
            Send
          </Button>
          <Button type="button" variant="outline" className="border-white/20" onClick={onBackToMain}>
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
}
