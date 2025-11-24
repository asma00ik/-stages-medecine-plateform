import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[radial-gradient(circle_at_top,#241b56,#0e0a2a_60%)] text-white">

      {/* Effet de fond */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[rgba(120,90,255,0.25)] blur-[200px] rounded-full"></div>

      {/* Header */}
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

      {/* Main */}
      <main className="z-10 mt-20 px-6 flex justify-center">
        
        {/* ---- CARRÉ BLANC ---- */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-10 max-w-3xl text-center shadow-xl">

          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-[#9b84ff]">
            Bienvenue sur notre plateforme
          </h1>

          <p className="text-lg md:text-xl text-[#e2e2ff] leading-relaxed mb-6">
            Cette plateforme est dédiée aux stages en médecine et conçue pour simplifier
            l’accès et la gestion des expériences pratiques pour les étudiants.
          </p>

          <p className="text-lg md:text-xl text-[#e2e2ff] leading-relaxed mb-6">
            Le site met en relation les principaux acteurs du parcours de formation médicale :
          </p>

          <ul className="list-disc list-inside text-left max-w-2xl mx-auto text-[#d7d7ff] mb-8 space-y-3">
            <li><strong className="text-[#9b84ff]">Étudiants en médecine :</strong> consulter les stages disponibles et postuler en ligne.</li>
            <li><strong className="text-[#9b84ff]">Médecins :</strong> encadrer et superviser les stagiaires.</li>
            <li><strong className="text-[#9b84ff]">Doyen de la faculté :</strong> coordination et validation des stages.</li>
            <li><strong className="text-[#9b84ff]">Chef de service de l’hôpital :</strong> gestion des affectations et qualité de l’encadrement.</li>
          </ul>

          <p className="text-lg md:text-xl text-[#e2e2ff] leading-relaxed">
            Notre objectif est de créer un espace interactif, transparent et pratique, où chaque acteur
            peut gérer ses responsabilités efficacement tout en améliorant l’expérience des étudiants.
          </p>

        </div>
      </main>

      {/* Footer */}
      <footer className="z-10 mt-auto py-6 text-center text-sm text-[#bcbcff] opacity-70">
        © 2025 StageLink – Ministère de l'Enseignement Supérieur
      </footer>

    </div>
  );
}
