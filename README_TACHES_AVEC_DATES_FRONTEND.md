# Fonctionnalité : Interface Frontend pour Tâches avec Dates

## Description de la Fonctionnalité Frontend

Cette fonctionnalité ajoute l'interface utilisateur pour gérer les tâches avec date et heure de début et fin. Elle permet aux utilisateurs de saisir les dates lors de la création/modification des tâches et d'afficher la durée calculée.

## Fichiers Modifiés

### 1. Composant TaskForm (`Client/my-project/src/components/TaskForm.jsx`)

**Ligne 7-13 : État du formulaire**
```jsx
const [formData, setFormData] = useState({
  titre: task?.titre || '',
  description: task?.description || '',
  photo: null,
  audio: null,
  startDate: task?.startDate ? new Date(task.startDate).toISOString().slice(0, 16) : '',
  endDate: task?.endDate ? new Date(task.endDate).toISOString().slice(0, 16) : ''
});
```

**Explication :**
- Ajout des champs `startDate` et `endDate` à l'état du formulaire
- Conversion des dates ISO en format `datetime-local` (YYYY-MM-DDTHH:MM) pour les inputs HTML
- Valeurs vides par défaut pour les nouvelles tâches

**Ligne 151-165 : Champs de saisie des dates**
```jsx
{/* Date et heure de début */}
<Input
  label="Date et heure de début (optionnel)"
  type="datetime-local"
  name="startDate"
  value={formData.startDate}
  onChange={handleChange}
  error={formErrors.startDate}
/>

{/* Date et heure de fin */}
<Input
  label="Date et heure de fin (optionnel)"
  type="datetime-local"
  name="endDate"
  value={formData.endDate}
  onChange={handleChange}
  error={formErrors.endDate}
/>
```

**Explication :**
- Utilisation du composant `Input` existant avec `type="datetime-local"`
- Labels explicites indiquant que les champs sont optionnels
- Gestion des erreurs de validation

**Ligne 102-116 : Validation frontend**
```jsx
// Validation formulaire
const validateForm = () => {
  const errors = {};
  if (!formData.titre.trim()) errors.titre = 'Le titre est requis';
  else if (formData.titre.trim().length < 3) errors.titre = 'Le titre doit contenir au moins 3 caractères';

  if (!formData.description.trim()) errors.description = 'La description est requise';
  else if (formData.description.trim().length < 10) errors.description = 'La description doit contenir au moins 10 caractères';

  // Validation des dates
  if (formData.startDate && formData.endDate) {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    if (end <= start) {
      errors.endDate = 'La date de fin doit être après la date de début';
    }
  }

  return errors;
};
```

**Explication :**
- Validation côté client pour une meilleure UX
- Vérification que la date de fin est après la date de début
- Erreur affichée sur le champ `endDate`

### 2. Composant TaskCard (`Client/my-project/src/components/TaskCard.jsx`)

**Ligne 59-66 : Affichage de la durée**
```jsx
{/* Durée de la tâche */}
{task.duration && (
  <div className="mb-4 flex items-center space-x-2 text-sm text-blue-600">
    <Clock className="h-4 w-4" />
    <span>Durée: {task.duration}</span>
  </div>
)}
```

**Explication :**
- Affichage conditionnel de la durée si elle existe
- Utilisation de l'icône `Clock` importée
- Style avec couleur bleue pour différencier de l'état de la tâche
- Positionnée après l'audio et avant les informations utilisateur/date

## Fonctionnement de l'Interface

### 1. Création d'une tâche avec dates

1. **Ouverture du formulaire** : L'utilisateur clique sur "Nouvelle tâche"
2. **Saisie des dates** : Utilisation des inputs `datetime-local` pour sélectionner date et heure
3. **Validation** : Vérification frontend que fin > début
4. **Soumission** : Envoi au backend avec validation serveur supplémentaire
5. **Affichage** : La tâche apparaît avec sa durée calculée

### 2. Modification d'une tâche

1. **Édition** : Les dates existantes sont pré-remplies dans le formulaire
2. **Modification** : L'utilisateur peut changer les dates
3. **Validation** : Même validation que pour la création
4. **Mise à jour** : Sauvegarde des modifications

### 3. Affichage des tâches

- **Liste des tâches** : Chaque carte affiche la durée si disponible
- **Détail de tâche** : La durée est visible dans la vue détaillée
- **Format de durée** : "2j 3h 15min", "5h 30min", "45min", etc.

## Compatibilité Navigateur

- **Inputs `datetime-local`** : Supporté par tous les navigateurs modernes
- **Fallback** : Pour les anciens navigateurs, l'input se comporte comme un champ texte
- **Validation** : Fonctionne même sans JavaScript activé (validation serveur)

## Styles et UX

### Design des champs de date

- **Labels clairs** : "Date et heure de début (optionnel)"
- **Type d'input** : `datetime-local` pour sélecteur natif
- **Validation visuelle** : Bordures rouges en cas d'erreur
- **Messages d'erreur** : Affichés sous les champs concernés

### Affichage de la durée

- **Icône** : Horloge pour représenter le temps
- **Couleur** : Bleu pour différencier des autres informations
- **Position** : Après la description et les médias, avant les métadonnées
- **Format** : Lisible par l'humain (jours, heures, minutes)

## Gestion des Erreurs

### Erreurs Frontend

- **Date de fin invalide** : "La date de fin doit être après la date de début"
- **Affichage** : Message rouge sous le champ `endDate`

### Erreurs Backend

- **Validation serveur** : Même message que frontend
- **Format invalide** : "La date de début doit être une date valide"
- **Gestion** : Les erreurs sont affichées dans le formulaire

## Tests d'Intégration

### Scénarios de test

1. **Création sans dates** : Devrait réussir
2. **Création avec dates valides** : Devrait réussir et afficher la durée
3. **Création avec fin < début** : Devrait échouer avec message d'erreur
4. **Modification des dates** : Devrait mettre à jour la durée
5. **Affichage dans la liste** : Durée visible sur chaque carte

### Exemples d'utilisation

**Tâche sur une journée :**
- Début: 2025-09-24 09:00
- Fin: 2025-09-24 17:00
- Durée affichée: "8h 0min"

**Tâche sur plusieurs jours :**
- Début: 2025-09-24 14:00
- Fin: 2025-09-25 06:00
- Durée affichée: "16h 0min"

## Fonctionnalité d'Auto-Complétion

### Description
Les tâches avec une date de fin dépassée sont automatiquement marquées comme "TERMINER" lors de leur récupération depuis la base de données. Cette fonctionnalité s'exécute automatiquement sans intervention manuelle.

### Fonctionnement
- **Vérification serveur temps réel** : Le serveur vérifie automatiquement les tâches expirées toutes les 60 secondes
- **Vérification frontend temps réel** : Le frontend vérifie également les tâches expirées toutes les 30 secondes
- **Vérification à la demande** : À chaque récupération de tâches (liste ou détail), le système vérifie également si la date de fin est dépassée
- **Mise à jour silencieuse** : Les tâches expirées sont automatiquement mises à jour en base de données
- **Indicateur visuel** : Les tâches auto-complétées affichent un indicateur spécial

### Affichage Frontend
- **Carte de tâche** : Badge orange "Terminée automatiquement (date d'échéance dépassée)"
- **Page de détail** : Section dédiée avec explication de l'auto-complétion
- **Couleur distinctive** : Utilisation de la couleur orange pour différencier des complétions manuelles

### Avantages
- **Maintenance réduite** : Pas besoin de marquer manuellement les tâches expirées
- **Double protection temps réel** : Vérification serveur (60s) + frontend (30s) pour une fiabilité maximale
- **Ultra-réactif** : Détection et complétion automatique en maximum 30 secondes
- **Cohérence** : Toutes les tâches sont à jour lors de l'affichage
- **Transparence** : L'utilisateur sait pourquoi la tâche est terminée

## Améliorations Futures

- **Sélecteur de date amélioré** : Bibliothèque comme `react-datepicker` pour plus de fonctionnalités
- **Rappels** : Notifications avant la date de début
- **Calendrier intégré** : Vue calendrier des tâches
- **Durée estimée vs réelle** : Comparaison avec le temps passé
- **Récurrence** : Tâches répétitives (quotidienne, hebdomadaire)
- **Notifications push** : Alertes en temps réel pour les tâches expirées

## Conclusion

L'interface frontend offre une expérience utilisateur intuitive pour gérer les tâches temporelles avec auto-complétion automatique. La validation côté client améliore la réactivité, tandis que la validation serveur garantit l'intégrité des données. L'affichage de la durée et l'auto-complétion apportent une valeur ajoutée significative à l'application.