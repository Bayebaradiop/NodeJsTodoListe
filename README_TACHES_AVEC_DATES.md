# Fonctionnalité : Tâches avec Date/Heure de Début et Fin

## Description de la Fonctionnalité

Cette fonctionnalité permet de créer et gérer des tâches avec une date et une heure de début, ainsi qu'une date et une heure de fin. Les tâches peuvent s'étendre sur plusieurs jours (par exemple : commencer aujourd'hui à 1h et finir demain à 6h).

### Fonctionnalités Implémentées

- Création de tâches avec date/heure de début et fin
- Validation que la date de fin est toujours après la date de début
- Calcul automatique de la durée de la tâche
- Affichage de la durée dans les réponses API
- Gestion de l'édition et de la validation des champs

## Fichiers Modifiés

### 1. Schéma Prisma (`prisma/schema.prisma`)

**Ligne 28-43 : Modèle Task**
```prisma
model Task {
  id           Int      @id @default(autoincrement())
  titre        String
  description  String
  etat         Etat     @default(ENCOURS)
  userId       Int
  user         User     @relation(fields: [userId], references: [id])
  allowedUsers User[]   @relation("AllowedTasks")
  photo        String? // <-- photo (optionnelle)
  audio           String?
  startDate    DateTime? // Date et heure de début de la tâche
  endDate      DateTime? // Date et heure de fin de la tâche
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  // Relation inverse avec ActionHistory
  actionHistories ActionHistory[]
}
```

**Explication :**
- Ajout des champs `startDate` et `endDate` de type `DateTime?` (optionnels)
- Ces champs permettent de stocker les dates/heures de début et fin de la tâche

### 2. Validateurs (`src/validator/task.ts`)

**Ligne 4-17 : Validation pour la création d'une tâche**
```typescript
export const schemaCreateTask = z.object({
    titre: z.string().min(1, "Le titre est requis").max(255, "Le titre ne peut pas dépasser 255 caractères"),
    description: z.string().min(1, "La description est requise").max(1000, "La description ne peut pas dépasser 1000 caractères"),
    etat: z.enum(["ENCOURS", "TERMINER"]).optional().default("ENCOURS"),
    photo: z.string().optional(),
    startDate: z.string().datetime("La date de début doit être une date valide").optional(),
    endDate: z.string().datetime("La date de fin doit être une date valide").optional()
}).refine((data) => {
    // Validation personnalisée : endDate doit être après startDate si les deux sont fournies
    if (data.startDate && data.endDate) {
        const start = new Date(data.startDate);
        const end = new Date(data.endDate);
        return end > start;
    }
    return true;
}, {
    message: "La date de fin doit être après la date de début",
    path: ["endDate"] // Erreur sur le champ endDate
});
```

**Explication :**
- Ajout des champs `startDate` et `endDate` validés comme des chaînes de date ISO
- Utilisation de `z.string().datetime()` pour valider le format
- Ajout d'une validation personnalisée avec `refine()` pour vérifier que `endDate > startDate`

**Ligne 19-33 : Validation pour la mise à jour d'une tâche**
```typescript
export const schemaUpdateTask = z.object({
    titre: z.string().min(1, "Le titre est requis").max(255, "Le titre ne peut pas dépasser 255 caractères").optional(),
    description: z.string().min(1, "La description est requise").max(1000, "La description ne peut pas dépasser 1000 caractères").optional(),
    etat: z.enum(["ENCOURS", "TERMINER"]).optional(),
    photo: z.string().optional(),
    startDate: z.string().datetime("La date de début doit être une date valide").optional(),
    endDate: z.string().datetime("La date de fin doit être une date valide").optional()
}).refine((data) => {
    // Validation personnalisée : endDate doit être après startDate si les deux sont fournies
    if (data.startDate && data.endDate) {
        const start = new Date(data.startDate);
        const end = new Date(data.endDate);
        return end > start;
    }
    return true;
}, {
    message: "La date de fin doit être après la date de début",
    path: ["endDate"] // Erreur sur le champ endDate
});
```

**Explication :**
- Même validation que pour la création, mais tous les champs sont optionnels
- Permet de mettre à jour uniquement les dates sans modifier les autres champs

### 3. Service des Tâches (`src/services/task.service.ts`)

**Ligne 50-72 : Méthode calculateDuration**
```typescript
// Méthode utilitaire pour calculer la durée d'une tâche
calculateDuration(startDate: Date | null, endDate: Date | null): string | null {
  if (!startDate || !endDate) {
    return null;
  }

  const diffMs = endDate.getTime() - startDate.getTime();
  if (diffMs <= 0) {
    return null;
  }

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffDays > 0) {
    return `${diffDays}j ${diffHours}h ${diffMinutes}min`;
  } else if (diffHours > 0) {
    return `${diffHours}h ${diffMinutes}min`;
  } else {
    return `${diffMinutes}min`;
  }
}
```

**Explication :**
- Calcule la différence entre `startDate` et `endDate` en millisecondes
- Convertit en jours, heures et minutes
- Retourne une chaîne formatée selon la durée (ex: "2j 3h 15min", "5h 30min", "45min")
- Retourne `null` si les dates sont manquantes ou invalides

### 4. Contrôleur des Tâches (`src/controllers/task.controller.ts`)

**Ligne 74-75 : Calcul de la durée dans getTasksById**
```typescript
// Calculer la durée si les dates sont présentes
const duration = taskService.calculateDuration(task.startDate, task.endDate);

res.status(200).json({ ...task, duration });
```

**Explication :**
- Dans la fonction `getTasksById`, calcule la durée de la tâche
- Ajoute le champ `duration` à la réponse JSON
- Permet au frontend d'afficher la durée sans recalculer

## Migration Prisma

**Commande exécutée :**
```bash
npx prisma migrate dev --name add_task_dates
```

**Fichier de migration créé :** `prisma/migrations/20250924202010_add_task_dates/migration.sql`

**Contenu de la migration :**
```sql
-- AlterTable
ALTER TABLE `Task` ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `startDate` DATETIME(3) NULL;
```

**Explication :**
- Ajoute les colonnes `startDate` et `endDate` à la table `Task`
- Les colonnes sont de type `DATETIME(3)` (avec précision millisecondes) et nullable

## Tests des Endpoints

### 1. Création d'une tâche avec dates

**Requête :**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Réunion importante",
    "description": "Réunion avec l'équipe",
    "startDate": "2025-09-24T14:00:00.000Z",
    "endDate": "2025-09-24T16:00:00.000Z"
  }'
```

**Réponse attendue :**
```json
{
  "id": 1,
  "titre": "Réunion importante",
  "description": "Réunion avec l'équipe",
  "etat": "ENCOURS",
  "userId": 1,
  "startDate": "2025-09-24T14:00:00.000Z",
  "endDate": "2025-09-24T16:00:00.000Z",
  "createdAt": "2025-09-24T20:22:00.000Z",
  "updatedAt": "2025-09-24T20:22:00.000Z"
}
```

### 2. Récupération d'une tâche avec durée

**Requête :**
```bash
curl -X GET http://localhost:3000/tasks/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Réponse attendue :**
```json
{
  "id": 1,
  "titre": "Réunion importante",
  "description": "Réunion avec l'équipe",
  "etat": "ENCOURS",
  "userId": 1,
  "startDate": "2025-09-24T14:00:00.000Z",
  "endDate": "2025-09-24T16:00:00.000Z",
  "createdAt": "2025-09-24T20:22:00.000Z",
  "updatedAt": "2025-09-24T20:22:00.000Z",
  "duration": "2h 0min"
}
```

### 3. Validation d'erreur (endDate avant startDate)

**Requête :**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Tâche invalide",
    "description": "Test validation",
    "startDate": "2025-09-24T16:00:00.000Z",
    "endDate": "2025-09-24T14:00:00.000Z"
  }'
```

**Réponse d'erreur :**
```json
{
  "message": "Erreur de validation",
  "errors": {
    "endDate": {
      "_errors": ["La date de fin doit être après la date de début"]
    }
  }
}
```

## Points d'Amélioration Futurs

- Ajouter des contraintes de base de données pour valider `endDate > startDate`
- Implémenter des notifications pour les tâches proches de leur date de début
- Ajouter un calendrier pour visualiser les tâches
- Permettre la récurrence des tâches (quotidienne, hebdomadaire, etc.)

## Conclusion

Cette fonctionnalité ajoute une dimension temporelle aux tâches, permettant de planifier et suivre des événements sur plusieurs jours. La validation côté serveur assure l'intégrité des données, et le calcul automatique de la durée facilite l'affichage côté frontend.