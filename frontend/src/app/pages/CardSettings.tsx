import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { cardsService, Card } from "../api/services/cards.service";
import { BottomNav } from "../components/BottomNav";
import { AddCardDrawer } from "../components/AddCardDrawer";
import { IconArrowLeft, IconLock, IconCreditCard, IconShieldOff, IconCopy, IconCheck, IconEye, IconEyeOff, IconPlus } from "@tabler/icons-react";
import imgUzcard from "../../assets/uzcard.png";
import imgHumo from "../../assets/humo.png";
import cardBlack from "../../assets/card-black.png";
import cardBlue from "../../assets/card-blue.png";
import cardGreen from "../../assets/card-green.png";
import cardRed from "../../assets/card-red.png";
import cardYellow from "../../assets/card-yellow.png";
import cardBg from "figma:asset/9d007835032269e072081ad973a5bb9d260a672c.png";

export default function CardSettings() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();

  const getCardLogo = (type: string, number: string = "") => {
    if (type === "humo") return imgHumo;
    if (type === "uzcard") return imgUzcard;
    
    // Fallback detection
    const cleanNumber = (number || "").replace(/\s/g, "");
    if (cleanNumber.startsWith("9860")) return imgHumo;
    if (cleanNumber.startsWith("8600")) return imgUzcard;
    return imgUzcard;
  };
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(true);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);

  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cards
  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);
      try {
        const response = await cardsService.getCards();
        setCards(response?.cards ?? []);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
        // Fallback for demo
      } finally {
        setIsLoading(false);
      }
    };
    fetchCards();
  }, []);

  const selectedCardData = cards.find(card => card.id === selectedCard);

  const handleToggleLock = async () => {
    if (!selectedCard) return;
    try {
      const response = await cardsService.toggleLock(selectedCard);
      setCards(prev => prev.map(c => c.id === selectedCard ? { ...c, status: response.status } : c));
    } catch (error) {
      console.error("Failed to toggle lock:", error);
    }
  };

  const handleDeactivate = async () => {
    if (!selectedCard) return;
    if (confirm(language === "rus" ? "Вы уверены, что хотите деактивировать эту карту?" : "Haqiqatan ham ushbu kartani o'chirmoqchimisiz?")) {
      try {
        await cardsService.deactivateCard(selectedCard);
        setCards(prev => prev.filter(c => c.id !== selectedCard));
        setSelectedCard(null);
      } catch (error) {
        console.error("Failed to deactivate card:", error);
      }
    }
  };

  const content = {
    rus: {
      title: "Моя Карта",
      availableBalance: "Доступный Баланс",
      cardHolder: "Держатель Карты",
      validFrom: "Действует с",
      validThru: "Действует до",
      settings: "Настройки",
      changePin: "Изменить PIN",
      lockCard: "Блокировать Карту",
      deactivateCard: "Деактивировать Карту",
      save: "Сохранить",
      myCards: "Мои Карты",
      addCard: "Добавить Карту"
    },
    uzb: {
      title: "Mening Kartam",
      availableBalance: "Mavjud Balans",
      cardHolder: "Karta Egasi",
      validFrom: "Dan amal qiladi",
      validThru: "Gacha amal qiladi",
      settings: "Sozlamalar",
      changePin: "PIN o'zgartirish",
      lockCard: "Kartani bloklash",
      deactivateCard: "Kartani o'chirish",
      save: "Saqlash",
      myCards: "Mening Kartalarim",
      addCard: "Karta Qo'shish"
    }
  };

  const handleCopyCardNumber = (fullCardNumber: string) => {
    navigator.clipboard.writeText(fullCardNumber.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddCard = async (newCard: { cardholder_name: string; card_number: string; expiry_date: string; balance: string; color: string; card_bg: string }) => {
    try {
      const addedCard = await cardsService.addCard({
        cardholder_name: newCard.cardholder_name,
        card_number: newCard.card_number,
        expiry_date: newCard.expiry_date,
        balance: parseFloat(newCard.balance),
        color: newCard.color,
        card_bg: newCard.card_bg
      });
      setCards([...cards, addedCard]);
    } catch (error) {
      console.error("Failed to add card:", error);
    }
  };

  const getCardBg = (bgName?: string) => {
    switch (bgName) {
      case "black": return cardBlack;
      case "blue": return cardBlue;
      case "green": return cardGreen;
      case "red": return cardRed;
      case "yellow": return cardYellow;
      default: return cardBlack;
    }
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
        {selectedCard ? (
          <button
            onClick={() => setSelectedCard(null)}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: `${colors.text}08` }}
          >
            <IconArrowLeft size={20} style={{ color: colors.text }} />
          </button>
        ) : (
          <div className="w-11" />
        )}
        <h1 className="text-xl font-semibold" style={{ color: colors.text }}>
          {selectedCard ? content[language].title : content[language].myCards}
        </h1>
        <div className="w-11" />
      </motion.div>

      {!selectedCard ? (
        // Cards List View
        <motion.div
          className="px-6 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid gap-3">
            {isLoading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="animate-pulse h-48 rounded-2xl w-full" style={{ backgroundColor: colors.cardBackground }}></div>
              ))
            ) : cards.map((card) => (
              <motion.div
                key={card.id}
                onClick={() => setSelectedCard(card.id)}
                className="rounded-2xl shadow-lg relative overflow-hidden cursor-pointer"
                style={{ aspectRatio: "1.586 / 1" }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Card Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={getCardBg(card.card_bg)}
                    alt="Card background"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="relative z-10 h-full flex flex-col justify-between p-5">
                  {/* Top Section - Balance */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white/90 text-xs font-medium mb-1.5">{content[language].availableBalance}</p>
                      <p className="text-white text-3xl font-bold tracking-tight drop-shadow-lg">
                        {card.balance.toLocaleString()} so'm
                      </p>
                    </div>
                    <div className="w-12 h-12 flex-shrink-0">
                      <img src={getCardLogo(card.type, card.number)} alt="Card type" className="w-full h-full object-contain drop-shadow-lg" />
                    </div>
                  </div>

                  {/* Bottom Section - Card Number */}
                  <div className="flex items-center gap-2">
                    <span className="text-white text-lg font-medium tracking-widest drop-shadow-lg">
                      •••• •••• •••• {(card.number || "").slice(-4)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Add Card Button */}
            <motion.button
              onClick={() => setIsAddCardOpen(true)}
              className="w-full rounded-2xl p-6 flex items-center justify-center gap-3 transition-all"
              style={{
                backgroundColor: colors.cardBackground,
                border: `2px dashed ${colors.border}`
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-12 h-12 rounded-full bg-[#7c3aed] flex items-center justify-center">
                <IconPlus size={24} className="text-white" />
              </div>
              <span className="text-lg font-semibold" style={{ color: colors.text }}>
                {content[language].addCard}
              </span>
            </motion.button>
          </div>
        </motion.div>
      ) : (
        // Card Details View
        <>
          {/* Credit Card */}
          <motion.div
            className="px-6 mb-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <div className="rounded-2xl shadow-lg relative overflow-hidden" style={{ aspectRatio: "1.586 / 1" }}>
              {/* Card Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={getCardBg(selectedCardData?.card_bg)}
                  alt="Card background"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between p-5">
                {/* Top Section - Balance */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/90 text-xs font-medium mb-1.5">{content[language].availableBalance}</p>
                    <p className="text-white text-3xl font-bold tracking-tight drop-shadow-lg">
                      {selectedCardData?.balance.toLocaleString()} so'm
                    </p>
                  </div>
                  <div className="w-12 h-12 flex-shrink-0">
                    <img src={getCardLogo(selectedCardData?.type || "uzcard", selectedCardData?.number || "")} alt="Card type" className="w-full h-full object-contain drop-shadow-lg" />
                  </div>
                </div>

                {/* Bottom Section - Card Number */}
                <div className="flex items-center gap-2">
                  <span className="text-white text-lg font-medium tracking-widest drop-shadow-lg">
                    {showCardNumber ? (
                      (selectedCardData?.number || "0000 0000 0000 0000").match(/.{1,4}/g)?.join(" ")
                    ) : (
                      "•••• •••• •••• ••••"
                    )}
                  </span>
                  <button
                    onClick={() => handleCopyCardNumber(selectedCardData?.number || "")}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                  >
                    {copied ? (
                      <IconCheck size={16} className="text-white drop-shadow-lg" />
                    ) : (
                      <IconCopy size={16} className="text-white/90 drop-shadow-lg" />
                    )}
                  </button>
                  <button
                    onClick={() => setShowCardNumber(!showCardNumber)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                  >
                    {showCardNumber ? (
                      <IconEyeOff size={16} className="text-white drop-shadow-lg" />
                    ) : (
                      <IconEye size={16} className="text-white/90 drop-shadow-lg" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Settings */}
          <motion.div
            className="px-6 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold mb-3" style={{ color: colors.text }}>{content[language].settings}</h2>

            <div className="space-y-2.5">
              {/* Change Pin */}
              <button
                className="w-full rounded-[20px] p-4 flex items-center justify-between transition-colors"
                style={{ backgroundColor: colors.cardBackground }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#13c999]/10 rounded-full flex items-center justify-center">
                    <IconLock size={18} className="text-[#13c999]" />
                  </div>
                  <span className="font-semibold" style={{ color: colors.text }}>{content[language].changePin}</span>
                </div>
                <IconArrowLeft size={20} style={{ color: colors.textSecondary }} className="rotate-180" />
              </button>

              {/* Lock Card */}
              <div
                className="w-full rounded-[20px] p-4 flex items-center justify-between"
                style={{ backgroundColor: colors.cardBackground }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#ff4757]/10 rounded-full flex items-center justify-center">
                    <IconCreditCard size={18} className="text-[#ff4757]" />
                  </div>
                  <span className="font-semibold" style={{ color: colors.text }}>{content[language].lockCard}</span>
                </div>
                <button
                  onClick={handleToggleLock}
                  className={`relative w-12 h-6 rounded-full transition-colors`}
                  style={{ backgroundColor: selectedCardData?.status === "locked" ? "#ff4757" : "#2a2a3c" }}
                >
                  <motion.div
                    className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                    animate={{ x: selectedCardData?.status === "locked" ? 26 : 2 }}
                    transition={{ duration: 0.2 }}
                  />
                </button>
              </div>

              {/* Deactivate Card */}
              <button
                onClick={handleDeactivate}
                className="w-full rounded-[20px] p-4 flex items-center justify-between"
                style={{ backgroundColor: colors.cardBackground }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#7c3aed]/10 rounded-full flex items-center justify-center">
                    <IconShieldOff size={18} className="text-[#7c3aed]" />
                  </div>
                  <span className="font-semibold" style={{ color: colors.text }}>{content[language].deactivateCard}</span>
                </div>
                <IconArrowLeft size={20} style={{ color: colors.textSecondary }} className="rotate-180" />
              </button>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            className="px-6 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <button className="w-full bg-[#7c3aed] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#6d32d4] transition-colors shadow-lg">
              {content[language].save}
            </button>
          </motion.div>
        </>
      )}

      <BottomNav />
      <AddCardDrawer isOpen={isAddCardOpen} onClose={() => setIsAddCardOpen(false)} onAddCard={handleAddCard} />
    </div>
  );
}