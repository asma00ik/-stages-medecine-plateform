import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Home from "./pages/Home.jsx";
import Portal from "./pages/Portal.jsx";

// Login pages
import LoginEtudiant from "./pages/login/LoginEtudiant";
import LoginMedecin from "./pages/login/LoginMedecin";
import LoginHopital from "./pages/login/LoginHopital";
import LoginDoyen from "./pages/login/LoginDoyen";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>

      {/* Page d’accueil */}
      <Route path="/" element={<Home />} />

      {/* Page de sélection du rôle */}
      <Route path="/portal" element={<Portal />} />

      {/* LOGIN PAGES */}
      <Route path="/login/etudiant" element={<LoginEtudiant />} />
      <Route path="/login/medecin" element={<LoginMedecin />} />
      <Route path="/login/hopital" element={<LoginHopital />} />
      <Route path="/login/doyen" element={<LoginDoyen />} />
    </Routes>
  </BrowserRouter>
);
