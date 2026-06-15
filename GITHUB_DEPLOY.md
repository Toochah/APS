# Деплой на GitHub Pages

## Подготовка репозитория

1. Создайте новый репозиторий на GitHub или используйте существующий
2. Убедитесь, что в репозитории есть все необходимые файлы:
   - [fire_safety_inspection.html](./fire_safety_inspection.html)
   - [manifest.json](./manifest.json)
   - [sw.js](./sw.js)
   - [assets/](./assets/) - папка с иконками
   - [styles/](./styles/) - папка со стилями
   - [scripts/](./scripts/) - папка со скриптами
   - остальные файлы проекта

## Включение GitHub Pages

1. Перейдите в репозиторий на GitHub
2. Кликните "Settings"
3. Прокрутите вниз до раздела "Pages"
4. В блоке "Source" выберите:
   - Branch: `main` (или `master`)
   - Folder: `/ (root)` или `/docs` (если вы размещаете файлы в папке docs)
5. Нажмите "Save"

## Альтернативный способ через gh-pages

1. Установите пакет gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Добавьте в package.json:
   ```json
   {
     "homepage": "https://yourusername.github.io/repository-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. Запустите деплой:
   ```bash
   npm run deploy
   ```

## Настройка Google Apps Script

Для работы приложения с Google Sheets, вам нужно:

1. Заменить `YOUR_SCRIPT_ID` в файле [fire_safety_inspection.html](./fire_safety_inspection.html) на ID вашего Google Apps Script
2. Заменить `YOUR_SHEET_ID` в файле [fire_safety_inspection.html](./fire_safety_inspection.html) на ID вашей Google таблицы
3. Обратите внимание, что GitHub Pages предоставляет только статическую хостинг, поэтому Google Apps Script будет обрабатывать все взаимодействия с Google Sheets

## Проверка деплоя

После активации GitHub Pages:

1. Через несколько минут (обычно 1-10) ваш сайт будет доступен по адресу:
   `https://yourusername.github.io/repository-name/`
   
2. Проверьте, что все функции приложения работают корректно:
   - Загрузка страницы
   - Работа Service Worker
   - Возможность установки PWA
   - Функции формы осмотра
   - Сохранение данных

## Настройка кастомного домена (опционально)

1. В настройках репозитория, в разделе Pages, добавьте Custom Domain
2. В DNS вашего домена добавьте записи:
   - A-записи: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Или CNAME: `yourusername.github.io`

## Устранение проблем

### Service Worker не регистрируется
GitHub Pages использует HTTPS автоматически, но если Service Worker не регистрируется:
- Убедитесь, что файл [sw.js](./sw.js) доступен по прямой ссылке
- Проверьте консоль браузера на наличие ошибок

### Не работают API запросы к Google Apps Script
- Проверьте, что URL в коде корректны
- Убедитесь, что Google Apps Script развернут как веб-приложение с доступом "Любой пользователь"
- Проверьте, что нет ошибок CORS

### Не отображаются стили или скрипты
- Убедитесь, что пути к файлам указаны правильно (относительно корня сайта)
- Проверьте, что файлы действительно находятся в репозитории