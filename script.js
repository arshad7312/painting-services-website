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

const SHADE_BRANDS = ['Asian Paints', 'Berger', 'Birla Opus', 'Nerolac', 'Dulux'];
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

// Indicative rates in INR. Owner: update these numbers to match your real price list.
const SERVICES = {
  interior: {
    label: 'Interior walls & ceiling',
    areaLabel: 'Carpet area (sq ft)',
    areaHint: 'We estimate paintable wall area as about 3.5× carpet area.',
    wallFactor: 3.5,
    labour: { repaint: 11, fresh: 14 },
    products: [
      { brand: 'Asian Paints', name: 'Tractor Emulsion', tier: 'Economy', price: 230, coverage: 120 },
      { brand: 'Asian Paints', name: 'Apcolite Premium Emulsion', tier: 'Premium', price: 420, coverage: 130 },
      { brand: 'Asian Paints', name: 'Royale Luxury Emulsion', tier: 'Luxury', price: 640, coverage: 140 },
      { brand: 'Berger', name: 'Easy Clean', tier: 'Premium', price: 400, coverage: 130 },
      { brand: 'Berger', name: 'Silk', tier: 'Luxury', price: 600, coverage: 140 },
      { brand: 'Nerolac', name: 'Impressions', tier: 'Premium', price: 450, coverage: 130 },
      { brand: 'Birla Opus', name: 'One Pure Elegance', tier: 'Luxury', price: 620, coverage: 140 },
      { brand: 'Dulux', name: 'Velvet Touch', tier: 'Luxury', price: 650, coverage: 140 }
    ],
    addons: [
      { id: 'putty', label: 'Wall putty (2 coats)', rate: 7.5, basis: 'wall' },
      { id: 'primer', label: 'Primer coat', rate: 3.5, basis: 'wall' },
      { id: 'ceiling', label: 'Ceiling painting', rate: 9, basis: 'ceiling' },
      { id: 'protect', label: 'Furniture covering & post-work cleaning', rate: 1500, basis: 'flat' }
    ]
  },
  exterior: {
    label: 'Exterior walls',
    areaLabel: 'Exterior wall area (sq ft)',
    areaHint: 'Total outside wall surface to be painted.',
    wallFactor: 1,
    labour: { repaint: 13, fresh: 16 },
    products: [
      { brand: 'Asian Paints', name: 'Ace Exterior Emulsion', tier: 'Economy', price: 380, coverage: 110 },
      { brand: 'Asian Paints', name: 'Apex Ultima', tier: 'Luxury', price: 680, coverage: 120 },
      { brand: 'Berger', name: 'WeatherCoat Long Life', tier: 'Premium', price: 560, coverage: 115 },
      { brand: 'Nerolac', name: 'Excel Total', tier: 'Premium', price: 520, coverage: 115 }
    ],
    addons: [
      { id: 'primer', label: 'Exterior primer', rate: 4, basis: 'wall' },
      { id: 'crack', label: 'Crack filling & surface repair', rate: 3, basis: 'wall' },
      { id: 'scaffold', label: 'Scaffolding / access', rate: 4, basis: 'wall' }
    ]
  },
  woodmetal: {
    label: 'Wood & metal (doors, grills, railings)',
    areaLabel: 'Surface area (sq ft)',
    areaHint: 'Total door, window, grill or railing surface.',
    wallFactor: 1,
    labour: { repaint: 22, fresh: 28 },
    products: [
      { brand: 'Asian Paints', name: 'Apcolite Gloss Enamel', tier: 'Premium', price: 520, coverage: 100 },
      { brand: 'Berger', name: 'Luxol Hi-Gloss Enamel', tier: 'Premium', price: 500, coverage: 100 }
    ],
    addons: [
      { id: 'primer', label: 'Wood / metal primer', rate: 5, basis: 'wall' },
      { id: 'rust', label: 'Rust removal & surface prep', rate: 6, basis: 'wall' }
    ]
  }
};

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
const rateFmt = (value) => `₹${value}`;
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const whatsappLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const rateGrid = document.querySelector('#rate-grid');
rateGrid.innerHTML = Object.values(SERVICES).map((service) => `
  <article class="rate-card">
    <h3>${escapeHtml(service.label)}</h3>
    <dl>
      <div><dt>Repaint labour</dt><dd>${inr.format(service.labour.repaint)}<small>/sq ft</small></dd></div>
      <div><dt>Fresh surface labour</dt><dd>${inr.format(service.labour.fresh)}<small>/sq ft</small></dd></div>
    </dl>
    <p>${escapeHtml(service.areaHint)}</p>
    <a class="round-link" href="#quote" aria-label="Get a quote for ${escapeHtml(service.label)}">↗</a>
  </article>`).join('');

const quoteForm = document.querySelector('#quote-form');
const serviceSelect = document.querySelector('#q-service');
const productSelect = document.querySelector('#q-product');
const addonsBox = document.querySelector('#q-addons');
const quoteError = document.querySelector('#q-error');
const quoteWrap = document.querySelector('#quote-output-wrap');
const quoteSheet = document.querySelector('#quote-sheet');

serviceSelect.innerHTML = Object.entries(SERVICES).map(([key, service]) => `<option value="${key}">${escapeHtml(service.label)}</option>`).join('');

function renderServiceOptions() {
  const service = SERVICES[serviceSelect.value];
  document.querySelector('#q-area-label').textContent = service.areaLabel;
  document.querySelector('#q-area-hint').textContent = service.areaHint;
  productSelect.innerHTML = service.products.map((product, index) => `<option value="${index}">${escapeHtml(product.brand)} ${escapeHtml(product.name)} — ${escapeHtml(product.tier)} (${inr.format(product.price)}/L)</option>`).join('');
  addonsBox.innerHTML = service.addons.map((addon) => `<label class="check"><input type="checkbox" name="addon" value="${addon.id}"><span>${escapeHtml(addon.label)}</span><em>${addon.basis === 'flat' ? inr.format(addon.rate) : `${rateFmt(addon.rate)}/sq ft`}</em></label>`).join('');
  const hint = document.querySelector('#q-product-hint');
  hint.textContent = 'Paint prices are indicative and may vary with the dealer price on the day of purchase.';
}
serviceSelect.addEventListener('change', renderServiceOptions);
renderServiceOptions();

function buildQuote() {
  const service = SERVICES[serviceSelect.value];
  const product = service.products[Number(productSelect.value)];
  const area = Number(quoteForm.elements.area.value);
  const coats = Number(quoteForm.elements.coats.value);
  const condition = quoteForm.elements.condition.value;
  const wallArea = Math.round(area * service.wallFactor);
  const selected = service.addons.filter((addon) => quoteForm.querySelector(`input[name="addon"][value="${addon.id}"]`).checked);
  const ceilingArea = selected.some((addon) => addon.basis === 'ceiling') ? area : 0;
  const paintArea = wallArea + ceilingArea;
  const litres = Math.ceil((paintArea * coats) / product.coverage);

  const lines = [
    { item: `Labour — ${service.label} (${condition === 'fresh' ? 'fresh surface' : 'repaint'})`, detail: `${wallArea} sq ft × ${inr.format(service.labour[condition])}`, amount: wallArea * service.labour[condition] },
    { item: `Paint — ${product.brand} ${product.name}`, detail: `${litres} L (${coats} coats) × ${inr.format(product.price)}`, amount: litres * product.price }
  ];

  selected.forEach((addon) => {
    if (addon.basis === 'flat') lines.push({ item: addon.label, detail: 'Fixed', amount: addon.rate });
    else if (addon.basis === 'ceiling') lines.push({ item: `Labour — ${addon.label}`, detail: `${area} sq ft × ${rateFmt(addon.rate)}`, amount: area * addon.rate });
    else lines.push({ item: addon.label, detail: `${wallArea} sq ft × ${rateFmt(addon.rate)}`, amount: Math.round(wallArea * addon.rate) });
  });

  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0);
  const gst = Math.round(subtotal * GST_RATE);
  const total = subtotal + gst;
  const advance = Math.round(total * ADVANCE_RATE);
  return { service, product, area, wallArea, ceilingArea, litres, coats, condition, lines, subtotal, gst, total, advance, balance: total - advance };
}

function renderQuote() {
  const name = quoteForm.elements.name.value.trim();
  const phone = quoteForm.elements.phone.value.trim();
  const area = Number(quoteForm.elements.area.value);
  const phoneValid = phone === '' || /^[6-9][0-9]{9}$/.test(phone);

  if (!Number.isFinite(area) || area < 100 || area > 50000) {
    quoteError.textContent = 'Please enter an area between 100 and 50,000 sq ft.';
    return;
  }
  if (!phoneValid) {
    quoteError.textContent = 'Enter a valid 10-digit Indian mobile number, or leave it blank.';
    return;
  }
  quoteError.textContent = '';

  const quote = buildQuote();
  const now = new Date();
  const quoteNo = `HH-${now.toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
  const dateText = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  quoteSheet.innerHTML = `
    <header class="quote-head"><div><p class="card-kicker">Quotation</p><h3>Hue &amp; Home</h3><p>Owner: Shabihul Quamar<br>H.No 1623, Ramareddy Building, Ground &amp; 1st Floor, Cross Gayathri School, Vijinapura, North Bangalore, Karnataka 560016<br>Call / WhatsApp: 8521962085</p></div><dl><div><dt>Quote no.</dt><dd>${quoteNo}</dd></div><div><dt>Date</dt><dd>${dateText}</dd></div><div><dt>Valid for</dt><dd>7 days</dd></div></dl></header>
    <p class="quote-for"><strong>Wall shade:</strong> ${escapeHtml(shadeLabel())}<br><strong>Prepared for:</strong> ${name ? escapeHtml(name) : 'Customer'}${phone ? ` · ${escapeHtml(phone)}` : ''}</p>
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
    `Area: ${quote.area} sq ft (${quote.condition === 'fresh' ? 'fresh' : 'repaint'})`,
    `Shade: ${shadeLabel()}`,
    `Paint: ${quote.product.brand} ${quote.product.name}, ${quote.coats} coats (${quote.litres} L)`,
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
