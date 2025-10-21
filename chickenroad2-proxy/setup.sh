#!/bin/bash

echo "🎮 ChickenRoad2 Proxy Server - Автоматическая установка"
echo "======================================================="
echo ""

# Проверка Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен!"
    echo "📥 Установите Node.js: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js версия: $(node -v)"
echo "✅ NPM версия: $(npm -v)"
echo ""

# Установка зависимостей
echo "📦 Установка зависимостей..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Зависимости установлены успешно!"
else
    echo "❌ Ошибка при установке зависимостей"
    exit 1
fi

echo ""
echo "======================================================="
echo "🎉 Установка завершена!"
echo "======================================================="
echo ""
echo "📝 Что делать дальше:"
echo ""
echo "1. Запустите proxy сервер:"
echo "   npm start"
echo ""
echo "2. Измените src/utils/apis.jsx в ChickenRoad2:"
echo "   export const baseUrlUsaWin = \"http://localhost:3001\";"
echo ""
echo "3. Перезапустите фронтенд ChickenRoad2"
echo ""
echo "💡 Подробные инструкции в README.md"
echo ""