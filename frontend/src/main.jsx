<<<<<<< HEAD
// main.jsx
=======
>>>>>>> ef9ad18c2c4d3b24b09bada37e8289dd8581bfb7
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

<<<<<<< HEAD
// HOME & PORTAL
import Home from "./pages/Home.jsx";
import Portal from "./pages/Portal.jsx";

// LOGIN PAGES
import LoginEtudiant from "./pages/login/LoginEtudiant.jsx";
import LoginMedecin from "./pages/login/LoginMedecin.jsx";
import LoginHopital from "./pages/login/LoginHopital.jsx";
import LoginDoyen from "./pages/login/LoginDoyen.jsx";

// NEW PAGES
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

// ESPACES RÔLES
import Etudiant from "./pages/etudiant/Etudiant.jsx";
import Medecin from "./pages/medecin/Medecin.jsx";
import Hopital from "./pages/hopital/Hopital.jsx";
import Doyen from "./pages/doyen/Doyen.jsx";
=======
import Home from "./pages/Home.jsx";
import Portal from "./pages/Portal.jsx";

// Login pages
import LoginEtudiant from "./pages/login/LoginEtudiant";
import LoginMedecin from "./pages/login/LoginMedecin";
import LoginHopital from "./pages/login/LoginHopital";
import LoginDoyen from "./pages/login/LoginDoyen";

>>>>>>> ef9ad18c2c4d3b24b09bada37e8289dd8581bfb7

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>

      {/* Page d’accueil */}
      <Route path="/" element={<Home />} />

<<<<<<< HEAD
      {/* Page À propos */}
      <Route path="/apropos" element={<About />} />

      {/* Page Contact */}
      <Route path="/contact" element={<Contact />} />

=======
>>>>>>> ef9ad18c2c4d3b24b09bada37e8289dd8581bfb7
      {/* Page de sélection du rôle */}
      <Route path="/portal" element={<Portal />} />

      {/* LOGIN PAGES */}
      <Route path="/login/etudiant" element={<LoginEtudiant />} />
      <Route path="/login/medecin" element={<LoginMedecin />} />
      <Route path="/login/hopital" element={<LoginHopital />} />
      <Route path="/login/doyen" element={<LoginDoyen />} />
<<<<<<< HEAD

      {/* ESPACES RÔLES */}
      <Route path="/etudiant" element={<Etudiant />} />
      <Route path="/medecin" element={<Medecin />} />
      <Route path="/hopital" element={<Hopital />} />
      <Route path="/doyen" element={<Doyen />} />

=======
>>>>>>> ef9ad18c2c4d3b24b09bada37e8289dd8581bfb7
    </Routes>
  </BrowserRouter>
);
