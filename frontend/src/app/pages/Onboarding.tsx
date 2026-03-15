import { useNavigate } from "react-router";
import { motion } from "motion/react";
import cardsImage from "figma:asset/32af9c1670a52b3056df2308ff1e4d2db63ddf15.png";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { IconLanguage } from "@tabler/icons-react";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

export default function Onboarding() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { colors } = useTheme();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const onboardingComplete = localStorage.getItem("onboarding_complete");
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    } else if (onboardingComplete) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleStart = () => {
    localStorage.setItem("onboarding_complete", "true");
    // Navigate to next page and pass selected language
    navigate('/login', { state: { language } });
  };

  const content = {
    rus: {
      title1: "Управляйте Вашими",
      title2: "Платежами с ",
      title2Highlight: "мобильным банкингом",
      button: "Начать"
    },
    uzb: {
      title1: "O'z pullaringizni",
      title2: "To'lovlaringizni ",
      title2Highlight: "mobil banking",
      button: "Boshlash"
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-end overflow-hidden relative" style={{ backgroundColor: colors.background }}>
      {/* Language Switcher */}
      <motion.div 
        className="absolute top-6 right-6 z-30 flex gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <button
          onClick={() => setLanguage("rus")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all active:scale-95 flex items-center gap-2 ${
            language === "rus"
              ? "bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white"
              : "text-white/50 hover:text-white"
          }`}
          style={language === "rus" ? {} : { backgroundColor: colors.cardBackground }}
        >
          {language === "rus" && <IconLanguage size={16} />}
          РУС
        </button>
        <button
          onClick={() => setLanguage("uzb")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all active:scale-95 flex items-center gap-2 ${
            language === "uzb"
              ? "bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white"
              : "text-white/50 hover:text-white"
          }`}
          style={language === "uzb" ? {} : { backgroundColor: colors.cardBackground }}
        >
          {language === "uzb" && <IconLanguage size={16} />}
          UZB
        </button>
      </motion.div>

      {/* Cards Section - Top Part */}
      <motion.div 
        className="absolute top-[-5%] sm:top-[-8%] left-1/2 -translate-x-1/2 w-[120%] sm:w-[130%] md:w-[140%]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <img 
          src={cardsImage} 
          alt="Cards" 
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Content Section - Bottom Part */}
      <div className="relative z-20 px-6 sm:px-8 md:px-12 pb-12 sm:pb-16 md:pb-20">
        {/* Title */}
        <motion.div 
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[35px] leading-[1.365] mb-0" style={{ color: colors.text }}>
            {content[language].title1}
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[35px] leading-[1.365]">
            <span style={{ color: colors.text }}>{content[language].title2}</span>
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] bg-clip-text text-transparent">{content[language].title2Highlight}</span>
          </h1>
        </motion.div>

        {/* Button */}
        <motion.div 
          className="flex justify-end"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
        >
          <button
            onClick={handleStart}
            className="px-12 py-4 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white rounded-full text-base font-semibold hover:shadow-2xl hover:shadow-[#7c3aed]/50 transition-all active:scale-95"
          >
            {content[language].button}
          </button>
        </motion.div>
      </div>
    </div>
  );
}