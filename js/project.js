/* =========================================================
   Dario Explore — project.js
   Populates a case study page from ?id= query param.
   Tries Sanity first, falls back to local data.
   ========================================================= */
import { sanityConfig, fetchSanity, imageUrl } from './sanity.js';

/* ── Local data (fallback) ── */
const LOCAL_PROJECTS = {
  'chasing-the-child': {
    name: 'Chasing the Child',
    title: 'A dawn safari, and <em>the moment a grown man remembers.</em>',
    lead: 'A cinematic short following a dawn safari with my closest friend — about the moment a grown man remembers what it felt like to be amazed.',
    client: 'Personal Project', year: '2024',
    location: 'Maasai Mara, Kenya', type: 'Short Film',
    cover:    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=2400&q=85',
    story:    'My friend Tomás had spent fifteen years behind a desk. He called me from Lisbon one night and said: "I need to go somewhere that makes me feel small." We booked Kenya six days later. I brought one camera. This is what happened at 5am on the third morning.',
    made:     'No crew. No brief. Just two friends and the light as it came. I shot on Sony FX3 and edited entirely in DaVinci Resolve — letting the grade go warm and dusty in the way that felt true to how the air smelled. The score came last: a single piano, recorded in Nairobi.',
    result:   'The film picked up 2.4 million views on YouTube in its first month. More importantly, Tomás quit his job three weeks after we got back.',
    gallery1: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1200&q=80',
    gallery2: 'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?auto=format&fit=crop&w=1200&q=80',
    gallery3: 'https://images.unsplash.com/photo-1535941339077-2dd1c7963098?auto=format&fit=crop&w=2400&q=80',
    next: 'seasons-of-stillness',
  },
  'seasons-of-stillness': {
    name: 'Seasons of Stillness',
    title: '<em>The silence</em> between seasons.',
    lead: 'A brand film exploring the silence between seasons — shot for an ultra-luxury property in the hills above Kyoto.',
    client: 'Confidential — ultra-luxury hotel', year: '2024',
    location: 'Kyoto, Japan', type: 'Hospitality Film',
    cover:    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=2400&q=85',
    story:    'The property sits above Arashiyama. It has twenty-two rooms, no lobby music, and guests who come specifically to hear nothing. The brief was three words: "Film the quiet."',
    made:     'I spent the first two days not shooting — just walking the property, eating breakfast at different times to understand how the light moved through the rooms. The film was edited to a single ambient track recorded on the property itself: the sound of rain on a traditional roof.',
    result:   'The film became the centrepiece of the property\'s global relaunch campaign. Occupancy for their shoulder season increased 34% in the following year.',
    gallery1: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    gallery2: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80',
    gallery3: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=2400&q=80',
    next: 'mono-no-aware',
  },
  'mono-no-aware': {
    name: 'Mono no Aware',
    title: 'A city that <em>reveals itself</em> slowly.',
    lead: 'A two-minute portrait of Osaka — a city that doesn\'t ask to be photographed. It just reveals itself, slowly, to those who wait.',
    client: 'Personal Project', year: '2025',
    location: 'Osaka, Japan', type: 'Personal Film',
    cover:    'https://images.unsplash.com/photo-1494521843291-51f2a00ffe80?auto=format&fit=crop&w=2400&q=85',
    story:    'Osaka is not a city that performs for cameras. It\'s too busy being itself. I\'d been living here for four months and hadn\'t shot a single frame — I was waiting for the city to give me something.',
    made:     '"Mono no aware" is a Japanese phrase — something like "the gentle sadness of things passing." Shot over six weeks of early mornings, sometimes getting nothing usable for days.',
    result:   'A personal film. It\'s been shared quietly among people who\'ve lived here, and that\'s exactly right.',
    gallery1: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
    gallery2: 'https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?auto=format&fit=crop&w=1200&q=80',
    gallery3: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=2400&q=80',
    next: 'invisible-garden',
  },
  'invisible-garden': {
    name: 'The Invisible Garden',
    title: 'Luxury that stops <em>trying to announce itself.</em>',
    lead: 'Filmed for a Six Senses property in Ubud — an exploration of what luxury feels like when it stops trying to announce itself.',
    client: 'Six Senses', year: '2023',
    location: 'Ubud, Bali', type: 'Hospitality Film',
    cover:    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2400&q=85',
    story:    'Six Senses Ubud is hidden inside a ravine. You arrive, and the city disappears. The brief: capture the feeling of arriving somewhere so removed from the world that you forget to check your phone.',
    made:     'The film moves from arrival to the ritual bath at dusk — a single, slow exhale. I used almost no telephoto. Everything was wide, intimate, close.',
    result:   'Awarded Best Hospitality Film at the Travel Media Awards 2023. Six Senses commissioned a second film six months after delivery.',
    gallery1: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
    gallery2: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    gallery3: 'https://images.unsplash.com/photo-1562790351-d273a961e0e9?auto=format&fit=crop&w=2400&q=80',
    next: 'river-of-light',
  },
  'river-of-light': {
    name: 'River of Light',
    title: 'Forty million people, and <em>perfect quiet at the water\'s edge.</em>',
    lead: 'Shot at Kumbh Mela — the largest human gathering on earth. Forty million people, and somehow, perfect quiet at the water\'s edge.',
    client: 'Documentary Short', year: '2023',
    location: 'Prayagraj, India', type: 'Documentary',
    cover:    'https://images.unsplash.com/photo-1561361513-2d000a50f36d?auto=format&fit=crop&w=2400&q=85',
    story:    'Shot over nine days. I slept near the ghats to be there for the pre-dawn light. The film is entirely observational — a witness, not a director.',
    made:     'Sony FX3. A 35mm and a 14mm. No gimbal — I wanted the camera to feel present, not invisible.',
    result:   'Selected for the Banff Mountain Film Festival. Screened in eleven countries. Three commissions followed.',
    gallery1: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    gallery2: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80',
    gallery3: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=2400&q=80',
    next: 'wabi',
  },
  'wabi': {
    name: 'Wabi',
    title: 'A forest older than <em>recorded history.</em>',
    lead: 'Two weeks alone in a cedar forest that\'s been growing for seven thousand years. A film about smallness, and why it feels like relief.',
    client: 'Personal Project', year: '2024',
    location: 'Yakushima, Japan', type: 'Personal Film',
    cover:    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=2400&q=85',
    story:    'Yakushima is a UNESCO World Heritage island off the southern tip of Japan. The cedar trees — Yakusugi — are among the oldest living organisms on earth. I went alone and told no one where I was staying.',
    made:     'Two weeks. No crew. A single Sony FX3, a tripod, and a 24mm lens. I shot in the rain because the island is almost always raining. The edit took four months.',
    result:   'Not for brand partnerships or festival circuits. Just a film I needed to make. I\'ve had messages from people who watched it when they were struggling.',
    gallery1: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    gallery2: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80',
    gallery3: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=2400&q=80',
    next: 'chasing-the-child',
  },
};

/* ── Sanity GROQ for a single project ── */
const PROJECT_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    "name": title,
    title,
    "slug": slug.current,
    lead, client, year, location, projectType,
    "story":    challenge,
    "made":     approach,
    "result":   outcome,
    "cover":    coverImage.asset._ref,
    "gallery1": gallery[0].asset._ref,
    "gallery2": gallery[1].asset._ref,
    "gallery3": gallery[2].asset._ref,
  }
`;

/* ── Render helpers ── */
const set = (key, html) =>
  document.querySelectorAll(`[data-field="${key}"]`)
    .forEach(el => { el.innerHTML = html; });

const setImg = (key, src) =>
  document.querySelectorAll(`img[data-field="${key}"]`)
    .forEach(el => { el.src = src; });

function populate(p, nextName, nextSlug) {
  document.title = `${p.name} — Dario Explore`;

  set('name',     p.name);
  set('title',    p.title);
  set('lead',     p.lead);
  set('client',   p.client);
  set('year',     p.year);
  set('location', p.location);
  set('type',     p.type || p.projectType);
  set('story',    p.story || p.challenge || '');
  set('made',     p.made  || p.approach  || '');
  set('result',   p.result || p.outcome  || '');
  set('nextName', nextName);

  setImg('cover',    p.cover?.startsWith('image-') ? imageUrl(p.cover, { w: 2400 }) : p.cover);
  setImg('gallery1', p.gallery1?.startsWith('image-') ? imageUrl(p.gallery1, { w: 1200 }) : p.gallery1);
  setImg('gallery2', p.gallery2?.startsWith('image-') ? imageUrl(p.gallery2, { w: 1200 }) : p.gallery2);
  setImg('gallery3', p.gallery3?.startsWith('image-') ? imageUrl(p.gallery3, { w: 2400 }) : p.gallery3);

  const nextLink = document.querySelector('[data-field="nextLink"]');
  if (nextLink) nextLink.href = `project.html?id=${nextSlug}`;
}

/* ── Bootstrap ── */
(async () => {
  const params = new URLSearchParams(location.search);
  const id     = params.get('id') || 'chasing-the-child';

  // Try Sanity first
  if (sanityConfig.enabled && sanityConfig.projectId !== 'YOUR_PROJECT_ID') {
    try {
      const project = await fetchSanity(PROJECT_QUERY, { slug: id });
      if (project) {
        // Fetch next project slug from local map as fallback
        const nextSlug = LOCAL_PROJECTS[id]?.next || 'chasing-the-child';
        const nextData = LOCAL_PROJECTS[nextSlug];
        populate(project, nextData?.name || '', nextSlug);
        return;
      }
    } catch (e) {
      console.warn('[CMS] project fetch failed, using local:', e);
    }
  }

  // Local fallback
  const project = LOCAL_PROJECTS[id] || LOCAL_PROJECTS['chasing-the-child'];
  const next    = LOCAL_PROJECTS[project.next] || LOCAL_PROJECTS['chasing-the-child'];
  populate(project, next.name, project.next);
})();
