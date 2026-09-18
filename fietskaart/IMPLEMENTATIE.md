# Fietsvakantiekaart

De kaart uit versie 6 van het prototype, losgetrokken als component. Geen
Tailwind, geen framework, geen build. Alles zit onder de klasse `vlc`.

## Openen

`index.html` dubbelklikken. De media staan als losse bestanden in `media/`.

## Bestanden

| bestand | inhoud |
| --- | --- |
| `index.html` | het volledige sjabloon van de kaart, met commentaarregels eromheen |
| `fietskaart.css` | alle stijl, met tokens bovenaan in `.vlc` |
| `fietskaart.js` | video, voortgangsbalk, oplichtende plaatsen, stilstaand beeld |
| `media/route.mp4` | voorbeeldvideo, 6 seconden, 3 scenes, zonder audio, 242 kB |
| `media/thumbnail.jpg` | stilstaand beeld dat over de video ligt tot hij speelt |
| `media/poster.jpg` | eerste frame van de video, valt terug als het stilstaande beeld er niet is |
| `PROMPT.md` | tekst om in de andere sessie te plakken |

## Opbouw, van boven naar beneden

1. **Beeldvlak**, 240 hoog. Daarin op elkaar: video, stilstaand beeld, verloop,
   kortingsbadge linksboven, favorietenhart rechtsboven, routelijn onderin.
2. **Soort vakantie**, Recoleta 700 16/20.8.
3. **Plaatsen** met speld, 13/18 in `#555555`.
4. **Titel**, Recoleta 700 18/23.4, afgekapt op vier regels.
5. **Label** Fietsvakantie, Recoleta 600 13/20.8 in `#FB862C`.
6. **Inclusief**, vier regels met vinkjes in `#27C88D`, 14/22.4.
7. **Personen en nachten**, vet 14/22.4.
8. **Prijsregel**: Vanaf cursief grijs, nieuwe prijs Recoleta 700 22, oude prijs
   doorgestreept in `#D32F2F`, info-rondje, en rechts de knop Bekijk.

## Maatvoering

Alle witruimte tussen de blokken is `--vlc-ruimte`, standaard 16 en onder 768
breed 20. Binnen een blok is de ruimte kleiner: 6 tussen de inclusiefregels,
6 tussen plaatsnaam en stip. Dat verschil draagt de hiërarchie, dus houd het
onderscheid in stand als je de maat verandert.

`--vlc-as` is de hoogte waarop de stippen, de stippellijn en de fiets liggen,
gerekend vanaf de bovenkant van de rij. De plaatsnaam staat erboven, het aantal
nachten eronder, allebei even hoog, zodat de lijn verticaal in het midden ligt.
Verander je de tekstgroottes in de routelijn, herbereken dan `--vlc-as`:
regelhoogte plaatsnaam + marge + halve stip.

## Gedrag

**Video.** Speelt bij hover op een apparaat met een aanwijzer en start vanzelf
op een touchscreen. Altijd zonder geluid, in een lus, met `playsinline` zodat
iOS hem niet fullscreen opent. Bij het verlaten van de kaart springt hij terug
naar het begin.

**Stilstaand beeld.** Ligt over de video zolang die niet speelt en vervaagt in
250ms zodra het beeld start. Zo bepaal je zelf wat er in de resultatenlijst
staat in plaats van het eerste frame van de video.

**Voortgangsbalk.** De stippellijn tussen twee plaatsen loopt vol van 42 procent
wit naar vol wit, streepje voor streepje van links naar rechts, gelijk met de
scene die loopt. Bij drie scenes:

| scene | tijd | plaats aan | balk |
| --- | --- | --- | --- |
| 1 | 0 – 1,583 | Delden | Delden naar Raalte loopt vol |
| 2 | 1,583 – 3,292 | Delden, Raalte | Raalte naar Markelo loopt vol |
| 3 | 3,292 – 6,0 | Delden, Raalte, Markelo | beide staan vol |

Bereikte plaatsen blijven oplichten, zodat zichtbaar is welk deel van de route
al afgelegd is. Wat nog niet bereikt is staat op 45 procent wit.

Het bijwerken gebeurt per beeld met `requestAnimationFrame`, niet op
`timeupdate`: dat laatste vuurt vier keer per seconde en loopt zichtbaar in
schokjes.

**In rust** licht er niets op en ziet de routelijn eruit als een gewone
stippellijn. Alleen tijdens het afspelen gaat het onderscheid aan.

**Minder beweging.** Bij de systeeminstelling voor minder beweging speelt er
niets en blijft het stilstaande beeld staan.

## Data die de kaart nodig heeft

| veld | voorbeeld | waar |
| --- | --- | --- |
| korting | `-35%` | badge |
| video | `media/route.mp4` | beeldvlak |
| scenegrenzen | `0,1.583333,3.291667,6` | `data-scenes`, in seconden |
| stilstaand beeld | `media/thumbnail.jpg` | over de video |
| plaatsen | Delden, Raalte, Markelo | routelijn en plaatsregel |
| nachten per plaats | 2, 2, 2 | routelijn |
| soort | Fietsvakantie met 3 hotels | boven de titel |
| titel | volledige arrangementsnaam | kop |
| inclusief | vier regels | vinkjes |
| personen en nachten | 2 personen, 6 nachten | boven de prijs |
| prijzen | €1.059 en €1.635 | prijsregel |

Het aantal etappes in de routelijn moet gelijk zijn aan het aantal scenes min
een. Bij twee hotels dus twee scenes en een etappe, bij vier hotels vier scenes
en drie etappes. Kloppen die niet, dan loopt de balk niet gelijk met het beeld.

## Varianten

`vlc--blur` op de kaart vervangt het zwarte verloop achter de routelijn door
matglas: blur 12 met een tint van 42 procent zwart. Op lichte beelden is dat
minder leesbaar dan het verloop.

## Fonts

De CSS vraagt om `Recoleta` en `Basis Grotesque` en valt anders terug op
Playfair Display en Georgia, en op Inter en de systeemletter. In dit losse
pakket zitten geen fonts, dus daar zie je de terugval. In het redesignproject
staan ze al in `public/fonts/` onder dezelfde namen, dus daar klopt het vanzelf.

## Let op

- De scenegrenzen van de voorbeeldvideo zijn nagemeten op losse frames.
  Controleer ze per video, anders loopt de balk voor of achter.
- De plaatsnamen in de routelijn worden afgekapt met puntjes als ze niet
  passen. Bij lange namen en drie hotels wordt het krap onder de 300 breed.
- De oude prijs staat in `#D32F2F`. Dat is hetzelfde token als foutmeldingen;
  pas je dat aan, dan verandert elke prijs mee.
- Het stilstaande beeld in `media/` komt uit een nieuwsartikel over Delden.
  Prima voor een prototype, maar controleer de rechten voor productie.
- De video staat op `preload="metadata"`. Daardoor laadt een resultatenpagina
  met tien kaarten niet tien video's binnen, maar kan de eerste hover een
  fractie haperen. Wil je dat niet, laad de video dan bij `mouseenter` in
  plaats van bij het renderen, of zet `preload="auto"` op de eerste rij.
