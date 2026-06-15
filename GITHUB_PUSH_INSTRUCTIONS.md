# Инструкции по деплою в репозиторий Toochah/APS

Для деплоя проекта в репозиторий https://github.com/Toochah/APS выполните следующие шаги:

## Подготовка к деплою

1. Убедитесь, что у вас есть права на запись в репозиторий Toochah/APS
2. Установите Git на ваш компьютер, если ещё не установлен
3. Установите GitHub CLI (рекомендуется) или используйте SSH-ключи для аутентификации

## Метод 1: Использование GitHub CLI

1. Откройте терминал или командную строку
2. Войдите в GitHub CLI:
   ```bash
   gh auth login
   ```
3. Клонируйте репозиторий Toochah/APS:
   ```bash
   gh repo clone Toochah/APS
   ```
4. Перейдите в папку репозитория:
   ```bash
   cd APS
   ```
5. Скопируйте все файлы из текущего проекта в репозиторий:
   ```bash
   # из папки с проектом пожарной безопасности
   cp -r ./fire_safety_inspection.html ./manifest.json ./sw.js ./google_apps_script.gs ./assets ./styles ./scripts ./server.js ./package.json ./README.md ./SETUP_GUIDE.md ./DEPLOYMENT.md ./TESTING.md ./QUICK_START.md ./GITHUB_DEPLOY.md ./GITHUB_SETUP.md ./GITHUB_PUSH_INSTRUCTIONS.md .\APS\
   ```
6. Добавьте файлы в Git:
   ```bash
   git add .
   ```
7. Закоммитьте изменения:
   ```bash
   git commit -m "Добавлено PWA приложение для осмотра пожарной безопасности"
   ```
8. Загрузите изменения:
   ```bash
   git push origin main
   ```

## Метод 2: Использование Git напрямую

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/Toochah/APS.git
   cd APS
   ```
2. Скопируйте файлы проекта в папку репозитория (как в шаге 5 метода 1)
3. Выполните шаги 6-8 из Метода 1

## Метод 3: Через веб-интерфейс GitHub

1. Перейдите на https://github.com/Toochah/APS
2. Нажмите "Clone or download" и затем "Open in GitHub Desktop" (если установлен GitHub Desktop)
3. Или нажмите "Upload files" и загрузите каждый файл по отдельности:
   - fire_safety_inspection.html
   - manifest.json
   - sw.js
   - google_apps_script.gs
   - Все файлы из папок assets, styles, scripts
   - Все файлы README.md, SETUP_GUIDE.md, DEPLOYMENT.md, TESTING.md, QUICK_START.md, GITHUB_DEPLOY.md, GITHUB_SETUP.md, GITHUB_PUSH_INSTRUCTIONS.md
4. Закоммитьте изменения с сообщением "Добавлено PWA приложение для осмотра пожарной безопасности"

## Дополнительные настройки после деплоя

После деплоя в репозиторий, вы можете настроить GitHub Pages:

1. Перейдите на страницу репозитория Toochah/APS
2. Нажмите "Settings"
3. Прокрутите до "Pages"
4. В разделе "Source" выберите "Deploy from a branch"
5. Выберите "main" и "/ (root)" в качестве источника
6. Нажмите "Save"

Приложение будет доступно по адресу: https://toochah.github.io/APS/fire_safety_inspection.html

## Важные замечания

- Убедитесь, что вы не перезапишете важные файлы в целевом репозитории
- При необходимости создайте отдельную ветку для интеграции
- Возможно, потребуется адаптировать структуру проекта под структуру целевого репозитория
- Обратите внимание на лицензию в файле LICENSE и убедитесь, что она совместима с лицензией целевого репозитория

## Настройка Google Apps Script

Для полноценной работы приложения также потребуется:

1. Заменить placeholder в файле `fire_safety_inspection.html`:
   - YOUR_SCRIPT_ID на ID вашего скрипта Google Apps Script
   - YOUR_SHEET_ID на ID вашей таблицы Google Sheets
2. Развернуть Google Apps Script с содержимым файла `google_apps_script.gs`