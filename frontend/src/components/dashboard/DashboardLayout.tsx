import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  GraduationCap, 
  LayoutDashboard, 
  FileText, 
  User, 
  ClipboardList,
  LogOut,
  Menu,
  X,
  Bell,
  Building2,
  Stethoscope,
  Crown,
  Users,
  Settings,
  BarChart3,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface DashboardLayoutProps {
  children: ReactNode;
  role: "student" | "hospital" | "doctor" | "admin";
}

const roleConfig = {
  student: {
    title: "Espace Étudiant",
    icon: GraduationCap,
    color: "primary",
    navItems: [
      { label: "Tableau de bord", href: "/dashboard/student", icon: LayoutDashboard },
      { label: "Mon Profil", href: "/dashboard/student/profile", icon: User },
      { label: "Annonces de stages", href: "/dashboard/student/internships", icon: Briefcase },
      { label: "Mes Candidatures", href: "/dashboard/student/applications", icon: FileText },
      { label: "Mes Évaluations", href: "/dashboard/student/evaluations", icon: ClipboardList },
    ],
  },
  hospital: {
    title: "Espace Établissement",
    icon: Building2,
    color: "success",
    navItems: [
      { label: "Tableau de bord", href: "/dashboard/hospital", icon: LayoutDashboard },
      { label: "Services", href: "/dashboard/hospital/services", icon: Building2 },
      { label: "Annonces", href: "/dashboard/hospital/announcements", icon: Briefcase },
      { label: "Candidatures", href: "/dashboard/hospital/applications", icon: FileText },
      { label: "Statistiques", href: "/dashboard/hospital/stats", icon: BarChart3 },
    ],
  },
  doctor: {
    title: "Espace Médecin",
    icon: Stethoscope,
    color: "info",
    navItems: [
      { label: "Tableau de bord", href: "/dashboard/doctor", icon: LayoutDashboard },
      { label: "Candidatures", href: "/dashboard/doctor/applications", icon: FileText },
      { label: "Mes Stagiaires", href: "/dashboard/doctor/interns", icon: Users },
      { label: "Évaluations", href: "/dashboard/doctor/evaluations", icon: ClipboardList },
    ],
  },
  admin: {
    title: "Administration",
    icon: Crown,
    color: "warning",
    navItems: [
      { label: "Tableau de bord", href: "/dashboard/admin", icon: LayoutDashboard },
      { label: "Utilisateurs", href: "/dashboard/admin/users", icon: Users },
      { label: "Établissements", href: "/dashboard/admin/hospitals", icon: Building2 },
      { label: "Statistiques", href: "/dashboard/admin/stats", icon: BarChart3 },
      { label: "Paramètres", href: "/dashboard/admin/settings", icon: Settings },
    ],
  },
};

const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAllNav, setShowAllNav] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const config = roleConfig[role];
  const RoleIcon = config.icon;

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50 transform transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
         <div className="h-16 flex items-center gap-3 px-4 border-b border-sidebar-border"> 

<div className="h-16 flex items-center gap-3 px-4 border-b border-sidebar-border">

  {/* RECTANGLE VIOLET + LOGO */}
  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-md">
    <img
      src="/logo.svg"
      alt="StageLink"
      className="w-7 h-7 object-contain"
    />
</div>

          {/* NOM DE LA PLATEFORME */}
            <span className="text-lg font-semibold text-sidebar-foreground">
              Stage<span className="text-primary">Link</span>
            </span>

            {/* BTN CLOSE */}
            <button 
              className="ml-auto lg:hidden text-sidebar-foreground"
              onClick={() => setSidebarOpen(false)}
              title="Fermer la barre latérale"
            >
              <X className="w-5 h-5" />
            </button>
            </div>
          </div>
          {/* Role indicator */}
          <div className="px-4 py-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-sidebar-accent">
              <RoleIcon className="w-5 h-5 text-sidebar-accent-foreground" />
              <span className="text-sm font-medium text-sidebar-accent-foreground">
                {config.title}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {(
              showAllNav
                ? (() => {
                    const all = Object.keys(roleConfig).flatMap((k) => (roleConfig as any)[k].navItems as NavItem[]);
                    const seen = new Set<string>();
                    return all.filter((it) => {
                      if (seen.has(it.href)) return false;
                      seen.add(it.href);
                      return true;
                    });
                  })()
                : config.navItems
            ).map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-sidebar-border">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 text-sidebar-foreground hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              Déconnexion
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4">
          <button 
            className="lg:hidden text-foreground"
            onClick={() => setSidebarOpen(true)}
            title="Ouvrir la barre latérale"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-3">

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-medium">
              U
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
