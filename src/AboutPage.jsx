// src/AboutPage.jsx
import React from "react";
import { motion } from "framer-motion";
import garyImg from "./assets/gary.png";

export default function AboutPage() {
  const fadeUp = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 80 } }, hidden: {} }}>
        <motion.header variants={fadeUp} className="mb-8">
          <a href="/" className="text-sm text-cyan-400 underline">← Back to Home</a>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4">About FourFront IT</h1>
          <p className="mt-3 text-slate-400">We empower businesses through reliable, scalable, and secure technology solutions.</p>
        </motion.header>

        <motion.section variants={fadeUp} className="mt-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 p-6 rounded-lg border border-white/6">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Our Leadership</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">At the core of FourFront IT is a leadership team driven by innovation, accountability, and an unwavering commitment to client success...</p>

          <div className="mt-6 grid md:grid-cols-2 gap-6 items-start">
            <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-white/5">
              <div className="font-semibold text-slate-900 dark:text-white">Gary Flavin — Co-founder &amp; Director of Marketing</div>
              <div className="mt-4 flex flex-col md:flex-row gap-4 items-start">
                <div className="w-36 h-36 flex-shrink-0 rounded overflow-hidden bg-slate-100 dark:bg-slate-700 flex items-center justify-center border border-white/5">
                  <img src={garyImg} alt="Gary Flavin — Co-founder & Director of Marketing" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-300">Gary is a tech enthusiast and mechanical engineering professional...</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-white/5">
              <div className="font-semibold text-slate-900 dark:text-white">Benefits to you</div>
              <p className="mt-2 text-slate-600 dark:text-slate-300">The ever changing and increasingly competitive global marketplace demands...</p>
            </div>
          </div>

          <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">Interested in meeting the rest of our leadership or discussing a tailored roadmap? <a href="mailto:info@fourfrontit.com" className="text-cyan-400 underline">Contact us</a>.</div>
        </motion.section>
      </motion.div>
    </div>
  );
}
