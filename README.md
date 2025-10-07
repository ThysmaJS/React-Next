# Projet React - Cours M2

Ce repository contient plusieurs exercices et projets React avec leurs serveurs associés.

## 📁 Structure du projet

### 🎯 **exo-1/** - Exercice 1
Exercice d'introduction à React avec :
- Composant de liste filtrée
- Compteur avec auto-incrémentation
- Gestion des fréquences d'incrémentation
- Limitation d'affichage pour les performances

### 🔗 **exo-2_3/** - Exercices 2 & 3
Application React complète incluant :
- Système d'authentification
- Gestion des tâches (CRUD)
- Routage avec React Router
- Contextes (Auth + Gestion d'erreurs globale)
- Tests avec Jest
- **Se connecte à l'exo-4 (PREMIER serveur)**

### 🖥️ **exo-4/** - PREMIER Serveur
Serveur Node.js basique pour les exercices 2 & 3 :
- API simple pour l'authentification
- Endpoints de base pour les tâches
- Serveur de développement

### 🚀 **server/** - SECOND Serveur
Serveur Node.js complet et avancé :
- API REST complète
- Fonctionnalités étendues
- Base de données
- Middleware avancés
- Version production

### ❌ **react-spa/** - Non utilisé
Dossier de test, ne sert à rien dans le projet actuel.

## 🔧 Installation et utilisation

### Pour l'exercice 1 :
```bash
cd exo-1
npm install
npm run dev
```

### Pour les exercices 2 & 3 :
```bash
# Démarrer le PREMIER serveur
cd exo-4
npm install
npm start

# Dans un autre terminal, démarrer l'app React
cd exo-2_3
npm install
npm run dev
```

### Pour utiliser le SECOND serveur :
```bash
cd server
npm install
npm start
npm test
```

## 📝 Notes

- Les tests sont configurés dans **exo-2_3**
- Chaque dossier a sa propre configuration (package.json, tsconfig, etc.)

## 🎓 Objectifs pédagogiques

1. **exo-1** : Bases de React (composants, état, effets)
2. **exo-2_3** : Application complète (routing, contextes, auth, tests)
3. **exo-4** : Serveur basique
4. **server** : Serveur avancé
