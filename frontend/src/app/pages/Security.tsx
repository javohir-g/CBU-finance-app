import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { BottomNav } from "../components/BottomNav";
import { IconShield } from "@tabler/icons-react";
import imgImage128 from "figma:asset/d411d707e98eb5e36e5bc42f2e12a77a4c0e1edd.png";

export default function Security() {
  const { language } = useLanguage();

  const content = {
    rus: {
      title: "Безопасность",
      comingSoon: "Скоро появится"
    },
    uzb: {
      title: "Xavfsizlik",
      comingSoon: "Tez orada"
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
        <div className="w-11" />
        <h1 className="text-xl font-semibold text-white">{content[language].title}</h1>
        <div className="w-11" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="flex flex-col items-center justify-center px-6 mt-32"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="w-24 h-24 bg-[#7c3aed]/10 rounded-full flex items-center justify-center mb-6">
          <IconShield size={48} className="text-[#7c3aed]" />
        </div>
        <h2 className="text-3xl font-semibold text-white mb-2">{content[language].title}</h2>
        <p className="text-white/60 text-lg">{content[language].comingSoon}</p>
      </motion.div>

      <BottomNav />
    </div>
  );
}