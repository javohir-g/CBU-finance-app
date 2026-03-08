import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { BottomNav } from "../components/BottomNav";
import { IconArrowLeft, IconBolt, IconDroplet, IconPhone, IconPlus, IconToggleLeft, IconToggleRight } from "@tabler/icons-react";

export default function AutoPayments() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();

  // ========================================
  // 🔄 MOCK DATA - TODO: Replace with API
  // ========================================
  const [autoPayments, setAutoPayments] = useState([
    { id: 1, name: "Электричество", icon: IconBolt, color: "#f59e0b", bgColor: "#f59e0b15", amount: "245,000 UZS", date: "5", active: true },
    { id: 2, name: "Вода", icon: IconDroplet, color: "#3b82f6", bgColor: "#3b82f615", amount: "89,500 UZS", date: "10", active: true },
    { id: 3, name: "Мобильная связь", icon: IconPhone, color: "#22c55e", bgColor: "#22c55e15", amount: "50,000 UZS", date: "15", active: false }
  ]);

  const content = {
    rus: {
      title: "Автоплатежи",
      myAutoPayments: "Мои автоплатежи",
      amount: "Сумма",
      paymentDate: "Дата платежа",
      every: "Каждое",
      addAutoPayment: "Добавить автоплатеж",
      active: "Активен",
      inactive: "Неактивен"
    },
    uzb: {
      title: "Avto to'lovlar",
      myAutoPayments: "Mening avto to'lovlarim",
      amount: "Summa",
      paymentDate: "To'lov sanasi",
      every: "Har",
      addAutoPayment: "Avto to'lov qo'shish",
      active: "Faol",
      inactive: "Nofaol"
    }
  };

  const togglePayment = (id: number) => {
    setAutoPayments(autoPayments.map(payment => 
      payment.id === id ? { ...payment, active: !payment.active } : payment
    ));
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

      {/* Auto Payments List */}
      <motion.div
        className="px-6 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ color: colors.text }}>{content[language].myAutoPayments}</h2>
        
        <div className="space-y-3">
          {autoPayments.map((payment, index) => {
            const Icon = payment.icon;
            return (
              <motion.div
                key={payment.id}
                className="rounded-[24px] p-5"
                style={{ backgroundColor: colors.cardBackground }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: payment.bgColor }}
                    >
                      <Icon size={24} style={{ color: payment.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-base" style={{ color: colors.text }}>{payment.name}</h3>
                      <p className="text-xs" style={{ color: colors.textSecondary }}>
                        {content[language].every} {payment.date}-е число
                      </p>
                    </div>
                  </div>
                  <button onClick={() => togglePayment(payment.id)}>
                    {payment.active ? (
                      <IconToggleRight size={40} className="text-[#22c55e]" />
                    ) : (
                      <IconToggleLeft size={40} style={{ color: colors.textSecondary }} />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: colors.border }}>
                  <div>
                    <p className="text-xs mb-1" style={{ color: colors.textSecondary }}>{content[language].amount}</p>
                    <p className="font-bold text-lg" style={{ color: colors.text }}>{payment.amount}</p>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full ${payment.active ? 'bg-[#22c55e]/10' : 'bg-gray-500/10'}`}>
                    <p className={`text-xs font-semibold ${payment.active ? 'text-[#22c55e]' : 'text-gray-500'}`}>
                      {payment.active ? content[language].active : content[language].inactive}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Add Auto Payment Button */}
      <motion.div
        className="px-6 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <button className="w-full bg-[#7c3aed] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#6d32d4] transition-colors flex items-center justify-center gap-2">
          <IconPlus size={20} />
          {content[language].addAutoPayment}
        </button>
      </motion.div>

      <BottomNav />
    </div>
  );
}