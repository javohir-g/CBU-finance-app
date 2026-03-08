import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { BottomNav } from "../components/BottomNav";
import { IconArrowLeft, IconCreditCard, IconCheck } from "@tabler/icons-react";

export default function OrderCard() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const content = {
    rus: {
      title: "Заказать карту",
      selectCardType: "Выберите тип карты",
      virtual: "Виртуальная",
      physical: "Физическая",
      cardTypes: "Типы карт",
      deliveryTime: "Срок доставки",
      free: "Бесплатно",
      days: "дней",
      orderNow: "Заказать сейчас",
      classic: "Классическая",
      gold: "Золотая",
      platinum: "Платиновая",
      instant: "Мгновенно"
    },
    uzb: {
      title: "Karta buyurtma qilish",
      selectCardType: "Karta turini tanlang",
      virtual: "Virtual",
      physical: "Jismoniy",
      cardTypes: "Karta turlari",
      deliveryTime: "Yetkazib berish muddati",
      free: "Bepul",
      days: "kun",
      orderNow: "Hozir buyurtma qilish",
      classic: "Klassik",
      gold: "Oltin",
      platinum: "Platina",
      instant: "Bir zumda"
    }
  };

  // ========================================
  // 🔄 MOCK DATA - TODO: Replace with API
  // ========================================
  const cardTypes = [
    {
      id: 1,
      name: content[language].classic,
      type: "physical",
      color: "#7c3aed",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fee: content[language].free,
      deliveryTime: "3-5 " + content[language].days,
      cashback: "1%",
      limit: "$5,000"
    },
    {
      id: 2,
      name: content[language].gold,
      type: "physical",
      color: "#f59e0b",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      fee: "$10",
      deliveryTime: "3-5 " + content[language].days,
      cashback: "3%",
      limit: "$15,000"
    },
    {
      id: 3,
      name: content[language].platinum,
      type: "physical",
      color: "#3b82f6",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
      fee: "$25",
      deliveryTime: "5-7 " + content[language].days,
      cashback: "5%",
      limit: "$50,000"
    },
    {
      id: 4,
      name: content[language].virtual,
      type: "virtual",
      color: "#22c55e",
      gradient: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
      fee: content[language].free,
      deliveryTime: content[language].instant,
      cashback: "1%",
      limit: "$2,000"
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

      {/* Card Types */}
      <motion.div
        className="px-6 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ color: colors.text }}>{content[language].cardTypes}</h2>
        
        <div className="space-y-4">
          {cardTypes.map((card, index) => (
            <motion.div
              key={card.id}
              onClick={() => setSelectedCard(card.id)}
              className="rounded-[24px] overflow-hidden cursor-pointer transition-all"
              style={{ 
                backgroundColor: colors.cardBackground,
                border: selectedCard === card.id ? `2px solid ${card.color}` : `1px solid ${colors.border}`
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Card Preview */}
              <div
                className="h-40 p-5 flex flex-col justify-between relative"
                style={{ background: card.gradient }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-xs mb-1">{card.name}</p>
                    <p className="text-white text-lg font-bold">•••• •••• •••• ••••</p>
                  </div>
                  {selectedCard === card.id && (
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <IconCheck size={18} style={{ color: card.color }} />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <IconCreditCard size={32} className="text-white/80" />
                  <div>
                    <p className="text-white/60 text-[10px]">Cashback</p>
                    <p className="text-white font-bold text-sm">{card.cashback}</p>
                  </div>
                </div>
              </div>

              {/* Card Info */}
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs mb-1" style={{ color: colors.textSecondary }}>
                      {content[language].deliveryTime}
                    </p>
                    <p className="font-semibold text-sm" style={{ color: colors.text }}>{card.deliveryTime}</p>
                  </div>
                  <div>
                    <p className="text-xs mb-1" style={{ color: colors.textSecondary }}>Limit</p>
                    <p className="font-semibold text-sm" style={{ color: colors.text }}>{card.limit}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t" style={{ borderColor: colors.border }}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm" style={{ color: colors.textSecondary }}>Fee</p>
                    <p className="font-bold" style={{ color: card.fee === content[language].free ? "#22c55e" : colors.text }}>
                      {card.fee}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Order Button */}
      {selectedCard && (
        <motion.div
          className="px-6 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button className="w-full bg-[#7c3aed] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#6d32d4] transition-colors">
            {content[language].orderNow}
          </button>
        </motion.div>
      )}

      <BottomNav />
    </div>
  );
}