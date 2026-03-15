import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { exchangeService, ExchangeRate as IExchangeRate } from "../api/services/exchange.service";
import { BottomNav } from "../components/BottomNav";
import { IconArrowLeft, IconTrendingUp, IconTrendingDown, IconCalendar } from "@tabler/icons-react";

export default function ExchangeRate() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [rates, setRates] = useState<IExchangeRate[]>([]);
  const [lastUpdate, setLastUpdate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      setIsLoading(true);
      try {
        const response = await exchangeService.getRates();
        setRates(response.rates);
        setLastUpdate(response.date);
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
      title: "Курс валют ЦБ РУз",
      lastUpdate: "Обновлено на",
      officialRate: "Официальный курс",
      currency: "Валюта",
      rate: "Курс",
      change: "Изм."
    },
    uzb: {
      title: "O'zR MB Valyuta kursi",
      lastUpdate: "Yangilangan sana",
      officialRate: "Rasmiy kurs",
      currency: "Valyuta",
      rate: "Kurs",
      change: "O'zg."
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

      {/* Date info */}
      <motion.div 
        className="px-6 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#7c3aed]/10 border border-[#7c3aed]/10">
            <IconCalendar size={18} className="text-[#7c3aed]" />
            <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                {content[language].lastUpdate}: <span className="text-[#7c3aed]">{lastUpdate}</span>
            </p>
        </div>
      </motion.div>

      {/* Currency List */}
      <div className="px-6 space-y-3">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse h-20 rounded-[28px] w-full" style={{ backgroundColor: colors.cardBackground }}></div>
            ))
          ) : rates.length > 0 ? (
            rates.map((currency, index) => {
              const isUp = currency.diff >= 0;

              return (
                <motion.div
                  key={currency.code}
                  className="rounded-[28px] p-5 flex items-center justify-between group transition-all"
                  style={{ backgroundColor: colors.cardBackground }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl drop-shadow-sm group-hover:scale-110 transition-transform">
                        {flagMap[currency.code] || "🏳️"}
                    </div>
                    <div>
                      <p className="font-bold text-lg" style={{ color: colors.text }}>{currency.code}</p>
                      <p className="text-[10px] uppercase font-bold tracking-wider opacity-40" style={{ color: colors.textSecondary }}>
                          {currency.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl tracking-tight" style={{ color: colors.text }}>
                      {currency.rate.toLocaleString()} UZS
                    </p>
                    <div className={`flex items-center gap-1 justify-end font-bold text-xs mt-1 ${isUp ? 'text-green-500' : 'text-red-500'}`}>
                      {isUp ? <IconTrendingUp size={14} /> : <IconTrendingDown size={14} />}
                      <span>{Math.abs(currency.diff).toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-20 opacity-40" style={{ color: colors.textSecondary }}>
              No rates available
            </div>
          )}
      </div>

      <BottomNav />
    </div>
  );
}