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

const estimateForm = document.querySelector('#estimate-form');
const formStatus = document.querySelector('#form-status');

estimateForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!estimateForm.reportValidity()) return;

  const name = estimateForm.elements.name.value.trim();
  formStatus.textContent = `Thanks, ${name}. Your details are ready. Connect a lead service to receive consultation requests.`;
  estimateForm.reset();
});

document.querySelector('#year').textContent = String(new Date().getFullYear());
