#!/bin/bash
# First-time SSL bootstrap for redstonedev.online
# Run ONCE on the VPS, then use docker-compose.prod.yml for all future starts.
set -e

DOMAIN="redstonedev.online"
EMAIL="semion@redstonedev.online"
COMPOSE="docker-compose -f docker-compose.yml -f docker-compose.prod.yml"

echo "==> [1/5] Creating temporary self-signed certificate so nginx can start..."
$COMPOSE run --rm --entrypoint \
  "sh -c 'mkdir -p /etc/letsencrypt/live/$DOMAIN && \
    openssl req -x509 -nodes -newkey rsa:2048 \
      -keyout /etc/letsencrypt/live/$DOMAIN/privkey.pem \
      -out /etc/letsencrypt/live/$DOMAIN/fullchain.pem \
      -days 1 -subj /CN=localhost'" \
  certbot

echo "==> [2/5] Starting nginx with temporary certificate..."
$COMPOSE up -d server client
sleep 3

echo "==> [3/5] Removing temporary certificate..."
$COMPOSE run --rm --entrypoint \
  "sh -c 'rm -rf /etc/letsencrypt/live/$DOMAIN \
    /etc/letsencrypt/archive/$DOMAIN \
    /etc/letsencrypt/renewal/$DOMAIN.conf'" \
  certbot

echo "==> [4/5] Obtaining Let's Encrypt certificate for $DOMAIN and www.$DOMAIN..."
$COMPOSE run --rm --entrypoint \
  "certbot certonly --webroot -w /var/www/certbot \
    --email $EMAIL \
    -d $DOMAIN -d www.$DOMAIN \
    --agree-tos --no-eff-email --force-renewal" \
  certbot

echo "==> [5/5] Reloading nginx and starting cert renewal daemon..."
$COMPOSE exec client nginx -s reload
$COMPOSE up -d certbot

echo ""
echo "Done! https://$DOMAIN is live."
echo "Certbot will auto-renew every 12 hours when needed."
