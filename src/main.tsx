import React from "react";
import { createRoot } from "react-dom/client";
import Website from "./four_front_itlanding_preview"; // <--- point to your file
import "./index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Website />
  </React.StrictMode>
);
