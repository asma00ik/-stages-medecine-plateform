# 🔗 Integration Frontend-Backend

Ce guide explique comment connecter le frontend React au backend Express.

---

## 📋 Prérequis

- Backend démarré sur `http://localhost:4000`
- Base de données avec tables créées
- Frontend Vite + React

---

## 🔧 Configuration

### 1. Créer le fichier `.env` (frontend)

À la racine du projet:

```bash
# .env
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

### 2. Utiliser l'API Client

J'ai créé un fichier `src/lib/apiClient.ts` qui configure automatiquement:
- ✅ Base URL API
- ✅ Headers par défaut
- ✅ Authentification JWT
- ✅ Gestion des erreurs

### 3. Utiliser React Query pour les appels API

Exemple avec un hook personnalisé:

```typescript
// src/hooks/useAuth.ts
import { useMutation } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: { identifier: string; password: string; role: string }) => {
      const { data } = await apiClient.post('/auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userRole', data.user.role);
    },
  });
};
```

---

## 📡 Endpoints disponibles

### Authentication

#### Login
```typescript
POST /auth/login
{
  "identifier": "email@example.com",
  "password": "password",
  "role": "student"
}
```

#### Register
```typescript
POST /auth/register
{
  "email": "student@university.com",
  "password": "Password123",
  "first_name": "Ahmed",
  "last_name": "Benali",
  "role": "student",
  "matricule": "202231269705",
  "specialization": "Chirurgie"
}
```

### Users

#### Get Profile
```typescript
GET /users/me
Headers: Authorization: Bearer <TOKEN>
```

#### Update Profile
```typescript
PUT /users
Headers: Authorization: Bearer <TOKEN>
{
  "first_name": "Ahmed",
  "phone": "+213123456789"
}
```

#### Get Stats
```typescript
GET /users/stats
Headers: Authorization: Bearer <TOKEN>
```

### Internships

#### List Internships
```typescript
GET /internships?status=active&department=Chirurgie
```

#### Get Internship Detail
```typescript
GET /internships/:id
```

#### Create Internship (Hospital)
```typescript
POST /internships
Headers: Authorization: Bearer <HOSPITAL_TOKEN>
{
  "title": "Stage Chirurgie",
  "description": "...",
  "department": "Chirurgie",
  "positions": 3,
  "duration_months": 3,
  "start_date": "2024-02-01",
  "end_date": "2024-05-01"
}
```

### Applications

#### Get Applications
```typescript
GET /applications
Headers: Authorization: Bearer <TOKEN>
```

#### Apply for Internship
```typescript
POST /applications
Headers: Authorization: Bearer <STUDENT_TOKEN>
{
  "internship_id": "..."
}
```

#### Update Application Status
```typescript
PATCH /applications/:id/status
Headers: Authorization: Bearer <HOSPITAL_TOKEN>
{
  "status": "accepted"
}
```

### Evaluations

#### Get Evaluations
```typescript
GET /evaluations
Headers: Authorization: Bearer <TOKEN>
```

#### Create Evaluation
```typescript
POST /evaluations
Headers: Authorization: Bearer <DOCTOR_TOKEN>
{
  "student_id": "...",
  "internship_id": "...",
  "rating": 4.5,
  "feedback": "Excellent work"
}
```

---

## 🚀 Exemple Complet: Page Login

```typescript
// src/pages/Login.tsx
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('student');
  const navigate = useNavigate();
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post('/auth/login', {
        identifier,
        password,
        role: selectedRole,
      });
      return data;
    },
    onSuccess: (data) => {
      // Save token and user info
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userName', `${data.user.first_name} ${data.user.last_name}`);

      toast({
        title: 'Connexion réussie',
        description: 'Bienvenue!',
      });

      // Redirect to dashboard
      navigate(`/dashboard/${selectedRole}`);
    },
    onError: (error: any) => {
      toast({
        title: 'Erreur',
        description: error.response?.data?.error || 'Erreur de connexion',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        placeholder="Email ou Matricule"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mot de passe"
        required
      />
      <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
        <option value="student">Étudiant</option>
        <option value="hospital">Établissement</option>
        <option value="doctor">Médecin</option>
      </select>
      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Connexion...' : 'Se connecter'}
      </button>
    </form>
  );
};

export default Login;
```

---

## 📊 Exemple: Récupérer les Stages (Student Dashboard)

```typescript
// src/hooks/useInternships.ts
import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';

export const useInternships = (filters?: { status?: string; department?: string }) => {
  return useQuery({
    queryKey: ['internships', filters],
    queryFn: async () => {
      const { data } = await apiClient.get('/internships', { params: filters });
      return data;
    },
  });
};

// src/pages/dashboard/StudentDashboard.tsx
import { useInternships } from '@/hooks/useInternships';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const StudentDashboard = () => {
  const { data: internships, isLoading, error } = useInternships({ status: 'active' });

  if (isLoading) return <Skeleton className="h-96" />;
  if (error) return <div>Erreur lors du chargement</div>;

  return (
    <div>
      <h2>Stages Disponibles</h2>
      {internships?.map((internship) => (
        <Card key={internship.id}>
          <h3>{internship.title}</h3>
          <p>{internship.hospital_name}</p>
          <p>{internship.positions} places disponibles</p>
        </Card>
      ))}
    </div>
  );
};

export default StudentDashboard;
```

---

## 🔐 Gestion de l'Authentification

### Stocker le Token

```typescript
// Après login réussi
const { data } = await apiClient.post('/auth/login', credentials);
localStorage.setItem('authToken', data.token);
```

### Utiliser le Token

Le token est automatiquement ajouté à tous les requêtes via l'interceptor:

```typescript
// src/lib/apiClient.ts
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Gérer l'Expiration

```typescript
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## 📝 Variables d'Environnement

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

### Backend (backend/.env)
```
DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/stagelink
JWT_SECRET=your-secret-key
PORT=4000
```

---

## 🧪 Testing API avec Postman

### Collection Setup
1. Import collection depuis `POSTMAN_COLLECTION.json`
2. Set variables:
   ```json
   {
     "base_url": "http://localhost:4000/api/v1",
     "token": "eyJhbGc..."
   }
   ```

### Quick Test
```bash
# Health Check
curl http://localhost:4000/api/health

# Login
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"student@test.com","password":"Password123","role":"student"}'

# Get Profile
curl -X GET http://localhost:4000/api/v1/users/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## ✅ Checklist d'Intégration

- [ ] Backend démarré et fonctionnel
- [ ] Frontend configure avec VITE_API_BASE_URL
- [ ] apiClient.ts créé et importé
- [ ] Login fonctionne
- [ ] Token sauvegardé localement
- [ ] Requests incluent le token automatiquement
- [ ] Récupération des données fonctionne
- [ ] Erreurs gérées correctement
- [ ] Logout clear le token

---

## 🔧 Debugging

### Vérifier la Requête
```typescript
// Dans le interceptor request
console.log('Request:', config);
```

### Vérifier la Réponse
```typescript
// Dans le interceptor response
console.log('Response:', response.data);
```

### Vérifier le Token
```typescript
console.log('Token:', localStorage.getItem('authToken'));
```

### Vérifier les Headers
```typescript
// Dans browser DevTools → Network → Copie Authorization header
```

---

## 📚 Documentation Complète

- Backend API: `backend/API_DOCUMENTATION.md`
- Backend Setup: `backend/README.md`
- Setup Guide: `SETUP_GUIDE.md`

