import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const StatsPage = () => {
  return (
    <DashboardLayout role="hospital">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Statistiques</h1>
          <p className="text-muted-foreground mt-1">Indicateurs clés de l'établissement</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <TrendingUp className="w-6 h-6 text-foreground" />
                <div>
                  <p className="text-lg font-semibold">Taux d'acceptation</p>
                  <p className="text-sm text-muted-foreground">68%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <p className="text-lg font-semibold">Stagiaires actifs</p>
              <p className="text-sm text-muted-foreground">24</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StatsPage;
