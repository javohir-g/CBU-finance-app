import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { BottomNav } from "../components/BottomNav";
import { IconArrowLeft, IconArrowsExchange } from "@tabler/icons-react";

export default function Conversion() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [fromAmount, setFromAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("UZS");
  const [toCurrency, setToCurrency] = useState("USD");

  const content = {
    rus: {
      title: "Конверсия",
      from: "Отдаете",
      to: "Получаете",
      rate: "Курс",
      convert: "Конвертировать",
      enterAmount: "Введите сумму"
    },
    uzb: {
      title: "Konversiya",
      from: "Berasiz",
      to: "Olasiz",
      rate: "Kurs",
      convert: "Konvertatsiya qilish",
      enterAmount: "Summani kiriting"
    }
  };

  const currencies = [
    { code: "UZS", name: "Uzbek Sum", flag: "🇺🇿" },
    { code: "USD", name: "US Dollar", flag: "🇺🇸" },
    { code: "EUR", name: "Euro", flag: "🇪🇺" },
    { code: "RUB", name: "Russian Ruble", flag: "🇷🇺" },
    { code: "GBP", name: "British Pound", flag: "🇬🇧" }
  ];

  const exchangeRate = 12700; // UZS to USD
  const toAmount = fromAmount ? (parseFloat(fromAmount) / exchangeRate).toFixed(2) : "";

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
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

      {/* Conversion Form */}
      <motion.div
        className="px-6 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {/* From */}
        <div className="rounded-[24px] p-5 mb-4" style={{ backgroundColor: colors.cardBackground }}>
          <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>{content[language].from}</p>
          <div className="flex items-center gap-3">
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="flex-shrink-0 px-4 py-3 rounded-full text-base font-semibold outline-none"
              style={{
                backgroundColor: colors.background,
                color: colors.text
              }}
            >
              {currencies.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.flag} {curr.code}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder={content[language].enterAmount}
              className="flex-1 px-4 py-3 rounded-full text-2xl font-bold outline-none text-right"
              style={{
                backgroundColor: colors.background,
                color: colors.text
              }}
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-2 relative z-10">
          <button
            onClick={swapCurrencies}
            className="w-12 h-12 rounded-full bg-[#7c3aed] flex items-center justify-center shadow-lg hover:bg-[#6d32d4] transition-colors"
          >
            <IconArrowsExchange size={24} className="text-white" />
          </button>
        </div>

        {/* To */}
        <div className="rounded-[24px] p-5 mt-4" style={{ backgroundColor: colors.cardBackground }}>
          <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>{content[language].to}</p>
          <div className="flex items-center gap-3">
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="flex-shrink-0 px-4 py-3 rounded-full text-base font-semibold outline-none"
              style={{
                backgroundColor: colors.background,
                color: colors.text
              }}
            >
              {currencies.map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.flag} {curr.code}
                </option>
              ))}
            </select>
            <div className="flex-1 px-4 py-3 rounded-full text-2xl font-bold text-right" style={{ color: colors.text }}>
              {toAmount || "0.00"}
            </div>
          </div>
        </div>

        {/* Exchange Rate */}
        {fromAmount && (
          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              {content[language].rate}: 1 {fromCurrency} = {(1 / exchangeRate).toFixed(6)} {toCurrency}
            </p>
          </motion.div>
        )}

        {/* Convert Button */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <button
            disabled={!fromAmount || parseFloat(fromAmount) <= 0}
            className="w-full bg-[#7c3aed] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#6d32d4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {content[language].convert}
          </button>
        </motion.div>
      </motion.div>

      <BottomNav />
    </div>
  );
}
