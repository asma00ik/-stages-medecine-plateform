import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit,
  Trash2,
  Eye,
  Users,
  Calendar
} from "lucide-react";

const PostingsPage = () => {
  const postings = [
    {
      id: 1,
      title: "Stage Chirurgie Générale",
      department: "Chirurgie",
      positions: 3,
      applications: 12,
      startDate: "2024-02-01",
      duration: "3 mois",
      status: "Actif",
    },
    {
      id: 2,
      title: "Stage Pédiatrie",
      department: "Pédiatrie",
      positions: 2,
      applications: 8,
      startDate: "2024-02-15",
      duration: "2 mois",
      status: "Actif",
    },
    {
      id: 3,
      title: "Stage Médecine Interne",
      department: "Médecine Interne",
      positions: 4,
      applications: 5,
      startDate: "2024-03-01",
      duration: "3 mois",
      status: "Brouillon",
    },
  ];

  return (
    <DashboardLayout role="hospital">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Annonces de Stage
            </h1>
            <p className="text-muted-foreground mt-1">
              Gérez vos offres de stage et candidatures
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle annonce
          </Button>
        </div>

        {/* Postings Grid */}
        <div className="grid gap-4">
          {postings.map((posting) => (
            <Card key={posting.id} className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {posting.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {posting.department}
                        </p>
                      </div>
                      <Badge variant={posting.status === "Actif" ? "default" : "outline"}>
                        {posting.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Postes</p>
                          <p className="text-sm font-medium text-foreground">{posting.positions}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Candidatures</p>
                          <p className="text-sm font-medium text-foreground">{posting.applications}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Durée</p>
                          <p className="text-sm font-medium text-foreground">{posting.duration}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
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

export default PostingsPage;
