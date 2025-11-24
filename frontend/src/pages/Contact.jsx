import { Link } from "react-router-dom";
import React from "react";
import { FiMail, FiPhone } from "react-icons/fi";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function Contact() {
  return (
    
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#241b56,#0e0a2a_60%)] text-white flex flex-col items-center">
                
        {/* Effet de fond similaire au Home */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[rgba(120,90,255,0.25)] blur-[200px] rounded-full"></div>

      {/* Header / Navbar */}
      <header className="z-50 w-full py-4 px-12 flex items-center justify-between">
        <div className="flex items-center h-16">
          <img
            src="/logo.svg"
            alt="logo"
            className="h-24 w-auto object-contain pt-4"
          />
        </div>
        <nav className="flex items-center space-x-12 text-lg font-medium">
          <Link to="/" className="text-[#d7d7ff] hover:text-white transition">Accueil</Link>
          <Link to="/apropos" className="text-[#d7d7ff] hover:text-white transition">À propos</Link>
          <Link to="/contact" className="text-[#d7d7ff] hover:text-white transition">Contact</Link>
        </nav>
      </header>
        {/* ---- CARRÉ BLANC ---- */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-15 max-w-5xl text-center shadow-xl">
      <h1 className="text-5xl md:text-6xl font-bold mb-8 text-center text-[#9b84ff]">
        Contactez-nous
      </h1>

<div className="mt-12 space-y-8 max-w-md w-full text-[#d7d7ff]">

  <div className="flex items-center space-x-6 text-xl">
    <FiMail className="text-3xl text-[#9b84ff]" />
    <span className="text-xl">stagelink35@gmail.com</span>
  </div>

  <div className="flex items-center space-x-6 text-xl">
    <FiPhone className="text-3xl text-[#9b84ff]" />
    <span className="text-xl">0675244074</span>
  </div>

  <div className="flex items-center space-x-6 text-xl">
    <FaInstagram className="text-3xl text-[#9b84ff]" />
    <a
      href="https://www.instagram.com/stagelink35?igsh=MTBqbjg0c2l3dnVwMQ=="
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition text-xl"
    >
      Instagram
    </a>
  </div>

  <div className="flex items-center space-x-6 text-xl">
    <FaFacebook className="text-3xl text-[#9b84ff]" />
    <a
      href="https://www.facebook.com/profile.php?id=61584053316185"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition text-xl"
    >
      Facebook
    </a>
  </div>
</div>
</div>


     

      {/* Footer */}
      <footer className="z-10 mt-auto py-6 text-center text-sm text-[#bcbcff] opacity-70">
        © 2025 StageLink – Ministère de l'Enseignement Supérieur
      </footer>

    </div>
  );
}
