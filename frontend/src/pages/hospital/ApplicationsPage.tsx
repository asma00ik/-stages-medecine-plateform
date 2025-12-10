import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Clock,
  XCircle,
  ArrowRight,
  User,
  GraduationCap
} from "lucide-react";

const ApplicationsPage = () => {
  const applications = [
    {
      id: 1,
      studentName: "Ahmed Benali",
      studentId: "ST-001",
      specialty: "Médecine Générale",
      stage: "Chirurgie Générale",
      appliedDate: "2024-01-15",
      status: "pending",
    },
    {
      id: 2,
      studentName: "Fatima Zohra",
      studentId: "ST-002",
      specialty: "Infirmerie",
      stage: "Pédiatrie",
      appliedDate: "2024-01-14",
      status: "accepted",
    },
    {
      id: 3,
      studentName: "Karim Hadj",
      studentId: "ST-003",
      specialty: "Médecine Générale",
      stage: "Médecine Interne",
      appliedDate: "2024-01-13",
      status: "rejected",
    },
    {
      id: 4,
      studentName: "Leila Ahmed",
      studentId: "ST-004",
      specialty: "Gynécologie-Obstétrique",
      stage: "Gynécologie",
      appliedDate: "2024-01-20",
      status: "pending",
    },
  ];

  const statusConfig = {
    pending: { label: "En attente", icon: Clock, color: "warning" },
    accepted: { label: "Acceptée", icon: CheckCircle, color: "success" },
    rejected: { label: "Refusée", icon: XCircle, color: "destructive" },
  };

  return (
    <DashboardLayout role="hospital">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Candidatures reçues
          </h1>
          <p className="text-muted-foreground mt-1">
            Examinez et gérez les candidatures de stage
          </p>
        </div>

        {/* Applications Grid */}
        <div className="grid gap-4">
          {applications.map((app) => {
            const config = statusConfig[app.status as keyof typeof statusConfig];
            const StatusIcon = config.icon;
            
            return (
              <Card key={app.id} className="border-border/50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            {app.studentName}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            ID: {app.studentId}
                          </p>
                        </div>
                        <Badge 
                          variant={config.color === "warning" ? "outline" : "default"}
                          className={config.color === "warning" ? "border-warning text-warning" : ""}
                        >
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {config.label}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Spécialité</p>
                            <p className="text-sm text-foreground">{app.specialty}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Stage demandé</p>
                            <p className="text-sm text-foreground">{app.stage}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Date de candidature</p>
                          <p className="text-sm text-foreground">
                            {new Date(app.appliedDate).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>

                      {app.status === "pending" && (
                        <div className="flex gap-2">
                          <Button variant="default" size="sm">
                            Accepter
                            <CheckCircle className="w-4 h-4 ml-1" />
                          </Button>
                          <Button variant="outline" size="sm">
                            Refuser
                            <XCircle className="w-4 h-4 ml-1" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            Voir plus
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      )}
                      {app.status !== "pending" && (
                        <Button variant="ghost" size="sm">
                          Voir les détails
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationsPage;
