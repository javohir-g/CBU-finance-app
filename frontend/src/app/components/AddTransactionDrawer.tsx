import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { IconX, IconCreditCard, IconShoppingCart, IconCar, IconHome, IconDevices, IconCoffee, IconPlane, IconHeartHandshake, IconBriefcase, IconTrendingUp, IconGift, IconWallet, IconCalendar, IconUser } from "@tabler/icons-react";
import { useState } from "react";
import imgMastercard from "figma:asset/83237b3cdb68e203187a53755f13a5e2c808b401.png";

interface AddTransactionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  type: "expense" | "income";
}

export function AddTransactionDrawer({ isOpen, onClose, type }: AddTransactionDrawerProps) {
  const { language } = useLanguage();
  const [selectedCard, setSelectedCard] = useState("1");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

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

  const cards = [
    {
      id: "1",
      name: "Mastercard",
      number: "•••• 4862",
      balance: "5,200.00"
    },
    {
      id: "2",
      name: "Visa",
      number: "•••• 3291",
      balance: "3,450.00"
    }
  ];

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

  const handleSubmit = () => {
    if (!selectedCard || !selectedCategory || !amount) {
      return;
    }
    // Handle transaction submission
    console.log({
      type,
      card: selectedCard,
      category: selectedCategory,
      amount,
      description,
      recipient,
      date
    });
    onClose();
    // Reset form
    setSelectedCategory("");
    setAmount("");
    setDescription("");
    setRecipient("");
    setDate(new Date().toISOString().split('T')[0]);
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
            className="fixed bottom-0 left-0 right-0 bg-[#1e2337] z-50 rounded-t-3xl shadow-2xl overflow-hidden max-h-[85vh]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white">
                {type === "expense" ? content[language].expense : content[language].income}
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                <IconX size={20} className="text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(85vh-80px)] px-6 py-4">
              {/* Amount Input */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">{content[language].amount}</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-2xl font-bold">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={content[language].amountPlaceholder}
                    className="w-full bg-[#2a3350] rounded-full px-12 py-4 text-white text-2xl font-bold placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                  />
                </div>
              </div>

              {/* Select Card */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-3 block">{content[language].selectCard}</label>
                <div className="grid gap-2">
                  {cards.map((card) => (
                    <motion.button
                      key={card.id}
                      onClick={() => setSelectedCard(card.id)}
                      className={`bg-[#2a3350] rounded-3xl p-4 flex items-center justify-between transition-all ${
                        selectedCard === card.id ? "ring-2 ring-[#7c3aed] bg-[#7c3aed]/10" : ""
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#7c3aed] to-[#9d5afd] rounded-full flex items-center justify-center">
                          <img src={imgMastercard} alt="" className="w-7 h-7 object-contain" />
                        </div>
                        <div className="text-left">
                          <p className="text-white font-semibold text-sm">{card.name}</p>
                          <p className="text-white/60 text-xs">{card.number}</p>
                        </div>
                      </div>
                      <p className="text-white font-bold text-base">${card.balance}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Select Category */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-3 block">{content[language].selectCategory}</label>
                <div className="grid grid-cols-4 gap-3">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`aspect-square rounded-3xl flex flex-col items-center justify-center gap-2 transition-all ${
                          selectedCategory === category.id
                            ? "ring-2 ring-[#7c3aed] bg-[#7c3aed]/10"
                            : "bg-[#2a3350]"
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${category.color}20` }}
                        >
                          <Icon size={20} style={{ color: category.color }} />
                        </div>
                        <span className="text-white text-[10px] text-center px-1">
                          {categoryLabels[category.id as keyof typeof categoryLabels]}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Recipient/Sender */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">
                  {type === "expense" ? content[language].recipient : content[language].sender}
                </label>
                <div className="relative">
                  <IconUser size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder={type === "expense" ? content[language].recipientPlaceholder : content[language].senderPlaceholder}
                    className="w-full bg-[#2a3350] rounded-full pl-12 pr-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">{content[language].description}</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={content[language].descriptionPlaceholder}
                  rows={3}
                  className="w-full bg-[#2a3350] rounded-3xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#7c3aed] resize-none"
                />
              </div>

              {/* Date */}
              <div className="mb-6">
                <label className="text-white/60 text-sm mb-2 block">{content[language].date}</label>
                <div className="relative">
                  <IconCalendar size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#2a3350] rounded-full pl-12 pr-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#7c3aed]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pb-4">
                <motion.button
                  onClick={onClose}
                  className="bg-[#2a3350] text-white rounded-full py-4 font-semibold hover:bg-[#313a5a] transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  {content[language].cancel}
                </motion.button>
                <motion.button
                  onClick={handleSubmit}
                  className={`rounded-full py-4 font-semibold transition-colors ${
                    type === "expense"
                      ? "bg-[#ff4757] hover:bg-[#ff3347]"
                      : "bg-[#22c55e] hover:bg-[#1db954]"
                  } text-white ${!selectedCard || !selectedCategory || !amount ? "opacity-50 cursor-not-allowed" : ""}`}
                  whileTap={{ scale: !selectedCard || !selectedCategory || !amount ? 1 : 0.98 }}
                  disabled={!selectedCard || !selectedCategory || !amount}
                >
                  {content[language].addTransaction}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
