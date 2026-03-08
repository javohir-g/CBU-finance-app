import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { BottomNav } from "../components/BottomNav";
import { IconArrowLeft, IconHeart, IconUsers, IconSchool, IconHeartPlus } from "@tabler/icons-react";

export default function Charity() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [selectedFund, setSelectedFund] = useState<number | null>(null);
  const [amount, setAmount] = useState("");

  const content = {
    rus: {
      title: "Благотворительность",
      charityFunds: "Благотворительные фонды",
      donate: "Пожертвовать",
      enterAmount: "Введите сумму",
      quickAmounts: "Быстрая сумма",
      yourDonation: "Ваше пожертвование"
    },
    uzb: {
      title: "Xayriya",
      charityFunds: "Xayriya fondlari",
      donate: "Xayriya qilish",
      enterAmount: "Summani kiriting",
      quickAmounts: "Tez summa",
      yourDonation: "Sizning xayriyangiz"
    }
  };

  // ========================================
  // 🔄 MOCK DATA - TODO: Replace with API
  // ========================================
  const charityFunds = [
    {
      id: 1,
      name: "Помощь детям",
      nameUzb: "Bolalarga yordam",
      icon: IconHeart,
      color: "#ef4444",
      bgColor: "#ef444415",
      description: "Поддержка детей из малообеспеченных семей",
      descriptionUzb: "Kam ta'minlangan oilalardan bolalarga yordam"
    },
    {
      id: 2,
      name: "Образование",
      nameUzb: "Ta'lim",
      icon: IconSchool,
      color: "#7c3aed",
      bgColor: "#7c3aed15",
      description: "Стипендии для талантливых студентов",
      descriptionUzb: "Iqtidorli talabalar uchun stipendiyalar"
    },
    {
      id: 3,
      name: "Здравоохранение",
      nameUzb: "Sog'liqni saqlash",
      icon: IconHeartPlus,
      color: "#22c55e",
      bgColor: "#22c55e15",
      description: "Медицинская помощь нуждающимся",
      descriptionUzb: "Muhtojlarga tibbiy yordam"
    },
    {
      id: 4,
      name: "Пожилые люди",
      nameUzb: "Keksalar",
      icon: IconUsers,
      color: "#f59e0b",
      bgColor: "#f59e0b15",
      description: "Забота о пожилых людях",
      descriptionUzb: "Keksalarga g'amxo'rlik"
    }
  ];

  const quickAmounts = [50000, 100000, 250000, 500000];

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

      {/* Charity Funds */}
      <motion.div
        className="px-6 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ color: colors.text }}>{content[language].charityFunds}</h2>
        
        <div className="space-y-3">
          {charityFunds.map((fund, index) => {
            const Icon = fund.icon;
            return (
              <motion.div
                key={fund.id}
                onClick={() => setSelectedFund(fund.id)}
                className="rounded-[24px] p-5 cursor-pointer transition-all"
                style={{
                  backgroundColor: colors.cardBackground,
                  border: selectedFund === fund.id ? `2px solid ${fund.color}` : `1px solid ${colors.border}`
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: fund.bgColor }}
                  >
                    <Icon size={28} style={{ color: fund.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base mb-1" style={{ color: colors.text }}>
                      {language === "rus" ? fund.name : fund.nameUzb}
                    </h3>
                    <p className="text-xs" style={{ color: colors.textSecondary }}>
                      {language === "rus" ? fund.description : fund.descriptionUzb}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Donation Form */}
      {selectedFund && (
        <motion.div
          className="px-6 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="rounded-[24px] p-5" style={{ backgroundColor: colors.cardBackground }}>
            <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>{content[language].yourDonation}</p>
            
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={content[language].enterAmount}
              className="w-full px-4 py-4 rounded-2xl text-2xl font-bold outline-none mb-4"
              style={{
                backgroundColor: colors.background,
                color: colors.text
              }}
            />

            <p className="text-xs mb-2" style={{ color: colors.textSecondary }}>{content[language].quickAmounts}</p>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount.toString())}
                  className="py-2 rounded-full text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: colors.background,
                    color: colors.text
                  }}
                >
                  {(quickAmount / 1000).toFixed(0)}k
                </button>
              ))}
            </div>

            <button
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full bg-[#7c3aed] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#6d32d4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <IconHeart size={20} />
              {content[language].donate}
            </button>
          </div>
        </motion.div>
      )}

      <BottomNav />
    </div>
  );
}