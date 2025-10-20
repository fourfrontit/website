import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  // Scroll progress hook
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Pulse moves with scroll
  const pulsePosition = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      className="relative py-44 flex flex-col items-center text-center overflow-hidden"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
        <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
          How We Work
        </span>
      </h2>
      <p className="text-slate-300 mb-28 max-w-2xl text-base md:text-lg leading-relaxed">
        Our process is engineered for precision — transparent, validated, and
        automation-driven from start to finish.
      </p>

      <div
        ref={ref}
        className="relative flex flex-col md:flex-row items-center justify-center gap-24 md:gap-32"
      >
        {/* 🔹 Glowing base timeline (behind orbs) */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
          className="absolute top-1/2 hidden md:block h-[3px] w-full rounded-full bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20"
        />

        {/* 🔹 Animated glow pulse traveling BEHIND orbs */}
        <motion.div
          style={{ left: pulsePosition }}
          className="absolute top-1/2 hidden md:block h-[3px] w-40 rounded-full -translate-x-1/2 
            bg-[linear-gradient(90deg,_rgba(56,189,248,0)_0%,_rgba(168,85,247,0.9)_50%,_rgba(56,189,248,0)_100%)] 
            blur-md opacity-80 pointer-events-none"
        />

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
            {/* Orb icons - above the line */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 2 }}
              transition={{ type: "spring", stiffness: 220, damping: 12 }}
              className="z-10 h-24 w-24 flex items-center justify-center rounded-full 
                bg-gradient-to-br from-slate-800/60 to-slate-900/60 
                border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.15)] backdrop-blur-xl"
            >
              {step.icon}
            </motion.div>

            <h3 className="mt-6 text-2xl font-bold text-white tracking-tight">
              {step.title}
            </h3>
            <p className="mt-3 text-slate-300 text-sm leading-relaxed">
              {step.desc}
            </p>

            {/* Mobile vertical connectors */}
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
    </section>
  );
}
