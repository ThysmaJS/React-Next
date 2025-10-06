# Système de Gestion d'Erreurs Globale

Ce projet contient un système de gestion d'erreurs globale pour React qui permet de capturer, afficher et gérer les erreurs de manière centralisée.

## Composants

### 1. ErrorContext
Contexte React qui gère l'état global des erreurs.

```tsx
// Utilisation de base
import { useError } from './context/ErrorContext';

function MonComposant() {
  const { addError, removeError, clearErrors, errors } = useError();
  
  const handleClick = () => {
    addError('Message d\'erreur', 'error', 'Détails optionnels');
  };
}
```

### 2. ErrorBoundary
Composant de classe qui capture les erreurs React non gérées.

```tsx
// Wrappé automatiquement dans App.tsx
<ErrorBoundary>
  <MonComposant />
</ErrorBoundary>
```

### 3. ErrorDisplay
Composant qui affiche les erreurs en overlay dans le coin supérieur droit.

### 4. useErrorHandler Hook
Hook utilitaire pour simplifier la gestion d'erreurs.

```tsx
import { useErrorHandler } from './hooks/useErrorHandler';

function MonComposant() {
  const { handleError, handleAsyncError, showSuccess, showWarning } = useErrorHandler();
  
  // Gestion d'erreur simple
  const handleClick = () => {
    try {
      // code qui peut échouer
    } catch (error) {
      handleError(error, 'Contexte de l\'erreur');
    }
  };
  
  // Gestion d'erreur async
  const loadData = async () => {
    const data = await handleAsyncError(
      () => fetchData(),
      'Erreur lors du chargement'
    );
    if (data) {
      // utiliser les données
    }
  };
  
  // Notifications de succès ou d'avertissement
  const saveData = async () => {
    const success = await handleAsyncError(() => saveToAPI());
    if (success) {
      showSuccess('Données sauvegardées!');
    }
  };
}
```

## Types d'Erreurs

- **error** (rouge) : Erreurs importantes qui nécessitent l'attention de l'utilisateur
- **warning** (orange) : Avertissements qui se ferment automatiquement après 5 secondes
- **info** (bleu) : Messages informatifs/succès qui se ferment automatiquement après 5 secondes

## Fonctionnalités

- ✅ Capture automatique des erreurs React avec ErrorBoundary
- ✅ Affichage en overlay non-intrusif
- ✅ Fermeture automatique pour les warnings/info
- ✅ Fermeture manuelle pour les erreurs
- ✅ Détails d'erreur pliables
- ✅ Timestamps
- ✅ Bouton "Tout effacer"
- ✅ Animations d'entrée
- ✅ Support TypeScript complet

## Intégration

Le système est déjà intégré dans `App.tsx` :

```tsx
<ErrorProvider>
  <AuthProvider>
    <ErrorBoundary>
      <ErrorDisplay />
      <Routes>
        {/* vos routes */}
      </Routes>
    </ErrorBoundary>
  </AuthProvider>
</ErrorProvider>
```

## Exemple d'Utilisation

Voir `pages/Tasks.tsx` pour des exemples concrets d'utilisation du système de gestion d'erreurs avec des opérations CRUD.
