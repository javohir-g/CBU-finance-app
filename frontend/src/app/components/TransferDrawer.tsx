import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { IconX, IconArrowRight, IconDeviceMobile, IconCreditCard, IconChevronDown } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { cardsService, Card } from "../api/services/cards.service";
import { transactionsService } from "../api/services/transactions.service";
import imgUzcard from "../../assets/uzcard.png";
import imgHumo from "../../assets/humo.png";

interface TransferDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function TransferDrawer({ isOpen, onClose, onSuccess }: TransferDrawerProps) {
  const { language } = useLanguage();
  const { colors } = useTheme();
  
  const [transferType, setTransferType] = useState<"cards" | "phone">("cards");
  const [fromCardId, setFromCardId] = useState<number | null>(null);
  const [toCardId, setToCardId] = useState<number | null>(null);
  const [toPhone, setToPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

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
            setFromCardId(cardsData[0].id);
            if (cardsData.length > 1) {
              setToCardId(cardsData[1].id);
            }
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
      title: "Перевод",
      betweenCards: "Между картами",
      byPhone: "По номеру телефона",
      fromCard: "С карты",
      toCard: "На карту",
      toPhone: "Номер телефона",
      phonePlaceholder: "+998 90 123 45 67",
      amount: "Сумма",
      amountPlaceholder: "0",
      description: "Комментарий",
      descriptionPlaceholder: "На что перевод?",
      transfer: "Перевести",
      cancel: "Отмена"
    },
    uzb: {
      title: "O'tkazma",
      betweenCards: "Kartalararo",
      byPhone: "Telefon raqamga",
      fromCard: "Qaysi kartadan",
      toCard: "Qaysi kartaga",
      toPhone: "Telefon raqami",
      phonePlaceholder: "+998 90 123 45 67",
      amount: "Summa",
      amountPlaceholder: "0",
      description: "Izoh",
      descriptionPlaceholder: "O'tkazma nima uchun?",
      transfer: "O'tkazish",
      cancel: "Bekor qilish"
    }
  };

  const getCardLogo = (num: string) => {
    if (num.startsWith("8600")) return imgUzcard;
    if (num.startsWith("9860")) return imgHumo;
    return imgUzcard;
  };

  const handleSubmit = async () => {
    if (!fromCardId || (transferType === "cards" && !toCardId) || (transferType === "phone" && !toPhone) || !amount || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      await transactionsService.transfer({
        from_card_id: fromCardId,
        to_card_id: transferType === "cards" ? toCardId! : undefined,
        to_phone: transferType === "phone" ? toPhone : undefined,
        amount: parseFloat(amount),
        description: description
      });

      onSuccess?.();
      onClose();
      // Reset
      setAmount("");
      setDescription("");
      setToPhone("");
    } catch (error) {
      console.error("Transfer failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fromCard = cards.find(c => c.id === fromCardId);
  const toCard = cards.find(c => c.id === toCardId);

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
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl shadow-2xl overflow-hidden max-h-[90vh]"
            style={{ backgroundColor: colors.background }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: colors.border }}>
              <h2 className="text-xl font-semibold" style={{ color: colors.text }}>{content[language].title}</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: colors.cardBackground }}
              >
                <IconX size={20} style={{ color: colors.text }} />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-80px)] px-6 py-6 space-y-6">
              {/* Type Switcher */}
              <div className="flex p-1 rounded-2xl" style={{ backgroundColor: colors.cardBackground }}>
                <button
                  onClick={() => setTransferType("cards")}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                    transferType === "cards" ? "bg-[#7c3aed] text-white shadow-lg" : ""
                  }`}
                  style={{ color: transferType === "cards" ? "#fff" : colors.textSecondary }}
                >
                  {content[language].betweenCards}
                </button>
                <button
                  onClick={() => setTransferType("phone")}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                    transferType === "phone" ? "bg-[#7c3aed] text-white shadow-lg" : ""
                  }`}
                  style={{ color: transferType === "phone" ? "#fff" : colors.textSecondary }}
                >
                  {content[language].byPhone}
                </button>
              </div>

              {/* Amount */}
              <div className="text-center">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={content[language].amountPlaceholder}
                  className="w-full bg-transparent text-5xl font-bold text-center outline-none"
                  style={{ color: colors.text }}
                />
                <p className="mt-2 font-medium" style={{ color: colors.textSecondary }}>so'm</p>
              </div>

              {/* From Card */}
              <div className="space-y-3">
                <label className="text-sm font-semibold" style={{ color: colors.textSecondary }}>{content[language].fromCard}</label>
                <div className="grid gap-2 horizontal-scroll flex overflow-x-auto pb-2 scrollbar-none">
                  {cards.map(card => (
                    <button
                      key={card.id}
                      onClick={() => setFromCardId(card.id)}
                      className={`flex-shrink-0 w-64 rounded-2xl p-4 text-left transition-all border-2 ${
                        fromCardId === card.id ? "border-[#7c3aed] scale-[1.02]" : "border-transparent"
                      }`}
                      style={{ backgroundColor: card.color || colors.cardBackground }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <img src={getCardLogo(card.number)} alt="" className="h-6" />
                        <span className="text-white font-bold text-xs">{card.balance.toLocaleString()} so'm</span>
                      </div>
                      <p className="text-white font-medium text-sm">•••• {card.number}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Target */}
              <div className="space-y-3">
                {transferType === "cards" ? (
                  <>
                    <label className="text-sm font-semibold" style={{ color: colors.textSecondary }}>{content[language].toCard}</label>
                    <div className="grid gap-2 horizontal-scroll flex overflow-x-auto pb-2 scrollbar-none">
                      {cards.filter(c => c.id !== fromCardId).map(card => (
                        <button
                          key={card.id}
                          onClick={() => setToCardId(card.id)}
                          className={`flex-shrink-0 w-64 rounded-2xl p-4 text-left transition-all border-2 ${
                            toCardId === card.id ? "border-[#7c3aed] scale-[1.02]" : "border-transparent"
                          }`}
                          style={{ backgroundColor: card.color || colors.cardBackground }}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <img src={getCardLogo(card.number)} alt="" className="h-6" />
                            <span className="text-white font-bold text-xs">{card.balance.toLocaleString()} so'm</span>
                          </div>
                          <p className="text-white font-medium text-sm">•••• {card.number}</p>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <label className="text-sm font-semibold" style={{ color: colors.textSecondary }}>{content[language].toPhone}</label>
                    <div className="relative">
                      <IconDeviceMobile size={20} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" style={{ color: colors.text }} />
                      <input
                        type="tel"
                        value={toPhone}
                        onChange={(e) => setToPhone(e.target.value)}
                        placeholder={content[language].phonePlaceholder}
                        className="w-full rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-[#7c3aed]"
                        style={{ backgroundColor: colors.cardBackground, color: colors.text, border: `1px solid ${colors.border}` }}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-semibold" style={{ color: colors.textSecondary }}>{content[language].description}</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={content[language].descriptionPlaceholder}
                  className="w-full rounded-2xl px-4 py-4 outline-none focus:ring-2 focus:ring-[#7c3aed]"
                  style={{ backgroundColor: colors.cardBackground, color: colors.text, border: `1px solid ${colors.border}` }}
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!fromCardId || (transferType === "cards" && !toCardId) || (transferType === "phone" && !toPhone) || !amount || isSubmitting}
                className="w-full py-5 rounded-full bg-[#7c3aed] text-white font-bold text-lg shadow-xl active:scale-[0.98] transition-transform disabled:opacity-50"
              >
                {isSubmitting ? "..." : content[language].transfer}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
