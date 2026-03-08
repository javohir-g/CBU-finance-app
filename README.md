# 💼 Финтех Мобильное Приложение - MVP

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178c6.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0.0-38bdf8.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Современное финтех PWA приложение для управления финансами

[Quick Start](./QUICK_START.md) · [Демо](#) · [Документация](#-документация) · [Отчет об ошибках](#)

</div>

---

## 📱 О проекте

Полнофункциональное финтех мобильное приложение (Progressive Web App), построенное на React с TypeScript. Приложение предназначено для управления банковскими картами, транзакциями, целями сбережений и различными финансовыми сервисами.

### ✨ Основные возможности

- 🌐 **Двуязычность** - Русский и Узбекский языки
- 🎨 **Две темы** - Светлая и темная
- 💳 **Управление картами** - Добавление, блокировка, удаление
- 💰 **Транзакции** - История с фильтрами по категориям и датам
- 🎯 **Цели сбережений** - Создание и отслеживание финансовых целей
- 📊 **Статистика** - Детальная аналитика доходов и расходов
- 🔔 **Уведомления** - Актуальная информация о транзакциях
- 🏠 **Коммунальные услуги** - Оплата счетов
- 🚗 **Автомобиль** - Проверка штрафов, страхование
- 🚇 **Транспорт** - Метро и автобус
- 🎁 **Благотворительность** - Пожертвования
- 🏛️ **Госуслуги** - Заказ документов
- 💱 **Конвертация** - Обмен валют
- ⚡ **Автоплатежи** - Настройка регулярных платежей

---

## 🎯 Статус MVP

### ✅ Готово
- [x] Все 21 страница приложения
- [x] Полная система навигации
- [x] Мультиязычность (рус/узб)
- [x] Светлая и темная темы
- [x] Адаптивный дизайн (базовый 430x932px)
- [x] Плавные анимации
- [x] Drawers и модальные окна
- [x] Фильтры и статистика
- [x] UI/UX компоненты

### 🔄 В разработке
- [ ] Backend интеграция
- [ ] Реальные API endpoints
- [ ] База данных
- [ ] Telegram авторизация
- [ ] Push уведомления
- [ ] Платежные системы

---

## 🚀 Быстрый старт

### Требования

- Node.js 18+
- npm или yarn

### Установка

```bash
# Клонировать репозиторий
git clone https://github.com/your-username/fintech-app.git

# Перейти в директорию
cd fintech-app

# Установить зависимости
npm install

# Запустить dev сервер
npm run dev
```

Приложение будет доступно по адресу: `http://localhost:5173`

### Команды

```bash
npm run dev      # Запуск dev сервера
npm run build    # Сборка для production
npm run preview  # Превью production сборки
npm run lint     # Проверка кода
```

---

## 📚 Документация

Проект включает полную документацию для разных специалистов:

### Быстрый старт
- **[⚡ QUICK_START.md](./QUICK_START.md)** - Быстрое введение для новых разработчиков (10 минут)

### Для Frontend разработчиков
- **[📁 PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Полная структура проекта, файлы, компоненты
- **[📱 APP_OVERVIEW.md](./APP_OVERVIEW.md)** - Обзор приложения, страницы, навигация, функционал

### Для Backend разработчиков
- **[🚀 MVP_BACKEND_GUIDE.md](./MVP_BACKEND_GUIDE.md)** - Руководство по реализации backend для MVP
- **[🔄 BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)** - Детали интеграции API (старая версия)

### Для Database инженеров
- **[🗄️ DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - Полная схема базы данных, таблицы, индексы, триггеры

### Дополнительные файлы
- **[ATTRIBUTIONS.md](./ATTRIBUTIONS.md)** - Атрибуции и лицензии

---

## 🏗️ Технологический стек

### Frontend
- **React 18.3.1** - UI библиотека
- **TypeScript 5.7.3** - Типизация
- **Vite 6.0.11** - Сборщик
- **React Router 7** - Маршрутизация
- **Motion 11** - Анимации (бывш. Framer Motion)
- **Tailwind CSS 4** - Стилизация
- **Tabler Icons** - Иконки
- **Recharts** - Графики

### Backend (Рекомендуемый стек)
- **Node.js 18+** с Express/Fastify
- **PostgreSQL 14+** - База данных
- **Redis** - Кеширование
- **Prisma/TypeORM** - ORM
- **JWT** - Аутентификация

### Инфраструктура
- **Docker** - Контейнеризация
- **Nginx** - Reverse proxy
- **AWS/DigitalOcean** - Хостинг

---

## 📂 Структура проекта (кратко)

```
fintech-app/
├── src/
│   ├── app/
│   │   ├── components/      # React компоненты
│   │   ├── contexts/        # Context API (Language, Theme)
│   │   ├── pages/           # 21 страница приложения
│   │   ├── App.tsx          # Главный компонент
│   │   └── routes.ts        # Конфигурация роутов
│   ├── imports/             # Импорты из Figma
│   ├── styles/              # CSS стили
│   └── main.tsx             # Точка входа
├── public/                  # Публичные файлы
├── *.md                     # Документация
├── package.json
├── vite.config.ts
└── tsconfig.json
```

Полная структура: [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

---

## 🎨 Дизайн система

### Цвета
- **Основной:** #7c3aed (фиолетовый)
- **Доход:** #22c55e (зеленый) + IconPlus
- **Расход:** #ff4757 (красный) + IconMinus
- **Цели:** #f59e0b (золотой) + IconStar

### Темы
**Темная (по умолчанию):**
- Фон: #0f1420
- Карточки: #1e2337

**Светлая:**
- Фон: #f5f6fa
- Карточки: #ffffff

### UI элементы
- Скругления: `rounded-full` для списков
- Градиенты: Фиолетово-синие для карт
- Иконки: Tabler Icons
- Анимации: Motion (Framer Motion)

---

## 📱 Основные страницы

| Страница | Путь | Описание |
|----------|------|----------|
| Onboarding | `/` | Выбор языка и приветствие |
| Login | `/login` | Авторизация через Telegram |
| Dashboard | `/dashboard` | Главная страница |
| Transactions | `/transactions` | История транзакций |
| Statistics | `/statistics` | Статистика по категориям |
| Cards | `/cards` | Управление картами |
| Savings | `/savings` | Цели сбережений |
| More | `/more` | Дополнительные сервисы |

**Всего:** 21 страница

Полный обзор: [APP_OVERVIEW.md](./APP_OVERVIEW.md)

---

## 🔄 Mock данные

**Важно!** Все данные в приложении сейчас mock (фейковые) и помечены комментариями:

```typescript
// ========================================
// 🔄 MOCK DATA - TODO: Replace with API
// ========================================
```

Для поиска всех mock данных:
```bash
grep -r "🔄 MOCK DATA" src/
```

Для замены на реальные данные см.: [MVP_BACKEND_GUIDE.md](./MVP_BACKEND_GUIDE.md)

---

## 🌐 Локализация

Приложение поддерживает 2 языка:
- 🇷🇺 Русский (по умолчанию)
- 🇺🇿 Узбекский

Язык выбирается один раз на первой странице и сохраняется в Context.

### Пример использования:

```typescript
import { useLanguage } from "./contexts/LanguageContext";

const { language, setLanguage } = useLanguage();

const content = {
  rus: { title: "Главная" },
  uzb: { title: "Asosiy" }
};

return <h1>{content[language].title}</h1>;
```

---

## 🎨 Система тем

Приложение поддерживает 2 темы:
- 🌙 Темная (по умолчанию)
- ☀️ Светлая

Тема переключается в настройках профиля.

### Пример использования:

```typescript
import { useTheme } from "./contexts/ThemeContext";

const { theme, setTheme, colors } = useTheme();

return (
  <div style={{ backgroundColor: colors.background }}>
    <p style={{ color: colors.text }}>Text</p>
  </div>
);
```

---

## 🧭 Навигация

### React Router (Data Mode)
Файл конфигурации: `/src/app/routes.ts`

```typescript
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  { path: "/", Component: Onboarding },
  { path: "/dashboard", Component: Dashboard },
  // ... другие роуты
]);
```

### Bottom Navigation
5 основных вкладок:
- 🏠 Главная → `/dashboard`
- 💰 Транзакции → `/transactions`
- 💳 Карты → `/cards`
- ⭐ Цели → `/savings`
- ⋮ Еще → `/more`

---

## 🔐 Безопасность

### Frontend
- ✅ No sensitive data in localStorage
- ✅ XSS protection
- ✅ HTTPS only in production
- ✅ Input validation
- ✅ CSP headers

### Backend (рекомендуется)
- JWT аутентификация
- Шифрование номеров карт (AES-256)
- CVV не хранится
- Rate limiting
- CORS настройка
- SQL injection защита

См. подробнее: [MVP_BACKEND_GUIDE.md](./MVP_BACKEND_GUIDE.md)

---

## 📊 База данных

### Основные таблицы:
- `users` - Пользователи
- `cards` - Банковские карты
- `transactions` - Транзакции
- `transaction_categories` - Категории
- `savings_goals` - Цели сбережений
- `notifications` - Уведомления
- `exchange_rates` - Курсы валют
- И другие...

Полная схема: [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)

---

## 🛠️ Разработка

### Добавление новой страницы

1. Создать файл в `/src/app/pages/NewPage.tsx`
2. Добавить роут в `/src/app/routes.ts`
3. Использовать хуки `useLanguage` и `useTheme`
4. Добавить навигацию

### Добавление нового компонента

1. Создать файл в `/src/app/components/`
2. Экспортировать компонент
3. Импортировать в нужной странице

### Работа с контекстами

```typescript
// Language
const { language, setLanguage } = useLanguage();

// Theme
const { theme, setTheme, colors } = useTheme();
```

Подробнее: [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

---

## 🧪 Тестирование

```bash
# Unit тесты (будут добавлены)
npm run test

# E2E тесты (будут добавлены)
npm run test:e2e

# Coverage
npm run test:coverage
```

---

## 🚢 Развертывание

### Production сборка

```bash
npm run build
```

Файлы будут в директории `/dist`

### Preview

```bash
npm run preview
```

### Переменные окружения

Создать файл `.env`:

```env
VITE_API_URL=https://api.your-domain.com
VITE_TELEGRAM_BOT_TOKEN=your_bot_token
```

---

## 🤝 Вклад в проект

1. Fork проекта
2. Создать feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit изменений (`git commit -m 'Add some AmazingFeature'`)
4. Push в branch (`git push origin feature/AmazingFeature`)
5. Открыть Pull Request

---

## 📝 Roadmap

### MVP (Текущая фаза)
- [x] Frontend разработка
- [ ] Backend интеграция
- [ ] Database setup
- [ ] Telegram авторизация
- [ ] Тестирование
- [ ] Деплой

### Фаза 2
- [ ] Push уведомления
- [ ] Реальные платежи
- [ ] Расширенная статистика
- [ ] Экспорт данных
- [ ] Биометрическая авторизация

### Фаза 3
- [ ] Мобильные приложения (iOS/Android)
- [ ] Web3 интеграция
- [ ] AI ассистент
- [ ] Социальные функции

---

## 📄 Лицензия

MIT License - см. файл [LICENSE](./LICENSE)

---

## 👥 Команда

- **Frontend Developer** - [Имя]
- **Backend Developer** - [Имя]
- **UI/UX Designer** - [Имя]
- **Product Manager** - [Имя]

---

## 📞 Контакты

- **Email:** support@fintech-app.com
- **Telegram:** [@fintech_support](https://t.me/fintech_support)
- **Website:** [https://fintech-app.com](https://fintech-app.com)

---

## 🙏 Благодарности

- [React](https://react.dev/)
- [Tabler Icons](https://tabler.io/icons)
- [Tailwind CSS](https://tailwindcss.com/)
- [Motion](https://motion.dev/)
- [Figma](https://figma.com/)

---

<div align="center">

**Сделано с ❤️ для MVP**

[⬆ Наверх](#-финтех-мобильное-приложение---mvp)

</div>#   C B U - f i n a n c e - a p p  
 #   C B U - f i n a n c e - a p p  
 #   C B U - f i n a n c e - a p p  
 