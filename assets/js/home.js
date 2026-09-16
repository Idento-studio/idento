/* ==========================================================================
   home.js — interacties die alleen op de homepage bestaan.
   Alles is progressive enhancement: zonder JS blijft de pagina volledig
   leesbaar en bruikbaar. Geen libraries — requestAnimationFrame,
   IntersectionObserver en de Canvas 2D API volstaan.
   ========================================================================== */
(function () {
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(pointer:fine)').matches;

  /* ---------- hero: regels rollen omhoog ---------- */
  (function () {
    if (reduced) return;
    var lines = document.querySelectorAll('#heroTitle .ln > span');
    lines.forEach(function (s, i) {
      s.style.transform = 'translateY(108%)';
      s.style.transition = 'transform 1.05s cubic-bezier(.16,1,.3,1) ' + (0.1 + i * 0.11) + 's';
    });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        lines.forEach(function (s) { s.style.transform = 'translateY(0)'; });
      });
    });
  })();

  /* ---------- scoredashboard: ring en cijfer animeren als één geheel ----------
     Geen CSS-transitie: JS zet stroke-dashoffset élke frame op exact
     dezelfde voortgang als het cijfer (50 -> 180° van de 360°-cirkel). */
  (function () {
    var board = document.getElementById('scoreBoard');
    if (!board) return;
    var rings = board.querySelectorAll('.score-ring');
    if (!rings.length) return;
    var CIRC = 326.7;

    function animateRing(ring) {
      var target = parseInt(ring.getAttribute('data-target'), 10) || 0;
      var fill = ring.querySelector('.ring-fill');
      var valueEl = ring.querySelector('.ring-value');
      var checkEl = ring.querySelector('.ring-check');
      if (reduced || !valueEl) return;
      /* generatie-teller: als een hover de replay opnieuw start terwijl de
         vorige telling nog loopt, stopt de oude lus zichzelf hieronder */
      var gen = (ring._gen = (ring._gen || 0) + 1);
      var start = null, dur = 2400;
      function step(ts) {
        if (ring._gen !== gen) return;
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var value = eased * target;
        valueEl.textContent = Math.round(value);
        if (fill) fill.style.strokeDashoffset = CIRC * (1 - value / 100);
        if (p < 1) { requestAnimationFrame(step); }
        else if (checkEl) { checkEl.classList.add('is-visible'); }
      }
      requestAnimationFrame(step);
    }

    if (!reduced && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { animateRing(entry.target); io.unobserve(entry.target); }
        });
      }, { threshold: 0.4 });
      rings.forEach(function (r) { io.observe(r); });
    } else if (!reduced) {
      rings.forEach(animateRing);
    }

    /* Hover speelt de animatie opnieuw af vanaf 0 — animateRing begint zijn
       eerste frame altijd op waarde 0, dus gewoon opnieuw aanroepen volstaat. */
    rings.forEach(function (r) {
      r.addEventListener('mouseenter', function () {
        var checkEl = r.querySelector('.ring-check');
        if (checkEl) checkEl.classList.remove('is-visible');
        animateRing(r);
      });
    });
  })();

  /* ---------- traject-tijdlijn: lijn tekent in, stops lichten na elkaar op ----------
     Eén class-toggle stuurt alles aan; de stagger tussen de stops zit als
     transition-delay (var(--d)) al in de CSS, niet in JS-timing. */
  (function () {
    var timeline = document.getElementById('trajectTimeline');
    if (!timeline) return;

    function reveal() { timeline.classList.add('is-visible'); }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { reveal(); io.unobserve(entry.target); }
        });
      }, { threshold: 0.4 });
      io.observe(timeline);
    } else {
      reveal();
    }
  })();

  /* ---------- icoon <-> titel koppelen op hover + klik ----------
     Aanpak: elke score-ring hoort bij het rijtje op dezelfde plek eronder.
     Traject: elk tijdlijn-bolletje hoort bij de stap op dezelfde plek. Hover
     op het icoon zet de rij in dezelfde "actief"-stand als een rechtstreekse
     hover erop (.is-linked spiegelt de bestaande :hover-stijl van .row), en
     een klik scrollt naar de titel van die rij. */
  function linkHoverToRows(sectionId, iconSelector) {
    var section = document.getElementById(sectionId);
    if (!section) return;
    var icons = section.querySelectorAll(iconSelector);
    var rows = section.querySelectorAll('.rows > .row');
    icons.forEach(function (icon, i) {
      var row = rows[i];
      if (!row) return;
      icon.addEventListener('mouseenter', function () { row.classList.add('is-linked'); });
      icon.addEventListener('mouseleave', function () { row.classList.remove('is-linked'); });
      icon.addEventListener('click', function () {
        var title = row.querySelector('h3') || row;
        title.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
      });
    });
  }
  linkHoverToRows('aanpak', '.score-ring');
  linkHoverToRows('traject', '.timeline-node');

  /* ---------- zachte lichtvlek achter de cursor ---------- */
  (function () {
    var spot = document.getElementById('spot');
    if (!spot || !fine || reduced) return;
    spot.style.display = 'block';
    var sx = window.innerWidth / 2, sy = window.innerHeight / 2, tx = sx, ty = sy;
    window.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; });
    (function loop() {
      sx += (tx - sx) * 0.07;
      sy += (ty - sy) * 0.07;
      spot.style.transform = 'translate(' + (sx - 320) + 'px,' + (sy - 320) + 'px)';
      requestAnimationFrame(loop);
    })();
  })();

  /* ---------- magnetische knoppen ---------- */
  if (fine && !reduced) {
    document.querySelectorAll('.btn').forEach(function (b) {
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX - (r.left + r.width / 2)) * 0.22) + 'px,' +
                                           ((e.clientY - (r.top + r.height / 2)) * 0.35) + 'px)';
      });
      b.addEventListener('mouseleave', function () { b.style.transform = ''; });
    });
  }

  /* ---------- hero: flow field ----------
     Deeltjes volgen een onzichtbaar krachtveld en stuiven weg voor de cursor. */
  (function () {
    var c = document.getElementById('field');
    if (!c) return;
    var x = c.getContext('2d');
    var W, H, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var P = [], N = 0, t = 0, mx = -9999, my = -9999, alive = true;

    function spawn() {
      return { x: Math.random() * W, y: Math.random() * H, life: 40 + Math.random() * 180,
               s: 0.35 + Math.random() * 1.25, h: Math.random() };
    }
    function size() {
      var r = c.getBoundingClientRect();
      W = r.width; H = r.height;
      c.width = W * dpr; c.height = H * dpr;
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      x.fillStyle = '#070D18'; x.fillRect(0, 0, W, H);
      N = Math.round(Math.min(760, Math.max(240, W * H / 1900)));
      P = []; for (var i = 0; i < N; i++) P.push(spawn());
    }
    function ang(px, py) {
      return (Math.sin(px * 0.0024 + t * 0.42) + Math.cos(py * 0.0031 - t * 0.31) +
              Math.sin((px + py) * 0.0016 + t * 0.19)) * 1.9;
    }
    window.addEventListener('resize', size);
    window.addEventListener('mousemove', function (e) {
      var r = c.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { alive = en[0].isIntersecting; }, { threshold: 0 }).observe(c);
    }
    size();

    function frame() {
      x.fillStyle = 'rgba(7,13,24,.038)';
      x.fillRect(0, 0, W, H);
      for (var i = 0; i < P.length; i++) {
        var p = P[i], a = ang(p.x, p.y);
        var vx = Math.cos(a) * p.s, vy = Math.sin(a) * p.s;
        var dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
        if (d < 220) { var f = 1 - d / 220; vx += (dx / (d || 1)) * f * 3.1; vy += (dy / (d || 1)) * f * 3.1; }
        var nx = p.x + vx, ny = p.y + vy;
        x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(nx, ny);
        if (p.h > 0.9)      { x.strokeStyle = 'rgba(37,245,206,.85)'; x.lineWidth = 1.3; }
        else if (p.h > 0.7) { x.strokeStyle = 'rgba(60,120,240,.72)'; x.lineWidth = 1.1; }
        else                { x.strokeStyle = 'rgba(18,87,227,.4)';   x.lineWidth = 0.8; }
        x.stroke();
        p.x = nx; p.y = ny; p.life--;
        if (p.life < 0 || p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) P[i] = spawn();
      }
      t += 0.0032;
    }
    frame(); frame(); frame();   /* eerste beeld staat er meteen */
    if (!reduced) (function loop() { if (alive) frame(); requestAnimationFrame(loop); })();
  })();

  /* ---------- statement: woorden lichten op bij het scrollen ---------- */
  (function () {
    var el = document.querySelector('[data-words]');
    if (!el) return;
    var hi = (el.getAttribute('data-hi') || '').split(',').map(Number);
    var words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(function (w, i) {
      return '<w class="' + (hi.indexOf(i) > -1 ? 'is-hi' : '') + '">' + w + '</w>';
    }).join(' ');
    var ws = el.querySelectorAll('w');
    if (reduced) { ws.forEach(function (w) { w.classList.add('is-on'); }); return; }
    function upd() {
      var r = el.getBoundingClientRect();
      var p = (window.innerHeight * 0.86 - r.top) / (r.height + window.innerHeight * 0.34);
      p = Math.max(0, Math.min(1, p));
      var n = Math.round(p * ws.length);
      ws.forEach(function (w, i) { w.classList.toggle('is-on', i < n); });
    }
    window.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd);
    upd();
  })();

  /* ---------- ticker die meeversnelt met de scrollsnelheid ---------- */
  (function () {
    var tk = document.getElementById('ticker');
    if (!tk || reduced) return;
    var off = 0, base = 0.45, vel = 0, last = window.scrollY, half = 0;
    function measure() { half = tk.scrollWidth / 2; }
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', function () { vel = window.scrollY - last; last = window.scrollY; }, { passive: true });
    (function loop() {
      vel *= 0.9;
      off -= base + Math.min(Math.abs(vel) * 0.22, 12);
      if (half && -off >= half) off += half;
      var sk = Math.max(-7, Math.min(7, vel * 0.28));
      tk.style.transform = 'translateX(' + off + 'px) skewX(' + (-sk) + 'deg)';
      requestAnimationFrame(loop);
    })();
  })();

  /* ---------- live case-showcase ----------
     De cases komen straks uit de backend. Elk item: titel, uitleg,
     functionaliteiten en de URL van het gerealiseerde project. */
  var CASES = [
    {
      title: 'Korst — bedrijfscatering, regio Gent',
      url: 'https://idento-studio.github.io/korst/',
      urlLabel: 'idento-studio.github.io/korst/',
      desc: 'Korst levert dagverse ontbijt-, lunch- en aperoboxen aan kantoren rond Gent. ' +
            'Voor hen bouwden we een site waar een kantoorverantwoordelijke in twee minuten ' +
            'een bestelling voor tien tot honderd personen rond heeft.',
      facts: [
        'Bestelflow met allergenen en aantallen per persoon',
        'Weekmenu dat ze zelf aanpassen, zonder ons',
        'Lokale SEO op "broodjesservice Gent"',
        'Bevestigingsmail naar klant én keuken'
      ]
    },
    {
      title: 'VZW Kadee — vakantiekampen voor jongeren',
      url: 'https://vzwkadee.be/',
      urlLabel: 'vzwkadee.be',
      desc: 'Kadee organiseert sinds 2017 themavakantiekampen en -weekends voor kinderen en ' +
            'tieners, met een aparte werking voor hun vrijwilligers.',
      facts: [
        'Actief sinds 2017',
        'Themaweken en -weekends voor kinderen en tieners',
        'Eigen werking voor vrijwilligers'
      ]
    },
    {
      title: 'Restaurant Bazaar — Oeigoerse keuken, Borsbeek',
      url: 'https://restaurant-bazaar.be/',
      urlLabel: 'restaurant-bazaar.be',
      desc: 'Restaurant Bazaar serveert authentieke Oeigoerse, Oezbeekse en Kazachse gerechten, ' +
            'met handgetrokken noedels als huisspecialiteit — volledig halal en alcoholvrij.',
      facts: [
        'Handgetrokken noedels volgens eeuwenoude techniek',
        '100% halal en alcoholvrij',
        'Traditionele lage tafels of gewone tafels'
      ]
    },
    {
      title: 'NXT Accountants — boekhouding & fiscaliteit',
      url: 'https://nxtaccountants.be/',
      urlLabel: 'nxtaccountants.be',
      desc: 'NXT Accountants combineert digitale samenwerking met persoonlijk advies: ' +
            'boekhouding, fiscale optimalisatie, loonadministratie en financieel advies.',
      facts: [
        'Boekhouding, fiscaliteit, loonadministratie en advies',
        'Drie kantoren: Dendermonde, Beveren, Sint-Denijs-Westrem',
        'Digitale samenwerking met persoonlijke opvolging'
      ]
    },
    {
      title: 'Fjiero — videomarketing, Harelbeke',
      url: 'https://fjiero.be/',
      urlLabel: 'fjiero.be',
      desc: 'Fjiero is een videomarketingbureau dat strategie, contentproductie, social media ' +
            'en performance marketing combineert tot video\'s die meetbaar resultaat opleveren.',
      facts: [
        'Strategie, productie, social en performance marketing',
        'Ook actief in recruitment marketing',
        'Gevestigd in Harelbeke'
      ]
    },
    {
      title: 'Aan Zé — vakantieverblijf, Oostduinkerke',
      url: 'https://aanze.be/',
      urlLabel: 'aanze.be',
      desc: 'Aan Zé is een stijlvol vakantieappartement met zeezicht in Oostduinkerke, ' +
            'welkom voor gezinnen, kinderen en huisdieren.',
      facts: [
        'Zeezicht in Oostduinkerke',
        'Welkom voor gezinnen en huisdieren'
      ]
    },
    {
      title: 'Yammi Yammi — Japans all-you-can-eat, Gent',
      url: 'https://yammiyammi.be/',
      urlLabel: 'yammiyammi.be',
      desc: 'Yammi Yammi is een Japans all-you-can-eat restaurant in Gent: drie uur lang ' +
            'sushi en grillgerechten aan een vaste prijs.',
      facts: [
        'All-you-can-eat, drie uur lang',
        'Sushi én grillgerechten',
        'Overpoortstraat, Gent'
      ]
    },
    {
      title: 'Kiné Pierreux — kinesitherapie, Halle',
      url: 'https://kinepierreux.be/',
      urlLabel: 'kinepierreux.be',
      desc: 'Kiné Pierreux is een kinesitherapiepraktijk in Halle, gespecialiseerd in ' +
            'sportletsels, manuele therapie, revalidatie en dry needling.',
      facts: [
        'Sportletsels en manuele therapie',
        'Revalidatie en dry needling',
        'Gevestigd in Halle'
      ]
    },
    {
      title: 'MB Autocenter — Duitse occasiewagens, Rumst',
      url: 'https://mbautocenter.be/',
      urlLabel: 'mbautocenter.be',
      desc: 'MB Autocenter koopt, verkoopt en importeert Duitse occasiewagens — BMW, ' +
            'Mercedes-Benz, Audi en Volkswagen — en neemt ook wagens in consignatie.',
      facts: [
        'Aan- en verkoop van BMW, Mercedes, Audi, Volkswagen',
        'Ook wagens in consignatie',
        'Gevestigd in Rumst'
      ]
    },
    {
      title: 'AJC Vitres — glas- & gevelreiniging',
      url: 'https://ajcvitres.be/',
      urlLabel: 'ajcvitres.be',
      desc: 'AJC Vitres reinigt ramen, daken, zonnepanelen, terrassen en gevels voor ' +
            'particulieren en bedrijven in Brussel en Vlaanderen.',
      facts: [
        'Ramen, daken, zonnepanelen, terrassen en gevels',
        'Actief in Brussel en Vlaanderen'
      ]
    },
    {
      title: 'Tuinaanneming De Koster — tuinaanleg, Halle',
      url: 'https://dekoster.be/',
      urlLabel: 'dekoster.be',
      desc: 'Tuinaanneming De Koster ontwerpt, legt aan en onderhoudt tuinen, met grond- en ' +
            'infrastructuurwerken erbij — in nauw overleg met elke klant.',
      facts: [
        'Ontwerp, aanleg en onderhoud van tuinen',
        'Grond- en infrastructuurwerken',
        'Persoonlijk contact met elke klant'
      ]
    },
    {
      title: 'Jouw volgende case',
      url: 'assets/demo/case-placeholder.html',
      urlLabel: 'nieuwe case — nog toe te voegen',
      desc: 'Elk project dat je oplevert komt hier terecht: korte uitleg over de klant, ' +
            'wat de site moest oplossen, en de site zelf die live meeschaalt met het toestel.',
      facts: [
        'URL van het project in de backend',
        'Titel, uitleg en drie tot vier functionaliteiten',
        'Bezoeker bladert door met "Toon andere case"'
      ]
    }
  ];

  (function () {
    var frame = document.getElementById('caseFrame');
    var vp = document.getElementById('caseViewport');
    var site = document.getElementById('caseSite');
    if (!frame || !vp || !site) return;

    var stage = frame.parentElement;
    var bezel = frame.querySelector('.bezel');
    var urlEl = frame.querySelector('.chrome .url');
    var dw = document.getElementById('viewportWidth');
    var titleEl = document.getElementById('caseTitle');
    var descEl = document.getElementById('caseDesc');
    var factsEl = document.getElementById('caseFacts');
    var nextBtn = document.getElementById('caseNext');
    var linkEl = document.getElementById('caseLink');

    var DEV = { desktop: 1440, tablet: 834, mobile: 390 };
    /* Echte beeldverhoudingen per toestel — anders krijgt "mobiel" het platte
       hoogtebudget van desktop en oogt hij veel te langgerekt. */
    var DEV_H = { desktop: 900, tablet: 1112, mobile: 844 };
    var cur = 'desktop', scale = 0.6, VPH = 0, avail = 900, fit = false;
    var w = DEV.desktop, raf = null, ci = 0;

    function measure() {
      avail = Math.max(200, (stage ? stage.clientWidth : 900) - 4) - 28;  /* 28 = padding + rand */
      /* Op een breed scherm krimpt het toestel fysiek mee (vaste schaal).
         Op een smal scherm zou 390 px een sliver van 80 px worden — daar
         houden we het kader even groot en schaalt enkel de inhoud. */
      fit = avail < 430;
      scale = Math.max(0.18, Math.min(0.62, avail / DEV.desktop));
      var maxH = Math.round(Math.min(620, Math.max(300, window.innerHeight * 0.58)));
      var targetH = DEV_H[cur] || DEV_H.desktop;
      VPH = Math.round(Math.min(maxH, targetH * (fit ? avail / DEV[cur] : scale)));
      paint();
    }

    /* één bron van waarheid: kader, iframe en teller komen uit dezelfde w */
    function paint() {
      var iw = Math.round(w);
      if (fit) scale = avail / iw;
      site.style.width = iw + 'px';
      site.style.height = Math.round(VPH / scale) + 'px';
      site.style.transform = 'scale(' + scale + ')';
      var vw = iw * scale;
      vp.style.width = vw + 'px';
      vp.style.height = VPH + 'px';
      if (bezel) bezel.style.width = (vw + 20) + 'px';
      if (dw) dw.textContent = iw + ' px';
    }

    function setDevice(dev, instant) {
      if (dev === cur && !instant) return;
      cur = dev;
      frame.className = 'frame is-' + cur;
      document.querySelectorAll('.dchip').forEach(function (b) {
        b.classList.toggle('is-on', b.getAttribute('data-device') === cur);
      });
      measure();
      var target = DEV[dev];
      if (raf) cancelAnimationFrame(raf);
      if (reduced || instant) { w = target; paint(); return; }
      var from = w, st = performance.now(), dur = 950;
      (function step(now) {
        var p = Math.min(1, (now - st) / dur), e = 1 - Math.pow(1 - p, 3);
        w = from + (target - from) * e;
        paint();
        if (p < 1) raf = requestAnimationFrame(step); else { w = target; paint(); }
      })(performance.now());
    }

    function showCase(i, first) {
      var c = CASES[i];
      site.src = c.url;
      if (titleEl) titleEl.textContent = c.title;
      if (descEl) descEl.textContent = c.desc;
      if (urlEl) urlEl.textContent = c.urlLabel;
      if (linkEl) linkEl.href = c.url;
      if (factsEl) factsEl.innerHTML = c.facts.map(function (f) { return '<li>' + f + '</li>'; }).join('');
      if (!first && !reduced) {
        [titleEl, descEl, factsEl].forEach(function (el) {
          if (!el) return;
          el.style.transition = 'none';
          el.style.opacity = '0';
          el.style.transform = 'translateY(8px)';
          requestAnimationFrame(function () {
            el.style.transition = 'opacity .5s ease, transform .5s cubic-bezier(.16,1,.3,1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          });
        });
      }
    }

    /* Cases komen in willekeurige volgorde, nooit twee keer dezelfde na
       elkaar — en zonder tellertje, want "5 / 12" wekt de indruk dat we
       maar 12 sites ooit gebouwd hebben. */
    function randomCaseIndex() {
      if (CASES.length < 2) return 0;
      var next;
      do { next = Math.floor(Math.random() * CASES.length); } while (next === ci);
      return next;
    }

    document.querySelectorAll('.dchip').forEach(function (b) {
      b.addEventListener('click', function () { setDevice(b.getAttribute('data-device')); });
    });
    if (nextBtn) nextBtn.addEventListener('click', function () {
      ci = randomCaseIndex();
      showCase(ci, false);
    });

    window.addEventListener('resize', measure);
    measure();
    setDevice('desktop', true);
    ci = Math.floor(Math.random() * CASES.length);
    showCase(ci, true);
    /* Bewust geen automatisch doorlopen van desktop/tablet/mobiel: dat
       herschaalt de iframe van een externe klantsite om de paar seconden
       zonder dat iemand erom vraagt, en dat brak op sommige klantsites de
       eigen (lazy-load/hero-hoogte) JS — een deel van het scherm bleef dan
       wit. Nu alleen resizen op een bewuste klik van de bezoeker. */
  })();

  /* ---------- prijssimulator ----------
     Alles als [laag, hoog]: de simulator geeft een marge, geen schijnprecisie. */
  (function () {
    var pages = document.getElementById('calcPages');
    if (!pages) return;

    var BASE = { one: [1500, 2000], multi: [2400, 3200], shop: [3500, 4400] };
    var INCL = { one: 1, multi: 5, shop: 6 };
    var PER  = { one: [180, 240], multi: [180, 240], shop: [210, 280] };
    var COPY = [90, 130], SEO = [450, 650], PHOTO = [550, 750], LOGO = [690, 950];
    var LANG = [0.30, 0.40], CARE = 45;
    var CAP = 5500;                        /* daarboven: offerte op maat */

    var loEl = document.getElementById('priceLow');
    var hiEl = document.getElementById('priceHigh');
    var pagesOut = document.getElementById('calcPagesOut');
    var pagesField = document.getElementById('calcPagesField');
    var monthly = document.getElementById('calcMonthly');
    var spec = document.getElementById('calcSpec');

    var r50 = function (v) { return Math.round(v / 50) * 50; };
    var nr  = function (v) { return Math.round(v).toLocaleString('nl-BE'); };
    var fmt = function (v) { return '€ ' + nr(v); };
    var rng = function (a, b) { return a === b ? fmt(a) : '€ ' + nr(a) + '–' + nr(b); };

    var shownLo = 1500, shownHi = 2000;

    function tick(fromLo, fromHi, toLo, toHi, over) {
      if (reduced) { loEl.textContent = fmt(toLo); hiEl.textContent = nr(toHi) + (over ? '+' : ''); return; }
      var st = performance.now();
      (function s(now) {
        var p = Math.min(1, (now - st) / 480), e = 1 - Math.pow(1 - p, 3);
        loEl.textContent = fmt(fromLo + (toLo - fromLo) * e);
        hiEl.textContent = nr(fromHi + (toHi - fromHi) * e);
        if (p < 1) requestAnimationFrame(s);
        else { loEl.textContent = fmt(toLo); hiEl.textContent = nr(toHi) + (over ? '+' : ''); }
      })(st);
    }

    function on(id) { var el = document.getElementById(id); return el && el.checked; }

    function calc() {
      var type = document.querySelector('input[name=sitetype]:checked').value;
      var isOne = type === 'one';
      pagesField.style.display = isOne ? 'none' : 'block';
      var n = isOne ? 1 : parseInt(pages.value, 10);
      pagesOut.textContent = n >= 12 ? '12+' : (n < 10 ? '0' + n : n);

      var lo = 0, hi = 0, rows = [];
      function add(label, l, h) { lo += l; hi += h; rows.push([label, l, h]); }

      add(isOne ? 'Onepager' : type === 'shop' ? 'Webshop' : "Meerdere pagina's", BASE[type][0], BASE[type][1]);

      var ex = Math.max(0, n - INCL[type]);
      if (ex) add(ex + ' extra pagina' + (ex > 1 ? "'s" : ''), ex * PER[type][0], ex * PER[type][1]);
      if (on('optCopy'))  add('Teksten (' + n + ' pag.)', n * COPY[0], n * COPY[1]);
      if (on('optSeo'))   add('SEO-start', SEO[0], SEO[1]);
      if (on('optPhoto')) add('Fotografie', PHOTO[0], PHOTO[1]);
      if (on('optLogo'))  add('Logo & huisstijl', LOGO[0], LOGO[1]);
      if (on('optLang'))  add('Tweede taal', Math.round(lo * LANG[0]), Math.round(hi * LANG[1]));

      lo = r50(lo); hi = r50(hi);
      var over = hi > CAP;
      if (over) hi = CAP;
      if (lo > CAP) lo = CAP;

      monthly.textContent = on('optCare')
        ? '+ ' + fmt(CARE) + ' per maand voor hosting, updates en back-ups'
        : 'Zonder onderhoudscontract — hosting regel je zelf';

      tick(shownLo, shownHi, lo, hi, over);
      shownLo = lo; shownHi = hi;

      spec.innerHTML = rows.map(function (x) {
        return '<div><span>' + x[0] + '</span><span>' + rng(r50(x[1]), r50(x[2])) + '</span></div>';
      }).join('') + (over
        ? '<div style="opacity:.75"><span>Boven € 5.500</span><span>offerte op maat</span></div>' : '');
    }

    document.querySelectorAll('input[name=sitetype]').forEach(function (el) { el.addEventListener('change', calc); });
    pages.addEventListener('input', calc);
    ['optCopy', 'optSeo', 'optPhoto', 'optLang', 'optLogo', 'optCare'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('change', calc);
    });
    calc();
  })();

  /* ---------- zachte anker-scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    });
  });
})();
