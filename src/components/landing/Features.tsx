import { 
  FileText, 
  Search, 
  CheckCircle, 
  BarChart3, 
  Shield, 
  Bell 
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Gestion des candidatures",
    description: "Postulez aux stages disponibles et suivez l'état de vos candidatures en temps réel.",
  },
  {
    icon: Search,
    title: "Annonces de stages",
    description: "Consultez les offres de stages publiées par les établissements hospitaliers.",
  },
  {
    icon: CheckCircle,
    title: "Évaluations",
    description: "Recevez des évaluations détaillées à la fin de chaque stage par les médecins.",
  },
  {
    icon: BarChart3,
    title: "Tableaux de bord",
    description: "Visualisez les statistiques et suivez votre progression académique.",
  },
  {
    icon: Shield,
    title: "Sécurité renforcée",
    description: "Comptes sécurisés créés par l'administration avec gestion des rôles.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Restez informé des nouvelles annonces et des mises à jour de vos candidatures.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Fonctionnalités
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-muted-foreground text-lg">
            Une plateforme complète pour gérer efficacement les stages hospitaliers 
            des étudiants en médecine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
