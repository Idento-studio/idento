# Project: Idento — eigen website

## Klant
Idento, webdesignstudio in Pepingen (Vlaams-Brabant). Twee broers:
Jens (design, webdesign, huisstijl — vast aanspreekpunt) en Jarne
(IT-support: hosting, DNS, techniek). Doelpubliek: zelfstandigen en KMO's
die online zichtbaar willen zijn zonder gedoe.

## Doel van de site
Offerteaanvragen binnenhalen. De prijssimulator op de homepage is de
belangrijkste conversiestap: bezoeker schuift zijn project samen, krijgt
een richtmarge te zien en gaat van daar naar het contactformulier.

## Stack
Statische site (HTML/CSS/vanilla JS), GitHub Pages via `.github/workflows/pages.yml`.
Geen build-stap, geen frameworks, geen externe libraries — alleen
requestAnimationFrame, IntersectionObserver en de Canvas 2D API.
Enige externe afhankelijkheid: Google Fonts (Manrope + JetBrains Mono).

## Huisstijl
Alle tokens staan in `assets/css/brand.css`. Wijzig daar en de hele site volgt.

Scherm (fluo):  Cyaan #00E8FF · Teal #25F5CE · Navy #070D18 · Paper #EFF4F8
Drukwerk:       Sky #1BA8E0 · Teal #2EC4B6 · Deep Navy #0A1A2F · Paper #F7F8F9

De gradient sky → teal is voorbehouden aan het merk-icoon. Nooit als
achtergrondvulling of decoratief element elders.

Titels: Manrope 800 · Labels en data: JetBrains Mono · Body: Manrope 400/500
Tone of voice: Vlaams, warm en direct, nooit "u".

### Vormtaal
Alles wat klikbaar is gebruikt de "petal": `--petal` (28px 3px 28px 3px),
rond linksboven en rechtsonder, scherp op de andere twee hoeken. Bij hover
kantelt de vorm naar `--petal-alt`. Nooit een gewone pill of een vierkant.

### Donker en licht
De site is donker-eerst. Lichte secties krijgen de class `.light`, die
dezelfde tokens omgekeerd definieert plus het vingerafdruk-ribbelpatroon
in de achtergrond. Op licht schakelt het accent naar #0074A8 — fluo cyaan
op wit haalt de contrastnorm niet. Een `.dark-card` binnen een lichte
sectie zet de fluo terug aan (zie het offerteblok in de simulator).

Tussen een donkere en een lichte sectie zit een dissolve: `.bleed-top` /
`.bleed-bottom` plus een `.seam` die oplicht bij het scrollen. Hoogte
staat in `--bleed`.

## Structuur
```
index.html                    homepage
contact/index.html            contactformulier   ← teksten nog invullen
privacy/index.html            privacyverklaring  ← teksten nog invullen
assets/css/brand.css          tokens: kleur, type, spacing, vorm
assets/css/layout.css         nav, footer, secties, licht/donker, bleeds, reveal
assets/css/components.css     knoppen, formulier, FAQ, cookiebanner, kaarten
assets/css/pages/home.css     alleen de homepage
assets/js/site.js             sitebreed: reveal, progressbar, nav
assets/js/home.js             homepage: flow field, cases, simulator, ticker
assets/demo/case-placeholder.html  lege case in de showcase
```

## Afspraken
- Mobile-first, altijd checken op 375 px
- Alles in het Nederlands (Vlaams, geen "u")
- Contrast minstens 4.5:1 voor lopende tekst — controleer na elke kleurwijziging
- Elke animatie respecteert `prefers-reduced-motion`
- Inhoud is leesbaar zonder JS; `.reveal` verbergt nooit tekst
- SEO-focus: "webdesign Pepingen", "website laten maken KMO", "webdesign Vlaams-Brabant"

## Openstaand
- [ ] Echte cases in `CASES` in `assets/js/home.js` (nu 1 echte + 1 placeholder)
- [ ] Prijzen in de simulator valideren (nu € 1.500 – € 5.500)
- [ ] Claims nakijken: "90+ PageSpeed", "4–6 weken"
- [ ] `contact/index.html` en `privacy/index.html`: placeholders [BEDRIJFSNAAM]/[DOMEIN] invullen
- [ ] og-image.jpg en apple-touch-icon.png aanmaken in `assets/img/`
- [ ] Favicon vervangen door het nieuwe merk-icoon
- [ ] Beslissen: idento.be of idento.nl (het merkboek toont .nl)
