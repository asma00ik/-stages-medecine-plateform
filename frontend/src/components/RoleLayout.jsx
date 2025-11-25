// src/components/RoleLayout.jsx
import React from "react";

/**
 * RoleLayout
 * Props:
 *  - title: string (titre de la page, Exemple "Espace Étudiant")
 *  - account: {name, email, role, extra} (infos affichées dans le carré)
 *  - features: array of {id, label} (éléments de la sidebar)
 *  - sidebarPosition: "left" | "right" (optionnel, default "left")
 */
export default function RoleLayout({ title, account, features, sidebarPosition = "left", children }) {
  const accent = "bg-gradient-to-br from-[#7f5bff] to-[#5744f7]"; // couleur du site
  const sidebar = (
    <aside className="w-72 p-6 bg-white/80 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Fonctionnalités</h3>
      <ul className="space-y-3 text-sm text-gray-700">
        {features.map((f) => (
          <li key={f.id} className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer">
            {f.label}
          </li>
        ))}
      </ul>
    </aside>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4">
      {/* Header simple */}
      <header className="w-full max-w-7xl flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <img src="/logo.svg" alt="logo" className="h-14 w-auto" />
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </div>
      </header>

      {/* Main container */}
      <div className="w-full max-w-7xl flex gap-8">
        {sidebarPosition === "left" && sidebar}

        {/* Card central */}
        <main className={`flex-1 ${accent} rounded-2xl p-8 shadow-lg text-white`}>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
            {/* Account Card (carré coloré clair à l'intérieur) */}
            <div className="w-full md:w-1/3 bg-white/20 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold">{account.name}</h2>
                <p className="text-sm mt-1">{account.role}</p>
                <p className="text-sm mt-2 opacity-90">{account.email}</p>
                {account.extra && (
                  <p className="text-sm mt-2 opacity-90">{account.extra}</p>
                )}
              </div>

              <div className="mt-6">
                <button className="w-full bg-white/90 text-[#3b2ea6] font-semibold py-2 rounded-md">
                  Modifier le profil
                </button>
              </div>
            </div>

            {/* Zone d'affichage principale */}
            <div className="w-full md:w-2/3 bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              {/* Contenu propre au rôle */}
              {children}
            </div>
          </div>
        </main>

        {sidebarPosition === "right" && sidebar}
      </div>

      {/* Footer */}
      <footer className="w-full max-w-7xl text-center text-sm text-gray-500 mt-10">
        © 2025 StageLink – Ministère de l'Enseignement Supérieur
      </footer>
    </div>
  );
}
