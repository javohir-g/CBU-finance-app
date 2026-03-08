import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { BottomNav } from "../components/BottomNav";
import { IconArrowLeft, IconBolt, IconDroplet, IconFlame, IconPlus } from "@tabler/icons-react";

export default function MyHome() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();

  const content = {
    rus: {
      title: "Мой дом",
      utilities: "Коммунальные услуги",
      electricity: "Электричество",
      water: "Вода",
      gas: "Газ",
      accountNumber: "Лицевой счет",
      currentDebt: "Текущий долг",
      payNow: "Оплатить",
      addService: "Добавить услугу"
    },
    uzb: {
      title: "Mening uyim",
      utilities: "Kommunal xizmatlar",
      electricity: "Elektr energiyasi",
      water: "Suv",
      gas: "Gaz",
      accountNumber: "Shaxsiy hisob",
      currentDebt: "Joriy qarz",
      payNow: "To'lash",
      addService: "Xizmat qo'shish"
    }
  };

  // ========================================
  // 🔄 MOCK DATA - TODO: Replace with API
  // ========================================
  const services = [
    {
      id: 1,
      name: content[language].electricity,
      icon: IconBolt,
      color: "#f59e0b",
      bgColor: "#f59e0b15",
      accountNumber: "01-234-567890",
      debt: 245000
    },
    {
      id: 2,
      name: content[language].water,
      icon: IconDroplet,
      color: "#3b82f6",
      bgColor: "#3b82f615",
      accountNumber: "02-345-678901",
      debt: 89500
    },
    {
      id: 3,
      name: content[language].gas,
      icon: IconFlame,
      color: "#ef4444",
      bgColor: "#ef444415",
      accountNumber: "03-456-789012",
      debt: 156000
    }
  ];

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

      {/* Services List */}
      <motion.div
        className="px-6 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ color: colors.text }}>{content[language].utilities}</h2>
        
        <div className="space-y-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                className="rounded-[24px] p-5"
                style={{ backgroundColor: colors.cardBackground }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: service.bgColor }}
                  >
                    <Icon size={24} style={{ color: service.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg" style={{ color: colors.text }}>{service.name}</h3>
                    <p className="text-xs" style={{ color: colors.textSecondary }}>
                      {content[language].accountNumber}: {service.accountNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs mb-1" style={{ color: colors.textSecondary }}>
                      {content[language].currentDebt}
                    </p>
                    <p className="font-bold text-xl" style={{ color: colors.text }}>
                      {service.debt.toLocaleString()} UZS
                    </p>
                  </div>
                  <button className="bg-[#7c3aed] text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#6d32d4] transition-colors">
                    {content[language].payNow}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Add Service Button */}
      <motion.div
        className="px-6 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <button className="w-full bg-[#7c3aed] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#6d32d4] transition-colors flex items-center justify-center gap-2">
          <IconPlus size={20} />
          {content[language].addService}
        </button>
      </motion.div>

      <BottomNav />
    </div>
  );
}