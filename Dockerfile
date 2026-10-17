# Static site served by Caddy. Railway injects $PORT at runtime.
FROM caddy:2.8-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY index.html choix.html styles.css script.js /srv/
COPY fonts /srv/fonts
COPY images /srv/images
