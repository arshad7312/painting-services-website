# Hue & Home — Home Painting Website

Website for a Bengaluru home-painting business owned by **Shabihul Quamar** (Call / WhatsApp **8521962085**).
It is a plain static site (HTML, CSS, JavaScript). There is no build step and no server code.

Live site: https://arshad7312.github.io/painting-services-website/

## What the site does

- Services, real project photo gallery (with lightbox), team and owner details, FAQs and local-area SEO.
- **Rates and quotation builder:** per sq ft prices with Asian Paints material included, 18% GST, 35% advance, print or WhatsApp send.
- **Colour visualizer:** pick an Asian Paints shade and see it on a room; the quote also takes the exact colour code from the shade card.
- Enquiry form that opens WhatsApp with the customer's details pre-filled.

## Project structure

```
index.html      All page content and SEO tags (title, meta, JSON-LD)
styles.css      All styling (cache-busted with ?v=N in index.html)
script.js       Price list, shade picker, quotation builder, gallery, forms
assets/
  work/         Project photos used in the "Our work" gallery
  photos/       Hero and story photos
  *.svg         Illustrations (painters, rooms), favicon
  og-image.jpg  Social share image
robots.txt, sitemap.xml   Search engine files
```

## Run it on your computer

1. Install Python 3 (or any static file server).
2. In this folder run: `python3 -m http.server 8000`
3. Open http://localhost:8000

You can also open `index.html` directly, but a server is better.

## Where to change things

| I want to change | Edit |
|---|---|
| Prices (per sq ft), fresh-paint extra, bathroom grouting, terrace rate | `SERVICES` and `FRESH_EXTRA` at the top of the quote section in `script.js` |
| GST % / advance % | `GST_RATE`, `ADVANCE_RATE` in `script.js` (also update the "35%" wording in `index.html`) |
| Phone / WhatsApp number | `WHATSAPP_NUMBER` in `script.js` and the `tel:` / `wa.me` links in `index.html` |
| Address, owner name | `index.html` (top bar, contact card, footer, JSON-LD) and the quote header in `script.js` |
| Business name | Search for `Hue & Home` in `index.html` and `script.js` |
| Shade colours | `SHADE_FAMILIES` in `script.js` (approximate screen colours, not official codes) |
| Gallery photos | Put a JPEG in `assets/work/`, then add or edit a `.work-item` in `index.html` |
| Painter photos | Add `assets/team/painter-1.jpg` to `painter-3.jpg`; they replace the illustrations automatically |
| FAQs | `index.html` — also update the matching FAQPage JSON-LD in the `<head>` |

### Current price list (INR per sq ft, Asian Paints material included)

- **Interior walls & ceiling (repaint):** Tractor Emulsion 12 · Apcolite 18 · Royale Luxury 25 · Royale Shyne 32 · Royale Aspira 38 · Royale Glitz 40. Interior waterproofing +22.
- **Fresh surface:** +5 per sq ft over the repaint rate (interior and exterior).
- **Exterior:** Ace 17 · Apex 27 · Ultima Protek 37.
- **Terrace waterproofing (damp proof):** 32.
- **Bathroom tile grouting:** 2,000 per bathroom.
- **Wood & metal, gloss enamel (repaint / fresh):** Door 10 / 16 · Window 16 / 25 · Grill 16 / 22. Satin enamel +2.
- **Wood polish:** 55 repaint / 110 fresh.

Interior area is estimated as 3.5 × carpet area; the final measurement is confirmed at the site visit.

## Publish (GitHub Pages)

`main` is protected, so changes go through a pull request:

1. Create a branch, commit your changes, push it.
2. Open a pull request into `main` and merge it.
3. GitHub Pages (Settings → Pages → `main` / root) rebuilds in 1–2 minutes. Hard refresh with Ctrl+Shift+R.

When you change `styles.css` or `script.js`, bump the `?v=N` number in `index.html` so browsers load the new file.

## Before you go live — checklist

- Confirm the business name, prices, GST % and the 35% advance wording.
- Get customers' consent for the project photos you publish.
- Replace the painter illustrations with real team photos.
- Custom domain: update the URL in `index.html` (canonical, Open Graph, JSON-LD), `robots.txt` and `sitemap.xml`.
- Add the site to Google Search Console (submit `sitemap.xml`) and create a Google Business Profile.
- Leads arrive through WhatsApp only. Add a form service or CRM if you need email or a database.
