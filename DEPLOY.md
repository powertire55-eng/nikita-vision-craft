# Деплой ziminikita.ru на Selectel VDS

Архитектура:

- Фронтенд: Node.js SSR-сервер (TanStack Start + Nitro preset `node-server`) в Docker на VDS, порт 3000.
- nginx: reverse proxy 80/443 → 127.0.0.1:3000, SSL от Let's Encrypt.
- Приём заявок формы: POST на публичный роут Lovable-приложения (`nikita-vision-craft.lovable.app/api/public/submit-lead`), который дальше пишет в Google Sheets и Telegram.
- Репозиторий: https://github.com/powertire55-eng/nikita-vision-craft

---

## 0. Заказ VDS

Рекомендация Selectel:

- Ubuntu 24.04 LTS
- 2 vCPU / 2 ГБ RAM / 20 ГБ NVMe (минимум для комфортной работы)
- Публичный IPv4
- Регион Москва или Санкт-Петербург
- SSH-ключ (не пароль)

После создания сервера войдите: `ssh root@<IP>`.

## 1. Базовая настройка сервера

```bash
apt update && apt upgrade -y
apt install -y ca-certificates curl gnupg lsb-release git ufw nginx certbot python3-certbot-nginx

# Docker Engine + compose plugin
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  > /etc/apt/sources.list.d/docker.list
apt update && apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Firewall
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
```

## 2. Клонирование репозитория и запуск контейнера

```bash
mkdir -p /opt && cd /opt
git clone https://github.com/powertire55-eng/nikita-vision-craft.git zimin
cd zimin

# Настройки сборки/рантайма
cp .env.example .env
# при необходимости отредактируйте VITE_LEAD_ENDPOINT

docker compose up -d --build
# Проверка
curl -I http://127.0.0.1:3000
```

При обновлении (локально на VDS):

```bash
cd /opt/zimin && git pull && docker compose up -d --build
```

> **GitHub sync:** Lovable поддерживает двустороннюю синхронизацию с GitHub. После подключения репозитория любые изменения в Lovable автоматически попадают в `main`, а `git pull` на VDS подтянет их. Если правки вносятся напрямую в GitHub, они также синхронизируются в Lovable.

## 3. nginx + SSL

```bash
cp /opt/zimin/deploy/nginx-ziminikita.conf /etc/nginx/sites-available/ziminikita.ru
ln -s /etc/nginx/sites-available/ziminikita.ru /etc/nginx/sites-enabled/ziminikita.ru
rm -f /etc/nginx/sites-enabled/default
mkdir -p /var/www/certbot
nginx -t && systemctl reload nginx
```

Выпуск сертификата (после того как DNS уже указывает на VDS, см. п. 4):

```bash
certbot --nginx -d ziminikita.ru -d www.ziminikita.ru --redirect --agree-tos -m you@example.com
systemctl status certbot.timer   # автоматическое обновление уже включено
```

## 4. Переключение DNS

В панели вашего регистратора (там, где сейчас настроены A-записи на 185.158.133.1 — Lovable):

1. Удалить или заменить A-записи `@` и `www` на IP вашего Selectel VDS.
2. TTL 300–600 секунд.
3. Убрать TXT `_lovable` (не обязательно, но чисто).
4. Проверка: `dig +short ziminikita.ru` — должен вернуть IP Selectel.

В Lovable проект остаётся опубликованным по адресу `nikita-vision-craft.lovable.app` — оттуда работает форма заявок.

## 5. Проверка после переезда

- `curl -I https://ziminikita.ru` → 200
- Открыть сайт в браузере, отправить тестовую заявку — она должна прийти в Telegram и Google Sheets.
- `https://ziminikita.ru/sitemap.xml` и `https://ziminikita.ru/robots.txt` — 200.
- `https://www.ssllabs.com/ssltest/analyze.html?d=ziminikita.ru` — рейтинг A.

## 6. Обновления

```bash
cd /opt/zimin
git pull
docker compose up -d --build
docker image prune -f
```

## 7. Резервное копирование

Стейт приложения хранится только в Google Sheets и Telegram — на самом VDS резервировать нечего, кроме `/etc/nginx/sites-available/ziminikita.ru` и `/etc/letsencrypt/`.