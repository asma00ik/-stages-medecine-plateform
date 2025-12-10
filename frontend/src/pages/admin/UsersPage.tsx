import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus,
  Edit,
  Trash2,
  Shield,
  Mail,
  Phone
} from "lucide-react";
import { Input } from "@/components/ui/input";

const UsersPage = () => {
  const users = [
    {
      id: 1,
      name: "Ahmed Benali",
      email: "ahmed@example.com",
      phone: "+213 555 123456",
      role: "student",
      status: "Actif",
      joinDate: "2024-01-01",
    },
    {
      id: 2,
      name: "CHU Mustapha Pacha",
      email: "chu@example.com",
      phone: "+213 21 123456",
      role: "hospital",
      status: "Actif",
      joinDate: "2023-12-15",
    },
    {
      id: 3,
      name: "Dr. Mohammed Kais",
      email: "doctor@example.com",
      phone: "+213 555 654321",
      role: "doctor",
      status: "Actif",
      joinDate: "2024-01-05",
    },
    {
      id: 4,
      name: "Fatima Zohra",
      email: "fatima@example.com",
      phone: "+213 555 789012",
      role: "student",
      status: "Suspendu",
      joinDate: "2024-01-10",
    },
  ];

  const roleConfig = {
    student: { label: "Étudiant", color: "primary" },
    hospital: { label: "Établissement", color: "success" },
    doctor: { label: "Médecin", color: "info" },
    admin: { label: "Administrateur", color: "warning" },
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Gestion des utilisateurs
            </h1>
            <p className="text-muted-foreground mt-1">
              Gérez tous les utilisateurs de la plateforme
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvel utilisateur
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Rechercher un utilisateur..." 
            className="pl-10"
          />
        </div>

        {/* Users Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Nom</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Rôle</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Statut</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Inscription</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Phone className="w-3 h-3" />
                          {user.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-foreground flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="text-xs">
                        {roleConfig[user.role as keyof typeof roleConfig]?.label}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge 
                        variant={user.status === "Actif" ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(user.joinDate).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
