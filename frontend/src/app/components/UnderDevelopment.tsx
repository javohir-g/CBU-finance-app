import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { IconArrowLeft, IconRocket } from "@tabler/icons-react";

interface UnderDevelopmentProps {
  title: string;
}

export function UnderDevelopment({ title }: UnderDevelopmentProps) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();

  const content = {
    rus: {
      desc: "Этот раздел находится в стадии разработки. Мы работаем над тем, чтобы сделать его доступным как можно скорее!",
      back: "Вернуться назад"
    },
    uzb: {
      desc: "Ushbu bo'lim ishlab chiqilmoqda. Uni imkon qadar tezroq ishga tushirish ustida ishlayapmiz!",
      back: "Orqaga qaytish"
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col pt-12 px-6" style={{ backgroundColor: colors.background }}>
      <button
        onClick={() => navigate(-1)}
        className="w-11 h-11 rounded-full flex items-center justify-center mb-12 transition-colors"
        style={{ backgroundColor: colors.cardBackground }}
      >
        <IconArrowLeft size={20} style={{ color: colors.text }} />
      </button>

      <div className="flex-1 flex flex-col items-center justify-center text-center pb-24">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-32 h-32 rounded-3xl flex items-center justify-center mb-8"
          style={{ backgroundColor: `${colors.primary}15` }}
        >
          <IconRocket size={64} style={{ color: colors.primary }} />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-4"
          style={{ color: colors.text }}
        >
          {title}
        </motion.h1>

        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.3 }}
           className="bg-[#7c3aed]/10 px-4 py-1.5 rounded-full mb-6"
        >
          <span className="text-[#7c3aed] text-xs font-bold uppercase tracking-widest">
            {language === "rus" ? "В разработке" : "Ishlab chiqilmoqda"}
          </span>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base leading-relaxed max-w-xs mb-10"
          style={{ color: colors.textSecondary }}
        >
          {content[language].desc}
        </motion.p>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate(-1)}
          className="px-8 py-4 bg-[#7c3aed] text-white rounded-full font-semibold shadow-xl shadow-[#7c3aed]/20 transition-all active:scale-95"
        >
          {content[language].back}
        </motion.button>
      </div>
    </div>
  );
}
