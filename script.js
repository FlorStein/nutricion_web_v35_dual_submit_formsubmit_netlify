// ===== Navigation logic (rebuilt clean) =====

// Elements
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('#nav-menu');
const submenuToggle = document.querySelector('.submenu-toggle');
const submenu = document.querySelector('#submenu-servicios');

// Breakpoint helpers
function isDesktop(){ return window.matchMedia('(min-width: 901px)').matches; }
function isMobile(){ return !isDesktop(); }

// Helpers
function setMenuOpen(open) {
  if (!menu || !toggle) return;
  menu.setAttribute('data-open', open ? 'true' : 'false');
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function setSubExpanded(val) {
  if (!submenuToggle || !submenu) return;
  submenuToggle.setAttribute('aria-expanded', String(val));
  if (val) submenu.removeAttribute('hidden'); else submenu.setAttribute('hidden','');
}

// Init
setSubExpanded(false);

// Hamburger toggle (mobile/tablet only)
if (toggle && menu) {
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    const open = menu.getAttribute('data-open') === 'true';
    setMenuOpen(!open);
    // Keep submenu closed when (re)opening menu
    setSubExpanded(false);
  });
}

// Submenu toggle
if (submenuToggle && submenu) {
  submenuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = submenuToggle.getAttribute('aria-expanded') === 'true';
    if (isDesktop()) {
      // Desktop: toggle open/close on itself
      setSubExpanded(!isOpen);
    } else {
      // Mobile: keep previous behavior (open-only)
      if (!isOpen) setSubExpanded(true);
    }
  });

  // Keyboard support
  submenuToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      submenuToggle.click();
    }
  });

  // Close submenu when a submenu item is selected; also close mobile menu if open
  submenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      setSubExpanded(false);
      if (isMobile() && menu && menu.getAttribute('data-open') === 'true') {
        setMenuOpen(false);
      }
    });
  });
}

// Desktop-only: click outside closes the submenu
document.addEventListener('click', (e) => {
  if (!isDesktop()) return;
  const within = e.target.closest('.has-submenu');
  if (!within) setSubExpanded(false);
});

// Close mobile menu on any primary nav link tap (excluding Servicios toggle)
document.querySelectorAll('.nav-link:not(.submenu-toggle), .submenu-link').forEach(link => {
  link.addEventListener('click', () => {
    setSubExpanded(false);
    if (isMobile() && menu && menu.getAttribute('data-open') === 'true') {
      setMenuOpen(false);
    }
  });
});

// ===== Campaign tracking helpers (kept minimal to avoid conflicts) =====
(function() {
  const byId = (id) => document.getElementById(id);
  const params = new URLSearchParams(location.search);
  if (byId('utm_source')) {
    byId('utm_source').value  = params.get('utm_source') || '';
    byId('utm_medium').value  = params.get('utm_medium') || '';
    byId('utm_campaign').value= params.get('utm_campaign') || '';
    byId('utm_term').value    = params.get('utm_term') || '';
    byId('utm_content').value = params.get('utm_content') || '';
    byId('gclid').value       = params.get('gclid') || '';
    byId('fbclid').value      = params.get('fbclid') || '';
    byId('referrer').value    = document.referrer || '';
    byId('landing_page').value= location.href;
  }
  function track(eventName, params) {
    try { if (window.gtag) gtag('event', eventName, params || {}); } catch(e){}
    try { if (window.fbq) fbq('trackCustom', eventName, params || {}); } catch(e){}
  }
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => track('cta_click', {text: btn.textContent.trim()}));
  });
  document.querySelectorAll('.nav-link, .submenu-link').forEach(a => {
    a.addEventListener('click', () => track('nav_click', {href: a.getAttribute('href')}));
  });
  const form = document.querySelector('form.contact-form');
  if (form) form.addEventListener('submit', () => track('contact_submit', {method: 'netlify'}));
})();

// WhatsApp click tracking
document.querySelectorAll('.btn-whats').forEach(btn => {
  btn.addEventListener('click', () => {
    try { if (window.gtag) gtag('event','whatsapp_click'); } catch(e){}
    try { if (window.fbq) fbq('trackCustom','whatsapp_click'); } catch(e){}
  });
});


// ===== Dual submit: Netlify capture + FormSubmit email =====
(function(){
  const form = document.querySelector('form.contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    try {
      const fd = new FormData(form);
      if (!fd.get('form-name')) fd.set('form-name', form.getAttribute('name') || 'contact');
      const params = new URLSearchParams(fd);
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
        keepalive: true
      }).catch(()=>{});
    } catch(err){ /* noop */ }
  }, { passive: true });
})();
