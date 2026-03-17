import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { statisticsService, CategoryStat } from "../api/services/statistics.service";
import { BottomNav } from "../components/BottomNav";
import { IconPlus, IconMinus, IconShoppingCart, IconHome, IconCar, IconDevices, IconCoffee, IconBriefcase, IconGift, IconArrowLeft, IconCalendar, IconChevronDown, IconX, IconChartPie, IconSparkles } from "@tabler/icons-react";

export default function Statistics() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const { colors } = useTheme();
  const content = {
    rus: {
      title: "Статистика",
      all: "Все",
      income: "Доход",
      expense: "Расход",
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
      title: "Statistika",
      all: "Hammasi",
      income: "Daromad",
      expense: "Xarajat",
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

  const [filterCategory, setFilterCategory] = useState<"all" | "income" | "expense">(location.state?.filterCategory || "all");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "week" | "month" | "year">(location.state?.dateFilter || "month");
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenseCategories, setExpenseCategories] = useState<CategoryStat[]>([]);
  const [incomeCategories, setIncomeCategories] = useState<CategoryStat[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const response = await statisticsService.getStatistics(dateFilter);
        setTotalIncome(response.totalIncome);
        setTotalExpense(response.totalExpense);
        setExpenseCategories(response.expenseByCategory);
        setIncomeCategories(response.incomeByCategory);
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [dateFilter]);

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

  return (
    <div className="min-h-screen w-full pb-32 overflow-x-hidden" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <motion.div
        className="flex items-center justify-between px-[20px] py-[15px]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95"
          style={{ backgroundColor: colors.cardBackground }}
        >
          <IconArrowLeft size={22} style={{ color: colors.text }} />
        </button>
        <h1 className="text-xl font-semibold" style={{ color: colors.text }}>{content[language].title}</h1>
        <button
          onClick={() => setIsAIOpen(true)}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95"
          style={{ backgroundColor: colors.cardBackground }}
        >
          <IconSparkles size={22} style={{ color: "#7c3aed" }} />
        </button>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        className="px-6 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
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

      {/* Statistics Content */}
      <motion.div
        className="px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Income Card */}
          <div className="rounded-2xl p-4" style={{ backgroundColor: colors.cardBackground }}>
            {isLoading ? (
              <div className="animate-pulse space-y-2">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-6 bg-gray-200 rounded w-3/4" />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center">
                    <IconPlus size={16} className="text-white" />
                  </div>
                  <p className="text-xs font-medium" style={{ color: colors.textSecondary }}>
                    {content[language].totalIncome}
                  </p>
                </div>
                <p className="text-xl font-bold text-[#22c55e]">
                  {totalIncome.toLocaleString()} so'm
                </p>
              </>
            )}
          </div>

          {/* Expense Card */}
          <div className="rounded-2xl p-4" style={{ backgroundColor: colors.cardBackground }}>
            {isLoading ? (
              <div className="animate-pulse space-y-2">
                <div className="w-8 h-8 rounded-full bg-gray-200" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-6 bg-gray-200 rounded w-3/4" />
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#ff4757] flex items-center justify-center">
                    <IconMinus size={16} className="text-white" />
                  </div>
                  <p className="text-xs font-medium" style={{ color: colors.textSecondary }}>
                    {content[language].totalExpense}
                  </p>
                </div>
                <p className="text-xl font-bold text-[#ff4757]">
                  {totalExpense.toLocaleString()} so'm
                </p>
              </>
            )}
          </div>
        </div>

        {/* Categories Title */}
        <h3 className="text-base font-semibold mb-3" style={{ color: colors.text }}>
          {content[language].categories}
        </h3>

        {/* Categories List */}
        <div className="space-y-4 pb-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full w-full" />
                </div>
              </div>
            ))
          ) : (
            <>
              {/* Show categories based on filter */}
              {(filterCategory === "all" || filterCategory === "expense") &&
                expenseCategories.map((category, index) => {
                  const Icon = categoryIcons[category.category] || IconShoppingCart;
                  const color = categoryColors[category.category] || "#7c3aed";

                  return (
                    <motion.div
                      key={`expense-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${color}20` }}
                      >
                        <Icon size={20} style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium" style={{ color: colors.text }}>
                            {content[language][category.category as keyof typeof content["rus"]] || category.category}
                          </p>
                          <p className="text-sm font-bold" style={{ color: colors.text }}>
                            {category.amount.toLocaleString()} so'm
                          </p>
                        </div>
                        <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.background }}>
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${category.percentage}%`,
                              backgroundColor: color
                            }}
                          />
                        </div>
                      </div>
                      <p className="text-xs font-medium w-10 text-right" style={{ color: colors.textSecondary }}>
                        {category.percentage}%
                      </p>
                    </motion.div>
                  );
                })
              }

              {(filterCategory === "all" || filterCategory === "income") &&
                incomeCategories.map((category, index) => {
                  const Icon = categoryIcons[category.category] || IconBriefcase;
                  const color = categoryColors[category.category] || "#22c55e";

                  return (
                    <motion.div
                      key={`income-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * (index + (filterCategory === "all" ? expenseCategories.length : 0)) }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${color}20` }}
                      >
                        <Icon size={20} style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium" style={{ color: colors.text }}>
                            {content[language][category.category as keyof typeof content["rus"]] || category.category}
                          </p>
                          <p className="text-sm font-bold" style={{ color: colors.text }}>
                            ${category.amount.toFixed(2)}
                          </p>
                        </div>
                        <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.background }}>
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${category.percentage}%`,
                              backgroundColor: color
                            }}
                          />
                        </div>
                      </div>
                      <p className="text-xs font-medium w-10 text-right" style={{ color: colors.textSecondary }}>
                        {category.percentage}%
                      </p>
                    </motion.div>
                  );
                })
              }
            </>
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

      {/* AI Coming Soon Modal */}
      {isAIOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsAIOpen(false)}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-sm rounded-[32px] p-8 text-center overflow-hidden"
            style={{ backgroundColor: colors.background }}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
          >
            {/* Decorative Orbs */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#7c3aed]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#7c3aed]/10 rounded-full blur-3xl" />

            <div className="relative">
              <div 
                className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#7c3aed]/20"
                style={{ backgroundColor: "#7c3aed" }}
              >
                <IconSparkles size={40} className="text-white" />
              </div>

              <h2 className="text-2xl font-bold mb-3" style={{ color: colors.text }}>
                AI Интеллект
              </h2>

              <div className="bg-[#7c3aed]/10 px-4 py-1.5 rounded-full inline-block mb-6">
                <span className="text-[#7c3aed] text-xs font-bold uppercase tracking-widest">
                  {language === "rus" ? "Скоро появится" : "Tez orada"}
                </span>
              </div>

              <p className="text-base leading-relaxed mb-8" style={{ color: colors.textSecondary }}>
                {language === "rus" 
                  ? "Эта страница и функции AI-аналитики скоро будут активны. Мы работаем над умными советами для вашего бюджета!" 
                  : "Ushbu sahifa va AI tahlil funksiyalari tez orada faol bo'ladi. Budjetingiz uchun aqlli maslahatlar ustida ishlayapmiz!"}
              </p>

              <button
                onClick={() => setIsAIOpen(false)}
                className="w-full py-4 bg-[#7c3aed] text-white rounded-2xl font-semibold shadow-xl shadow-[#7c3aed]/20 transition-all active:scale-95"
              >
                {language === "rus" ? "Понятно" : "Tushunarli"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <BottomNav />
    </div>
  );
}