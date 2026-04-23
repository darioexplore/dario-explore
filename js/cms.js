/* =========================================================
   Dario Explore — cms.js
   Fetches from Sanity when enabled, falls back to local data
   ========================================================= */
import { sanityConfig, fetchSanity, imageUrl } from './sanity.js';

/* ────────────────────────────────────────────────────────
   LOCAL FALLBACK DATA
   (used when sanityConfig.enabled === false)
   ──────────────────────────────────────────────────────── */
const LOCAL = {
  settings: {
    heroHeadline: "I film the world the way it *feels* not how it looks.",
    heroSub: "Based between Japan and wherever the next story takes me. I create cinematic films and photography for luxury hotels, travel brands, and the places most people fly over.",
    clients: [
      { name: 'Aman',       domain: 'aman.com' },
      { name: 'Rosewood',   domain: 'rosewoodhotels.com' },
      { name: 'Fairmont',   domain: 'fairmont.com' },
      { name: 'Six Senses', domain: 'sixsenses.com' },
      { name: 'Capella',    domain: 'capellahotels.com' },
      { name: 'Anantara',   domain: 'anantara.com' },
      { name: 'Accor',      domain: 'accor.com' },
      { name: 'Sony',       domain: 'sony.com' },
      { name: 'Insta360',   domain: 'insta360.com' },
    ],
  },

  projects: [
    {
      _id: 'chasing-the-child',
      title: 'Chasing the Child',
      slug: 'chasing-the-child',
      location: 'Maasai Mara, Kenya',
      year: '2024',
      projectType: 'Short Film',
      types: ['film','personal'],
      description: 'A cinematic short following a dawn safari with my closest friend — about the moment a grown man remembers what it felt like to be amazed.',
      coverUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=2000&q=80',
      wide: true,
    },
    {
      _id: 'seasons-of-stillness',
      title: 'Seasons of Stillness',
      slug: 'seasons-of-stillness',
      location: 'Kyoto, Japan',
      year: '2024',
      projectType: 'Hospitality Film',
      types: ['film','hospitality'],
      description: 'A brand film exploring the silence between seasons — shot for an ultra-luxury property in the hills above Kyoto.',
      coverUrl: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=80',
    },
    {
      _id: 'mono-no-aware',
      title: 'Mono no Aware',
      slug: 'mono-no-aware',
      location: 'Osaka, Japan',
      year: '2025',
      projectType: 'Personal Film',
      types: ['film','personal','photography'],
      description: 'A portrait of a city that doesn\'t ask to be photographed — it just reveals itself, slowly, to those who wait.',
      coverUrl: 'https://images.unsplash.com/photo-1494521843291-51f2a00ffe80?auto=format&fit=crop&w=1200&q=80',
    },
    {
      _id: 'invisible-garden',
      title: 'The Invisible Garden',
      slug: 'invisible-garden',
      location: 'Ubud, Bali',
      year: '2023',
      projectType: 'Hospitality Film',
      types: ['film','hospitality'],
      description: 'Filmed for a Six Senses property. What luxury feels like when it stops trying to announce itself.',
      coverUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2000&q=80',
      wide: true,
    },
    {
      _id: 'river-of-light',
      title: 'River of Light',
      slug: 'river-of-light',
      location: 'Prayagraj, India',
      year: '2023',
      projectType: 'Documentary',
      types: ['film'],
      description: 'Shot at Kumbh Mela. Forty million people, and somehow, perfect quiet at the water\'s edge.',
      coverUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f36d?auto=format&fit=crop&w=1200&q=80',
    },
    {
      _id: 'wabi',
      title: 'Wabi',
      slug: 'wabi',
      location: 'Yakushima, Japan',
      year: '2024',
      projectType: 'Personal Film',
      types: ['film','personal'],
      description: 'Two weeks alone in a cedar forest that\'s been growing for seven thousand years.',
      coverUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
    },
  ],

  services: [
    { number: '01', title: 'Hospitality Film', description: 'Cinematic brand films for ultra-luxury and boutique hotels. From initial concept to final DaVinci grade — a complete visual story of your property.', tags: ['Concept','Production','Grade','Delivery'] },
    { number: '02', title: 'Travel Photography', description: 'Editorial and atmospheric photography with a filmmaker\'s sense of light and composition. Built for campaigns, press, and social.', tags: ['Editorial','Atmospheric','Campaign','Social'] },
    { number: '03', title: 'Social Content Partnership', description: 'Ongoing collaborations for brands wanting a consistent cinematic presence — Instagram reels, YouTube features, and short-form film.', tags: ['Reels','YouTube','Short Film','Retainer'] },
    { number: '04', title: 'Creative Direction', description: 'For brands who need more than execution. I can develop the visual language, the mood, the shot list — and then shoot it.', tags: ['Visual Language','Mood','Shot List'] },
  ],

  testimonials: [
    { quote: '"Dario has a rare ability to find the soul of a place and render it in a way that makes you feel it rather than simply see it."', author: 'Marketing Director', company: 'Fairmont Hotels & Resorts' },
    { quote: '"Working with Dario felt less like a production and more like collaborating with someone who genuinely understood what we were trying to say."', author: 'Brand Manager', company: 'Anantara Hotels' },
    { quote: '"The footage he delivered was unlike anything we\'d briefed. Better."', author: 'Content Director', company: 'Accor Hotels' },
  ],

  journal: [
    { title: 'Why I stopped shooting golden hour', category: 'Filmmaking', excerpt: 'The light everyone chases is the light that\'s starting to lie about a place.', date: 'March 2025', coverUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=900&q=80' },
    { title: 'What Kumbh Mela taught me about quiet', category: 'Travel', excerpt: 'Forty million people. One moment of absolute stillness.', date: 'January 2025', coverUrl: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=900&q=80' },
    { title: 'On shooting alone in Yakushima', category: 'Behind the scenes', excerpt: 'Two weeks. No crew. A cedar forest that\'s been there longer than recorded history.', date: 'November 2024', coverUrl: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=900&q=80' },
  ],
};

/* ────────────────────────────────────────────────────────
   GROQ QUERIES
   ──────────────────────────────────────────────────────── */
const QUERIES = {
  settings: `*[_type == "siteSettings"][0]{
    heroHeadline, heroSub,
    "clients": clients[]{
      name, domain,
      "logoRef": logo.asset._ref
    }
  }`,

  projects: `*[_type == "project"] | order(order asc) {
    _id, title, "slug": slug.current,
    location, year, projectType,
    types, description, wide,
    "coverUrl": coverImage.asset._ref
  }`,

  services: `*[_type == "service"] | order(order asc) {
    number, title, description, tags
  }`,

  testimonials: `*[_type == "testimonial"] | order(order asc) {
    quote, author, company
  }`,

  journal: `*[_type == "journalPost"] | order(date desc) [0..2] {
    title, "slug": slug.current,
    category, excerpt, date,
    "coverUrl": coverImage.asset._ref
  }`,
};

/* ────────────────────────────────────────────────────────
   RENDERERS
   ──────────────────────────────────────────────────────── */
function renderProjects(projects) {
  const grid = document.querySelector('.work');
  if (!grid) return;
  grid.innerHTML = projects.map(p => {
    const img = p.coverUrl?.startsWith('image-')
      ? imageUrl(p.coverUrl, { w: p.wide ? 2000 : 1200 })
      : p.coverUrl;
    return `
      <a class="work__card${p.wide ? ' work__card--wide' : ''}"
         data-types="${(p.types || []).join(' ')}"
         href="work/project.html?id=${p.slug}">
        <div class="work__media">
          <img src="${img}" alt="${p.title}" loading="lazy" />
        </div>
        <div class="work__meta">
          <div>
            <h3>${p.title}</h3>
            <p>${p.description}</p>
          </div>
          <ul class="work__tags">
            <li>${p.projectType}</li>
            <li>${p.location}</li>
          </ul>
        </div>
        <span class="work__view">View project →</span>
      </a>`;
  }).join('');
}

function renderServices(services) {
  const list = document.querySelector('.services__list');
  if (!list) return;
  list.innerHTML = services.map(s => `
    <li class="services__item">
      <span class="services__num">${s.number}</span>
      <div class="services__body">
        <h3>${s.title}</h3>
        <p>${s.description}</p>
      </div>
      <ul class="services__tags">
        ${(s.tags || []).map(t => `<li>${t}</li>`).join('')}
      </ul>
    </li>`).join('');
}

function renderTestimonials(items) {
  const grid = document.querySelector('.testimonials__grid');
  if (!grid) return;
  grid.innerHTML = items.map(t => `
    <blockquote class="testimonial">
      <p>${t.quote}</p>
      <footer>
        <cite>${t.author}</cite>
        <span>${t.company}</span>
      </footer>
    </blockquote>`).join('');
}

function renderJournal(posts) {
  const grid = document.querySelector('.journal__grid');
  if (!grid) return;
  grid.innerHTML = posts.map(p => {
    const img = p.coverUrl?.startsWith('image-') ? imageUrl(p.coverUrl, { w: 900 }) : p.coverUrl;
    const date = p.date ? new Date(p.date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : p.date;
    return `
      <a class="journal__card" href="#">
        <div class="journal__media">
          <img src="${img}" alt="${p.title}" loading="lazy" />
        </div>
        <div class="journal__body">
          <span class="journal__tag">${p.category}</span>
          <h3>${p.title}</h3>
          <p>${p.excerpt}</p>
          <span class="journal__date">${date}</span>
        </div>
      </a>`;
  }).join('');
}

function renderClients(clients) {
  const track = document.querySelector('.logos__track');
  if (!track || !clients?.length) return;

  // If Sanity still has old string-format data, leave the hardcoded HTML as-is
  if (typeof clients[0] === 'string') return;

  // Filter out entries with no logo source at all
  const valid = clients.filter(c => c && (c.logoRef || c.domain || c.name));
  if (!valid.length) return;

  function clientImg(c) {
    if (c.logoRef) {
      // Uploaded PNG in Sanity — this is the real logo
      const src = imageUrl(c.logoRef, { h: 64, fit: 'max', q: 90 });
      return `<img src="${src}" alt="${c.name || ''}" loading="lazy" />`;
    }
    // Styled wordmark fallback until a logo is uploaded
    return `<span>${c.name || ''}</span>`;
  }

  const items = [...valid, ...valid]; // duplicate for seamless loop
  track.innerHTML = items.map((c, i) =>
    `<div class="logos__item"${i >= valid.length ? ' aria-hidden="true"' : ''}>${clientImg(c)}</div>`
  ).join('');
}

/* ────────────────────────────────────────────────────────
   BOOTSTRAP
   ──────────────────────────────────────────────────────── */
async function load() {
  let data;

  if (sanityConfig.enabled && sanityConfig.projectId !== 'YOUR_PROJECT_ID') {
    try {
      const [settings, projects, services, testimonials, journal] = await Promise.all([
        fetchSanity(QUERIES.settings),
        fetchSanity(QUERIES.projects),
        fetchSanity(QUERIES.services),
        fetchSanity(QUERIES.testimonials),
        fetchSanity(QUERIES.journal),
      ]);
      data = { settings, projects, services, testimonials, journal };
    } catch (err) {
      console.warn('[CMS] Sanity fetch failed, using local data:', err);
      data = LOCAL;
    }
  } else {
    data = LOCAL;
  }

  if (data.projects?.length)     renderProjects(data.projects);
  if (data.services?.length)     renderServices(data.services);
  if (data.testimonials?.length) renderTestimonials(data.testimonials);
  if (data.journal?.length)      renderJournal(data.journal);
  if (data.settings?.clients)    renderClients(data.settings.clients);

  window.dispatchEvent(new Event('cms:loaded'));
}

load();
