import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { BottomNav } from "../components/BottomNav";
import { IconArrowLeft, IconInfoCircle, IconShield, IconHeart, IconMail, IconSend, IconCurrencyDollar, IconLock } from "@tabler/icons-react";

export default function About() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const content = {
    rus: {
      title: "О Программе",
      appName: "Fintech App",
      version: "Версия 1.0.0",
      description: "Современное финтех приложение для управления вашими финансами. Безопасно, быстро и удобно.",
      features: "Возможности",
      feature1: "Управление картами",
      feature2: "Быстрые переводы",
      feature3: "Запланированные платежи",
      feature4: "Безопасность данных",
      contact: "Контакты",
      support: "Поддержка",
      email: "support@fintech.com",
      madeWith: "Сделано с",
      in: "в Узбекистане"
    },
    uzb: {
      title: "Dastur Haqida",
      appName: "Fintech App",
      version: "Versiya 1.0.0",
      description: "Moliyaviy ishlarni boshqarish uchun zamonaviy fintech ilovasi. Xavfsiz, tez va qulay.",
      features: "Imkoniyatlar",
      feature1: "Kartalarni boshqarish",
      feature2: "Tez o'tkazmalar",
      feature3: "Rejalashtirilgan to'lovlar",
      feature4: "Ma'lumotlar xavfsizligi",
      contact: "Aloqa",
      support: "Qo'llab-quvvatlash",
      email: "support@fintech.com",
      madeWith: "Qilingan",
      in: "O'zbekistonda"
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#1e2337] pb-32 overflow-x-hidden">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between px-[20px] py-[15px]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
        >
          <IconArrowLeft size={20} className="text-white" />
        </button>
        <h1 className="text-xl font-semibold text-white">{content[language].title}</h1>
        <div className="w-11" />
      </motion.div>

      {/* App Info */}
      <motion.div
        className="px-6 mb-6 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <div className="w-20 h-20 bg-gradient-to-br from-[#7c3aed] to-[#9d5afd] rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
          <IconInfoCircle size={40} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{content[language].appName}</h2>
        <p className="text-sm text-white/60 mb-4">{content[language].version}</p>
        <p className="text-white/80 leading-relaxed">{content[language].description}</p>
      </motion.div>

      {/* Features */}
      <motion.div
        className="px-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h3 className="text-xl font-semibold text-white mb-4">{content[language].features}</h3>
        <div className="space-y-2.5">
          <div className="flex items-center gap-3 bg-[#2a3350] rounded-[20px] p-4">
            <div className="w-10 h-10 bg-[#7c3aed]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <IconCurrencyDollar size={20} className="text-[#7c3aed]" />
            </div>
            <span className="text-white font-medium">{content[language].feature1}</span>
          </div>
          <div className="flex items-center gap-3 bg-[#2a3350] rounded-[20px] p-4">
            <div className="w-10 h-10 bg-[#22c55e]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <IconSend size={20} className="text-[#22c55e]" />
            </div>
            <span className="text-white font-medium">{content[language].feature2}</span>
          </div>
          <div className="flex items-center gap-3 bg-[#2a3350] rounded-[20px] p-4">
            <div className="w-10 h-10 bg-[#ff4757]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <IconInfoCircle size={20} className="text-[#ff4757]" />
            </div>
            <span className="text-white font-medium">{content[language].feature3}</span>
          </div>
          <div className="flex items-center gap-3 bg-[#2a3350] rounded-[20px] p-4">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
              <IconLock size={20} className="text-white/60" />
            </div>
            <span className="text-white font-medium">{content[language].feature4}</span>
          </div>
        </div>
      </motion.div>

      {/* Contact */}
      <motion.div
        className="px-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <h3 className="text-xl font-semibold text-white mb-4">{content[language].contact}</h3>
        <div className="bg-[#2a3350] rounded-[20px] p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#7c3aed]/10 rounded-full flex items-center justify-center">
              <IconMail size={20} className="text-[#7c3aed]" />
            </div>
            <div>
              <p className="text-sm text-white/60">{content[language].support}</p>
              <p className="text-white font-medium">{content[language].email}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <p className="text-sm text-white/60 flex items-center justify-center gap-2">
          {content[language].madeWith} <IconHeart size={16} className="text-[#ff4757] fill-[#ff4757]" /> {content[language].in}
        </p>
      </motion.div>

      <BottomNav />
    </div>
  );
}