# Projectfiche — [Klantnaam]

*Gebruik dit als leidraad tijdens je intakegesprek. Vul in tijdens of net na het gesprek — hoe voller, hoe minder je achteraf nog moet uitzoeken. Onbekend of nog te bepalen? Laat het gerust open, maar zet er `TODO` bij zodat het niet vergeten wordt.*

| | |
|---|---|
| **Datum intake** | ___ |
| **Ingevuld door** | ___ |
| **Repo-/projectnaam** | ___ |
| **Status** | intake / in opbouw / review / live |

---

## 1. Project & tijdlijn

- **Definitief domein:** ___
- **Gewenste live-datum:** ___
- **Talen:** ___ (enkel NL, of ook FR/EN?)
- **Aanleiding:** nieuwe zaak / vervangt bestaande website / herwerking van _______

---

## 2. Klant & bedrijfsgegevens

*Dit blok vult rechtstreeks de contactsectie, de footer, en het Schema.org-blok (JSON-LD) van de website.*

- **Officiële bedrijfsnaam:** ___
- **Ondernemingsvorm / ondernemingsnummer (BTW):** ___
- **Contactpersoon intake (naam + rol):** ___
- **Adres (straat, nr, postcode, gemeente):** ___
- **Telefoon:** ___
- **E-mail:** ___
- **Openingsuren:** ___ *(let op seizoensverschillen — noteer per seizoen/dag apart)*
- **Sociale media:** Facebook ___ · Instagram ___ · LinkedIn ___ · Google Bedrijfsprofiel ___
- **Bestaande website (indien van toepassing):** ___

---

## 3. Waarover gaat de zaak? (het echte intakegesprek)

- **Wat doet de klant precies, in zijn/haar eigen woorden?**
  > ___

- **Wat maakt deze zaak anders of beter dan de concurrentie (USP)?**
  > ___

- **Belangrijkste producten/diensten** *(dit wordt de kaart, het dienstenoverzicht, de portfolio — gebruik altijd de échte namen/prijzen, nooit verzonnen voorbeelden):*
  > ___

- **Prijsklasse** (bv. €, €€, €€€ — voor toon én voor `priceRange` in de structured data):
  > ___

- **Bijzondere voorwaarden** (bv. enkel op afspraak, enkel een bepaalde regio, minimum aantal personen, ...):
  > ___

---

## 4. Doelpubliek

- **Wie is de ideale klant?** (leeftijd, type, levenssituatie, waarom komen ze net hier)
  > ___

- **Welk probleem lost deze zaak voor hen op, of welk verlangen vervult ze?**
  > ___

- **Hoe zoeken deze mensen vandaag naar zo'n zaak?** (Google, mond-tot-mondreclame, social media, doorverwijzing, ...)
  > ___

- **Toon van communiceren:** formeel/informeel · "u" of "je" · speels of ingetogen
  > ___

---

## 5. Vindbaarheid & doelen (SEO-basis)

- **Hoe wil de klant gevonden worden?** (concrete zoektermen die een klant zou intypen, bv. "tandarts regio Gent zonder wachtlijst" of "loodgieter spoedinterventie [regio]")
  > ___

- **Belangrijkste geografische regio(‘s):** ___

- **Concurrenten** (URL's — vooral om qua stijl/toon net *niet* op te lijken):
  > ___

- **Hoofddoel van de website** (bellen/reserveren, offerte aanvragen, verkopen, gewoon informeren, ...):
  > ___

- **Bestaat er al:** Google Bedrijfsprofiel? ☐ ja ☐ nee — Analytics? ☐ ja ☐ nee — Search Console? ☐ ja ☐ nee

---

## 6. Branding

- **Bestaat er al een logo / kleurenpalet / huisstijl?** ☐ ja (bijlage/link: ___) ☐ nee, zelf invullen
- **Zo geen huisstijl: welke sfeer/kleuren passen bij de zaak?** (geen exacte hex-codes nodig — denk in gevoel: aards/warm, fris/modern, klassiek/chique, ...)
  > ___
- **Lettertype-voorkeur** (indien de klant iets specifiek wil):
  > ___
- **Websites die de klant mooi vindt, en waarom:**
  > ___
- **Wat de klant zeker NIET wil** (generieke AI-look, een bepaalde concurrent, te druk, te kleurrijk, ...):
  > ___

---

## 7. Content-inventaris

- **Eigen foto's beschikbaar?** ☐ ja, goede kwaliteit ☐ ja, wisselend ☐ nee → stockfoto's/AI-beeld nodig
- **Bestaande teksten om te hergebruiken** (over ons, dienstomschrijvingen, ...):
  > ___
- **Testimonials/reviews die getoond mogen worden** (bron: Google, Tripadvisor, eigen klantenmails, ...):
  > ___
- **Ondernemingsnummer voor footer/privacybeleid:** ___

---

## 8. Functionaliteit

- **Nodige pagina's:** ☐ Home ☐ Contact ☐ Over ons ☐ Diensten/Menu ☐ Privacybeleid ☐ Anders: ___
  *(Home, Contact, Privacybeleid en de 404-pagina zitten al in de template.)*
- **Formulieren nodig:** ☐ contactformulier ☐ reservatie/afspraak ☐ offerteaanvraag ☐ anders: ___
  - **Waar moeten inzendingen terechtkomen?** (e-mail rechtstreeks / Formspree / anders) ___
- **Boekingssysteem of agenda-koppeling nodig?** ☐ ja (welke tool: ___) ☐ nee
- **Analytics-voorkeur:** ☐ Google Analytics 4 ☐ privacyvriendelijk alternatief (GoatCounter/Plausible) ☐ geen voorkeur
- **Cookie-gevoelige extra's** (chatwidget, video-embeds, ...) die de cookiebanner beïnvloeden:
  > ___

---

## 9. Techniek & beheer

- **Wie beheert domein/DNS?** ☐ klant zelf ☐ Idento (broer) ☐ andere partij: ___
- **Wil de klant later zelf kunnen bewerken, of blijft dat bij Idento?**
  > ___
- **Hosting:** ☐ GitHub Pages + eigen domein (standaard) ☐ anders: ___

---

## 10. Notities / bijzonderheden

> ___

---

*Zodra dit is ingevuld: bewaar deze fiche als `PROJECT-BRIEF.md` in de root van het nieuwe projectrepo. Dat is de bron waarmee je het project opstart — zie `project-kickoff-prompt.md`.*

> **Die fiche wordt niet meegepusht.** `PROJECT-BRIEF.md` staat in `.gitignore`, omdat de klantrepo's publiek zijn en hier prijsafspraken, concurrenten en interne notities in staan. Claude Code leest het bestand gewoon uit je projectmap; git negeert het.
>
> Gevolg: er is geen back-up via git. Bewaar je ingevulde fiche dus ook buiten de repo — in je eigen klantenmap of op je drive.*
