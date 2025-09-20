# school-api

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
