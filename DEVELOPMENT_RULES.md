# 📜 Правила разработки проекта

## 🎯 Общие принципы

Этот документ содержит **строгие правила** для разработки финтех мобильного приложения. Все разработчики и AI ассистенты **ОБЯЗАНЫ** следовать этим правилам.

---

## ✅ ЧТО МОЖНО ДЕЛАТЬ

### 1. Структура и организация кода

#### ✅ Файлы и папки
- ✅ Создавать новые страницы в `/src/app/pages/`
- ✅ Создавать компоненты в `/src/app/components/`
- ✅ Создавать контексты в `/src/app/contexts/`
- ✅ Добавлять стили в `/src/styles/`
- ✅ Использовать TypeScript (.tsx, .ts файлы)
- ✅ Создавать документацию в корне (*.md файлы)

#### ✅ Именование
- ✅ PascalCase для компонентов: `Dashboard.tsx`, `BottomNav.tsx`
- ✅ camelCase для функций: `handleClick`, `getUserData`
- ✅ kebab-case для CSS файлов: `theme.css`, `scrollbar.css`
- ✅ UPPERCASE для констант: `API_BASE_URL`, `MAX_RETRIES`
- ✅ Префиксы для boolean: `isOpen`, `hasError`, `shouldUpdate`
- ✅ Префиксы для обработчиков: `handle*`, `on*`

### 2. React компоненты

#### ✅ Структура компонента
```typescript
// ✅ ПРАВИЛЬНО
import { useState } from "react";
import { useNavigate } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

export default function ComponentName() {
  // 1. Hooks
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [state, setState] = useState();

  // 2. Константы
  const content = {
    rus: { title: "Заголовок" },
    uzb: { title: "Sarlavha" }
  };

  // 3. Функции
  const handleClick = () => { };

  // 4. Render
  return <div>{content[language].title}</div>;
}
```

#### ✅ Использование хуков
- ✅ `useLanguage()` для локализации
- ✅ `useTheme()` для темы оформления
- ✅ `useNavigate()` для навигации
- ✅ `useState()` для локального состояния
- ✅ `useEffect()` для side effects

#### ✅ Props и TypeScript
```typescript
// ✅ ПРАВИЛЬНО - всегда типизировать props
interface ButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ title, onClick, disabled = false }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{title}</button>;
}
```

### 3. Локализация

#### ✅ Двуязычный контент
```typescript
// ✅ ПРАВИЛЬНО
const content = {
  rus: {
    title: "Главная страница",
    description: "Добро пожаловать"
  },
  uzb: {
    title: "Asosiy sahifa",
    description: "Xush kelibsiz"
  }
};

<h1>{content[language].title}</h1>
```

#### ✅ Форматирование дат и времени
```typescript
// ✅ ПРАВИЛЬНО - локализация для обоих языков
const formatDate = (date: Date) => {
  const months = {
    rus: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
    uzb: ["yan", "fev", "mar", "apr", "may", "iyun", "iyul", "avg", "sen", "okt", "noy", "dek"]
  };
  // ...
};
```

### 4. Темы и стили

#### ✅ Использование темы
```typescript
// ✅ ПРАВИЛЬНО - использовать colors из useTheme
const { colors } = useTheme();

<div style={{ 
  backgroundColor: colors.background,
  color: colors.text 
}}>
  Content
</div>
```

#### ✅ Tailwind классы
- ✅ `rounded-full` для элементов списков (транзакции, карты)
- ✅ `rounded-2xl` для обычных карточек
- ✅ Использовать Tailwind для margin, padding, flexbox
- ✅ Использовать inline styles для динамических цветов

#### ✅ Цвета
```typescript
// ✅ ПРАВИЛЬНО - использовать корпоративные цвета
const colors = {
  primary: "#7c3aed",     // Фиолетовый
  income: "#22c55e",      // Зеленый
  expense: "#ff4757",     // Красный
  goal: "#f59e0b"         // Золотой
};
```

### 5. Иконки

#### ✅ Использование Tabler Icons
```typescript
// ✅ ПРАВИЛЬНО - всегда использовать Tabler Icons
import { 
  IconHome, 
  IconWallet, 
  IconPlus,   // Для доходов
  IconMinus,  // Для расходов
  IconStar    // Для целей
} from "@tabler/icons-react";

<IconHome size={24} color={colors.text} />
```

### 6. Анимации

#### ✅ Использование Motion
```typescript
// ✅ ПРАВИЛЬНО - плавные анимации
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

### 7. Навигация

#### ✅ React Router
```typescript
// ✅ ПРАВИЛЬНО
import { useNavigate } from "react-router";

const navigate = useNavigate();
navigate('/dashboard');
navigate(-1); // Назад
```

### 8. Mock данные

#### ✅ Маркировка mock данных
```typescript
// ✅ ПРАВИЛЬНО - всегда помечать mock данные
// ========================================
// 🔄 MOCK DATA - TODO: Replace with API
// ========================================
const mockTransactions = [
  // ...
];
```

### 9. Комментарии

#### ✅ Полезные комментарии
```typescript
// ✅ ПРАВИЛЬНО - объяснять сложную логику
// Проверяем, достигнута ли цель (100%)
if (saved >= target) {
  markAsCompleted();
}

// ✅ TODO заметки
// TODO: Добавить валидацию email
// TODO: Подключить к API

// ✅ Секции кода
// ========================================
// Header Section
// ========================================
```

### 10. Безопасность

#### ✅ Безопасные практики
- ✅ Валидировать все пользовательские данные
- ✅ Использовать environment variables для API keys
- ✅ Не хранить чувствительные данные в localStorage
- ✅ Использовать HTTPS в production
- ✅ XSS защита (React автоматически)

---

## ❌ ЧТО НЕЛЬЗЯ ДЕЛАТЬ

### 1. Запрещенные действия с файлами

#### ❌ Защищенные файлы
```typescript
// ❌ ЗАПРЕЩЕНО - НЕ редактировать и НЕ удалять
/src/app/components/figma/ImageWithFallback.tsx
/pnpm-lock.yaml
```

#### ❌ Неправильная структура
```typescript
// ❌ ЗАПРЕЩЕНО - создавать файлы вне структуры
/components/MyComponent.tsx  // Неправильно!
/MyPage.tsx                  // Неправильно!

// ✅ ПРАВИЛЬНО
/src/app/components/MyComponent.tsx
/src/app/pages/MyPage.tsx
```

#### ❌ Неправильные расширения
```typescript
// ❌ ЗАПРЕЩЕНО - использовать .js или .jsx
MyComponent.js   // Неправильно!
MyComponent.jsx  // Неправильно!

// ✅ ПРАВИЛЬНО - только TypeScript
MyComponent.tsx  // Правильно!
MyComponent.ts   // Правильно!
```

### 2. Запрещенные практики в React

#### ❌ Нетипизированный код
```typescript
// ❌ ЗАПРЕЩЕНО - код без типов
function Button(props) {  // Неправильно!
  return <button>{props.title}</button>;
}

// ✅ ПРАВИЛЬНО
interface ButtonProps {
  title: string;
}
function Button({ title }: ButtonProps) {
  return <button>{title}</button>;
}
```

#### ❌ Мутация состояния
```typescript
// ❌ ЗАПРЕЩЕНО - прямая мутация
state.items.push(newItem);  // Неправильно!

// ✅ ПРАВИЛЬНО - создавать новый массив
setState({ ...state, items: [...state.items, newItem] });
```

#### ❌ Неправильные ключи в списках
```typescript
// ❌ ЗАПРЕЩЕНО - использовать индексы как ключи
{items.map((item, index) => (
  <div key={index}>{item.name}</div>  // Неправильно!
))}

// ✅ ПРАВИЛЬНО - использовать уникальные ID
{items.map((item) => (
  <div key={item.id}>{item.name}</div>
))}
```

### 3. Запрещенные практики локализации

#### ❌ Хардкод текста
```typescript
// ❌ ЗАПРЕЩЕНО - текст напрямую в JSX
<h1>Главная страница</h1>  // Неправильно!

// ✅ ПРАВИЛЬНО - через content объект
const content = {
  rus: { title: "Главная страница" },
  uzb: { title: "Asosiy sahifa" }
};
<h1>{content[language].title}</h1>
```

#### ❌ Отсутствие перевода
```typescript
// ❌ ЗАПРЕЩЕНО - только один язык
const content = {
  rus: { title: "Заголовок" }
  // Отсутствует uzb!
};

// ✅ ПРАВИЛЬНО - оба языка
const content = {
  rus: { title: "Заголовок" },
  uzb: { title: "Sarlavha" }
};
```

### 4. Запрещенные практики стилизации

#### ❌ Хардкод цветов
```typescript
// ❌ ЗАПРЕЩЕНО - хардкод цветов напрямую
<div style={{ backgroundColor: "#0f1420" }}>  // Неправильно!

// ✅ ПРАВИЛЬНО - через useTheme
const { colors } = useTheme();
<div style={{ backgroundColor: colors.background }}>
```

#### ❌ Использование font классов Tailwind
```typescript
// ❌ ЗАПРЕЩЕНО - НЕ использовать Tailwind для шрифтов
className="text-2xl font-bold leading-none"  // Неправильно!

// ✅ ПРАВИЛЬНО - использовать стили из theme.css
// Или inline стили для кастомных случаев
style={{ fontSize: '24px', fontWeight: 600 }}
```

#### ❌ Неправильные скругления
```typescript
// ❌ ЗАПРЕЩЕНО - обычные скругления для списков
className="rounded-lg"  // Неправильно для транзакций!

// ✅ ПРАВИЛЬНО - полные скругления для списков
className="rounded-full"  // Для транзакций, карт в списке
```

### 5. Запрещенные практики с иконками

#### ❌ Использование других библиотек иконок
```typescript
// ❌ ЗАПРЕЩЕНО - другие иконки
import { FaHome } from "react-icons/fa";  // Неправильно!
import HomeIcon from "@mui/icons-material/Home";  // Неправильно!

// ✅ ПРАВИЛЬНО - только Tabler Icons
import { IconHome } from "@tabler/icons-react";
```

#### ❌ Неправильные иконки для транзакций
```typescript
// ❌ ЗАПРЕЩЕНО - использовать другие иконки
<IconArrowUp />   // Неправильно для доходов!
<IconArrowDown /> // Неправильно для расходов!

// ✅ ПРАВИЛЬНО - Plus/Minus
<IconPlus />   // Для доходов (зеленая)
<IconMinus />  // Для расходов (красная)
```

### 6. Запрещенные практики навигации

#### ❌ HTML ссылки
```typescript
// ❌ ЗАПРЕЩЕНО - использовать <a> для внутренней навигации
<a href="/dashboard">Dashboard</a>  // Неправильно!

// ✅ ПРАВИЛЬНО - использовать navigate
const navigate = useNavigate();
<button onClick={() => navigate('/dashboard')}>
```

#### ❌ Полная перезагрузка страницы
```typescript
// ❌ ЗАПРЕЩЕНО - перезагрузка страницы
window.location.href = "/dashboard";  // Неправильно!

// ✅ ПРАВИЛЬНО - SPA навигация
navigate('/dashboard');
```

### 7. Запрещенные практики с данными

#### ❌ Не помечать mock данные
```typescript
// ❌ ЗАПРЕЩЕНО - mock данные без комментария
const transactions = [
  { id: 1, amount: 100 }
];

// ✅ ПРАВИЛЬНО - с комментарием
// 🔄 MOCK DATA - TODO: Replace with API
const transactions = [
  { id: 1, amount: 100 }
];
```

#### ❌ Хранение чувствительных данных
```typescript
// ❌ ЗАПРЕЩЕНО - хранить в коде
const API_KEY = "sk_live_abc123";  // Неправильно!
const PASSWORD = "mypassword";     // Неправильно!

// ✅ ПРАВИЛЬНО - использовать env variables
const API_KEY = import.meta.env.VITE_API_KEY;
```

### 8. Запрещенные практики импортов

#### ❌ Неправильные импорты изображений
```typescript
// ❌ ЗАПРЕЩЕНО - неправильный путь для figma:asset
import img from "./figma:asset/abc123.png";     // Неправильно!
import img from "../figma:asset/abc123.png";    // Неправильно!

// ✅ ПРАВИЛЬНО - без префикса пути
import img from "figma:asset/abc123.png";
```

#### ❌ Неправильные импорты SVG
```typescript
// ❌ ЗАПРЕЩЕНО - создавать свои SVG вместо импорта
const MySvg = () => <svg>...</svg>;  // Неправильно!

// ✅ ПРАВИЛЬНО - использовать импортированные SVG
import svgPaths from "../imports/svg-wg56ef214f";
```

#### ❌ Использование react-router-dom
```typescript
// ❌ ЗАПРЕЩЕНО - react-router-dom не работает
import { useNavigate } from "react-router-dom";  // Неправильно!

// ✅ ПРАВИЛЬНО - только react-router
import { useNavigate } from "react-router";
```

### 9. Запрещенные практики с компонентами

#### ❌ Использование <img> вместо ImageWithFallback
```typescript
// ❌ ЗАПРЕЩЕНО - для новых изображений
<img src={imageUrl} alt="..." />  // Неправильно!

// ✅ ПРАВИЛЬНО - использовать ImageWithFallback
import { ImageWithFallback } from './components/figma/ImageWithFallback';
<ImageWithFallback src={imageUrl} alt="..." />
```

#### ❌ Копирование защищенных компонентов
```typescript
// ❌ ЗАПРЕЩЕНО - создавать свою версию
/src/app/components/MyImageWithFallback.tsx  // Неправильно!

// ✅ ПРАВИЛЬНО - использовать существующий
import { ImageWithFallback } from './components/figma/ImageWithFallback';
```

### 10. Запрещенные практики безопасности

#### ❌ Опасные операции
```typescript
// ❌ ЗАПРЕЩЕНО - dangerouslySetInnerHTML без санитизации
<div dangerouslySetInnerHTML={{ __html: userInput }} />  // Неправильно!

// ❌ ЗАПРЕЩЕНО - eval()
eval(userCode);  // Неправильно!

// ❌ ЗАПРЕЩЕНО - хранение токенов в localStorage
localStorage.setItem('token', jwtToken);  // Неправильно!

// ✅ ПРАВИЛЬНО - httpOnly cookies или sessionStorage
```

### 11. Запрещенные практики с пакетами

#### ❌ Установка без install_package
```typescript
// ❌ ЗАПРЕЩЕНО - прямое редактирование package.json
// Неправильно!

// ✅ ПРАВИЛЬНО - использовать install_package
// Через команду или инструмент
```

#### ❌ Использование неподдерживаемых пакетов
```typescript
// ❌ ЗАПРЕЩЕНО - konva, react-resizable
import Konva from "konva";  // Не поддерживается!
import { Resizable } from "react-resizable";  // Не поддерживается!

// ✅ ПРАВИЛЬНО - альтернативы
// Использовать canvas напрямую
// Использовать re-resizable
```

### 12. Запрещенные практики анимаций

#### ❌ Старое название библиотеки
```typescript
// ❌ ЗАПРЕЩЕНО - старое название
import { motion } from "framer-motion";  // Неправильно!

// ✅ ПРАВИЛЬНО - новое название
import { motion } from "motion/react";
```

### 13. Запрещенные практики документации

#### ❌ Создание ненужной документации
```typescript
// ❌ ЗАПРЕЩЕНО - создавать без запроса
// CONTRIBUTING.md (без запроса)
// CHANGELOG.md (без запроса)

// ✅ ПРАВИЛЬНО - только по запросу или необходимости
```

#### ❌ Использование эмодзи без запроса
```typescript
// ❌ ЗАПРЕЩЕНО - эмодзи в коде без запроса
const message = "Hello! 👋";  // Неправильно (если не запрошено)!

// ✅ ПРАВИЛЬНО - только в документации или по запросу
```

---

## 🎯 Особые правила проекта

### 1. Базовый размер экрана
- **Базовый размер:** 430x932px (мобильный)
- **Адаптивность:** Пропорциональное масштабирование
- **Desktop:** Центрирование с max-width

### 2. Градиенты для карт
```typescript
// ✅ Всегда использовать фиолетово-синий градиент
background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
```

### 3. Иконки транзакций
- **Доход:** IconPlus (зеленая #22c55e)
- **Расход:** IconMinus (красная #ff4757)

### 4. Страница "Цели"
- **Название:** "Цели" (не "Сбережения")
- **Иконка:** IconStar (звезда)
- **Роут:** `/savings`

### 5. Bottom Navigation
**5 вкладок (в порядке):**
1. IconHome - Главная (`/dashboard`)
2. IconWallet - Транзакции (`/transactions`)
3. IconCreditCard - Карты (`/cards`)
4. IconStar - Цели (`/savings`)
5. IconDotsVertical - Еще (`/more`)

### 6. Скругления
- **Списки транзакций/карт:** `rounded-full`
- **Обычные карточки:** `rounded-2xl`
- **Кнопки:** `rounded-full`

### 7. Модальные окна
**4 основных Drawer:**
- ProfileDrawer (слева)
- NotificationsDrawer (справа)
- AddCardDrawer (снизу)
- AddGoalDrawer (снизу)

---

## 📋 Чек-лист перед коммитом

### ✅ Код
- [ ] Весь код на TypeScript (.tsx/.ts)
- [ ] Все props типизированы
- [ ] Нет any типов (кроме особых случаев)
- [ ] Используется useLanguage для текстов
- [ ] Используется useTheme для цветов
- [ ] Все иконки из Tabler Icons
- [ ] Mock данные помечены комментарием

### ✅ Локализация
- [ ] Все тексты в content объекте
- [ ] Есть переводы на русский И узбекский
- [ ] Даты/время локализованы

### ✅ Стили
- [ ] Цвета через useTheme
- [ ] Правильные скругления (rounded-full для списков)
- [ ] Не используются Tailwind классы для шрифтов
- [ ] Градиенты карт правильные

### ✅ Компоненты
- [ ] BottomNav на всех основных страницах
- [ ] Анимации через Motion
- [ ] ImageWithFallback для новых изображений
- [ ] Нет дублирования защищенных компонентов

### ✅ Навигация
- [ ] Используется navigate() а не <a>
- [ ] Правильные роуты в routes.ts
- [ ] Нет полных перезагрузок страницы

### ✅ Безопасность
- [ ] Нет чувствительных данных в коде
- [ ] Нет dangerouslySetInnerHTML
- [ ] Валидация пользовательских данных

### ✅ Документация
- [ ] Комментарии для сложной логики
- [ ] TODO заметки где нужно
- [ ] Mock данные помечены

---

## 🚨 Критические ошибки (немедленно исправлять)

### 🔴 Уровень 1 - Критичные
1. **Редактирование защищенных файлов**
2. **Отсутствие типизации** (any везде)
3. **Хардкод чувствительных данных** (API keys, пароли)
4. **XSS уязвимости** (dangerouslySetInnerHTML)
5. **Хардкод текста** (не через content объект)

### 🟠 Уровень 2 - Важные
1. **Неправильные иконки** (не Tabler)
2. **Неправильные цвета** (не через useTheme)
3. **Отсутствие локализации** (только русский)
4. **Неправильная навигация** (<a> вместо navigate)
5. **Немаркированные mock данные**

### 🟡 Уровень 3 - Желательно исправить
1. **Неоптимальные анимации**
2. **Неправильные скругления**
3. **Отсутствие комментариев**
4. **Плохие имена переменных**
5. **Дублирование кода**

---

## 📞 Что делать при сомнениях

1. **Проверить документацию:**
   - README.md
   - APP_OVERVIEW.md
   - PROJECT_STRUCTURE.md
   - QUICK_START.md

2. **Посмотреть примеры:**
   - Dashboard.tsx
   - Transactions.tsx
   - BottomNav.tsx

3. **Проверить существующий код:**
   - Как реализовано в других компонентах?
   - Есть ли аналогичная функция?

4. **Спросить:**
   - У команды
   - В документации проекта

---

## 🎓 Ресурсы для изучения

### Официальная документация
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tabler Icons](https://tabler.io/icons)
- [Motion](https://motion.dev/)

### Внутренняя документация
- [QUICK_START.md](./QUICK_START.md)
- [APP_OVERVIEW.md](./APP_OVERVIEW.md)
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- [MVP_BACKEND_GUIDE.md](./MVP_BACKEND_GUIDE.md)

---

## ✅ Финальный чек-лист

**Перед созданием Pull Request убедись:**

- [ ] Код следует всем правилам из этого документа
- [ ] Прошел все чек-листы
- [ ] Нет критических ошибок
- [ ] Протестировано на русском и узбекском
- [ ] Протестировано в светлой и темной теме
- [ ] Протестировано на мобильном размере (430x932)
- [ ] Нет console.log в production коде
- [ ] Нет закомментированного кода
- [ ] Документация обновлена (если нужно)

---

**Дата создания:** Март 2026  
**Версия:** 1.0.0 MVP  
**Статус:** Обязательно к исполнению

<div align="center">

**Соблюдение этих правил = качественный код = успешный MVP** 🚀

</div>
