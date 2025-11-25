// src/pages/medecin/Medecin.jsx
import React from "react";
import RoleLayout from "../../components/RoleLayout";

export default function Medecin() {
  const account = {
    name: "Dr. Nom Prénom",
    email: "prenom.nom@hopital.dz",
    role: "Médecin / Chef de service",
    extra: "Service : Cardiologie",
  };

  const features = [
    { id: 1, label: "Réception du compte" },
    { id: 2, label: "Authentification" },
    { id: 3, label: "Consulter candidatures" },
    { id: 4, label: "Valider / rejeter candidature" },
    { id: 5, label: "Évaluer étudiants" },
  ];

  return (
    <RoleLayout title="Espace Médecin" account={account} features={features} sidebarPosition="left">
      <div>
        <h3 className="text-2xl font-semibold mb-4">Phase 1 — Accès à la Plateforme</h3>
        <ul className="list-disc list-inside text-white/95 space-y-2 mb-6">
          <li>Réception du compte <span className="font-medium">(Priorité: Haute)</span></li>
          <li>Authentification (connexion) <span className="font-medium">(Priorité: Haute)</span></li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4">Phase 2 — Gestion des Candidatures</h3>
        <ul className="list-disc list-inside text-white/95 space-y-2 mb-6">
          <li>Consultation des candidatures <span className="font-medium">(Priorité: Haute)</span></li>
          <li>Validation / rejet des candidatures <span className="font-medium">(Priorité: Moyenne)</span></li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4">Phase 3 — Bilan du Stage</h3>
        <ul className="list-disc list-inside text-white/95 space-y-2">
          <li>Évaluation des étudiants <span className="font-medium">(Priorité: Moyenne)</span></li>
        </ul>
      </div>
    </RoleLayout>
  );
}
