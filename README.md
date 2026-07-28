# Angeln in Georgien

![Angeln in Georgien – private saisonale Angelreisen](assets/img/hero-georgia-fishing.webp)

Eine responsive deutschsprachige Website für privat organisierte,
saisonabhängige Angelreisen nach Georgien.

**Live:** [sandroabashishvili.github.io/angeln-in-georgien](https://sandroabashishvili.github.io/angeln-in-georgien/)

## Inhalt und Funktionen

- Startseite mit Reiseidee, Ablauf und klarer Positionierung
- Touren-, Galerie- und Kontaktseiten
- gemeinsame Navigation und gemeinsamer Footer über wiederverwendbare Partials
- responsive mobile Navigation
- Systemdarstellung für helles und dunkles Farbschema
- Impressum und Datenschutzhinweise
- Canonical URLs, Open Graph, Twitter Cards und strukturierte Daten
- Favicons, `robots.txt`, Sitemap und eigene 404-Seite
- keine Analytics- oder Tracking-Skripte

## Technik

- semantisches HTML5
- modulares CSS
- Vanilla JavaScript
- dynamisch geladene Header- und Footer-Partials
- GitHub Pages

Das Projekt verwendet kein Framework, keinen Build-Prozess, kein Backend und
keine Datenbank.

## Lokal ansehen

Wegen der über `fetch()` geladenen Partials sollte die Website über einen
lokalen HTTP-Server geöffnet werden:

```bash
git clone https://github.com/sandroabashishvili/angeln-in-georgien.git
cd angeln-in-georgien
python3 -m http.server 8000
```

Danach `http://127.0.0.1:8000/` öffnen.

## Projektstruktur

```text
.
├── index.html
├── tours.html
├── gallery.html
├── contact.html
├── partials/
├── legal/
├── assets/
│   ├── css/
│   ├── img/
│   └── js/
├── 404.html
├── robots.txt
└── sitemap.xml
```

## Status und Grenzen

Die Website ist als statische Präsentationsseite veröffentlicht. Verfügbarkeit,
Terminabsprachen und konkrete Reiseleistungen werden nicht automatisiert
gebucht und müssen individuell geklärt werden.

## Autor

Aleksandre (Sandro) Abashishvili

[Portfolio](https://sandro-abashishvili.sandroabashishvili.chatgpt.site/) ·
[GitHub](https://github.com/sandroabashishvili) ·
[LinkedIn](https://www.linkedin.com/in/aleksandre-abashishvili-03417617a/)
