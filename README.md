# 📝 TodoListe - Application de Gestion de Tâches avec Permissions

## 🎯 Description du Projet

TodoListe est une application web complète de gestion de tâches avec système de permissions collaboratives. Elle permet aux utilisateurs de créer, modifier et partager leurs tâches avec d'autres utilisateurs.

### ✨ Fonctionnalités Principales

- **Authentification** : Inscription, connexion, déconnexion sécurisée
- **Gestion des Tâches** : Créer, modifier, supprimer, changer l'état des tâches
- **Upload de Photos** : Ajouter des images aux tâches
- **Système de Permissions** : Partager des tâches avec d'autres utilisateurs
- **Dashboard** : Vue d'ensemble de toutes les tâches
- **Interface Responsive** : Design moderne avec Tailwind CSS

## 🏗️ Architecture du Projet

```
TodoListe/
├── 📁 Backend (Node.js + TypeScript)
│   ├── src/
│   │   ├── controllers/     # Logique métier
│   │   ├── services/        # Services de l'application
│   │   ├── repositories/    # Accès aux données
│   │   ├── middlewares/     # Middlewares (auth, upload, etc.)
│   │   ├── routes/          # Routes API
│   │   ├── validator/       # Validation des données
│   │   └── interfaces/      # Types TypeScript
│   ├── prisma/              # Base de données et migrations
│   ├── uploads/             # Stockage des images
│   └── package.json
└── 📁 Frontend (React + Vite)
    ├── src/
    │   ├── components/      # Composants réutilisables
    │   ├── pages/           # Pages de l'application
    │   ├── context/         # Gestion d'état globale
    │   ├── hooks/           # Hooks personnalisés
    │   ├── services/        # Communication avec l'API
    │   └── utils/           # Utilitaires
    └── package.json
```

## 🛠️ Technologies Utilisées

### Backend
- **Node.js** : Runtime JavaScript
- **TypeScript** : Typage statique
- **Express.js** : Framework web
- **Prisma** : ORM pour base de données
- **MySQL** : Base de données
- **bcryptjs** : Hachage des mots de passe
- **jsonwebtoken** : Authentification JWT
- **multer** : Upload de fichiers
- **zod** : Validation des données

### Frontend
- **React 18** : Framework UI
- **Vite** : Outil de build rapide
- **Tailwind CSS** : Framework CSS utilitaire
- **React Router** : Navigation
- **Lucide React** : Icônes
- **Axios** : Client HTTP

---

## 🚀 Installation Complète - Guide Étape par Étape

### Prérequis

Assurez-vous d'avoir installé :
- **Node.js** (version 18+) : [Télécharger ici](https://nodejs.org/)
- **MySQL** : [Télécharger ici](https://dev.mysql.com/downloads/)
- **Git** : [Télécharger ici](https://git-scm.com/)

---

## 📦 ÉTAPE 1 : Configuration de la Base de Données

### 1.1 Créer la base de données MySQL

```bash
# Se connecter à MySQL
mysql -u root -p

# Créer la base de données
CREATE DATABASE mydb1;

# Quitter MySQL
exit;
```

---

## 🔧 ÉTAPE 2 : Installation du Backend

### 2.1 Cloner et configurer le projet

```bash
# Cloner le projet
git clone <URL_DU_REPO>
cd TodoListe

# Installer les dépendances backend
npm install
```

### 2.2 Créer le fichier .env

Créez un fichier `.env` à la racine du projet backend :

```env
# Base de données
DATABASE_URL="mysql://root:votre_mot_de_passe@localhost:3306/mydb1"

# JWT Secret (générez une clé secrète forte)
JWT_SECRET="votre_jwt_secret_tres_securise_ici"

# Port du serveur
PORT=3000
```

### 2.3 Configurer Prisma

```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate dev

# (Optionnel) Voir la base de données
npx prisma studio
```

### 2.4 Démarrer le serveur backend

```bash
# Mode développement
npm run dev

# Le serveur démarre sur http://localhost:3000
```

---

## 🎨 ÉTAPE 3 : Installation du Frontend

### 3.1 Naviguer vers le dossier frontend

```bash
# Aller dans le dossier frontend
cd Client/my-project
```

### 3.2 Installer les dépendances

```bash
# Installer toutes les dépendances
npm install

# Dépendances principales déjà dans package.json :
# - react, react-dom
# - react-router-dom
# - axios
# - lucide-react
# - tailwindcss
```

### 3.3 Démarrer le serveur frontend

```bash
# Mode développement
npm run dev

# Le frontend démarre sur http://localhost:5173
```

---

## 🗂️ ÉTAPE 4 : Structure des Fichiers Backend

### 4.1 Schéma de Base de Données (prisma/schema.prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

enum Etat {
  ENCOURS
  TERMINER
}

model Task {
  id           Int      @id @default(autoincrement())
  titre        String
  description  String
  etat         Etat     @default(ENCOURS)
  userId       Int
  user         User     @relation(fields: [userId], references: [id])
  allowedUsers User[]   @relation("AllowedTasks")
  photo        String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model User {
  id           Int      @id @default(autoincrement())
  nom          String
  email        String   @unique
  password     String
  tasks        Task[]
  allowedTasks Task[]   @relation("AllowedTasks")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

### 4.2 Routes Principales (src/app.ts)

```typescript
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.router.js';
import taskRouter from './routes/task.router.js';

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/users', userRouter);
app.use('/tasks', taskRouter);

export default app;
```

---

## 🎭 ÉTAPE 5 : Structure des Fichiers Frontend

### 5.1 Point d'Entrée (src/main.jsx)

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 5.2 Application Principale (src/App.jsx)

```jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { TasksProvider } from './context/TasksContext.jsx';

// Pages
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Tasks from './pages/Tasks.jsx';
import TaskDetail from './pages/TaskDetail.jsx';
import PermissionsGuide from './pages/PermissionsGuide.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TasksProvider>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
              <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetail /></ProtectedRoute>} />
              <Route path="/permissions-guide" element={<ProtectedRoute><PermissionsGuide /></ProtectedRoute>} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </TasksProvider>
      </AuthProvider>
    </Router>
  );
}
```

---

## 🔐 ÉTAPE 6 : Système d'Authentification

### 6.1 Service d'Authentification (src/services/auth.js)

```javascript
import api from './api.js';

export const authService = {
  // Inscription
  register: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // Connexion
  login: async (credentials) => {
    const response = await api.post('/users/auth', credentials);
    return response.data;
  },

  // Déconnexion
  logout: async () => {
    const response = await api.post('/users/logout');
    return response.data;
  },

  // Récupérer l'utilisateur connecté
  getCurrentUser: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  // Récupérer tous les utilisateurs
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
};
```

### 6.2 Contexte d'Authentification (src/context/AuthContext.jsx)

```jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authService.getCurrentUser();
        const actualUser = userData.data || userData;
        setUser(actualUser);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    const userData = await authService.login(credentials);
    const actualUser = userData.data || userData;
    setUser(actualUser);
    return actualUser;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 📋 ÉTAPE 7 : Gestion des Tâches

### 7.1 Service des Tâches (src/services/tasks.js)

```javascript
import api from './api.js';

export const tasksService = {
  // Récupérer toutes les tâches
  getAllTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  // Récupérer les tâches de l'utilisateur
  getUserTasks: async () => {
    const response = await api.get('/tasks/tasksuser');
    return response.data;
  },

  // Récupérer une tâche par ID
  getTaskById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Créer une tâche
  createTask: async (taskData) => {
    const formData = new FormData();
    Object.keys(taskData).forEach(key => {
      if (key !== 'photo') {
        formData.append(key, taskData[key]);
      }
    });
    if (taskData.photo) {
      formData.append('photo', taskData.photo);
    }
    const response = await api.post('/tasks', formData);
    return response.data;
  },

  // Mettre à jour une tâche
  updateTask: async (id, taskData) => {
    const formData = new FormData();
    Object.keys(taskData).forEach(key => {
      if (key !== 'photo') {
        formData.append(key, taskData[key]);
      }
    });
    if (taskData.photo) {
      formData.append('photo', taskData.photo);
    }
    const response = await api.put(`/tasks/${id}`, formData);
    return response.data;
  },

  // Supprimer une tâche
  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  // Changer l'état d'une tâche
  updateTaskState: async (id, etat) => {
    const response = await api.patch(`/tasks/${id}/etat`, { etat });
    return response.data;
  },

  // Ajouter une permission
  addPermission: async (taskId, userId) => {
    const response = await api.post(`/tasks/${taskId}/permission`, { userId });
    return response.data;
  }
};
```

---

## 📖 Documentation de l'API

### Endpoint : `/history`

- **Méthode** : `GET`
- **Description** : Récupère l'historique des actions effectuées sur les tâches.
- **Réponse** : Retourne un tableau d'objets contenant les informations suivantes :
  - `id` : Identifiant de l'action
  - `action` : Type d'action (`CREATE`, `READ`, `UPDATE`, `DELETE`)
  - `details` : Détails supplémentaires sur l'action
  - `createdAt` : Date et heure de l'action
  - `task` : Informations sur la tâche associée (titre, description, etc.)
  - `user` : Informations sur l'utilisateur ayant effectué l'action (id, nom, email)

#### Exemple de Requête

```bash
curl -X GET http://localhost:3000/history -H "Authorization: Bearer <votre_token>"
```

#### Exemple de Réponse

```json
[
  {
    "id": 1,
    "action": "UPDATE",
    "details": "Modification de la description",
    "createdAt": "2025-09-22T10:00:00.000Z",
    "task": {
      "id": 101,
      "titre": "Acheter des courses",
      "description": "Acheter du lait, du pain et des œufs",
      "photo": null,
      "etat": "ENCOURS"
    },
    "user": {
      "id": 5,
      "nom": "Jean Dupont",
      "email": "jean.dupont@example.com"
    }
  }
]
```

---

## 🎨 ÉTAPE 8 : Interface Utilisateur

### 8.1 Configuration Tailwind (tailwind.config.js)

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 8.2 Styles CSS (src/index.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

---

## 🔧 ÉTAPE 9 : Démarrage des Serveurs

### 9.1 Terminal 1 - Backend

```bash
# Dans le dossier racine TodoListe/
cd TodoListe
npm run dev

# Le serveur backend démarre sur http://localhost:3000
```

### 9.2 Terminal 2 - Frontend

```bash
# Dans le dossier frontend
cd TodoListe/Client/my-project
npm run dev

# Le serveur frontend démarre sur http://localhost:5173
```

---

## 🎯 ÉTAPE 10 : Utilisation de l'Application

### 10.1 Première Utilisation

1. **Ouvrir** http://localhost:5173 dans votre navigateur
2. **S'inscrire** avec un nouvel utilisateur
3. **Se connecter** avec vos identifiants
4. **Créer** votre première tâche
5. **Tester** les fonctionnalités (modifier, changer l'état, etc.)

### 10.2 Tester le Système de Permissions

1. **Créer** un deuxième utilisateur (ouvrir un onglet privé)
2. **Se connecter** avec le premier utilisateur
3. **Aller** sur une tâche et cliquer "Voir"
4. **Cliquer** sur "Ajouter utilisateur"
5. **Sélectionner** le deuxième utilisateur
6. **Se connecter** avec le deuxième utilisateur pour voir la tâche partagée

---

## 📚 ÉTAPE 11 : APIs Principales

### 11.1 Routes Utilisateur

```
POST   /users           # Inscription
POST   /users/auth      # Connexion
GET    /users/me        # Profil utilisateur
GET    /users           # Liste des utilisateurs
POST   /users/logout    # Déconnexion
```

### 11.2 Routes Tâches

```
GET    /tasks           # Toutes les tâches
GET    /tasks/tasksuser # Tâches de l'utilisateur
GET    /tasks/:id       # Tâche par ID
POST   /tasks           # Créer une tâche
PUT    /tasks/:id       # Modifier une tâche
DELETE /tasks/:id       # Supprimer une tâche
PATCH  /tasks/:id/etat  # Changer l'état
POST   /tasks/:id/permission # Ajouter permission
```

---

## 🛠️ ÉTAPE 12 : Dépannage et Solutions

### 12.1 Problèmes Courants

#### Erreur de Connexion à la Base de Données
```bash
# Vérifier que MySQL est démarré
sudo service mysql start

# Vérifier la connexion
mysql -u root -p
```

#### Erreur de Migration Prisma
```bash
# Réinitialiser la base de données
npx prisma migrate reset

# Régénérer le client
npx prisma generate
```

#### Erreur CORS Frontend/Backend
```typescript
// Dans app.ts, vérifier la configuration CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### 12.2 Scripts Utiles

```json
{
  "scripts": {
    "dev": "nodemon --watch src --exec \"node --loader ts-node/esm src/server.ts\"",
    "build": "tsc",
    "start": "node dist/server.js",
    "prisma:studio": "npx prisma studio",
    "prisma:reset": "npx prisma migrate reset",
    "prisma:generate": "npx prisma generate"
  }
}
```

---

## 📖 ÉTAPE 13 : Guide des Fonctionnalités

### 13.1 Authentification
- **Inscription** : Créer un compte avec nom, email, mot de passe
- **Connexion** : Se connecter avec email/mot de passe
- **Cookies Sécurisés** : JWT stocké dans des cookies HttpOnly

### 13.2 Gestion des Tâches
- **Créer** : Titre, description, photo optionnelle
- **États** : EN COURS ou TERMINÉ
- **Modifier** : Tous les champs éditables
- **Supprimer** : Suppression définitive

### 13.3 Système de Permissions
- **Propriétaire** : Contrôle total de la tâche
- **Collaborateur** : Peut voir et modifier (pas supprimer)
- **Partage** : Interface de sélection d'utilisateurs

### 13.4 Interface
- **Dashboard** : Vue d'ensemble de toutes les tâches
- **Mes Tâches** : Tâches personnelles avec actions
- **Détail Tâche** : Vue complète avec permissions
- **Responsive** : Adapté mobile/desktop

---

## 🏃‍♂️ Démarrage Rapide (Pour les Plus Pressés)

```bash
# 1. Cloner et installer
git clone <URL_REPO>
cd TodoListe
npm install

# 2. Configurer MySQL et .env
mysql -u root -p
CREATE DATABASE mydb1;
echo 'DATABASE_URL="mysql://root:password@localhost:3306/mydb1"
JWT_SECRET="your-secret-key"' > .env

# 3. Base de données
npx prisma generate
npx prisma migrate dev

# 4. Démarrer backend (Terminal 1)
npm run dev

# 5. Démarrer frontend (Terminal 2)
cd Client/my-project
npm install
npm run dev

# 6. Ouvrir http://localhost:5173
```

---

## 🤝 Contribution

Pour contribuer au projet :

1. **Fork** le repository
2. **Créer** une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Commit** vos changements (`git commit -m 'Ajouter nouvelle fonctionnalité'`)
4. **Push** vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. **Créer** une Pull Request

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 👨‍💻 Auteur

Développé avec ❤️ pour l'apprentissage du développement Full-Stack JavaScript/TypeScript.

---

**🎉 Félicitations ! Vous avez maintenant une application TodoListe complète avec système de permissions !**

N'hésitez pas à personnaliser et étendre les fonctionnalités selon vos besoins.

Petite API Node + Express + Prisma (MySQL) pour gérer des Users et leurs Tasks.

But: fournir des instructions rapides pour installer, lancer et tester les endpoints d'authentification et de tâches (création/autorisation/mise à jour).

Prérequis
- Node.js 18+ et npm
- MySQL accessible et URL renseignée dans le `.env` comme `DATABASE_URL`.

Installation

```bash
# depuis la racine du projet
npm install
```

Configuration

Copiez le fichier `.env.example` (ou créez un `.env`) et définissez `DATABASE_URL` et `JWT_SECRET`:

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET=une_phrase_secrete_pour_tests
```

Générer Prisma client et appliquer les migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Lancer en développement

```bash
npx ts-node src/server.ts
# ou si vous préférez nodemon
npx nodemon --watch src --exec "npx ts-node src/server.ts"
```

Endpoints & tests rapides (curl)

1) Inscription d'un utilisateur

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"nom":"Alice","email":"alice@example.com","password":"password"}'
```

2) Login (récupère un token)

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password"}'
```

La réponse contient un `token` JWT. Exportez-le pour les étapes suivantes:

```bash
export TOKEN="<valeur_du_token>"
```

3) Créer une task (utilisateur connecté)

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"titre":"Ma tache","description":"desc"}'
```

4) Autoriser un autre utilisateur à modifier la task (seulement propriétaire)

Supposons que vous avez créé un second utilisateur (id 2). Pour autoriser l'utilisateur 2 sur la task id 1:

```bash
curl -X POST http://localhost:3000/tasks/1/allow \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"userId":2}'
```

5) Modifier la task (en tant qu'utilisateur autorisé)

Connectez-vous en tant qu'utilisateur autorisé (récupérez son token), puis:

```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Authorization: Bearer $OTHER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"titre":"Titre modifié"}'
```

Notes
- Les routes exactes (`/users/register`, `/users/login`, `/tasks`, `/tasks/:id/allow`) supposent que vos routeurs ont ces chemins; adaptez si besoin.
- Si vous rencontrez des erreurs TypeScript liées aux types Prisma après modification du schema, exécutez `npx prisma generate` puis `npx tsc --noEmit`.

Si vous voulez, je peux:
- ajouter un `scripts.start` et `scripts.dev` dans `package.json` pour démarrer facilement;
- fournir un `.env.example` minimal;
- créer des tests automatisés super-minimaux.
# NodeJsTodoListe
