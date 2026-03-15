import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { BottomNav } from "../components/BottomNav";
import { 
  IconCurrencyDollar,
  IconHome,
  IconCar,
  IconCreditCard,
  IconRefresh,
  IconArrowsExchange,
  IconHeart,
  IconFileText,
  IconAlertTriangle,
  IconBus,
  IconUserPlus
} from "@tabler/icons-react";

export default function More() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();

  const content = {
    rus: {
      title: "Еще",
      services: "Сервисы",
      exchangeRate: "Курс валют",
      myHome: "Мой дом",
      myCar: "Мой автомобиль",
      orderCard: "Заказать карту",
      autoPayments: "Автоплатежи",
      conversion: "Конверсия",
      charity: "Благотворительность",
      govServices: "Справки и госуслуги",
      finesMIB: "Штрафы MIB",
      transport: "Метро и автобус",
      transfer: "Перевод",
      inviteFriend: "Позвать друга"
    },
    uzb: {
      title: "Yana",
      services: "Xizmatlar",
      exchangeRate: "Valyuta kursi",
      myHome: "Mening uyim",
      myCar: "Mening mashinam",
      orderCard: "Karta buyurtma qilish",
      autoPayments: "Avto to'lovlar",
      conversion: "Konversiya",
      charity: "Xayriya",
      govServices: "Ma'lumotnomalar va davlat xizmatlari",
      finesMIB: "Jarimalar MIB",
      transport: "Metro va avtobus",
      transfer: "O'tkazma",
      inviteFriend: "Do'stni taklif qilish"
    }
  };

  const services = [
    {
      id: 1,
      icon: IconCurrencyDollar,
      label: content[language].exchangeRate,
      color: "#22c55e",
      bgColor: "#22c55e15",
      path: "/exchange-rate"
    },
    {
      id: 2,
      icon: IconHome,
      label: content[language].myHome,
      color: "#3b82f6",
      bgColor: "#3b82f615",
      path: "/my-home"
    },
    {
      id: 3,
      icon: IconCar,
      label: content[language].myCar,
      color: "#f59e0b",
      bgColor: "#f59e0b15",
      path: "/my-car"
    },
    {
      id: 4,
      icon: IconCreditCard,
      label: content[language].orderCard,
      color: "#7c3aed",
      bgColor: "#7c3aed15",
      path: "/order-card"
    },
    {
      id: 5,
      icon: IconRefresh,
      label: content[language].autoPayments,
      color: "#ec4899",
      bgColor: "#ec489915",
      path: "/auto-payments"
    },
    {
      id: 6,
      icon: IconArrowsExchange,
      label: content[language].transfer,
      color: "#14b8a6",
      bgColor: "#14b8a615",
      path: "/transfer"
    },
    {
      id: 7,
      icon: IconHeart,
      label: content[language].charity,
      color: "#ef4444",
      bgColor: "#ef444415",
      path: "/charity"
    },
    {
      id: 8,
      icon: IconFileText,
      label: content[language].govServices,
      color: "#8b5cf6",
      bgColor: "#8b5cf615",
      path: "/gov-services"
    },
    {
      id: 9,
      icon: IconAlertTriangle,
      label: content[language].finesMIB,
      color: "#f97316",
      bgColor: "#f9731615",
      path: "/fines-mib"
    },
    {
      id: 10,
      icon: IconBus,
      label: content[language].transport,
      color: "#06b6d4",
      bgColor: "#06b6d415",
      path: "/transport"
    },
    {
      id: 11,
      icon: IconUserPlus,
      label: content[language].inviteFriend,
      color: "#7c3aed",
      bgColor: "#7c3aed15",
      path: "/invite-friend"
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
        <div className="w-11" />
        <h1 className="text-xl font-semibold" style={{ color: colors.text }}>{content[language].title}</h1>
        <div className="w-11" />
      </motion.div>

      {/* Services */}
      <motion.div
        className="px-[15px] py-[0px] mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold" style={{ color: colors.text }}>{content[language].services}</h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {services.map((service) => (
            <button
              key={service.id}
              className="rounded-[20px] p-4 flex flex-col items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: colors.cardBackground }}
              onClick={() => navigate(service.path)}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: service.bgColor }}
              >
                <service.icon size={22} style={{ color: service.color }} />
              </div>
              <p className="text-[11px] font-medium text-center leading-tight" style={{ color: colors.text }}>
                {service.label}
              </p>
            </button>
          ))}
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}