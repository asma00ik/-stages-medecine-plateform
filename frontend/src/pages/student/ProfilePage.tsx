import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  User,
  GraduationCap,
  FileText,
  Upload,
  Save
} from "lucide-react";

const StudentProfilePage = () => {
  const [academicYear, setAcademicYear] = useState(2);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Mon Profil
          </h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos informations personnelles et documents
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informations personnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" defaultValue="Ahmed" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" defaultValue="Benali" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="ahmed.benali@univ-alger.dz" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" defaultValue="+213 555 123 456" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Année universitaire</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="academicYear"
                      type="number"
                      min="1"
                      max="7"
                      value={academicYear}
                      onChange={(e) => {
                        const val = Math.min(Math.max(parseInt(e.target.value) || 1, 1), 7);
                        setAcademicYear(val);
                      }}
                      className="h-11"
                    />
                    <span className="text-sm text-muted-foreground">ème année</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Doit être entre 1 et 7
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="university">Université</Label>
                  <Input id="university" defaultValue="Université d'Alger 1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Spécialisation</Label>
                  <Input id="specialization" defaultValue="Médecine Générale" />
                </div>
                <Button className="w-full" onClick={handleSave} disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Enregistrement..." : "Sauvegarder les modifications"}
                </Button>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Documents justificatifs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Carte d'étudiant</p>
                        <p className="text-sm text-muted-foreground">PDF • 2.3 MB</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-success">Validé</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">CV médical</p>
                        <p className="text-sm text-muted-foreground">PDF • 1.8 MB</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-warning">En attente</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Lettre de motivation</p>
                        <p className="text-sm text-muted-foreground">Non fourni</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Télécharger
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Summary */}
          <div className="space-y-6">
            <Card className="border-border/50">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-2xl mx-auto mb-4">
                  A
                </div>
                <h3 className="font-semibold text-lg">Ahmed Benali</h3>
                <p className="text-muted-foreground">Étudiant en Médecine</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-sm">Université d'Alger 1</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-sm">Statut du profil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Complétude</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full progress-bar-fill" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Ajoutez votre lettre de motivation pour compléter votre profil
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfilePage;
