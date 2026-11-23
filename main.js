(function () {
  var cfg = window.SITE_CONFIG || {};

  // ---- Campaign (UTM) detection ----
  function slug(s) {
    return String(s || '')
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
      .slice(0, 60);
  }
  var params = new URLSearchParams(window.location.search);
  var campaignRaw = (params.get('utm_campaign') || '').trim().slice(0, 60);
  // Keep only readable characters so a crafted link can't inject odd text into the message.
  var campaignLabel = campaignRaw.replace(/[^\p{L}\p{N} _.-]/gu, '').trim();
  var campaign = slug(campaignRaw);

  function whatsappMessage() {
    var messages = cfg.campaignMessages || {};
    if (campaign && messages[campaign]) return messages[campaign];
    var base = cfg.whatsappMessage || '';
    return campaignLabel ? base + ' (anúncio: ' + campaignLabel + ')' : base;
  }

  // ---- Meta Pixel: only loads when an ID is configured AND the visitor accepted cookies ----
  function loadPixel() {
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', cfg.metaPixelId);
    window.fbq('track', 'PageView');
  }
  if (cfg.metaPixelId && window.SiteConsent) window.SiteConsent.onGrant(loadPixel);

  function track(event, origin) {
    if (typeof window.fbq !== 'function') return;
    var data = { origin: origin, campaign: campaign || 'organico' };
    if (event === 'whatsapp') {
      window.fbq('track', 'Contact', data);
      window.fbq('trackCustom', 'WhatsAppClick', data);
    } else if (event === 'directions') {
      window.fbq('track', 'FindLocation', data);
    } else {
      window.fbq('trackCustom', 'InstagramClick', data);
    }
  }

  // ---- WhatsApp links ----
  var waUrl = 'https://wa.me/' + cfg.whatsappNumber +
    '?text=' + encodeURIComponent(whatsappMessage());

  document.querySelectorAll('.js-whatsapp').forEach(function (el) {
    el.setAttribute('href', waUrl);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
    el.addEventListener('click', function () { track('whatsapp', el.dataset.origin || 'link'); });
  });

  // ---- Google Maps: loaded only when the visitor asks for it (Google may set cookies) ----
  document.querySelectorAll('.js-map-load').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.title = btn.getAttribute('data-title');
      iframe.src = btn.getAttribute('data-src');
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      btn.replaceWith(iframe);
    });
  });

  // ---- Directions link ----
  document.querySelectorAll('.js-directions').forEach(function (el) {
    el.addEventListener('click', function () { track('directions', el.dataset.origin || 'mapa'); });
  });

  // ---- Instagram links (gallery) ----
  document.querySelectorAll('.js-instagram').forEach(function (el) {
    el.addEventListener('click', function () { track('instagram', el.dataset.origin || 'galeria'); });
  });
})();
