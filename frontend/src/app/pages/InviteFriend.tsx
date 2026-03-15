import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { IconArrowLeft, IconUserPlus, IconGift, IconShare } from "@tabler/icons-react";

export default function InviteFriend() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();

  const handleShare = () => {
    const tg = (window as any).Telegram?.WebApp;
    const shareUrl = "https://t.me/cbu_finance_bot/start";
    const text = language === "rus" 
        ? "Присоединяйся к CBU Finance и управляй своими деньгами легко!" 
        : "CBU Finance-ga qo'shiling va pullaringizni oson boshqaring!";
    
    if (tg) {
        tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`);
    } else {
        // Fallback for browser
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const content = {
    rus: {
        title: "Позвать друга",
        subtitle: "Приглашайте друзей и получайте бонусы за каждого активного пользователя",
        howItWorks: "Как это работает?",
        step1: "Отправьте ссылку другу",
        step2: "Друг регистрируется в боте",
        step3: "Получайте бонусы вместе",
        button: "Поделиться ссылкой"
    },
    uzb: {
        title: "Do'stni taklif qilish",
        subtitle: "Do'stlaringizni taklif qiling va har bir faol foydalanuvchi uchun bonuslar oling",
        howItWorks: "Bu qanday ishlaydi?",
        step1: "Do'stingizga havola yuboring",
        step2: "Do'stingiz botda ro'yxatdan o'tadi",
        step3: "Birgalikda bonuslarga ega bo'ling",
        button: "Havoalni ulashish"
    }
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

      <div className="px-6 pt-4">
        {/* Main Illustration Area */}
        <motion.div 
            className="w-full aspect-square rounded-[40px] flex flex-col items-center justify-center mb-8 relative overflow-hidden"
            style={{ backgroundColor: colors.cardBackground }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/10 to-transparent pointer-events-none" />
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] flex items-center justify-center mb-4 shadow-2xl shadow-[#7c3aed]/30">
                <IconUserPlus size={48} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-center px-4" style={{ color: colors.text }}>
                {content[language].subtitle}
            </h2>
        </motion.div>

        {/* Steps */}
        <div className="space-y-4 mb-10">
            <h3 className="text-lg font-bold" style={{ color: colors.text }}>{content[language].howItWorks}</h3>
            
            {[
                { icon: IconShare, text: content[language].step1, color: "#3b82f6" },
                { icon: IconUserPlus, text: content[language].step2, color: "#10b981" },
                { icon: IconGift, text: content[language].step3, color: "#f59e0b" }
            ].map((step, i) => (
                <motion.div 
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-3xl"
                    style={{ backgroundColor: colors.cardBackground }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                >
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${step.color}15` }}>
                        <step.icon size={20} style={{ color: step.color }} />
                    </div>
                    <p className="font-medium text-sm" style={{ color: colors.text }}>{step.text}</p>
                </motion.div>
            ))}
        </div>

        {/* Button */}
        <motion.button
            onClick={handleShare}
            className="w-full bg-[#7c3aed] text-white py-4 rounded-full font-semibold text-lg shadow-xl shadow-[#7c3aed]/30 flex items-center justify-center gap-3 active:scale-95 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            <IconShare size={24} />
            {content[language].button}
        </motion.button>
      </div>
    </div>
  );
}
