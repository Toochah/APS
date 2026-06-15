# Деплой проекта на GitHub

## Создание репозитория

1. Перейдите на [GitHub](https://github.com)
2. Нажмите кнопку "New repository"
3. Введите имя репозитория (например, `fire-safety-inspection-pwa`)
4. Добавьте описание: "PWA приложение для фиксации осмотров систем пожаротушения и пожарной сигнализации"
5. Выберите "Public" или "Private" в зависимости от ваших предпочтений
6. Не ставьте галочку "Initialize this repository with a README" (мы уже имеем README)
7. Нажмите "Create repository"

## Загрузка проекта

Если вы используете Git локально:

1. Откройте терминал или командную строку
2. Перейдите в директорию проекта
3. Выполните команды:

```bash
git init
git add .
git commit -m "Initial commit: Fire safety inspection PWA application"
git remote add origin https://github.com/ВАШ_ЛОГИН/fire-safety-inspection-pwa.git
git branch -M main
git push -u origin main
```

## Альтернативный способ через GitHub Desktop

1. Установите GitHub Desktop
2. Выберите "Add an Existing Repository from your Hard Drive..."
3. Найдите папку с проектом
4. Нажмите "Publish repository"
5. Укажите имя репозитория и настройки
6. Нажмите "Publish"

## Настройка GitHub Pages

1. После загрузки файлов на GitHub, перейдите в настройки репозитория
2. Найдите раздел "Pages" в левой колонке
3. В блоке "Source" выберите:
   - Branch: `main`
   - Folder: `/ (root)`
4. Нажмите "Save"

Ваше приложение будет доступно по адресу: `https://ВАШ_ЛОГИН.github.io/fire-safety-inspection-pwa/`

## Настройка Google Apps Script

Для полноценной работы приложения с Google Sheets:

1. Создайте новый проект в [Google Apps Script](https://script.google.com/)
2. Замените код в файле Code.gs на содержимое файла [google_apps_script.gs](./google_apps_script.gs) из проекта
3. Замените `YOUR_SHEET_ID_HERE` на ID вашей таблицы Google Sheets
4. Опубликуйте проект как веб-приложение:
   - Нажмите "Deploy" > "New Deployment"
   - Выберите "Web application"
   - В "Execute as" выберите "Me"
   - В "Who has access" выберите "Anyone"
   - Нажмите "Deploy"
5. Скопируйте URL развернутого приложения
6. Замените `YOUR_SCRIPT_ID` в файле [fire_safety_inspection.html](./fire_safety_inspection.html) на ID вашего скрипта (часть URL между `/d/` и `/exec`)
7. Замените `YOUR_SHEET_ID` в том же файле на ID вашей Google таблицы

## Тестирование приложения

После деплоя вы можете протестировать приложение:

1. Откройте `https://ВАШ_ЛОГИН.github.io/fire-safety-inspection-pwa/fire_safety_inspection.html`
2. Проверьте все функции приложения:
   - Работу формы осмотра
   - Выбор систем и приоритетов
   - Загрузку фото
   - Переход между страницами
   - Отображение дашборда

## Установка PWA

Пользователи смогут установить приложение как PWA через меню браузера:

1. Откройте приложение в Chrome или другом поддерживающем браузере
2. В адресной строке появится значок "Установить"
3. Нажмите на него и подтвердите установку

## Обслуживание и обновления

Чтобы обновить приложение:

1. Внесите изменения в локальной копии
2. Закоммитьте изменения:
   ```bash
   git add .
   git commit -m "Описание изменений"
   git push origin main
   ```
3. Изменения автоматически отобразятся на GitHub Pages в течение нескольких минут