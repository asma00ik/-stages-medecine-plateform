# StageConnect Backend API Documentation

## 🚀 Démarrage Rapide

### 1. Vérifier la Connexion PostgreSQL

D'abord, assure-toi que PostgreSQL est en cours d'exécution et que la base de données `stagelink` existe.

**Dans pgAdmin :**
1. Connecte-toi à `http://localhost:5050`
2. Aller à **Servers** → **PostgreSQL** → **Databases**
3. Vérifier que `stagelink` existe

**Si non:**
1. Clic droit sur **Databases** → **Create** → **Database**
2. Nom: `stagelink`
3. Owner: `postgres`
4. Sauvegarder

### 2. Vérifier le fichier `.env`

```bash
# backend/.env
DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/stagelink
JWT_SECRET=your-secret-key-change-in-production
PORT=4000
NODE_ENV=development
```

**IMPORTANT:** Les guillemets ne doivent PAS être dans `.env`

### 3. Lancer le Backend

```bash
cd backend
npm install
npm run dev
```

Le serveur démarrera sur `http://localhost:4000`

## 📚 API Endpoints

### Base URL
```
http://localhost:4000/api/v1
```

### Authentication

#### 1. **Register (POST)** `/auth/register`
Créer un nouveau compte utilisateur

**Request Body:**
```json
{
  "email": "student@university.com",
  "password": "securePassword123",
  "first_name": "Ahmed",
  "last_name": "Benali",
  "role": "student",
  "phone": "+213123456789",
  "address": "Algiers, Algeria",
  "matricule": "202231269705",
  "specialization": "Chirurgie Générale",
  "university": "Université de médecine d'Alger"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "student@university.com",
    "role": "student",
    "first_name": "Ahmed",
    "last_name": "Benali"
  }
}
```

---

#### 2. **Login (POST)** `/auth/login`
Se connecter avec email/matricule et mot de passe

**Request Body:**
```json
{
  "identifier": "student@university.com",
  "password": "securePassword123",
  "role": "student"
}
```

Pour les étudiants, `identifier` peut être:
- Email: `student@university.com`
- Matricule: `202231269705` (12 chiffres)

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "student@university.com",
    "role": "student",
    "first_name": "Ahmed",
    "last_name": "Benali"
  }
}
```

---

#### 3. **Verify Token (GET)** `/auth/verify`
Vérifier un token JWT

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "valid": true
}
```

---

### Users

#### 4. **Get Profile (GET)** `/users/me`
Récupérer le profil de l'utilisateur connecté

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "student@university.com",
  "first_name": "Ahmed",
  "last_name": "Benali",
  "role": "student",
  "phone": "+213123456789",
  "address": "Algiers, Algeria",
  "profile_picture": null,
  "created_at": "2024-12-08T14:00:00Z",
  "matricule": "202231269705",
  "specialization": "Chirurgie Générale",
  "university": "Université de médecine d'Alger"
}
```

---

#### 5. **Update Profile (PUT)** `/users`
Mettre à jour les informations du profil

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Request Body:**
```json
{
  "first_name": "Ahmed",
  "last_name": "Benali",
  "phone": "+213999999999",
  "address": "New Address"
}
```

---

#### 6. **Get Stats (GET)** `/users/stats`
Récupérer les statistiques de l'utilisateur

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response (Student):**
```json
{
  "total": 5,
  "pending": 3,
  "accepted": 1,
  "rejected": 1
}
```

---

### Internships

#### 7. **Get All Internships (GET)** `/internships`
Récupérer la liste des stages

**Query Parameters:**
- `status`: `draft`, `active`, `closed` (optionnel)
- `department`: nom du département (optionnel)
- `hospital_id`: ID de l'établissement (optionnel)

**Response:**
```json
[
  {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "title": "Stage Chirurgie Générale",
    "description": "Stage d'une durée de 3 mois...",
    "hospital_name": "CHU Mustapha",
    "department": "Chirurgie",
    "positions": 3,
    "duration_months": 3,
    "start_date": "2024-02-01",
    "end_date": "2024-05-01",
    "status": "active",
    "created_at": "2024-01-15T10:00:00Z"
  }
]
```

---

#### 8. **Get Internship Detail (GET)** `/internships/:id`
Récupérer les détails d'un stage spécifique

---

#### 9. **Create Internship (POST)** `/internships`
Créer un nouveau stage (Hôpitaux uniquement)

**Headers:**
```
Authorization: Bearer <HOSPITAL_TOKEN>
```

**Request Body:**
```json
{
  "title": "Stage Chirurgie Générale",
  "description": "Stage d'une durée de 3 mois en chirurgie générale",
  "department": "Chirurgie",
  "positions": 3,
  "duration_months": 3,
  "start_date": "2024-02-01",
  "end_date": "2024-05-01",
  "requirements": "Avoir complété 4 années d'études",
  "benefits": "Certificat de participation, lettre de recommandation",
  "status": "draft"
}
```

---

#### 10. **Update Internship (PUT)** `/internships/:id`
Mettre à jour un stage (Hôpitaux uniquement)

---

#### 11. **Delete Internship (DELETE)** `/internships/:id`
Supprimer un stage (Hôpitaux uniquement)

---

### Applications

#### 12. **Get Applications (GET)** `/applications`
Récupérer les candidatures

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Query Parameters:**
- `status`: `pending`, `accepted`, `rejected`, `withdrawn` (optionnel)
- `internship_id`: Filtrer par stage (optionnel, pour hôpitaux)

**Response (Student):**
```json
[
  {
    "id": "770e8400-e29b-41d4-a716-446655440000",
    "internship_title": "Stage Chirurgie Générale",
    "hospital_name": "CHU Mustapha",
    "department": "Chirurgie",
    "status": "pending",
    "applied_at": "2024-01-15T10:00:00Z"
  }
]
```

---

#### 13. **Apply for Internship (POST)** `/applications`
Postuler pour un stage (Étudiants uniquement)

**Headers:**
```
Authorization: Bearer <STUDENT_TOKEN>
```

**Request Body:**
```json
{
  "internship_id": "660e8400-e29b-41d4-a716-446655440000"
}
```

---

#### 14. **Update Application Status (PATCH)** `/applications/:id/status`
Mettre à jour le statut d'une candidature (Hôpitaux uniquement)

**Headers:**
```
Authorization: Bearer <HOSPITAL_TOKEN>
```

**Request Body:**
```json
{
  "status": "accepted"
}
```

Valeurs: `accepted`, `rejected`, `pending`, `withdrawn`

---

#### 15. **Withdraw Application (DELETE)** `/applications/:id`
Retirer une candidature (Étudiants uniquement)

**Headers:**
```
Authorization: Bearer <STUDENT_TOKEN>
```

---

### Evaluations

#### 16. **Get Evaluations (GET)** `/evaluations`
Récupérer les évaluations

**Headers:**
```
Authorization: Bearer <TOKEN>
```

---

#### 17. **Create Evaluation (POST)** `/evaluations`
Créer une évaluation (Médecins uniquement)

**Headers:**
```
Authorization: Bearer <DOCTOR_TOKEN>
```

**Request Body:**
```json
{
  "student_id": "550e8400-e29b-41d4-a716-446655440000",
  "internship_id": "660e8400-e29b-41d4-a716-446655440000",
  "rating": 4.5,
  "feedback": "Excellent travail, très impliqué et responsable",
  "competencies": {
    "communication": 5,
    "technical_skills": 4,
    "teamwork": 5,
    "professionalism": 4
  }
}
```

---

#### 18. **Update Evaluation (PATCH)** `/evaluations/:id`
Mettre à jour une évaluation (Médecins uniquement)

---

## 🔐 Authentification

### Token Format
```
Authorization: Bearer <JWT_TOKEN>
```

### Token Payload
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "role": "student",
  "email": "student@university.com",
  "iat": 1702052400,
  "exp": 1702657200
}
```

**Token Expiration**: 7 jours

---

## 👥 User Roles

### Student (Étudiant)
- Postuler aux stages
- Voir ses candidatures
- Voir ses évaluations
- Completer son profil

### Hospital (Établissement)
- Créer/Modifier/Supprimer des offres de stage
- Gérer les candidatures
- Voir les statistiques

### Doctor (Médecin)
- Évaluer les stagiaires
- Voir les interns

### Admin (Administration)
- Gérer les utilisateurs
- Voir toutes les données
- Gérer la plateforme

---

## 🛠️ Database Schema

### Tables Principales
- `users` - Base pour tous les utilisateurs
- `students` - Données spécifiques aux étudiants
- `hospitals` - Données spécifiques aux établissements
- `doctors` - Données spécifiques aux médecins
- `internships` - Offres de stage
- `applications` - Candidatures
- `evaluations` - Évaluations

---

## ⚠️ Gestion d'Erreurs

### Réponses d'Erreur

**400 Bad Request** - Requête invalide
```json
{
  "error": "Invalid request data"
}
```

**401 Unauthorized** - Token manquant ou invalide
```json
{
  "error": "No token provided"
}
```

**403 Forbidden** - Accès non autorisé
```json
{
  "error": "Access denied"
}
```

**404 Not Found** - Ressource non trouvée
```json
{
  "error": "Resource not found"
}
```

**409 Conflict** - Ressource déjà existante
```json
{
  "error": "Already exists"
}
```

**500 Internal Server Error**
```json
{
  "error": "Internal Server Error",
  "errorId": "uuid-for-tracking"
}
```

---

## 📝 Exemples de Workflow

### Workflow Étudiant

1. **Inscription**
   ```bash
   POST /api/v1/auth/register
   { role: "student", ... }
   → Reçoit TOKEN
   ```

2. **Voir les stages disponibles**
   ```bash
   GET /api/v1/internships?status=active
   ```

3. **Postuler**
   ```bash
   POST /api/v1/applications
   { internship_id: "..." }
   ```

4. **Voir ses candidatures**
   ```bash
   GET /api/v1/applications
   ```

5. **Voir son évaluation**
   ```bash
   GET /api/v1/evaluations
   ```

---

### Workflow Hôpital

1. **Inscription**
   ```bash
   POST /api/v1/auth/register
   { role: "hospital", ... }
   → Reçoit TOKEN
   ```

2. **Créer une offre de stage**
   ```bash
   POST /api/v1/internships
   { title: "...", ... }
   ```

3. **Voir les candidatures**
   ```bash
   GET /api/v1/applications
   ```

4. **Accepter/Refuser une candidature**
   ```bash
   PATCH /api/v1/applications/:id/status
   { status: "accepted" }
   ```

---

## 🧪 Tests

### Avec cURL

```bash
# Register
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "password123",
    "first_name": "John",
    "last_name": "Doe",
    "role": "student",
    "matricule": "202231269705",
    "specialization": "Chirurgie"
  }'

# Login
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "test@test.com",
    "password": "password123",
    "role": "student"
  }'

# Get Profile
curl -X GET http://localhost:4000/api/v1/users/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🚨 Dépannage

### "Error: SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string"

**Solution:**
1. Vérifier que PostgreSQL est en cours d'exécution
2. Vérifier que la base `stagelink` existe
3. Vérifier le `.env` ne contient PAS de guillemets:
   ```
   # ✅ Correct
   DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/stagelink
   
   # ❌ Incorrect
   DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/stagelink"
   ```

### "Cannot find module 'cors'"

**Solution:**
```bash
npm install cors helmet jsonwebtoken bcryptjs joi uuid
```

---

## 📞 Support

En cas de problème:
1. Vérifie que PostgreSQL est en cours d'exécution
2. Vérif que la base de données existe
3. Vérifie les logs du serveur
4. Redémarre le serveur: `npm run dev`

