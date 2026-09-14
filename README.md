# Fietsvakantie kaartprototypes

Klikbaar prototype van de ViaLuxury zoekresultatenpagina voor het thema Fietsvakanties,
op basis van de echte markup, stijl, fonts en foto's van vialuxury.com.

## Bestanden

- `vialuxury-fietsvakanties.html` : het prototype, desktop en mobiel in een bestand
- `fietskaarten-varianten.html` : overzicht en beoordeling van de kaartvarianten
- `serve.js` : kleine statische server

Beide HTML-bestanden zijn zelfstandig. Alle fonts, foto's en logo's zitten als data-URI in het bestand,
er is geen internetverbinding nodig.

## Starten

```bash
node serve.js
```

Daarna http://localhost:8731

## Kaartversies

Rechtsonder zit een inklapbaar paneel om te wisselen. Ook via de toetsen 0 tot 5 of de parameter `?v=`.

| Versie | Opzet | Kaarthoogte |
| --- | --- | --- |
| Origineel | de huidige kaart, ongewijzigd | 548 / 569 |
| 1 | badge "Fietsvakantie" op de foto | 548 / 569 |
| 2 | routelijn met hotels en etappes onder de titel | 678 |
| 3 | reis eerst: type, kerngetallen, Fietsen en Verblijf | variabel |
| 4 | routelijn onder de titel, zelfde kaarthoogte als nu | 548 |
| 5 | zelfde opbouw als 4, ruimer met een vaste witruimte van 16 | 632 |

In versie 4 en 5 staat op de tweede positie een gewone arrangementkaart met een stippelrand,
zodat de fietsvakantiekaart daarmee te vergelijken is.

## Let op

De afstanden in kilometers en de hotelnamen Hotel 2 en Hotel 3 zijn voorbeelddata,
geen echte productgegevens.
