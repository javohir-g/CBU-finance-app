import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { exchangeService, ExchangeRate as IExchangeRate } from "../api/services/exchange.service";
import { BottomNav } from "../components/BottomNav";
import { IconArrowLeft, IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";

export default function ExchangeRate() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [selectedTab, setSelectedTab] = useState<"buy" | "sell">("buy");
  const [rates, setRates] = useState<IExchangeRate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      setIsLoading(true);
      try {
        const response = await exchangeService.getRates();
        setRates(response.rates);
      } catch (error) {
        console.error("Failed to fetch rates:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRates();
  }, []);

  const content = {
    rus: {
      title: "Курс валют",
      buy: "Покупка",
      sell: "Продажа",
      currency: "Валюта",
      rate: "Курс",
      change: "Изменение"
    },
    uzb: {
      title: "Valyuta kursi",
      buy: "Sotib olish",
      sell: "Sotish",
      currency: "Valyuta",
      rate: "Kurs",
      change: "O'zgarish"
    }
  };

  const flagMap: Record<string, string> = {
    USD: "🇺🇸",
    EUR: "🇪🇺",
    RUB: "🇷🇺",
    GBP: "🇬🇧",
    JPY: "🇯🇵",
    CNY: "🇨🇳",
    KRW: "🇰🇷",
    TRY: "🇹🇷"
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

      {/* Tabs */}
      <motion.div
        className="px-6 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex gap-2 p-1 rounded-full" style={{ backgroundColor: colors.cardBackground }}>
          <button
            onClick={() => setSelectedTab("buy")}
            className="flex-1 py-3 rounded-full font-semibold text-sm transition-all"
            style={{
              backgroundColor: selectedTab === "buy" ? "#7c3aed" : "transparent",
              color: selectedTab === "buy" ? "#ffffff" : colors.text
            }}
          >
            {content[language].buy}
          </button>
          <button
            onClick={() => setSelectedTab("sell")}
            className="flex-1 py-3 rounded-full font-semibold text-sm transition-all"
            style={{
              backgroundColor: selectedTab === "sell" ? "#7c3aed" : "transparent",
              color: selectedTab === "sell" ? "#ffffff" : colors.text
            }}
          >
            {content[language].sell}
          </button>
        </div>
      </motion.div>

      {/* Currency List */}
      <motion.div
        className="px-6 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="space-y-2">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse h-20 rounded-full w-full" style={{ backgroundColor: colors.cardBackground }}></div>
            ))
          ) : rates.length > 0 ? (
            rates.map((currency, index) => {
              const buyRate = currency.rate;
              const sellRate = currency.rate + 100; // Mock spread for demo if not provided by API
              const rateDisplay = selectedTab === "buy" ? buyRate : sellRate;

              return (
                <motion.div
                  key={currency.code}
                  className="rounded-full p-4 flex items-center justify-between"
                  style={{ backgroundColor: colors.cardBackground }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{flagMap[currency.code] || "🏳️"}</div>
                    <div>
                      <p className="font-bold text-base" style={{ color: colors.text }}>{currency.code}</p>
                      <p className="text-xs" style={{ color: colors.textSecondary }}>{currency.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg" style={{ color: colors.text }}>
                      {rateDisplay.toLocaleString()} UZS
                    </p>
                    <div className="flex items-center gap-1 justify-end">
                      {currency.diff >= 0 ? (
                        <IconTrendingUp size={14} className="text-[#22c55e]" />
                      ) : (
                        <IconTrendingDown size={14} className="text-[#ff4757]" />
                      )}
                      <p
                        className="text-xs font-semibold"
                        style={{ color: currency.diff >= 0 ? "#22c55e" : "#ff4757" }}
                      >
                        {currency.diff >= 0 ? "+" : ""}{currency.diff}%
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-10" style={{ color: colors.textSecondary }}>
              No rates available
            </div>
          )}
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}