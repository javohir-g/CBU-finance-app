import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { cardsService, Card } from "../api/services/cards.service";
import { transactionsService } from "../api/services/transactions.service";
import { IconArrowLeft, IconScan, IconSearch, IconArrowRight, IconCheck } from "@tabler/icons-react";
import imgUzcard from "../../assets/uzcard.png";
import imgHumo from "../../assets/humo.png";

export default function Transfer() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();
  
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [recipientCard, setRecipientCard] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await cardsService.getCards();
        setCards(response.cards);
        if (response.cards.length > 0) {
          setSelectedCard(response.cards[0]);
        }
      } catch (error) {
        console.error("Failed to fetch cards:", error);
      }
    };
    fetchCards();
  }, []);

  const handleTransfer = async () => {
    if (!selectedCard || !recipientCard || !amount) return;
    
    setIsProcessing(true);
    try {
      await transactionsService.transfer({
        from_card_id: selectedCard.id,
        to_phone: recipientCard.replace(/\s/g, ""), // For now use card number as 'phone' or just a string
        amount: parseFloat(amount),
        description: comment || "Transfer"
      });
      setIsSuccess(true);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("Transfer failed. Please check details.");
    } finally {
      setIsProcessing(false);
    }
  };

  const getCardLogo = (type: string) => {
    if (type === "humo") return imgHumo;
    if (type === "uzcard") return imgUzcard;
    return null;
  };

  const content = {
    rus: {
      title: "Перевод средств",
      from: "С какой карты",
      to: "Кому",
      cardNumberLabel: "Номер карты получателя",
      amountLabel: "Сумма перевода",
      commentLabel: "Комментарий (необязательно)",
      button: "Перевести",
      success: "Перевод успешно выполнен!",
      placeholderCard: "0000 0000 0000 0000",
      placeholderComment: "На обед, долг и т.д."
    },
    uzb: {
      title: "Mablag' o'tkazish",
      from: "Qaysi kartadan",
      to: "Kimga",
      cardNumberLabel: "Qabul qiluvchi karta raqami",
      amountLabel: "O'tkazma summasi",
      commentLabel: "Izoh (ixtiyoriy)",
      button: "O'tkazish",
      success: "O'tkazma muvaffaqiyatli bajarildi!",
      placeholderCard: "0000 0000 0000 0000",
      placeholderComment: "Tushlik uchun, qarz va h.k."
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 text-center" style={{ backgroundColor: colors.background }}>
        <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-6 shadow-2xl shadow-green-500/30"
        >
            <IconCheck size={48} className="text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: colors.text }}>{content[language].success}</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full pb-32 overflow-x-hidden" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <motion.div
        className="flex items-center justify-between px-[20px] py-[15px]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
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

      <div className="px-6 pt-4 space-y-6">
        {/* Source Card */}
        <div className="space-y-3">
          <label className="text-sm font-semibold px-1" style={{ color: colors.textSecondary }}>{content[language].from}</label>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
            {cards.map(card => (
              <button
                key={card.id}
                onClick={() => setSelectedCard(card)}
                className={`flex-shrink-0 w-64 rounded-[28px] p-5 transition-all text-left relative overflow-hidden flex flex-col justify-between border-2 ${
                  selectedCard?.id === card.id ? 'border-[#7c3aed] scale-100 shadow-xl' : 'border-transparent scale-95 opacity-80'
                }`}
                style={{ 
                    backgroundColor: colors.cardBackground,
                    minHeight: '140px'
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] text-white/60 font-medium uppercase tracking-widest">{card.name}</p>
                    <p className="text-sm font-bold text-white mt-1">•••• {card.number.slice(-4)}</p>
                  </div>
                  <img src={getCardLogo(card.type) || ""} alt="" className="h-6 object-contain" />
                </div>
                <div>
                   <p className="text-xs text-white/80">{language === 'rus' ? 'Баланс' : 'Balans'}</p>
                   <p className="text-xl font-bold text-white">{card.balance.toLocaleString()} som</p>
                </div>
                {/* Background Overlay for better UI */}
                <div className="absolute inset-0 z-[-1] opacity-20" style={{ backgroundColor: card.color || '#7c3aed' }} />
                <div className="absolute bottom-[-20%] right-[-10%] w-32 h-32 rounded-full blur-3xl opacity-30" style={{ backgroundColor: card.color || '#7c3aed' }} />
              </button>
            ))}
          </div>
        </div>

        {/* Recipient Input */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
             <label className="text-sm font-semibold" style={{ color: colors.textSecondary }}>{content[language].to}</label>
             <button className="text-[#7c3aed] flex items-center gap-1 text-xs font-bold">
                <IconScan size={14} /> {language === 'rus' ? 'Сканировать' : 'Skaner'}
             </button>
          </div>
          <div className="relative">
            <input
              type="text"
              value={recipientCard}
              onChange={(e) => setRecipientCard(e.target.value)}
              placeholder={content[language].placeholderCard}
              className="w-full px-5 py-5 rounded-[24px] text-lg font-medium outline-none transition-all pr-14"
              style={{
                backgroundColor: colors.cardBackground,
                color: colors.text,
                border: `1px solid ${colors.border}`
              }}
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2">
               <IconSearch size={22} style={{ color: colors.textSecondary }} />
            </div>
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-3">
          <label className="text-sm font-semibold px-1" style={{ color: colors.textSecondary }}>{content[language].amountLabel}</label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-5 py-5 rounded-[24px] text-2xl font-bold outline-none transition-all pr-14"
              style={{
                backgroundColor: colors.cardBackground,
                color: colors.text,
                border: `1px solid ${colors.border}`
              }}
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 font-bold opacity-40">som</span>
          </div>
        </div>

        {/* Comment */}
        <div className="space-y-3">
          <label className="text-sm font-semibold px-1" style={{ color: colors.textSecondary }}>{content[language].commentLabel}</label>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={content[language].placeholderComment}
            className="w-full px-5 py-4 rounded-[24px] text-base outline-none transition-all"
            style={{
              backgroundColor: colors.cardBackground,
              color: colors.text,
              border: `1px solid ${colors.border}`
            }}
          />
        </div>

        {/* Submit Button */}
        <motion.button
          onClick={handleTransfer}
          disabled={isProcessing || !amount || recipientCard.length < 16}
          className="w-full py-5 rounded-full font-bold text-xl bg-[#7c3aed] text-white shadow-2xl shadow-[#7c3aed]/30 flex items-center justify-center gap-3 disabled:opacity-50 transition-all mt-4"
          whileTap={{ scale: 0.98 }}
        >
          {isProcessing ? (
            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              {content[language].button}
              <IconArrowRight size={24} />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
