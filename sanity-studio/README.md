# Sanity Studio schema (copy-paste ready)

Tato složka obsahuje připravená schema pro web `Na kávičku`.

## Co je připraveno

- `homepage` dokument (hero, o kavárně, recenze)
- `menuSection` dokument (sekce + položky menu, bez obrázků)
- `announcement` dokument (aktuality/bannery)
- objekt `aboutCard`
- objekt `reviewItem`
- objekt `menuItem`
- `schemaTypes` index
- základ `sanity.config.ts`

## Rychlé spuštění (v samostatném Sanity Studio projektu)

1. Vytvoř nové Studio:

```bash
npx sanity@latest init
```

2. Nakopíruj obsah této složky do rootu Studia:

- `sanity.config.ts`
- `schemaTypes/`

3. Nastav env ve Studiu:

```bash
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

4. Spusť Studio:

```bash
npm run dev
```

## Propojení s Astro webem

V rootu Astro projektu nastav:

```bash
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
```

Na stránce `index.astro` už je napojení hotové (`src/lib/sanity/homepage.ts`).

## Seed aktuálního obsahu

Připravený dokument najdeš v:

- `seed/homepage.ndjson`

Import do datasetu:

```bash
npx sanity@latest dataset import seed/homepage.ndjson production --replace
```

Po importu se v Sanity objeví dokument `homepage` už s předvyplněným obsahem.

## Jak držet Sanity úložiště co nejnižší

- Menu je navržené **bez obrázků** (`menuSection` + `menuItem`), takže skoro nezabírá storage.
- U bannerů/aktualit používej primárně `bannerImageUrl` (externě hostovaný obrázek), ne upload do Sanity.
- Obrázky drž jako `WebP` a cílit přibližně na:
  - desktop banner do ~250-350 kB
  - mobilní banner do ~120-220 kB
- Pokud banner už není potřeba, deaktivuj ho (`isActive: false`) nebo smaž dokument.
