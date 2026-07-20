# Деплой сайта ziminikita.ru на Selectel VDS (пошаговая инструкция)

## Что получится в итоге

- Сайт крутится на вашем VDS в Docker-контейнере на порту 3000.
- nginx на самом сервере принимает HTTP/HTTPS и проксирует запросы на 127.0.0.1:3000.
- SSL-сертификат от Let's Encrypt.
- Форма заявок на сайте продолжает уходить на Lovable-бэкенд: `https://nikita-vision-craft.lovable.app/api/public/submit-lead`, а оттуда в Google Sheets и Telegram.
- Репозиторий: https://github.com/powertire55-eng/nikita-vision-craft

---

## Шаг 0. Подготовьте VDS в Selectel

1. Зайдите в личный кабинет Selectel.
2. Создайте новый сервер (VDS).
3. Параметры сервера:
   - ОС: Ubuntu 24.04 LTS
   - Конфигурация: минимум 2 vCPU, 2 ГБ RAM, 20 ГБ NVMe
   - Регион: Москва или Санкт-Петербург
   - Публичный IPv4-адрес
   - Авторизация: SSH-ключ (не пароль)
4. После создания сервера запишите публичный IPv4-адрес — он придёт в письме или будет виден в карточке сервера.

---

## Шаг 1. Подключитесь к серверу по SSH

Откройте терминал на вашем компьютере и выполните команду, заменив `<IP>` на IP вашего сервера.

```bash
ssh root@<IP>
```

Пример:

```bash
ssh root@185.12.34.56
```

---

## Шаг 2. Обновите систему

Команда обновляет список пакетов.

```bash
apt update
```

Команда устанавливает доступные обновления безопасности.

```bash
apt upgrade -y
```

---

## Шаг 3. Установите базовые пакеты

Установите утилиты, которые понадобятся для Git, nginx, SSL и Docker.

```bash
apt install -y ca-certificates
```

```bash
apt install -y curl
```

```bash
apt install -y gnupg
```

```bash
apt install -y lsb-release
```

```bash
apt install -y git
```

```bash
apt install -y ufw
```

```bash
apt install -y nginx
```

```bash
apt install -y certbot
```

```bash
apt install -y python3-certbot-nginx
```

---

## Шаг 4. Установите Docker

Создайте каталог для ключей репозитория Docker.

```bash
install -m 0755 -d /etc/apt/keyrings
```

Добавьте официальный GPG-ключ Docker.

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

Установите права на файл ключа.

```bash
chmod a+r /etc/apt/keyrings/docker.gpg
```

Добавьте репозиторий Docker в список источников пакетов.

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
```

Обновите список пакетов после добавления нового репозитория.

```bash
apt update
```

Установите Docker Engine.

```bash
apt install -y docker-ce
```

Установите CLI Docker.

```bash
apt install -y docker-ce-cli
```

Установите containerd.

```bash
apt install -y containerd.io
```

Установите плагин Buildx.

```bash
apt install -y docker-buildx-plugin
```

Установите плагин Docker Compose.

```bash
apt install -y docker-compose-plugin
```

Проверьте, что Docker запущен.

```bash
systemctl status docker
```

Если Docker не запущен, включите его.

```bash
systemctl enable docker
```

```bash
systemctl start docker
```

---

## Шаг 5. Настройте фаервол

Разрешите входящие SSH-подключения.

```bash
ufw allow OpenSSH
```

Разрешите входящие HTTP и HTTPS подключения для nginx.

```bash
ufw allow 'Nginx Full'
```

Включите фаервол.

```bash
ufw --force enable
```

Проверьте статус фаервола.

```bash
ufw status
```

---

## Шаг 6. Склонируйте репозиторий на сервер

Создайте каталог для проекта.

```bash
mkdir -p /opt
```

Перейдите в этот каталог.

```bash
cd /opt
```

Склонируйте репозиторий с GitHub в папку `zimin`.

```bash
git clone https://github.com/powertire55-eng/nikita-vision-craft.git zimin
```

Перейдите в папку проекта.

```bash
cd zimin
```

---

## Шаг 7. Подготовьте переменные окружения

Скопируйте пример файла окружения.

```bash
cp .env.example .env
```

Откройте файл `.env` для редактирования.

```bash
nano .env
```

Убедитесь, что внутри такая строка:

```text
VITE_LEAD_ENDPOINT=https://nikita-vision-craft.lovable.app/api/public/submit-lead
```

Сохраните файл: `Ctrl + O`, затем `Enter`, затем выход: `Ctrl + X`.

> Этот адрес оставляет приём заявок на Lovable-бэкенде. Для него уже настроены Google Sheets и Telegram. Менять его не нужно, если вы не хотите переносить приём заявок на VDS.

---

## Шаг 8. Соберите и запустите сайт в Docker

Запустите сборку и контейнер в фоновом режиме.

```bash
docker compose up -d --build
```

Дождитесь окончания сборки. Обычно это занимает 2–5 минут.

Проверьте, что контейнер запущен.

```bash
docker ps
```

Проверьте, что приложение отвечает на локальном порту.

```bash
curl -I http://127.0.0.1:3000
```

Если всё в порядке, вы увидите `HTTP/1.1 200 OK`.

---

## Шаг 9. Настройте nginx

Скопируйте конфигурацию сайта из репозитория в каталог nginx.

```bash
cp /opt/zimin/deploy/nginx-ziminikita.conf /etc/nginx/sites-available/ziminikita.ru
```

Удалите конфигурацию сайта по умолчанию, чтобы не было конфликта.

```bash
rm -f /etc/nginx/sites-enabled/default
```

Создайте символическую ссылку на конфигурацию.

```bash
ln -s /etc/nginx/sites-available/ziminikita.ru /etc/nginx/sites-enabled/ziminikita.ru
```

Создайте каталог для проверки домена Let's Encrypt.

```bash
mkdir -p /var/www/certbot
```

Проверьте конфигурацию nginx на ошибки.

```bash
nginx -t
```

Перезапустите nginx.

```bash
systemctl reload nginx
```

Проверьте, что nginx запущен.

```bash
systemctl status nginx
```

---

## Шаг 10. Переключите DNS на VDS

Перейдите в панель управления доменом `ziminikita.ru` (там, где сейчас настроены DNS-записи Lovable).

1. Найдите A-запись для `@`.
2. Установите её значение равным IP вашего VDS.
3. Найдите A-запись для `www` (если есть).
4. Установите и её значение равным IP вашего VDS.
5. TTL установите 300 или 600 секунд.
6. Сохраните изменения.

Дождитесь обновления DNS. Проверьте это командой с вашего компьютера.

```bash
dig +short ziminikita.ru
```

Команда должна вернуть IP вашего VDS, а не старый IP Lovable.

---

## Шаг 11. Получите SSL-сертификат

После того как DNS обновился и домен указывает на VDS, выполните команду для выпуска сертификата.

```bash
certbot --nginx -d ziminikita.ru -d www.ziminikita.ru --redirect --agree-tos -m you@example.com
```

Замените `you@example.com` на ваш реальный email.

Следуйте инструкциям на экране. Обычно нужно согласиться с условиями и выбрать, делать ли редирект с HTTP на HTTPS. Рекомендуется сделать редирект.

Проверьте, что автоматическое обновление сертификата включено.

```bash
systemctl status certbot.timer
```

---

## Шаг 12. Проверьте работу сайта

Откройте сайт в браузере.

```text
https://ziminikita.ru
```

Проверьте заголовки ответа.

```bash
curl -I https://ziminikita.ru
```

Проверьте, что sitemap и robots.txt открываются.

```bash
curl -I https://ziminikita.ru/sitemap.xml
```

```bash
curl -I https://ziminikita.ru/robots.txt
```

Отправьте тестовую заявку через форму на сайте. Она должна прийти в Telegram и появиться в Google Sheets.

Проверьте SSL-рейтинг:

```text
https://www.ssllabs.com/ssltest/analyze.html?d=ziminikita.ru
```

---

## Шаг 13. Как обновлять сайт

Когда вы внесёте изменения в Lovable, они автоматически синхронизируются в репозиторий GitHub. На сервере нужно будет только подтянуть обновления и пересобрать контейнер.

Перейдите в папку проекта.

```bash
cd /opt/zimin
```

Заберите свежий код из GitHub.

```bash
git pull
```

Пересоберите и перезапустите контейнер.

```bash
docker compose up -d --build
```

Удалите старые образы Docker, чтобы не занимать место.

```bash
docker image prune -f
```

---

## Резервное копирование

Все заявки хранятся в Google Sheets, а уведомления идут в Telegram. На самом VDS нет важных данных, кроме:

- конфигурации nginx: `/etc/nginx/sites-available/ziminikita.ru`
- SSL-сертификатов: `/etc/letsencrypt/`

Если сервер сломается, достаточно повторить эту инструкцию на новом VDS. Данные заявок не пропадут.

---

## Если что-то пошло не так

- Проверьте логи Docker.

```bash
docker logs ziminikita-site
```

- Проверьте логи nginx.

```bash
journalctl -u nginx -n 50
```

- Проверьте, что контейнер запущен.

```bash
docker ps
```

- Проверьте, что приложение отвечает на порту 3000.

```bash
curl -I http://127.0.0.1:3000
```
