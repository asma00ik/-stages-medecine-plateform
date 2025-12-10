import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";

const AdminStatsPage = () => {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Statistiques (Admin)</h1>
          <p className="text-muted-foreground mt-1">Vue d'ensemble des métriques de la plateforme</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-border/50">
            <CardContent className="p-6">
              <p className="text-lg font-semibold">Utilisateurs actifs</p>
              <p className="text-sm text-muted-foreground">124</p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <p className="text-lg font-semibold">Annonces actives</p>
              <p className="text-sm text-muted-foreground">38</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminStatsPage;
