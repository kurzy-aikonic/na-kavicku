# Na kávičku – web (Astro + Tailwind)

Moderní statický web postavený v `Astro` + `Tailwind CSS`, připravený na správu obsahu přes Sanity.

## Spuštění

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Sanity CMS (doplněno)

Web umí načítat obsah z jednoho dokumentu `homepage` v Sanity. Pokud Sanity není nastavené nebo odpověď selže, použije se automaticky lokální fallback (stávající texty), takže web nespadne.

### 1) Env proměnné

Zkopíruj `.env.example` do `.env` a doplň:

```bash
SANITY_PROJECT_ID=...
SANITY_DATASET=production
```

### 2) Co je teď editovatelné ze Sanity

- Hero (`heroTitle`, `heroHighlight`, `heroSubtitle`)
- Sekce O kavárně (`aboutEyebrow`, `aboutHeading`, `aboutCards[]`)
- Sekce Recenze (`reviewsEyebrow`, `reviewsHeading`, `reviewsIntro`, `reviews[]`)

### 3) GROQ dotaz v projektu

Implementace je v `src/lib/sanity/homepage.ts`.

## Doporučené schema (Sanity Studio)

V Sanity Studiu vytvoř typ `homepage` se strukturou:

- `heroTitle` (string)
- `heroHighlight` (string)
- `heroSubtitle` (text)
- `aboutEyebrow` (string)
- `aboutHeading` (string)
- `aboutCards` (array objektů: `title`, `text`)
- `reviewsEyebrow` (string)
- `reviewsHeading` (string)
- `reviewsIntro` (text)
- `reviews` (array objektů: `rating` number 1-5, `text`, `author`, `source`)

## Poznámka k nasazení

- Web zůstává statický a rychlý.
- Po změně obsahu v Sanity je ideální spustit nový build/deploy (např. přes webhook z Sanity do hostingu).

