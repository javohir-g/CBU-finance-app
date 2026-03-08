# 🤖 AI Development Rules - Правила для AI ассистентов

## ⚠️ КРИТИЧЕСКИ ВАЖНО

Этот документ содержит **СТРОГИЕ ПРАВИЛА** для AI ассистентов (ChatGPT, Claude, Gemini, и др.) при работе с проектом.

**ВСЕ ПРАВИЛА ОБЯЗАТЕЛЬНЫ К ВЫПОЛНЕНИЮ БЕЗ ИСКЛЮЧЕНИЙ!**

---

## 🎯 Общие принципы для AI

### Приоритет действий:
1. **СНАЧАЛА** - прочитать файл, который нужно изменить
2. **ЗАТЕМ** - понять контекст и структуру
3. **ПОТОМ** - вносить изменения
4. **В КОНЦЕ** - проверить соответствие правилам

### Контекст проекта:
- **Тип:** Финтех мобильное приложение (PWA)
- **Фреймворк:** React 18 + TypeScript
- **Роутинг:** React Router v7 (Data Mode)
- **Стилизация:** Tailwind CSS v4 + inline styles
- **Анимации:** Motion (не Framer Motion!)
- **Иконки:** Tabler Icons (только!)
- **Языки:** Русский и Узбекский (оба обязательны!)
- **Темы:** Светлая и темная (обе обязательны!)
- **Базовый размер:** 430x932px (мобильный)

---

## ✅ ЧТО МОЖНО ДЕЛАТЬ

### 1. Чтение файлов
```
✅ ВСЕГДА читать файл перед изменением
✅ Использовать read tool для изучения кода
✅ Проверять существующую структуру
✅ Искать похожие паттерны в других файлах
```

### 2. Создание файлов
```
✅ Страницы: /src/app/pages/*.tsx
✅ Компоненты: /src/app/components/*.tsx
✅ Контексты: /src/app/contexts/*.tsx
✅ Стили: /src/styles/*.css
✅ Документация: /*.md
```

### 3. Именование файлов
```
✅ PascalCase для компонентов: Dashboard.tsx, BottomNav.tsx
✅ camelCase для утилит: utils.ts, helpers.ts
✅ kebab-case для CSS: theme.css, scrollbar.css
```

### 4. Структура React компонента
```typescript
// ✅ ПРАВИЛЬНАЯ СТРУКТУРА - ВСЕГДА СЛЕДУЙ ЭТОМУ ШАБЛОНУ
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { BottomNav } from "../components/BottomNav";
import { IconHome } from "@tabler/icons-react";

export default function ComponentName() {
  // 1. Хуки (hooks) - в начале
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [state, setState] = useState();

  // 2. Константы - после хуков
  const content = {
    rus: { 
      title: "Заголовок",
      description: "Описание" 
    },
    uzb: { 
      title: "Sarlavha",
      description: "Tavsif" 
    }
  };

  // 3. Функции-обработчики
  const handleClick = () => {
    // ...
  };

  // 4. useEffect - после функций
  useEffect(() => {
    // ...
  }, []);

  // 5. Render - в конце
  return (
    <div 
      className="min-h-screen pb-20"
      style={{ backgroundColor: colors.background }}
    >
      {/* Header */}
      <div className="p-6">
        <h1 style={{ color: colors.text }}>
          {content[language].title}
        </h1>
      </div>

      {/* Content */}
      <div className="px-6">
        {/* ... */}
      </div>

      <BottomNav />
    </div>
  );
}
```

### 5. Локализация (ОБЯЗАТЕЛЬНО!)
```typescript
// ✅ ПРАВИЛЬНО - ВСЕГДА два языка
const content = {
  rus: {
    title: "Главная страница",
    subtitle: "Добро пожаловать",
    button: "Войти"
  },
  uzb: {
    title: "Asosiy sahifa",
    subtitle: "Xush kelibsiz",
    button: "Kirish"
  }
};

<h1>{content[language].title}</h1>
```

### 6. Темы (ОБЯЗАТЕЛЬНО!)
```typescript
// ✅ ПРАВИЛЬНО - использовать colors из useTheme
const { colors } = useTheme();

<div style={{ 
  backgroundColor: colors.background,
  color: colors.text 
}}>
  Content
</div>

// colors содержит:
// - background
// - cardBackground
// - text
// - textSecondary
// - border
```

### 7. Иконки (ТОЛЬКО Tabler!)
```typescript
// ✅ ПРАВИЛЬНО - только Tabler Icons
import { 
  IconHome,
  IconWallet,
  IconPlus,    // Доход (зеленая)
  IconMinus,   // Расход (красная)
  IconStar     // Цели
} from "@tabler/icons-react";

<IconHome size={24} color={colors.text} />
```

### 8. Навигация
```typescript
// ✅ ПРАВИЛЬНО - использовать navigate
import { useNavigate } from "react-router";

const navigate = useNavigate();
navigate('/dashboard');
navigate(-1); // Назад
```

### 9. Анимации
```typescript
// ✅ ПРАВИЛЬНО - Motion (не Framer Motion!)
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### 10. Mock данные
```typescript
// ✅ ПРАВИЛЬНО - ВСЕГДА помечать
// ========================================
// 🔄 MOCK DATA - TODO: Replace with API
// ========================================
const mockTransactions = [
  { id: 1, amount: 100, type: "received" }
];
```

### 11. TypeScript типизация
```typescript
// ✅ ПРАВИЛЬНО - типизировать всё
interface ButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

export function Button({ 
  title, 
  onClick, 
  disabled = false,
  variant = "primary" 
}: ButtonProps) {
  return <button onClick={onClick}>{title}</button>;
}
```

### 12. Импорты
```typescript
// ✅ ПРАВИЛЬНО
import { useNavigate } from "react-router";          // НЕ react-router-dom!
import { motion } from "motion/react";                // НЕ framer-motion!
import img from "figma:asset/abc123.png";             // БЕЗ ./ или ../
import svgPaths from "../imports/svg-wg56ef214f";     // Относительный путь
import { BottomNav } from "../components/BottomNav";
```

---

## ❌ ЧТО НЕЛЬЗЯ ДЕЛАТЬ

### 1. ЗАПРЕЩЕНО редактировать файлы
```
❌ /src/app/components/figma/ImageWithFallback.tsx
❌ /pnpm-lock.yaml
❌ /package.json (напрямую - использовать install_package)
```

### 2. ЗАПРЕЩЕНО создавать файлы вне структуры
```
❌ /components/MyComponent.tsx      (неправильная директория)
❌ /MyPage.tsx                       (неправильная директория)
❌ /src/app/pages/MyPage.js          (неправильное расширение)
❌ /src/app/components/MyComp.jsx    (неправильное расширение)
```

### 3. ЗАПРЕЩЕНО - Хардкод текста
```typescript
// ❌ ЗАПРЕЩЕНО
<h1>Главная страница</h1>
<button>Войти</button>
const message = "Привет";

// ✅ ПРАВИЛЬНО
const content = {
  rus: { title: "Главная страница", button: "Войти" },
  uzb: { title: "Asosiy sahifa", button: "Kirish" }
};
<h1>{content[language].title}</h1>
```

### 4. ЗАПРЕЩЕНО - Хардкод цветов
```typescript
// ❌ ЗАПРЕЩЕНО
<div style={{ backgroundColor: "#0f1420" }}>
<p style={{ color: "#ffffff" }}>

// ✅ ПРАВИЛЬНО
const { colors } = useTheme();
<div style={{ backgroundColor: colors.background }}>
<p style={{ color: colors.text }}>
```

### 5. ЗАПРЕЩЕНО - Неправильные иконки
```typescript
// ❌ ЗАПРЕЩЕНО - другие библиотеки
import { FaHome } from "react-icons/fa";
import HomeIcon from "@mui/icons-material/Home";

// ❌ ЗАПРЕЩЕНО - неправильные иконки для транзакций
<IconArrowUp />    // Для доходов
<IconArrowDown />  // Для расходов

// ✅ ПРАВИЛЬНО - только Tabler Icons
import { IconHome, IconPlus, IconMinus } from "@tabler/icons-react";
<IconPlus />   // Доход
<IconMinus />  // Расход
```

### 6. ЗАПРЕЩЕНО - HTML навигация
```typescript
// ❌ ЗАПРЕЩЕНО
<a href="/dashboard">Dashboard</a>
window.location.href = "/dashboard";

// ✅ ПРАВИЛЬНО
const navigate = useNavigate();
<button onClick={() => navigate('/dashboard')}>
```

### 7. ЗАПРЕЩЕНО - Неправильные импорты
```typescript
// ❌ ЗАПРЕЩЕНО
import { useNavigate } from "react-router-dom";      // Не работает!
import { motion } from "framer-motion";               // Старое название!
import img from "./figma:asset/abc.png";              // Неправильный путь!
import img from "../figma:asset/abc.png";             // Неправильный путь!

// ✅ ПРАВИЛЬНО
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import img from "figma:asset/abc.png";
```

### 8. ЗАПРЕЩЕНО - Отсутствие типизации
```typescript
// ❌ ЗАПРЕЩЕНО
function Button(props) {
  return <button>{props.title}</button>;
}

const data: any = getData();

// ✅ ПРАВИЛЬНО
interface ButtonProps {
  title: string;
}
function Button({ title }: ButtonProps) {
  return <button>{title}</button>;
}

const data: Transaction[] = getData();
```

### 9. ЗАПРЕЩЕНО - Tailwind для шрифтов
```typescript
// ❌ ЗАПРЕЩЕНО - Tailwind классы для шрифтов
className="text-2xl font-bold leading-none"

// ✅ ПРАВИЛЬНО - inline стили или классы из theme.css
style={{ fontSize: '24px', fontWeight: 600 }}
```

### 10. ЗАПРЕЩЕНО - Неправильные скругления
```typescript
// ❌ ЗАПРЕЩЕНО - для списков транзакций/карт
className="rounded-lg"
className="rounded-xl"

// ✅ ПРАВИЛЬНО - полные скругления для списков
className="rounded-full"  // Для транзакций, карт
className="rounded-2xl"   // Для обычных карточек
```

### 11. ЗАПРЕЩЕНО - Небезопасные операции
```typescript
// ❌ ЗАПРЕЩЕНО
<div dangerouslySetInnerHTML={{ __html: userInput }} />
eval(userCode);
localStorage.setItem('token', jwtToken);
const API_KEY = "sk_live_abc123";  // В коде!

// ✅ ПРАВИЛЬНО
// Санитизация HTML
// Избегать eval()
// httpOnly cookies для токенов
const API_KEY = import.meta.env.VITE_API_KEY;
```

### 12. ЗАПРЕЩЕНО - Неправильные ключи в списках
```typescript
// ❌ ЗАПРЕЩЕНО - индексы как ключи
{items.map((item, index) => (
  <div key={index}>{item.name}</div>
))}

// ✅ ПРАВИЛЬНО - уникальные ID
{items.map((item) => (
  <div key={item.id}>{item.name}</div>
))}
```

### 13. ЗАПРЕЩЕНО - Мутация состояния
```typescript
// ❌ ЗАПРЕЩЕНО
state.items.push(newItem);
state.count++;

// ✅ ПРАВИЛЬНО
setState({ ...state, items: [...state.items, newItem] });
setState({ ...state, count: state.count + 1 });
```

### 14. ЗАПРЕЩЕНО - Один язык
```typescript
// ❌ ЗАПРЕЩЕНО - только русский
const content = {
  rus: { title: "Заголовок" }
  // Нет узбекского!
};

// ✅ ПРАВИЛЬНО - оба языка
const content = {
  rus: { title: "Заголовок" },
  uzb: { title: "Sarlavha" }
};
```

### 15. ЗАПРЕЩЕНО - Использовать <img>
```typescript
// ❌ ЗАПРЕЩЕНО - для новых изображений
<img src={imageUrl} alt="..." />

// ✅ ПРАВИЛЬНО - ImageWithFallback
import { ImageWithFallback } from './components/figma/ImageWithFallback';
<ImageWithFallback src={imageUrl} alt="..." />
```

---

## 🎯 Специфичные правила проекта

### 1. Bottom Navigation (5 вкладок)
```typescript
// СТРОГИЙ ПОРЯДОК (не менять!)
1. IconHome         → /dashboard
2. IconWallet       → /transactions
3. IconCreditCard   → /cards
4. IconStar         → /savings
5. IconDotsVertical → /more
```

### 2. Градиенты для карт
```typescript
// ✅ ВСЕГДА использовать этот градиент
background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
```

### 3. Цветовая схема
```typescript
const projectColors = {
  primary: "#7c3aed",    // Фиолетовый (основной)
  income: "#22c55e",     // Зеленый (доход)
  expense: "#ff4757",    // Красный (расход)
  goal: "#f59e0b"        // Золотой (цели)
};
```

### 4. Иконки транзакций
```typescript
// СТРОГО использовать:
Доход  → IconPlus  (зеленая #22c55e)
Расход → IconMinus (красная #ff4757)
```

### 5. Название страницы "Цели"
```typescript
// ✅ ПРАВИЛЬНО
Название: "Цели" (не "Сбережения")
Иконка: IconStar
Роут: /savings
```

### 6. Модальные окна (Drawers)
```typescript
// 4 основных Drawer:
1. ProfileDrawer        - слева
2. NotificationsDrawer  - справа
3. AddCardDrawer        - снизу
4. AddGoalDrawer        - снизу
```

### 7. Размеры экрана
```typescript
// Базовый размер мобильного
width: 430px
height: 932px

// Адаптивность - пропорциональное масштабирование
```

---

## 🤖 Правила для AI инструментов

### 1. ПЕРЕД любым изменением файла:
```
1. ✅ ОБЯЗАТЕЛЬНО прочитать файл через read tool
2. ✅ Понять существующую структуру
3. ✅ Проверить аналогичные компоненты
4. ✅ Убедиться в соответствии правилам
5. ✅ Внести изменения
6. ✅ Проверить результат
```

### 2. ВСЕГДА использовать:
```
✅ useLanguage() - для любого текста
✅ useTheme() - для любых цветов
✅ TypeScript - для всего кода
✅ Tabler Icons - для всех иконок
✅ Motion - для анимаций
✅ navigate() - для навигации
```

### 3. НИКОГДА не использовать:
```
❌ Хардкод текста в JSX
❌ Хардкод цветов в стилях
❌ any типы (кроме крайних случаев)
❌ <a> для внутренней навигации
❌ Другие библиотеки иконок
❌ react-router-dom
❌ framer-motion
❌ Tailwind для шрифтов
```

### 4. При создании новой страницы:
```
1. ✅ Создать файл в /src/app/pages/
2. ✅ Использовать шаблон компонента (см. выше)
3. ✅ Добавить контент на русском И узбекском
4. ✅ Использовать colors из useTheme
5. ✅ Добавить роут в /src/app/routes.ts
6. ✅ Добавить BottomNav (если основная страница)
7. ✅ Проверить на обеих темах
```

### 5. При изменении существующей страницы:
```
1. ✅ СНАЧАЛА прочитать весь файл
2. ✅ Сохранить существующую структуру
3. ✅ Не удалять локализацию
4. ✅ Не менять систему тем
5. ✅ Сохранить все комментарии
6. ✅ Сохранить маркировку mock данных
```

### 6. При добавлении нового компонента:
```
1. ✅ Создать в /src/app/components/
2. ✅ Типизировать все props
3. ✅ Использовать useLanguage если есть текст
4. ✅ Использовать useTheme для цветов
5. ✅ Добавить комментарии для сложной логики
6. ✅ Экспортировать как named или default export
```

### 7. При работе с mock данными:
```
1. ✅ ОБЯЗАТЕЛЬНО помечать комментарием:
   // 🔄 MOCK DATA - TODO: Replace with API

2. ✅ Использовать правильную структуру данных
3. ✅ Добавлять реалистичные данные
4. ✅ Документировать формат API (в комментариях)
```

---

## 📋 Чек-лист для AI перед ответом

### Перед генерацией кода проверь:
- [ ] Прочитал существующий файл (если редактирование)
- [ ] Понял контекст и структуру
- [ ] Использую правильные импорты
- [ ] Все тексты в content объекте (rus + uzb)
- [ ] Все цвета через useTheme
- [ ] Иконки только из Tabler
- [ ] TypeScript типизация присутствует
- [ ] Нет any типов (или обоснованы)
- [ ] Навигация через navigate()
- [ ] Анимации через motion/react
- [ ] Mock данные помечены
- [ ] Структура компонента правильная
- [ ] Нет запрещенных практик

### После генерации кода проверь:
- [ ] Код соответствует всем правилам
- [ ] Нет критических ошибок
- [ ] Читаемость и понятность
- [ ] Комментарии для сложной логики
- [ ] Консистентность со стилем проекта

---

## 🚨 Критические ошибки (уровни)

### 🔴 УРОВЕНЬ 1 - Критичные (исправлять немедленно!)
```
1. Редактирование защищенных файлов
2. Хранение чувствительных данных в коде
3. XSS уязвимости (dangerouslySetInnerHTML)
4. Отсутствие типизации везде (any)
5. Хардкод текста без локализации
```

### 🟠 УРОВЕНЬ 2 - Важные (исправлять обязательно)
```
1. Неправильные иконки (не Tabler)
2. Хардкод цветов (не через useTheme)
3. Отсутствие перевода на узбекский
4. Неправильная навигация (<a> вместо navigate)
5. Немаркированные mock данные
```

### 🟡 УРОВЕНЬ 3 - Желательно исправить
```
1. Неоптимальные анимации
2. Неправильные скругления
3. Отсутствие комментариев
4. Плохие имена переменных
5. Дублирование кода
```

---

## 🎓 Примеры правильного кода

### Пример 1: Простая страница
```typescript
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { BottomNav } from "../components/BottomNav";
import { IconArrowLeft } from "@tabler/icons-react";

export default function SimplePage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();

  const content = {
    rus: {
      title: "Простая страница",
      description: "Это пример"
    },
    uzb: {
      title: "Oddiy sahifa",
      description: "Bu misol"
    }
  };

  return (
    <div 
      className="min-h-screen pb-20"
      style={{ backgroundColor: colors.background }}
    >
      {/* Header */}
      <div className="flex items-center p-6">
        <button onClick={() => navigate(-1)}>
          <IconArrowLeft size={24} color={colors.text} />
        </button>
        <h1 
          className="ml-4 text-2xl font-bold"
          style={{ color: colors.text }}
        >
          {content[language].title}
        </h1>
      </div>

      {/* Content */}
      <div className="px-6">
        <p style={{ color: colors.textSecondary }}>
          {content[language].description}
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
```

### Пример 2: Компонент с пропсами
```typescript
import { motion } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";
import { IconPlus, IconMinus } from "@tabler/icons-react";

interface TransactionItemProps {
  id: number;
  name: string;
  amount: number;
  type: "received" | "sent";
  date: string;
  onClick?: () => void;
}

export function TransactionItem({
  id,
  name,
  amount,
  type,
  date,
  onClick
}: TransactionItemProps) {
  const { colors } = useTheme();

  const isIncome = type === "received";
  const icon = isIncome ? IconPlus : IconMinus;
  const iconColor = isIncome ? "#22c55e" : "#ff4757";
  const Icon = icon;

  return (
    <motion.div
      className="flex items-center justify-between p-4 rounded-full mb-3"
      style={{ backgroundColor: colors.cardBackground }}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: iconColor + "20" }}
        >
          <Icon size={24} color={iconColor} />
        </div>
        
        <div>
          <p 
            className="font-medium"
            style={{ color: colors.text }}
          >
            {name}
          </p>
          <p 
            className="text-sm"
            style={{ color: colors.textSecondary }}
          >
            {date}
          </p>
        </div>
      </div>

      <p 
        className="font-bold"
        style={{ color: iconColor }}
      >
        {isIncome ? "+" : "-"}${amount.toFixed(2)}
      </p>
    </motion.div>
  );
}
```

### Пример 3: Mock данные
```typescript
// ========================================
// 🔄 MOCK DATA - TODO: Replace with API
// ========================================
// API endpoint: GET /api/transactions?category=all
// Response format:
// {
//   transactions: Transaction[],
//   total: number,
//   hasMore: boolean
// }
const mockTransactions: Transaction[] = [
  {
    id: 1,
    name: "Salary Payment",
    amount: 820.00,
    type: "received",
    date: "2024-03-08T10:30:00Z",
    category: "salary"
  },
  {
    id: 2,
    name: "Grocery Shopping",
    amount: 45.50,
    type: "sent",
    date: "2024-03-07T15:20:00Z",
    category: "food"
  }
];
```

---

## 📞 Что делать при сомнениях

### Если не уверен в правильности:
1. ✅ Проверь DEVELOPMENT_RULES.md
2. ✅ Посмотри примеры в существующих файлах
3. ✅ Изучи APP_OVERVIEW.md
4. ✅ Проверь PROJECT_STRUCTURE.md
5. ✅ Спроси пользователя

### Если нет информации:
1. ✅ Прочитай документацию проекта
2. ✅ Найди похожий код в проекте
3. ✅ Используй best practices
4. ✅ Спроси у пользователя

### Если конфликт правил:
1. ✅ Приоритет у DEVELOPMENT_RULES.md
2. ✅ Затем APP_OVERVIEW.md
3. ✅ Затем существующий код
4. ✅ Спроси у пользователя

---

## 🔄 Workflow для AI

### 1. Получение задачи от пользователя
```
↓
Понять контекст и требования
↓
Определить затрагиваемые файлы
↓
```

### 2. Чтение существующего кода
```
↓
Прочитать файлы через read tool
↓
Понять структуру и паттерны
↓
Найти похожие примеры
↓
```

### 3. Планирование изменений
```
↓
Составить план действий
↓
Проверить соответствие правилам
↓
Убедиться в безопасности
↓
```

### 4. Реализация
```
↓
Генерировать код по правилам
↓
Соблюдать структуру компонента
↓
Добавить локализацию
↓
Использовать темы
↓
Типизировать всё
↓
```

### 5. Проверка
```
↓
Проверить по чек-листу
↓
Убедиться в отсутствии ошибок
↓
Проверить читаемость
↓
```

### 6. Ответ пользователю
```
↓
Объяснить сделанные изменения
↓
Указать на важные моменты
↓
Предложить дальнейшие улучшения
↓
ГОТОВО
```

---

## 💡 Советы для эффективной работы

### 1. Всегда начинай с чтения
```
Не генерируй код сразу!
Сначала прочитай существующий файл.
```

### 2. Следуй паттернам проекта
```
Если видишь паттерн в других файлах - используй его.
Консистентность > личные предпочтения.
```

### 3. Не усложняй
```
Простое решение > сложное решение.
Если можно проще - делай проще.
```

### 4. Комментируй сложное
```
Если логика не очевидна - добавь комментарий.
Помоги будущим разработчикам.
```

### 5. Думай о локализации
```
Любой текст = два языка.
Нет исключений.
```

### 6. Думай о темах
```
Любой цвет = через useTheme.
Поддержка обеих тем обязательна.
```

---

## ✅ Финальный чек-лист для AI

Перед отправкой ответа пользователю:

### Код:
- [ ] Прочитал существующие файлы
- [ ] TypeScript везде (.tsx/.ts)
- [ ] Все props типизированы
- [ ] Нет any типов
- [ ] Структура компонента правильная
- [ ] Импорты правильные (react-router, motion/react)

### Локализация:
- [ ] Все тексты в content объекте
- [ ] Есть переводы на рус И узб
- [ ] Используется useLanguage

### Темы:
- [ ] Все цвета через useTheme
- [ ] Нет хардкода цветов
- [ ] Работает в светлой и темной теме

### Иконки и стили:
- [ ] Только Tabler Icons
- [ ] Правильные иконки (Plus/Minus для транзакций)
- [ ] Правильные скругления (rounded-full для списков)
- [ ] Нет Tailwind для шрифтов

### Навигация:
- [ ] Используется navigate()
- [ ] Нет <a> для внутренней навигации
- [ ] Правильные роуты

### Безопасность:
- [ ] Нет чувствительных данных
- [ ] Нет dangerouslySetInnerHTML
- [ ] Нет eval()
- [ ] Валидация данных

### Mock данные:
- [ ] Помечены комментарием 🔄 MOCK DATA
- [ ] Документирован формат API

### Общее:
- [ ] Нет критических ошибок (🔴)
- [ ] Нет важных ошибок (🟠)
- [ ] Код читаемый и понятный
- [ ] Следует best practices
- [ ] Консистентен с проектом

---

## 🎯 Примеры задач и правильные решения

### Задача 1: "Добавь новую страницу About"

**✅ ПРАВИЛЬНЫЙ подход:**
```
1. Прочитать похожие страницы (Dashboard.tsx, More.tsx)
2. Создать /src/app/pages/About.tsx
3. Использовать шаблон компонента
4. Добавить контент на рус + узб
5. Использовать useTheme для цветов
6. Добавить роут в routes.ts
7. Добавить BottomNav
8. Проверить на обеих темах
```

### Задача 2: "Измени цвет кнопки на красный"

**❌ НЕПРАВИЛЬНО:**
```typescript
<button style={{ backgroundColor: "#ff0000" }}>
```

**✅ ПРАВИЛЬНО:**
```typescript
const { colors } = useTheme();
// Использовать существующий цвет или добавить в ThemeContext
<button style={{ backgroundColor: "#ff4757" }}>
```

### Задача 3: "Добавь текст 'Привет'"

**❌ НЕПРАВИЛЬНО:**
```typescript
<h1>Привет</h1>
```

**✅ ПРАВИЛЬНО:**
```typescript
const content = {
  rus: { greeting: "Привет" },
  uzb: { greeting: "Salom" }
};
<h1>{content[language].greeting}</h1>
```

---

## 🚀 Заключение для AI

### Помни:
1. **Качество > Скорость** - лучше правильно, чем быстро
2. **Консистентность** - следуй существующим паттернам
3. **Локализация** - всегда два языка
4. **Типизация** - TypeScript везде
5. **Безопасность** - проверяй код на уязвимости
6. **Читаемость** - код должен быть понятным

### Твоя цель:
Генерировать код, который:
- ✅ Соответствует всем правилам
- ✅ Консистентен с проектом
- ✅ Безопасен и надежен
- ✅ Легко поддерживается
- ✅ Хорошо документирован

---

**Версия:** 1.0.0 MVP  
**Дата:** Март 2026  
**Статус:** Обязательно для всех AI ассистентов

<div align="center">

# ⚠️ ВСЕ ПРАВИЛА ОБЯЗАТЕЛЬНЫ ⚠️

**Следование этим правилам = качественный код = успешный проект**

</div>
