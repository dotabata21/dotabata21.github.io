'use strict';
// Owner-approved release switches. Keep false until the actual public release is verified.
// Android URL must be copied from the published Play listing, never guessed.
const releases = Object.freeze({
  web: { published: false, url: 'https://bpr-kun.web.app/' },
  android: { published: false, url: null }
});

function publishedUrl(kind, release) {
  if (!release || release.published !== true || typeof release.url !== 'string') return null;
  try {
    const url = new URL(release.url);
    if (url.protocol !== 'https:' || url.username || url.password) return null;
    if (kind === 'web' && url.href === 'https://bpr-kun.web.app/') return url.href;
    if (kind === 'android' && url.hostname === 'play.google.com' && url.pathname === '/store/apps/details'
        && url.searchParams.get('id') && !url.hash) return url.href;
  } catch { /* Invalid configuration stays unavailable. No telemetry. */ }
  return null;
}

for (const [kind, release] of Object.entries(releases)) {
  const href = publishedUrl(kind, release);
  if (!href) continue;
  for (const button of document.querySelectorAll(`[data-release="${kind}"]`)) {
    const link = document.createElement('a');
    link.className = button.className;
    link.textContent = kind === 'web' ? '血圧記録くん Webを開く' : button.textContent;
    link.href = href;
    link.dataset.release = kind;
    button.replaceWith(link);
  }
  for (const status of document.querySelectorAll(`[data-release-status="${kind}"]`)) {
    status.textContent = '公開中';
    status.classList.add('is-live');
  }
  for (const note of document.querySelectorAll(`[data-release-pending="${kind}"]`)) note.hidden = true;
}
// This script stores no visitor identifiers, makes no external requests, and never reads app records.
