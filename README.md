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


## Editing content

- Dress code: `.dress-text` in `index.html`.
