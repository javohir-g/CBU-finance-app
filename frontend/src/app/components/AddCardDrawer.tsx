import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { IconX, IconCheck } from "@tabler/icons-react";
import imgUzcard from "figma:asset/Uzcard-01.png";
import imgHumo from "figma:asset/Humo-01.jpg";
import cardBlack from "../assets/card-black.png";
import cardBlue from "../assets/card-blue.png";
import cardGreen from "../assets/card-green.png";
import cardRed from "../assets/card-red.png";
import cardYellow from "../assets/card-yellow.png";

interface AddCardDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCard: (card: { cardholder_name: string; card_number: string; expiry_date: string; balance: string; color: string; card_bg: string }) => void;
}

export function AddCardDrawer({ isOpen, onClose, onAddCard }: AddCardDrawerProps) {
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [initialBalance, setInitialBalance] = useState("");
  const [selectedColor, setSelectedColor] = useState("#7c3aed");
  const [selectedBg, setSelectedBg] = useState(cardBlack);
  const [errorMessage, setErrorMessage] = useState("");

  const cardDesigns = [
    { color: "#1e1e1e", bg: cardBlack },
    { color: "#1d4ed8", bg: cardBlue },
    { color: "#047857", bg: cardGreen },
    { color: "#b91c1c", bg: cardRed },
    { color: "#b45309", bg: cardYellow },
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
      initialBalance: "Начальный баланс",
      cancel: "Отмена",
      add: "Добавить",
      enterName: "Введите имя",
      enterCardNumber: "0000 0000 0000 0000",
      enterExpiry: "MM/YY",
      enterBalance: "0.00",
      chooseDesign: "Выбрать дизайн",
      errorPrefix: "Номер карты должен начинаться с 8600 или 9860",
      errorLength: "Номер карты должен содержать 16 цифр",
      errorExpiry: "Введите корректный срок действия (ММ/ГГ)",
      errorName: "Введите имя держателя карты",
      errorBalance: "Введите начальный баланс"
    },
    uzb: {
      title: "Karta Qo'shish",
      cardholderName: "Karta egasi nomi",
      cardNumber: "Karta raqami",
      expiryDate: "Amal qilish muddati (OO/YY)",
      initialBalance: "Boshlang'ich balans",
      cancel: "Bekor qilish",
      add: "Qo'shish",
      enterName: "Nomini kiriting",
      enterCardNumber: "0000 0000 0000 0000",
      enterExpiry: "OO/YY",
      enterBalance: "0.00",
      chooseDesign: "Dizaynni tanlang",
      errorPrefix: "Karta raqami 8600 yoki 9860 bilan boshlanishi kerak",
      errorLength: "Karta raqami 16 ta raqamdan iborat bo'lishi kerak",
      errorExpiry: "Amal qilish muddatini to'g'ri kiriting (OO/YY)",
      errorName: "Karta egasi ismini kiriting",
      errorBalance: "Boshlang'ich balansni kiriting"
    }
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(" ") : cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    const value = e.target.value.replace(/\s/g, "");
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(formatCardNumber(value));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    if (value.length <= 5) {
      setExpiryDate(value);
    }
  };

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
  };

  const isValidCard = () => {
    const cleanNumber = cardNumber.replace(/\s/g, "");
    return (
      cardholderName.trim() &&
      cleanNumber.length === 16 &&
      (cleanNumber.startsWith("8600") || cleanNumber.startsWith("9860")) &&
      expiryDate.length === 5 &&
      initialBalance
    );
  };

  const handleSubmit = () => {
    const cleanNumber = cardNumber.replace(/\s/g, "");
    
    if (!cardholderName.trim()) {
      setErrorMessage(content[language].errorName);
      return;
    }
    if (cleanNumber.length !== 16) {
      setErrorMessage(content[language].errorLength);
      return;
    }
    if (!cleanNumber.startsWith("8600") && !cleanNumber.startsWith("9860")) {
      setErrorMessage(content[language].errorPrefix);
      return;
    }
    if (expiryDate.length !== 5) {
      setErrorMessage(content[language].errorExpiry);
      return;
    }
    if (!initialBalance) {
      setErrorMessage(content[language].errorBalance);
      return;
    }

    setErrorMessage("");
    onAddCard({
      cardholder_name: cardholderName,
      card_number: cleanNumber,
      expiry_date: expiryDate,
      balance: initialBalance,
      color: selectedColor,
      card_bg: selectedBg === cardBlack ? "black" : (selectedBg === cardBlue ? "blue" : (selectedBg === cardGreen ? "green" : (selectedBg === cardRed ? "red" : "yellow")))
    });
    // Reset form
    setCardholderName("");
    setCardNumber("");
    setExpiryDate("");
    setInitialBalance("");
    setSelectedBg(cardBlack);
    onClose();
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
                className="w-full aspect-[1.586/1] rounded-2xl p-6 flex flex-col justify-between shadow-xl transition-all duration-500 relative overflow-hidden"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img src={selectedBg} alt="Card Background" className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-between items-start relative z-10">
                  <div className="text-white/80 text-xs font-medium uppercase tracking-widest drop-shadow-md">
                    {cardholderName || "CARDHOLDER NAME"}
                  </div>
                  <div className="h-8">
                    {cardType === "uzcard" && <img src={imgUzcard} alt="Uzcard" className="h-full object-contain drop-shadow-md" />}
                    {cardType === "humo" && <img src={imgHumo} alt="Humo" className="h-full object-contain drop-shadow-md" />}
                  </div>
                </div>
                <div className="text-white text-xl font-medium tracking-[0.2em] relative z-10 drop-shadow-md">
                  {cardNumber || "0000 0000 0000 0000"}
                </div>
                <div className="flex justify-between items-end relative z-10">
                  <div className="text-white/80 text-xs drop-shadow-md">
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
                  {cardDesigns.map(design => (
                    <button
                      key={design.color}
                      onClick={() => {
                        setSelectedColor(design.color);
                        setSelectedBg(design.bg);
                      }}
                      className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center border-2 transition-all active:scale-95 overflow-hidden"
                      style={{ 
                        borderColor: selectedColor === design.color ? colors.primary : 'transparent'
                      }}
                    >
                      <img src={design.bg} alt="design" className="w-full h-full object-cover" />
                      {selectedColor === design.color && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <IconCheck size={18} className="text-white" />
                        </div>
                      )}
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
                  onChange={(e) => {
                    setCardholderName(e.target.value);
                    setErrorMessage("");
                  }}
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

              {/* Expiry */}
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

              {/* Initial Balance */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  {content[language].initialBalance}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={initialBalance}
                    onChange={(e) => {
                      setInitialBalance(e.target.value);
                      setErrorMessage("");
                    }}
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

              {/* Error Message */}
              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3"
                  >
                    <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
                  </motion.div>
                )}
              </AnimatePresence>

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
                  className="flex-1 py-4 rounded-full font-semibold text-base bg-[#7c3aed] text-white hover:bg-[#6d32d4] transition-colors"
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