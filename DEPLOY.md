# Deploy — realmedia.ink

Source of truth is this repo. Every push to `main` builds on GitHub Actions and
ships to the production server. The server never builds; it only runs the SSR
bundle with bun.

## Topology

```
GitHub main ──push──▶ Actions (build) ──rsync──▶ 5.45.65.7 (aaPanel)
                                                   ├─ nginx (realmedia.ink)
                                                   │    /assets/  → dist/client/assets
                                                   │    /         → 127.0.0.1:3000
                                                   └─ systemd realmedia.service
                                                        bun run dist/server/server.js
```

- Web root: `/www/wwwroot/realmedia.ink`
- App: bun SSR on `127.0.0.1:3000`, unit `realmedia.service`
- Runtime needs `dist/` **and** `node_modules/` (server bundle keeps deps external)

## Workflow

`.github/workflows/deploy.yml` on push to `main`:

1. `npm ci`
2. `npm run build` (with `SITE_URL` / `VITE_SITE_URL`)
3. `npm prune --omit=dev` → production-only `node_modules`
4. rsync `dist/` + `node_modules/` to the server (`--delete`)
5. `sudo systemctl restart realmedia.service`
6. smoke check `https://realmedia.ink/` returns 200

## Required GitHub secrets

| Secret | Value |
|--------|-------|
| `DEPLOY_SSH_KEY` | private half of the deploy keypair (ed25519) |
| `DEPLOY_HOST` | `5.45.65.7` |
| `DEPLOY_USER` | `deploy` |
| `DEPLOY_PATH` | `/www/wwwroot/realmedia.ink` |
| `DEPLOY_PORT` | `22` |
| `SITE_URL` | `https://realmedia.ink` |

## One-time server setup (run as root)

```bash
# 1. Deploy user + key
adduser --disabled-password --gecos "" deploy
install -d -m 700 -o deploy -g deploy /home/deploy/.ssh
echo "PASTE_DEPLOY_PUBLIC_KEY_HERE" >> /home/deploy/.ssh/authorized_keys
chmod 600 /home/deploy/.ssh/authorized_keys
chown deploy:deploy /home/deploy/.ssh/authorized_keys

# 2. Let deploy write the web root (files stay readable by the www app user)
usermod -aG www deploy
chown -R www:www /www/wwwroot/realmedia.ink
chmod -R g+rwX /www/wwwroot/realmedia.ink
find /www/wwwroot/realmedia.ink -type d -exec chmod g+s {} \;

# 3. Allow only the service restart via sudo, nothing else
echo 'deploy ALL=(root) NOPASSWD: /usr/bin/systemctl restart realmedia.service, /usr/bin/systemctl is-active realmedia.service' \
  > /etc/sudoers.d/deploy-realmedia
chmod 440 /etc/sudoers.d/deploy-realmedia
visudo -cf /etc/sudoers.d/deploy-realmedia
```

## Runtime env (systemd)

`SITE_URL` is read at runtime for the sitemap. Add it to the unit once:

```bash
systemctl edit realmedia.service
# in the override:
# [Service]
# Environment=SITE_URL=https://realmedia.ink
systemctl daemon-reload && systemctl restart realmedia.service
```

`PAYLOAD_URL` stays unset → the site uses the static content fallback.
Set it only when the Payload CMS is deployed.

## Manual deploy / rollback

Trigger from the Actions tab (`workflow_dispatch`) or re-run a previous green
run. The server keeps the last synced `dist/`; a bad deploy is fixed by
re-running the last good workflow run.
