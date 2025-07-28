# 🏢 TASNIM IMMOBILIER

Une plateforme moderne de gestion immobilière développée avec Next.js, React et TypeScript.

## ✨ Fonctionnalités

### 🏠 Gestion des Propriétés
- ✅ Ajout, modification et suppression de propriétés
- ✅ Différents types : Immeuble, Villa, Complexe, Appartement
- ✅ Localisation par commune et quartier
- ✅ Statistiques de occupation et recettes

### 👤 Gestion des Propriétaires
- ✅ Fiche complète des propriétaires
- ✅ Suivi des propriétés et recettes
- ✅ Gestion des contacts et informations personnelles

### 🏘️ Gestion des Locataires
- ✅ Base de données complète des locataires
- ✅ Historique des locations
- ✅ Informations de contact

### 📋 Gestion des Locations
- ✅ Contrats de location
- ✅ Suivi des paiements
- ✅ Gestion des échéances

### 💰 Recouvrement
- ✅ Encaissement des loyers
- ✅ Suivi des impayés
- ✅ Historique des paiements

### 📊 Tableaux de Bord & Rapports
- ✅ Statistiques en temps réel
- ✅ Activités récentes
- ✅ Vue d'ensemble financière

## 🛠️ Technologies Utilisées

- **Framework** : Next.js 15.2.4
- **UI Library** : React 19
- **Language** : TypeScript
- **Styling** : Tailwind CSS
- **Components** : Radix UI
- **Icons** : Lucide React
- **Forms** : React Hook Form + Zod
- **Fonts** : Geist Sans & Mono
- **Storage** : localStorage (données persistantes)

## 🚀 Installation et Démarrage

1. **Cloner le projet**
```bash
git clone [url-du-repo]
cd tasnim-immobilier
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Démarrer le serveur de développement**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 📁 Structure du Projet

```
tasnim-immobilier/
├── app/                    # Pages et composants de l'app
│   ├── components/         # Composants des onglets
│   ├── globals.css        # Styles globaux
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil/dashboard
├── components/            # Composants réutilisables
│   ├── ui/               # Composants UI de base
│   └── theme-provider.tsx
├── lib/                   # Utilitaires et logique métier
│   ├── data-context.tsx   # Contexte global des données
│   ├── demo-data.ts      # Données de démonstration
│   ├── types.ts          # Types TypeScript
│   └── utils.ts          # Fonctions utilitaires
└── public/               # Assets statiques
```

## 💡 Utilisation

### Premier Démarrage
1. Accédez à l'application
2. Cliquez sur "Charger les données de démonstration" pour découvrir les fonctionnalités
3. Ou commencez à ajouter vos propres données

### Gestion des Données
- **Persistance** : Toutes les données sont sauvegardées automatiquement dans localStorage
- **Sauvegarde** : Les données persistent entre les sessions
- **Réinitialisation** : Utilisez le bouton "Effacer toutes les données" pour recommencer

### Navigation
- **Tableau de bord** : Vue d'ensemble et statistiques
- **Propriétaires** : Gestion des propriétaires
- **Propriétés** : Gestion du patrimoine immobilier
- **Locataires** : Base de données des locataires
- **Locations** : Contrats et locations actives
- **Recouvrement** : Gestion des paiements
- **Rapports** : Analyses et rapports

## 🎨 Interface Utilisateur

- **Design Modern** : Interface clean et professionnelle
- **Responsive** : Compatible mobile, tablette et desktop
- **Thèmes** : Support du mode sombre/clair
- **Animations** : Transitions fluides
- **Accessibilité** : Composants accessibles

## 🔧 Personnalisation

### Couleurs et Thème
Modifiez `tailwind.config.ts` pour personnaliser les couleurs.

### Composants
Tous les composants UI sont dans `components/ui/` et peuvent être personnalisés.

### Données
Modifiez `lib/demo-data.ts` pour changer les données d'exemple.

## 📊 Données Stockées

L'application utilise localStorage pour persister :
- Propriétaires et leurs informations
- Propriétés et caractéristiques
- Locataires et contacts
- Contrats de location
- Historique des paiements
- Activités récentes

## 🚀 Améliorations Futures

- [ ] Base de données externe (PostgreSQL, MongoDB)
- [ ] Authentification et multi-utilisateurs
- [ ] Export PDF des rapports
- [ ] Notifications et alertes
- [ ] API REST
- [ ] Application mobile
- [ ] Intégration paiements en ligne

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Push vers la branche
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support :
- Email : support@tasnim-immobilier.com
- Documentation : [Lien vers la doc]
- Issues : [Lien vers les issues GitHub]

---

**Développé avec ❤️ pour la gestion immobilière moderne**