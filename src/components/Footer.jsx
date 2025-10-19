// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-tr from-slate-900 to-slate-800 text-slate-300">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
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
        </div>

        <div className="border-t border-white/5 mt-8 pt-6">
          <div className="text-center text-sm text-slate-500">Designed with an AI-driven aesthetic — FourFront IT</div>
        </div>
      </div>
    </footer>
  );
}
