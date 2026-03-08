import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { BottomNav } from "../components/BottomNav";
import { IconArrowLeft, IconCar, IconGasStation, IconTool, IconShieldCheck } from "@tabler/icons-react";

export default function MyCar() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();

  const content = {
    rus: {
      title: "Мой автомобиль",
      carNumber: "Гос. номер",
      model: "Модель",
      year: "Год выпуска",
      services: "Услуги",
      fines: "Штрафы",
      insurance: "Страховка",
      maintenance: "Техобслуживание",
      fuel: "Заправка",
      checkFines: "Проверить штрафы",
      renewInsurance: "Продлить страховку",
      bookService: "Записаться на ТО",
      findStation: "Найти заправку",
      noFines: "Штрафов нет",
      activeUntil: "Действует до"
    },
    uzb: {
      title: "Mening mashinam",
      carNumber: "Davlat raqami",
      model: "Model",
      year: "Ishlab chiqarilgan yili",
      services: "Xizmatlar",
      fines: "Jarimalar",
      insurance: "Sug'urta",
      maintenance: "Texnik xizmat",
      fuel: "Yoqilg'i quyish",
      checkFines: "Jarimalarni tekshirish",
      renewInsurance: "Sug'urtani yangilash",
      bookService: "Texnik xizmatga yozilish",
      findStation: "Yoqilg'i quyish shoxobchasini topish",
      noFines: "Jarimalar yo'q",
      activeUntil: "Amal qiladi"
    }
  };

  // ========================================
  // 🔄 MOCK DATA - TODO: Replace with API
  // ========================================
  const carInfo = {
    number: "01 A 777 AA",
    model: "Toyota Camry",
    year: "2022"
  };

  // ========================================
  // 🔄 MOCK DATA - TODO: Replace with API
  // ========================================
  const services = [
    {
      id: 1,
      name: content[language].fines,
      icon: IconShieldCheck,
      color: "#22c55e",
      bgColor: "#22c55e15",
      status: content[language].noFines,
      action: content[language].checkFines
    },
    {
      id: 2,
      name: content[language].insurance,
      icon: IconShieldCheck,
      color: "#7c3aed",
      bgColor: "#7c3aed15",
      status: `${content[language].activeUntil}: 15.12.2024`,
      action: content[language].renewInsurance
    },
    {
      id: 3,
      name: content[language].maintenance,
      icon: IconTool,
      color: "#f59e0b",
      bgColor: "#f59e0b15",
      status: "15,234 км",
      action: content[language].bookService
    },
    {
      id: 4,
      name: content[language].fuel,
      icon: IconGasStation,
      color: "#3b82f6",
      bgColor: "#3b82f615",
      status: "AI-95",
      action: content[language].findStation
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

      {/* Car Info Card */}
      <motion.div
        className="px-6 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div
          className="rounded-[24px] p-6"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <IconCar size={32} className="text-white" />
            </div>
            <div>
              <p className="text-white/80 text-sm">{content[language].carNumber}</p>
              <p className="text-white text-2xl font-bold tracking-wider">{carInfo.number}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <p className="text-white/80 text-xs">{content[language].model}</p>
              <p className="text-white font-semibold">{carInfo.model}</p>
            </div>
            <div>
              <p className="text-white/80 text-xs">{content[language].year}</p>
              <p className="text-white font-semibold">{carInfo.year}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Services */}
      <motion.div
        className="px-6 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ color: colors.text }}>{content[language].services}</h2>
        
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
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: service.bgColor }}
                    >
                      <Icon size={24} style={{ color: service.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-base" style={{ color: colors.text }}>{service.name}</h3>
                      <p className="text-xs" style={{ color: colors.textSecondary }}>{service.status}</p>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-[#7c3aed] text-white py-3 rounded-full font-semibold text-sm hover:bg-[#6d32d4] transition-colors">
                  {service.action}
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}