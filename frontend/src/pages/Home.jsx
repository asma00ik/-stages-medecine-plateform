import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
>>>>>>> ef9ad18c2c4d3b24b09bada37e8289dd8581bfb7

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[radial-gradient(circle_at_top,#241b56,#0e0a2a_60%)]">

    
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[rgba(120,90,255,0.25)] blur-[200px] rounded-full"></div>

     
    <header className="z-50 w-full py-4 px-12 flex items-center justify-between">
      {/* --- SECOND ROW FOR THE LOGO (CENTER OR LEFT) --- */}
        <div className="flex items-center h-16">
          <img
            src="/logo.svg"
            alt="logo"
            className="h-24 w-auto object-contain pt-4"
          />
        </div>
      {/* --- TOP NAV ONLY FOR LINKS --- */}
        <nav className="flex items-center space-x-12 text-lg font-medium">
<<<<<<< HEAD
            <Link to="/" className="text-[#d7d7ff] hover:text-white transition">Accueil</Link>
            <Link to="/apropos" className="text-[#d7d7ff] hover:text-white transition">À propos</Link>
            <Link to="/contact" className="text-[#d7d7ff] hover:text-white transition">Contact</Link>
=======
          <a href="#" className="text-[#d7d7ff] hover:text-white transition">Accueil</a>
          <a href="#" className="text-[#d7d7ff] hover:text-white transition">À propos</a>
          <a href="#" className="text-[#d7d7ff] hover:text-white transition">Contact</a>
>>>>>>> ef9ad18c2c4d3b24b09bada37e8289dd8581bfb7
        </nav>

    </header>



    
      <main className="z-10 mt-24 text-center px-6">
        <h1 className="text-white text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Plateforme Nationale <span className="text-[#9b84ff]">de Gestion des Stages medicales</span>
        </h1>

        <p className="max-w-2xl mx-auto text-[20px] text-[#e2e2ff] opacity-85 leading-relaxed mb-10">
          Une solution moderne permettant aux étudiants, médecins, hôpitaux et
          administrations d’accéder facilement à leurs espaces dédiés.
        </p>

        <button
          onClick={() => navigate("/portal")}
          className="bg-linear-to-r from-[#7f5bff] to-[#5744f7] px-10 py-4 text-white text-xl font-semibold rounded-xl shadow-[0_8px_24px_rgba(85,60,255,0.4)] transition-transform hover:scale-105 hover:shadow-[0_10px_28px_rgba(85,60,255,0.55)]"
        >
          Commencer l’application
        </button>
      </main>

      {/* FOOTER */}
      <footer className="z-10 mt-auto py-6 text-center text-sm text-[#bcbcff] opacity-70">
        © 2025 StageLink – Ministère de l'Enseignement Supérieur
      </footer>

    </div>
  );
}
