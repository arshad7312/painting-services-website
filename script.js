'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');

menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  menuToggle.setAttribute('aria-label', isExpanded ? 'Open navigation' : 'Close navigation');
  mainNav.classList.toggle('is-open', !isExpanded);
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    mainNav.classList.remove('is-open');
  });
});


// Real photos: drop files at the data-photo paths and they replace the illustrations automatically.
document.querySelectorAll('img[data-photo]').forEach((img) => {
  const probe = new Image();
  probe.onload = () => { img.src = probe.src; img.alt = img.dataset.alt || 'Photo of our painting team at work'; };
  probe.src = img.dataset.photo;
});

const SHADE_BRANDS = ['Asian Paints'];
const SHADE_FAMILIES = {
  Whites: [['Pure White', '#F8F6F0'], ['Warm Ivory', '#F1E6D0'], ['Pearl', '#EEE9DF'], ['Chalk', '#F3F1EA'], ['Cotton', '#FAF3E6'], ['Vanilla Cream', '#F3E7C9']],
  Neutrals: [['Soft Grey', '#D2D3CF'], ['Stone', '#C8C1B4'], ['Dove Grey', '#B9BBBA'], ['Greige', '#CDC2B2'], ['Charcoal Slate', '#4A4F55'], ['Mocha', '#9A7B64']],
  Yellows: [['Butter', '#F5E39A'], ['Lemon Zest', '#F2DC6B'], ['Saffron', '#E8B23E'], ['Mustard Glow', '#E0B04A'], ['Honey', '#D9A441'], ['Sand Dune', '#E3CFA2']],
  'Peach & Pink': [['Blush Clay', '#E3B9A6'], ['Peach Cream', '#F4CFB0'], ['Rose Petal', '#E8B4B8'], ['Coral', '#E58E7A'], ['Salmon', '#F0A07F'], ['Terracotta', '#C9724D']],
  Greens: [['Sage Mist', '#B7C4A5'], ['Mint', '#C6E2CF'], ['Pistachio', '#C8D99A'], ['Olive Grove', '#8A8F55'], ['Forest', '#3F6B4F'], ['Fern', '#6E9A62']],
  Blues: [['Sky Whisper', '#BFD5DE'], ['Powder Blue', '#B9D3E8'], ['Aqua', '#9FD3D0'], ['Ocean Teal', '#3F7F86'], ['Cobalt', '#3C63A8'], ['Deep Navy', '#2F4560']],
  'Purples & Reds': [['Lavender Haze', '#C9BEDB'], ['Lilac', '#C8B6DE'], ['Plum', '#7A4B6B'], ['Brick Red', '#A5493B'], ['Maroon', '#7A2F35'], ['Wine', '#5E2A3C']]
};
const SHADES = Object.entries(SHADE_FAMILIES).flatMap(([family, list]) => list.map(([name, hex]) => ({ name, hex, family })));
let selectedShade = SHADES[0].name;
let selectedShadeBrand = SHADE_BRANDS[0];
let activeFamily = 'All';
let shadeQuery = '';
const roomSvg = document.querySelector('#room-svg');
const swatchBox = document.querySelector('#swatches');
const brandBox = document.querySelector('#shade-brands');
const familyBox = document.querySelector('#shade-families');
const shadeSearch = document.querySelector('#shade-search');
const shadeLabel = () => `${selectedShadeBrand} – ${selectedShade}`;

function applyShade(name, hex) {
  selectedShade = name;
  roomSvg.querySelectorAll('.viz-wall').forEach((wall) => wall.setAttribute('fill', hex));
  document.querySelectorAll('.tin-label').forEach((label) => label.setAttribute('fill', hex));
  document.querySelector('#viz-dot').style.background = hex;
  document.querySelector('#viz-name').textContent = name;
  document.querySelector('#tin-shade').textContent = shadeLabel();
  swatchBox.querySelectorAll('button').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.name === name)));
}

function renderShades() {
  const query = shadeQuery.trim().toLowerCase();
  const list = SHADES.filter((shade) => (activeFamily === 'All' || shade.family === activeFamily) && (!query || shade.name.toLowerCase().includes(query)));
  swatchBox.innerHTML = list.length
    ? list.map((s) => `<button type="button" class="swatch-card" data-name="${s.name}" data-hex="${s.hex}" aria-pressed="${s.name === selectedShade}"><span class="swatch" style="background:${s.hex}"></span><span class="swatch-name">${s.name}</span></button>`).join('')
    : '<p class="swatch-empty">No shade found. Try another name or family.</p>';
}

brandBox.innerHTML = SHADE_BRANDS.map((brand, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-brand="${brand}">${brand}</button>`).join('');
familyBox.innerHTML = ['All', ...Object.keys(SHADE_FAMILIES)].map((family, i) => `<button type="button" aria-pressed="${i === 0}" data-family="${family}">${family}</button>`).join('');
brandBox.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  selectedShadeBrand = button.dataset.brand;
  brandBox.querySelectorAll('button').forEach((other) => other.setAttribute('aria-selected', String(other === button)));
  document.querySelector('#shade-brand-name').textContent = selectedShadeBrand;
  document.querySelector('#tin-shade').textContent = shadeLabel();
});
familyBox.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  activeFamily = button.dataset.family;
  familyBox.querySelectorAll('button').forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
  renderShades();
});
shadeSearch.addEventListener('input', () => { shadeQuery = shadeSearch.value; renderShades(); });
swatchBox.addEventListener('click', (event) => {
  const button = event.target.closest('.swatch-card');
  if (!button) return;
  applyShade(button.dataset.name, button.dataset.hex);
  swatchBox.querySelectorAll('.swatch-card').forEach((card) => card.setAttribute('aria-pressed', String(card === button)));
});
renderShades();
applyShade(SHADES[0].name, SHADES[0].hex);

const WHATSAPP_NUMBER = '918521962085';
const GST_RATE = 0.18;
const ADVANCE_RATE = 0.35;

// Rates in INR per sq ft, material (Asian Paints) included. Owner: edit this price list.
const FRESH_EXTRA = 5;
const SERVICES = {
  interior: {
    defaultQty: 1000,
    label: 'Interior walls & ceiling',
    areaLabel: 'Carpet area (sq ft)',
    areaHint: 'Walls and ceiling are estimated at about 3.5× carpet area. Final measurement at site visit.',
    areaFactor: 3.5,
    min: 100,
    freshExtra: FRESH_EXTRA,
    options: [
      { name: 'Tractor Emulsion', tier: 'Economy', repaint: 12 },
      { name: 'Apcolite Premium Emulsion', tier: 'Premium', repaint: 18 },
      { name: 'Royale Luxury Emulsion', tier: 'Luxury', repaint: 25 },
      { name: 'Royale Shyne', tier: 'Luxury', repaint: 32 },
      { name: 'Royale Aspira', tier: 'Luxury', repaint: 38 },
      { name: 'Royale Glitz', tier: 'Luxury', repaint: 40 }
    ],
    addons: [{ id: 'iwp', label: 'Interior waterproofing', rate: 22, basis: 'area' }]
  },
  exterior: {
    defaultQty: 1500,
    label: 'Exterior walls & ceiling',
    areaLabel: 'Exterior surface area (sq ft)',
    areaHint: 'Total outside wall and ceiling surface to be painted.',
    areaFactor: 1,
    min: 100,
    freshExtra: FRESH_EXTRA,
    options: [
      { name: 'Ace Exterior Emulsion', tier: 'Economy', repaint: 17 },
      { name: 'Apex Exterior Emulsion', tier: 'Premium', repaint: 27 },
      { name: 'Ultima Protek', tier: 'Luxury', repaint: 37 }
    ],
    addons: []
  },
  woodmetal: {
    defaultQty: 60,
    label: 'Wood & metal (door, window, grill) — gloss enamel',
    areaLabel: 'Surface area (sq ft)',
    areaHint: 'Total surface of the doors, windows or grills to be painted.',
    areaFactor: 1,
    min: 10,
    options: [
      { name: 'Door', tier: 'Gloss enamel', repaint: 10, fresh: 16 },
      { name: 'Window', tier: 'Gloss enamel', repaint: 16, fresh: 25 },
      { name: 'Grill', tier: 'Gloss enamel', repaint: 16, fresh: 22 }
    ],
    addons: [{ id: 'satin', label: 'Satin enamel instead of gloss', rate: 2, basis: 'area' }]
  },
  polish: {
    defaultQty: 50,
    label: 'Wood polish',
    areaLabel: 'Wood surface area (sq ft)',
    areaHint: 'Total wooden surface to be polished.',
    areaFactor: 1,
    min: 10,
    options: [{ name: 'Wood polish', tier: 'Polish', repaint: 55, fresh: 110 }],
    addons: []
  },
  terrace: {
    defaultQty: 500,
    label: 'Terrace waterproofing',
    areaLabel: 'Terrace area (sq ft)',
    areaHint: 'Damp-proof treatment for the terrace surface.',
    areaFactor: 1,
    min: 50,
    noCondition: true,
    options: [{ name: 'Damp proof', tier: 'Waterproofing', repaint: 32 }],
    addons: []
  },
  grouting: {
    defaultQty: 1,
    label: 'Bathroom tile grouting',
    areaLabel: 'Number of bathrooms',
    areaHint: '₹2,000 per bathroom.',
    unit: 'bathroom',
    min: 1,
    noCondition: true,
    options: [{ name: 'Tile grouting', tier: 'Per bathroom', repaint: 2000 }],
    addons: []
  }
};
const TERRACE_RATE = SERVICES.terrace.options[0].repaint;
const GROUTING_RATE = SERVICES.grouting.options[0].repaint;

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const whatsappLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
const freshRate = (service, option) => option.fresh ?? option.repaint + (service.freshExtra || 0);

const rateGrid = document.querySelector('#rate-grid');
rateGrid.innerHTML = Object.values(SERVICES).map((service) => {
  const rows = service.options.map((option) => {
    if (service.unit) return `<div><dt>${escapeHtml(option.name)}</dt><dd>${inr.format(option.repaint)}<small>/bathroom</small></dd></div>`;
    if (service.noCondition) return `<div><dt>${escapeHtml(option.name)}</dt><dd>${inr.format(option.repaint)}<small>/sq ft</small></dd></div>`;
    return `<div><dt>${escapeHtml(option.name)}</dt><dd>${inr.format(option.repaint)} <small>repaint</small> · ${inr.format(freshRate(service, option))} <small>fresh</small></dd></div>`;
  }).join('');
  const extras = service.addons.map((addon) => `<div><dt>${escapeHtml(addon.label)}</dt><dd>+${inr.format(addon.rate)}<small>/sq ft</small></dd></div>`).join('');
  return `<article class="rate-card"><h3>${escapeHtml(service.label)}</h3><dl>${rows}${extras}</dl><p>${escapeHtml(service.areaHint)}</p><a class="round-link" href="#quote" aria-label="Get a quote for ${escapeHtml(service.label)}">↗</a></article>`;
}).join('');

const quoteForm = document.querySelector('#quote-form');
const serviceSelect = document.querySelector('#q-service');
const productSelect = document.querySelector('#q-product');
const addonsBox = document.querySelector('#q-addons');
const quoteError = document.querySelector('#q-error');
const quoteWrap = document.querySelector('#quote-output-wrap');
const quoteSheet = document.querySelector('#quote-sheet');
const conditionField = document.querySelector('#q-condition-field');
const extrasBox = document.querySelector('#q-extras');

serviceSelect.innerHTML = Object.entries(SERVICES).map(([key, service]) => `<option value="${key}">${escapeHtml(service.label)}</option>`).join('');

function renderServiceOptions() {
  const key = serviceSelect.value;
  const service = SERVICES[key];
  const area = quoteForm.elements.area;
  document.querySelector('#q-area-label').textContent = service.areaLabel;
  document.querySelector('#q-area-hint').textContent = service.areaHint;
  area.min = service.min;
  area.value = service.defaultQty;
  productSelect.innerHTML = service.options.map((option, index) => {
    const price = service.unit || service.noCondition ? `${inr.format(option.repaint)}${service.unit ? '/bathroom' : '/sq ft'}` : `${inr.format(option.repaint)}–${inr.format(freshRate(service, option))}/sq ft`;
    return `<option value="${index}">${escapeHtml(option.name)} — ${escapeHtml(option.tier)} (${price})</option>`;
  }).join('');
  document.querySelector('#q-product-label').textContent = key === 'interior' || key === 'exterior' ? 'Paint (Asian Paints, material included)' : 'Type / finish';
  conditionField.hidden = Boolean(service.noCondition);
  document.querySelector('#q-addons-wrap').hidden = service.addons.length === 0;
  addonsBox.innerHTML = service.addons.map((addon) => `<label class="check"><input type="checkbox" name="addon" value="${addon.id}"><span>${escapeHtml(addon.label)}</span><em>+${inr.format(addon.rate)}/sq ft</em></label>`).join('');
  extrasBox.hidden = key === 'terrace' || key === 'grouting';
}
serviceSelect.addEventListener('change', renderServiceOptions);
renderServiceOptions();

function buildQuote() {
  const key = serviceSelect.value;
  const service = SERVICES[key];
  const option = service.options[Number(productSelect.value)];
  const qty = Number(quoteForm.elements.area.value);
  const condition = service.noCondition ? 'repaint' : quoteForm.elements.condition.value;
  const sqft = service.unit ? qty : Math.round(qty * service.areaFactor);
  const rate = condition === 'fresh' ? freshRate(service, option) : option.repaint;
  const selected = service.addons.filter((addon) => quoteForm.querySelector(`input[name="addon"][value="${addon.id}"]`).checked);
  const stateText = service.noCondition ? '' : condition === 'fresh' ? ' — fresh' : ' — repaint';

  const lines = [{
    item: `${service.label}: ${option.name}${stateText}`,
    detail: service.unit ? `${sqft} bathroom(s) × ${inr.format(rate)}` : `${sqft} sq ft × ${inr.format(rate)} (material included)`,
    amount: sqft * rate
  }];
  selected.forEach((addon) => lines.push({ item: addon.label, detail: `${sqft} sq ft × ${inr.format(addon.rate)}`, amount: sqft * addon.rate }));

  const terraceArea = extrasBox.hidden ? 0 : Number(quoteForm.elements.terrace.value) || 0;
  const bathrooms = extrasBox.hidden ? 0 : Number(quoteForm.elements.bathrooms.value) || 0;
  if (terraceArea > 0) lines.push({ item: 'Terrace waterproofing (damp proof)', detail: `${terraceArea} sq ft × ${inr.format(TERRACE_RATE)}`, amount: terraceArea * TERRACE_RATE });
  if (bathrooms > 0) lines.push({ item: 'Bathroom tile grouting', detail: `${bathrooms} bathroom(s) × ${inr.format(GROUTING_RATE)}`, amount: bathrooms * GROUTING_RATE });

  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0);
  const gst = Math.round(subtotal * GST_RATE);
  const total = subtotal + gst;
  const advance = Math.round(total * ADVANCE_RATE);
  return { service, option, qty, sqft, condition, lines, subtotal, gst, total, advance, balance: total - advance, terraceArea, bathrooms };
}

function renderQuote() {
  const name = quoteForm.elements.name.value.trim();
  const phone = quoteForm.elements.phone.value.trim();
  const area = Number(quoteForm.elements.area.value);
  const minArea = SERVICES[serviceSelect.value].min;
  const phoneValid = phone === '' || /^[6-9][0-9]{9}$/.test(phone);

  if (!Number.isFinite(area) || area < minArea || area > 50000) {
    quoteError.textContent = `Please enter a value between ${minArea} and 50,000.`;
    return;
  }
  if (!phoneValid) {
    quoteError.textContent = 'Enter a valid 10-digit Indian mobile number, or leave it blank.';
    return;
  }
  quoteError.textContent = '';

  const quote = buildQuote();
  const colourCode = quoteForm.elements.colourcode.value.trim();
  const now = new Date();
  const quoteNo = `HH-${now.toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
  const dateText = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  quoteSheet.innerHTML = `
    <header class="quote-head"><div><p class="card-kicker">Quotation</p><h3>Hue &amp; Home</h3><p>Owner: Shabihul Quamar<br>H.No 1623, Ramareddy Building, Ground &amp; 1st Floor, Cross Gayathri School, Vijinapura, North Bangalore, Karnataka 560016<br>Call / WhatsApp: 8521962085</p></div><dl><div><dt>Quote no.</dt><dd>${quoteNo}</dd></div><div><dt>Date</dt><dd>${dateText}</dd></div><div><dt>Valid for</dt><dd>7 days</dd></div></dl></header>
    <p class="quote-for"><strong>Colour:</strong> ${escapeHtml(shadeLabel())}${colourCode ? ` · <strong>Colour code:</strong> ${escapeHtml(colourCode)}` : ''}<br><strong>Prepared for:</strong> ${name ? escapeHtml(name) : 'Customer'}${phone ? ` · ${escapeHtml(phone)}` : ''}</p>
    <div class="quote-table-wrap"><table><thead><tr><th>Item</th><th>Basis</th><th>Amount</th></tr></thead><tbody>
      ${quote.lines.map((line) => `<tr><td>${escapeHtml(line.item)}</td><td>${escapeHtml(line.detail)}</td><td>${inr.format(line.amount)}</td></tr>`).join('')}
    </tbody><tfoot>
      <tr><td colspan="2">Subtotal</td><td>${inr.format(quote.subtotal)}</td></tr>
      <tr><td colspan="2">GST @ 18%</td><td>${inr.format(quote.gst)}</td></tr>
      <tr class="grand"><td colspan="2">Estimated total</td><td>${inr.format(quote.total)}</td></tr>
      <tr><td colspan="2">Advance to confirm booking (35%)</td><td>${inr.format(quote.advance)}</td></tr>
      <tr><td colspan="2">Balance after completion</td><td>${inr.format(quote.balance)}</td></tr>
    </tfoot></table></div>
    <p class="fine-print"><strong>Payment terms:</strong> 35% advance to confirm the booking; balance after the work is completed. This is an indicative estimate based on the area you entered. The final quotation is confirmed after a site visit and measurement. Paint prices follow the dealer rate on the day of purchase.</p>`;

  const message = [
    'Hi Shabihul, I would like to book a painting service.',
    `Quote no: ${quoteNo}`,
    name && `Name: ${name}`,
    phone && `Mobile: ${phone}`,
    `Service: ${quote.service.label}`,
    `Details: ${quote.lines.map((line) => `${line.item} (${line.detail})`).join('; ')}`,
    `Colour: ${shadeLabel()}${colourCode ? `, code ${colourCode}` : ''}`,
    `Estimated total (incl. GST): ${inr.format(quote.total)}`,
    `Advance (35%): ${inr.format(quote.advance)}`
  ].filter(Boolean).join('\n');
  document.querySelector('#q-whatsapp').href = whatsappLink(message);

  quoteWrap.hidden = false;
  quoteSheet.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  renderQuote();
});
document.querySelector('#q-print').addEventListener('click', () => window.print());

const estimateForm = document.querySelector('#estimate-form');
const formStatus = document.querySelector('#form-status');

estimateForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!estimateForm.reportValidity()) return;

  const data = estimateForm.elements;
  const message = [
    'Hi Shabihul, I would like a free painting consultation.',
    `Name: ${data.name.value.trim()}`,
    `Mobile: ${data.phone.value.trim()}`,
    `Area: ${data.area.value.trim()}, Bengaluru`,
    `Project: ${data.project.value}`
  ].join('\n');

  window.open(whatsappLink(message), '_blank', 'noopener');
  formStatus.textContent = 'Opening WhatsApp with your details. If it did not open, call 8521962085.';
  estimateForm.reset();
});

document.querySelector('#year').textContent = String(new Date().getFullYear());

const workTabs = document.querySelectorAll('.work-tabs [role="tab"]');
workTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    workTabs.forEach((other) => {
      const active = other === tab;
      other.setAttribute('aria-selected', String(active));
      other.tabIndex = active ? 0 : -1;
      document.getElementById(other.getAttribute('aria-controls')).hidden = !active;
    });
  });
});

const lightbox = document.querySelector('#lightbox');
document.querySelectorAll('.work-open').forEach((button) => {
  button.addEventListener('click', () => {
    lightbox.querySelector('#lightbox-img').src = button.dataset.full;
    lightbox.querySelector('#lightbox-img').alt = button.dataset.cap;
    lightbox.querySelector('#lightbox-cap').innerHTML = button.dataset.cap;
    lightbox.showModal();
  });
});
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
