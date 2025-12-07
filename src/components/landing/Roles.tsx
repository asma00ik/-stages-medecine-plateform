import { GraduationCap, Building2, Stethoscope, Crown } from "lucide-react";

const roles = [
  {
    icon: GraduationCap,
    title: "Étudiant",
    color: "primary",
    features: [
      "Compléter son profil et ajouter les pièces justificatives",
      "Consulter les annonces de stages disponibles",
      "Postuler aux stages et suivre les candidatures",
      "Consulter les évaluations de fin de stage",
    ],
  },
  {
    icon: Building2,
    title: "Établissement (EPSP, Hôpital)",
    color: "success",
    features: [
      "Publier des annonces de stages",
      "Gérer les services hospitaliers",
      "Consulter et valider les candidatures",
      "Tableau de bord avec statistiques",
    ],
  },
  {
    icon: Stethoscope,
    title: "Chef de Service / Médecin",
    color: "info",
    features: [
      "Consulter les candidatures du service",
      "Accepter ou rejeter les candidatures",
      "Évaluer les étudiants en fin de stage",
      "Suivre les stagiaires actuels",
    ],
  },
  {
    icon: Crown,
    title: "Doyen / Administration",
    color: "warning",
    features: [
      "Créer et gérer tous les comptes utilisateurs",
      "Tableau de bord global de supervision",
      "Statistiques par établissement",
      "Export de rapports pour analyse",
    ],
  },
];

const colorClasses = {
  primary: "bg-primary-light text-primary",
  success: "bg-success-light text-success",
  info: "bg-primary-light text-info",
  warning: "bg-warning-light text-warning",
};

const Roles = () => {
  return (
    <section id="roles" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Utilisateurs
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Une plateforme pour tous les acteurs
          </h2>
          <p className="text-muted-foreground text-lg">
            Chaque utilisateur dispose d'un espace adapté à son rôle avec des 
            fonctionnalités spécifiques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {roles.map((role) => (
            <div
              key={role.title}
              className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[role.color as keyof typeof colorClasses]}`}>
                  <role.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {role.title}
                  </h3>
                </div>
              </div>
              <ul className="space-y-3">
                {role.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roles;
