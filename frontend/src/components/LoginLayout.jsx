import { useNavigate } from "react-router-dom";

export default function LoginLayout({ title, children }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center relative 
      bg-[radial-gradient(circle_at_top,#2e2570,#0e0a2a_70%)]">

      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] 
        bg-[rgba(150,130,255,0.25)] blur-[220px] rounded-full pointer-events-none"></div>

      <div className="absolute top-0 left-0 w-full
          bg-white/10 backdrop-blur-xl border-b border-white/10
          py-4 px-8 flex items-center">

        <button
          onClick={() => navigate("/portal")}
          className="flex items-center gap-2 text-white font-medium hover:opacity-90 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
               fill="none" stroke="currentColor" strokeWidth="2"
               viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Retour au portail
        </button>
      </div>

      <div className="
        relative z-10 w-full max-w-md 
        bg-white/90 backdrop-blur-xl
        border border-white/30 shadow-[0_8px_40px_rgba(0,0,0,0.25)]
        rounded-2xl p-10 animate-fadeIn mt-20">

        <h2 className="text-3xl font-extrabold text-center mb-2 text-gray-900 tracking-tight">
          {title}
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Accédez à votre espace sécurisé
        </p>

        {children}
      </div>
    </div>
  );
}
