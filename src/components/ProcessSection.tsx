import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const steps = [
  {
    id: 1,
    title: "Discover",
    desc: "We start with a structured questionnaire and a discovery call to confirm scope, risks, and timelines.",
    icon: "🔍",
  },
  {
    id: 2,
    title: "Design",
    desc: "We create your SOW with milestones, dependencies, and acceptance criteria aligned with best practices.",
    icon: "🧩",
  },
  {
    id: 3,
    title: "Deliver",
    desc: "Engineers execute the plan using automation-first deployment with validation checklists and audit logs.",
    icon: "⚙️",
  },
  {
    id: 4,
    title: "Document",
    desc: "You receive partner-ready handover docs — configs, runbooks, evidence, and change logs.",
    icon: "📘",
  },
];

export default function ProcessSection() {
  const [active, setActive] = useState(1);

  return (
    <section id="process" className="relative text-center">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
        <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
          How We Work
        </span>
      </h2>

      <p className="text-slate-300 mb-12 max-w-2xl mx-auto">
        A four-step, automation-first approach that keeps every project traceable, predictable, and validated.
      </p>

      <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            onHoverStart={() => setActive(step.id)}
            className="flex flex-col items-center relative"
          >
            {/* Connector lines */}
            {step.id !== steps.length && (
              <div
                className="hidden md:block absolute top-6 left-full w-24 h-[2px] bg-gradient-to-r from-cyan-400/40 to-violet-400/40"
                aria-hidden
              ></div>
            )}

            {/* Step orb */}
            <motion.div
              animate={{
                scale: active === step.id ? 1.15 : 1,
                boxShadow:
                  active === step.id
                    ? "0 0 30px rgba(168,85,247,0.4)"
                    : "0 0 10px rgba(94,234,212,0.2)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="h-16 w-16 md:h-20 md:w-20 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-500/30 border border-white/10 text-3xl select-none"
            >
              {step.icon}
            </motion.div>

            {/* Title */}
            <div className="mt-4 text-lg font-semibold text-white">{step.title}</div>

            {/* Description (active) */}
            {active === step.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-3 text-sm text-slate-300 max-w-[240px]"
              >
                {step.desc}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <button
          onClick={() =>
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-full font-semibold transition"
        >
          See Projects
        </button>
        <button
          onClick={() =>
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-6 py-2 bg-violet-500 hover:bg-violet-400 text-slate-900 rounded-full font-semibold transition"
        >
          Book a Scoping Call
        </button>
      </div>
    </section>
  );
}
