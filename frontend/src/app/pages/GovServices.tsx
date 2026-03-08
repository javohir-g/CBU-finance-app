import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { BottomNav } from "../components/BottomNav";
import { IconArrowLeft, IconFileText, IconCertificate, IconId, IconBuilding, IconReceipt } from "@tabler/icons-react";

export default function GovServices() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();

  const content = {
    rus: {
      title: "Справки и госуслуги",
      services: "Доступные услуги",
      order: "Заказать",
      incomeCertificate: "Справка о доходах",
      residenceCertificate: "Справка с места жительства",
      passport: "Паспортные услуги",
      property: "Справка о собственности",
      tax: "Налоговые справки",
      deliveryTime: "Срок получения",
      days: "дней",
      price: "Стоимость"
    },
    uzb: {
      title: "Ma'lumotnomalar va davlat xizmatlari",
      services: "Mavjud xizmatlar",
      order: "Buyurtma qilish",
      incomeCertificate: "Daromad to'g'risida ma'lumotnoma",
      residenceCertificate: "Yashash joyidan ma'lumotnoma",
      passport: "Pasport xizmatlari",
      property: "Mulk to'g'risida ma'lumotnoma",
      tax: "Soliq ma'lumotnomasi",
      deliveryTime: "Olish muddati",
      days: "kun",
      price: "Narxi"
    }
  };

  // ========================================
  // 🔄 MOCK DATA - TODO: Replace with API
  // ========================================
  const services = [
    {
      id: 1,
      name: content[language].incomeCertificate,
      icon: IconFileText,
      color: "#22c55e",
      bgColor: "#22c55e15",
      deliveryTime: "3",
      price: "50,000 UZS"
    },
    {
      id: 2,
      name: content[language].residenceCertificate,
      icon: IconCertificate,
      color: "#3b82f6",
      bgColor: "#3b82f615",
      deliveryTime: "2",
      price: "30,000 UZS"
    },
    {
      id: 3,
      name: content[language].passport,
      icon: IconId,
      color: "#7c3aed",
      bgColor: "#7c3aed15",
      deliveryTime: "10",
      price: "150,000 UZS"
    },
    {
      id: 4,
      name: content[language].property,
      icon: IconBuilding,
      color: "#f59e0b",
      bgColor: "#f59e0b15",
      deliveryTime: "5",
      price: "75,000 UZS"
    },
    {
      id: 5,
      name: content[language].tax,
      icon: IconReceipt,
      color: "#ef4444",
      bgColor: "#ef444415",
      deliveryTime: "3",
      price: "40,000 UZS"
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
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: service.bgColor }}
                  >
                    <Icon size={28} style={{ color: service.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base" style={{ color: colors.text }}>{service.name}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs mb-1" style={{ color: colors.textSecondary }}>
                      {content[language].deliveryTime}
                    </p>
                    <p className="font-semibold" style={{ color: colors.text }}>
                      {service.deliveryTime} {content[language].days}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs mb-1" style={{ color: colors.textSecondary }}>
                      {content[language].price}
                    </p>
                    <p className="font-semibold" style={{ color: colors.text }}>{service.price}</p>
                  </div>
                </div>

                <button className="w-full bg-[#7c3aed] text-white py-3 rounded-full font-semibold text-sm hover:bg-[#6d32d4] transition-colors">
                  {content[language].order}
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