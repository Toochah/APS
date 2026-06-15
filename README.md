# Осмотр Пожарной Безопасности

PWA-приложение для фиксации осмотров систем пожаротушения и пожарной сигнализации, а также отметки о выполнении восстановительных работ с использованием Google Sheets.

## Особенности

- Progressive Web App с возможностью установки на устройства
- Автономная работа с синхронизацией данных при наличии интернета
- Интеграция с Google Sheets для хранения и анализа данных
- Возможность добавления фотографий к записям об осмотрах
- Интерактивная визуализация данных
- Отслеживание статуса выполнения восстановительных работ

## Структура проекта

- [fire_safety_inspection.html](./fire_safety_inspection.html) - Главная страница приложения с формами осмотра
- [manifest.json](./manifest.json) - Конфигурационный файл PWA
- [sw.js](./sw.js) - Service Worker для автономной работы
- [google_apps_script.gs](./google_apps_script.gs) - Код серверной части для интеграции с Google Sheets
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Руководство по настройке приложения
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Руководство по деплою приложения
- [TESTING.md](./TESTING.md) - Инструкции по тестированию
- [QUICK_START.md](./QUICK_START.md) - Быстрый старт с приложением
- [GITHUB_DEPLOY.md](./GITHUB_DEPLOY.md) - Деплой на GitHub Pages
- [GITHUB_SETUP.md](./GITHUB_SETUP.md) - Настройка проекта на GitHub
- [GITHUB_PUSH_INSTRUCTIONS.md](./GITHUB_PUSH_INSTRUCTIONS.md) - Инструкции по деплою в репозиторий Toochah/APS

## Деплой в репозиторий Toochah/APS

Для деплоя проекта в репозиторий https://github.com/Toochah/APS следуйте инструкциям в файле [GITHUB_PUSH_INSTRUCTIONS.md](./GITHUB_PUSH_INSTRUCTIONS.md).

## Локальное тестирование

### Автоматическая установка (Windows):

Запустите файл `setup.bat` для автоматической настройки и запуска приложения.

### Ручная установка:

1. Убедитесь, что у вас установлен Node.js
2. Запустите локальный сервер:
   ```bash
   node server.js
   ```
3. Откройте в браузере: http://localhost:3000/fire_safety_inspection.html

### Альтернативный способ:

Если у вас установлен http-server:
```bash
npx http-server -p 8000
```

Затем откройте: http://localhost:8000/fire_safety_inspection.html

## Установка и настройка

Подробную информацию по настройке см. в файле [SETUP_GUIDE.md](./SETUP_GUIDE.md).

## Деплой на GitHub Pages

Для размещения приложения на GitHub Pages см. инструкции в [GITHUB_DEPLOY.md](./GITHUB_DEPLOY.md).

## Использование

1. Откройте `fire_safety_inspection.html` в браузере
2. Установите PWA через меню браузера
3. Заполняйте формы во время осмотра систем пожарной безопасности
4. Отслеживайте статус выполнения работ на вкладке "Ремонт"
5. Анализируйте данные на дашборде

## Тестирование функций

Для проверки всех функций приложения см. файл [TESTING.md](./TESTING.md).

## Лицензия

MIT