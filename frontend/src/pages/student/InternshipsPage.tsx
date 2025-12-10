import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MapPin, 
  Building2,
  Clock,
  ArrowRight
} from "lucide-react";

const InternshipsPage = () => {
  const internships = [
    {
      id: 1,
      title: "Stage en Médecine Générale",
      hospital: "Hôpital Central",
      location: "Alger",
      duration: "3 mois",
      department: "Médecine Générale",
      description: "Accompagnez les médecins généralistes et participez aux consultations et soins des patients.",
    },
    {
      id: 2,
      title: "Stage en Chirurgie",
      hospital: "Clinique Médicale Ibn Sina",
      location: "Oran",
      duration: "2 mois",
      department: "Chirurgie",
      description: "Expérience pratique en bloc opératoire sous supervision des chirurgiens.",
    },
    {
      id: 3,
      title: "Stage en Pédiatrie",
      hospital: "Hôpital Mère-Enfant",
      location: "Constantine",
      duration: "3 mois",
      department: "Pédiatrie",
      description: "Travail avec enfants et acquisition d'expérience clinique encadrée par des pédiatres.",
    },
    {
      id: 4,
      title: "Stage en Soins Infirmiers",
      hospital: "Centre Médical du Sud",
      location: "Béchar",
      duration: "4 mois",
      department: "Nursing",
      description: "Formation complète en soins infirmiers et gestion des patients hospitalisés.",
    },
  ];

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Annonces de Stages Médicaux
          </h1>
          <p className="text-muted-foreground mt-1">
            Découvrez les opportunités de stage disponibles pour les étudiants
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Rechercher un stage..." 
              className="pl-10"
            />
          </div>
        </div>

        {/* Internships Grid */}
        <div className="grid gap-4">
          {internships.map((internship) => (
            <Card key={internship.id} className="border-border/50 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {internship.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {internship.hospital}
                        </p>
                      </div>
                      <Badge variant="default">{internship.department}</Badge>
                    </div>

                    <p className="text-sm text-foreground mb-4">
                      {internship.description}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {internship.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {internship.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {internship.department}
                        </span>
                      </div>
                    </div>

                    <Button className="w-full md:w-auto">
                      Postuler maintenant
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

export default InternshipsPage;
