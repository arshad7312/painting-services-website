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

const WHATSAPP_NUMBER = '918521962085';
const GST_RATE = 0.18;

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
      { brand: 'Nerolac', name: 'Impressions', tier: 'Premium', price: 450, coverage: 130 }
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
  return { service, product, area, wallArea, ceilingArea, litres, coats, condition, lines, subtotal, gst, total: subtotal + gst };
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
    <p class="quote-for"><strong>Prepared for:</strong> ${name ? escapeHtml(name) : 'Customer'}${phone ? ` · ${escapeHtml(phone)}` : ''}</p>
    <div class="quote-table-wrap"><table><thead><tr><th>Item</th><th>Basis</th><th>Amount</th></tr></thead><tbody>
      ${quote.lines.map((line) => `<tr><td>${escapeHtml(line.item)}</td><td>${escapeHtml(line.detail)}</td><td>${inr.format(line.amount)}</td></tr>`).join('')}
    </tbody><tfoot>
      <tr><td colspan="2">Subtotal</td><td>${inr.format(quote.subtotal)}</td></tr>
      <tr><td colspan="2">GST @ 18%</td><td>${inr.format(quote.gst)}</td></tr>
      <tr class="grand"><td colspan="2">Estimated total</td><td>${inr.format(quote.total)}</td></tr>
    </tfoot></table></div>
    <p class="fine-print">This is an indicative estimate based on the area you entered. The final quotation is confirmed after a site visit and measurement. Paint prices follow the dealer rate on the day of purchase.</p>`;

  const message = [
    'Hi Shabihul, I would like to book a painting service.',
    `Quote no: ${quoteNo}`,
    name && `Name: ${name}`,
    phone && `Mobile: ${phone}`,
    `Service: ${quote.service.label}`,
    `Area: ${quote.area} sq ft (${quote.condition === 'fresh' ? 'fresh' : 'repaint'})`,
    `Paint: ${quote.product.brand} ${quote.product.name}, ${quote.coats} coats (${quote.litres} L)`,
    `Estimated total (incl. GST): ${inr.format(quote.total)}`
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
