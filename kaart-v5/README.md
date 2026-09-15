# ViaLuxury arrangementkaarten, versie 5

De elf kaarten van versie 5, losgetrokken uit het prototype. Bedoeld als bron voor het
omzetten van de kaart naar de nieuwe huisstijl. Alleen de kaarten, geen header, filters,
toolbar of footer.

## Openen

`index.html` dubbelklikken. Er is geen server nodig, alle fonts en foto's zitten als
data-URI in de bestanden.

Met de schuif bovenaan stel je de paginabreedte in. Standaard 1240, dan is de kaart
397 breed en 632 hoog, precies zoals in het prototype.

## Bestanden

| bestand | inhoud |
| --- | --- |
| `index.html` | de elf kaarten, in de originele markup van de site |
| `site.css` | fonts en de bestaande sitestijl, ongewijzigd overgenomen |
| `kaart.css` | alles wat versie 5 bovenop die sitestijl legt, 52 regels |
| `pagina.css` | alleen de demopagina eromheen, mag weg |

## De elf kaarten

Tien fietsvakanties en op de tweede plek een gewoon hotelarrangement ter vergelijking.
Die laatste heeft een stippelrand en het label "Gewoon arrangement", allebei alleen om
het verschil te laten zien. In productie hebben gewone arrangementen die niet.

Twee soorten fietsvakanties, met dezelfde opbouw in de kaart:

- **Dagroutes vanuit een hotel.** Een stip met de plaatsnaam, daarnaast een stippellijn
  met pijlpunten aan beide kanten en een fiets in het midden. Elke avond terug in
  hetzelfde hotel.
- **Rondreis langs meerdere hotels.** Twee of drie stippen met plaatsnaam en aantal
  nachten, met tussen elke twee stippen een stippellijn met een fiets.

## Opbouw van de kaart, van boven naar beneden

1. **Foto**, verhouding 3:2, met rechts een strook van drie kleine foto's.
   Linksboven eventueel de sticker NIEUW!, rechtsboven het favorietenhart.
2. **Titel**, de omschrijving van het arrangement. Recoleta 18, regelafstand 26,
   maximaal twee regels, daarna afgekapt.
3. **Routelijn**, de reisopbouw. Onder de titel, nooit over de foto heen.
   Afgesloten met een lijn van 1 pixel.
4. **Arrangementregel**: het woord Arrangement in oranje, gevolgd door
   "N nachten voor 2 personen inclusief:".
5. **Inclusief**, vier punten met vinkjes, in twee kolommen zolang de breedte dat toelaat.
6. **Prijsregel**: kortingsbadge, Vanaf, doorgestreepte oude prijs, nieuwe prijs, en de
   oranje knop Bekijk.

## Maatvoering

Alle witruimte tussen de blokken is 16 pixels, via `--ruimte` op `.vx-v5`. Binnen een
blok is de ruimte kleiner: 6 tussen de inclusiefregels, 6 tussen de plaatsnaam en de stip.
Dat verschil draagt de hiërarchie, dus houd het onderscheid in stand als de maat verandert.

De routelijn werkt met `--axis`, standaard 25 pixels. Dat is de hoogte waarop de stippen,
de stippellijn en het fietsicoon liggen, gerekend vanaf de bovenkant van de regel.
De plaatsnaam staat erboven, het aantal nachten eronder, allebei even hoog, zodat de lijn
verticaal in het midden ligt. De groep staat horizontaal gecentreerd.
Verander je de tekstgroottes in de routelijn, herbereken dan `--axis`:
regelhoogte plaatsnaam + marge + halve stip.

## Klassen die ertoe doen

| klasse | betekenis |
| --- | --- |
| `.vx-v5` | de kaartversie, draagt `--ruimte` |
| `.vx-titel` | de titel, afgekapt op twee regels |
| `.vx-strip` | de band met de routelijn, draagt `--axis` |
| `.vx-route__line` | de lijst met stops en etappes |
| `.vx-stop` | een plaats: naam, stip, aantal nachten |
| `.vx-leg` | een etappe tussen twee plaatsen, met fiets |
| `.vx-ob` | heen en terug vanuit een hotel, met pijlpunten en fiets |
| `.vx-compare` | alleen voor de vergelijkingskaart |
| `.map-info` | het tekstdeel onder de foto, bestaande siteklasse |
| `.map-offer` | de kaart zelf, bestaande siteklasse |

## Let op bij het omzetten

- De sitestijl is gescoped op `.main-container`. Blijft die wrapper niet staan, dan
  vallen alle breedtes en flexregels weg.
- De kaart werkt op container queries, niet op de viewport. `.vl` is de container.
  Daardoor reageert de kaart op zijn eigen kolombreedte.
- Onder een containerbreedte van 1280 verbergt de bestaande sitestijl het woord Bekijk
  en blijft alleen de pijl over. Dat is bestaand gedrag, geen fout in deze export.
- De afstanden in kilometers en de plaatsnamen in de routelijn zijn voorbeelddata,
  geen echte productgegevens. De prijzen, kortingen en inclusiefpunten zijn wel echt.
