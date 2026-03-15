import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { IconX, IconCreditCard, IconShoppingCart, IconCar, IconHome, IconDevices, IconCoffee, IconPlane, IconHeartHandshake, IconBriefcase, IconTrendingUp, IconGift, IconWallet, IconCalendar, IconUser } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { cardsService, Card } from "../api/services/cards.service";
import { transactionsService, CategoryType } from "../api/services/transactions.service";
import imgUzcard from "figma:asset/Uzcard-01.png";
import imgHumo from "figma:asset/Humo-01.jpg";

interface AddTransactionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  type: "expense" | "income";
}

export function AddTransactionDrawer({ isOpen, onClose, onSuccess, type }: AddTransactionDrawerProps) {
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | "">("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const [cards, setCards] = useState<Card[]>([]);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchCards = async () => {
        setIsLoadingCards(true);
        try {
          const response = await cardsService.getCards();
          const cardsData = response.cards || [];
          setCards(cardsData);
          if (cardsData.length > 0 && !selectedCard) {
            setSelectedCard(cardsData[0].id);
          }
        } catch (error) {
          console.error("Failed to fetch cards:", error);
        } finally {
          setIsLoadingCards(false);
        }
      };
      
      const getCardLogo = (num: string) => {
        if (num.startsWith("8600")) return imgUzcard;
        if (num.startsWith("9860")) return imgHumo;
        return imgUzcard;
      };

      fetchCards();
    }
  }, [isOpen]);

  const content = {
    rus: {
      expense: "Новый Расход",
      income: "Новый Доход",
      selectCard: "Выберите Карту",
      selectCategory: "Выберите Категорию",
      amount: "Сумма",
      amountPlaceholder: "0.00",
      description: "Описание",
      descriptionPlaceholder: "Введите описание...",
      recipient: "Получатель",
      recipientPlaceholder: "Имя получателя",
      sender: "Отправитель",
      senderPlaceholder: "Имя отправителя",
      date: "Дата",
      addTransaction: "Добавить",
      cancel: "Отмена",
      expenseCategories: {
        shopping: "Покупки",
        transport: "Транспорт",
        housing: "Жилье",
        electronics: "Электроника",
        food: "Еда",
        travel: "Путешествия",
        health: "Здоровье",
        entertainment: "Развлечения",
        other: "Другое"
      },
      incomeCategories: {
        salary: "Зарплата",
        business: "Бизнес",
        investments: "Инвестиции",
        gifts: "Подарки",
        freelance: "Фриланс",
        other: "Другое"
      }
    },
    uzb: {
      expense: "Yangi Xarajat",
      income: "Yangi Daromad",
      selectCard: "Kartani Tanlang",
      selectCategory: "Kategoriyani Tanlang",
      amount: "Summa",
      amountPlaceholder: "0.00",
      description: "Tavsif",
      descriptionPlaceholder: "Tavsif kiriting...",
      recipient: "Qabul qiluvchi",
      recipientPlaceholder: "Qabul qiluvchi nomi",
      sender: "Yuboruvchi",
      senderPlaceholder: "Yuboruvchi nomi",
      date: "Sana",
      addTransaction: "Qo'shish",
      cancel: "Bekor qilish",
      expenseCategories: {
        shopping: "Xaridlar",
        transport: "Transport",
        housing: "Uy-joy",
        electronics: "Elektronika",
        food: "Ovqat",
        travel: "Sayohat",
        health: "Salomatlik",
        entertainment: "O'yin-kulgi",
        other: "Boshqa"
      },
      incomeCategories: {
        salary: "Maosh",
        business: "Biznes",
        investments: "Investitsiyalar",
        gifts: "Sovg'alar",
        freelance: "Frilansr",
        other: "Boshqa"
      }
    }
  };

  const expenseCategories = [
    { id: "shopping", icon: IconShoppingCart, color: "#7c3aed" },
    { id: "transport", icon: IconCar, color: "#3b82f6" },
    { id: "housing", icon: IconHome, color: "#f59e0b" },
    { id: "electronics", icon: IconDevices, color: "#8b5cf6" },
    { id: "food", icon: IconCoffee, color: "#22c55e" },
    { id: "travel", icon: IconPlane, color: "#06b6d4" },
    { id: "health", icon: IconHeartHandshake, color: "#ec4899" },
    { id: "other", icon: IconWallet, color: "#6b7280" }
  ];

  const incomeCategories = [
    { id: "salary", icon: IconBriefcase, color: "#22c55e" },
    { id: "business", icon: IconTrendingUp, color: "#7c3aed" },
    { id: "investments", icon: IconTrendingUp, color: "#3b82f6" },
    { id: "gifts", icon: IconGift, color: "#ec4899" },
    { id: "freelance", icon: IconBriefcase, color: "#f59e0b" },
    { id: "other", icon: IconWallet, color: "#6b7280" }
  ];

  const categories = type === "expense" ? expenseCategories : incomeCategories;
  const categoryLabels = type === "expense" ? content[language].expenseCategories : content[language].incomeCategories;

  const handleSubmit = async () => {
    if (!selectedCard || !selectedCategory || !amount || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      await transactionsService.createTransaction({
        card_id: selectedCard,
        type: type === "expense" ? "sent" : "received",
        category: selectedCategory as CategoryType,
        amount: parseFloat(amount),
        currency: "UZS",
        recipient_name: recipient || (type === "expense" ? "Transfer" : "Income"),
        description: description
      });

      onSuccess?.();
      onClose();
      // Reset form
      setSelectedCategory("");
      setAmount("");
      setDescription("");
      setRecipient("");
      setDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      console.error("Failed to submit transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl shadow-2xl overflow-hidden max-h-[85vh]"
            style={{ backgroundColor: colors.background }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: colors.border }}>
              <h2 className="text-xl font-semibold" style={{ color: colors.text }}>
                {type === "expense" ? content[language].expense : content[language].income}
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
                style={{ backgroundColor: colors.cardBackground }}
              >
                <IconX size={20} style={{ color: colors.text }} />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(85vh-80px)] px-6 py-4">
              {/* Amount Input */}
              <div className="mb-6">
                <label className="text-sm mb-2 block" style={{ color: colors.textSecondary }}>{content[language].amount}</label>
                <div className="relative">
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl font-bold" style={{ color: colors.textSecondary }}>som</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={content[language].amountPlaceholder}
                    className="w-full rounded-full px-6 py-4 text-2xl font-bold placeholder:opacity-20 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                    style={{
                      backgroundColor: colors.cardBackground,
                      color: colors.text,
                      border: `1px solid ${colors.border}`
                    }}
                  />
                </div>
              </div>

              {/* Select Card */}
              <div className="mb-6">
                <label className="text-sm mb-3 block" style={{ color: colors.textSecondary }}>{content[language].selectCard}</label>
                <div className="grid gap-2">
                  {isLoadingCards ? (
                    <div className="animate-pulse h-16 rounded-3xl w-full" style={{ backgroundColor: colors.cardBackground }}></div>
                  ) : cards.length > 0 ? (
                    cards.map((card) => (
                      <motion.button
                        key={card.id}
                        onClick={() => setSelectedCard(card.id)}
                        className={`rounded-3xl p-4 flex items-center justify-between transition-all ${selectedCard === card.id ? "ring-2 ring-[#7c3aed]" : ""
                          }`}
                        style={{
                          backgroundColor: selectedCard === card.id ? `${colors.primary || '#7c3aed'}10` : colors.cardBackground,
                          border: `1px solid ${colors.border}`
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#7c3aed] to-[#9d5afd] rounded-full flex items-center justify-center overflow-hidden">
                            <img src={card.number.startsWith("8600") ? imgUzcard : (card.number.startsWith("9860") ? imgHumo : imgUzcard)} alt="" className="w-8 h-8 object-contain" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-sm" style={{ color: colors.text }}>{card.name}</p>
                            <p className="text-xs" style={{ color: colors.textSecondary }}>•••• {card.number}</p>
                          </div>
                        </div>
                        <p className="font-bold text-base" style={{ color: colors.text }}>{card.balance.toLocaleString()} som</p>
                      </motion.button>
                    ))
                  ) : (
                    <p className="text-sm p-4 text-center" style={{ color: colors.textSecondary }}>No cards found</p>
                  )}
                </div>
              </div>

              {/* Select Category */}
              <div className="mb-6">
                <label className="text-sm mb-3 block" style={{ color: colors.textSecondary }}>{content[language].selectCategory}</label>
                <div className="grid grid-cols-4 gap-3">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id as CategoryType)}
                        className={`aspect-square rounded-3xl flex flex-col items-center justify-center gap-2 transition-all ${selectedCategory === category.id
                            ? "ring-2 ring-[#7c3aed]"
                            : ""
                          }`}
                        style={{
                          backgroundColor: selectedCategory === category.id ? `${colors.primary || '#7c3aed'}10` : colors.cardBackground,
                          border: `1px solid ${colors.border}`
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${category.color}20` }}
                        >
                          <Icon size={20} style={{ color: category.color }} />
                        </div>
                        <span className="text-[10px] text-center px-1" style={{ color: colors.text }}>
                          {categoryLabels[category.id as keyof typeof categoryLabels]}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Recipient/Sender */}
              <div className="mb-6">
                <label className="text-sm mb-2 block" style={{ color: colors.textSecondary }}>
                  {type === "expense" ? content[language].recipient : content[language].sender}
                </label>
                <div className="relative">
                  <IconUser size={20} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" style={{ color: colors.text }} />
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder={type === "expense" ? content[language].recipientPlaceholder : content[language].senderPlaceholder}
                    className="w-full rounded-full pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                    style={{
                      backgroundColor: colors.cardBackground,
                      color: colors.text,
                      border: `1px solid ${colors.border}`
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="text-sm mb-2 block" style={{ color: colors.textSecondary }}>{content[language].description}</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={content[language].descriptionPlaceholder}
                  rows={3}
                  className="w-full rounded-3xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] resize-none"
                  style={{
                    backgroundColor: colors.cardBackground,
                    color: colors.text,
                    border: `1px solid ${colors.border}`
                  }}
                />
              </div>

              {/* Date */}
              <div className="mb-6">
                <label className="text-sm mb-2 block" style={{ color: colors.textSecondary }}>{content[language].date}</label>
                <div className="relative">
                  <IconCalendar size={20} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" style={{ color: colors.text }} />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-full pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                    style={{
                      backgroundColor: colors.cardBackground,
                      color: colors.text,
                      border: `1px solid ${colors.border}`
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pb-4">
                <motion.button
                  onClick={onClose}
                  className="rounded-full py-4 font-semibold transition-colors"
                  style={{ backgroundColor: colors.cardBackground, color: colors.text }}
                  whileTap={{ scale: 0.98 }}
                >
                  {content[language].cancel}
                </motion.button>
                <motion.button
                  onClick={handleSubmit}
                  className={`rounded-full py-4 font-semibold text-white transition-colors ${type === "expense"
                      ? "bg-[#ff4757]"
                      : "bg-[#22c55e]"
                    } ${(!selectedCard || !selectedCategory || !amount || isSubmitting) ? "opacity-50 cursor-not-allowed" : ""}`}
                  whileTap={{ scale: (!selectedCard || !selectedCategory || !amount || isSubmitting) ? 1 : 0.98 }}
                  disabled={!selectedCard || !selectedCategory || !amount || isSubmitting}
                >
                  {isSubmitting ? "..." : content[language].addTransaction}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
