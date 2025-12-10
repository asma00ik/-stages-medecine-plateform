import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  Calendar
} from "lucide-react";

const InternsPage = () => {
  const interns = [
    {
      id: 1,
      name: "Ahmed Benali",
      university: "Université d'Alger 1",
      specialization: "Chirurgie Générale",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      progress: 60,
      status: "En cours"
    },
    {
      id: 2,
      name: "Sara Mekhloufi",
      university: "Université de Tlemcen",
      specialization: "Chirurgie Générale",
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      progress: 40,
      status: "En cours"
    },
    {
      id: 3,
      name: "Yacine Boudiaf",
      university: "Université de Constantine",
      specialization: "Chirurgie Générale",
      startDate: "2024-02-01",
      endDate: "2024-05-01",
      progress: 25,
      status: "En cours"
    },
    {
      id: 4,
      name: "Leila Hamza",
      university: "Université d'Alger 1",
      specialization: "Chirurgie Générale",
      startDate: "2023-10-01",
      endDate: "2023-12-31",
      progress: 100,
      status: "Terminé"
    },
  ];

  return (
    <DashboardLayout role="doctor">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Mes Stagiaires
          </h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos stagiaires actuels et précédents
          </p>
        </div>

        {/* Interns List */}
        <div className="grid gap-4">
          {interns.map((intern) => (
            <Card key={intern.id} className="border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {intern.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {intern.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {intern.specialization} • {intern.university}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {intern.startDate} à {intern.endDate}
                          </span>
                        </div>
                        <Badge variant={intern.status === "En cours" ? "default" : "secondary"}>
                          {intern.status}
                        </Badge>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-3">
                        <div 
                          className="h-full gradient-primary rounded-full transition-all"
                          // Note: Dynamic width requires inline style as it varies per intern
                          style={{ width: `${intern.progress}%` } as React.CSSProperties}
                        />
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Détails
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

export default InternsPage;
