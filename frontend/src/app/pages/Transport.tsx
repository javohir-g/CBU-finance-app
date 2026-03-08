import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { BottomNav } from "../components/BottomNav";
import { IconArrowLeft, IconBus, IconTrain, IconTicket, IconCreditCard } from "@tabler/icons-react";

export default function Transport() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [selectedTab, setSelectedTab] = useState<"metro" | "bus">("metro");

  const content = {
    rus: {
      title: "Метро и автобус",
      metro: "Метро",
      bus: "Автобус",
      balance: "Баланс",
      topUp: "Пополнить",
      myCards: "Мои карты",
      addCard: "Добавить карту",
      trips: "Поездки",
      history: "История поездок",
      enterAmount: "Введите сумму",
      quickAmounts: "Быстрое пополнение"
    },
    uzb: {
      title: "Metro va avtobus",
      metro: "Metro",
      bus: "Avtobus",
      balance: "Balans",
      topUp: "To'ldirish",
      myCards: "Mening kartalarim",
      addCard: "Karta qo'shish",
      trips: "Sayohatlar",
      history: "Sayohatlar tarixi",
      enterAmount: "Summani kiriting",
      quickAmounts: "Tez to'ldirish"
    }
  };

  // ========================================
  // 🔄 MOCK DATA - TODO: Replace with API
  // ========================================
  const transportCards = [
    {
      id: 1,
      type: "metro",
      cardNumber: "7890 1234 5678",
      balance: 45000
    },
    {
      id: 2,
      type: "bus",
      cardNumber: "8901 2345 6789",
      balance: 25000
    }
  ];

  // ========================================
  // 🔄 MOCK DATA - TODO: Replace with API
  // ========================================
  const trips = [
    { 
      id: 1, 
      route: language === "rus" ? "Юнус Абад - Алмазар" : "Yunusobod - Olmazar", 
      time: "14:30", 
      cost: 1500, 
      date: language === "rus" ? "Сегодня" : "Bugun" 
    },
    { 
      id: 2, 
      route: language === "rus" ? "Алмазар - Чиланзар" : "Olmazar - Chilonzor", 
      time: "08:15", 
      cost: 1500, 
      date: language === "rus" ? "Сегодня" : "Bugun" 
    },
    { 
      id: 3, 
      route: language === "rus" ? "Чиланзар - Амир Темур" : "Chilonzor - Amir Temur", 
      time: "18:45", 
      cost: 1500, 
      date: language === "rus" ? "Вчера" : "Kecha" 
    }
  ];

  const quickAmounts = [10000, 20000, 50000, 100000];
  const [topUpAmount, setTopUpAmount] = useState("");

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
          className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
          style={{ backgroundColor: colors.cardBackground }}
        >
          <IconArrowLeft size={20} style={{ color: colors.text }} />
        </button>
        <h1 className="text-xl font-semibold" style={{ color: colors.text }}>{content[language].title}</h1>
        <div className="w-11" />
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="px-6 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex gap-2 p-1 rounded-full" style={{ backgroundColor: colors.cardBackground }}>
          <button
            onClick={() => setSelectedTab("metro")}
            className="flex-1 py-3 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2"
            style={{
              backgroundColor: selectedTab === "metro" ? "#7c3aed" : "transparent",
              color: selectedTab === "metro" ? "#ffffff" : colors.text
            }}
          >
            <IconTrain size={18} />
            {content[language].metro}
          </button>
          <button
            onClick={() => setSelectedTab("bus")}
            className="flex-1 py-3 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2"
            style={{
              backgroundColor: selectedTab === "bus" ? "#7c3aed" : "transparent",
              color: selectedTab === "bus" ? "#ffffff" : colors.text
            }}
          >
            <IconBus size={18} />
            {content[language].bus}
          </button>
        </div>
      </motion.div>

      {/* Transport Cards */}
      <motion.div
        className="px-6 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ color: colors.text }}>{content[language].myCards}</h2>
        
        <div className="space-y-3">
          {transportCards
            .filter(card => card.type === selectedTab)
            .map((card, index) => (
              <motion.div
                key={card.id}
                className="rounded-[24px] p-5"
                style={{
                  background: selectedTab === "metro" 
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      {selectedTab === "metro" ? (
                        <IconTrain size={24} className="text-white" />
                      ) : (
                        <IconBus size={24} className="text-white" />
                      )}
                    </div>
                    <div>
                      <p className="text-white/80 text-xs">{content[language][selectedTab]}</p>
                      <p className="text-white font-semibold tracking-wider">{card.cardNumber}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-xs mb-1">{content[language].balance}</p>
                    <p className="text-white text-2xl font-bold">{card.balance.toLocaleString()} UZS</p>
                  </div>
                  <button className="bg-white/20 backdrop-blur-sm text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-white/30 transition-colors">
                    {content[language].topUp}
                  </button>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>

      {/* Top Up Section */}
      <motion.div
        className="px-6 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="rounded-[24px] p-5" style={{ backgroundColor: colors.cardBackground }}>
          <h3 className="font-bold text-base mb-3" style={{ color: colors.text }}>{content[language].topUp}</h3>
          
          <input
            type="number"
            value={topUpAmount}
            onChange={(e) => setTopUpAmount(e.target.value)}
            placeholder={content[language].enterAmount}
            className="w-full px-4 py-3 rounded-2xl text-lg font-semibold outline-none mb-3"
            style={{
              backgroundColor: colors.background,
              color: colors.text,
              border: `1px solid ${colors.border}`
            }}
          />

          <p className="text-xs mb-2" style={{ color: colors.textSecondary }}>{content[language].quickAmounts}</p>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setTopUpAmount(amount.toString())}
                className="py-2 rounded-full text-sm font-semibold transition-all"
                style={{
                  backgroundColor: colors.background,
                  color: colors.text
                }}
              >
                {(amount / 1000).toFixed(0)}k
              </button>
            ))}
          </div>

          <button
            disabled={!topUpAmount || parseFloat(topUpAmount) <= 0}
            className="w-full bg-[#7c3aed] text-white py-3 rounded-full font-semibold text-base hover:bg-[#6d32d4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <IconCreditCard size={20} />
            {content[language].topUp}
          </button>
        </div>
      </motion.div>

      {/* Recent Trips */}
      <motion.div
        className="px-6 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ color: colors.text }}>{content[language].history}</h2>
        
        <div className="space-y-2">
          {trips.map((trip, index) => (
            <motion.div
              key={trip.id}
              className="rounded-full p-4 flex items-center justify-between"
              style={{ backgroundColor: colors.cardBackground }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7c3aed]/10 flex items-center justify-center">
                  <IconTicket size={20} className="text-[#7c3aed]" />
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: colors.text }}>{trip.route}</p>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>{trip.date} • {trip.time}</p>
                </div>
              </div>
              <p className="font-bold" style={{ color: colors.text }}>-{trip.cost.toLocaleString()} UZS</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}