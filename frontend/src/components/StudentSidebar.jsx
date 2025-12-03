import { NavLink } from "react-router-dom";

export default function StudentSidebar() {
  const links = [
    { to: "/student/dashboard", label: "🏠 Tableau de bord" },
    { to: "/student/demande", label: "📄 Demande de stage" },
    { to: "/student/stages", label: "📌 Mes affectations" },
    { to: "/student/rapports", label: "🗂️ Rapports" },
    { to: "/student/chat", label: "💬 Messagerie" },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold mb-10">🎓 Étudiant</h2>

      <nav className="flex flex-col gap-3">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-white text-black font-semibold"
                  : "text-white/80 hover:bg-white/10"
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
