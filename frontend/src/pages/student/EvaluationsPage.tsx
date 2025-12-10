import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const StudentEvaluationsPage = () => {
  const evaluations = [
    { id: 1, title: "Évaluation Chirurgie Générale", doctor: "Dr. Khaled", date: "2024-03-01", status: "pending" },
    { id: 2, title: "Évaluation Pédiatrie", doctor: "Dr. Amina", date: "2024-02-15", status: "completed" },
  ];

  const statusConfig: Record<string, { label: string; className: string; variant: "outline" | "default" }> = {
    pending: { label: "À compléter", className: "border-warning text-warning", variant: "outline" },
    completed: { label: "Complétée", className: "bg-success text-success-foreground", variant: "default" },
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Mes Évaluations</h1>
          <p className="text-muted-foreground mt-1">Voir et télécharger les évaluations qui vous concernent</p>
        </div>

        <div className="grid gap-4">
          {evaluations.map((ev) => (
            <Card key={ev.id} className="border-border/50 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{ev.title}</h3>
                    <p className="text-sm text-muted-foreground">Par {ev.doctor} • {new Date(ev.date).toLocaleDateString('fr-FR')}</p>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <Badge variant={statusConfig[ev.status].variant} className={statusConfig[ev.status].className}>
                      {statusConfig[ev.status].label}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      Voir
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

export default StudentEvaluationsPage;
