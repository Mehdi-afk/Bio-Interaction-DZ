# Bio Interaction Algérie — Site web

Site institutionnel et catalogue produits de **Bio Interaction Algérie**, distributeur en exclusivité sur le marché algérien de 5 marques internationales de diagnostic médical : ERBA Mannheim, Generic Assays, Medipan, HOB Biotech, LDBIO Diagnostics.

Le site permet aux laboratoires d'analyses médicales algériens de consulter le catalogue (réactifs + équipements), télécharger les fiches techniques (IFU), créer un compte et soumettre une demande de devis multi-produits.

URL de production : <https://biointeractiondz.com>

---

## Sommaire

1. [Stack technique](#stack-technique)
2. [Démarrage rapide](#démarrage-rapide)
3. [Variables d'environnement](#variables-denvironnement)
4. [Arborescence du projet](#arborescence-du-projet)
5. [Routes et pages](#routes-et-pages)
6. [API routes](#api-routes)
7. [Authentification et rôles](#authentification-et-rôles)
8. [Flow de demande de devis](#flow-de-demande-de-devis)
9. [Catalogue produits](#catalogue-produits)
10. [Données](#données)
11. [Composants partagés](#composants-partagés)
12. [Style et design system](#style-et-design-system)
13. [Déploiement](#déploiement)
14. [Scripts utilitaires](#scripts-utilitaires)
15. [Conventions de code](#conventions-de-code)

---

## Stack technique

| Couche | Technologie | Version |
|---|---|---|
| Framework | **Next.js** (App Router) | 16.2.6 |
| UI | **React** | 19.2.4 |
| Langage | **TypeScript** | 5.x |
| Styling | **Tailwind CSS** (v4 + `@tailwindcss/postcss`) | 4.x |
| Auth + DB | **Firebase** (client SDK + Admin SDK) | 12 / 13 |
| Emailing | **Resend** | 6.12.3 |
| Lint | **ESLint 9** + `eslint-config-next` | — |
| Hébergement | **Vercel** (déploiement Git automatique) | — |
| Runtime | Node.js (Fluid Compute) | — |

Aucun ORM, aucun state-manager externe (Redux/Zustand) : les données produits sont statiques, l'état applicatif vit dans deux contextes React (`AppContext`, `AuthContext`).

---

## Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Copier le template d'environnement
cp .env.example .env.local
# puis remplir les valeurs Firebase + Resend (voir section suivante)

# 3. Lancer le serveur de dev
npm run dev
# → http://localhost:3000
```

Scripts disponibles :
- `npm run dev` — serveur de développement
- `npm run build` — build de production
- `npm run start` — sert le build de production
- `npm run lint` — ESLint

---

## Variables d'environnement

Voir `.env.example`. Trois groupes :

### Resend (envoi d'emails)
```env
RESEND_API_KEY=re_…
```

### Firebase client (préfixés `NEXT_PUBLIC_` → exposés au navigateur)
```env
NEXT_PUBLIC_FIREBASE_API_KEY=…
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=…
NEXT_PUBLIC_FIREBASE_PROJECT_ID=…
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=…
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=…
NEXT_PUBLIC_FIREBASE_APP_ID=…
```

### Firebase Admin SDK (server-only)
```env
FIREBASE_SERVICE_ACCOUNT_B64=…   # service-account JSON encodé en base64
```

### Admin de l'application
```env
NEXT_PUBLIC_ADMIN_EMAIL=admin@biointeractiondz.com
```
Le compte avec cet email contourne l'approbation Firestore et accède au panel `/admin`.

---

## Arborescence du projet

```
.
├── app/                         # Next.js App Router (routes, layouts, API)
│   ├── a-propos/                # Page À propos
│   ├── admin/                   # Panel admin (approbation utilisateurs)
│   ├── api/                     # Routes API serveur (Node runtime)
│   │   ├── admin/notify/
│   │   ├── auth/send-verification/
│   │   ├── notice/[ref]/        # Proxy téléchargement IFU
│   │   ├── send-contact/
│   │   └── send-devis/          # Auth-protégé par Firebase ID token
│   ├── auth/                    # Login, signup, verify, pending, action
│   ├── blog/                    # Liste + [slug] + new (admin)
│   ├── catalogue/
│   │   ├── equipements/
│   │   └── reactifs/
│   ├── partenaires/             # Page Nos Partenaires
│   ├── profile/                 # Espace utilisateur
│   ├── layout.tsx               # Layout racine (providers + nav + footer + modales)
│   ├── page.tsx                 # Accueil
│   └── globals.css              # Tailwind + variables CSS
│
├── src/
│   ├── components/              # Composants React partagés
│   │   ├── blog/AuthGateModal.tsx
│   │   ├── catalogue/           # Vues catalogue (client components)
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ModalDevis.tsx       # Modale devis (auth gate + form)
│   │   ├── ModalContact.tsx
│   │   ├── DevisButton.tsx
│   │   ├── ContactButton.tsx
│   │   ├── Card.tsx / CardGrid.tsx
│   │   ├── BackToTop.tsx
│   │   └── Toast.tsx
│   ├── context/
│   │   ├── AppContext.tsx       # Panier, clientInfo, modales, toast
│   │   └── AuthContext.tsx      # Firebase auth + rôle admin
│   ├── data/
│   │   ├── products-reactifs.ts # 419 produits, 5 marques
│   │   ├── products-equip.ts    # 17 équipements
│   │   ├── fiches-techniques.ts # Index global des notices PDF
│   │   ├── fiches-hob.ts
│   │   ├── fiches-ldbio.ts
│   │   └── fiches-medipan.ts
│   ├── lib/
│   │   ├── firebase.ts          # Init client (lazy : ignore SSR si pas de config)
│   │   └── firebase-admin.ts    # Init Admin SDK depuis FIREBASE_SERVICE_ACCOUNT_B64
│   └── types/
│       └── blog.ts              # Types articles + ContentBlock
│
├── public/                      # Assets statiques
│   ├── images/
│   │   ├── equipements/
│   │   ├── reactifs/            # ~46 fichiers — photos produits
│   │   └── partenaires/         # Logos des 5 marques
│   ├── icon-color.svg
│   ├── icon-32.png
│   └── icon-192.png
│
├── data/                        # Fixtures, exports, fiches PDF brutes
│   ├── fiches_by_ref.json
│   ├── fiches_techniques/       # PDFs de notices (IFU)
│   └── *_index.json             # Index par fournisseur
│
├── scripts/                     # Scripts Node/Python de scraping & enrichissement
│   ├── scrape-fiches.mjs
│   ├── scrape-ldbio.mjs
│   ├── scrape-medipan.mjs
│   ├── match-erba-full.mjs
│   ├── download-images.mjs
│   └── …
│
├── next.config.ts               # Config Next (dangerouslyAllowSVG activé)
├── tsconfig.json                # Paths alias @/* → ./
├── eslint.config.mjs
├── postcss.config.mjs           # Plugin @tailwindcss/postcss
└── package.json
```

---

## Routes et pages

| Route | Composant | Description |
|---|---|---|
| `/` | `app/page.tsx` | Accueil — hero, stats, partenaires en bref |
| `/a-propos` | `app/a-propos/page.tsx` | Histoire, valeurs, coordonnées |
| `/partenaires` | `app/partenaires/page.tsx` | Grille des 5 marques distribuées |
| `/catalogue/equipements` | `app/catalogue/equipements/page.tsx` | 17 instruments |
| `/catalogue/reactifs` | `app/catalogue/reactifs/page.tsx` | 419 réactifs, filtres + sous-catégories |
| `/blog` | `app/blog/page.tsx` | Liste des articles |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Article (rendu de `ContentBlock[]`) |
| `/blog/new` | `app/blog/new/page.tsx` | Création (admin uniquement) |
| `/auth/login` | `app/auth/login/page.tsx` | Connexion email/password |
| `/auth/signup` | `app/auth/signup/page.tsx` | Inscription → envoi email de vérif |
| `/auth/verify-email` | `app/auth/verify-email/page.tsx` | Demande à confirmer son email |
| `/auth/pending` | `app/auth/pending/page.tsx` | Compte en attente d'approbation admin |
| `/auth/action` | `app/auth/action/page.tsx` | Handler des liens Firebase (verify, reset…) |
| `/admin` | `app/admin/page.tsx` | Approbation/rejet utilisateurs |
| `/profile` | `app/profile/page.tsx` | Espace utilisateur connecté |

---

## API routes

Toutes les routes `app/api/**/route.ts` tournent sur le runtime Node (Fluid Compute sur Vercel).

### `POST /api/send-devis` 🔒
Soumet une demande de devis par email. **Authentifié** :
1. Le client envoie `Authorization: Bearer <firebaseIdToken>`.
2. Le serveur vérifie le token via `adminAuth.verifyIdToken()`.
3. Si OK → Resend envoie un email HTML avec coordonnées + panier.
4. Sinon → `401 Unauthorized`.

### `POST /api/send-contact`
Formulaire de contact générique → email Resend. Public.

### `POST /api/admin/notify`
Notifie l'admin par email lorsqu'un nouvel utilisateur passe en `pending`.

### `POST /api/auth/send-verification`
Renvoie un email de vérification Firebase (utile si le premier expire).

### `GET /api/notice/[ref]`
Proxy de téléchargement de fiches IFU — sert le PDF depuis `data/fiches_techniques/` selon la référence produit.

---

## Authentification et rôles

Implémenté avec **Firebase Auth + Firestore**.

### Flow d'inscription
```
signup → email Firebase de vérif → click → /auth/action
         → emailVerified = true
         → login → /auth/pending (création doc Firestore status="pending")
         → admin approuve dans /admin → status="approved" → accès devis
```

### États possibles d'un utilisateur (Firestore `users/{uid}`)
- `pending` — vient de vérifier son email, attend l'admin
- `approved` — peut tout faire
- `rejected` — bloqué

### Rôles
- `admin` — accès au panel `/admin`. Soit via `NEXT_PUBLIC_ADMIN_EMAIL`, soit via `role: "admin"` en base.
- `user` — utilisateur standard

### Contexte React (`AuthContext`)
```ts
const { user, loading, isAdmin, userRole, login, signup, logout } = useAuth();
```
`user` est l'objet Firebase `User` (incluant `getIdToken()` pour les appels API authentifiés).

---

## Flow de demande de devis

1. **Ajout au panier** — depuis une carte produit du catalogue : `addToCart({ name, ref })` via `AppContext`.
2. **Ouverture de la modale** — clic sur l'icône panier (Navbar) ou un bouton « Demander un devis ».
3. **Gate d'authentification** (`ModalDevis.tsx`) :
   - `authLoading` → spinner overlay.
   - `!user` → modale « Connexion requise » avec boutons login/signup.
   - User connecté → formulaire pré-rempli avec `displayName` + `email`.
4. **Soumission** :
   - Récupère un **Firebase ID token** : `await user.getIdToken()`.
   - `POST /api/send-devis` avec header `Authorization: Bearer <token>`.
   - Serveur vérifie le token, envoie l'email via Resend.
5. **Gestion d'erreur** :
   - Sur échec → toast d'erreur, **panier préservé** pour permettre le retry.
   - Sur succès → toast de confirmation, panier vidé, modale fermée.

L'état du panier vit dans `AppContext` (en mémoire) ; il est volontairement non persistant — un `beforeunload` warning prévient l'utilisateur si le panier contient des items.

---

## Catalogue produits

### Réactifs (`/catalogue/reactifs`)
- 419 produits dans `src/data/products-reactifs.ts`.
- Structure : tableau de `GridItem = Product | SectionLabel | InfoBlock`.
- Filtres : marque, type, recherche texte (sur nom/réf/description).
- Sous-catégories : Biochimie, Hématologie, Immunologie, Allergie BioCLIA, etc.
- Vue conditionnelle :
  - **Landing** (sans paramètre) → grille des catégories.
  - **Sous-catégorie** (`?cat=…`) → liste filtrée, sidebar masquée.

### Équipements (`/catalogue/equipements`)
- 17 instruments dans `src/data/products-equip.ts`.
- Vue simple en grille.

### Fiches techniques
- Chaque produit peut avoir une fiche IFU PDF stockée dans `data/fiches_techniques/`.
- Le mapping `ref produit ↔ fichier` vit dans `src/data/fiches-techniques.ts` (et `fiches-{marque}.ts`).
- Téléchargement via `/api/notice/[ref]`.

---

## Données

Toutes les données produits sont **statiques** (compilées dans le bundle JS) — pas d'appel base de données pour le catalogue. Avantages :
- Aucune latence sur les pages de catalogue
- Pré-rendu statique possible
- Build reproductible

Inconvénient : ajout/modif produit = commit + redeploy. C'est volontaire pour un catalogue de cette taille.

### Sources des données
- Scrapings initiaux depuis sites fournisseurs (`scripts/scrape-*.mjs`)
- Notices PDF téléchargées et indexées via `scripts/match-fiches.mjs`
- Images produits récupérées via `scripts/download-images.mjs`

### Firestore (Firebase)
Utilisé uniquement pour :
- `users/{uid}` — fiches utilisateurs (status, role, displayName, createdAt)
- `articles/{id}` — articles de blog (si admin en crée)

---

## Composants partagés

| Composant | Rôle |
|---|---|
| `Navbar` | Header fixe — navigation + panier + auth zone |
| `Footer` | Pied de page — liens, contacts, copyright |
| `ModalDevis` | Modale devis (gate auth + formulaire) |
| `ModalContact` | Modale contact simple |
| `Toast` | Notification éphémère (3.5s) |
| `BackToTop` | Bouton retour haut de page |
| `Card` / `CardGrid` | Carte produit et grille standard |
| `DevisButton` / `ContactButton` | Boutons CTA — ouvrent la modale correspondante |

---

## Style et design system

Tailwind v4 avec utilitaires arbitraires (`text-[15px]`, `bg-[#29A864]`).

### Palette
| Variable | Valeur | Usage |
|---|---|---|
| Vert primaire | `#29A864` | Boutons, liens, accents |
| Vert hover | `#48BC7E` | États survol |
| Vert foncé | `#0F4226` | Hero gradient |
| Vert clair | `#EDF8F1` | Backgrounds icônes |
| Texte | `#1B1F1D` | Corps de texte |
| Texte secondaire | `#6E6E6E` | Légendes, descriptions |
| Bordure | `#E5E3DC` | Séparateurs |
| Paper | `#F7F6F2` | Backgrounds neutres |
| Danger | `#B30C2F` | Logout, erreurs |

### Typographie
- `font-sans` → **DM Sans** (poids 300/400/500/600)
- `font-serif` → **Geist** (titres, logo)

Définies dans `app/layout.tsx` via `next/font/google` (auto-hébergées).

### Breakpoints custom
- `max-[1024px]` — tablette
- `max-[900px]` — burger menu mobile
- `max-[600px]` — mobile compact
- `max-[480px]` — petit mobile

---

## Déploiement

Hébergement **Vercel** lié au repo GitHub `Mehdi-afk/Bio-Interaction-DZ`.

- Branche `main` → production (`biointeractiondz.com`)
- Toute autre branche → preview deploy automatique
- Variables d'env configurées dans **Vercel Dashboard → Settings → Environment Variables**

`next.config.ts` :
- `allowedDevOrigins: ["192.168.1.117"]` — autorise le dev LAN
- `images.dangerouslyAllowSVG: true` — pour servir le logo LDBIO SVG via `next/image`
- CSP appliquée aux images servies par l'optimizer

---

## Scripts utilitaires

Tous dans `scripts/`. À lancer manuellement (pas dans CI).

| Script | But |
|---|---|
| `scrape-fiches.mjs` | Récupère les IFU depuis les sites fournisseurs |
| `scrape-ldbio.mjs`, `scrape-medipan.mjs` | Scrapings spécialisés |
| `match-fiches.mjs`, `match-erba-full.mjs` | Associe une fiche PDF à chaque référence produit |
| `download-images.mjs`, `update-product-images.mjs` | Téléchargement et mise à jour des photos |
| `generate-fiches-ts.mjs` | Génère les fichiers `src/data/fiches-*.ts` depuis les JSON d'index |
| `gen-icons.mjs` | Génère les favicons depuis le SVG source |
| `get-names.mjs`, `list-without-notice.mjs` | Audits du catalogue |

---

## Conventions de code

- **`"use client"`** uniquement quand nécessaire (hooks, event listeners, modales). Toutes les pages sans interactivité restent Server Components.
- **Pas de barrel files** (`index.ts`) — imports directs vers les modules.
- **Paths alias** : `@/*` pointe vers la racine (cf. `tsconfig.json`). Utilisé pour imports profonds : `@/src/components/Navbar`.
- **Commentaires en français** dans le code applicatif, anglais dans le code outillage.
- **Tailwind inline** : pas d'extraction de classes dans des constantes sauf si réutilisation massive (cf. `inputCls` dans `ModalDevis.tsx`).
- **Pas de tests** — à introduire dans un sprint dédié.
- **Commits** au format `verbe à l'impératif: description` (ex. `Add Nos Partenaires page with 5 partner logos`).

---

## Contact technique

Pour toute question sur le code, contacter le développeur via les issues GitHub du repo.
