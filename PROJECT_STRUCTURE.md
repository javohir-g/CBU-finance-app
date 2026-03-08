# 📁 Project Structure - Структура проекта

## 🗂️ Полная структура файлов

```
fintech-app/
│
├── public/                          # Публичные файлы
│
├── src/                             # Исходный код приложения
│   ├── app/                         # Основная директория приложения
│   │   │
│   │   ├── components/              # React компоненты
│   │   │   ├── figma/              # Системные компоненты Figma
│   │   │   │   └── ImageWithFallback.tsx    # Компонент изображения с fallback
│   │   │   │
│   │   │   ├── ui/                 # UI компоненты библиотеки (shadcn/ui)
│   │   │   │   ├── accordion.tsx
│   │   │   │   ├── alert-dialog.tsx
│   │   │   │   ├── alert.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── checkbox.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── drawer.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── switch.tsx
│   │   │   │   ├── tabs.tsx
│   │   │   │   └── ... (и другие UI компоненты)
│   │   │   │
│   │   │   ├── AddCardDrawer.tsx    # Drawer добавления карты
│   │   │   ├── AddGoalDrawer.tsx    # Drawer добавления цели
│   │   │   ├── AddTransactionDrawer.tsx  # Drawer добавления транзакции
│   │   │   ├── BottomNav.tsx        # Нижняя навигация
│   │   │   ├── NotificationsDrawer.tsx   # Drawer уведомлений
│   │   │   └── ProfileDrawer.tsx    # Drawer профиля
│   │   │
│   │   ├── contexts/               # React Context для глобального состояния
│   │   │   ├── LanguageContext.tsx # Контекст языка (rus/uzb)
│   │   │   └── ThemeContext.tsx    # Контекст темы (light/dark)
│   │   │
│   │   ├── pages/                  # Страницы приложения
│   │   │   ├── About.tsx           # О приложении
│   │   │   ├── AutoPayments.tsx    # Автоплатежи
│   │   │   ├── CardSettings.tsx    # Настройки карт
│   │   │   ├── Charity.tsx         # Благотворительность
│   │   │   ├── Conversion.tsx      # Конвертация валют
│   │   │   ├── Dashboard.tsx       # Главная страница
│   │   │   ├── ExchangeRate.tsx    # Курсы валют
│   │   │   ├── FinesMIB.tsx        # Штрафы МВД
│   │   │   ├── GovServices.tsx     # Госуслуги
│   │   │   ├── More.tsx            # Дополнительные сервисы
│   │   │   ├── MyCar.tsx           # Мой автомобиль
│   │   │   ├── MyHome.tsx          # Коммунальные услуги
│   │   │   ├── Onboarding.tsx      # Приветственная страница
│   │   │   ├── OrderCard.tsx       # Заказ карты
│   │   │   ├── ProfileSettings.tsx # Настройки профиля
│   │   │   ├── Savings.tsx         # Цели сбережений
│   │   │   ├── Security.tsx        # Безопасность
│   │   │   ├── Statistics.tsx      # Страница статистики
│   │   │   ├── TelegramLogin.tsx   # Авторизация через Telegram
│   │   │   ├── Transactions.tsx    # История транзакций
│   │   │   └── Transport.tsx       # Транспорт
│   │   │
│   │   ├── App.tsx                 # Главный компонент приложения
│   │   └── routes.ts               # Конфигурация роутов
│   │
│   ├── imports/                    # Импортированные файлы из Figma
│   │   ├── svg-*.ts                # SVG файлы
│   │   └── ... (другие импорты)
│   │
│   ├── styles/                     # Стили
│   │   ├── fonts.css               # Шрифты
│   │   ├── index.css               # Основные стили
│   │   ├── scrollbar.css           # Стили скроллбара
│   │   ├── tailwind.css            # Tailwind конфигурация
│   │   └── theme.css               # Цветовая схема и токены
│   │
│   └── main.tsx                    # Точка входа приложения
│
├── .gitignore                      # Git ignore файл
├── APP_OVERVIEW.md                 # 📱 Обзор приложения (этот файл)
├── ATTRIBUTIONS.md                 # Атрибуции
├── BACKEND_INTEGRATION.md          # 🔄 Старая версия backend гайда
├── DATABASE_SCHEMA.md              # 🗄️ Схема базы данных
├── MVP_BACKEND_GUIDE.md            # 🚀 MVP Backend руководство
├── PROJECT_STRUCTURE.md            # 📁 Структура проекта (этот файл)
├── package.json                    # Зависимости проекта
├── tsconfig.json                   # TypeScript конфигурация
├── vite.config.ts                  # Vite конфигурация
└── README.md                       # Основная документация
```

---

## 📄 Описание ключевых файлов

### Root файлы

#### `package.json`
Содержит все зависимости проекта:
- **Dependencies:**
  - react, react-dom
  - react-router
  - motion (анимации)
  - @tabler/icons-react (иконки)
  - recharts (графики)
  - И другие...

- **Scripts:**
  - `dev` - запуск dev сервера
  - `build` - сборка для production
  - `preview` - превью production сборки
  - `lint` - проверка кода

#### `vite.config.ts`
Конфигурация Vite:
- Алиасы путей
- Плагины React
- Настройки сборки
- Dev сервер

#### `tsconfig.json`
TypeScript конфигурация:
- Строгая типизация
- Путь резолвинг
- Target ES2020
- JSX настройки

---

### Исходный код (`/src`)

#### `/src/main.tsx`
Точка входа приложения:
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

#### `/src/app/App.tsx`
Главный компонент с провайдерами:
```typescript
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </LanguageProvider>
  );
}
```

#### `/src/app/routes.ts`
Конфигурация всех роутов:
```typescript
import { createBrowserRouter } from "react-router";
import Dashboard from "./pages/Dashboard";
// ... импорты других страниц

export const router = createBrowserRouter([
  { path: "/", Component: Onboarding },
  { path: "/login", Component: TelegramLogin },
  { path: "/dashboard", Component: Dashboard },
  // ... другие роуты
]);
```

---

### Контексты (`/src/app/contexts`)

#### `LanguageContext.tsx`
Управление языком приложения:
```typescript
interface LanguageContextType {
  language: "rus" | "uzb";
  setLanguage: (lang: "rus" | "uzb") => void;
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState<"rus" | "uzb">("rus");
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
```

#### `ThemeContext.tsx`
Управление темой оформления:
```typescript
interface ThemeContextType {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  colors: {
    background: string;
    cardBackground: string;
    text: string;
    textSecondary: string;
    border: string;
  };
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  
  const colors = theme === "dark" 
    ? darkColors 
    : lightColors;
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

---

### Страницы (`/src/app/pages`)

Все страницы следуют единой структуре:

```typescript
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { BottomNav } from "../components/BottomNav";

export default function PageName() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();
  
  const content = {
    rus: { /* русские тексты */ },
    uzb: { /* узбекские тексты */ }
  };

  // 🔄 MOCK DATA - TODO: Replace with API
  const mockData = [...];

  return (
    <div style={{ backgroundColor: colors.background }}>
      {/* Контент страницы */}
      <BottomNav />
    </div>
  );
}
```

**Список всех страниц (21):**
1. Onboarding - Приветствие
2. TelegramLogin - Авторизация
3. Dashboard - Главная
4. Transactions - Транзакции
5. Statistics - Статистика ⭐ NEW
6. CardSettings - Карты
7. Savings - Цели
8. More - Еще
9. ProfileSettings - Настройки профиля
10. Security - Безопасность
11. About - О приложении
12. ExchangeRate - Курсы валют
13. MyHome - Коммунальные услуги
14. MyCar - Автомобиль
15. OrderCard - Заказ карты
16. AutoPayments - Автоплатежи
17. Conversion - Конвертация
18. Charity - Благотворительность
19. GovServices - Госуслуги
20. FinesMIB - Штрафы
21. Transport - Транспорт

---

### Компоненты (`/src/app/components`)

#### Главные компоненты

**BottomNav.tsx**
Нижняя навигация с 5 вкладками:
```typescript
- IconHome - Dashboard
- IconWallet - Transactions
- IconCreditCard - CardSettings
- IconStar - Savings
- IconDotsVertical - More
```

**ProfileDrawer.tsx**
Боковая панель профиля (слева):
- Аватар и имя
- Настройки
- Безопасность
- О приложении
- Выход

**NotificationsDrawer.tsx**
Боковая панель уведомлений (справа):
- Список уведомлений
- Фильтр прочитанных/непрочитанных
- Типы: received, sent, card, goal

**AddCardDrawer.tsx**
Модальное окно добавления карты:
- Форма ввода данных карты
- Валидация
- Отправка на сервер

**AddGoalDrawer.tsx**
Модальное окно добавления цели:
- Название
- Сумма
- Иконка и цвет
- Создание

**AddTransactionDrawer.tsx**
Модальное окно транзакции:
- Тип (доход/расход)
- Категория
- Сумма
- Описание

---

#### UI компоненты (`/src/app/components/ui`)

Библиотека готовых UI компонентов (shadcn/ui):
- **Формы:** Input, Select, Checkbox, Switch, Textarea
- **Диалоги:** Dialog, AlertDialog, Sheet, Drawer
- **Навигация:** Tabs, Breadcrumb, Pagination
- **Контент:** Card, Accordion, Collapsible
- **Обратная связь:** Alert, Toast (Sonner), Progress
- **И другие...**

---

### Стили (`/src/styles`)

#### `index.css`
Главный файл стилей:
```css
@import './tailwind.css';
@import './fonts.css';
@import './theme.css';
@import './scrollbar.css';

/* Глобальные стили */
* { box-sizing: border-box; }
body { margin: 0; padding: 0; }
```

#### `tailwind.css`
Tailwind v4 импорты:
```css
@import "tailwindcss";
```

#### `theme.css`
Цветовые токены и переменные:
```css
:root {
  --color-primary: #7c3aed;
  --color-success: #22c55e;
  --color-error: #ff4757;
  --gradient-purple: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Темная тема */
.dark {
  --background: #0f1420;
  --card-background: #1e2337;
}

/* Светлая тема */
.light {
  --background: #f5f6fa;
  --card-background: #ffffff;
}
```

#### `fonts.css`
Импорты шрифтов:
```css
/* Google Fonts или локальные шрифты */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

#### `scrollbar.css`
Кастомные стили скроллбара:
```css
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--card-background);
}

::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: 4px;
}
```

---

## 🗂️ Импорты из Figma (`/src/imports`)

### SVG файлы
Векторная графика из Figma:
- `svg-*.ts` - TypeScript модули с SVG path данными

### Изображения
Растровые изображения:
- Импорт через `figma:asset/[hash].png`

**Пример использования:**
```typescript
import svgPaths from "../imports/svg-0r3fuzvrta";
import imgAvatar from "figma:asset/d411d707e98eb5e36e5bc42f2e12a77a4c0e1edd.png";
```

---

## 📦 Зависимости проекта

### Production зависимости

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router": "^7.1.1",
  "motion": "^11.15.0",
  "@tabler/icons-react": "^3.29.0",
  "recharts": "^2.15.0",
  "react-slick": "^0.30.3",
  "sonner": "^1.7.2"
}
```

### Dev зависимости

```json
{
  "@vitejs/plugin-react": "^4.3.4",
  "typescript": "^5.7.3",
  "vite": "^6.0.11",
  "tailwindcss": "^4.0.0",
  "postcss": "^8.5.1"
}
```

---

## 🎯 Правила именования

### Файлы
- **Компоненты:** PascalCase (e.g., `Dashboard.tsx`, `BottomNav.tsx`)
- **Стили:** kebab-case (e.g., `theme.css`, `scrollbar.css`)
- **Утилиты:** camelCase (e.g., `utils.ts`)

### Компоненты
- **Pages:** Единственное число (Dashboard, не Dashboards)
- **Drawers:** Название + Drawer (AddCardDrawer)
- **Contexts:** Название + Context (LanguageContext)

### Переменные
- **Состояния:** is/has/should префикс для boolean (isOpen, hasError)
- **Обработчики:** handle/on префикс (handleClick, onSubmit)
- **Контент:** объект content с ключами rus/uzb

---

## 🔧 Полезные команды

### Навигация по проекту

```bash
# Найти все mock данные
grep -r "🔄 MOCK DATA" src/

# Найти все использования useLanguage
grep -r "useLanguage" src/

# Найти все роуты
cat src/app/routes.ts

# Список всех страниц
ls src/app/pages/

# Список всех компонентов
ls src/app/components/
```

### Разработка

```bash
# Создать новую страницу
touch src/app/pages/NewPage.tsx

# Создать новый компонент
touch src/app/components/NewComponent.tsx

# Добавить роут в routes.ts
# (отредактировать вручную)
```

---

## 📝 Комментарии в коде

### Типы комментариев

**Mock данные:**
```typescript
// ========================================
// 🔄 MOCK DATA - TODO: Replace with API
// ========================================
```

**Секции кода:**
```typescript
// ========================================
// Header
// ========================================
```

**TODO заметки:**
```typescript
// TODO: Добавить валидацию
// TODO: Подключить к API
```

**Объяснения:**
```typescript
// Проверяем, достигнута ли цель
if (saved >= target) {
  // Помечаем как выполненную
  markAsCompleted();
}
```

---

## 🚀 Расширение проекта

### Добавление новой страницы

1. **Создать файл страницы:**
```bash
touch src/app/pages/NewPage.tsx
```

2. **Написать код страницы:**
```typescript
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { BottomNav } from "../components/BottomNav";

export default function NewPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();
  
  const content = {
    rus: { title: "Новая страница" },
    uzb: { title: "Yangi sahifa" }
  };

  return (
    <div style={{ backgroundColor: colors.background }}>
      <h1>{content[language].title}</h1>
      <BottomNav />
    </div>
  );
}
```

3. **Добавить роут:**
```typescript
// src/app/routes.ts
import NewPage from "./pages/NewPage";

export const router = createBrowserRouter([
  // ... существующие роуты
  { path: "/new-page", Component: NewPage },
]);
```

4. **Добавить навигацию:**
```typescript
navigate('/new-page');
```

---

### Добавление нового компонента

1. **Создать файл:**
```bash
touch src/app/components/NewComponent.tsx
```

2. **Написать компонент:**
```typescript
import { motion } from "motion/react";

interface NewComponentProps {
  title: string;
  onClose: () => void;
}

export function NewComponent({ title, onClose }: NewComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2>{title}</h2>
      <button onClick={onClose}>Close</button>
    </motion.div>
  );
}
```

3. **Использовать в странице:**
```typescript
import { NewComponent } from "../components/NewComponent";

function MyPage() {
  return <NewComponent title="Hello" onClose={() => {}} />;
}
```

---

### Добавление нового контекста

1. **Создать файл:**
```bash
touch src/app/contexts/NewContext.tsx
```

2. **Написать контекст:**
```typescript
import { createContext, useContext, useState, ReactNode } from "react";

interface NewContextType {
  value: string;
  setValue: (value: string) => void;
}

const NewContext = createContext<NewContextType | undefined>(undefined);

export function NewProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState("");
  
  return (
    <NewContext.Provider value={{ value, setValue }}>
      {children}
    </NewContext.Provider>
  );
}

export function useNew() {
  const context = useContext(NewContext);
  if (!context) {
    throw new Error("useNew must be used within NewProvider");
  }
  return context;
}
```

3. **Обернуть приложение:**
```typescript
// src/app/App.tsx
import { NewProvider } from "./contexts/NewContext";

function App() {
  return (
    <NewProvider>
      {/* остальные провайдеры */}
    </NewProvider>
  );
}
```

---

## 🎓 Best Practices

### Структура компонента
```typescript
// 1. Импорты
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

// 2. Интерфейсы/типы
interface Props {
  title: string;
}

// 3. Компонент
export default function Component({ title }: Props) {
  // 3.1. Hooks
  const navigate = useNavigate();
  const [state, setState] = useState();
  
  // 3.2. Константы
  const content = { ... };
  
  // 3.3. Функции
  const handleClick = () => { ... };
  
  // 3.4. Effects
  useEffect(() => { ... }, []);
  
  // 3.5. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Работа с темами
```typescript
// ✅ Правильно
const { colors } = useTheme();
<div style={{ backgroundColor: colors.background }}>

// ❌ Неправильно
<div className="bg-gray-900">
```

### Работа с локализацией
```typescript
// ✅ Правильно
const content = {
  rus: { title: "Заголовок" },
  uzb: { title: "Sarlavha" }
};
<h1>{content[language].title}</h1>

// ❌ Неправильно
<h1>Заголовок</h1>
```

---

## ✅ Чек-лист для новых разработчиков

- [ ] Клонировал репозиторий
- [ ] Установил зависимости (`npm install`)
- [ ] Запустил dev сервер (`npm run dev`)
- [ ] Изучил структуру проекта
- [ ] Понял систему роутинга
- [ ] Понял работу контекстов (Language, Theme)
- [ ] Изучил примеры страниц
- [ ] Изучил систему компонентов
- [ ] Прочитал документацию (все .md файлы)
- [ ] Готов к разработке! 🚀

---

**Дата обновления:** Март 2026
**Версия:** 1.0.0 MVP
**Поддержка:** Смотри другие .md файлы для деталей
