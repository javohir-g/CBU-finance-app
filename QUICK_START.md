# ⚡ Quick Start Guide

## 🚀 Для новых разработчиков

### 1️⃣ Установка (5 минут)

```bash
# Клонировать проект
git clone https://github.com/your-username/fintech-app.git
cd fintech-app

# Установить зависимости
npm install

# Запустить
npm run dev
```

**Откроется:** http://localhost:5173

---

### 2️⃣ Структура (что где находится)

```
src/
├── app/pages/          👉 21 страница приложения
├── app/components/     👉 Переиспользуемые компоненты
├── app/contexts/       👉 Language & Theme контексты
├── styles/             👉 CSS стили
└── app/routes.ts       👉 Все роуты
```

---

### 3️⃣ Главные концепции

#### 🌐 Язык
```typescript
import { useLanguage } from "./contexts/LanguageContext";

const { language } = useLanguage(); // 'rus' или 'uzb'

const content = {
  rus: { title: "Заголовок" },
  uzb: { title: "Sarlavha" }
};

<h1>{content[language].title}</h1>
```

#### 🎨 Тема
```typescript
import { useTheme } from "./contexts/ThemeContext";

const { colors } = useTheme();

<div style={{ backgroundColor: colors.background }}>
  <p style={{ color: colors.text }}>Text</p>
</div>
```

#### 🧭 Навигация
```typescript
import { useNavigate } from "react-router";

const navigate = useNavigate();
navigate('/dashboard'); // Переход на страницу
```

---

### 4️⃣ Основные страницы

| Роут | Страница | Что делает |
|------|----------|------------|
| `/` | Onboarding | Выбор языка |
| `/login` | TelegramLogin | Вход через Telegram |
| `/dashboard` | Dashboard | Главная с балансом и картами |
| `/transactions` | Transactions | История транзакций + фильтры |
| `/statistics` | Statistics | Статистика по категориям |
| `/cards` | CardSettings | Управление картами |
| `/savings` | Savings | Цели сбережений |
| `/more` | More | Все остальные сервисы |

**Всего:** 21 страница

---

### 5️⃣ Компоненты

#### Bottom Navigation
```typescript
import { BottomNav } from "../components/BottomNav";

<BottomNav /> // Добавить внизу каждой страницы
```

#### Drawers (боковые панели)
- **ProfileDrawer** - Профиль (слева)
- **NotificationsDrawer** - Уведомления (справа)
- **AddCardDrawer** - Добавить карту
- **AddGoalDrawer** - Добавить цель

---

### 6️⃣ Mock данные (важно!)

Все данные сейчас FAKE и помечены так:

```typescript
// 🔄 MOCK DATA - TODO: Replace with API
const mockData = [...];
```

**Найти все mock данные:**
```bash
grep -r "🔄 MOCK DATA" src/
```

**Для замены на реальные данные:**
См. [MVP_BACKEND_GUIDE.md](./MVP_BACKEND_GUIDE.md)

---

### 7️⃣ Добавить новую страницу

**Шаг 1:** Создать файл
```bash
touch src/app/pages/MyNewPage.tsx
```

**Шаг 2:** Код страницы
```typescript
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { BottomNav } from "../components/BottomNav";

export default function MyNewPage() {
  const { language } = useLanguage();
  const { colors } = useTheme();

  return (
    <div style={{ backgroundColor: colors.background }}>
      <h1 style={{ color: colors.text }}>My New Page</h1>
      <BottomNav />
    </div>
  );
}
```

**Шаг 3:** Добавить роут
```typescript
// src/app/routes.ts
import MyNewPage from "./pages/MyNewPage";

export const router = createBrowserRouter([
  // ... другие роуты
  { path: "/my-new-page", Component: MyNewPage },
]);
```

**Шаг 4:** Использовать
```typescript
navigate('/my-new-page');
```

---

### 8️⃣ Дизайн система

#### Цвета
```typescript
// Основной
const primary = "#7c3aed";

// Доход (зеленый)
const income = "#22c55e";

// Расход (красный)
const expense = "#ff4757";

// Из темы
const { colors } = useTheme();
colors.background      // Фон
colors.cardBackground  // Фон карточек
colors.text           // Основной текст
colors.textSecondary  // Вторичный текст
colors.border         // Границы
```

#### Иконки (Tabler Icons)
```typescript
import { 
  IconHome, 
  IconWallet, 
  IconPlus, 
  IconMinus,
  IconStar 
} from "@tabler/icons-react";

<IconHome size={24} />
```

#### Скругление
```typescript
// Список транзакций/карт
className="rounded-full"

// Обычные карточки
className="rounded-2xl"
```

---

### 9️⃣ Анимации

```typescript
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

---

### 🔟 Команды

```bash
npm run dev      # Запуск dev сервера
npm run build    # Production сборка
npm run preview  # Preview production
npm run lint     # Проверка кода
```

---

## 📚 Полная документация

Для детального изучения:

1. **[README.md](./README.md)** - Главная документация
2. **[APP_OVERVIEW.md](./APP_OVERVIEW.md)** - Подробное описание приложения
3. **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Структура проекта
4. **[MVP_BACKEND_GUIDE.md](./MVP_BACKEND_GUIDE.md)** - Backend интеграция
5. **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - База данных

---

## 🆘 Частые вопросы

### Как изменить язык?
```typescript
const { setLanguage } = useLanguage();
setLanguage('uzb'); // или 'rus'
```

### Как изменить тему?
```typescript
const { setTheme } = useTheme();
setTheme('light'); // или 'dark'
```

### Как получить список всех транзакций?
Смотри `/src/app/pages/Transactions.tsx` - там mock данные

### Где Bottom Navigation?
`/src/app/components/BottomNav.tsx`

### Как добавить новый сервис в More?
Редактировать `/src/app/pages/More.tsx` и добавить новую карточку

### Где настроить роуты?
`/src/app/routes.ts`

---

## ✅ Чек-лист для новичков

- [ ] Установил проект
- [ ] Запустил `npm run dev`
- [ ] Открыл http://localhost:5173
- [ ] Посмотрел все страницы
- [ ] Переключил язык (рус ⇄ узб)
- [ ] Переключил тему (темная ⇄ светлая)
- [ ] Изучил код Dashboard.tsx
- [ ] Изучил BottomNav.tsx
- [ ] Прочитал APP_OVERVIEW.md
- [ ] Готов к разработке! 🚀

---

## 🎓 Следующие шаги

1. **Изучи все 21 страницу** - посмотри как они работают
2. **Попробуй создать свою страницу** - следуй шагу 7
3. **Изучи существующие компоненты** - в `/src/app/components/`
4. **Прочитай полную документацию** - все `.md` файлы
5. **Начни разработку!** 💪

---

## 🔗 Быстрые ссылки

- [React Docs](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tabler Icons](https://tabler.io/icons)
- [Motion Docs](https://motion.dev/)
- [React Router](https://reactrouter.com/)

---

**Время на старт:** ~10 минут  
**Сложность:** Средняя  
**Готово к:** MVP разработке

<div align="center">

[⬆ Наверх](#-quick-start-guide) | [📚 Полная документация](./README.md)

</div>
