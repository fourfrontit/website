// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./four_front_itlanding_preview"; // or your landing component
import AboutPage from "./AboutPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home/></Layout>} />
        <Route path="/about" element={<Layout><AboutPage/></Layout>} />
        {/* other routes */}
      </Routes>
    </BrowserRouter>
  );
}
