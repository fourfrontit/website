// src/AboutPage.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import garyImg from "./assets/gary.png"; // add your image to src/assets/gary.png

export default function AboutPage() {
  const [theme, setTheme] = useState('dark');
  const fadeUp = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-gray-800 text-slate-100' : 'bg-white text-slate-900'}`}>
      {/* top progress bar (keeps visual parity with landing) */}
      <div className="fixed left-0 top-0 h-1 z-50 w-full bg-transparent pointer-events-none">
        <div style={{ width: `0%` }} className="h-1 bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-150" />
      </div>

      {/* NAV (copied from main for consistent look) */}
      <header className="sticky top-0 z-40 backdrop-blur bg-black/40 dark:bg-slate-900/60 border-b border-white/5">
        <nav className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" aria-label="Go to home" className="flex items-center gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-black font-bold">FF</div>
            <div>
              <div className="font-semibold">FourFrontIT</div>
              <div className="text-xs text-slate-400">Managed IT + AI Ops</div>
            </div>
          </Link>

          <ul className="hidden md:flex items-center gap-6 text-sm">
            <li><Link to="/about" className="relative px-2 py-1 text-white font-semibold">About</Link></li>
            {['services','calculator','prices','contact'].map(id => (
              <li key={id}>
                <a href={`#${id}`} className="relative px-2 py-1 hover:text-white text-slate-300">{id.charAt(0).toUpperCase()+id.slice(1)}</a>
              </li>
            ))}
            <li><a href="/portal" className="inline-flex items-center px-4 py-2 rounded-full font-medium bg-gradient-to-r from-cyan-400 to-violet-500 text-black shadow">Client Portal</a></li>
            <li>
              <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} className="p-2 rounded-md bg-white/5 text-slate-200">{theme === 'dark' ? '☀️' : '🌙'}</button>
            </li>
          </ul>

          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} className="p-2 rounded-md bg-white/5">{theme === 'dark' ? '☀️' : '🌙'}</button>
            <select onChange={(e) => { const v = e.target.value; if (v) window.location.href = v; }} className="bg-transparent p-2 rounded text-sm text-slate-200 border border-white/5">
              <option value="">Menu</option>
              <option value="/">Home</option>
              <option value="#services">Services</option>
              <option value="#calculator">Calculator</option>
              <option value="#prices">Prices</option>
              <option value="#contact">Contact</option>
            </select>
          </div>
        </nav>
      </header>

      {/* PAGE CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 80 } }, hidden: {} }}>
          <motion.header variants={fadeUp} className="mb-8">
            <Link to="/" className="text-sm text-cyan-400 underline">← Back to Home</Link>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-4">About FourFront IT</h1>
            <p className="mt-3 text-slate-400 dark:text-slate-300">We empower businesses through reliable, scalable, and secure technology solutions.</p>
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

      {/* FOOTER (copied from landing page for consistency) */}
      <footer className="mt-20 bg-gradient-to-tr from-slate-900 to-slate-800 text-slate-300">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-8 items-start">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-black font-bold">FF</div>
                <div>
                  <div className="text-white font-semibold">FourFront IT</div>
                  <div className="text-xs text-slate-400">Managed IT · AI Ops · Security</div>
                </div>
              </div>

              <div className="text-xs text-slate-500 mt-4">All rights reserved © {new Date().getFullYear()} FourFront IT, Vancouver, Canada</div>
            </div>

            <div className="flex justify-center">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="font-semibold text-white mb-2">Company</div>
                  <ul className="text-sm text-slate-400 space-y-2">
                    <li><a href="#features" className="hover:underline">Features</a></li>
                    <li><a href="#about" className="hover:underline">About</a></li>
                    <li><a href="#prices" className="hover:underline">Pricing</a></li>
                    <li><a href="#contact" className="hover:underline">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-white mb-2">Resources</div>
                  <ul className="text-sm text-slate-400 space-y-2">
                    <li><a href="#blog" className="hover:underline">Blog</a></li>
                    <li><a href="#docs" className="hover:underline">Docs</a></li>
                    <li><a href="#support" className="hover:underline">Support</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-semibold text-white mb-3">Follow us</div>
              <div className="flex justify-end gap-3">
                <button className="w-9 h-9 rounded bg-slate-800 flex items-center justify-center">f</button>
                <button className="w-9 h-9 rounded bg-slate-800 flex items-center justify-center">t</button>
                <button className="w-9 h-9 rounded bg-slate-800 flex items-center justify-center">in</button>
              </div>

              <div className="text-sm text-slate-400 mt-6">Built for Linode / Ubuntu — Deployable on your stack</div>
            </div>
          </motion.div>

          <div className="border-t border-white/5 mt-8 pt-6">
            <div className="text-center text-sm text-slate-500">Designed with an AI-driven aesthetic — FourFront IT</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
