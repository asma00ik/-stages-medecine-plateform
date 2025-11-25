// src/pages/doyen/Doyen.jsx
import React from "react";
import RoleLayout from "../../components/RoleLayout";

export default function Doyen() {
  const account = {
    name: "Doyen / Admin",
    email: "doyen@univ.dz",
    role: "Administration Centrale",
    extra: "Superviseur global",
  };

  const features = [
    { id: 1, label: "Créer / gérer comptes" },
    { id: 2, label: "Gestion des rôles & accès" },
    { id: 3, label: "Tableau de bord global" },
    { id: 4, label: "Consulter statistiques" },
    { id: 5, label: "Exporter rapports" },
  ];

  return (
    <RoleLayout title="Espace Doyen / Admin" account={account} features={features} sidebarPosition="left">
      <div>
        <h3 className="text-2xl font-semibold mb-4">Pilier 1 — Administration & Sécurité</h3>
        <ul className="list-disc list-inside text-white/95 space-y-2 mb-6">
          <li>Création et gestion des comptes utilisateurs <span className="font-medium">(Priorité: Haute)</span></li>
          <li>Gestion des rôles et accès <span className="font-medium">(Priorité: Haute)</span></li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4">Pilier 2 — Supervision et Reporting</h3>
        <ul className="list-disc list-inside text-white/95 space-y-2">
          <li>Tableau de bord global <span className="font-medium">(Priorité: Moyenne)</span></li>
          <li>Consultation des statistiques <span className="font-medium">(Priorité: Moyenne)</span></li>
          <li>Exportation de rapports <span className="font-medium">(Priorité: Moyenne)</span></li>
        </ul>
      </div>
    </RoleLayout>
  );
}
