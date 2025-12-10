import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const HospitalsPage = () => {
  const hospitals = [
    { id: 1, name: "CHU Mustapha Pacha", city: "Alger" },
    { id: 2, name: "CHU Oran", city: "Oran" },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Établissements</h1>
          <p className="text-muted-foreground mt-1">Gérer les hôpitaux et cliniques inscrits</p>
        </div>

        <div className="grid gap-4">
          {hospitals.map((h) => (
            <Card key={h.id} className="border-border/50">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{h.name}</h3>
                  <p className="text-sm text-muted-foreground">{h.city}</p>
                </div>
                <div>
                  <Button variant="outline" size="sm"><Eye className="w-4 h-4 mr-1" />Voir</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HospitalsPage;
