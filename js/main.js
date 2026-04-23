/* =========================================================
   Dario Explore — main.js
   ========================================================= */
(() => {
  'use strict';

  /* ── Animated film-grain canvas ── */
  function initGrain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'film-grain';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let w, h, frame = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Box-Muller Gaussian — organic film-silver distribution
    const gauss = () => {
      const u = 1 - Math.random();
      const v = Math.random();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    };

    const resize = () => {
      // Physical-pixel canvas → 1 grain dot = 1 display pixel (finest possible)
      w = canvas.width  = Math.ceil(window.innerWidth  * dpr);
      h = canvas.height = Math.ceil(window.innerHeight * dpr);
      canvas.style.width  = window.innerWidth  + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };

    const draw = () => {
      frame++;
      if (frame % 2 === 0) {
        const img = ctx.createImageData(w, h);
        const d   = img.data;
        for (let i = 0; i < d.length; i += 4) {
          // σ=18 → tight cluster around mid-grey, very fine organic texture
          const v = Math.min(255, Math.max(0, 128 + gauss() * 18)) | 0;
          d[i] = d[i+1] = d[i+2] = v;
          d[i+3] = 255;
        }
        ctx.putImageData(img, 0, 0);
      }
      requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();
  }

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    initGrain();
  }

  /* ── Page loader ── */
  const loader      = document.querySelector('.loader');
  const loaderBar   = loader?.querySelector('.loader__bar span');
  const loaderCount = loader?.querySelector('.loader__count');
  let progress = 0;

  const tick = () => {
    progress += Math.random() * 14 + 6;
    if (progress >= 100) progress = 100;
    if (loaderBar)   loaderBar.style.width = progress + '%';
    if (loaderCount) loaderCount.textContent = String(Math.floor(progress)).padStart(3, '0');
    if (progress < 100) setTimeout(tick, 80);
    else setTimeout(() => loader?.classList.add('done'), 300);
  };
  window.addEventListener('load', tick);

  /* ── Custom cursor ── */
  const cursor = document.querySelector('.cursor');
  const dot    = cursor?.querySelector('.cursor__dot');
  const ring   = cursor?.querySelector('.cursor__ring');

  if (cursor && matchMedia('(hover: hover)').matches) {
    let mx = 0, my = 0, dx = 0, dy = 0, rx = 0, ry = 0;
    window.addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; });
    const render = () => {
      dx += (mx - dx) * 0.9; dy += (my - dy) * 0.9;
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      if (dot)  dot.style.transform  = `translate(${dx}px,${dy}px) translate(-50%,-50%)`;
      if (ring) ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(render);
    };
    render();

    const applyHover = () => {
      document.querySelectorAll('a, button, .work__card, .services__item, .logos__item, .approach__step, .testimonial, .journal__card')
        .forEach(el => {
          el.addEventListener('pointerenter', () => cursor.classList.add('is-hover'));
          el.addEventListener('pointerleave', () => cursor.classList.remove('is-hover'));
        });
    };
    // Run once now, re-run after CMS content loads
    applyHover();
    window.addEventListener('cms:loaded', applyHover);
  }

  /* ── Header scroll state ── */
  const header = document.querySelector('.site-header');
  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 60);
  };
  document.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();

  /* ── Mobile drawer ── */
  const burger = document.querySelector('.site-header__burger');
  const drawer = document.querySelector('.drawer');
  burger?.addEventListener('click', () => {
    const open = drawer?.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(!!open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    drawer.classList.remove('is-open');
    burger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }));

  /* ── Work filters ── */
  function initFilters() {
    const filters = document.querySelectorAll('.work-filter');
    const cards   = document.querySelectorAll('.work__card');
    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        filters.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const f = btn.dataset.filter;
        cards.forEach(card => {
          const types = (card.dataset.types || '').split(' ');
          const show  = f === 'all' || types.includes(f);
          card.classList.toggle('is-hidden', !show);
          if (show && !card.classList.contains('is-in')) io?.observe(card);
        });
      });
    });
  }
  initFilters();

  /* ── Scroll reveal ── */
  const revealTargets = document.querySelectorAll(
    '.work__card, .services__item, .approach__step, .section-head, .testimonial, .journal__card, .about__stat, .about__img'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealTargets.forEach(el => io.observe(el));

  // Re-observe after CMS injects new cards
  window.addEventListener('cms:loaded', () => {
    document.querySelectorAll('.work__card:not(.reveal), .services__item:not(.reveal), .testimonial:not(.reveal), .journal__card:not(.reveal)')
      .forEach(el => { el.classList.add('reveal'); io.observe(el); });
    initFilters();
  });

  /* ── Parallax on work images ── */
  const getCards = () => document.querySelectorAll('.work__card');
  document.addEventListener('scroll', () => {
    const vh = window.innerHeight;
    getCards().forEach(card => {
      if (card.classList.contains('is-hidden')) return;
      const rect = card.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;
      const img = card.querySelector('.work__media img');
      if (!img) return;
      const p = (rect.top + rect.height / 2 - vh / 2) / vh;
      img.style.transform = `translateY(${p * -16}px) scale(1.06)`;
    });
  }, { passive: true });

  /* ── Contact form ── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const success = contactForm.querySelector('.contact-form__success');
    const error   = contactForm.querySelector('.contact-form__error');

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }

      contactForm.classList.add('is-sending');
      success.hidden = true;
      error.hidden   = true;

      try {
        // Replace YOUR_FORM_ID with your Formspree form ID (formspree.io)
        const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
          method:  'POST',
          headers: { 'Accept': 'application/json' },
          body:    new FormData(contactForm),
        });

        if (res.ok) {
          contactForm.reset();
          success.hidden = false;
          success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          throw new Error('non-ok');
        }
      } catch {
        error.hidden = false;
      } finally {
        contactForm.classList.remove('is-sending');
      }
    });
  }

  /* ── Footer logotype entrance ── */
  const logotype = document.querySelector('.footer__logotype');
  if (logotype) {
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          logotype.animate(
            [
              { letterSpacing: '0.02em', transform: 'translateY(10%) scaleY(0.88)', opacity: 0 },
              { letterSpacing: '-0.04em', transform: 'translateY(4%) scaleY(1)', opacity: 1 }
            ],
            { duration: 1200, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'both' }
          );
        }
      });
    }, { threshold: 0.15 }).observe(logotype);
  }

})();
