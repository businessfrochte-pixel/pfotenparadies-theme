# Nachtwerk 2050 – Designsystem „Nachtvitrine“

Stand 21.10.2026 · JARVIS · Grundlage: Premium E-Commerce Architect (20.10.2026), Shop-Standard Nachtwerk 2050 (Projekt-Dokument, Abschnitte 1–9, Regeln V1–V13 und T1–T10).
Diese Datei vor jeder Änderung am Nachtwerk-Theme lesen ([T9]). Status des Themes: BUILT, nicht veröffentlicht.

## Leitidee
Schlafhelfer nach Störquelle sortiert – Licht, Geräusche, Liegen, Aufwachen – als Momente einer Nacht. Charakter: ruhig, präzise, nächtlich. Wirkung: kurzes Staunen beim Ankommen, dann Ruhe. Sprache: knapp, genau, Du, ehrliche Grenzen („nicht geeignet für“).

## Farben (3 + Abstufungen)
| Token | Wert | Einsatz |
|---|---|---|
| `--nw-night` | #080B14 | Seitenfläche |
| `--nw-deck` / `--nw-deck-2` | #0E1221 / #161B2E | Flächen, Karten, Eingabefelder |
| `--nw-moon` | #E8EBF2 | Text, Lichtkasten-Fläche, gewählte Variante |
| `--nw-moon-2` / `--nw-mute` | #BAC0CE / #9299AD | Fließtext / Hinweise |
| `--nw-line` / `--nw-line-2` | Mondlicht 12 % / 24 % | Linien, Ränder |
| `--nw-amber` / `--nw-amber-hi` | #EAB86E / #F3CB8D | **nur** Handlungen und Zustände (Hauptbutton, Fokus, Häkchen, Horizont) |

Kontraste (berechnet): Text 16,5:1 · Fließtext 10,8:1 · Hinweise 6,0–6,9:1 · Button 10,8:1.

## Schrift
Eine Familie: **Archivo** (SIL OFL 1.1), selbst gehostet (`assets/nw-archivo.woff`, variabel). Überschriften 125 % breit, Gewicht 250–400 · Text 100 % · Bedienung 112 %. Keine zweite Schrift ohne Begründung ([V4]).

## Komponenten
- **Lichtkasten** – jedes Produktfoto steht auf einer leuchtenden Mondlicht-Fläche (Karten, Galerie, Warenkorb, Sets, Farbfelder).
- **Hauptbutton** – Lampenlicht, Pillenform, genau einer je Entscheidungsbereich ([V6]); weitere Wege als Textlink.
- **Nachtachse** – Störquellen als Uhrzeiten (22:40 · 01:50 · 03:30 · 06:30) im Einstieg; als **Störquellen-Leiste** auf Kategorieseiten.
- **Set-Startbild** – alle Teile eines Sets auf einer Bühne; Preis oben, „du sparst X € (einzeln Y €)“ darunter ([T4]).
- **Farbfelder** – 48 × 48 px, Radius 12, echtes Variantenbild; nur wenn jede Farbe ein eigenes Bild hat, sonst Text-Buttons.
- **Auswahlschritte** – bei zwei oder mehr Optionen „1 Größe wählen · 2 Farbe wählen“ ([T4]).
- **Kaufbereich** – Kontext → Titel + Preis → Preis-Hinweis → 3 Vorteile → (Set-Inhalt) → Auswahl → Größenhilfe → Kaufbutton → **Lieferdatum, Ausland, 14 Tage Widerruf, Gastbestellung, Kontakt** → Set-Angebot → Beschreibung ([V9], [T5]).

## Bewegung ([T7])
| Seite | bewegt | ruhig |
|---|---|---|
| Startseite | Einstieg: Nachtachse schaltet sich einmal ein | Raster, Sets, Auswahlgründe, Ratgeber, Fragen (kein Einblenden beim Scrollen) |
| Produkt / Kategorie / Warenkorb | – | alles; nur Rückmeldungen auf Klick, Hover, Fokus (150–250 ms) |
Club-Hinweis: nach 45 s oder 55 % Scrolltiefe, am Computer auch beim Verlassen (frühestens nach 8 s); 14 Tage Pause. Reduzierte Bewegung wird respektiert.

## Startseite (Abschnitte und Aufgabe)
1. Einstieg „Dunkel. Still. Bequem.“ – Wunsch, Angebot, Hauptaktion, Fakten, Nachtachse.
2. „Schlafhelfer für jede Störquelle“ – Desktop 2 × 4, Handy 2 × 2 + „Alle ansehen“ ([T6]).
3. „Mehrere Störquellen, ein Set – günstiger als einzeln“ – Ersparnis in Euro.
4. „Vier Dinge, die du bei jedem Artikel nachprüfen kannst“ – Auswahlgründe mit echtem Beispiel-Artikel.
5. Kissenhöhe-Ratgeber.
6. Fragen vor der Bestellung – erste Frage offen ([T6]).

## Texte ([T3])
Nutzen steht in der Überschrift, der Text erklärt das Wie. Ganze Sätze, konkret. Nicht verwenden: entdecke, erlebe, Premium-Qualität, hochwertig (ohne Beleg), mit Liebe ausgewählt, revolutionär, nahtlos, einzigartig, unvergleichlich, perfekt (als Versprechen). Keine Wirkversprechen (z. B. „kühlt“, „besser schlafen“) ohne Beleg.

## KI-Einheitsdesign-Check ([T8], Stand 21.10.2026)
Schrift Inter: nein (Archivo) · Violett-Verlauf: nein · drei gleiche Feature-Karten: nein (4 Auswahlgründe, je mit eigenem Beispiel-Artikel) · überall gleiche Rundung: nein (Karten 18, Felder 12, Buttons Pille) · Milchglas: nein · austauschbare Überschriften: überarbeitet am 21.10.2026.

## Offen
Szenenfoto „Produkt im Einsatz“ für den Einstieg ([V6]) · Galerie je Artikel als Verkaufsgeschichte ([T2]) · Variantenbilder Schlafmaske Hellgrau und Seidenbezug Dunkelblau · Schrift als WOFF2 · Ladezeit in echter Vorschau messen.
