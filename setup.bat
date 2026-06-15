@echo off
echo Установка и запуск PWA приложения для осмотра пожарной безопасности
echo.

REM Проверка наличия Node.js
node --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Node.js не найден. Пожалуйста, установите Node.js.
    pause
    exit /b 1
)

REM Установка зависимостей
echo Установка http-server...
npm install -g http-server >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Ошибка при установке http-server
    pause
    exit /b 1
)

REM Запуск сервера
echo.
echo Запуск сервера...
start http-server -p 8000 -o /fire_safety_inspection.html

echo.
echo Приложение запущено на http://localhost:8000/fire_safety_inspection.html
echo.
echo Нажмите любую клавишу для завершения...
pause >nul