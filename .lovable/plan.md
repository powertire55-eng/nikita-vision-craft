# Переезд ziminikita.ru на Selectel VDS

## Итоговая архитектура

```text
Посетитель ─HTTPS──▶ nginx (VDS Selectel) ──▶ Node.js (TanStack Start SSR, порт 3000)
                         │
                         └── Let's Encrypt SSL (certbot)

Форма заявки ─CORS POST──▶ https://nikita-vision-craft.lovable.app/_serverFn/...
                          (там остаются Google Sheets + Telegram коннекторы)
```

- Сайт (SSR, картинки, видео) полностью на вашем VDS.
- Только submit заявки уходит на Lovable-бэкенд по HTTPS — вы ничего не переносите про Sheets/Telegram, ключи остаются у Lovable.
- DNS ziminikita.ru → IP Selectel. Cloudflare не используем.

## Этапы

### 1. Заказ VDS (делаете вы, я даю параметры)
Рекомендация: **Ubuntu 24.04**, 2 vCPU, 2 ГБ RAM, 20 ГБ NVMe, публичный IPv4, регион Москва/Санкт-Петербург.
После заказа: SSH-доступ по ключу (не паролю), открытые порты 22/80/443.

### 2. Изменения в коде (я делаю в репозитории)

**Сборка под Node.js вместо Cloudflare Workers.**
- В `vite.config.ts` добавить `nitro: { preset: "node-server" }` в конфиг `@lovable.dev/vite-tanstack-config` (нужно проверить, что оверрайд проходит; если нет — форк конфига).
- `src/server.ts` оставляем, но добавляем режим Node (у Cloudflare это `export default { fetch }`, у Node — HTTP-сервер на порту `PORT`).

**Форма → Lovable через CORS.**
- Публичный роут в текущем Lovable-проекте: `src/routes/api/public/submit-lead.ts` c CORS-хедерами (`Access-Control-Allow-Origin: https://ziminikita.ru`, `OPTIONS` 204). Внутри вызывает существующие `appendToSheet` и `sendTelegramMessage`.
- На новом фронте `src/routes/index.tsx` меняет `useServerFn(submitLead)` на `fetch("https://nikita-vision-craft.lovable.app/api/public/submit-lead", ...)`. URL кладём в `VITE_LEAD_ENDPOINT` для конфигурируемости.
- Опционально: простой HMAC-secret или honeypot-поле от спама (Lovable-роут публичный).

**Удалить с VDS-сборки лишнее.** Yandex Metrika/verification оставляем.

### 3. Docker

Новые файлы в репо:
- `Dockerfile` — multi-stage: `oven/bun` для build → `node:20-alpine` для рантайма, запуск `node .output/server/index.mjs`, порт 3000.
- `docker-compose.yml` — сервис `app` (build из репо, restart always, `env_file: .env`).
- `.dockerignore`, пример `.env.example` (`VITE_LEAD_ENDPOINT=...`).

### 4. VDS: развёртывание (пошаговая инструкция, выполняете вы)

Я подготовлю скрипты и README `DEPLOY.md`:
1. `apt update && apt install -y docker.io docker-compose-plugin nginx certbot python3-certbot-nginx git ufw`.
2. `ufw allow OpenSSH && ufw allow 'Nginx Full' && ufw enable`.
3. `git clone <репо> /opt/zimin && cd /opt/zimin && docker compose up -d --build`.
4. nginx-конфиг `/etc/nginx/sites-available/ziminikita.ru` — reverse proxy `127.0.0.1:3000` + gzip + cache для `/assets`.
5. `certbot --nginx -d ziminikita.ru -d www.ziminikita.ru` — авто-SSL и auto-renew.
6. Systemd-таймер или `watchtower` для обновления контейнера.

### 5. Переключение DNS
1. У регистратора удаляем A-записи Lovable (185.158.133.1).
2. Ставим A: `@` и `www` → IP Selectel, TTL 300.
3. Ждём распространение (5–60 мин), проверяем `curl -I https://ziminikita.ru`.
4. В Lovable оставляем `nikita-vision-craft.lovable.app` активным — для приёма заявок.

### 6. Проверка после переезда
- Форма шлёт заявку → приходит в Sheets и Telegram.
- Яндекс.Метрика видит визиты уже с российского IP.
- `/sitemap.xml`, `/robots.txt` отдаются 200.
- SSL-рейтинг A на ssllabs.com.

## Что нужно от вас перед стартом кода
1. Подтвердите: рвём привязку домена от Lovable и полностью управляем DNS у регистратора.
2. После заказа VDS дайте IP и подтвердите доступ по SSH (ключ вы добавите сами).
3. Согласуйте, что форма будет POST-ить cross-origin на `nikita-vision-craft.lovable.app` (URL можно сменить, если позже подключим кастомный поддомен вроде `api.ziminikita.ru` → Lovable).

## Что делаю первым шагом (после одобрения плана)
- Добавляю `src/routes/api/public/submit-lead.ts` c CORS.
- Перевожу форму на fetch по `VITE_LEAD_ENDPOINT` (с fallback на текущий `useServerFn`, чтобы ничего не сломалось до переезда).
- Готовлю `Dockerfile`, `docker-compose.yml`, `DEPLOY.md`, правлю `vite.config.ts` под node-server.

Дальше — по мере готовности VDS выполним пункты 4–6.
