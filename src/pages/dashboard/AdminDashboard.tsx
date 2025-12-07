import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Building2, 
  GraduationCap,
  Stethoscope,
  ArrowRight,
  Plus,
  TrendingUp,
  UserPlus
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const stats = [
    { label: "Total étudiants", value: 524, icon: GraduationCap, color: "primary" },
    { label: "Établissements", value: 28, icon: Building2, color: "success" },
    { label: "Médecins", value: 156, icon: Stethoscope, color: "info" },
    { label: "En stage actif", value: 312, icon: Users, color: "warning" },
  ];

  const recentUsers = [
    { id: 1, name: "Ahmed Benali", type: "Étudiant", date: "2024-01-15" },
    { id: 2, name: "CHU Bab El Oued", type: "Établissement", date: "2024-01-14" },
    { id: 3, name: "Dr. Fatima Cherif", type: "Médecin", date: "2024-01-13" },
    { id: 4, name: "Sara Mekhloufi", type: "Étudiant", date: "2024-01-12" },
  ];

  const hospitalStats = [
    { name: "CHU Mustapha Pacha", students: 45, services: 12 },
    { name: "CHU Bab El Oued", students: 38, services: 10 },
    { name: "EHS Canastel", students: 32, services: 8 },
    { name: "EPSP Bir El Djir", students: 25, services: 6 },
  ];

  const typeColors = {
    Étudiant: "primary",
    Établissement: "success",
    Médecin: "info",
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Administration Centrale
            </h1>
            <p className="text-muted-foreground mt-1">
              Gestion globale de la plateforme
            </p>
          </div>
          <Button variant="hero" asChild>
            <Link to="/dashboard/admin/users/new">
              <UserPlus className="w-4 h-4 mr-2" />
              Créer un compte
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${stat.color}-light`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Comptes récents</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/admin/users">
                  Gérer
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.date}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`text-${typeColors[user.type as keyof typeof typeColors]}`}>
                    {user.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Hospital Stats */}
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Répartition par établissement</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/admin/stats">
                  Statistiques
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {hospitalStats.map((hospital) => (
                <div key={hospital.name} className="p-3 rounded-xl bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground text-sm">{hospital.name}</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-success" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-3 h-3" />
                      {hospital.students} étudiants
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {hospital.services} services
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Actions rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/dashboard/admin/users/new">
                  <UserPlus className="w-5 h-5" />
                  <span className="text-xs">Créer un compte</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/dashboard/admin/hospitals/new">
                  <Building2 className="w-5 h-5" />
                  <span className="text-xs">Ajouter établissement</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/dashboard/admin/stats">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-xs">Voir statistiques</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/dashboard/admin/settings">
                  <Plus className="w-5 h-5" />
                  <span className="text-xs">Exporter données</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
