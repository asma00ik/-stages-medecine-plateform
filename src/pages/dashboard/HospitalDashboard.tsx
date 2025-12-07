import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  FileText, 
  TrendingUp,
  ArrowRight,
  Plus,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

const HospitalDashboard = () => {
  const stats = [
    { label: "Services actifs", value: 8, icon: Building2, color: "primary" },
    { label: "Stagiaires actuels", value: 24, icon: Users, color: "success" },
    { label: "Candidatures reçues", value: 45, icon: FileText, color: "warning" },
    { label: "Taux d'acceptation", value: "68%", icon: TrendingUp, color: "info" },
  ];

  const services = [
    { name: "Chirurgie Générale", interns: 5, capacity: 6 },
    { name: "Pédiatrie", interns: 4, capacity: 5 },
    { name: "Gynécologie", interns: 3, capacity: 4 },
    { name: "Médecine Interne", interns: 6, capacity: 8 },
  ];

  const pendingApplications = [
    { id: 1, student: "Ahmed Benali", service: "Chirurgie", date: "2024-01-15" },
    { id: 2, student: "Fatima Zohra", service: "Pédiatrie", date: "2024-01-14" },
    { id: 3, student: "Karim Hadj", service: "Médecine Interne", date: "2024-01-13" },
  ];

  return (
    <DashboardLayout role="hospital">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              CHU Mustapha Pacha
            </h1>
            <p className="text-muted-foreground mt-1">
              Tableau de bord de l'établissement
            </p>
          </div>
          <Button variant="hero" asChild>
            <Link to="/dashboard/hospital/announcements/new">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle annonce
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
          {/* Services Overview */}
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Aperçu des services</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/hospital/services">
                  Gérer
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {services.map((service) => (
                <div key={service.name} className="p-3 rounded-xl bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">{service.name}</p>
                    <Badge variant="outline">
                      {service.interns}/{service.capacity}
                    </Badge>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full gradient-primary rounded-full transition-all"
                      style={{ width: `${(service.interns / service.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pending Applications */}
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Candidatures en attente</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/hospital/applications">
                  Voir tout
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <div>
                    <p className="font-medium text-foreground">{app.student}</p>
                    <p className="text-sm text-muted-foreground">{app.service}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{app.date}</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">
                Traiter les candidatures
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HospitalDashboard;
