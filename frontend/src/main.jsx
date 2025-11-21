import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Home from "./pages/Home.jsx";
import Portal from "./pages/Portal.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>

      {/* Page d’accueil */}
      <Route path="/" element={<Home />} />

      {/* Page de sélection du rôle */}
      <Route path="/portal" element={<Portal />} />

      {/* Plus tard : /login/etudiant , /login/medecin ... */}
      
    </Routes>
  </BrowserRouter>
);
