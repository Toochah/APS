@echo off
echo Подготовка к деплою проекта в репозиторий Toochah/APS
echo.

REM Проверка наличия Git
git --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Git не найден. Пожалуйста, установите Git.
    pause
    exit /b 1
)

REM Проверка наличия GitHub CLI
gh --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo GitHub CLI не найден. Пожалуйста, установите GitHub CLI или используйте Git напрямую.
    echo См. инструкции в файле GITHUB_PUSH_INSTRUCTIONS.md
    pause
    exit /b 1
)

echo.
echo Шаг 1: Аутентификация в GitHub
gh auth login

echo.
echo Шаг 2: Клонирование репозитория Toochah/APS
gh repo clone Toochah/APS

echo.
echo Шаг 3: Копирование файлов проекта в репозиторий
xcopy "*.html" APS /Y
xcopy "*.json" APS /Y
xcopy "*.js" APS /Y
xcopy "*.md" APS /Y
xcopy "assets" "APS\assets" /E /Y
xcopy "styles" "APS\styles" /E /Y
xcopy "scripts" "APS\scripts" /E /Y
xcopy "server.js" "APS\server.js" /Y
xcopy ".gitignore" "APS\.gitignore" /Y

echo.
echo Шаг 4: Переход в папку репозитория и настройка Git
cd APS

echo.
echo Шаг 5: Добавление файлов в Git
git add .

echo.
echo Шаг 6: Коммит изменений
git commit -m "Добавлено PWA приложение для осмотра пожарной безопасности"

echo.
echo Шаг 7: Отправка изменений в репозиторий
git push origin main

echo.
echo Деплой завершен! Проверьте репозиторий Toochah/APS на GitHub.
echo Для дополнительной информации см. файл GITHUB_PUSH_INSTRUCTIONS.md
echo.
pause