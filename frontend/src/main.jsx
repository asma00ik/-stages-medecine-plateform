// main.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";

import Home from "./pages/Home.jsx";
import Portal from "./pages/Portal.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

import LoginEtudiant from "./pages/login/LoginEtudiant.jsx";
import LoginMedecin from "./pages/login/LoginMedecin.jsx";
import LoginHopital from "./pages/login/LoginHopital.jsx";
import LoginDoyen from "./pages/login/LoginDoyen.jsx";

import StudentLayout from "./layouts/StudentLayout.jsx";
import Dashboard from "./pages/student/Dashboard.jsx";
import Profil from "./pages/student/Profil.jsx";
import Annonces from "./pages/student/Annonces.jsx";
import Postuler from "./pages/student/Postuler.jsx";
import Suivi from "./pages/student/Suivi.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/portal" element={<Portal />} />
      <Route path="/apropos" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* LOGIN */}
      <Route path="/login/etudiant" element={<LoginEtudiant />} />
      <Route path="/login/medecin" element={<LoginMedecin />} />
      <Route path="/login/hopital" element={<LoginHopital />} />
      <Route path="/login/doyen" element={<LoginDoyen />} />

      {/* ETUDIANT */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profil" element={<Profil />} />
        <Route path="annonces" element={<Annonces />} />
        <Route path="postuler" element={<Postuler />} />
        <Route path="suivi" element={<Suivi />} />
      </Route>

    </Routes>
  </BrowserRouter>
);
