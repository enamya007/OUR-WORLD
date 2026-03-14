# OUR WORLD ?

Exploration interactive des monuments emblématiques du monde entier.
Une figure africaine porte la planète — survolez les marqueurs dorés pour découvrir chaque monument, cliquez pour explorer son histoire.

## Architecture simplifiée

```
our-world/
├── public/
│   ├── index.html
│   └── images/            (dossier tiers des photos de monuments)
├── src/
│   ├── components/        (Globe, MonumentModal)
│   ├── data/              (monuments.js)
│   ├── App.jsx / App.css
│   └── index.js / index.css
├── .gitignore
├── netlify.toml
└── package.json
```

---

## Sommaire

1. Prérequis et installations
2. Créer le projet
3. Configurer les polices hors-ligne
4. Structure et fichiers
5. Lancer en développement
6. Déployer sur Netlify (A à Z)
7. Architecture complète

---

## 1. Prérequis et installations

### Node.js (obligatoire)

Node.js est le moteur JavaScript utilisé pour lancer React.

Etape 1 — Téléchargement
Rendez-vous sur https://nodejs.org et téléchargez la version LTS (Long Term Support).

Etape 2 — Installation
Lancez l'installeur téléchargé. Gardez toutes les options par défaut et terminez l'installation.

Etape 3 — Vérification
Ouvrez un terminal (cmd ou PowerShell sur Windows) et tapez :
```
node -v
npm -v
```
Vous devez voir deux numéros de version s'afficher. Si c'est le cas, Node.js est bien installé.

---

### Git (obligatoire pour GitHub et Netlify)

Git permet de versionner votre code et de le pousser sur GitHub.

Etape 1 — Téléchargement
Rendez-vous sur https://git-scm.com et téléchargez la version pour Windows.

Etape 2 — Installation
Lancez l'installeur. Gardez toutes les options par défaut. Sur l'écran "Default editor", vous pouvez choisir VSCode si proposé.

Etape 3 — Configuration initiale (une seule fois)
Dans le terminal :
```
git config --global user.name "VotreNom"
git config --global user.email "votre@email.com"
```

Etape 4 — Vérification
```
git --version
```
Un numéro de version doit s'afficher.

---

### VSCode (déjà installé)

Assurez-vous que l'extension "ES7+ React/Redux/React-Native snippets" est installée.
Dans VSCode : Ctrl+Shift+X, recherchez "ES7 React", installez l'extension de dsznajder.

---

## 2. Créer le projet React

Ouvrez un terminal dans VSCode (Ctrl + ~) et exécutez les commandes suivantes une par une :

```
cd D:\PROJECTS\REACT
npx create-react-app our-world
cd our-world
```

Cette opération prend 2 à 5 minutes selon votre connexion. Elle crée toute la structure de base React.

Ensuite, supprimez les fichiers par défaut inutiles :
```
del src\App.test.js
del src\logo.svg
del src\reportWebVitals.js
del src\setupTests.js
```

---

## 3. Configurer le port 7002

Ouvrez le fichier `package.json` à la racine du projet.
Modifiez la section `"scripts"` comme suit :

```json
"scripts": {
  "start": "set PORT=7002 && react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

Note : Sur Windows, la syntaxe est `set PORT=7002 &&`. Sur Mac/Linux, c'est simplement `PORT=7002`.

---

## 4. Configurer les polices (hors-ligne)

Le projet utilise deux polices Google Fonts : Cinzel Decorative et Cormorant Garamond.

### Option A — Connexion internet (plus simple)

Gardez le lien déjà présent dans `public/index.html`. Les polices se chargent depuis les serveurs Google. Aucune action supplémentaire.

### Option B — Polices en local (sans connexion)

Etape 1 — Télécharger Cormorant Garamond via npm :
```
npm install @fontsource/cormorant-garamond
```

Etape 2 — Dans `src/index.js`, ajoutez en haut du fichier :
```js
import '@fontsource/cormorant-garamond/300.css';
import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/600.css';
```

Etape 3 — Pour Cinzel Decorative (non disponible via npm) :
Allez sur https://fonts.google.com/specimen/Cinzel+Decorative
Cliquez sur "Download family".
Extrayez le fichier ZIP.
Copiez les fichiers .ttf dans `src/assets/fonts/`.
Dans `src/index.css`, ajoutez au début :
```css
@font-face {
  font-family: 'Cinzel Decorative';
  src: url('./assets/fonts/CinzelDecorative-Regular.ttf') format('truetype');
  font-weight: 400;
}
@font-face {
  font-family: 'Cinzel Decorative';
  src: url('./assets/fonts/CinzelDecorative-Bold.ttf') format('truetype');
  font-weight: 700;
}
@font-face {
  font-family: 'Cinzel Decorative';
  src: url('./assets/fonts/CinzelDecorative-Black.ttf') format('truetype');
  font-weight: 900;
}
```
Retirez ensuite le `<link>` Google Fonts du fichier `public/index.html`.

---

## 5. Remplacement des fichiers générés

Après `create-react-app`, remplacez ou créez les fichiers suivants avec le contenu fourni dans ce projet :

```
src/index.js                    (remplacer)
src/index.css                   (remplacer)
src/App.jsx                     (créer, supprimer App.js)
src/App.css                     (remplacer)
src/components/Globe.jsx        (créer)
src/components/Globe.css        (créer)
src/components/MonumentModal.jsx  (créer)
src/components/MonumentModal.css  (créer)
src/data/monuments.js           (créer)
public/index.html               (remplacer)
public/images/                  (créer le dossier, y copier toutes les photos)
.gitignore                      (remplacer)
netlify.toml                    (créer)
```

---

## 6. Lancer en développement

Dans le terminal, depuis `D:\PROJECTS\REACT\our-world` :

```
npm start
```

Le navigateur s'ouvre automatiquement sur http://localhost:7002

Pour arrêter le serveur : Ctrl + C dans le terminal.

---

## 7. Déployer sur Netlify (A à Z)

### Etape 1 — Créer un compte GitHub

Allez sur https://github.com et créez un compte gratuit si vous n'en avez pas.
Vérifiez votre adresse email (GitHub envoie un email de confirmation).

---

### Etape 2 — Créer un nouveau dépôt GitHub

Une fois connecté sur GitHub :
- Cliquez sur le bouton vert "New" (ou le + en haut à droite puis "New repository")
- Nommez le dépôt : `our-world`
- Laissez-le Public (nécessaire pour Netlify gratuit)
- Ne cochez rien d'autre (pas de README, pas de .gitignore)
- Cliquez "Create repository"

GitHub affiche une page avec des instructions. Gardez-la ouverte.

---

### Etape 3 — Pousser le projet sur GitHub

Dans le terminal VSCode, depuis `D:\PROJECTS\REACT\our-world` :

```
git init
git add .
git commit -m "Initial commit — OUR WORLD ?"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/our-world.git
git push -u origin main
```

Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub.
Git va vous demander vos identifiants GitHub la première fois.

---

### Etape 4 — Créer un compte Netlify

Allez sur https://netlify.com
Cliquez "Sign up" puis choisissez "Sign up with GitHub" (recommandé, ça lie les deux comptes directement).
Autorisez Netlify à accéder à votre GitHub.

---

### Etape 5 — Déployer le site

Une fois connecté sur Netlify :

- Cliquez "Add new site" (bouton en haut à droite)
- Choisissez "Import an existing project"
- Cliquez "Deploy with GitHub"
- Autorisez Netlify à accéder à vos dépôts GitHub si demandé
- Sélectionnez le dépôt `our-world` dans la liste
- Netlify détecte automatiquement React. Vérifiez la configuration :
  - Branch to deploy : `main`
  - Build command : `npm run build`
  - Publish directory : `build`
- Cliquez "Deploy our-world"

Le déploiement prend 1 à 3 minutes. Netlify vous donne une URL publique du type :
`https://our-world-abc123.netlify.app`

---

### Etape 6 — Personnaliser l'URL (optionnel)

Sur le dashboard Netlify de votre site :
- Allez dans "Site configuration" > "Site details"
- Cliquez "Change site name"
- Entrez un nom personnalisé, par exemple : `our-world-enamya007`
- Votre site sera alors accessible à : `https://our-world-enamya007.netlify.app`

---

### Etape 7 — Mises à jour automatiques

Chaque fois que vous modifiez votre code et poussez sur GitHub :
```
git add .
git commit -m "Description de la modification"
git push
```
Netlify détecte automatiquement le push et redéploie le site. Aucune action manuelle nécessaire.

---

## Architecture complète

```
our-world/
│
├── public/
│   ├── index.html
│   │     Point d'entrée HTML. Contient les balises meta, le titre "OUR WORLD ?",
│   │     et le lien vers les polices Google Fonts (Cinzel Decorative + Cormorant Garamond).
│   │
│   └── images/
│         Dossier tiers contenant toutes les photos des monuments.
│         Ces fichiers sont servis statiquement par React (accessibles via /images/).
│         ├── africanrenaissancesenegalafricasculpturestatue.jpg   (Sénégal)
│         ├── amazonebenin.jpg                                     (Bénin)
│         ├── big_ben_first_pick.jpg                               (Royaume-Uni)
│         ├── bigben_second_piK.jpg                                (Royaume-Uni - angle 2)
│         ├── christ_the_redempter_.jpg                            (Brésil)
│         ├── Russia_statue_first_angle.jpg                        (Russie)
│         ├── Russia_statue_second_angle.jpg                       (Russie - angle 2)
│         ├── eiffeltower003.jpg                                   (France)
│         ├── eyadematogokara.jpg                                  (Togo - Kara)
│         ├── captiontogomonumentindepence.jpg                     (Togo - Lomé)
│         ├── statue_of_liberty_.jpg                               (États-Unis)
│         ├── SENGHOR_1_senegal.JPG                                (Sénégal)
│         └── Independence_Arch__Accra_Ghana1.jpg                  (Ghana)
│
├── src/
│   │
│   ├── index.js
│   │     Point d'entrée React. Monte l'application dans la div #root du HTML.
│   │     Importe les styles globaux (index.css) et le composant racine App.
│   │
│   ├── index.css
│   │     Styles globaux. Définit les variables CSS (couleurs, polices, transitions),
│   │     le fond étoilé animé, les animations (float, fadeInUp, shimmer, ripple),
│   │     la scrollbar personnalisée et les classes utilitaires (.shimmer-text).
│   │
│   ├── App.jsx
│   │     Composant racine de l'application. Gère l'état selectedMonument.
│   │     Affiche : alias enamya007 (coins haut-gauche et bas-droite), header avec
│   │     le titre "OUR WORLD ?", le Globe, la légende des continents, la grille
│   │     de cartes de monuments, le footer, et la MonumentModal si un monument
│   │     est sélectionné.
│   │
│   ├── App.css
│   │     Styles du layout principal. Gestion de la grille de cartes monuments,
│   │     header/footer, alias positionnés en fixed, cartes avec hover effects,
│   │     responsive design (768px, 480px).
│   │
│   ├── components/
│   │   │
│   │   ├── Globe.jsx
│   │   │     Composant SVG central. Dessine une figure humaine africaine musclée
│   │   │     tenant la Terre au-dessus de sa tête (référence à Atlas). Le globe
│   │   │     contient les continents simplifiés en SVG et des marqueurs dorés
│   │   │     cliquables pour chaque monument. Au survol d'un marqueur, une
│   │   │     infobulle affiche le pays et le nom du monument. Au clic, déclenche
│   │   │     onSelectMonument(monument).
│   │   │
│   │   ├── Globe.css
│   │   │     Styles du globe. Animation de flottement (float), styles des marqueurs
│   │   │     (pulse ring, dot), tooltip avec dégradé sombre et bordure dorée.
│   │   │
│   │   ├── MonumentModal.jsx
│   │   │     Modal plein écran affichée au clic sur un monument. Contient :
│   │   │     photo du monument, continent/pays/ville, badge de l'année de création,
│   │   │     titre du monument, description historique complète, grille de métadonnées
│   │   │     (pays, ville, continent, année), bouton de fermeture.
│   │   │     Fermeture via bouton, clic sur l'overlay, ou touche Escape.
│   │   │
│   │   └── MonumentModal.css
│   │         Styles de la modale. Animation d'entrée slideUp avec spring effect,
│   │         overlay avec backdrop-filter blur, scrollbar personnalisée interne,
│   │         image avec zoom au hover, responsive mobile.
│   │
│   └── data/
│       └── monuments.js
│             Base de données des 11 monuments. Chaque entrée contient :
│             id, name, country, city, image (nom du fichier), year, continent,
│             globeX/globeY (position sur le globe en %), description (texte complet).
│             Monuments référencés : Renaissance Africaine (Sénégal), Big Ben (UK),
│             Amazones du Dahomey (Bénin), Christ Rédempteur (Brésil), Mère Patrie
│             (Russie), Tour Eiffel (France), Statue Eyadéma (Togo-Kara), Monument
│             Indépendance (Togo-Lomé), Statue Liberté (USA), Senghor (Sénégal),
│             Independence Arch (Ghana).
│
├── .gitignore
│     Exclusions Git : node_modules/, /build, /dist, fichiers .env,
│     logs npm/yarn, fichiers système (.DS_Store, Thumbs.db), dossier /coverage.
│
├── netlify.toml
│     Configuration de déploiement Netlify. Définit la commande de build
│     (npm run build), le dossier de publication (build), et la règle de
│     redirection SPA (/* -> /index.html) pour que React Router fonctionne.
│
└── package.json
      Dépendances React (react, react-dom, react-scripts). Scripts configurés
      avec PORT=7002 pour le développement local. Pas de dépendances tierces
      supplémentaires (tout est en CSS/SVG natif).
```