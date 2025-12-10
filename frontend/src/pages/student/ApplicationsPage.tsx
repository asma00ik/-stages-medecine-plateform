import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  ArrowRight,
  MapPin,
  Building2,
  Calendar
} from "lucide-react";

const StudentApplicationsPage = () => {
  const applications = [
    {
      id: 1,
      title: "Stage Chirurgie Générale",
      hospital: "CHU Mustapha Pacha",
      location: "Alger",
      status: "pending",
      date: "2024-01-15",
      duration: "3 mois",
    },
    {
      id: 2,
      title: "Stage Pédiatrie",
      hospital: "EHS Canastel",
      location: "Oran",
      status: "accepted",
      date: "2024-01-10",
      duration: "2 mois",
    },
    {
      id: 3,
      title: "Stage Gynécologie",
      hospital: "EPSP Bir El Djir",
      location: "Oran",
      status: "rejected",
      date: "2024-01-05",
      duration: "3 mois",
    },
    {
      id: 4,
      title: "Stage Médecine Interne",
      hospital: "CHU Constantine",
      location: "Constantine",
      status: "pending",
      date: "2024-01-20",
      duration: "2 mois",
    },
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
            Mes Candidatures
          </h1>
          <p className="text-muted-foreground mt-1">
            Suivez l'état de vos candidatures de stage
          </p>
        </div>

        {/* Applications Grid */}
        <div className="grid gap-4">
          {applications.map((app) => (
            <Card key={app.id} className="border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {app.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {app.hospital}
                        </p>
                      </div>
                      <Badge 
                        variant={statusConfig[app.status as keyof typeof statusConfig]?.variant}
                        className={statusConfig[app.status as keyof typeof statusConfig]?.className}
                      >
                        {statusConfig[app.status as keyof typeof statusConfig]?.label}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {app.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {app.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(app.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm">
                      Voir les détails
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentApplicationsPage;
