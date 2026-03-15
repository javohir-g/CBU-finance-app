import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { IconX, IconCheck } from "@tabler/icons-react";
import imgUzcard from "figma:asset/Uzcard-01.png";
import imgHumo from "figma:asset/Humo-01.jpg";

interface AddCardDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (card: { cardholder_name: string; card_number: string; expiry_date: string; cvv: string; balance: string; color: string }) => void;
}

export function AddCardDrawer({ isOpen, onClose, onAddCard }: AddCardDrawerProps) {
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [initialBalance, setInitialBalance] = useState("");
  const [selectedColor, setSelectedColor] = useState("#7c3aed");

  const cardDesigns = [
    "#7c3aed", // Purple
    "#22c55e", // Green
    "#3b82f6", // Blue
    "#f59e0b", // Orange
    "#ef4444", // Red
    "#000000", // Black
  ];

  const getCardType = (number: string) => {
    const cleanNumber = number.replace(/\s/g, "");
    if (cleanNumber.startsWith("8600")) return "uzcard";
    if (cleanNumber.startsWith("9860")) return "humo";
    return null;
  };

  const cardType = getCardType(cardNumber);

  const content = {
    rus: {
      title: "Добавить Карту",
      cardholderName: "Имя держателя карты",
      cardNumber: "Номер карты",
      expiryDate: "Срок действия (ММ/ГГ)",
      cvv: "CVV",
      initialBalance: "Начальный баланс",
      cancel: "Отмена",
      add: "Добавить",
      enterName: "Введите имя",
      enterCardNumber: "0000 0000 0000 0000",
      enterExpiry: "MM/YY",
      enterCVV: "123",
      enterBalance: "0.00",
      chooseDesign: "Выбрать дизайн"
    },
    uzb: {
      title: "Karta Qo'shish",
      cardholderName: "Karta egasi nomi",
      cardNumber: "Karta raqami",
      expiryDate: "Amal qilish muddati (OO/YY)",
      cvv: "CVV",
      initialBalance: "Boshlang'ich balans",
      cancel: "Bekor qilish",
      add: "Qo'shish",
      enterName: "Nomini kiriting",
      enterCardNumber: "0000 0000 0000 0000",
      enterExpiry: "OO/YY",
      enterCVV: "123",
      enterBalance: "0.00",
      chooseDesign: "Dizaynni tanlang"
    }
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(" ") : cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(formatCardNumber(value));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    if (value.length <= 5) {
      setExpiryDate(value);
    }
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCvv(value);
    }
  };

  const isValidCard = () => {
    const cleanNumber = cardNumber.replace(/\s/g, "");
    return (
      cardholderName.trim() &&
      cleanNumber.length === 16 &&
      (cleanNumber.startsWith("8600") || cleanNumber.startsWith("9860")) &&
      expiryDate.length === 5 &&
      cvv.length === 3 &&
      initialBalance
    );
  };

  const handleSubmit = () => {
    if (isValidCard()) {
      onAddCard({
        cardholder_name: cardholderName,
        card_number: cardNumber.replace(/\s/g, ""),
        expiry_date: expiryDate,
        cvv: cvv,
        balance: initialBalance,
        color: selectedColor
      });
      // Reset form
      setCardholderName("");
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
      setInitialBalance("");
      onClose();
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
            className="fixed bottom-0 left-0 right-0 rounded-t-[30px] z-50 max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: colors.background }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 rounded-full" style={{ backgroundColor: colors.textSecondary, opacity: 0.3 }} />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: colors.border }}>
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>{content[language].title}</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: colors.cardBackground }}
              >
                <IconX size={20} style={{ color: colors.text }} />
              </button>
            </div>

            {/* Form */}
            <div className="px-6 py-6 space-y-5">
              {/* Card Preview */}
              <div 
                className="w-full aspect-[1.586/1] rounded-2xl p-6 flex flex-col justify-between shadow-xl transition-colors duration-500"
                style={{ backgroundColor: selectedColor }}
              >
                <div className="flex justify-between items-start">
                  <div className="text-white/80 text-xs font-medium uppercase tracking-widest">
                    {cardholderName || "CARDHOLDER NAME"}
                  </div>
                  <div className="h-8">
                    {cardType === "uzcard" && <img src={imgUzcard} alt="Uzcard" className="h-full object-contain" />}
                    {cardType === "humo" && <img src={imgHumo} alt="Humo" className="h-full object-contain" />}
                  </div>
                </div>
                <div className="text-white text-xl font-medium tracking-[0.2em]">
                  {cardNumber || "0000 0000 0000 0000"}
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-white/80 text-xs">
                    EXP: {expiryDate || "MM/YY"}
                  </div>
                </div>
              </div>

              {/* Design Selection */}
              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: colors.text }}>
                  {content[language].chooseDesign}
                </label>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {cardDesigns.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-transform active:scale-95"
                      style={{ 
                        backgroundColor: color,
                        borderColor: selectedColor === color ? colors.primary : 'transparent'
                      }}
                    >
                      {selectedColor === color && <IconCheck size={18} className="text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cardholder Name */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  {content[language].cardholderName}
                </label>
                <input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder={content[language].enterName}
                  className="w-full px-4 py-3 rounded-2xl text-base outline-none transition-colors"
                  style={{
                    backgroundColor: colors.cardBackground,
                    color: colors.text,
                    border: `1px solid ${colors.border}`
                  }}
                />
              </div>

              {/* Card Number */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  {content[language].cardNumber}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder={content[language].enterCardNumber}
                    className="w-full px-4 py-3 rounded-2xl text-base outline-none transition-colors tracking-wider"
                    style={{
                      backgroundColor: colors.cardBackground,
                      color: colors.text,
                      border: `1px solid ${colors.border}`
                    }}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 h-6">
                    {cardType === "uzcard" && <img src={imgUzcard} alt="Uzcard" className="h-full" />}
                    {cardType === "humo" && <img src={imgHumo} alt="Humo" className="h-full" />}
                  </div>
                </div>
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                    {content[language].expiryDate}
                  </label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={handleExpiryChange}
                    placeholder={content[language].enterExpiry}
                    className="w-full px-4 py-3 rounded-2xl text-base outline-none transition-colors"
                    style={{
                      backgroundColor: colors.cardBackground,
                      color: colors.text,
                      border: `1px solid ${colors.border}`
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                    {content[language].cvv}
                  </label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={handleCVVChange}
                    placeholder={content[language].enterCVV}
                    className="w-full px-4 py-3 rounded-2xl text-base outline-none transition-colors"
                    style={{
                      backgroundColor: colors.cardBackground,
                      color: colors.text,
                      border: `1px solid ${colors.border}`
                    }}
                  />
                </div>
              </div>

              {/* Initial Balance */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  {content[language].initialBalance}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={initialBalance}
                    onChange={(e) => setInitialBalance(e.target.value)}
                    placeholder={content[language].enterBalance}
                    className="w-full px-4 py-3 rounded-2xl text-base outline-none transition-colors pr-12"
                    style={{
                      backgroundColor: colors.cardBackground,
                      color: colors.text,
                      border: `1px solid ${colors.border}`
                    }}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-medium" style={{ color: colors.textSecondary }}>som</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4 pb-8">
                <button
                  onClick={onClose}
                  className="flex-1 py-4 rounded-full font-semibold text-base transition-colors"
                  style={{
                    backgroundColor: colors.cardBackground,
                    color: colors.text
                  }}
                >
                  {content[language].cancel}
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-4 rounded-full font-semibold text-base bg-[#7c3aed] text-white hover:bg-[#6d32d4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!isValidCard()}
                >
                  {content[language].add}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}