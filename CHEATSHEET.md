# 📝 Шпаргалка разработчика

Быстрый справочник по проекту для ежедневной работы.

---

## 🚀 Команды

```bash
npm run dev      # Запуск dev сервера (http://localhost:5173)
npm run build    # Production сборка
npm run preview  # Preview production
npm run lint     # Проверка кода

# Поиск
grep -r "🔄 MOCK DATA" src/     # Найти все mock данные
grep -r "useLanguage" src/       # Найти использование языка
grep -r "TODO" src/              # Найти все TODO
```

---

## 🎯 Структура (где что лежит)

```
src/app/pages/         👉 Все 21 страница
src/app/components/    👉 Компоненты (BottomNav, Drawers)
src/app/contexts/      👉 LanguageContext, ThemeContext
src/app/routes.ts      👉 Все роуты
src/styles/            👉 CSS файлы
```

---

## 🌐 Локализация (двуязычность)

```typescript
import { useLanguage } from "../contexts/LanguageContext";

const { language, setLanguage } = useLanguage();

const content = {
  rus: { title: "Главная" },
  uzb: { title: "Asosiy" }
};

<h1>{content[language].title}</h1>
```

**Всегда переводить на оба языка!**

---

## 🎨 Тема (светлая/темная)

```typescript
import { useTheme } from "../contexts/ThemeContext";

const { theme, setTheme, colors } = useTheme();

<div style={{ backgroundColor: colors.background }}>
  <p style={{ color: colors.text }}>Text</p>
</div>
```

**Цвета только через useTheme!**

---

## 🧭 Навигация

```typescript
import { useNavigate } from "react-router";

const navigate = useNavigate();

navigate('/dashboard');    // На страницу
navigate(-1);             // Назад
```

**НЕ использовать <a> для внутренней навигации!**

---

## 🎨 Цвета проекта

```typescript
const colors = {
  primary: "#7c3aed",    // Фиолетовый (основной)
  income: "#22c55e",     // Зеленый (доход)
  expense: "#ff4757",    // Красный (расход)
  goal: "#f59e0b"        // Золотой (цели)
};
```

---

## 🔷 Иконки (только Tabler)

```typescript
import { 
  IconHome,         // Главная
  IconWallet,       // Транзакции
  IconCreditCard,   // Карты
  IconStar,         // Цели
  IconPlus,         // Доход (зеленая)
  IconMinus,        // Расход (красная)
  IconChartPie      // Статистика
} from "@tabler/icons-react";

<IconHome size={24} color={colors.text} />
```

**Ссылка:** https://tabler.io/icons

---

## 🎬 Анимации

```typescript
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

---

## 📐 Скругления

```typescript
// Списки (транзакции, карты)
className="rounded-full"

// Обычные карточки
className="rounded-2xl"

// Кнопки
className="rounded-full"
```

---

## 📱 Основные роуты

```typescript
/                    → Onboarding (выбор языка)
/login              → TelegramLogin
/dashboard          → Dashboard (главная)
/transactions       → Transactions (+ фильтры)
/statistics         → Statistics (новая страница)
/cards              → CardSettings
/savings            → Savings (цели)
/more               → More (сервисы)
/profile-settings   → ProfileSettings
/security           → Security
/about              → About
```

**Всего 21 страница** - см. [APP_OVERVIEW.md](./APP_OVERVIEW.md)

---

## 🧩 Bottom Navigation (5 вкладок)

```typescript
IconHome          → /dashboard
IconWallet        → /transactions
IconCreditCard    → /cards
IconStar          → /savings
IconDotsVertical  → /more
```

---

## 🗂️ Шаблон новой страницы

```typescript
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { BottomNav } from "../components/BottomNav";

export default function MyPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();

  const content = {
    rus: { title: "Моя страница" },
    uzb: { title: "Mening sahifam" }
  };

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

---

## 🔄 Mock данные (помечать!)

```typescript
// ========================================
// 🔄 MOCK DATA - TODO: Replace with API
// ========================================
const transactions = [
  { id: 1, amount: 100 }
];
```

---

## ✅ DO (делать)

- ✅ TypeScript везде (.tsx, .ts)
- ✅ Типизировать props
- ✅ useLanguage для текстов
- ✅ useTheme для цветов
- ✅ Tabler Icons для иконок
- ✅ Motion для анимаций
- ✅ navigate() для навигации
- ✅ Помечать mock данные
- ✅ Переводить на рус + узб
- ✅ BottomNav на основных страницах

---

## ❌ DON'T (не делать)

- ❌ Хардкод текста в JSX
- ❌ Хардкод цветов напрямую
- ❌ <a> для внутренней навигации
- ❌ Другие иконки (не Tabler)
- ❌ .js или .jsx файлы
- ❌ any типы
- ❌ Редактировать ImageWithFallback.tsx
- ❌ react-router-dom (использовать react-router)
- ❌ framer-motion (использовать motion/react)
- ❌ Tailwind для font-size, font-weight

---

## 🎯 Градиент для карт

```typescript
background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
```

---

## 📊 Типы транзакций

```typescript
type: "received" | "sent"

// Иконки
received → IconPlus (зеленая)
sent     → IconMinus (красная)
```

---

## 📦 Импорты

```typescript
// Изображения Figma
import img from "figma:asset/abc123.png";  // БЕЗ ./ или ../

// SVG из Figma
import svgPaths from "../imports/svg-wg56ef214f";

// Компоненты
import { BottomNav } from "../components/BottomNav";
import { useLanguage } from "../contexts/LanguageContext";
```

---

## 🔐 Защищенные файлы (НЕ трогать!)

```
/src/app/components/figma/ImageWithFallback.tsx
/pnpm-lock.yaml
```

---

## 📝 Комментарии

```typescript
// TODO: Добавить валидацию
// FIXME: Исправить баг с...
// NOTE: Важное замечание

// ========================================
// Section Title
// ========================================

// 🔄 MOCK DATA - TODO: Replace with API
```

---

## 🧪 Типичные ошибки

| Ошибка | Исправление |
|--------|------------|
| `<h1>Заголовок</h1>` | `<h1>{content[language].title}</h1>` |
| `backgroundColor: "#0f1420"` | `backgroundColor: colors.background` |
| `<a href="/page">` | `navigate('/page')` |
| `import { IconHome } from "react-icons"` | `from "@tabler/icons-react"` |
| `import { motion } from "framer-motion"` | `from "motion/react"` |
| `className="text-2xl"` | `style={{ fontSize: '24px' }}` |

---

## 🔍 Полезные поиски

```bash
# Найти все страницы
ls src/app/pages/

# Найти все компоненты
ls src/app/components/

# Найти mock данные
grep -r "🔄 MOCK DATA" src/

# Найти TODO
grep -r "TODO" src/

# Найти использование хука
grep -r "useLanguage" src/
```

---

## 📚 Документация (по важности)

1. **QUICK_START.md** - Начать отсюда (10 мин)
2. **DEVELOPMENT_RULES.md** - Правила (обязательно!)
3. **APP_OVERVIEW.md** - Все страницы и функции
4. **PROJECT_STRUCTURE.md** - Структура проекта
5. **README.md** - Общая информация

---

## 🎓 Контекст API

```typescript
// Language
const { 
  language,      // "rus" | "uzb"
  setLanguage    // (lang: "rus" | "uzb") => void
} = useLanguage();

// Theme
const { 
  theme,         // "light" | "dark"
  setTheme,      // (theme: "light" | "dark") => void
  colors: {
    background,
    cardBackground,
    text,
    textSecondary,
    border
  }
} = useTheme();
```

---

## 🔢 Статистика проекта

- **Страниц:** 21
- **Языков:** 2 (рус/узб)
- **Тем:** 2 (светлая/темная)
- **Компонентов:** ~60+
- **Роутов:** 21+
- **Иконок:** Tabler Icons
- **Базовый размер:** 430x932px

---

## 💡 Tips & Tricks

1. **Используй snippets** для быстрого создания компонентов
2. **Проверяй обе темы** перед коммитом
3. **Тестируй на обоих языках** 
4. **Используй console.log аккуратно** (удалять в production)
5. **Следуй структуре компонента** из DEVELOPMENT_RULES.md
6. **Смотри примеры** в Dashboard.tsx, Transactions.tsx

---

## 🆘 SOS (частые вопросы)

**Q: Как добавить новую страницу?**  
A: См. раздел "Шаблон новой страницы" выше + добавить в routes.ts

**Q: Как изменить язык программно?**  
A: `setLanguage('uzb')` или `setLanguage('rus')`

**Q: Где найти mock данные?**  
A: `grep -r "🔄 MOCK DATA" src/`

**Q: Как добавить перевод?**  
A: Добавить ключ в content.rus и content.uzb

**Q: Почему не работают стили?**  
A: Проверь, используешь ли colors из useTheme

---

## ⚡ Быстрый старт нового дня

```bash
# 1. Обновить код
git pull

# 2. Установить зависимости (если нужно)
npm install

# 3. Запустить
npm run dev

# 4. Открыть
http://localhost:5173
```

---

**Распечатай и держи под рукой!** 📌

<div align="center">

[📚 Полная документация](./README.md) | [⚡ Quick Start](./QUICK_START.md) | [📜 Правила](./DEVELOPMENT_RULES.md)

</div>
