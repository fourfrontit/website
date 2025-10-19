// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Header({ theme, setTheme }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-black/40 dark:bg-slate-900/60 border-b border-white/5">
      <nav className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" aria-label="Go to home" className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-black font-bold">FF</div>
          <div>
            <div className="font-semibold">FourFrontIT</div>
            <div className="text-xs text-slate-400">Managed IT + AI Ops</div>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-6 text-sm">
          <li><Link to="/about" className="relative px-2 py-1 hover:text-white text-slate-300">About</Link></li>
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
  );
}
