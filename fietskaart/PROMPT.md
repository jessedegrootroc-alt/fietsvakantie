# Plak dit in de andere Claude Code sessie

Upload eerst de map `fietskaart/` in het redesignproject, bijvoorbeeld als
`docs/fietskaart/`. Plak daarna dit bericht:

---

In `docs/fietskaart/` staat een werkende, losse versie van de nieuwe
fietsvakantiekaart. Open `index.html` om te zien wat het moet worden, en lees
`IMPLEMENTATIE.md` voor de opbouw, de maten en het gedrag.

Zet alle fietsvakantiekaarten in de zoekresultaten om naar deze kaart.

Uitgangspunten:

1. Neem de markup, de CSS en het gedrag over zoals ze in `fietskaart.css` en
   `fietskaart.js` staan. De waarden komen uit `styleguide-vakanties.md` en zijn
   al op de bestaande tokens afgestemd; gebruik waar mogelijk de tokens uit het
   project in plaats van de losse hexwaarden.
2. Bouw het als component in de bestaande structuur, naast of in plaats van
   `DealCard.vue`. Alleen fietsvakanties krijgen deze kaart, andere
   arrangementen houden de huidige.
3. De klassenamen beginnen allemaal met `vlc`, zodat er niets botst. Hernoem ze
   naar de conventie van het project als dat beter past, maar houd de structuur
   gelijk.
4. `fietskaart.js` is een gewoon script. Voor Vue: zet de logica in
   `onMounted` van het component, of maak er een composable van. Elke kaart
   wikkelt zijn eigen video, routelijn en stilstaand beeld.
5. De media in `media/` zijn voorbeelden. In productie komen de video, het
   stilstaande beeld en de scenegrenzen per arrangement uit de data. De
   scenegrenzen staan in `data-scenes` en moeten per video kloppen, anders
   loopt de balk niet gelijk met het beeld.
6. Zonder video moet de kaart nog steeds werken: dan alleen het stilstaande
   beeld, de routelijn in rusttoestand en geen balk.

Laat me eerst zien welke bestanden je wilt aanpassen voordat je begint.
