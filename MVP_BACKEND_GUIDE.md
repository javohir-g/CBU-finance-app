# 🚀 MVP Backend Implementation Guide

## Общая информация

Это руководство для backend разработчика по реализации MVP финтех мобильного приложения. Приложение построено на React с использованием TypeScript и требует REST API для работы с данными.

---

## 🎯 Приоритеты для MVP

### Фаза 1: Критически важные функции (Must Have)
1. **Авторизация через Telegram**
2. **Просмотр баланса и карт**
3. **История транзакций**
4. **Создание/удаление карт**
5. **Базовые настройки профиля**

### Фаза 2: Важные функции (Should Have)
1. **Цели сбережений**
2. **Курсы валют**
3. **Статистика по категориям**
4. **Уведомления**

### Фаза 3: Дополнительные функции (Nice to Have)
1. **Оплата коммунальных услуг**
2. **Автоплатежи**
3. **Госуслуги**
4. **Штрафы**
5. **Благотворительность**

---

## 🔐 Аутентификация

### Telegram OAuth 2.0

```typescript
POST /api/auth/telegram
Request: {
  id: number,
  first_name: string,
  last_name?: string,
  username?: string,
  photo_url?: string,
  auth_date: number,
  hash: string
}
Response: {
  success: boolean,
  token: string,
  user: {
    id: number,
    name: string,
    username: string,
    avatar: string
  }
}
```

**Важно:**
- Проверяйте hash согласно документации Telegram
- JWT токен с временем жизни 30 дней
- Refresh token для обновления сессии

---

## 📡 API Endpoints для MVP

### 1. Пользователь

```typescript
GET /api/user/profile
Response: {
  id: number,
  name: string,
  username: string,
  email?: string,
  phone?: string,
  avatar: string,
  language: "rus" | "uzb",
  theme: "light" | "dark",
  created_at: string
}

PUT /api/user/profile
Request: {
  name?: string,
  email?: string,
  phone?: string,
  language?: "rus" | "uzb",
  theme?: "light" | "dark"
}

GET /api/user/balance
Response: {
  totalBalance: number,
  currency: "USD" | "UZS"
}
```

### 2. Карты

```typescript
GET /api/cards
Response: {
  cards: [
    {
      id: number,
      user_id: number,
      card_number: string,        // Последние 4 цифры
      full_card_number: string,   // •••• •••• •••• 4862
      cardholder_name: string,
      balance: number,
      currency: string,
      card_type: "visa" | "mastercard" | "uzcard",
      is_locked: boolean,
      is_deactivated: boolean,
      created_at: string
    }
  ]
}

POST /api/cards
Request: {
  cardholder_name: string,
  card_number: string,
  expiry_date: string,
  cvv: string
}
Response: {
  success: boolean,
  card_id: number,
  message: string
}

PUT /api/cards/:id/lock
Request: {
  is_locked: boolean
}

PUT /api/cards/:id/deactivate
Request: {
  is_deactivated: boolean
}

DELETE /api/cards/:id
```

### 3. Транзакции

```typescript
GET /api/transactions
Query params:
  - category: "all" | "income" | "expense"
  - date_filter: "all" | "today" | "week" | "month" | "year"
  - limit: number (default: 50)
  - offset: number (default: 0)

Response: {
  transactions: [
    {
      id: number,
      user_id: number,
      card_id: number,
      type: "received" | "sent",
      category: "shopping" | "housing" | "transport" | "entertainment" | "food" | "salary" | "freelance" | "gifts",
      amount: number,
      currency: string,
      recipient_name: string,
      recipient_avatar?: string,
      description?: string,
      created_at: string
    }
  ],
  total: number,
  has_more: boolean
}

POST /api/transactions
Request: {
  card_id: number,
  type: "received" | "sent",
  category: string,
  amount: number,
  recipient_name: string,
  description?: string
}
```

### 4. Статистика

```typescript
GET /api/statistics
Query params:
  - category: "all" | "income" | "expense"
  - date_filter: "all" | "today" | "week" | "month" | "year"

Response: {
  total_income: number,
  total_expense: number,
  categories: [
    {
      name: string,
      type: "income" | "expense",
      value: number,
      percentage: number,
      color: string
    }
  ]
}
```

### 5. Цели сбережений

```typescript
GET /api/savings/goals
Response: {
  goals: [
    {
      id: number,
      user_id: number,
      name: string,
      target_amount: number,
      saved_amount: number,
      icon: string,
      color: string,
      created_at: string,
      deadline?: string
    }
  ]
}

POST /api/savings/goals
Request: {
  name: string,
  target_amount: number,
  icon: string,
  color: string,
  deadline?: string
}

PUT /api/savings/goals/:id/deposit
Request: {
  amount: number,
  card_id: number
}

DELETE /api/savings/goals/:id
```

### 6. Уведомления

```typescript
GET /api/notifications
Query params:
  - unread_only: boolean (default: false)

Response: {
  notifications: [
    {
      id: number,
      user_id: number,
      type: "received" | "sent" | "card" | "goal",
      title: string,
      description: string,
      is_read: boolean,
      created_at: string,
      metadata?: {
        transaction_id?: number,
        card_id?: number,
        goal_id?: number
      }
    }
  ]
}

PUT /api/notifications/:id/read
PUT /api/notifications/mark-all-read
```

### 7. Курсы валют

```typescript
GET /api/exchange-rates
Response: {
  currencies: [
    {
      code: string,
      name: string,
      flag: string,
      buy_rate: number,
      sell_rate: number,
      change_percentage: number
    }
  ],
  updated_at: string
}
```

---

## 🗄️ Структура базы данных (PostgreSQL)

См. файл `DATABASE_SCHEMA.md` для полной схемы базы данных.

---

## 🔒 Безопасность

### Обязательные меры для MVP:

1. **JWT Authentication**
   - Access token: 15 минут
   - Refresh token: 30 дней
   - Хранение refresh token в httpOnly cookies

2. **Шифрование**
   - Полные номера карт хранить зашифрованными (AES-256)
   - CVV не хранить вообще
   - Пароли хэшировать с bcrypt (cost factor 12)

3. **Rate Limiting**
   - 100 запросов/минуту на пользователя
   - 10 попыток авторизации/час

4. **CORS**
   - Только разрешенные домены
   - Credentials: true для cookies

5. **Input Validation**
   - Все входные данные валидировать на сервере
   - Использовать библиотеки типа Joi или Zod

---

## 📊 Рекомендуемый Tech Stack

### Backend
- **Node.js** (v18+) с **Express** или **Fastify**
- **PostgreSQL** (v14+) для основной БД
- **Redis** для кеширования и sessions
- **Prisma** или **TypeORM** для работы с БД

### Инфраструктура
- **Docker** для контейнеризации
- **Nginx** как reverse proxy
- **PM2** для управления процессами Node.js
- **AWS** или **DigitalOcean** для хостинга

---

## 🔄 Миграция данных

### Начальные данные (Seed)

```sql
-- Категории транзакций
INSERT INTO transaction_categories (name, type, icon, color) VALUES
  ('Покупки', 'expense', 'shopping-cart', '#7c3aed'),
  ('Жильё', 'expense', 'home', '#3b82f6'),
  ('Транспорт', 'expense', 'car', '#f59e0b'),
  ('Развлечения', 'expense', 'devices', '#ec4899'),
  ('Еда', 'expense', 'coffee', '#22c55e'),
  ('Зарплата', 'income', 'briefcase', '#22c55e'),
  ('Фриланс', 'income', 'devices', '#7c3aed'),
  ('Подарки', 'income', 'gift', '#ec4899');
```

---

## 📝 Логирование

### Что логировать:

1. **Критичные события:**
   - Авторизация пользователя
   - Создание/удаление карт
   - Все финансовые транзакции
   - Изменение настроек безопасности

2. **Ошибки:**
   - 500 errors с полным stack trace
   - Failed authentication attempts
   - Database connection issues

3. **Метрики:**
   - Response time для API endpoints
   - Количество запросов по endpoint
   - Размер payload

### Рекомендуемые инструменты:
- **Winston** или **Pino** для логирования
- **Sentry** для мониторинга ошибок
- **Datadog** или **New Relic** для APM

---

## ✅ Чек-лист для MVP запуска

### Backend
- [ ] Настроена авторизация через Telegram
- [ ] Реализованы все критичные API endpoints (Фаза 1)
- [ ] Настроена база данных с миграциями
- [ ] Добавлена валидация всех входных данных
- [ ] Реализовано шифрование чувствительных данных
- [ ] Настроен rate limiting
- [ ] Добавлено логирование
- [ ] Написаны unit тесты для критичных функций
- [ ] Настроен CI/CD pipeline
- [ ] Проведено нагрузочное тестирование

### Инфраструктура
- [ ] Настроен production сервер
- [ ] Настроен HTTPS с SSL сертификатом
- [ ] Настроены automated backups БД
- [ ] Настроен monitoring и alerting
- [ ] Настроена CDN для статических файлов (если нужно)

### Документация
- [ ] API документация (Swagger/OpenAPI)
- [ ] Инструкции по развертыванию
- [ ] Документация по окружению (env variables)
- [ ] Runbook для production issues

---

## 🚀 Этапы развертывания MVP

### 1. Локальная разработка (1-2 недели)
- Настройка окружения
- Базовая структура API
- Интеграция с БД
- Telegram authentication

### 2. Staging окружение (3-4 недели)
- Реализация всех endpoints Фазы 1
- Интеграция с frontend
- Тестирование
- Исправление багов

### 3. Production MVP (5-6 недель)
- Деплой на production
- Мониторинг
- Сбор обратной связи
- Быстрые итерации

---

## 📞 Важные замечания

1. **Не хранить PII без необходимости** - приложение для демо, не для реальных финансовых данных
2. **Mock данные во frontend** - все mock данные помечены комментарием `🔄 MOCK DATA - TODO: Replace with API`
3. **Локализация** - поддержка русского и узбекского языков на уровне API
4. **Мобильная оптимизация** - базовый размер 430x932px, адаптивный дизайн
5. **Темы** - поддержка светлой и темной темы на frontend

---

## 📚 Дополнительные ресурсы

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [PostgreSQL Best Practices](https://wiki.postgresql.org/wiki/Don%27t_Do_This)
- [REST API Design Guidelines](https://restfulapi.net/)
- [OWASP Security Cheat Sheet](https://cheatsheetseries.owasp.org/)

---

**Дата обновления:** {{ currentDate }}
**Версия:** 1.0.0 MVP
