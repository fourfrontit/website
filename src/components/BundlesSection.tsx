import React from "react";
import { bundles } from "../data/bundles";

export default function BundlesSection() {
  return (
    <section id="bundles">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
          Bundled Solutions
        </span>
      </h2>
      <p className="mt-2 text-slate-300">
        Turnkey outcomes with documentation, validation, and onboarding questionnaires included.
      </p>

      <div className="mt-10 grid gap-6">
        {bundles.map((b, i) => (
          <div
            key={b.title}
            className="grid md:grid-cols-2 border border-white/10 rounded-2xl overflow-hidden bg-white/5"
          >
            <div
              className={`p-6 md:p-8 flex flex-col justify-center ${
                i % 2 === 0
                  ? "bg-gradient-to-br from-cyan-600/40 to-violet-600/40"
                  : "bg-gradient-to-br from-fuchsia-600/40 to-emerald-600/40"
              }`}
            >
              <div className="text-2xl font-semibold text-white/95">
                {b.title}
              </div>
              <div className="mt-2 text-lg text-white/80">{b.price}</div>
            </div>
            <div className="p-6 md:p-8">
              <ul className="space-y-2 text-slate-200 text-sm md:text-base">
                {b.bullets.map((x) => (
                  <li key={x} className="flex gap-3 items-start">
                    <span className="mt-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />{" "}
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
