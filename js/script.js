'use strict';

document.getElementById('year').textContent = new Date().getFullYear();

const copyButton = document.getElementById('copy-phone');
const copyLabel = document.getElementById('copy-label');
const copyStatus = document.getElementById('copy-status');
let resetCopy;
copyButton.hidden = false;
copyButton.addEventListener('click', async () => {
  clearTimeout(resetCopy);
  copyButton.classList.remove('copied');
  copyLabel.textContent = 'Copiar número';
  copyStatus.textContent = '';
  document.getElementById('manual-copy').hidden = true;
  let copied = false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText('657375902');
      copied = true;
    }
  } catch { /* Offer the selection fallback below. */ }
  if (!copied) {
    const fallback = document.getElementById('manual-copy');
    const input = document.getElementById('phone-fallback');
    fallback.hidden = false;
    input.focus();
    input.select();
    try { copied = document.execCommand('copy'); } catch { copied = false; }
    if (copied) { fallback.hidden = true; copyButton.focus(); }
  }
  if (copied) {
    copyButton.classList.add('copied');
    copyLabel.textContent = 'Número copiado';
    copyStatus.textContent = '657375902 copiado al portapapeles.';
    resetCopy = setTimeout(() => {
      copyButton.classList.remove('copied');
      copyLabel.textContent = 'Copiar número';
      copyStatus.textContent = '';
    }, 5000);
  } else {
    copyStatus.textContent = 'Puedes copiar el número desde el campo seleccionado.';
  }
});

const sections = [...document.querySelectorAll('[data-section]')];
const mobileLinks = [...document.querySelectorAll('.mobile-nav a')];
let scheduled = false;
function updateNavigation() {
  const anchor = window.innerHeight * 0.38;
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= anchor) current = section;
  }
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5) {
    current = sections[sections.length - 1];
  }
  document.getElementById('section-name').textContent = current.dataset.section;
  const mobileTarget = current.id === 'universo' ? 'inicio' : current.id;
  for (const link of mobileLinks) {
    if (link.hash === '#' + mobileTarget) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  scheduled = false;
}
function scheduleNavigation() {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
}
window.addEventListener('scroll', scheduleNavigation, { passive: true });
window.addEventListener('resize', scheduleNavigation);
window.addEventListener('hashchange', scheduleNavigation);
updateNavigation();
