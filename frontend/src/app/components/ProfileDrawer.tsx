import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { IconX, IconUser, IconShield, IconInfoCircle, IconSettings, IconLogout, IconChevronRight, IconMoon, IconSun, IconLanguage } from "@tabler/icons-react";
import { useAuth } from "../contexts/AuthContext";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme, colors } = useTheme();
  const { user } = useAuth();

  const content = {
    rus: {
      profile: "Профиль",
      name: "Alexa",
      email: "alexa@example.com",
      profileSettings: "Настройки Профиля",
      security: "Безопасность",
      about: "О Программе",
      settings: "Настройки",
      logout: "Выйти",
      theme: "Тема",
      languageLabel: "Язык",
      dark: "Темная",
      light: "Светлая",
      russian: "Русский",
      uzbek: "Узбекский"
    },
    uzb: {
      profile: "Profil",
      name: "Alexa",
      email: "alexa@example.com",
      profileSettings: "Profil Sozlamalari",
      security: "Xavfsizlik",
      about: "Dastur Haqida",
      settings: "Sozlamalar",
      logout: "Chiqish",
      theme: "Mavzu",
      languageLabel: "Til",
      dark: "Qorong'i",
      light: "Yorug'",
      russian: "Ruscha",
      uzbek: "O'zbekcha"
    }
  };

  const menuItems = [
    {
      icon: IconUser,
      label: content[language].profileSettings,
      path: "/profile-settings",
      color: "#7c3aed"
    },
    {
      icon: IconShield,
      label: content[language].security,
      path: "/security",
      color: "#22c55e"
    },
    {
      icon: IconInfoCircle,
      label: content[language].about,
      path: "/about",
      color: "#ff4757"
    }
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    navigate("/");
    onClose();
  };

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLanguageChange = (lang: "rus" | "uzb") => {
    setLanguage(lang);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 rounded-t-[30px] z-50 max-h-[85vh] overflow-y-auto"
            style={{ backgroundColor: colors.background }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 rounded-full" style={{ backgroundColor: colors.border }} />
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: `${colors.text}08` }}
            >
              <IconX size={20} style={{ color: colors.text }} />
            </button>

            {/* Profile Info */}
            <div className="px-6 pt-2 pb-6 text-center">
              <div className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#7c3aed]/20 overflow-hidden">
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold mb-1" style={{ color: colors.text }}>{user?.name || content[language].name}</h2>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                {user?.phone ? user.phone : (user?.username ? `@${user.username}` : "")}
              </p>
            </div>

            {/* Menu Items */}
            <div className="px-6 pb-8">
              <div className="space-y-2">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleMenuClick(item.path)}
                    className="w-full rounded-[20px] p-4 flex items-center justify-between transition-colors"
                    style={{ backgroundColor: colors.cardBackground }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}15` }}
                      >
                        <item.icon size={20} style={{ color: item.color }} />
                      </div>
                      <span className="font-medium text-[15px]" style={{ color: colors.text }}>{item.label}</span>
                    </div>
                    <IconChevronRight size={20} style={{ color: colors.textSecondary }} />
                  </button>
                ))}

                {/* Theme Selection */}
                <div className="w-full rounded-[20px] p-4 mt-4" style={{ backgroundColor: colors.cardBackground }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-full bg-[#7c3aed]/15 flex items-center justify-center">
                      {theme === "dark" ? <IconMoon size={20} className="text-[#7c3aed]" /> : <IconSun size={20} className="text-[#f59e0b]" />}
                    </div>
                    <span className="font-medium text-[15px]" style={{ color: colors.text }}>{content[language].theme}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setTheme("dark")}
                      className={`py-2.5 px-4 rounded-full font-medium text-sm transition-all ${theme === "dark"
                        ? "bg-[#7c3aed] text-white"
                        : ""
                        }`}
                      style={theme !== "dark" ? { backgroundColor: colors.cardBackground === "#ffffff" ? "#f5f7fa" : colors.background, color: colors.textSecondary } : {}}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <IconMoon size={16} />
                        <span>{content[language].dark}</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setTheme("light")}
                      className={`py-2.5 px-4 rounded-full font-medium text-sm transition-all ${theme === "light"
                        ? "bg-[#f59e0b] text-white"
                        : ""
                        }`}
                      style={theme !== "light" ? { backgroundColor: colors.cardBackground === "#ffffff" ? "#f5f7fa" : colors.background, color: colors.textSecondary } : {}}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <IconSun size={16} />
                        <span>{content[language].light}</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Language Selection */}
                <div className="w-full rounded-[20px] p-4 mt-2" style={{ backgroundColor: colors.cardBackground }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-full bg-[#22c55e]/15 flex items-center justify-center">
                      <IconLanguage size={20} className="text-[#22c55e]" />
                    </div>
                    <span className="font-medium text-[15px]" style={{ color: colors.text }}>{content[language].languageLabel}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleLanguageChange("rus")}
                      className={`py-2.5 px-4 rounded-full font-medium text-sm transition-all ${language === "rus"
                        ? "bg-[#22c55e] text-white"
                        : ""
                        }`}
                      style={language !== "rus" ? { backgroundColor: theme === "dark" ? colors.background : colors.cardBackground === "#ffffff" ? "#f5f7fa" : colors.background, color: colors.textSecondary } : {}}
                    >
                      {content[language].russian}
                    </button>
                    <button
                      onClick={() => handleLanguageChange("uzb")}
                      className={`py-2.5 px-4 rounded-full font-medium text-sm transition-all ${language === "uzb"
                        ? "bg-[#22c55e] text-white"
                        : ""
                        }`}
                      style={language !== "uzb" ? { backgroundColor: theme === "dark" ? colors.background : colors.cardBackground === "#ffffff" ? "#f5f7fa" : colors.background, color: colors.textSecondary } : {}}
                    >
                      {content[language].uzbek}
                    </button>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#ff4757]/10 rounded-[20px] p-4 flex items-center justify-center gap-3 hover:bg-[#ff4757]/20 transition-colors mt-4"
                >
                  <IconLogout size={20} className="text-[#ff4757]" />
                  <span className="text-[#ff4757] font-semibold text-[15px]">{content[language].logout}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}