import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="contact" className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
            <span className="text-xl font-semibold text-foreground">
              Stage<span className="text-primary">Link</span>
            </span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              Plateforme de gestion des stages hospitaliers pour les étudiants 
              en médecine. Simplifiez vos démarches administratives.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                  Fonctionnalités
                </a>
              </li>
              <li>
                <a href="#roles" className="text-muted-foreground hover:text-primary transition-colors">
                  Utilisateurs
                </a>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Connexion
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>stagelink35@gmail.com</li>
              <li>+213 675244074</li>
              <li>Boumerdes, Algérie</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} StageLink. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
