# 🏥 StageConnect Backend

Backend Express.js + PostgreSQL pour la plateforme StageConnect de gestion d'internships médicaux.

## 📋 Prérequis

- **Node.js** >= 16
- **PostgreSQL** >= 12
- **npm** ou **yarn**

---

## ⚙️ Installation

### 1. Installer les dépendances

```bash
cd backend
npm install
```

### 2. Configurer PostgreSQL

#### Via pgAdmin (Interface Graphique)

1. Ouvre pgAdmin: `http://localhost:5050`
2. Connecte-toi avec:
   - **Email**: `postgres@pgadmin.org`
   - **Password**: `admin`
3. Navigue vers **Servers** → **PostgreSQL**
4. Clic droit sur **Databases** → **Create** → **Database**
5. Remplis:
   - **Name**: `stagelink`
   - **Owner**: `postgres`
6. Clique **Save**

#### Via Command Line (psql)

```bash
psql -U postgres

# Dans psql:
CREATE DATABASE stagelink;
\l  # Vérifier que la base existe
\q  # Quitter
```

### 3. Configurer les variables d'environnement

Crée un fichier `.env` dans le dossier `backend`:

```bash
# backend/.env
DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/stagelink
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=4000
NODE_ENV=development
```

**Remplace:**
- `postgres123` par le mot de passe PostgreSQL que tu as défini
- `your-super-secret-jwt-key-change-in-production` par une clé secrète complexe

### 4. Initialiser la base de données

```bash
npm run init:db
```

Cela créera toutes les tables et indexes nécessaires.

---

## 🚀 Démarrage

### Mode Développement
```bash
npm run dev
```

Le serveur démarrera sur `http://localhost:4000`

Logs:
```
✅ Server listening on http://localhost:4000
📚 API Base: http://localhost:4000/api/v1
🗄️ Database URL: postgresql://postgres:postgres123@localhost:5432/stagelink
```

### Mode Production
```bash
npm run build
npm run start
```

---

## 📁 Structure du Projet

```
backend/
├── src/
│   ├── db/
│   │   ├── connection.ts      # Configuration PostgreSQL
│   │   └── init.ts            # Initialisation base de données
│   ├── middleware/
│   │   ├── auth.ts            # Authentification JWT
│   │   └── errorHandler.ts    # Gestion d'erreurs
│   ├── routes/
│   │   ├── auth.ts            # Routes d'authentification
│   │   ├── users.ts           # Profil utilisateur
│   │   ├── internships.ts     # Gestion des stages
│   │   ├── applications.ts    # Gestion des candidatures
│   │   └── evaluations.ts     # Évaluations des stagiaires
│   ├── types/
│   │   └── index.ts           # Types TypeScript
│   ├── utils/
│   │   ├── jwt.ts             # Génération/Vérification JWT
│   │   ├── password.ts        # Hash et comparaison mots de passe
│   │   └── validation.ts      # Validation des données
│   ├── server.ts              # Point d'entrée
│   └── middleware/
│       └── index.ts           # Export des middlewares
├── .env                       # Variables d'environnement
├── package.json
└── tsconfig.json
```

---

## 🔐 Authentification

Tous les endpoints (sauf `/auth/register` et `/auth/login`) nécessitent un token JWT dans le header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Token valide pour **7 jours**.

---

## 📚 API Endpoints

### Authentification
- `POST /api/v1/auth/register` - S'inscrire
- `POST /api/v1/auth/login` - Se connecter
- `GET /api/v1/auth/verify` - Vérifier le token

### Utilisateurs
- `GET /api/v1/users/me` - Profil personnel
- `PUT /api/v1/users` - Mettre à jour le profil
- `GET /api/v1/users/stats` - Statistiques

### Stages
- `GET /api/v1/internships` - Lister les stages
- `GET /api/v1/internships/:id` - Détails d'un stage
- `POST /api/v1/internships` - Créer un stage (Hôpitaux)
- `PUT /api/v1/internships/:id` - Modifier un stage (Hôpitaux)
- `DELETE /api/v1/internships/:id` - Supprimer un stage (Hôpitaux)

### Candidatures
- `GET /api/v1/applications` - Lister les candidatures
- `POST /api/v1/applications` - Postuler (Étudiants)
- `PATCH /api/v1/applications/:id/status` - Accepter/Refuser (Hôpitaux)
- `DELETE /api/v1/applications/:id` - Retirer candidature (Étudiants)

### Évaluations
- `GET /api/v1/evaluations` - Lister les évaluations
- `POST /api/v1/evaluations` - Créer une évaluation (Médecins)
- `PATCH /api/v1/evaluations/:id` - Modifier une évaluation (Médecins)

**Documentation complète:** Voir `API_DOCUMENTATION.md`

---

## 👥 Rôles et Permissions

### Student (Étudiant)
- ✅ Voir les stages disponibles
- ✅ Postuler aux stages
- ✅ Voir ses candidatures
- ✅ Voir ses évaluations
- ❌ Créer des stages
- ❌ Évaluer

### Hospital (Établissement)
- ✅ Créer/Modifier/Supprimer des stages
- ✅ Voir les candidatures pour leurs stages
- ✅ Accepter/Refuser les candidatures
- ❌ Postuler aux stages
- ❌ Évaluer les stagiaires

### Doctor (Médecin)
- ✅ Voir les interns
- ✅ Créer/Modifier les évaluations
- ❌ Créer des stages
- ❌ Postuler

### Admin (Administration)
- ✅ Accès complet

---

## 🗄️ Base de Données

### Tables Principales

**users** - Base pour tous les utilisateurs
- `id` UUID PRIMARY KEY
- `email` VARCHAR UNIQUE
- `password` VARCHAR (hashé)
- `first_name`, `last_name` VARCHAR
- `role` VARCHAR (student|hospital|doctor|admin)
- `phone`, `address` VARCHAR
- `created_at`, `updated_at` TIMESTAMP

**students** - Données des étudiants
- `id` UUID REFERENCES users
- `matricule` VARCHAR UNIQUE (12 chiffres)
- `specialization` VARCHAR
- `university` VARCHAR

**hospitals** - Données des établissements
- `id` UUID REFERENCES users
- `hospital_name` VARCHAR
- `registration_number` VARCHAR UNIQUE
- `city` VARCHAR
- `verified` BOOLEAN

**doctors** - Données des médecins
- `id` UUID REFERENCES users
- `license_number` VARCHAR UNIQUE
- `specialization` VARCHAR
- `hospital_id` UUID REFERENCES hospitals
- `experience_years` INTEGER

**internships** - Offres de stage
- `id` UUID PRIMARY KEY
- `title`, `description` VARCHAR/TEXT
- `hospital_id` UUID REFERENCES hospitals
- `department` VARCHAR
- `positions` INTEGER
- `duration_months` INTEGER
- `start_date`, `end_date` DATE
- `status` VARCHAR (draft|active|closed)

**applications** - Candidatures
- `id` UUID PRIMARY KEY
- `student_id` UUID REFERENCES students
- `internship_id` UUID REFERENCES internships
- `status` VARCHAR (pending|accepted|rejected|withdrawn)
- `applied_at` TIMESTAMP

**evaluations** - Évaluations
- `id` UUID PRIMARY KEY
- `student_id` UUID REFERENCES students
- `doctor_id` UUID REFERENCES doctors
- `internship_id` UUID REFERENCES internships
- `rating` DECIMAL (0-5)
- `feedback` TEXT
- `competencies` JSONB

---

## 🧪 Tests API

### Avec Postman

1. Crée une collection "StageConnect"
2. Ajoute les requests d'exemple dans `API_DOCUMENTATION.md`
3. Configure une variable d'environnement:
   ```json
   {
     "url": "http://localhost:4000/api/v1",
     "token": "your-token-here"
   }
   ```

### Avec cURL

```bash
# Register
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123",
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
    "identifier": "test@example.com",
    "password": "Password123",
    "role": "student"
  }'

# Get Profile (remplace TOKEN)
curl -X GET http://localhost:4000/api/v1/users/me \
  -H "Authorization: Bearer TOKEN"
```

---

## 🔧 Maintenance

### Vérifier la santé du serveur
```bash
curl http://localhost:4000/api/health
```

### Réinitialiser la base de données
```bash
# Supprimer et recréer les tables
npm run init:db
```

### Consulter les logs
Les logs s'affichent dans le terminal

### Redémarrer le serveur
```bash
Ctrl + C  # Arrêter
npm run dev  # Relancer
```

---

## ⚠️ Problèmes Courants

### "Cannot connect to database"
1. Vérifier que PostgreSQL est en cours d'exécution
2. Vérifier que la base `stagelink` existe
3. Vérifier les credentials dans `.env`

### "Cannot find module 'cors'"
```bash
npm install
```

### "Invalid token"
- Le token a peut-être expiré (7 jours)
- Se reconnecter pour obtenir un nouveau token

### "Access denied"
- Vérifier les permissions du rôle
- Vérifier le token envoyé

---

## 🚀 Déploiement

### Sur Vercel/Heroku

1. Créer une base PostgreSQL cloud (AWS RDS, Heroku Postgres, etc.)
2. Mettre à jour `DATABASE_URL` avec la chaîne de connexion cloud
3. Définir `JWT_SECRET` fort en production
4. Déployer:

```bash
# Vercel
vercel deploy

# Heroku
heroku create stage-connect-api
git push heroku main
```

---

## 📞 Support

En cas de problème, vérifier:
1. Les logs du terminal
2. La connexion PostgreSQL
3. Les variables `.env`
4. La documentation API

---

## 📄 License

MIT

