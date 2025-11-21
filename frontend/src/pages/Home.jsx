import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[radial-gradient(circle_at_top,#241b56,#0e0a2a_60%)]">

    
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[rgba(120,90,255,0.25)] blur-[200px] rounded-full"></div>

     
      <header className="z-10 flex justify-between items-center text-white px-16 py-8 text-lg">
        <div className="text-3xl font-bold tracking-wide">STAGE LINK</div>

        <nav className="space-x-8">
          <a href="#" className="text-[#d7d7ff] hover:text-white transition">Accueil</a>
          <a href="#" className="text-[#d7d7ff] hover:text-white transition">À propos</a>
          <a href="#" className="text-[#d7d7ff] hover:text-white transition">Contact</a>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="z-10 mt-24 text-center px-6">
        <h1 className="text-white text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Plateforme Nationale <span className="text-[#9b84ff]">de Gestion des Stages</span>
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
