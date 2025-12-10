import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminSettingsPage = () => {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Paramètres</h1>
          <p className="text-muted-foreground mt-1">Paramètres globaux de la plateforme</p>
        </div>

        <Card className="border-border/50">
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground">Nom du site</label>
              <Input defaultValue="StageLink" />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground">Contact support</label>
              <Input defaultValue="support@example.com" />
            </div>

            <div className="flex gap-2">
              <Button>Enregistrer</Button>
              <Button variant="outline">Réinitialiser</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminSettingsPage;
