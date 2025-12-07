import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Users, ClipboardCheck } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen gradient-hero pt-24 pb-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-primary text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Plateforme officielle de gestion des stages
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up opacity-0 stagger-1">
            Gérez vos stages hospitaliers{" "}
            <span className="text-primary">en toute simplicité</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up opacity-0 stagger-2">
            Une solution complète pour digitaliser et centraliser la gestion des stages 
            des étudiants en médecine. Candidatures, suivis et évaluations au même endroit.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up opacity-0 stagger-3">
            <Button variant="hero" size="xl" asChild>
              <Link to="/login">
                Commencer maintenant
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="#features">Découvrir les fonctionnalités</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-slide-up opacity-0 stagger-4">
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50">
              <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">500+</div>
              <div className="text-muted-foreground">Étudiants inscrits</div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50">
              <div className="w-12 h-12 rounded-xl bg-success-light flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-success" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">25+</div>
              <div className="text-muted-foreground">Établissements partenaires</div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50">
              <div className="w-12 h-12 rounded-xl bg-warning-light flex items-center justify-center mx-auto mb-4">
                <ClipboardCheck className="w-6 h-6 text-warning" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">98%</div>
              <div className="text-muted-foreground">Taux de satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
