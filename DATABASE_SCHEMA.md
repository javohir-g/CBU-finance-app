# 🗄️ Database Schema - MVP Version

## Общая информация

База данных для финтех мобильного приложения. Рекомендуется использовать **PostgreSQL 14+** для лучшей производительности и надежности.

---

## 📊 Диаграмма связей (ER Diagram)

```
users (1) ─────< (n) cards
  │                   │
  │                   │
  └──< transactions >─┘
  │
  └──< savings_goals
  │
  └──< notifications
  │
  └──< user_settings
```

---

## 📋 Таблицы базы данных

### 1. users (Пользователи)

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  telegram_id BIGINT UNIQUE NOT NULL,
  username VARCHAR(255),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(255),
  avatar_url TEXT,
  language VARCHAR(3) DEFAULT 'rus', -- 'rus' or 'uzb'
  theme VARCHAR(10) DEFAULT 'dark',   -- 'light' or 'dark'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_at TIMESTAMP
);

-- Индексы
CREATE INDEX idx_users_telegram_id ON users(telegram_id);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_created_at ON users(created_at);
```

**Поля:**
- `telegram_id` - ID пользователя из Telegram (уникальный)
- `language` - Язык интерфейса (rus/uzb)
- `theme` - Тема оформления (light/dark)
- `is_active` - Активен ли аккаунт

---

### 2. cards (Банковские карты)

```sql
CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  cardholder_name VARCHAR(255) NOT NULL,
  card_number_encrypted TEXT NOT NULL,  -- Зашифрованный полный номер
  card_number_last4 VARCHAR(4) NOT NULL, -- Последние 4 цифры
  card_type VARCHAR(20) NOT NULL,        -- 'visa', 'mastercard', 'uzcard'
  balance DECIMAL(15, 2) DEFAULT 0.00,
  currency VARCHAR(3) DEFAULT 'USD',     -- 'USD', 'UZS', 'EUR'
  credit_limit DECIMAL(15, 2) DEFAULT 0.00,
  is_locked BOOLEAN DEFAULT false,
  is_deactivated BOOLEAN DEFAULT false,
  expiry_date VARCHAR(7),                -- MM/YYYY
  gradient_color VARCHAR(50) DEFAULT 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы
CREATE INDEX idx_cards_user_id ON cards(user_id);
CREATE INDEX idx_cards_last4 ON cards(card_number_last4);
CREATE INDEX idx_cards_created_at ON cards(created_at);

-- Триггер для автообновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cards_updated_at BEFORE UPDATE ON cards
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

**Важно:**
- Полный номер карты хранится в зашифрованном виде
- CVV НЕ хранится в базе
- `card_number_last4` для отображения в UI

---

### 3. transaction_categories (Категории транзакций)

```sql
CREATE TABLE transaction_categories (
  id SERIAL PRIMARY KEY,
  name_rus VARCHAR(100) NOT NULL,
  name_uzb VARCHAR(100) NOT NULL,
  type VARCHAR(10) NOT NULL,     -- 'income' or 'expense'
  icon VARCHAR(50) NOT NULL,     -- Название иконки
  color VARCHAR(7) DEFAULT '#7c3aed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Начальные данные
INSERT INTO transaction_categories (name_rus, name_uzb, type, icon, color) VALUES
  ('Покупки', 'Xaridlar', 'expense', 'shopping-cart', '#7c3aed'),
  ('Жильё', 'Uy-joy', 'expense', 'home', '#3b82f6'),
  ('Транспорт', 'Transport', 'expense', 'car', '#f59e0b'),
  ('Развлечения', 'Ko''ngil ochar', 'expense', 'devices', '#ec4899'),
  ('Еда', 'Ovqat', 'expense', 'coffee', '#22c55e'),
  ('Зарплата', 'Maosh', 'income', 'briefcase', '#22c55e'),
  ('Фриланс', 'Frilanser', 'income', 'devices', '#7c3aed'),
  ('Подарки', 'Sovg''alar', 'income', 'gift', '#ec4899');

-- Индекс
CREATE INDEX idx_categories_type ON transaction_categories(type);
```

---

### 4. transactions (Транзакции)

```sql
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  card_id INTEGER REFERENCES cards(id) ON DELETE SET NULL,
  category_id INTEGER REFERENCES transaction_categories(id),
  type VARCHAR(10) NOT NULL,           -- 'received' or 'sent'
  amount DECIMAL(15, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  recipient_name VARCHAR(255) NOT NULL,
  recipient_avatar TEXT,
  description TEXT,
  status VARCHAR(20) DEFAULT 'completed', -- 'pending', 'completed', 'failed'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_card_id ON transactions(card_id);
CREATE INDEX idx_transactions_category_id ON transactions(category_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX idx_transactions_user_date ON transactions(user_id, created_at DESC);

-- Триггер для updated_at
CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Триггер для автоматического обновления баланса карты
CREATE OR REPLACE FUNCTION update_card_balance()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' THEN
    IF NEW.type = 'received' THEN
      UPDATE cards SET balance = balance + NEW.amount WHERE id = NEW.card_id;
    ELSIF NEW.type = 'sent' THEN
      UPDATE cards SET balance = balance - NEW.amount WHERE id = NEW.card_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER transaction_balance_update AFTER INSERT ON transactions
FOR EACH ROW EXECUTE FUNCTION update_card_balance();
```

**Поля:**
- `status` - Статус транзакции (для будущих доработок)
- `recipient_avatar` - URL аватара получателя/отправителя

---

### 5. savings_goals (Цели сбережений)

```sql
CREATE TABLE savings_goals (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  target_amount DECIMAL(15, 2) NOT NULL,
  saved_amount DECIMAL(15, 2) DEFAULT 0.00,
  currency VARCHAR(3) DEFAULT 'USD',
  icon VARCHAR(50) DEFAULT 'star',
  color VARCHAR(7) DEFAULT '#f59e0b',
  deadline DATE,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- Индексы
CREATE INDEX idx_savings_user_id ON savings_goals(user_id);
CREATE INDEX idx_savings_completed ON savings_goals(is_completed);
CREATE INDEX idx_savings_created_at ON savings_goals(created_at);

-- Триггер для updated_at
CREATE TRIGGER update_savings_updated_at BEFORE UPDATE ON savings_goals
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Триггер для автоматической отметки выполненных целей
CREATE OR REPLACE FUNCTION check_goal_completion()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.saved_amount >= NEW.target_amount AND OLD.is_completed = false THEN
    NEW.is_completed = true;
    NEW.completed_at = CURRENT_TIMESTAMP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER goal_completion_check BEFORE UPDATE ON savings_goals
FOR EACH ROW EXECUTE FUNCTION check_goal_completion();
```

---

### 6. savings_deposits (Пополнения целей)

```sql
CREATE TABLE savings_deposits (
  id SERIAL PRIMARY KEY,
  goal_id INTEGER NOT NULL REFERENCES savings_goals(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  card_id INTEGER REFERENCES cards(id) ON DELETE SET NULL,
  amount DECIMAL(15, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы
CREATE INDEX idx_deposits_goal_id ON savings_deposits(goal_id);
CREATE INDEX idx_deposits_user_id ON savings_deposits(user_id);
CREATE INDEX idx_deposits_created_at ON savings_deposits(created_at);

-- Триггер для обновления saved_amount в savings_goals
CREATE OR REPLACE FUNCTION update_goal_amount()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE savings_goals 
  SET saved_amount = saved_amount + NEW.amount 
  WHERE id = NEW.goal_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER deposit_goal_update AFTER INSERT ON savings_deposits
FOR EACH ROW EXECUTE FUNCTION update_goal_amount();
```

---

### 7. notifications (Уведомления)

```sql
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL,         -- 'received', 'sent', 'card', 'goal'
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_read BOOLEAN DEFAULT false,
  transaction_id INTEGER REFERENCES transactions(id) ON DELETE CASCADE,
  card_id INTEGER REFERENCES cards(id) ON DELETE CASCADE,
  goal_id INTEGER REFERENCES savings_goals(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read, created_at DESC);
```

---

### 8. exchange_rates (Курсы валют)

```sql
CREATE TABLE exchange_rates (
  id SERIAL PRIMARY KEY,
  currency_code VARCHAR(3) NOT NULL,     -- 'USD', 'EUR', 'RUB', 'UZS'
  currency_name_rus VARCHAR(100) NOT NULL,
  currency_name_uzb VARCHAR(100) NOT NULL,
  flag_emoji VARCHAR(10),
  buy_rate DECIMAL(10, 4) NOT NULL,
  sell_rate DECIMAL(10, 4) NOT NULL,
  change_percentage DECIMAL(5, 2) DEFAULT 0.00,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индекс
CREATE UNIQUE INDEX idx_exchange_currency ON exchange_rates(currency_code);

-- Начальные данные
INSERT INTO exchange_rates (currency_code, currency_name_rus, currency_name_uzb, flag_emoji, buy_rate, sell_rate, change_percentage) VALUES
  ('USD', 'Доллар США', 'AQSH dollari', '🇺🇸', 1.0000, 1.0000, 0.00),
  ('EUR', 'Евро', 'Yevro', '🇪🇺', 1.0850, 1.0950, 0.25),
  ('RUB', 'Российский рубль', 'Rossiya rubli', '🇷🇺', 0.0105, 0.0110, -0.15),
  ('UZS', 'Узбекский сум', 'O''zbekiston so''mi', '🇺🇿', 0.00008, 0.00009, 0.10);
```

---

### 9. auto_payments (Автоплатежи)

```sql
CREATE TABLE auto_payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  card_id INTEGER REFERENCES cards(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  amount DECIMAL(15, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  frequency VARCHAR(20) NOT NULL,    -- 'daily', 'weekly', 'monthly'
  next_payment_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  icon VARCHAR(50),
  color VARCHAR(7) DEFAULT '#7c3aed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы
CREATE INDEX idx_auto_payments_user_id ON auto_payments(user_id);
CREATE INDEX idx_auto_payments_active ON auto_payments(is_active);
CREATE INDEX idx_auto_payments_next_date ON auto_payments(next_payment_date);

-- Триггер для updated_at
CREATE TRIGGER update_auto_payments_updated_at BEFORE UPDATE ON auto_payments
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

### 10. utility_services (Коммунальные услуги)

```sql
CREATE TABLE utility_services (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  service_type VARCHAR(50) NOT NULL,  -- 'electricity', 'gas', 'water', 'internet'
  service_name_rus VARCHAR(255) NOT NULL,
  service_name_uzb VARCHAR(255) NOT NULL,
  account_number VARCHAR(100) NOT NULL,
  debt_amount DECIMAL(15, 2) DEFAULT 0.00,
  currency VARCHAR(3) DEFAULT 'UZS',
  icon VARCHAR(50),
  color VARCHAR(7) DEFAULT '#7c3aed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы
CREATE INDEX idx_utilities_user_id ON utility_services(user_id);
CREATE INDEX idx_utilities_type ON utility_services(service_type);

-- Триггер для updated_at
CREATE TRIGGER update_utilities_updated_at BEFORE UPDATE ON utility_services
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

### 11. user_vehicles (Автомобили пользователя)

```sql
CREATE TABLE user_vehicles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  license_plate VARCHAR(20) NOT NULL,
  make VARCHAR(100),                  -- Марка
  model VARCHAR(100),                 -- Модель
  year INTEGER,
  color VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы
CREATE INDEX idx_vehicles_user_id ON user_vehicles(user_id);
CREATE INDEX idx_vehicles_plate ON user_vehicles(license_plate);

-- Триггер для updated_at
CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON user_vehicles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

### 12. fines (Штрафы)

```sql
CREATE TABLE fines (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  vehicle_id INTEGER REFERENCES user_vehicles(id) ON DELETE CASCADE,
  violation_type VARCHAR(255) NOT NULL,
  violation_date DATE NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'UZS',
  status VARCHAR(20) DEFAULT 'unpaid',  -- 'unpaid', 'paid'
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы
CREATE INDEX idx_fines_user_id ON fines(user_id);
CREATE INDEX idx_fines_vehicle_id ON fines(vehicle_id);
CREATE INDEX idx_fines_status ON fines(status);
CREATE INDEX idx_fines_date ON fines(violation_date);
```

---

### 13. transport_cards (Транспортные карты)

```sql
CREATE TABLE transport_cards (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  card_type VARCHAR(20) NOT NULL,     -- 'metro', 'bus'
  card_number VARCHAR(50) NOT NULL,
  balance DECIMAL(10, 2) DEFAULT 0.00,
  currency VARCHAR(3) DEFAULT 'UZS',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы
CREATE INDEX idx_transport_cards_user_id ON transport_cards(user_id);
CREATE INDEX idx_transport_cards_type ON transport_cards(card_type);

-- Триггер для updated_at
CREATE TRIGGER update_transport_cards_updated_at BEFORE UPDATE ON transport_cards
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

### 14. transport_trips (История поездок)

```sql
CREATE TABLE transport_trips (
  id SERIAL PRIMARY KEY,
  transport_card_id INTEGER NOT NULL REFERENCES transport_cards(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  route VARCHAR(255),
  cost DECIMAL(10, 2) NOT NULL,
  trip_time TIME NOT NULL,
  trip_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы
CREATE INDEX idx_trips_card_id ON transport_trips(transport_card_id);
CREATE INDEX idx_trips_user_id ON transport_trips(user_id);
CREATE INDEX idx_trips_date ON transport_trips(trip_date DESC);
```

---

## 🔐 Безопасность базы данных

### 1. Шифрование чувствительных данных

```sql
-- Установить расширение для шифрования
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Пример шифрования номера карты
UPDATE cards 
SET card_number_encrypted = pgp_sym_encrypt(
  '1234567812345678', 
  'your-encryption-key'
);

-- Пример дешифрования
SELECT pgp_sym_decrypt(
  card_number_encrypted::bytea, 
  'your-encryption-key'
) FROM cards;
```

### 2. Row-Level Security (RLS)

```sql
-- Включить RLS для таблицы cards
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

-- Создать политику: пользователь видит только свои карты
CREATE POLICY user_cards_policy ON cards
  FOR ALL
  USING (user_id = current_setting('app.user_id')::INTEGER);
```

### 3. Права доступа

```sql
-- Создать роль для приложения
CREATE ROLE app_user WITH LOGIN PASSWORD 'secure_password';

-- Выдать минимально необходимые права
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;

-- Запретить DELETE для критичных таблиц
REVOKE DELETE ON transactions FROM app_user;
REVOKE DELETE ON savings_deposits FROM app_user;
```

---

## 📈 Оптимизация производительности

### 1. Партиционирование больших таблиц

```sql
-- Партиционирование транзакций по месяцам
CREATE TABLE transactions_partitioned (
  LIKE transactions INCLUDING ALL
) PARTITION BY RANGE (created_at);

CREATE TABLE transactions_2024_01 PARTITION OF transactions_partitioned
  FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE transactions_2024_02 PARTITION OF transactions_partitioned
  FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');
-- И так далее...
```

### 2. Материализованные представления

```sql
-- Статистика по категориям (для быстрого доступа)
CREATE MATERIALIZED VIEW user_category_stats AS
SELECT 
  user_id,
  category_id,
  SUM(CASE WHEN type = 'received' THEN amount ELSE 0 END) as total_income,
  SUM(CASE WHEN type = 'sent' THEN amount ELSE 0 END) as total_expense,
  COUNT(*) as transaction_count
FROM transactions
GROUP BY user_id, category_id;

CREATE UNIQUE INDEX ON user_category_stats (user_id, category_id);

-- Обновлять каждый час
REFRESH MATERIALIZED VIEW CONCURRENTLY user_category_stats;
```

---

## 🔄 Backup и восстановление

### Автоматический backup

```bash
#!/bin/bash
# /scripts/backup.sh

BACKUP_DIR="/var/backups/postgresql"
DATE=$(date +%Y%m%d_%H%M%S)
DATABASE="fintech_app"

# Создать backup
pg_dump -U postgres -d $DATABASE -F c -f $BACKUP_DIR/backup_$DATE.dump

# Удалить backups старше 30 дней
find $BACKUP_DIR -name "backup_*.dump" -mtime +30 -delete

# Загрузить в облако (опционально)
# aws s3 cp $BACKUP_DIR/backup_$DATE.dump s3://my-backups/
```

### Восстановление из backup

```bash
pg_restore -U postgres -d fintech_app -c /var/backups/postgresql/backup_20240101_120000.dump
```

---

## 🧪 Тестовые данные для разработки

```sql
-- Создать тестового пользователя
INSERT INTO users (telegram_id, username, first_name, language, theme)
VALUES (123456789, 'testuser', 'Test User', 'rus', 'dark')
RETURNING id;

-- Добавить тестовую карту (предположим user_id = 1)
INSERT INTO cards (user_id, cardholder_name, card_number_last4, card_type, balance)
VALUES (1, 'TEST USER', '4862', 'mastercard', 1250.48);

-- Добавить тестовые транзакции
INSERT INTO transactions (user_id, card_id, category_id, type, amount, recipient_name)
VALUES 
  (1, 1, 6, 'received', 820.00, 'Salary Payment'),
  (1, 1, 1, 'sent', 150.00, 'Amazon'),
  (1, 1, 5, 'sent', 45.50, 'Grocery Store');
```

---

## 📊 Мониторинг базы данных

### Полезные запросы для мониторинга

```sql
-- Размер таблиц
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Медленные запросы
SELECT 
  query,
  calls,
  total_time,
  mean_time,
  max_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Количество соединений
SELECT count(*) FROM pg_stat_activity;

-- Неиспользуемые индексы
SELECT 
  schemaname,
  tablename,
  indexname
FROM pg_stat_user_indexes
WHERE idx_scan = 0
  AND schemaname = 'public';
```

---

## ✅ Чек-лист для MVP

- [ ] Все таблицы созданы
- [ ] Индексы добавлены для часто запрашиваемых полей
- [ ] Триггеры настроены
- [ ] Начальные данные (seed) загружены
- [ ] Настроено шифрование для card_number
- [ ] Настроены права доступа
- [ ] Настроен автоматический backup
- [ ] Проведено тестирование на тестовых данных

---

**Дата обновления:** {{ currentDate }}
**Версия:** 1.0.0 MVP
