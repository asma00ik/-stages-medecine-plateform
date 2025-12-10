import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowRight,
  Briefcase,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  // Mock data
  const stats = [
    { label: "Candidatures envoyées", value: 5, icon: FileText, color: "primary" },
    { label: "En attente", value: 3, icon: Clock, color: "warning" },
    { label: "Acceptées", value: 1, icon: CheckCircle, color: "success" },
    { label: "Refusées", value: 1, icon: XCircle, color: "destructive" },
  ];

  const recentApplications = [
    { id: 1, title: "Stage Chirurgie Générale", hospital: "CHU Mustapha", status: "pending", date: "2024-01-15" },
    { id: 2, title: "Stage Pédiatrie", hospital: "EHS Canastel", status: "accepted", date: "2024-01-10" },
    { id: 3, title: "Stage Gynécologie", hospital: "EPSP Bir El Djir", status: "rejected", date: "2024-01-05" },
  ];

  const availableInternships = [
    { id: 1, title: "Stage Médecine Interne", hospital: "CHU Oran", places: 3, duration: "3 mois" },
    { id: 2, title: "Stage Cardiologie", hospital: "CHU Constantine", places: 2, duration: "2 mois" },
  ];

  const statusConfig = {
    pending: { label: "En attente", variant: "outline" as const, className: "border-warning text-warning" },
    accepted: { label: "Acceptée", variant: "default" as const, className: "bg-success text-success-foreground" },
    rejected: { label: "Refusée", variant: "default" as const, className: "bg-destructive text-destructive-foreground" },
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Bonjour, Ahmed 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Voici un aperçu de vos candidatures et stages
          </p>
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
          {/* Recent Applications */}
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Candidatures récentes</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/student/applications">
                  Voir tout
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <div>
                    <p className="font-medium text-foreground">{app.title}</p>
                    <p className="text-sm text-muted-foreground">{app.hospital}</p>
                  </div>
                  <Badge className={statusConfig[app.status as keyof typeof statusConfig].className}>
                    {statusConfig[app.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Available Internships */}
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Stages disponibles</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/student/internships">
                  Explorer
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {availableInternships.map((internship) => (
                <div key={internship.id} className="p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground">{internship.title}</p>
                      <p className="text-sm text-muted-foreground">{internship.hospital}</p>
                    </div>
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{internship.places} places</span>
                    <span>•</span>
                    <span>{internship.duration}</span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    Postuler
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Profile Completion */}
        <Card className="border-border/50 bg-primary-light/30">
          <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Star className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Complétez votre profil</p>
                <p className="text-sm text-muted-foreground">
                  Ajoutez vos pièces justificatives pour postuler aux stages
                </p>
              </div>
            </div>
            <Button variant="hero" asChild>
              <Link to="/dashboard/student/profile">
                Compléter mon profil
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
