# Проект e-commerce платформы

## Разворачивание проекта для локальной разработки

### Общие шаги
1. Склонировать все репозитории
2. Запустить docker окружение через docker-compose
3. Установить зависимости
4. Выполнить миграции

### 1 Клонирование репозиториев
- Склонировать git@github.com:AlexVasechkin/e-commerce_root.git
- Перейти в папку с проектом
- Склонировать репозиторий с бэкэндом: перейти в папку shop_back и выполнить git clone git@github.com:AlexVasechkin/e-commerce_back.git, переименовать папку e-commerse_back -> app
- Склонировать репозиторий с фронтом админки: перейти обратно в корень проекта git@github.com:AlexVasechkin/e-commerce_cp-react.git, переименовать папку e-commerce_cp-react -> cp-react
- Склонировать репозиторий с исходником шаблона админ панели: git@github.com:AlexVasechkin/e-commerce_admin-template.git, можно переименовать как угодно.

### 2 Запуск окружения docker-compose
Перейти в папку с проект.
В первый раз сбилдить и запустить
```sh
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

В последующие разы можно запускать без опции --build:
```sh
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

Для упрощения запуска в корне лежит исполняемый файл up.sh:
```sh
./up.sh
```

### 3 Установка зависимостей
#### 3.1 Зависимости backend приложения
Backend приложение является php приложением версии 7.4 на фреймворке symfony версии 5.4.
Установку composer зависимостей необходимо выполнить изнутри docker контейнера. Файлы проекта копируются из /shop_back/app в /app/code контейнера shop_back.
- После запуска контейнеров, см. п. 2, необходимо зайти в bash контейнера shop_back:
```sh
docker ps
```
Вывод покажет что-то наподобие:
| CONTAINER ID | IMAGE | COMMAND | CREATED | STATUS | PORTS | NAMES |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| 28f46835032d | nginx:alpine | "/docker-entrypoint.…" | 4 weeks ago | Up About an hour | 80/tcp, 0.0.0.0:6080->6080/tcp | shop-shop_proxy-1 | 
| 05a6d8c24be4 | webdevops/php-dev:7.4-alpine | "/entrypoint supervi…" | 4 weeks ago | Up About an hour | 9000/tcp, 0.0.0.0:9003->9003/tcp | shop-shop_back-1 |
| 2e4177f7c03e | postgres:13 | "docker-entrypoint.s…" | 4 weeks ago | Up About an hour | 0.0.0.0:5432->5432/tcp | shop-shop_db-1 |

Чтобы подключиться к bash конейтейнера копируем контейнера CONTAINER ID для shop-shop_back-1 (webdevops/php-dev:7.4-alpine) и выполняем команду подяставляя в качестве аргумента:
```sh
docker exec -it 05a6d8c24be4 /bin/bash
```

Далее необходимо перейти в /app/code и выполнить:
```sh
composer install
```

#### 3.2 Зависимости frontend приложения
Зависимости фронта устанавливаются их хост системы командой
```sh
npm install
```

### 4 Выполнение миграций
Выполнить миграции необходимо, чтобы создалась база данных и необходимые таблицы
Необходимо зайти в контейнер shop_back:
```sh
docker exec -it {container id} /bin/bash
```

выполнить несколько комманд внутри контейнера:
```sh
cd /app/code
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```

После этого back начнет обрабатывать запросы по адресу http://127.0.0.1:6080
