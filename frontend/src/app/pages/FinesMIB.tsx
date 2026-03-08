import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { BottomNav } from "../components/BottomNav";
import { IconArrowLeft, IconAlertTriangle, IconCheck } from "@tabler/icons-react";

export default function FinesMIB() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [carNumber, setCarNumber] = useState("");
  const [showFines, setShowFines] = useState(false);

  const content = {
    rus: {
      title: "Штрафы MIB",
      checkFines: "Проверить штрафы",
      carNumber: "Гос. номер автомобиля",
      enterCarNumber: "Введите номер",
      check: "Проверить",
      myFines: "Мои штрафы",
      violation: "Нарушение",
      date: "Дата",
      amount: "Сумма",
      status: "Статус",
      payAll: "Оплатить все",
      unpaid: "Не оплачен",
      paid: "Оплачен",
      speeding: "Превышение скорости",
      parking: "Неправильная парковка",
      redLight: "Проезд на красный свет",
      noFines: "У вас нет неоплаченных штрафов"
    },
    uzb: {
      title: "Jarimalar MIB",
      checkFines: "Jarimalarni tekshirish",
      carNumber: "Mashina davlat raqami",
      enterCarNumber: "Raqamni kiriting",
      check: "Tekshirish",
      myFines: "Mening jarimalarim",
      violation: "Qoidabuzarlik",
      date: "Sana",
      amount: "Summa",
      status: "Holat",
      payAll: "Hammasini to'lash",
      unpaid: "To'lanmagan",
      paid: "To'langan",
      speeding: "Tezlikni oshirish",
      parking: "Noto'g'ri to'xtash",
      redLight: "Qizil chiroqdan o'tish",
      noFines: "Sizda to'lanmagan jarimalar yo'q"
    }
  };

  // ========================================
  // 🔄 MOCK DATA - TODO: Replace with API
  // ========================================
  const fines = [
    {
      id: 1,
      violation: content[language].speeding,
      date: "15.11.2024",
      amount: 500000,
      status: "unpaid"
    },
    {
      id: 2,
      violation: content[language].parking,
      date: "10.11.2024",
      amount: 250000,
      status: "unpaid"
    }
  ];

  const handleCheck = () => {
    if (carNumber.trim()) {
      setShowFines(true);
    }
  };

  const totalFines = fines.reduce((sum, fine) => fine.status === "unpaid" ? sum + fine.amount : sum, 0);

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

      {/* Check Form */}
      <motion.div
        className="px-6 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="rounded-[24px] p-5" style={{ backgroundColor: colors.cardBackground }}>
          <h2 className="text-lg font-bold mb-4" style={{ color: colors.text }}>{content[language].checkFines}</h2>
          
          <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
            {content[language].carNumber}
          </label>
          <input
            type="text"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value)}
            placeholder={content[language].enterCarNumber}
            className="w-full px-4 py-3 rounded-2xl text-base outline-none mb-4"
            style={{
              backgroundColor: colors.background,
              color: colors.text,
              border: `1px solid ${colors.border}`
            }}
          />

          <button
            onClick={handleCheck}
            disabled={!carNumber.trim()}
            className="w-full bg-[#7c3aed] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#6d32d4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {content[language].check}
          </button>
        </div>
      </motion.div>

      {/* Fines List */}
      {showFines && (
        <motion.div
          className="px-6 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-lg font-bold mb-4" style={{ color: colors.text }}>{content[language].myFines}</h2>
          
          {fines.length > 0 ? (
            <>
              <div className="space-y-3 mb-4">
                {fines.map((fine, index) => (
                  <motion.div
                    key={fine.id}
                    className="rounded-[24px] p-5"
                    style={{ backgroundColor: colors.cardBackground }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#ff4757]/10 flex items-center justify-center flex-shrink-0">
                          <IconAlertTriangle size={24} className="text-[#ff4757]" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base mb-1" style={{ color: colors.text }}>{fine.violation}</h3>
                          <p className="text-xs" style={{ color: colors.textSecondary }}>
                            {content[language].date}: {fine.date}
                          </p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full ${fine.status === 'unpaid' ? 'bg-[#ff4757]/10' : 'bg-[#22c55e]/10'}`}>
                        <p className={`text-xs font-semibold ${fine.status === 'unpaid' ? 'text-[#ff4757]' : 'text-[#22c55e]'}`}>
                          {fine.status === 'unpaid' ? content[language].unpaid : content[language].paid}
                        </p>
                      </div>
                    </div>
                    <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: colors.border }}>
                      <div>
                        <p className="text-xs mb-1" style={{ color: colors.textSecondary }}>{content[language].amount}</p>
                        <p className="font-bold text-xl" style={{ color: colors.text }}>{fine.amount.toLocaleString()} UZS</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pay All Button */}
              {totalFines > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <div className="rounded-[24px] p-5 mb-4" style={{ backgroundColor: colors.cardBackground }}>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm" style={{ color: colors.textSecondary }}>Итого к оплате:</p>
                      <p className="font-bold text-2xl" style={{ color: colors.text }}>{totalFines.toLocaleString()} UZS</p>
                    </div>
                    <button className="w-full bg-[#7c3aed] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#6d32d4] transition-colors">
                      {content[language].payAll}
                    </button>
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              className="rounded-[24px] p-8 text-center"
              style={{ backgroundColor: colors.cardBackground }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-16 h-16 rounded-full bg-[#22c55e]/10 flex items-center justify-center mx-auto mb-4">
                <IconCheck size={32} className="text-[#22c55e]" />
              </div>
              <p className="font-semibold text-lg" style={{ color: colors.text }}>{content[language].noFines}</p>
            </motion.div>
          )}
        </motion.div>
      )}

      <BottomNav />
    </div>
  );
}