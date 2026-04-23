# Dario Explore — Sanity Studio

## First-time setup (5 minutes)

### 1. Create a Sanity account & project
Go to https://sanity.io and sign in (free tier is fine).

### 2. Install dependencies
```bash
cd studio
npm install
```

### 3. Log in and link a project
```bash
npx sanity login
npx sanity init --env
```
When prompted, choose **"Create new project"**, name it **Dario Explore**, and use the **production** dataset.
This writes your Project ID to a `.env` file automatically.

### 4. Paste your Project ID in two places

**`studio/sanity.config.js`** — replace `YOUR_PROJECT_ID`:
```js
projectId: 'abc123xyz',
```

**`js/sanity.js`** — same value, plus set `enabled: true`:
```js
projectId: 'abc123xyz',
enabled:   true,
```

### 5. Allow your site's origin in Sanity CORS settings
Go to https://sanity.io/manage → your project → **API** → **CORS Origins**
Add `http://localhost:8765` (and your production URL later).

### 6. Start the Studio
```bash
npm run dev
```
Studio opens at **http://localhost:3333** — add your content there.

### 7. Start the website (separate terminal)
```bash
cd ..
python3 -m http.server 8765
```
Open **http://localhost:8765** — content now loads from Sanity.

---

## What's editable in Sanity

| Document type  | What it controls |
|----------------|-----------------|
| **Site Settings** | Hero headline & sub, clients marquee, about text & stats, contact email & availability |
| **Project** | All 6 work cards + full case study pages (title, images, story, how it was made, result) |
| **Service** | The 4 service rows — title, description, tags |
| **Testimonial** | The 3 quote cards |
| **Journal Post** | Blog cards — title, excerpt, category, cover image, full body |

## Deploying the Studio

To host the Studio at a public URL (so you can edit content from anywhere):
```bash
npm run deploy
```
Sanity hosts it for free at `https://your-project.sanity.studio`.

## Querying content (GROQ cheatsheet)

Test any query live in the Studio under **Vision** (the magnifying glass icon).

```groq
// All projects in order
*[_type == "project"] | order(order asc) { title, location }

// Single project by slug
*[_type == "project" && slug.current == "wabi"][0]

// Latest 3 journal posts
*[_type == "journalPost"] | order(date desc) [0..2] { title, date }

// Site settings
*[_type == "siteSettings"][0]
```
