import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'         // Tailwind + base css
import FourFrontITLanding, { AboutPage } from './four_front_itlanding_preview.jsx'

const root = createRoot(document.getElementById('root'))
root.render(<FourFrontITLanding />)
