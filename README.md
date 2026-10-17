# Mariage Alessia & Sébastien

Static wedding site (29 & 30 May 2027, Hôtel Schloss Hünigen). Redesign of https://spar-20260921.odoo.com/ with the same text and images.

## Setup: RSVP form (one step)

The form sends each reply by email through [Web3Forms](https://web3forms.com) (free).

1. On web3forms.com, enter `alessia-sebastien@protonmail.com` to receive an access key.
2. Paste it in `script.js`, line 2: `const WEB3FORMS_ACCESS_KEY = "…";`

Until then, submitting shows an error inviting guests to write to that address directly.

## Preview locally

```sh
python -m http.server 5173
# then open http://localhost:5173
```

## Deploy on Railway

The repo includes a `Dockerfile` (Caddy static server, listens on Railway's `$PORT`), so Railway builds it with no configuration:

1. Push this folder to a GitHub repo.
2. Railway → New Project → Deploy from GitHub repo → pick the repo.
3. Service → Settings → Networking → **Generate Domain** (or add a custom domain).

Every push to the main branch redeploys.

## Two colour versions

- `/`: light version (original site's colours)
- `/vert`: same page, sandstone + fir green palette (`?theme=vert` also works, e.g. locally)
- `/choix`: both side by side, to compare and pick

Once you've decided, to keep only the green one as the home page: in `index.html`, replace the theme test with `d.dataset.theme = 'vert';`. To keep only the light one, delete the `data-theme="vert"` block at the end of `styles.css`. `choix.html` can be deleted either way.

Any other static host also works (Netlify, GitHub Pages, Infomaniak…): upload `index.html`, `styles.css`, `script.js`, `fonts/`, `images/`.

## Editing content

- Last-minute announcements: the `#annonces` section at the bottom of `index.html`.
- Dress code: `.dress-text` in `index.html` (still the original placeholder "Nous vous invitons à porter...").
