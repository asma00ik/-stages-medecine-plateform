# 🚀 Guide de Démarrage Rapide - StageConnect Backend

## Étape 1: Vérifier PostgreSQL est Installé

### Windows
1. Ouvre le **Menu Démarrer** → Tape `services.msc`
2. Recherche `postgresql-x64-18` ou similaire
3. Si c'est **arrêté**, clic-droit → **Start**
4. Si c'est **en cours d'exécution** ✅

### macOS
```bash
brew services list | grep postgresql
# Si arrêté:
brew services start postgresql
```

### Linux
```bash
sudo systemctl status postgresql
# Si arrêté:
sudo systemctl start postgresql
```

---

## Étape 2: Accéder à pgAdmin

1. Ouvre le navigateur: `http://localhost:5050`
2. Identifiants par défaut:
   - **Email**: `postgres@pgadmin.org`
   - **Mot de passe**: `admin`

---

## Étape 3: Créer la Base de Données

### Méthode 1: Avec pgAdmin (Interface Graphique)

1. Dans **Servers** → clic droit → **Create** → **Server**
   - **Name**: PostgreSQL
   - **Host**: localhost
   - **Port**: 5432
   - **Username**: postgres
   - **Password**: postgres123

2. Clic sur le serveur PostgreSQL créé
3. Clic-droit sur **Databases** → **Create** → **Database**
   - **Name**: `stagelink`
   - **Owner**: `postgres`
   - Clic **Save**

### Méthode 2: Avec psql (Terminal)

```bash
# Windows
psql -U postgres

# macOS/Linux
sudo -u postgres psql

# Dans psql:
CREATE DATABASE stagelink;
\l
\q
```

---

## Étape 4: Initialiser les Tables

### Méthode 1: Exécuter le SQL via pgAdmin

1. Ouvre pgAdmin
2. Clic sur **stagelink** → **Query Tool**
3. Copie-colle le contenu de `backend/init.sql`
4. Clic le bouton ▶️ pour exécuter

### Méthode 2: Via psql

```bash
psql -U postgres -d stagelink -f backend/init.sql
```

---

## Étape 5: Configurer le Backend

### 1. Installer les dépendances
```bash
cd backend
npm install
```

### 2. Créer le fichier `.env`
```bash
# Crée backend/.env
DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/stagelink
JWT_SECRET=my-super-secret-jwt-key-change-in-production
PORT=4000
NODE_ENV=development
```

### 3. Lancer le serveur
```bash
npm run dev
```

**Logs attendus:**
```
✅ Server listening on http://localhost:4000
📚 API Base: http://localhost:4000/api/v1
⚠️  Running without database initialization - tables may not exist
```

---

## Étape 6: Tester l'API

### Health Check
```bash
curl http://localhost:4000/api/health
# Réponse:
# {"ok":true,"db":true}
```

### S'inscrire
```bash
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@test.com",
    "password": "Password123!",
    "first_name": "Ahmed",
    "last_name": "Benali",
    "role": "student",
    "matricule": "202231269705",
    "specialization": "Chirurgie Générale",
    "university": "Université de Médecine d'\''Alger"
  }'
```

### Se connecter
```bash
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identifier": "student@test.com",
    "password": "Password123!",
    "role": "student"
  }'
```

---

## Résumé des Commandes Essentielles

```bash
# Démarrer PostgreSQL
# Windows: Services → PostgreSQL → Start
# macOS: brew services start postgresql
# Linux: sudo systemctl start postgresql

# Accéder à pgAdmin
# http://localhost:5050

# Créer la base et tables
# Via pgAdmin: Copy-Paste init.sql dans Query Tool
# Via Terminal: psql -U postgres -d stagelink -f backend/init.sql

# Démarrer le backend
cd backend
npm install
npm run dev

# Tester l'API
curl http://localhost:4000/api/health
```

---

## ✅ Checklist Finale

- [ ] PostgreSQL est en cours d'exécution
- [ ] Base de données `stagelink` créée
- [ ] Tables créées (via init.sql)
- [ ] backend/.env configuré
- [ ] `npm install` exécuté
- [ ] `npm run dev` démarre sans erreurs
- [ ] `curl http://localhost:4000/api/health` retourne `{"ok":true}`

---

## 🆘 Problèmes Courants

### "Cannot connect to database"
```bash
# Vérifier PostgreSQL est en cours d'exécution
psql -U postgres -c "SELECT 1"
# Si erreur, démarrer PostgreSQL
```

### "Database does not exist"
```bash
# Créer la base via pgAdmin ou:
createdb -U postgres stagelink
```

### "No tables found"
```bash
# Exécuter init.sql dans pgAdmin Query Tool
# Ou via terminal:
psql -U postgres -d stagelink -f backend/init.sql
```

### "Cannot find module 'cors'"
```bash
cd backend && npm install
```

---

## 📚 Prochaines Étapes

1. Voir `backend/API_DOCUMENTATION.md` pour tous les endpoints
2. Voir `backend/README.md` pour la documentation complète
3. Integrer le frontend avec le backend (voir frontend/BACKEND_INTEGRATION.md)

---

## 📞 Support

Besoin d'aide?
1. Vérifier les logs du terminal
2. Vérifier la connexion PostgreSQL
3. Vérifier le .env
4. Consulter la documentation API

