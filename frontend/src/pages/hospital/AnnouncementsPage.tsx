import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AnnouncementsPage = () => {
  const announcements = [
    { id: 1, title: "Stage en Cardiologie", date: "2024-03-01" },
    { id: 2, title: "Stage en Radiologie", date: "2024-04-15" },
  ];

  return (
    <DashboardLayout role="hospital">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Annonces</h1>
            <p className="text-muted-foreground mt-1">Publier et gérer les annonces de stage</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle annonce
          </Button>
        </div>

        <div className="grid gap-4">
          {announcements.map((a) => (
            <Card key={a.id} className="border-border/50">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{a.title}</h3>
                  <p className="text-sm text-muted-foreground">{new Date(a.date).toLocaleDateString('fr-FR')}</p>
                </div>
                <div>
                  <Button variant="outline" size="sm">Modifier</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnnouncementsPage;
