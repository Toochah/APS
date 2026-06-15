#!/bin/bash

echo "Установка и запуск PWA приложения для осмотра пожарной безопасности"
echo

# Проверка наличия Node.js
if ! command -v node &> /dev/null
then
    echo "Node.js не найден. Пожалуйста, установите Node.js."
    exit 1
fi

# Установка зависимостей
echo "Установка http-server..."
npm install -g http-server >/dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "Ошибка при установке http-server"
    exit 1
fi

# Запуск сервера и открытие браузера
echo
echo "Запуск сервера..."
http-server -p 8000 -o /fire_safety_inspection.html &

echo
echo "Приложение запущено на http://localhost:8000/fire_safety_inspection.html"
echo "Для остановки сервера используйте: Ctrl+C"