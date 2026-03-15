import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { IconX, IconChevronDown } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { cardsService, Card } from "../api/services/cards.service";
import { savingsService } from "../api/services/savings.service";
import imgUzcard from "../assets/uzcard.png";
import imgHumo from "../assets/humo.png";

interface TopUpGoalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  goalId: number | null;
  goalName: string;
}

export function TopUpGoalDrawer({ isOpen, onClose, onSuccess, goalId, goalName }: TopUpGoalDrawerProps) {
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
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
          if (cardsData.length > 0) {
            setSelectedCardId(cardsData[0].id);
          }
        } catch (error) {
          console.error("Failed to fetch cards:", error);
        } finally {
          setIsLoadingCards(false);
        }
      };
      fetchCards();
    }
  }, [isOpen]);

  const content = {
    rus: {
      title: "Пополнить цель",
      selectCard: "Выберите карту для списания",
      amount: "Сумма пополнения",
      submit: "Пополнить",
      cancel: "Отмена"
    },
    uzb: {
      title: "Maqsadni to'ldirish",
      selectCard: "Yechib olish uchun kartani tanlang",
      amount: "To'ldirish summasi",
      submit: "To'ldirish",
      cancel: "Bekor qilish"
    }
  };

  const handleSubmit = async () => {
    if (!goalId || !selectedCardId || !amount || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await savingsService.addMoneyToGoal(goalId, parseFloat(amount), selectedCardId);
      onSuccess?.();
      onClose();
      setAmount("");
    } catch (error) {
      console.error("Top up failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl shadow-2xl overflow-hidden max-h-[85vh]"
            style={{ backgroundColor: colors.background }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: colors.border }}>
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold" style={{ color: colors.text }}>{content[language].title}</h2>
                <p className="text-xs font-medium" style={{ color: colors.textSecondary }}>{goalName}</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: colors.cardBackground }}
              >
                <IconX size={20} style={{ color: colors.text }} />
              </button>
            </div>

            <div className="px-6 py-6 space-y-6">
              {/* Amount */}
              <div>
                <label className="text-sm font-semibold mb-2 block" style={{ color: colors.textSecondary }}>{content[language].amount}</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full text-4xl font-bold bg-transparent border-b-2 outline-none pb-2 text-center"
                    style={{ color: colors.text, borderColor: colors.border }}
                  />
                  <span className="absolute right-0 bottom-2 text-lg font-medium" style={{ color: colors.textSecondary }}>som</span>
                </div>
              </div>

              {/* Card Selection */}
              <div className="space-y-3">
                <label className="text-sm font-semibold block" style={{ color: colors.textSecondary }}>{content[language].selectCard}</label>
                <div className="grid gap-2">
                  {cards.map(card => (
                    <button
                      key={card.id}
                      onClick={() => setSelectedCardId(card.id)}
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                        selectedCardId === card.id ? "border-[#7c3aed]" : "border-transparent"
                      }`}
                      style={{ backgroundColor: colors.cardBackground }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-white/5">
                            <img 
                                src={card.number.startsWith("8600") ? imgUzcard : (card.number.startsWith("9860") ? imgHumo : imgUzcard)} 
                                className="w-7 h-7 object-contain" 
                            />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-semibold" style={{ color: colors.text }}>{card.name}</p>
                            <p className="text-xs" style={{ color: colors.textSecondary }}>•••• {card.number}</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold" style={{ color: colors.text }}>{card.balance.toLocaleString()} som</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!selectedCardId || !amount || isSubmitting}
                className="w-full py-5 rounded-full bg-[#7c3aed] text-white font-bold text-lg shadow-xl active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSubmitting ? "..." : content[language].submit}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
