// src/AboutPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// Import the Gary image. Put your image in src/assets/gary.png (see instruction below)
import garyImg from "./assets/gary.png";

export default function AboutPage() {
  const fadeUp = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-200">
      <main className="max-w-4xl mx-auto px-6 py-16">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 80 } }, hidden: {} }}>
          <motion.header variants={fadeUp} className="mb-8">
            <Link to="/" className="text-sm text-cyan-400 underline">← Back to Home</Link>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-4">About FourFront IT</h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300">We empower businesses through reliable, scalable, and secure technology solutions.</p>
          </motion.header>

          <motion.section variants={fadeUp} className="mt-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 p-6 rounded-lg border border-white/6">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">Our Leadership</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">At the core of FourFront IT is a leadership team driven by innovation, accountability, and an unwavering commitment to client success. With decades of combined experience across IT infrastructure, cybersecurity, cloud computing, and digital transformation, our leadership guides the company with a clear vision: to empower businesses through reliable, scalable, and secure technology solutions.</p>

            <div className="mt-6 grid md:grid-cols-2 gap-6 items-start">
              <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-white/5">
                <div className="font-semibold text-slate-900 dark:text-white">Gary Flavin — Co-founder &amp; Director of Marketing</div>

                <div className="mt-4 flex flex-col md:flex-row gap-4 items-start">
                  <div className="w-36 h-36 flex-shrink-0 rounded overflow-hidden bg-slate-100 dark:bg-slate-700 flex items-center justify-center border border-white/5">
                    <img src={garyImg} alt="Gary Flavin — Co-founder & Director of Marketing" className="w-full h-full object-cover" />
                  </div>

                  <div>
                    <p className="text-slate-600 dark:text-slate-300">Gary is a tech enthusiast and mechanical engineering professional with a deep passion for technology, innovation, and the MSP industry. With a sharp eye for emerging trends and a hands-on approach to problem-solving, Gary brings both technical expertise and strategic marketing insight to the team.</p>
                    <p className="mt-2 text-slate-600 dark:text-slate-300">As Co-founder of FourFront IT, he is dedicated to helping businesses thrive through smart IT solutions, clear communication, and a commitment to excellence.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border border-white/5">
                <div className="font-semibold text-slate-900 dark:text-white">Benefits to you</div>
                <p className="mt-2 text-slate-600 dark:text-slate-300">The ever changing and increasingly competitive global marketplace demands that business owners continuously seek to improve their financial position to ensure their survival. Our services focus on predictable costs, reduced downtime, and improved security posture so you can focus on growth while we handle the technology.</p>
              </div>
            </div>

            <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">Interested in meeting the rest of our leadership or discussing a tailored roadmap? <a href="mailto:info@fourfrontit.com" className="text-cyan-400 underline">Contact us</a>.</div>
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
}
