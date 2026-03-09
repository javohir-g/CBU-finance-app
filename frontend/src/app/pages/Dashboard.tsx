import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { userService, UserBalance } from "../api/services/user.service";
import { transactionsService, Transaction } from "../api/services/transactions.service";
import { BottomNav } from "../components/BottomNav";
import { ProfileDrawer } from "../components/ProfileDrawer";
import { NotificationsDrawer } from "../components/NotificationsDrawer";
import { AddTransactionDrawer } from "../components/AddTransactionDrawer";
import {
  IconEye,
  IconEyeOff,
  IconBell,
  IconPlus,
  IconMinus,
  IconCurrencyDollar,
  IconHome,
  IconCar
} from "@tabler/icons-react";
import { useState, useEffect } from "react";

// Dashboard component
export default function Dashboard() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();
  const { user } = useAuth();

  // State management
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<"income" | "expense">("income");

  const [balance, setBalance] = useState<number>(0);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [balanceData, transactionsData] = await Promise.all([
        userService.getBalance(),
        transactionsService.getTransactions({ limit: 4 })
      ]);

      setBalance(balanceData?.totalBalance ?? 0);
      setRecentTransactions(transactionsData?.transactions ?? []);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const content = {
    rus: {
      greeting: "Привет",
      name: user?.name || "User",
      goodMorning: "Доброе утро!",
      totalBalance: "Общий Баланс",
      expense: "Расход",
      income: "Доход",
      seeAll: "Все",
      recentTransactions: "Последние Транзакции",
      services: "Сервисы",
      exchangeRate: "Курс валют",
      myHome: "Мой дом",
      myCar: "Мой автомобиль"
    },
    uzb: {
      greeting: "Salom",
      name: user?.name || "User",
      goodMorning: "Xayrli tong!",
      totalBalance: "Umumiy Balans",
      expense: "Xarajat",
      income: "Daromad",
      seeAll: "Hammasi",
      recentTransactions: "So'nggi Tranzaksiyalar",
      services: "Xizmatlar",
      exchangeRate: "Valyuta kursi",
      myHome: "Mening uyim",
      myCar: "Mening mashinam"
    }
  };

  const services = [
    {
      id: 1,
      icon: IconCurrencyDollar,
      label: content[language].exchangeRate,
      color: "#22c55e",
      bgColor: "#22c55e15"
    },
    {
      id: 2,
      icon: IconHome,
      label: content[language].myHome,
      color: "#3b82f6",
      bgColor: "#3b82f615"
    },
    {
      id: 3,
      icon: IconCar,
      label: content[language].myCar,
      color: "#f59e0b",
      bgColor: "#f59e0b15"
    }
  ];

  return (
    <div className="min-h-screen w-full pb-32 overflow-x-hidden" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <motion.div
        className="flex items-center justify-between px-[20px] py-[15px]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <button onClick={() => setIsProfileDrawerOpen(true)}>
            <img
              src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random`}
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover border-2 hover:border-[#7c3aed]/50 transition-colors cursor-pointer"
              style={{ borderColor: colors.border }}
            />
          </button>
          <div>
            <h1 className="text-xl font-semibold" style={{ color: colors.text }}>
              {content[language].greeting}, {content[language].name}
            </h1>
            <p className="text-xs" style={{ color: colors.textSecondary }}>{content[language].goodMorning}</p>
          </div>
        </div>
        <button
          onClick={() => setIsNotificationsOpen(true)}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-colors relative"
          style={{ backgroundColor: `${colors.text}08` }}
        >
          <IconBell size={20} style={{ color: colors.text }} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#ff4757] rounded-full border-2" style={{ borderColor: colors.background }}></span>
        </button>
      </motion.div>

      {/* Total Balance Card */}
      <motion.div
        className="mx-[0px] mt-[0px] mb-[15px] px-[15px] py-[0px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div
          className="rounded-[28px] p-6 relative overflow-hidden bg-cover bg-center"
          style={{
            background: `linear-gradient(135deg, ${colors.primary || '#7c3aed'} 0%, ${colors.primary + 'CC' || '#6d28d9'} 100%)`
          }}
        >
          <div className="relative z-10">
            <p className="text-white/80 text-sm mb-2 text-center">{content[language].totalBalance}</p>

            <div className="flex items-center justify-center gap-3">
              <p className="text-white text-4xl font-bold tracking-tight">
                {showBalance ? `$${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '••••••'}
              </p>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="flex items-center justify-center hover:opacity-80 transition-opacity flex-shrink-0"
              >
                {showBalance ? (
                  <IconEye size={18} className="text-white" />
                ) : (
                  <IconEyeOff size={18} className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="mb-6 px-[15px] py-[0px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center gap-3">
          {/* Expense */}
          <button
            onClick={() => {
              setTransactionType("expense");
              setIsAddTransactionOpen(true);
            }}
            className="flex-1 flex items-center gap-3 rounded-full transition-colors p-[10px]"
            style={{ backgroundColor: colors.cardBackground }}
          >
            <div className="w-12 h-12 rounded-full bg-[#ff4757]/10 flex items-center justify-center flex-shrink-0">
              <IconMinus size={20} className="text-[#ff4757]" />
            </div>
            <span className="text-[15px] font-semibold" style={{ color: colors.text }}>{content[language].expense}</span>
          </button>

          {/* Income */}
          <button
            onClick={() => {
              setTransactionType("income");
              setIsAddTransactionOpen(true);
            }}
            className="flex-1 flex items-center gap-3 rounded-full transition-colors p-[10px]"
            style={{ backgroundColor: colors.cardBackground }}
          >
            <div className="w-12 h-12 rounded-full bg-[#22c55e]/10 flex items-center justify-center flex-shrink-0">
              <IconPlus size={20} className="text-[#22c55e]" />
            </div>
            <span className="text-[15px] font-semibold" style={{ color: colors.text }}>{content[language].income}</span>
          </button>
        </div>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        className="px-[15px] py-[0px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold" style={{ color: colors.text }}>{content[language].recentTransactions}</h2>
          <button
            onClick={() => navigate("/transactions")}
            className="text-xs text-[#7c3aed] hover:text-[#6d32d4] transition-colors font-medium"
          >
            {content[language].seeAll}
          </button>
        </div>

        <div className="space-y-2.5">
          {isLoading ? (
            // Skeleton loader or simplified loading indicator
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="animate-pulse h-20 rounded-full w-full mb-2" style={{ backgroundColor: colors.cardBackground }}></div>
            ))
          ) : recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => {
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
                      {transaction.currency === "USD" ? "$" : ""}{transaction.amount.toFixed(2)}
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
            <p className="text-center py-4 text-sm" style={{ color: colors.textSecondary }}>
              {language === "rus" ? "Транзакций не найдено" : "Tranzaksiyalar topilmadi"}
            </p>
          )}
        </div>
      </motion.div>

      {/* Services */}
      <motion.div
        className="px-[15px] py-[0px] mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold" style={{ color: colors.text }}>{content[language].services}</h2>
          <button
            onClick={() => navigate("/more")}
            className="text-xs text-[#7c3aed] hover:text-[#6d32d4] transition-colors font-medium"
          >
            {content[language].seeAll}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {services.map((service) => (
            <button
              key={service.id}
              className="rounded-[20px] p-4 flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: colors.cardBackground }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: service.bgColor }}
              >
                <service.icon size={22} style={{ color: service.color }} />
              </div>
              <p className="text-[11px] font-medium text-center leading-tight" style={{ color: colors.text }}>
                {service.label}
              </p>
            </button>
          ))}
        </div>
      </motion.div>

      <BottomNav />

      {/* Profile Drawer */}
      <ProfileDrawer
        isOpen={isProfileDrawerOpen}
        onClose={() => setIsProfileDrawerOpen(false)}
      />

      {/* Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Add Transaction Drawer */}
      <AddTransactionDrawer
        isOpen={isAddTransactionOpen}
        onClose={() => setIsAddTransactionOpen(false)}
        onSuccess={fetchDashboardData}
        type={transactionType}
      />
    </div>
  );
}