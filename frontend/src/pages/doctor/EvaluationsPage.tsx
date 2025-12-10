import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardCheck,
  ArrowRight,
  Star,
  Calendar,
  User
} from "lucide-react";

const EvaluationsPage = () => {
  const evaluations = [
    {
      id: 1,
      studentName: "Ahmed Benali",
      specialization: "Chirurgie Générale",
      endDate: "2024-01-31",
      status: "À évaluer",
      statusColor: "warning"
    },
    {
      id: 2,
      studentName: "Sara Mekhloufi",
      specialization: "Chirurgie Générale",
      endDate: "2024-02-15",
      status: "À évaluer",
      statusColor: "warning"
    },
    {
      id: 3,
      studentName: "Yacine Boudiaf",
      specialization: "Chirurgie Générale",
      endDate: "2024-01-20",
      status: "Évaluée",
      statusColor: "success"
    },
  ];

  return (
    <DashboardLayout role="doctor">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Évaluations
          </h1>
          <p className="text-muted-foreground mt-1">
            Gérez les évaluations de vos stagiaires
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <ClipboardCheck className="w-5 h-5 text-warning" />
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-xs text-muted-foreground">À évaluer</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-success" />
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-xs text-muted-foreground">Évaluées</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-xs text-muted-foreground">En retard</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Evaluations List */}
        <div className="grid gap-4">
          {evaluations.map((evaluation) => (
            <Card key={evaluation.id} className="border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                      {evaluation.studentName.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {evaluation.studentName}
                        </h3>
                        <Badge
                          variant={evaluation.statusColor === "success" ? "default" : "secondary"}
                        >
                          {evaluation.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {evaluation.specialization}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Stage terminé le {evaluation.endDate}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {evaluation.status === "À évaluer" ? "Évaluer" : "Voir évaluation"}
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

export default EvaluationsPage;
