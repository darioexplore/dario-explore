/* =========================================================
   Dario Explore — Sanity client
   ─────────────────────────────────────────────────────────
   1. Create a project at sanity.io
   2. Run `cd studio && npm install && npx sanity init --env`
   3. Paste your projectId below and set useSanity = true
   ========================================================= */

export const sanityConfig = {
  projectId:  's3n92mah',
  dataset:    'production',
  apiVersion: '2024-01-01',
  useCdn:     true,
  enabled:    true,
};

/**
 * Execute a GROQ query against the Sanity CDN
 * @param {string} groq  GROQ query string
 * @param {Object} params  Named parameters ($slug etc.)
 */
export async function fetchSanity(groq, params = {}) {
  const { projectId, dataset, apiVersion, useCdn } = sanityConfig;

  const base = useCdn
    ? `https://${projectId}.apicdn.sanity.io`
    : `https://${projectId}.api.sanity.io`;

  const url = new URL(`${base}/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set('query', groq);
  Object.entries(params).forEach(([k, v]) =>
    url.searchParams.set(`$${k}`, JSON.stringify(v))
  );

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Sanity ${res.status}: ${await res.text()}`);
  const { result } = await res.json();
  return result;
}

/**
 * Build a Sanity image URL from an asset reference
 * @param {string|Object} ref  asset._ref string or image object
 * @param {Object} opts  { w, h, fit, q }
 */
export function imageUrl(ref, opts = {}) {
  const { projectId, dataset } = sanityConfig;
  const rawRef = typeof ref === 'string' ? ref : ref?.asset?._ref;
  if (!rawRef) return '';

  // ref format: image-{id}-{WxH}-{format}
  const parts   = rawRef.replace('image-', '').split('-');
  const format  = parts.pop();
  const dims    = parts.pop();            // e.g. "1920x1080"
  const id      = parts.join('-');

  const { w = 1200, h, fit = 'max', q = 80 } = opts;
  let url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dims}.${format}?w=${w}&q=${q}&auto=format&fit=${fit}`;
  if (h) url += `&h=${h}`;
  return url;
}
