import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, PenTool, Cog, BookOpen } from "lucide-react";

const steps = [
  {
    title: "Discover",
    desc: "We start with a structured questionnaire and discovery call to confirm scope, risks, and timelines.",
    icon: <Search className="h-8 w-8 text-cyan-300" />,
  },
  {
    title: "Design",
    desc: "We create your Statement of Work with milestones, dependencies, and acceptance criteria.",
    icon: <PenTool className="h-8 w-8 text-violet-300" />,
  },
  {
    title: "Deliver",
    desc: "Our engineers execute the plan using automation-first deployment with validation and documentation.",
    icon: <Cog className="h-8 w-8 text-emerald-300" />,
  },
  {
    title: "Document",
    desc: "We hand over configurations, evidence, and detailed runbooks to your operations team.",
    icon: <BookOpen className="h-8 w-8 text-fuchsia-300" />,
  },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="process"
      className="relative py-40 flex flex-col items-center text-center overflow-hidden"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
        <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
          How We Work
        </span>
      </h2>
      <p className="text-slate-300 mb-20 max-w-2xl text-base md:text-lg leading-relaxed">
        A transparent, automation-first delivery framework designed to ensure
        precision, traceability, and measurable success — from scoping to
        handover.
      </p>

      <div
        ref={ref}
        className="relative flex flex-col md:flex-row items-center justify-center gap-20 md:gap-28"
      >
        {/* 🔹 Glowing animated timeline (horizontal) */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute top-1/2 hidden md:block h-[3px] w-full overflow-hidden rounded-full bg-gradient-to-r from-cyan-400/20 via-violet-400/20 to-fuchsia-400/20"
        >
          <div className="absolute inset-0 animate-line-glow bg-[linear-gradient(90deg,_rgba(56,189,248,0)_0%,_rgba(168,85,247,0.8)_50%,_rgba(56,189,248,0)_100%)] bg-[length:200%_100%]" />
        </motion.div>

        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: i * 0.25,
              duration: 0.6,
              ease: "easeOut",
            }}
            className="relative flex flex-col items-center text-center max-w-xs"
          >
            <motion.div
              whileHover={{ scale: 1.15, rotate: 3 }}
              transition={{ type: "spring", stiffness: 220, damping: 12 }}
              className="h-24 w-24 flex items-center justify-center rounded-full bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/10 shadow-[0_0_25px_rgba(168,85,247,0.2)] backdrop-blur-lg"
            >
              {step.icon}
            </motion.div>
            <h3 className="mt-6 text-2xl font-bold text-white tracking-tight">
              {step.title}
            </h3>
            <p className="mt-3 text-slate-300 text-sm leading-relaxed">
              {step.desc}
            </p>
            {i < steps.length - 1 && (
              <motion.div
                initial={{ height: 0 }}
                animate={isInView ? { height: "4rem" } : { height: 0 }}
                transition={{ delay: i * 0.25 + 0.2, duration: 0.5 }}
                className="md:hidden w-[2px] bg-gradient-to-b from-cyan-400/30 to-violet-400/30 mt-4"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="mt-28 flex flex-wrap justify-center gap-3">
        <button
          onClick={() =>
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-full font-semibold transition shadow-lg"
        >
          See Projects
        </button>
        <button
          onClick={() =>
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-8 py-3 bg-violet-500 hover:bg-violet-400 text-slate-900 rounded-full font-semibold transition shadow-lg"
        >
          Book a Scoping Call
        </button>
      </div>

      {/* 🔮 Glow line animation keyframes */}
      <style>
        {`
          @keyframes line-glow {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          .animate-line-glow {
            animation: line-glow 6s linear infinite;
          }
        `}
      </style>
    </section>
  );
}
