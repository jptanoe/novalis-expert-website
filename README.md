# NOVALIS EXPERT — Site Vitrine

Cabinet de conseil, formation professionnelle et ingénierie des compétences.

## Stack technique

- React 18 + Vite 5
- Déploiement : Vercel (gratuit)
- Formulaires : Formspree
- Contact : WhatsApp
- Rendez-vous : Calendly (optionnel)
- Analytics : Google Analytics (optionnel)

## Configuration avant mise en ligne

Ouvrir `src/App.jsx` et renseigner le bloc CONFIG en haut du fichier :

```js
const CONFIG = {
  FORMSPREE_ID: "xxxxxxxx",        // formspree.io → créer formulaire → copier l'ID
  CALENDLY_URL: "https://calendly.com/votre-url",  // optionnel
  GA_ID: "G-XXXXXXXXXX",           // optionnel
  WA_NUMBER: "2250703373738",      // déjà configuré
};
```

## Installation locale

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
```

## Déploiement Vercel

1. Pousser le projet sur GitHub
2. Importer le repo sur vercel.com
3. Framework : **Vite**
4. Build command : `npm run build`
5. Output directory : `dist`
6. Connecter le domaine depuis les paramètres Vercel

## Connexion domaine LWS → Vercel

Dans Vercel → Settings → Domains → ajouter votre domaine.
Vercel fournit 2 enregistrements DNS à copier dans votre espace LWS.
Propagation : 10 à 60 minutes.

## Contact

- WhatsApp : +225 07 03 37 37 38
- Adresse : Groupement 4000 C, Cocody Angré Château, Abidjan
