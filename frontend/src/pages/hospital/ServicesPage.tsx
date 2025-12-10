import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ServicesPage = () => {
  const services = [
    { id: 1, name: "Chirurgie Générale", interns: 5, capacity: 6 },
    { id: 2, name: "Pédiatrie", interns: 4, capacity: 5 },
  ];

  return (
    <DashboardLayout role="hospital">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Services</h1>
            <p className="text-muted-foreground mt-1">Gérer les services et capacités du centre</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un service
          </Button>
        </div>

        <div className="grid gap-4">
          {services.map((s) => (
            <Card key={s.id} className="border-border/50">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{s.name}</h3>
                  <p className="text-sm text-muted-foreground">Stagiaires: {s.interns} / {s.capacity}</p>
                </div>
                <div>
                  <Button variant="outline" size="sm">Gérer</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ServicesPage;
