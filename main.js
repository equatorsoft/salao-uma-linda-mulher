(function () {
  var cfg = window.SITE_CONFIG || {};

  // ---- Meta Pixel (only loads when an ID is configured) ----
  if (cfg.metaPixelId) {
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

  function track(origin) {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Contact', { content_name: 'whatsapp', origin: origin });
      window.fbq('trackCustom', 'WhatsAppClick', { origin: origin });
    }
  }

  // ---- WhatsApp links ----
  var waUrl = 'https://wa.me/' + cfg.whatsappNumber +
    '?text=' + encodeURIComponent(cfg.whatsappMessage || '');

  document.querySelectorAll('.js-whatsapp').forEach(function (el) {
    el.setAttribute('href', waUrl);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
    el.addEventListener('click', function () { track(el.dataset.origin || 'link'); });
  });

  // ---- Instagram posts (official embed, loaded only when the section is near) ----
  var posts = (cfg.instagramPosts || []).filter(Boolean);
  var postsBox = document.getElementById('insta-posts');
  if (posts.length && postsBox) {
    posts.forEach(function (url) {
      var clean = url.split('?')[0].replace(/\/?$/, '/');
      var bq = document.createElement('blockquote');
      bq.className = 'instagram-media';
      bq.setAttribute('data-instgrm-permalink', clean);
      bq.setAttribute('data-instgrm-version', '14');
      var a = document.createElement('a');
      a.href = clean; a.target = '_blank'; a.rel = 'noopener';
      a.textContent = 'Ver este trabalho no Instagram';
      bq.appendChild(a);
      postsBox.appendChild(bq);
    });
    postsBox.hidden = false;
    document.getElementById('insta-card').hidden = true;
    document.getElementById('insta-more').hidden = false;
    document.getElementById('insta-hint').hidden = false;

    var loaded = false;
    function loadEmbeds() {
      if (loaded) return; loaded = true;
      var s = document.createElement('script');
      s.async = true; s.src = 'https://www.instagram.com/embed.js';
      document.body.appendChild(s);
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) { loadEmbeds(); io.disconnect(); }
      }, { rootMargin: '600px 0px' });
      io.observe(postsBox);
    } else {
      loadEmbeds();
    }
  }
})();
