# 📝 TodoListe - Application de Gestion de Tâches Avancée avec Dates et Auto-Complétion

```bash

#pour le backend

npm install #pour installer les dependences
npm run prisma:setup #pour migrerla base
 npm run seed #pour initialiser les donnees essss kham lima wakhhh

 *** Comptes de test** :
- alice@example.com / password123
- bob@example.com / password123
- charlie@example.com / password123

  npm run  #pour executer le project dev
  npm run serve #pour executer le project prod

#pour le frond
cd Client/my-project && npm run dev
```

## Vue d'Ensemble du Projet

TodoListe est une application **Full-Stack** moderne combinant **backend Node.js/TypeScript** et **frontend React/Vite**. Elle offre une gestion avancée des tâches avec système de permissions collaboratives et fonctionnalités temporelles automatisées.

###  Flux de Fonctionnement

```
Utilisateur → Frontend React → API REST → Backend Node.js → Base MySQL
                                      ↓
Auto-Complétion ← Vérification Temps Réel (30s/60s)
```

###  Fonctionnalités Clés

- *** Authentification JWT** : Sécurité et sessions persistantes
- *** Gestion de Tâches** : CRUD complet avec médias (photos/audio)
- *** Permissions Collaboratives** : Partage et droits d'accès
- *** Gestion Temporelle** : Dates début/fin avec calcul automatique de durée
- *** Auto-Complétion** : Tâches terminées automatiquement à l'échéance
- *** Historique d'Actions** : Traçabilité complète des modifications
- *** Interface Responsive** : Design moderne et adaptatif

---

##  Architecture Détaillée

TodoListe est une application web complète de gestion de tâches avec système de permissions collaboratives et fonctionnalités temporelles avancées. Elle permet aux utilisateurs de créer, modifier et partager leurs tâches avec d'autres utilisateurs, avec gestion automatique des échéances.

### Fonctionnalités Principales

- **Authentification** : Inscription, connexion, déconnexion sécurisée
- **Gestion des Tâches** : Créer, modifier, supprimer, changer l'état des tâches
- **Upload de Médias** : Ajouter des images et enregistrements audio aux tâches
- **Système de Permissions** : Partager des tâches avec d'autres utilisateurs
- **Gestion Temporelle** : Dates de début et fin avec calcul automatique de durée
- **Auto-Complétion** : Tâches marquées automatiquement comme terminées à l'échéance
- **Historique d'Actions** : Suivi des modifications et actions sur les tâches
- **Dashboard** : Vue d'ensemble de toutes les tâches
- **Interface Responsive** : Design moderne avec Tailwind CSS

###  Fonctionnalités Temporelles Avancées

#### Gestion des Dates
- **Date de Début** : Planification du commencement des tâches
- **Date de Fin** : Définition des échéances
- **Calcul Automatique** : Durée calculée dynamiquement (jours, heures, minutes)
- **Validation** : Vérification que la date de fin est postérieure à la date de début

#### Auto-Complétion Intelligente
- **Vérification Serveur** : Contrôle automatique toutes les 60 secondes
- **Vérification Frontend** : Contrôle supplémentaire toutes les 30 secondes
- **Indicateurs Visuels** : Badges spéciaux pour les tâches auto-complétées
- **Transparence** : Explication claire du pourquoi de la complétion

## Architecture du Projet

```
TodoListe/
├──  Backend (Node.js + TypeScript)
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
└──  Frontend (React + Vite)
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

