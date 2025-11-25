// src/pages/etudiant/Etudiant.jsx
import React from "react";
import RoleLayout from "../../components/RoleLayout";

export default function Etudiant() {
  const account = {
    name: "Nom Étudiant",
    email: "etudiant@univ.dz",
    role: "Étudiant — 3e année",
    extra: "Matricule: 225489632",
  };

  const features = [
    { id: 1, label: "Réception du compte" },
    { id: 2, label: "Authentification" },
    { id: 3, label: "Compléter le profil" },
    { id: 4, label: "Ajouter pièces justificatives" },
    { id: 5, label: "Consulter les annonces" },
    { id: 6, label: "Postuler à un stage" },
    { id: 7, label: "Suivi des candidatures" },
    { id: 8, label: "Consulter évaluations" },
  ];

  return (
    <RoleLayout title="Espace Étudiant" account={account} features={features} sidebarPosition="left">
      {/* Contenu détaillé à droite du carré */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Phase 1 — Activation & Configuration</h3>
        <ul className="list-disc list-inside text-white/95 space-y-2 mb-6">
          <li>Réception du compte <span className="font-medium">(Priorité: Haute)</span></li>
          <li>Authentification (connexion) <span className="font-medium">(Priorité: Haute)</span></li>
          <li>Complétion du profil <span className="font-medium">(Priorité: Moyenne)</span></li>
          <li>Ajout de pièces justificatives <span className="font-medium">(Priorité: Moyenne)</span></li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4">Phase 2 — Recherche et Candidature</h3>
        <ul className="list-disc list-inside text-white/95 space-y-2 mb-6">
          <li>Consultation des annonces <span className="font-medium">(Priorité: Moyenne)</span></li>
          <li>Postulation aux stages <span className="font-medium">(Priorité: Haute)</span></li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4">Phase 3 — Suivi et Bilan</h3>
        <ul className="list-disc list-inside text-white/95 space-y-2">
          <li>Suivi des candidatures <span className="font-medium">(Priorité: Moyenne)</span></li>
          <li>Consultation des évaluations <span className="font-medium">(Priorité: Moyenne)</span></li>
        </ul>
      </div>
    </RoleLayout>
  );
}
