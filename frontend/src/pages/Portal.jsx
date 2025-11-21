import { useNavigate } from "react-router-dom";

export default function Portal() {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Étudiant",
      icon: "/icons/student.svg",
      path: "/login/etudiant",
    },
    {
      title: "Médecin / Encadrant",
      icon: "/icons/doctor.svg",
      path: "/login/medecin",
    },
    {
      title: "Hôpital",
      icon: "/icons/hospital.svg",
      path: "/login/hopital",
    },
    {
      title: "Doyen / Administration",
      icon: "/icons/dean.svg",
      path: "/login/doyen",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-[radial-gradient(circle_at_top,#241b56,#0e0a2a_65%)] overflow-hidden">

      {/* Halo lumineux */}
      <div className="absolute top-[-260px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[rgba(120,90,255,0.25)] blur-[220px] rounded-full"></div>

      {/* Navbar */}
      <header className="z-10 flex justify-between items-center text-white px-16 py-8 text-lg">
        <div className="text-3xl font-bold tracking-wide">STAGE LINK</div>

        <nav className="space-x-8">
          <a href="/" className="text-[#d7d7ff] hover:text-white transition">Accueil</a>
          <a href="#" className="text-[#d7d7ff] hover:text-white transition">À propos</a>
          <a href="#" className="text-[#d7d7ff] hover:text-white transition">Contact</a>
        </nav>
      </header>

      {/* Content */}
      <main className="z-10 flex flex-col items-center text-center mt-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-14 tracking-wide drop-shadow-[0_4px_25px_rgba(130,110,255,0.4)] text-white">
          Sélectionnez votre rôle
        </h1>

        <div className="flex justify-center gap-10 w-full px-6 max-w-6xl">
          {roles.map((role) => (
            <div
              key={role.title}
              onClick={() => navigate(role.path)}
              className="
               bg-white/5 backdrop-blur-xl border border-white/20
               rounded-2xl px-10 py-12 w-60 h-60
               flex flex-col items-center justify-center
               shadow-[0_0_18px_rgba(80,60,255,0.25)]
               hover:shadow-[0_0_38px_rgba(150,120,255,0.45)]
               hover:-translate-y-3 transition-all duration-300
               cursor-pointer
              "
            >
              <img src={role.icon} alt="" className="w-[75px] h-[75px] mb-4" />
              <p className="text-lg font-semibold text-[#e6e0ff] whitespace-nowrap">{role.title}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="z-10 mt-auto py-6 text-center text-sm text-[#bcbcff] opacity-70">
        © 2025 StageLink – Ministère de l'Enseignement Supérieur
      </footer>
    </div>
  );
}
