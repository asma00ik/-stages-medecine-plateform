import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Briefcase,
  ClipboardList,
  PenSquare,
  LogOut,
  Bell
} from "lucide-react";
import { useState } from "react";

export default function StudentLayout() {
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login/etudiant");
  };

  return (
    <div className="flex">

      {/* ======= SIDEBAR ======= */}
      <aside
        className="fixed top-0 left-0 h-screen w-72
        bg-gradient-to-b from-[#0b0123] to-[#3417b8]
        text-gray-200 flex flex-col items-center pt-10 shadow-xl z-50"
      >
        {/* LOGO */}
        <img
          src="/logo.svg"
          alt="logo"
          className="w-24 h-24 object-contain mb-10 hover:scale-105 transition"
        />

        {/* MENU */}
        <nav className="flex flex-col gap-2 w-full px-6">
          <SidebarItem to="/student/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem to="/student/profil" icon={User} label="Profil" />
          <SidebarItem to="/student/annonces" icon={Briefcase} label="Annonces" />
          <SidebarItem to="/student/postuler" icon={PenSquare} label="Postuler" />
          <SidebarItem to="/student/suivi" icon={ClipboardList} label="Suivi" />
        </nav>

        {/* DECONNEXION */}
        <button
          onClick={logout}
          className="mt-auto mb-6 w-[80%] py-3 flex items-center justify-center gap-3 
          text-gray-300 hover:text-white
          bg-white/5 hover:bg-white/10 
          rounded-xl transition duration-300 backdrop-blur-sm"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </aside>

      {/* ======== MAIN CONTENT ======== */}
      <main className="ml-72 flex-1 bg-gray-50 min-h-screen">

        {/* NAVBAR DROITE MODERNE */}
        <header className="h-16 px-8 flex items-center justify-between
          bg-white shadow-md border-b border-gray-200 sticky top-0 z-40">

          {/* LEFT: Vide ou breadcrumb */}
          <div></div>

          {/* RIGHT: Notifications + Profil */}
          <div className="flex items-center gap-4">

            {/* NOTIFICATIONS */}
            <div className="relative">
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                onClick={() => setNotifOpen(!notifOpen)}
              >
                <Bell size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white 
                  text-xs px-1 rounded-full">
                  3
                </span>
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden z-50">
                  <div className="p-3 text-gray-700 text-sm">Pas de nouvelles notifications</div>
                </div>
              )}
            </div>

            {/* PROFIL UTILISATEUR */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition"
              >
                <img
                  src="/avatar.png"
                  className="w-9 h-9 rounded-full border border-gray-300"
                />
                <span className="text-gray-700 font-semibold text-sm hidden md:inline">
                  Étudiant
                </span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden z-50">
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* CONTENT */}
        <div className="p-10 pb-24">
          <Outlet />
        </div>

        {/* FOOTER */}
        <footer className="fixed bottom-0 left-72 right-0 
          bg-gray-50 border-t shadow-inner text-center 
          text-gray-400 text-sm py-3">
          © 2025-StageLink
        </footer>

      </main>
    </div>
  );
}

/* ====== Composant Sidebar ====== */
const SidebarItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `
      group flex items-center gap-3 px-4 py-3 rounded-lg select-none
      font-medium text-[15px] transition-all duration-200
      ${isActive
        ? "bg-white/20 text-white shadow-md"
        : "text-gray-300 hover:bg-white/10 hover:text-white"}`
    }
  >
    <div
      className="p-2 rounded-md transition-all duration-200
      group-hover:scale-125 group-hover:bg-white/20"
    >
      <Icon size={18} />
    </div>
    {label}
  </NavLink>
);
