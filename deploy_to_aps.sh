#!/bin/bash

echo "Подготовка к деплою проекта в репозиторий Toochah/APS"
echo

# Проверка наличия Git
if ! command -v git &> /dev/null
then
    echo "Git не найден. Пожалуйста, установите Git."
    exit 1
fi

# Проверка наличия GitHub CLI
if ! command -v gh &> /dev/null
then
    echo "GitHub CLI не найден. Пожалуйста, установите GitHub CLI или используйте Git напрямую."
    echo "См. инструкции в файле GITHUB_PUSH_INSTRUCTIONS.md"
    exit 1
fi

echo
echo "Шаг 1: Аутентификация в GitHub"
gh auth login

echo
echo "Шаг 2: Клонирование репозитория Toochah/APS"
gh repo clone Toochah/APS

echo
echo "Шаг 3: Копирование файлов проекта в репозиторий"
cp -f *.html APS/
cp -f *.json APS/
cp -f *.js APS/  # кроме server.js, который будет скопирован отдельно
cp -f *.md APS/
cp -rf assets APS/
cp -rf styles APS/
cp -rf scripts APS/
cp -f server.js APS/server.js
cp -f .gitignore APS/.gitignore

echo
echo "Шаг 4: Переход в папку репозитория и настройка Git"
cd APS

echo
echo "Шаг 5: Добавление файлов в Git"
git add .

echo
echo "Шаг 6: Коммит изменений"
git commit -m "Добавлено PWA приложение для осмотра пожарной безопасности"

echo
echo "Шаг 7: Отправка изменений в репозиторий"
git push origin main

echo
echo "Деплой завершен! Проверьте репозиторий Toochah/APS на GitHub."
echo "Для дополнительной информации см. файл GITHUB_PUSH_INSTRUCTIONS.md"