/* ------------------------------------------------------------------
   Fietsvakantiekaart, gedrag.

   Roep initFietskaart() aan nadat de kaarten in de pagina staan.
   In een framework: aanroepen bij mounted/onMounted en bij elke
   herrendering waarbij er kaarten bijkomen. Dubbel aanroepen is veilig.

   Wat het doet:
   1. Video speelt bij hover op een aanwijzer, en vanzelf op een touchscreen.
   2. De stippellijnen tussen de plaatsen lopen vol op het ritme van de
      scenes in de video.
   3. De plaats van de lopende scene licht op en blijft oplichten, zodat
      zichtbaar is welk deel van de route al afgelegd is.
   4. Het stilstaande beeld ligt over de video zolang die niet speelt.

   De scenegrenzen staan per kaart in data-scenes, in seconden:
   data-scenes="0,1.583333,3.291667,6"
   Dat zijn vier getallen voor drie scenes: begin, twee knippunten, eind.
   Aantal etappes in de routelijn moet gelijk zijn aan aantal scenes min een.
------------------------------------------------------------------- */

function initFietskaart(root = document) {
  root.querySelectorAll('[data-vlc]').forEach(wire);
}

function wire(card) {
  if (card.dataset.vlcKlaar) return;
  card.dataset.vlcKlaar = '1';

  const video = card.querySelector('.vlc__video');
  const route = card.querySelector('.vlc__route');
  if (!video || !route) return;

  const stops = [...route.querySelectorAll('.vlc__stop')];
  const legs = [...route.querySelectorAll('.vlc__leg')];
  const scenes = (card.dataset.scenes || '0,1.583333,3.291667,6')
    .split(',').map(Number).filter(n => !isNaN(n));
  if (scenes.length < 2) return;

  const klem = x => Math.max(0, Math.min(1, x));

  // per beeld bijwerken, niet op timeupdate: dat komt maar vier keer per seconde
  const teken = () => {
    const t = video.currentTime;

    let scene = 0;
    for (let i = 1; i < scenes.length - 1; i++) if (t >= scenes[i]) scene = i;
    route.classList.add('is-running');
    stops.forEach((s, i) => s.classList.toggle('is-done', i <= scene));

    legs.forEach((leg, i) => {
      const start = scenes[i], eind = scenes[i + 1];
      const p = eind > start ? klem((t - start) / (eind - start)) : 0;
      leg.style.setProperty('--f1', klem(p * 2));
      leg.style.setProperty('--f2', klem(p * 2 - 1));
    });
  };

  const wis = () => {
    route.classList.remove('is-running');
    stops.forEach(s => s.classList.remove('is-done'));
    legs.forEach(l => { l.style.setProperty('--f1', 0); l.style.setProperty('--f2', 0); });
  };

  let raf = 0;
  const lus = () => { teken(); raf = requestAnimationFrame(lus); };

  video.muted = true;
  video.addEventListener('play', () => {
    card.classList.add('is-playing');
    cancelAnimationFrame(raf); lus();
  });
  video.addEventListener('pause', () => {
    card.classList.remove('is-playing');
    cancelAnimationFrame(raf);
  });
  video.addEventListener('ended', wis);

  const rust = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const aanwijzer = window.matchMedia
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (rust) {
    // niets afspelen, het stilstaande beeld blijft staan
  } else if (!aanwijzer) {
    video.autoplay = true;
    video.play().catch(() => {});
  } else {
    card.addEventListener('mouseenter', () => { video.play().catch(() => {}); });
    card.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; wis(); });
  }

  const hart = card.querySelector('.vlc__heart');
  if (hart) hart.addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation();
    hart.setAttribute('aria-pressed', hart.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
  });

  wis();
}

/* Gewoon script: <script src="fietskaart.js"></script> en dan initFietskaart().
   Als ES module nodig: zet `export` voor de functie en haal de regel hieronder weg. */
if (typeof window !== 'undefined') window.initFietskaart = initFietskaart;
