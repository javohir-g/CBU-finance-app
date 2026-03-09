# CBU Finance App

<div align="center">

![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)
![Telegram](https://img.shields.io/badge/Telegram-Mini_App-2AABEE?logo=telegram)
![License](https://img.shields.io/badge/license-MIT-green)

**Финтех Telegram Mini App для управления личными финансами**

[🚀 Открыть в Telegram](#) · [📡 Backend API](https://cbu-finance-backend.onrender.com/docs) · [🌐 Frontend](https://cbu-finance-frontend.onrender.com)

</div>

---

## 📱 О проекте

**CBU Finance** — это Telegram Mini App для управления банковскими картами, транзакциями и сбережениями. Пользователь входит через Telegram без логина и пароля — безопасная авторизация через `initData`.

### ✨ Возможности

| Функция | Описание |
|---------|----------|
| 🔐 **Telegram Auth** | Авторизация через `initData` с серверной проверкой HMAC-SHA256 |
| 💳 **Карты** | Добавление, управление, блокировка банковских карт |
| 💸 **Транзакции** | История с фильтрами по категориям и датам |
| 📊 **Статистика** | Графики доходов и расходов |
| 🎯 **Сбережения** | Финансовые цели с прогресс-баром |
| 💱 **Конвертация** | Курсы валют в реальном времени |
| 🌐 **2 языка** | Русский и Узбекский |
| 🌙 **2 темы** | Тёмная и светлая, синхронизируются с Telegram |

---

## 🏗 Стек технологий

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **React Router 7** — маршрутизация
- **Framer Motion** — анимации
- **Tailwind CSS 4** — стилизация
- **Tabler Icons** — иконки
- **Recharts** — графики

### Backend
- **FastAPI** (Python) — REST API
- **SQLAlchemy** — ORM
- **SQLite** — база данных
- **JWT** — сессии после Telegram авторизации
- **HMAC-SHA256** — верификация Telegram `initData`

### Деплой
- **Render.com** — хостинг backend + frontend
- **Telegram Bot API** — Mini App интеграция

---

## 🔐 Авторизация

Приложение использует стандартный flow Telegram Mini Apps:

```
Telegram → initDataRaw → POST /api/auth/telegram
          (Authorization: tma <initDataRaw>)
                ↓
          Сервер проверяет HMAC-SHA256
          + проверяет срок auth_date (1 час)
                ↓
          Выдаёт свой JWT токен
                ↓
          Все API запросы через Bearer JWT
```

---

## 🚀 Локальный запуск

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt

# Создать .env файл
echo TELEGRAM_BOT_TOKEN=your_token > .env

uvicorn main:app --reload
# API доступен на http://localhost:8000
# Swagger UI: http://localhost:8000/docs
```

### Frontend

```bash
cd frontend
npm install

# Создать .env файл
echo VITE_API_URL=http://localhost:8000/api > .env

npm run dev
# Доступен на http://localhost:5173
```

---

## 📂 Структура проекта

```
CBU-finance-app/
├── backend/
│   ├── app/
│   │   ├── api/endpoints/     # auth, user, cards, transactions, bot
│   │   ├── core/              # security.py, config.py
│   │   ├── db/                # session.py
│   │   ├── models/            # SQLAlchemy модели
│   │   └── schemas/           # Pydantic схемы
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   └── src/app/
│       ├── api/               # services + axios client
│       ├── components/        # переиспользуемые компоненты
│       ├── contexts/          # Auth, Theme, Language
│       ├── pages/             # 22 страницы приложения
│       └── routes.ts
└── render.yaml                # конфигурация деплоя
```

---

## 🌍 Деплой на Render

Проект задеплоен через `render.yaml` — оба сервиса (frontend и backend) развёртываются автоматически при пуше в `main`.

**Переменные окружения (нужно задать в Render Dashboard):**

| Переменная | Где | Описание |
|-----------|-----|----------|
| `TELEGRAM_BOT_TOKEN` | Backend | Токен Telegram бота |
| `VITE_API_URL` | Frontend | URL бекенда (`https://cbu-finance-backend.onrender.com/api`) |
| `WEBAPP_URL` | Backend | URL фронтенда |

---

## 📄 Лицензия

MIT © 2024 CBU Finance