// src/pages/hopital/Hopital.jsx
import React from "react";
import RoleLayout from "../../components/RoleLayout";

export default function Hopital() {
  const account = {
    name: "Direction Hôpital X",
    email: "direction@hopital.dz",
    role: "Établissement / EPSP",
    extra: "Code: HSP1654",
  };

  const features = [
    { id: 1, label: "Réeption du compte" },
    { id: 2, label: "Authentification" },
    { id: 3, label: "Gestion des services hospitaliers" },
    { id: 4, label: "Publier une annonce" },
    { id: 5, label: "Modifier / supprimer annonce" },
    { id: 6, label: "Consulter / valider candidatures" },
    { id: 7, label: "Tableau de bord de suivi" },
  ];

  return (
    <RoleLayout title="Espace Hôpital" account={account} features={features} sidebarPosition="left">
      <div>
        <h3 className="text-2xl font-semibold mb-4">Phase 1 — Configuration & Accès</h3>
        <ul className="list-disc list-inside text-white/95 space-y-2 mb-6">
          <li>Réception du compte <span className="font-medium">(Priorité: Haute)</span></li>
          <li>Authentification (connexion) <span className="font-medium">(Priorité: Haute)</span></li>
          <li>Gestion des services hospitaliers <span className="font-medium">(Priorité: Moyenne)</span></li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4">Phase 2 — Gestion des Offres & Candidatures</h3>
        <ul className="list-disc list-inside text-white/95 space-y-2 mb-6">
          <li>Publication d’annonces de stage <span className="font-medium">(Priorité: Haute)</span></li>
          <li>Modification / suppression d’annonces <span className="font-medium">(Priorité: Moyenne)</span></li>
          <li>Consultation et validation des candidatures <span className="font-medium">(Priorité: Haute)</span></li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4">Phase 3 — Supervision & Reporting</h3>
        <ul className="list-disc list-inside text-white/95 space-y-2">
          <li>Tableau de bord de suivi <span className="font-medium">(Priorité: Moyenne)</span></li>
        </ul>
      </div>
    </RoleLayout>
  );
}
