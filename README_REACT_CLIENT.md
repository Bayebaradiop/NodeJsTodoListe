README — Comment consommer cette API depuis une app React (Vite + Tailwind + Lucide-React)

Ce document explique comment créer un client React moderne (Vite) qui consomme l'API fournie dans ce repo. Il couvre l'installation, l'authentification (HttpOnly cookies), l'upload d'images et l'utilisation d'icônes avec `lucide-react`.

Table des matières
- Pré-requis
- Créer l'app React (Vite)
- Installer Tailwind CSS
- Installer Lucide (icônes)
- Exemples d'auth (login/logout) en utilisant cookie HttpOnly
- Exemples d'appel API (fetch) pour créer une task avec photo
- CORS et configuration serveur
- Notes sur la sécurité & bonnes pratiques

Pré-requis
- Node.js >= 18
- Ce backend en cours d'exécution sur http://localhost:3000 (ou ajustez BASE_URL)

Créer l'app React (Vite)

1) Génération du projet

```bash
npm create vite@latest my-client -- --template react-ts
cd my-client
npm install
```

2) Installer Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Modifier `tailwind.config.cjs` :
```js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```

Ajouter dans `src/index.css` :
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3) Installer Lucide-React

```bash
npm install lucide-react
```

Auth (login/logout) — cookie HttpOnly

Important : le serveur doit renvoyer le cookie HttpOnly (ex : `acces_token`) lors du login. Le client React ne peut pas accéder à ce cookie via JavaScript, mais le navigateur l'enverra automatiquement pour les requêtes vers le même domaine (ou si `withCredentials` configuré si domaine différent).

1) Fichier `src/services/api.ts` : wrapper fetch

```ts
const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

export async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include', // important pour cookies HttpOnly cross-site
    headers: {
      'Accept': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText} - ${text}`);
  }
  return res.json().catch(() => null);
}
```

2) Login form (utilise `credentials: 'include'` pour recevoir et stocker cookie):

```tsx
import { useState } from 'react';
import { apiFetch } from './services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await fetch('http://localhost:3000/api/users/auth', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    // cookie HttpOnly stocké par le navigateur
    // rediriger / rafraichir pour avoir l'état connecté
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password" />
      <button type="submit" className="btn">Se connecter</button>
    </form>
  );
}
```

3) Appeler une route protégée (ex : GET /api/tasks):

```ts
// fetch example
const tasks = await apiFetch('/api/tasks');
```

Upload d'une image (task create)

```tsx
async function createTask(formData: FormData) {
  const res = await fetch('http://localhost:3000/api/tasks', {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  return res.json();
}

// Exemple d'utilisation
const fd = new FormData();
fd.append('titre','ma tache');
fd.append('description','desc');
fd.append('photo', fileInput.files[0]);
await createTask(fd);
```

CORS et configuration serveur

- Si votre client est sur un domaine différent (ex : http://localhost:5173 pour Vite), le backend doit autoriser les cookies cross-site et les credentials :

```ts
import cors from 'cors';
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
```

Note : gardez `credentials: 'include'` côté client.

Icônes avec lucide-react

```tsx
import { Home } from 'lucide-react';

export default function Header(){
  return <div><Home/></div>
}
```

Bonnes pratiques

- Serveur : `secure: true` pour cookie en production (HTTPS), et `sameSite` selon besoin (lax/strict).
- Utiliser refresh-token si vous voulez token longue durée.
- Valider toutes les entrées côté serveur.

Dépannage

- 401 après login : vérifier que le cookie est présent (Postman : onglet Cookies). Si cookie est présent mais backend renvoie 401, assurez-vous que `cookie-parser` est activé **avant** le middleware d'auth.
- Cookie non envoyé : vérifier `credentials: 'include'` côté fetch et `credentials: true` côté backend CORS.

Fin

---

J'ai ajouté ce fichier `README_REACT_CLIENT.md` à la racine du repo. Voulez-vous un exemple d'application minimal (squelette Vite) généré directement ici ?
