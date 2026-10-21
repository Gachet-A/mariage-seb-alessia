# Static site served by Caddy. Railway injects $PORT at runtime.
FROM caddy:2.8-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY index.html styles.css script.js /srv/
COPY fonts /srv/fonts
COPY images /srv/images

ENV PORT=8080
EXPOSE 8080
