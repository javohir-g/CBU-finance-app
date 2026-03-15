import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { transactionsService, Transaction } from "../api/services/transactions.service";
import { BottomNav } from "../components/BottomNav";
import { IconPlus, IconMinus, IconShoppingCart, IconHome, IconCar, IconDevices, IconCoffee, IconBriefcase, IconGift, IconHeart, IconChartPie, IconX, IconFilter, IconWallet, IconCalendar, IconChevronDown } from "@tabler/icons-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function Transactions() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [filterCategory, setFilterCategory] = useState<"all" | "income" | "expense">("all");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "week" | "month" | "year">("all");
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch transactions with filters
  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const response = await transactionsService.getTransactions({
          category: filterCategory,
          date_filter: dateFilter
        });
        setTransactions(response.transactions);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, [filterCategory, dateFilter]);

  const content = {
    rus: {
      title: "Транзакции",
      all: "Все",
      income: "Доход",
      expense: "Расход",
      statistics: "Статистика",
      categories: "Категории",
      totalIncome: "Доходы",
      totalExpense: "Расходы",
      // Date filters
      allTime: "Всё время",
      today: "Сегодня",
      thisWeek: "Эта неделя",
      thisMonth: "Этот месяц",
      thisYear: "Этот год",
      selectPeriod: "Выбрать период",
      // Categories
      shopping: "Покупки",
      housing: "Жильё",
      transport: "Транспорт",
      entertainment: "Развлечения",
      food: "Еда",
      salary: "Зарплата",
      freelance: "Фриланс",
      gifts: "Подарки"
    },
    uzb: {
      title: "Tranzaksiyalar",
      all: "Hammasi",
      income: "Daromad",
      expense: "Xarajat",
      statistics: "Statistika",
      categories: "Kategoriyalar",
      totalIncome: "Daromadlar",
      totalExpense: "Xarajatlar",
      // Date filters
      allTime: "Barcha vaqt",
      today: "Bugun",
      thisWeek: "Shu hafta",
      thisMonth: "Shu oy",
      thisYear: "Shu yil",
      selectPeriod: "Davr tanlash",
      // Categories
      shopping: "Xaridlar",
      housing: "Uy-joy",
      transport: "Transport",
      entertainment: "Ko'ngil ochar",
      food: "Ovqat",
      salary: "Maosh",
      freelance: "Frilanser",
      gifts: "Sovg'alar"
    }
  };

  const dateFilterOptions = [
    { value: "all", label: content[language].allTime },
    { value: "today", label: content[language].today },
    { value: "week", label: content[language].thisWeek },
    { value: "month", label: content[language].thisMonth },
    { value: "year", label: content[language].thisYear },
  ];

  // Calculate statistics from current transactions
  const expenseTransactions = transactions.filter(t => t.type === "sent");
  const incomeTransactions = transactions.filter(t => t.type === "received");

  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

  const categoryIcons: Record<string, any> = {
    shopping: IconShoppingCart,
    housing: IconHome,
    transport: IconCar,
    entertainment: IconDevices,
    food: IconCoffee,
    salary: IconBriefcase,
    freelance: IconDevices,
    gifts: IconGift
  };

  const categoryColors: Record<string, string> = {
    shopping: "#7c3aed",
    housing: "#3b82f6",
    transport: "#f59e0b",
    entertainment: "#ec4899",
    food: "#22c55e",
    salary: "#22c55e",
    freelance: "#7c3aed",
    gifts: "#ec4899"
  };

  const getExpensesByCategory = () => {
    const categories: Record<string, number> = {};
    expenseTransactions.forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    });
    return Object.entries(categories).map(([name, value]) => ({
      name: content[language][name as keyof typeof content["rus"]] || name,
      value,
      color: categoryColors[name] || "#7c3aed",
      icon: categoryIcons[name] || IconShoppingCart
    }));
  };

  const getIncomeByCategory = () => {
    const categories: Record<string, number> = {};
    incomeTransactions.forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    });
    return Object.entries(categories).map(([name, value]) => ({
      name: content[language][name as keyof typeof content["rus"]] || name,
      value,
      color: categoryColors[name] || "#22c55e",
      icon: categoryIcons[name] || IconBriefcase
    }));
  };

  const expenseCategories = getExpensesByCategory();
  const incomeCategories = getIncomeByCategory();

  return (
    <div className="min-h-screen w-full pb-32 overflow-x-hidden" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <motion.div
        className="flex items-center justify-between px-[20px] py-[15px]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-11" />
        <h1 className="text-xl font-semibold" style={{ color: colors.text }}>{content[language].title}</h1>
        <button
          onClick={() => navigate('/statistics', { state: { filterCategory, dateFilter } })}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95"
          style={{ backgroundColor: colors.cardBackground }}
          id="stats-button"
        >
          <IconChartPie size={22} style={{ color: colors.text }} />
        </button>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        className="px-6 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        id="filter-tabs"
      >
        <div className="flex gap-2 mb-3">
          <button
            className="px-6 py-2.5 rounded-full font-medium text-sm transition-colors"
            style={{
              backgroundColor: filterCategory === "all" ? "#7c3aed" : colors.cardBackground,
              color: filterCategory === "all" ? "#ffffff" : colors.textSecondary
            }}
            onClick={() => setFilterCategory("all")}
          >
            {content[language].all}
          </button>
          <button
            className="px-6 py-2.5 rounded-full font-medium text-sm transition-colors"
            style={{
              backgroundColor: filterCategory === "income" ? "#7c3aed" : colors.cardBackground,
              color: filterCategory === "income" ? "#ffffff" : colors.textSecondary
            }}
            onClick={() => setFilterCategory("income")}
          >
            {content[language].income}
          </button>
          <button
            className="px-6 py-2.5 rounded-full font-medium text-sm transition-colors"
            style={{
              backgroundColor: filterCategory === "expense" ? "#7c3aed" : colors.cardBackground,
              color: filterCategory === "expense" ? "#ffffff" : colors.textSecondary
            }}
            onClick={() => setFilterCategory("expense")}
          >
            {content[language].expense}
          </button>
        </div>

        {/* Date Filter Button */}
        <button
          onClick={() => setIsDateFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm transition-all active:scale-95"
          style={{
            backgroundColor: dateFilter !== "all" ? "#7c3aed20" : colors.cardBackground,
            color: dateFilter !== "all" ? "#7c3aed" : colors.textSecondary
          }}
        >
          <IconCalendar size={18} />
          {dateFilterOptions.find(opt => opt.value === dateFilter)?.label}
          <IconChevronDown size={16} />
        </button>
      </motion.div>

      {/* Transactions List */}
      <motion.div
        className="px-[15px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        id="transactions-list"
      >
        <div className="space-y-2.5">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse h-16 rounded-full w-full" style={{ backgroundColor: colors.cardBackground }}></div>
            ))
          ) : transactions.length > 0 ? (
            transactions.map((transaction) => {
              const formattedDate = new Date(transaction.created_at).toLocaleDateString(language === "rus" ? 'ru-RU' : 'uz-UZ', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={transaction.id}
                  className="rounded-full p-3.5 flex items-center justify-between transition-colors cursor-pointer"
                  style={{ backgroundColor: colors.cardBackground }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={transaction.recipient_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(transaction.recipient_name)}&background=random`}
                      alt={transaction.recipient_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm" style={{ color: colors.text }}>{transaction.recipient_name}</p>
                      <p className="text-xs" style={{ color: colors.textSecondary }}>{formattedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <p className="font-bold text-base" style={{ color: colors.text }}>
                      {transaction.amount.toLocaleString()} som
                    </p>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${transaction.type === 'received'
                        ? 'bg-[#22c55e]'
                        : 'bg-[#ff4757]'
                        }`}
                    >
                      {transaction.type === 'received' ? (
                        <IconPlus size={18} className="text-white" />
                      ) : (
                        <IconMinus size={18} className="text-white" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${colors.text}08` }}>
                <IconWallet size={40} style={{ color: colors.textSecondary }} />
              </div>
              <p className="text-lg font-semibold mb-1" style={{ color: colors.text }}>
                {language === "rus" ? "Транзакций не найдено" : "Tranzaksiyalar topilmadi"}
              </p>
              <p className="text-sm px-8" style={{ color: colors.textSecondary }}>
                {language === "rus"
                  ? "Попробуйте изменить параметры фильтра или совершите свою первую транзакцию"
                  : "Filtr parametrlarini o'zgartirib ko'ring yoki birinchi tranzaksiyangizni amalga oshiring"}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Date Filter Modal */}
      {isDateFilterOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsDateFilterOpen(false)}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full rounded-t-3xl overflow-hidden"
            style={{ backgroundColor: colors.background }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b" style={{ borderColor: colors.cardBackground }}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold" style={{ color: colors.text }}>
                  {content[language].selectPeriod}
                </h2>
                <button
                  onClick={() => setIsDateFilterOpen(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95"
                  style={{ backgroundColor: colors.cardBackground }}
                >
                  <IconX size={20} style={{ color: colors.text }} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4 pb-8">
              <div className="space-y-2">
                {dateFilterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setDateFilter(option.value as any);
                      setIsDateFilterOpen(false);
                    }}
                    className="w-full px-5 py-4 rounded-2xl flex items-center justify-between transition-all active:scale-98"
                    style={{
                      backgroundColor: dateFilter === option.value ? "#7c3aed15" : colors.cardBackground
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: dateFilter === option.value ? "#7c3aed20" : colors.background
                        }}
                      >
                        <IconCalendar
                          size={20}
                          style={{ color: dateFilter === option.value ? "#7c3aed" : colors.textSecondary }}
                        />
                      </div>
                      <span
                        className="font-medium"
                        style={{ color: dateFilter === option.value ? "#7c3aed" : colors.text }}
                      >
                        {option.label}
                      </span>
                    </div>
                    {dateFilter === option.value && (
                      <div className="w-6 h-6 rounded-full bg-[#7c3aed] flex items-center justify-center">
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                          <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <BottomNav />
    </div>
  );
}