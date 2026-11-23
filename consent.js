// Cookie consent: nothing that sets non-essential cookies (Meta Pixel) runs until the visitor accepts.
// The choice is stored only in the visitor's browser (localStorage) and can be changed at any time
// through any element with the class "js-consent-open".
(function () {
  var KEY = 'ulm-consent-v1';
  var memory = null; // fallback when localStorage is unavailable (private mode, blocked storage)
  var listeners = [];

  function read() {
    try { var r = JSON.parse(window.localStorage.getItem(KEY)); if (r && r.value) return r.value; } catch (e) {}
    return memory;
  }
  function save(value) {
    memory = value;
    try {
      window.localStorage.setItem(KEY, JSON.stringify({ value: value, date: new Date().toISOString(), version: 1 }));
    } catch (e) {}
  }
  function clearMetaCookies() {
    var host = window.location.hostname;
    ['_fbp', '_fbc'].forEach(function (name) {
      [host, '.' + host, ''].forEach(function (domain) {
        document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '');
      });
    });
  }

  var banner = document.createElement('section');
  banner.className = 'consent';
  banner.setAttribute('aria-label', 'Aviso de cookies');
  banner.hidden = true;
  banner.innerHTML =
    '<p class="consent__text">Usamos cookies da Meta (Facebook e Instagram) para medir nossos anúncios. ' +
    'Eles só são ativados se você aceitar. <a href="privacidade.html">Saiba mais</a>.</p>' +
    '<div class="consent__actions">' +
    '<button type="button" class="consent__btn" data-consent="denied">Recusar</button>' +
    '<button type="button" class="consent__btn" data-consent="granted">Aceitar</button>' +
    '</div>';

  function show() { banner.hidden = false; document.body.classList.add('has-consent'); }
  function hide() { banner.hidden = true; document.body.classList.remove('has-consent'); }

  function decide(value) {
    var previous = read();
    save(value);
    hide();
    if (value === 'granted') {
      var cbs = listeners; listeners = [];
      cbs.forEach(function (cb) { cb(); });
    } else if (previous === 'granted') {
      // Withdrawing consent: remove Meta cookies and reload so the Pixel is no longer on the page.
      clearMetaCookies();
      window.location.reload();
    }
  }

  banner.addEventListener('click', function (e) {
    var v = e.target && e.target.getAttribute('data-consent');
    if (v) decide(v);
  });

  window.SiteConsent = {
    status: read,
    onGrant: function (cb) { if (read() === 'granted') cb(); else listeners.push(cb); },
    open: show
  };

  function init() {
    document.body.appendChild(banner);
    if (!read()) show();
    document.querySelectorAll('.js-consent-open').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); show(); });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
