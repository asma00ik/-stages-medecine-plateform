import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  ClipboardCheck,
  Clock,
  ArrowRight,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  const stats = [
    { label: "Stagiaires actuels", value: 4, icon: Users, color: "primary" },
    { label: "Candidatures à traiter", value: 7, icon: FileText, color: "warning" },
    { label: "Évaluations à faire", value: 2, icon: ClipboardCheck, color: "info" },
    { label: "Stages terminés", value: 12, icon: Clock, color: "success" },
  ];

  const currentInterns = [
    { id: 1, name: "Ahmed Benali", startDate: "2024-01-01", endDate: "2024-03-31", progress: 60 },
    { id: 2, name: "Sara Mekhloufi", startDate: "2024-01-15", endDate: "2024-04-15", progress: 40 },
    { id: 3, name: "Yacine Boudiaf", startDate: "2024-02-01", endDate: "2024-05-01", progress: 25 },
  ];

  const pendingEvaluations = [
    { id: 1, name: "Fatima Zohra", endDate: "2024-01-10", service: "Chirurgie Générale" },
    { id: 2, name: "Karim Hadj", endDate: "2024-01-08", service: "Chirurgie Générale" },
  ];

  return (
    <DashboardLayout role="doctor">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Dr. Mohamed Cherif
          </h1>
          <p className="text-muted-foreground mt-1">
            Chef de Service - Chirurgie Générale
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
          {/* Current Interns */}
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Stagiaires actuels</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/doctor/interns">
                  Voir tout
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentInterns.map((intern) => (
                <div key={intern.id} className="p-4 rounded-xl border border-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-medium">
                        {intern.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{intern.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {intern.startDate} → {intern.endDate}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">{intern.progress}%</Badge>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full gradient-primary rounded-full transition-all"
                      style={{ width: `${intern.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pending Evaluations */}
          <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Évaluations en attente</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard/doctor/evaluations">
                  Voir tout
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingEvaluations.length > 0 ? (
                pendingEvaluations.map((evaluation) => (
                  <div key={evaluation.id} className="p-4 rounded-xl border border-warning/30 bg-warning-light/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-warning" />
                        <div>
                          <p className="font-medium text-foreground">{evaluation.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Stage terminé le {evaluation.endDate}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      Évaluer maintenant
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Aucune évaluation en attente
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
