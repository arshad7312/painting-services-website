# Hue & Home

A responsive, single-page home-painting website concept for Bengaluru. The visual direction and copy are original; the supplied brands were used only as market references.

## Run locally

Open `index.html` in a browser, or serve this directory with any static web server. The site has no build step or package dependencies.

## Before launch

- The business name "Hue & Home" is a placeholder; replace it with the real brand name.
- **Prices:** all labour rates, paint prices per litre, coverage and add-on rates are indicative placeholders in the `SERVICES` object at the top of `script.js`. Update them to the real price list; the rate cards and quotation recalculate automatically.
- **Real photos:** the painter, hero and story images are illustrations until you add real photos. Save your own photos (JPG, ideally 800×960 for painters) at these paths and the site uses them automatically, with no code change:
  - `assets/team/painter-1.jpg`, `painter-2.jpg`, `painter-3.jpg` (painters at work)
  - `assets/photos/hero.jpg` (finished room or painter at work, portrait)
  - `assets/photos/story.jpg` (landscape)
  Use only photos you own or are licensed to use, and get consent from the people shown.
- **Leads:** the quotation and consultation forms open WhatsApp (8521962085) with the details prefilled; nothing is stored on a server. Add a backend or CRM if you need lead records.
- Confirm GST applicability (set to 18% by `GST_RATE`), service areas, and privacy wording.
- Paint brand names are shown only to identify the products offered.
- All images are local, so the page does not rely on third-party image or font services.

The page includes a live paint-shade visualizer (the chosen shade carries into the quotation), service overviews, rate cards, an itemised quotation builder (print / save as PDF / send on WhatsApp), painter and owner profiles, a three-step process, FAQ, contact details and floating call / WhatsApp buttons.

## Real work photos

`assets/work/` holds optimised project photos (EXIF/location stripped) shown in the **Our work** gallery
("Finished work" and "Problems we repair"). To add or replace one, drop a JPEG in that folder and edit the
matching `.work-item` in `index.html`. `assets/photos/hero.jpg` and `story.jpg` fill the hero and story images.
Make sure the homeowners have agreed to their photos being published.
