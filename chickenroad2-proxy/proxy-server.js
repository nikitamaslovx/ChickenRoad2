// ============================================
// 🎮 ChickenRoad2 Proxy Server (Full Version with Detailed Logging)
// ============================================
// Установка: npm install express axios cors dotenv winston
// Запуск: node proxy-server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const DASHBOARD_PORT = 3002;

// Конфигурация модификаций (управляется через dashboard)
let config = {
  infiniteBalance: false,
  autoWin: false,
  doubleMultiplier: false,
  fakeHistory: false,
  customBalance: 1000000,
  winMultiplier: 1.0
};

// Настройки бэкенда
const BACKEND_URL = 'https://root.chiekenroads2.club';
const API_BASE = `${BACKEND_URL}/api`;
const PUBLIC_API_BASE = `${BACKEND_URL}/public/api`;
const APK_BASE = `${BACKEND_URL}/apk`;

// Создаём папку для логов
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Функция для записи в файл
function logToFile(message) {
  const timestamp = new Date().toISOString().split('T')[0];
  const logFile = path.join(logsDir, `proxy-${timestamp}.log`);
  const logMessage = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync(logFile, logMessage);
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Статистика
let stats = {
  totalRequests: 0,
  successRequests: 0,
  errorRequests: 0,
  startTime: Date.now()
};

// ============================================
// 📊 DASHBOARD ROUTES
// ============================================

// Serve dashboard HTML
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// API для получения статистики
app.get('/api/dashboard/stats', (req, res) => {
  res.json({
    ...stats,
    uptime: Date.now() - stats.startTime,
    config: config
  });
});

// API для изменения конфигурации
app.post('/api/dashboard/config', (req, res) => {
  const { key, value } = req.body;
  if (config.hasOwnProperty(key)) {
    config[key] = value;
    console.log(`✅ Config updated: ${key} = ${value}`);
    res.json({ success: true, config });
  } else {
    res.status(400).json({ error: 'Invalid config key' });
  }
});

// API для получения текущей конфигурации
app.get('/api/dashboard/config', (req, res) => {
  res.json(config);
});

// ============================================
// 🔍 ДЕТАЛЬНОЕ ЛОГИРОВАНИЕ
// ============================================

app.use((req, res, next) => {
  const start = Date.now();

  // Обновляем статистику
  stats.totalRequests++;

  // Логируем входящий запрос
  const requestLog = `
${'='.repeat(80)}
📥 REQUEST [${new Date().toISOString()}]
Method: ${req.method} ${req.path}
Query: ${JSON.stringify(req.query, null, 2)}
Body: ${JSON.stringify(req.body, null, 2)}
Headers: ${JSON.stringify(req.headers, null, 2)}`;

  console.log(requestLog);
  logToFile(requestLog);

  // Перехватываем оригинальный res.json
  const originalJson = res.json.bind(res);
  const originalSend = res.send.bind(res);

  res.json = function(data) {
    const duration = Date.now() - start;

    // Обновляем статистику по статусу
    if (res.statusCode >= 200 && res.statusCode < 300) {
      stats.successRequests++;
    } else {
      stats.errorRequests++;
    }

    // Логируем ответ
    const responseLog = `
📤 RESPONSE
Status: ${res.statusCode}
Duration: ${duration}ms
Data: ${JSON.stringify(data, null, 2)}
${'='.repeat(80)}
`;

    console.log(responseLog);
    logToFile(responseLog);

    return originalJson(data);
  };

  res.send = function(data) {
    const duration = Date.now() - start;

    if (res.statusCode >= 200 && res.statusCode < 300) {
      stats.successRequests++;
    } else {
      stats.errorRequests++;
    }

    const responseLog = `
📤 RESPONSE (non-JSON)
Status: ${res.statusCode}
Duration: ${duration}ms
${'='.repeat(80)}
`;

    console.log(responseLog);
    logToFile(responseLog);

    return originalSend(data);
  };

  next();
});

// ============================================
// 🔥 ПОДМЕНА КОНКРЕТНЫХ ЭНДПОИНТОВ
// ============================================

// 1. Подмена multiplier (увеличиваем множитель)
app.get('/api/multiplier', async (req, res) => {
  try {
    console.log('🎯 Обрабатываем multiplier...');

    const response = await axios.get(`${API_BASE}/multiplier`, {
      headers: getProxyHeaders(req),
      params: req.query
    });

    console.log('✅ Получен ответ от бэкенда для multiplier');

    const modifiedData = {
      ...response.data,
      // Можете изменить логику здесь
      multiplier: response.data.multiplier || 1,
      _modified: false // Измените на true если меняете данные
    };

    res.json(modifiedData);
  } catch (error) {
    handleError(error, res, 'multiplier');
  }
});

// 2. Подмена profile (можно изменить баланс)
app.get('/api/profile/:userId', async (req, res) => {
  try {
    console.log(`🎯 Обрабатываем profile для userId: ${req.params.userId}`);
    console.log(`⚙️ Infinite Balance: ${config.infiniteBalance}, Custom Balance: ${config.customBalance}`);

    const response = await axios.get(
      `${API_BASE}/profile/${req.params.userId}`,
      { headers: getProxyHeaders(req) }
    );

    console.log('✅ Получен ответ от бэкенда для profile');
    console.log('📊 Оригинальный баланс:', response.data.profile?.amount);

    // Применяем модификацию если включена
    if (config.infiniteBalance && response.data.profile) {
      const originalAmount = response.data.profile.amount;
      response.data.profile.amount = config.customBalance;

      console.log(`💰 Баланс изменён: ${originalAmount} → ${config.customBalance}`);
    }

    res.json(response.data);
  } catch (error) {
    handleError(error, res, 'profile');
  }
});

// 3. Подмена bet_history (можно добавить фейковые выигрыши)
app.get('/api/bet_history', async (req, res) => {
  try {
    console.log('🎯 Обрабатываем bet_history...');

    const response = await axios.get(`${API_BASE}/bet_history`, {
      headers: getProxyHeaders(req),
      params: req.query
    });

    console.log('✅ Получен ответ от бэкенда для bet_history');

    // Раскомментируйте для добавления фейковых выигрышей:
    /*
    const fakeWins = [
      {
        id: 'fake-001',
        amount: 50000,
        multiplier: 99.99,
        created_at: new Date().toISOString(),
        status: 'win'
      }
    ];

    const modifiedData = {
      ...response.data,
      data: [...fakeWins, ...(response.data.data || [])]
    };

    res.json(modifiedData);
    */

    res.json(response.data);
  } catch (error) {
    handleError(error, res, 'bet_history');
  }
});

// 4. Подмена bet (можно гарантировать выигрыш)
app.post('/api/bet', async (req, res) => {
  try {
    console.log('🎯 Обрабатываем bet...');
    console.log('Данные ставки:', JSON.stringify(req.body, null, 2));

    const response = await axios.post(`${API_BASE}/bet`, req.body, {
      headers: getProxyHeaders(req)
    });

    console.log('✅ Получен ответ от бэкенда для bet');

    // Применяем модификацию автовыигрыша если включена
    const modifiedData = config.autoWin ? {
      ...response.data,
      status: true,
      result: 'win',
      multiplier: 10.00
    } : response.data;

    res.json(modifiedData);
  } catch (error) {
    handleError(error, res, 'bet');
  }
});

// 5. Подмена cashout
app.post('/api/cashout', async (req, res) => {
  try {
    console.log('🎯 Обрабатываем cashout...');
    console.log('Данные cashout:', JSON.stringify(req.body, null, 2));

    const response = await axios.post(`${API_BASE}/cashout`, req.body, {
      headers: getProxyHeaders(req)
    });

    console.log('✅ Получен ответ от бэкенда для cashout');

    // Применяем множитель выигрыша если больше 1
    const modifiedData = {
      ...response.data,
      win_amount: (response.data.win_amount || 0) * config.winMultiplier
    };

    res.json(modifiedData);
  } catch (error) {
    handleError(error, res, 'cashout');
  }
});

// ============================================
// 🔄 ПРОКСИРОВАНИЕ ВСЕХ ОСТАЛЬНЫХ /api/* БЕЗ ИЗМЕНЕНИЙ
// ============================================

// GET /api/*
app.get('/api/*', async (req, res) => {
  try {
    const path = req.path.replace('/api', '');
    console.log(`🔄 Проксируем GET /api${path}`);

    const response = await axios.get(`${API_BASE}${path}`, {
      params: req.query,
      headers: getProxyHeaders(req)
    });

    console.log(`✅ Успешно проксирован GET /api${path}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    handleError(error, res, 'GET /api/*');
  }
});

// POST /api/*
app.post('/api/*', async (req, res) => {
  try {
    const path = req.path.replace('/api', '');
    console.log(`🔄 Проксируем POST /api${path}`);

    const response = await axios.post(`${API_BASE}${path}`, req.body, {
      headers: getProxyHeaders(req)
    });

    console.log(`✅ Успешно проксирован POST /api${path}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    handleError(error, res, 'POST /api/*');
  }
});

// PUT /api/*
app.put('/api/*', async (req, res) => {
  try {
    const path = req.path.replace('/api', '');
    console.log(`🔄 Проксируем PUT /api${path}`);

    const response = await axios.put(`${API_BASE}${path}`, req.body, {
      headers: getProxyHeaders(req)
    });

    console.log(`✅ Успешно проксирован PUT /api${path}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    handleError(error, res, 'PUT /api/*');
  }
});

// DELETE /api/*
app.delete('/api/*', async (req, res) => {
  try {
    const path = req.path.replace('/api', '');
    console.log(`🔄 Проксируем DELETE /api${path}`);

    const response = await axios.delete(`${API_BASE}${path}`, {
      headers: getProxyHeaders(req)
    });

    console.log(`✅ Успешно проксирован DELETE /api${path}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    handleError(error, res, 'DELETE /api/*');
  }
});

// ============================================
// 📱 PUBLIC API ПРОКСИРОВАНИЕ
// ============================================

app.get('/public/api/*', async (req, res) => {
  try {
    const path = req.path.replace('/public/api', '');
    console.log(`🔄 Проксируем GET /public/api${path}`);

    const response = await axios.get(`${PUBLIC_API_BASE}${path}`, {
      params: req.query,
      headers: getProxyHeaders(req)
    });

    console.log(`✅ Успешно проксирован GET /public/api${path}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    handleError(error, res, 'GET /public/api/*');
  }
});

// ============================================
// 📥 APK DOWNLOAD ПРОКСИРОВАНИЕ
// ============================================

app.get('/apk/*', async (req, res) => {
  try {
    const path = req.path.replace('/apk', '');
    console.log(`🔄 Проксируем GET /apk${path} (file download)`);

    const response = await axios.get(`${APK_BASE}${path}`, {
      responseType: 'stream',
      headers: getProxyHeaders(req)
    });

    // Копируем заголовки для скачивания файла
    Object.keys(response.headers).forEach(key => {
      res.setHeader(key, response.headers[key]);
    });

    console.log(`✅ Успешно проксирован GET /apk${path}`);
    response.data.pipe(res);
  } catch (error) {
    handleError(error, res, 'GET /apk/*');
  }
});

// ============================================
// 🛠️ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================

function getProxyHeaders(req) {
  const headers = { ...req.headers };

  // Удаляем заголовки, которые не нужно проксировать
  delete headers.host;
  delete headers.connection;
  delete headers['accept-encoding'];

  return headers;
}

function handleError(error, res, endpoint) {
  const errorLog = `
❌ ERROR in ${endpoint}
Message: ${error.message}
${error.response ? `Backend Status: ${error.response.status}` : ''}
${error.response ? `Backend Data: ${JSON.stringify(error.response.data, null, 2)}` : ''}
Stack: ${error.stack}
`;

  console.error(errorLog);
  logToFile(errorLog);

  if (error.response) {
    // Бэкенд вернул ошибку
    res.status(error.response.status).json(error.response.data);
  } else if (error.request) {
    // Запрос был отправлен, но ответа нет
    res.status(503).json({
      error: 'Backend unavailable',
      message: error.message,
      endpoint: endpoint
    });
  } else {
    // Ошибка при настройке запроса
    res.status(500).json({
      error: 'Internal proxy error',
      message: error.message,
      endpoint: endpoint
    });
  }
}

// ============================================
// 🚀 ЗАПУСК СЕРВЕРА
// ============================================

app.listen(PORT, () => {
  const startupLog = `
${'='.repeat(80)}
🎮 ChickenRoad2 Proxy Server Started
${'='.repeat(80)}
📡 Proxy URL: http://localhost:${PORT}
🌐 Dashboard: http://localhost:${PORT}/dashboard
🔗 Backend: ${BACKEND_URL}
📁 Logs Directory: ${logsDir}
${'='.repeat(80)}

✅ Готов к работе!
💡 Откройте http://localhost:${PORT}/dashboard для управления
💡 Все запросы и ответы логируются в консоль и в папку logs/
💡 Измените baseUrlUsaWin во фронтенде на http://localhost:${PORT}

`;

  console.log(startupLog);
  logToFile(startupLog);
});