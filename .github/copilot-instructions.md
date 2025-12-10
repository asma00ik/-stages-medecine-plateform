# StageConnect - Copilot Instructions

## Project Overview
**StageConnect** is an internship management platform connecting students, hospitals, and doctors for medical internship placements. It features role-based dashboards (Student, Hospital, Doctor, Admin) with distinct workflows for each user type.

## Architecture

### Frontend Stack
- **Vite + React + TypeScript** - Fast builds with strict type checking
- **shadcn/ui + Tailwind CSS** - Composable component library with custom theming via CSS variables
- **React Router** - Client-side routing with wildcard routes for nested dashboard navigation
- **TanStack React Query** - Data fetching and caching (QueryClient initialized in `App.tsx`)
- **Lucide React Icons** - Consistent icon system throughout UI
- **React Hook Form + Zod** - Form handling and validation

### Backend Architecture
- **Express + TypeScript** - Node.js server at `backend/src/server.ts`
- **TypeORM with reflect-metadata** - ORM for database operations
- **Middleware**: Helmet (security), CORS, express.json
- **Health check endpoint**: `GET /api/health` returns database connection status

### URL Structure
```
/ → Landing page (features, roles, hero)
/login → Authentication
/dashboard/{role}/* → Role-specific dashboard (routing handled by DashboardLayout)
  - student → StudentDashboard
  - hospital → HospitalDashboard
  - doctor → DoctorDashboard
  - admin → AdminDashboard
```

## Component Patterns

### Dashboard Layout (`src/components/dashboard/DashboardLayout.tsx`)
- Shared sidebar navigation for all dashboards
- Accepts `navItems`, `children`, `role` props
- Handles mobile menu state and navigation
- Links dynamically update based on active user role (Student, Hospital, Doctor, Admin)
- Icons imported from lucide-react (GraduationCap, Building2, Stethoscope, Crown, Users, etc.)

### Dashboard Pages
- Located in `src/pages/dashboard/{role}Dashboard.tsx`
- Import `DashboardLayout` as wrapper
- Use `Card`, `Badge`, `Button` from shadcn/ui
- Mock data patterns:
  ```tsx
  const stats = [
    { label: "Label", value: number, icon: IconComponent, color: "primary|warning|success|destructive" }
  ];
  const statusConfig = {
    pending: { label: "En attente", variant: "outline" },
    accepted: { label: "Acceptée", variant: "default" },
    rejected: { label: "Refusée", variant: "default" }
  };
  ```

### UI Component Library
- All pre-built shadcn/ui components in `src/components/ui/`
- Follow shadcn patterns: composed from Radix UI primitives
- Tailwind utilities applied in `cn()` utility function (from `src/lib/utils.ts`)
- Custom colors via CSS variables (primary, secondary, destructive, success, warning, muted)

## Styling Conventions

### Tailwind + CSS Variables
- Theme defined in `tailwind.config.ts` with HSL color system
- Colors accessed via `className="bg-primary text-primary-foreground"`
- Dark mode via `darkMode: ["class"]` selector
- Container max-width: 1400px (2xl breakpoint)
- Font: Inter (via @fontsource)

### Custom Gradients
- Use gradient-primary class (see Header.tsx for example)
- Responsive utilities: `hidden md:flex` for breakpoint handling

## Development Workflow

### Key Commands
```bash
npm run dev      # Start Vite dev server (port 8080)
npm run build    # Production build
npm run lint     # ESLint checks
npm run preview  # Local production preview
```

### Path Aliases
- `@/*` → `src/*` (configured in tsconfig.json)
- Always import from `@/components`, `@/pages`, `@/lib`

### TypeScript Configuration
- Loose strict checking (noImplicitAny: false, strictNullChecks: false)
- skipLibCheck: true for faster builds
- baseUrl points to project root

## Project-Specific Patterns

### Role-Based Navigation
Dashboard sidebar items vary by role. Implement via:
```tsx
const getNavItems = (role) => [
  { label: "Dashboard", href: `/dashboard/${role}`, icon: LayoutDashboard },
  // role-specific items...
];
```

### Status Badges
Use consistent color mapping:
- `pending` → warning (outline variant)
- `accepted` → success
- `rejected` → destructive

### Landing Page Components
- `Header.tsx` - Fixed navbar with logo and nav links
- `Hero.tsx` - Main call-to-action section
- `Features.tsx` - Feature list display
- `Roles.tsx` - User type descriptions
- `Footer.tsx` - Footer navigation
- All use landing-specific styling with backdrop blur effects

### Mock Data Pattern
Pages currently use hardcoded mock data. When implementing API integration:
1. Create hooks in `src/hooks/` for data fetching (using React Query)
2. Replace mock arrays with `useQuery()` calls
3. Handle loading/error states with shadcn UI components

## Backend Integration

### API Routes
- Base path: `/api/v1/`
- Auth routes: `/api/v1/auth` (route loading with error handling in server.ts)
- Database status checked in health endpoint

### Environment
- Backend port: 4000 (via process.env.PORT)
- CORS enabled for frontend communication
- dotenv for environment variables

### Database Status
- Check `AppDataSource.isInitialized` in server initialization
- Health check returns database connection state

## Important Files Reference
- `src/App.tsx` - Main routing and provider setup
- `vite.config.ts` - Build configuration
- `tailwind.config.ts` - Theme and color system
- `backend/src/server.ts` - Server entry point
- `src/components/dashboard/DashboardLayout.tsx` - Dashboard shell pattern
- `package.json` - Scripts and dependencies
