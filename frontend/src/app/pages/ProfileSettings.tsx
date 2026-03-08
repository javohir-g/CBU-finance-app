import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { BottomNav } from "../components/BottomNav";
import { IconArrowLeft, IconUser, IconMail, IconPhone, IconMapPin, IconCalendar } from "@tabler/icons-react";
import imgImage128 from "figma:asset/d411d707e98eb5e36e5bc42f2e12a77a4c0e1edd.png";

export default function ProfileSettings() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const content = {
    rus: {
      title: "Настройки Профиля",
      personalInfo: "Личная Информация",
      fullName: "Полное Имя",
      email: "Email",
      phone: "Телефон",
      address: "Адрес",
      dateOfBirth: "Дата Рождения",
      save: "Сохранить Изменения",
      editPhoto: "Изменить Фото"
    },
    uzb: {
      title: "Profil Sozlamalari",
      personalInfo: "Shaxsiy Ma'lumotlar",
      fullName: "To'liq Ism",
      email: "Email",
      phone: "Telefon",
      address: "Manzil",
      dateOfBirth: "Tug'ilgan Sana",
      save: "O'zgarishlarni Saqlash",
      editPhoto: "Rasmni O'zgartirish"
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

      {/* Profile Photo */}
      <motion.div
        className="px-6 mb-6 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#7c3aed]/20 mb-3">
          <img src={imgImage128} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <button className="text-sm text-[#7c3aed] font-medium hover:text-[#6d32d4] transition-colors">
          {content[language].editPhoto}
        </button>
      </motion.div>

      {/* Personal Information */}
      <motion.div
        className="px-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold text-white mb-4">{content[language].personalInfo}</h2>
        
        <div className="space-y-3">
          {/* Full Name */}
          <div className="bg-[#2a3350] rounded-[20px] p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#7c3aed]/10 rounded-full flex items-center justify-center">
                <IconUser size={18} className="text-[#7c3aed]" />
              </div>
              <label className="text-sm text-white/60">{content[language].fullName}</label>
            </div>
            <input
              type="text"
              defaultValue="Will Jonas"
              className="w-full text-white font-medium outline-none bg-transparent"
            />
          </div>

          {/* Email */}
          <div className="bg-[#2a3350] rounded-[20px] p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#22c55e]/10 rounded-full flex items-center justify-center">
                <IconMail size={18} className="text-[#22c55e]" />
              </div>
              <label className="text-sm text-white/60">{content[language].email}</label>
            </div>
            <input
              type="email"
              defaultValue="will.jonas@mail.com"
              className="w-full text-white font-medium outline-none bg-transparent"
            />
          </div>

          {/* Phone */}
          <div className="bg-[#2a3350] rounded-[20px] p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#ff4757]/10 rounded-full flex items-center justify-center">
                <IconPhone size={18} className="text-[#ff4757]" />
              </div>
              <label className="text-sm text-white/60">{content[language].phone}</label>
            </div>
            <input
              type="tel"
              defaultValue="+998 90 123 45 67"
              className="w-full text-white font-medium outline-none bg-transparent"
            />
          </div>

          {/* Address */}
          <div className="bg-[#2a3350] rounded-[20px] p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                <IconMapPin size={18} className="text-white/60" />
              </div>
              <label className="text-sm text-white/60">{content[language].address}</label>
            </div>
            <input
              type="text"
              defaultValue="Tashkent, Uzbekistan"
              className="w-full text-white font-medium outline-none bg-transparent"
            />
          </div>

          {/* Date of Birth */}
          <div className="bg-[#2a3350] rounded-[20px] p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#7c3aed]/10 rounded-full flex items-center justify-center">
                <IconCalendar size={18} className="text-[#7c3aed]" />
              </div>
              <label className="text-sm text-white/60">{content[language].dateOfBirth}</label>
            </div>
            <input
              type="text"
              defaultValue="15/08/1990"
              className="w-full text-white font-medium outline-none bg-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        className="px-6 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <button className="w-full bg-[#7c3aed] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#6d32d4] transition-colors shadow-lg">
          {content[language].save}
        </button>
      </motion.div>

      <BottomNav />
    </div>
  );
}