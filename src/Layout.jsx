// src/Layout.jsx
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Layout({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-gray-800 text-slate-100' : 'bg-white text-slate-900'}`}>
      <Header theme={theme} setTheme={setTheme} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
