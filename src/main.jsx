import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'         // Tailwind + base css
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FourFrontITLanding, { AboutPage } from './four_front_itlanding_preview.jsx'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FourFrontITLanding />} />
        <Route path="/about" element={<AboutPage />} />
        {/* add other routes here as needed */}
      </Routes>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById('root'))
root.render(<AppRoutes />)

