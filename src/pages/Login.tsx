import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, Building2, Stethoscope, Crown, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type UserRole = "student" | "hospital" | "doctor" | "admin";

const roles = [
  { id: "student" as UserRole, label: "Étudiant", icon: GraduationCap, color: "primary" },
  { id: "hospital" as UserRole, label: "Établissement", icon: Building2, color: "success" },
  { id: "doctor" as UserRole, label: "Médecin", icon: Stethoscope, color: "info" },
  { id: "admin" as UserRole, label: "Administration", icon: Crown, color: "warning" },
];

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login - will be replaced with actual auth
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Connexion en cours...",
        description: "Veuillez patienter pendant la vérification.",
      });
      
      // Navigate to appropriate dashboard based on role
      const dashboardRoutes: Record<UserRole, string> = {
        student: "/dashboard/student",
        hospital: "/dashboard/hospital",
        doctor: "/dashboard/doctor",
        admin: "/dashboard/admin",
      };
      navigate(dashboardRoutes[selectedRole]);
    }, 1000);
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 text-primary-foreground" />
              </div>
            <span className="text-2xl font-bold text-foreground">
              Stage<span className="text-primary">Link</span>
            </span>
            </Link>
            <p className="text-muted-foreground">
              Connectez-vous à votre espace
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-card rounded-2xl shadow-xl border border-border/50 p-6">
            {/* Role Selection */}
            <div className="mb-6">
              <Label className="text-sm font-medium text-foreground mb-3 block">
                Sélectionnez votre profil
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                      selectedRole === role.id
                        ? "border-primary bg-primary-light"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }`}
                  >
                    <role.icon className={`w-5 h-5 ${
                      selectedRole === role.id ? "text-primary" : "text-muted-foreground"
                    }`} />
                    <span className={`text-sm font-medium ${
                      selectedRole === role.id ? "text-primary" : "text-foreground"
                    }`}>
                      {role.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Identifiant / Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre.email@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button type="button" className="text-sm text-primary hover:underline">
                  Mot de passe oublié ?
                </button>
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>

            {/* Info */}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Les comptes sont créés par l'administration.
              <br />
              Contactez votre établissement si vous n'avez pas d'accès.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
