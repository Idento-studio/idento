# Opstart-prompt — nieuw project vanaf de website-starter template

*Dit is geen script, maar een stukje tekst dat je zelf kopieert en plakt in het Claude Code-paneel in VS Code, samen met de ingevulde `PROJECT-BRIEF.md` van de klant. Claude Code leest die fiche en vult de template zelf in — je hoeft dus geen apart "conversieprogramma" te bouwen of te onderhouden.*

## Hoe je dit gebruikt

1. Ga naar [Idento-studio/idento-website-starter](https://github.com/Idento-studio/idento-website-starter), klik **Use this template** → *Create a new repository*, en clone die nieuwe repo in VS Code.
2. Zet de ingevulde `PROJECT-BRIEF.md` van de klant in de root van dat nieuwe project — dus naast `index.html`, niet in een submap.
   *Dat bestand staat in `.gitignore` en wordt dus nooit gepusht: klantrepo's zijn publiek. Claude Code leest het uit je projectmap. Bewaar je exemplaar ook buiten de repo, want git maakt er geen back-up van.*
3. Zet Pages aan op de nieuwe repo: **Settings → Pages → Source** op **GitHub Actions**. Op de template staat Pages bewust uit; de workflow `.github/workflows/pages.yml` deployt daarna bij elke push naar `main`.
   *Kies niet "Deploy from a branch": die variant faalt met `Ensure GITHUB_TOKEN has permission "id-token: write"`, en die OIDC-scope is alleen in een eigen workflow te zetten.*
4. Open het Claude Code-paneel, en plak de prompt hieronder. Vervang enkel de eerste regel door de echte klantnaam.
5. Laat Claude Code de wijzigingen voorstellen (in Manual of Auto-modus), controleer de diffs, en werk zoals gewoonlijk verder.
6. Lever het beeldmateriaal aan in `assets/img/`: `og-image.jpg` (1200×630), `apple-touch-icon.png` (180×180), `icon-192.png`, `icon-512.png`, en optioneel `hero.avif`/`.webp`/`.jpg` en foto's voor de dienstenkaarten. Zonder hero- en dienstfoto's toont de site merkgradients — dat is een bewuste keuze, de site is meteen presentabel zonder beeld.

**Alle in te vullen plekken staan tussen vierkante haken.** Zoek in de hele repo op `[` om ze te vinden; als er nergens meer een treffer is, is de template volledig ingevuld.

## De prompt

```
Dit is een nieuw klantproject voor [KLANTNAAM], gebouwd vanaf de website-starter
starter-template van Idento. Lees PROJECT-BRIEF.md in deze repo grondig — dat is de
volledige intake met de klant.

Vul op basis daarvan de template overal in, zonder de bestaande architectuur
(de opsplitsing in brand.css / layout.css / components.css / pages/*.css,
en de manier waarop cookies/analytics/formulieren zijn opgezet) te veranderen:

1. Branding: pas de kleuren, fonts en tone-of-voice in brand.css aan op basis
   van sectie 6 van de fiche. Kies zelf een verzorgd, niet-generiek palet als
   de klant zelf geen huisstijl heeft — vermijd de klassieke AI-clichés
   (geen paars-blauwe gradient, geen Inter/Space Grotesk als enige optie).
2. Content: vervang alle teksten op de homepage, de contactpagina, het
   privacybeleid en de 404-pagina door de echte informatie uit de fiche
   (secties 2, 3 en 7) — geen lorem ipsum, geen voorbeeldtekst laten staan.
   Gebruik bij de sectie "Ervaringen" alleen echte, herleidbare reviews uit
   sectie 7; verzonnen testimonials zijn in België een misleidende
   handelspraktijk. Zijn er geen reviews, verwijder dan die hele sectie.
3. Contactgegevens: verwerk adres, telefoon, e-mail en openingsuren overal
   waar ze voorkomen: footer, contactpagina, en het JSON-LD Restaurant/
   LocalBusiness-blok (kies het juiste @type op basis van sectie 3).
4. SEO: werk canonical URLs, Open Graph-tags, sitemap.xml en robots.txt bij
   met het echte domein uit sectie 1. Herschrijf de meta-descriptions en
   JSON-LD op basis van sectie 5 (hoe de klant gevonden wil worden).
5. Functionaliteit: bouw enkel de pagina's en formulieren die in sectie 8
   gevraagd worden. Laat het ENDPOINT-veld in de formulierscripts leeg
   (mailto-fallback) tot ik zelf een Formspree-endpoint aanmaak en invul.
6. Analytics/cookies: laat de placeholder-configuratie staan zoals ze is
   (GA_MEASUREMENT_ID op G-XXXXXXXXXX, waardoor analytics.js bewust niets
   doet) tenzij sectie 8 een ander voorkeurstool aangeeft
   — meld dat dan expliciet, dat vervang ik zelf later.
7. Favicon/logo: als de klant een eigen logo aanleverde (sectie 6), gebruik
   dat in plaats van het gegenereerde blad-icoon; anders het bestaande
   sjabloon-icoon laten staan.
8. Privacybeleid: werk privacy/index.html bij met de juiste bedrijfsnaam,
   adres (sectie 2), ondernemingsnummer (sectie 7) en de datum van laatste
   wijziging.
9. 404-pagina: werk 404.html bij. Let op twee dingen: de links daarin zijn
   absoluut (https://[DOMEIN]/...) omdat relatieve paden op een 404 niet
   werken, en de kleuren staan er INLINE als kopie van brand.css. Pas je het
   palet aan, pas het dan ook daar aan.
10. Structuur niet wijzigen: de pagina's zitten in mappen (contact/index.html,
   privacy/index.html) zodat de URLs /contact/ en /privacy/ zijn, zonder
   .html. Maak dus geen contact.html in de root. Nieuwe pagina? Zelfde
   patroon: <naam>/index.html, met ../assets/... als pad, plus een eigen
   assets/css/pages/<naam>.css, en voeg ze toe aan sitemap.xml.

Loop nadien samen met mij nog eens door wat je hebt ingevuld of net hebt
opengelaten (bv. omdat een antwoord in de fiche ontbrak), zodat ik weet wat
ik nog moet aanvullen voor de site live kan.
```

---

*Waarom geen apart converter-script?* Een script dat de fiche parseert naar vaste velden is broos: elk intakegesprek verloopt anders, mensen antwoorden in volle zinnen, en soms ontbreekt een antwoord bewust. Claude Code kan die fiche gewoon *lezen en begrijpen*, precies zoals jij dat zou doen — dat is flexibeler én sneller om te bouwen dan een parser die je nadien moet onderhouden. Mocht je ooit merken dat je voor tientallen projecten per maand exact hetzelfde patroon herhaalt, dan is dát het moment om alsnog een script te overwegen — voorlopig is dit de simpelste weg die het werk doet.
