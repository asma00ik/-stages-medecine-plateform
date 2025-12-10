import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  ArrowRight,
  CheckCircle,
  Clock,
  User
} from "lucide-react";

const ApplicationsPage = () => {
  const applications = [
    {
      id: 1,
      studentName: "Mohammed Kais",
      specialization: "Informatique",
      university: "Université d'Alger 1",
      appliedDate: "2024-01-15",
      status: "Acceptée",
      statusColor: "success"
    },
    {
      id: 2,
      studentName: "Fatima Zahra",
      specialization: "Chimie",
      university: "Université de Tlemcen",
      appliedDate: "2024-01-10",
      status: "En attente",
      statusColor: "warning"
    },
    {
      id: 3,
      studentName: "Omar Habib",
      specialization: "Biologie",
      university: "Université de Constantine",
      appliedDate: "2024-01-08",
      status: "Rejetée",
      statusColor: "destructive"
    },
    {
      id: 4,
      studentName: "Amina Belghoul",
      specialization: "Physique",
      university: "Université d'Alger 3",
      appliedDate: "2024-01-20",
      status: "En attente",
      statusColor: "warning"
    },
  ];

  return (
    <DashboardLayout role="doctor">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Candidatures
          </h1>
          <p className="text-muted-foreground mt-1">
            Gérez les candidatures des étudiants
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-xs text-muted-foreground">Acceptées</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-warning" />
                <div>
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-xs text-muted-foreground">En attente</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-xs text-muted-foreground">Rejetées</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <div className="grid gap-4">
          {applications.map((app) => (
            <Card key={app.id} className="border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                      {app.studentName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {app.studentName}
                        </h3>
                        <Badge 
                          variant={app.statusColor === "success" ? "default" : app.statusColor === "warning" ? "secondary" : "destructive"}
                        >
                          {app.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {app.specialization} • {app.university}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Candidature reçue le {app.appliedDate}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Voir détails
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationsPage;
