README - HttpOnly Cookies et Authentification JWT

Résumé

Ce document explique ce qu'est un cookie HttpOnly, pourquoi l'utiliser pour stocker des tokens d'authentification, comment l'implémenter dans une application Express + TypeScript, et comment tester avec Postman et curl.

Table des matières

- Définition
- Pourquoi HttpOnly ?
- Prérequis (packages)
- Exemple d'implémentation (Express + TypeScript)
  - Configuration d'Express
  - Middleware d'authentification (lecture header + cookie)
  - Login: création du token + cookie HttpOnly
  - Routes protégées
- Tests (Postman / curl)
- Bonnes pratiques
- FAQ rapide

Définition

Un cookie avec l'attribut HttpOnly ne peut pas être lu ni modifié par JavaScript côté client (document.cookie). Il est automatiquement envoyé par le navigateur au serveur pour chaque requête.

Pourquoi HttpOnly ?

- Protection contre le vol de cookies via XSS (cross-site scripting). Si un cookie contient un token d'authentification, le marquer HttpOnly empêche les scripts malicieux d'accéder à ce token.
- À combiner avec l'option `secure: true` (HTTPS) et `sameSite` pour renforcer la sécurité.

Prérequis (packages)

Installer les packages suivants dans un projet Node/Express + TypeScript :

npm install cookie-parser jsonwebtoken bcryptjs express
npm install -D @types/cookie-parser @types/jsonwebtoken @types/express typescript

Exemple d'implémentation (Express + TypeScript)

1) Configuration d'Express (app.ts)

- activez `cookie-parser` avant le middleware d'auth et les routes.

```ts
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

// vos routes ci-dessous
```

2) Middleware d'authentification (auth.middleware.ts)

- accepte le token en header Authorization Bearer ou dans un cookie `token` (ou `acces_token`).

```ts
import type { Request, Response, NextFunction } from 'express';
import Jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  let token: string | undefined;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if ((req as any).cookies && ((req as any).cookies.token || (req as any).cookies.acces_token)) {
    token = (req as any).cookies.token || (req as any).cookies.acces_token;
  } else {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    const payload = Jwt.verify(token as string, secret) as any;
    req.user = { id: typeof payload.id === 'string' ? parseInt(payload.id, 10) : payload.id, email: payload.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
```

3) Login: création du token + cookie HttpOnly (user.controller.ts)

```ts
import Jwt from 'jsonwebtoken';

const token = Jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

res.cookie('acces_token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

res.status(200).json({ user });
```

4) Routes protégées

- le middleware `authenticate` permet d'autoriser l'accès; le cookie HttpOnly sera envoyé automatiquement par le navigateur/Postman (si cookie actif).

Tests (Postman / curl)

- Avec Postman :
  - Faites la requête de login (POST /api/users/auth) et vérifiez dans l'onglet Cookies que `acces_token` est stocké.
  - Faites une requête GET protégée (par ex. GET /api/tasks). Postman enverra automatiquement le cookie si vous avez activé l'envoi automatique.

- Avec curl (simuler stockage cookie):
  - Login et sauvegarder cookie :
    curl -c cookies.txt -X POST http://localhost:3000/api/users/auth -H "Content-Type: application/json" -d '{"email":"...","password":"..."}'
  - Réutiliser le cookie :
    curl -b cookies.txt http://localhost:3000/api/tasks

Bonnes pratiques

- Ne stockez pas de tokens longue durée sans protection additionnelle.
- Utilisez `secure: true` en production (HTTPS obligatoire).
- Utilisez `sameSite: 'lax'` ou `strict` si applicable.
- Combinez HttpOnly + rotation de tokens / refresh tokens pour meilleurs résultats.
- Toujours valider côté serveur (ne jamais faire confiance au cookie uniquement pour autoriser actions sensibles sans vérification serveur).

FAQ rapide

Q: Un cookie HttpOnly empêche-t-il le vol via CSRF ?
A: Non. HttpOnly protège contre XSS (lecture via JS). Pour CSRF, utilisez sameSite et/ou tokens CSRF et vérifiez l'origine.

Q: Puis-je toujours utiliser Authorization header ?
A: Oui. Le middleware devrait accepter les deux pour compatibilité API non navigateur.

Fin

---

Si vous voulez, je peux :
- ajouter ce fichier `README_HTTPONLY.md` au repo (je viens de le créer),
- ou modifier vos fichiers pour utiliser `acces_token` partout (login + middleware) plus un petit test automatisé.

