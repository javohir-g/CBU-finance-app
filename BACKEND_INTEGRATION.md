# 🔄 Backend Integration Guide

## ⚠️ ВНИМАНИЕ: Используйте новую документацию

Этот файл является старой версией. Для MVP разработки используйте:

- **[MVP_BACKEND_GUIDE.md](./MVP_BACKEND_GUIDE.md)** - Полное руководство для backend
- **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - Схема базы данных
- **[APP_OVERVIEW.md](./APP_OVERVIEW.md)** - Обзор приложения

---

## Инструкция для Backend разработчика

Этот документ описывает все места в коде, где используются mock данные, которые необходимо заменить на реальные API запросы к базе данных.

## 🔍 Поиск Mock Данных

Все mock данные помечены комментариями:

```typescript
// ========================================
// 🔄 MOCK DATA - TODO: Replace with API
// ========================================
```

Используйте глобальный поиск по проекту: `🔄 MOCK DATA` чтобы найти все места.

---

## 📄 Страницы с Mock Данными

### 1. Dashboard (`/src/app/pages/Dashboard.tsx`)

**Mock данные:**
- `totalBalance` - общий баланс пользователя
- `recentTransactions` - последние транзакции

**API эндпоинты (рекомендуемые):**
```typescript
GET /api/user/balance
Response: { totalBalance: number }

GET /api/transactions/recent?limit=2
Response: {
  transactions: [
    {
      id: number,
      name: string,
      date: string,
      amount: string,
      type: "received" | "sent",
      image: string
    }
  ]
}
```

---

### 2. Transactions (`/src/app/pages/Transactions.tsx`)

**Mock данные:**
- `allTransactions` - все транзакции пользователя

**API эндпоинты:**
```typescript
GET /api/transactions?category={all|income|expense}
Response: {
  transactions: [
    {
      id: number,
      name: string,
      date: string,
      amount: string,
      type: "received" | "sent",
      image: string
    }
  ]
}
```

---

### 3. CardSettings (`/src/app/pages/CardSettings.tsx`)

**Mock данные:**
- `cards` - список банковских карт пользователя

**API эндпоинты:**
```typescript
GET /api/cards
Response: {
  cards: [
    {
      id: number,
      balance: string,
      cardNumber: string,
      fullCardNumber: string,
      creditLimit: string,
      background: string
    }
  ]
}

POST /api/cards
Request: {
  cardholderName: string,
  cardNumber: string,
  balance: string
}
Response: { success: boolean, cardId: number }

PUT /api/cards/{cardId}/settings
Request: {
  isLocked: boolean,
  isDeactivated: boolean
}
```

---

### 4. Savings (`/src/app/pages/Savings.tsx`)

**Mock данные:**
- `defaultGoals` - цели сбережений

**API эндпоинты:**
```typescript
GET /api/savings/goals
Response: {
  goals: [
    {
      id: number,
      name: string,
      icon: string,
      saved: number,
      goal: number,
      color: string
    }
  ]
}

POST /api/savings/goals
Request: {
  name: string,
  amount: number,
  icon: string,
  color: string
}
```

---

### 5. ExchangeRate (`/src/app/pages/ExchangeRate.tsx`)

**Mock данные:**
- `currencies` - курсы валют

**API эндпоинты:**
```typescript
GET /api/exchange-rates
Response: {
  currencies: [
    {
      code: string,
      name: string,
      flag: string,
      buyRate: number,
      sellRate: number,
      change: number
    }
  ]
}
```

---

### 6. MyHome (`/src/app/pages/MyHome.tsx`)

**Mock данные:**
- `services` - коммунальные услуги

**API эндпоинты:**
```typescript
GET /api/utilities
Response: {
  services: [
    {
      id: number,
      name: string,
      icon: string,
      color: string,
      bgColor: string,
      accountNumber: string,
      debt: number
    }
  ]
}

POST /api/utilities/pay
Request: {
  serviceId: number,
  amount: number
}
```

---

### 7. MyCar (`/src/app/pages/MyCar.tsx`)

**Mock данные:**
- `carInfo` - информация об автомобиле
- `services` - услуги для автомобиля

**API эндпоинты:**
```typescript
GET /api/car/info
Response: {
  number: string,
  model: string,
  year: string
}

GET /api/car/services
Response: {
  services: [
    {
      id: number,
      name: string,
      icon: string,
      color: string,
      bgColor: string,
      status: string,
      action: string
    }
  ]
}
```

---

### 8. OrderCard (`/src/app/pages/OrderCard.tsx`)

**Mock данные:**
- `cardTypes` - типы доступных карт

**API эндпоинты:**
```typescript
GET /api/cards/types
Response: {
  cardTypes: [
    {
      id: number,
      name: string,
      type: string,
      color: string,
      gradient: string,
      fee: string,
      deliveryTime: string,
      cashback: string,
      limit: string
    }
  ]
}

POST /api/cards/order
Request: {
  cardTypeId: number
}
```

---

### 9. AutoPayments (`/src/app/pages/AutoPayments.tsx`)

**Mock данные:**
- `autoPayments` - автоплатежи

**API эндпоинты:**
```typescript
GET /api/auto-payments
Response: {
  payments: [
    {
      id: number,
      name: string,
      icon: string,
      color: string,
      bgColor: string,
      amount: string,
      date: string,
      active: boolean
    }
  ]
}

PUT /api/auto-payments/{id}/toggle
Request: {
  active: boolean
}
```

---

### 10. Charity (`/src/app/pages/Charity.tsx`)

**Mock данные:**
- `charityFunds` - благотворительные фонды

**API эндпоинты:**
```typescript
GET /api/charity/funds
Response: {
  funds: [
    {
      id: number,
      name: string,
      nameUzb: string,
      icon: string,
      color: string,
      bgColor: string,
      description: string,
      descriptionUzb: string
    }
  ]
}

POST /api/charity/donate
Request: {
  fundId: number,
  amount: number
}
```

---

### 11. GovServices (`/src/app/pages/GovServices.tsx`)

**Mock данные:**
- `services` - государственные услуги

**API эндпоинты:**
```typescript
GET /api/gov-services
Response: {
  services: [
    {
      id: number,
      name: string,
      icon: string,
      color: string,
      bgColor: string,
      deliveryTime: string,
      price: string
    }
  ]
}

POST /api/gov-services/order
Request: {
  serviceId: number
}
```

---

### 12. FinesMIB (`/src/app/pages/FinesMIB.tsx`)

**Mock данные:**
- `fines` - штрафы

**API эндпоинты:**
```typescript
GET /api/fines?carNumber={number}
Response: {
  fines: [
    {
      id: number,
      violation: string,
      date: string,
      amount: number,
      status: "paid" | "unpaid"
    }
  ]
}

POST /api/fines/pay
Request: {
  fineIds: number[]
}
```

---

### 13. Transport (`/src/app/pages/Transport.tsx`)

**Mock данные:**
- `transportCards` - транспортные карты
- `trips` - история поездок

**API эндпоинты:**
```typescript
GET /api/transport/cards
Response: {
  cards: [
    {
      id: number,
      type: "metro" | "bus",
      cardNumber: string,
      balance: number
    }
  ]
}

GET /api/transport/trips?type={metro|bus}
Response: {
  trips: [
    {
      id: number,
      route: string,
      time: string,
      cost: number,
      date: string
    }
  ]
}

POST /api/transport/topup
Request: {
  cardId: number,
  amount: number
}
```

---

## 🔧 Рекомендации по интеграции

### 1. Создайте API сервис

```typescript
// src/services/api.ts
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export async function fetchData<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    }
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  
  return response.json();
}

export async function postData<T>(endpoint: string, data: any): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  
  return response.json();
}
```

### 2. Используйте React Query или SWR

```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../services/api';

function Dashboard() {
  const { data: balance } = useQuery({
    queryKey: ['balance'],
    queryFn: () => fetchData<{ totalBalance: number }>('/user/balance')
  });
  
  const { data: transactions } = useQuery({
    queryKey: ['transactions', 'recent'],
    queryFn: () => fetchData('/transactions/recent?limit=2')
  });
  
  // Используйте balance.totalBalance и transactions вместо mock данных
}
```

### 3. Обработка ошибок

Все компоненты должны обрабатывать состояния загрузки и ошибок:

```typescript
const { data, isLoading, error } = useQuery({...});

if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error.message} />;
```

---

## 📊 База данных

### Рекомендуемая структура таблиц

```sql
-- Users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Cards
CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  card_number VARCHAR(16),
  balance DECIMAL(10, 2),
  is_locked BOOLEAN DEFAULT false,
  is_deactivated BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Transactions
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  card_id INTEGER REFERENCES cards(id),
  amount DECIMAL(10, 2),
  type VARCHAR(10), -- 'received' or 'sent'
  recipient VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Savings Goals
CREATE TABLE savings_goals (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255),
  target_amount DECIMAL(10, 2),
  saved_amount DECIMAL(10, 2) DEFAULT 0,
  icon VARCHAR(50),
  color VARCHAR(7),
  created_at TIMESTAMP DEFAULT NOW()
);

-- И так далее для других сущностей...
```

---

## ✅ Чек-лист интеграции

- [ ] Настроить переменные окружения для API URL
- [ ] Создать API сервис для HTTP запросов
- [ ] Добавить авторизацию (JWT tokens)
- [ ] Заменить все mock данные на API вызовы
- [ ] Добавить обработку ошибок
- [ ] Добавить состояния загрузки
- [ ] Настроить кэширование (React Query)
- [ ] Протестировать все эндпоинты
- [ ] Добавить валидацию на стороне сервера
- [ ] Настроить CORS на backend

---

## 📞 Контакты

При возникновении вопросов по интеграции, обращайтесь к frontend разработчику.