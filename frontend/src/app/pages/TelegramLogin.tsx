import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { authService } from "../api/services/auth.service";
import { IconBrandTelegram, IconArrowLeft, IconShieldCheck } from "@tabler/icons-react";
import { useState } from "react";

export default function TelegramLogin() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { colors } = useTheme();
  const { login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleTelegramLogin = async () => {
    setIsLoggingIn(true);
    try {
      // Access Telegram WebApp API
      const tg = (window as any).Telegram?.WebApp;
      if (tg) {
        tg.ready();
        tg.expand();
      }
      const initData = tg?.initData;
      const colorScheme = tg?.colorScheme || "dark";

      if (!initData && (import.meta as any).env.PROD) {
        throw new Error("Telegram WebApp data not found");
      }

      console.log("Attempting Telegram login with real data...");

      // Prepare payload for backend - sending the raw initData string
      // The backend will verify it using our BOT_TOKEN
      const payload = {
        initData: initData || "mock_init_data_for_dev",
        colorScheme
      };

      // Call our backend
      const response = await authService.loginWithTelegram(payload);

      if (response.success) {
        // Save to global context
        login(response.token, response.user);
        
        // Mark onboarding as complete since they've reached login/dashboard
        localStorage.setItem("onboarding_complete", "true");

        // If it's a new user, the state will be empty by default from backend
        // Clear any potential local state if necessary (though usually handled by backend)

        // Navigate to dashboard or profile completion
        if (response.user && !response.user.phone) {
          navigate("/complete-profile");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);

      // Detailed error message
      const errorMessage = language === "rus"
        ? "Ошибка входа через Telegram. Убедитесь, что вы открыли приложение внутри Telegram."
        : "Telegram orqali kirishda xatolik. Ilovani Telegram ichida ochganingizga ishonch hosil qiling.";

      const errorDetail = (error as any).response?.data?.detail || (error as any).message || String(error);
      alert(`${errorMessage}\n\nDetails: ${errorDetail}`);

      // NO Fallback in real production for security, but keeping a dev one for your convenience
      if ((import.meta as any).env.DEV) {
        console.warn("Dev fallback triggered");
        login("mock_token", { id: 123, name: "Alexa", username: "alexa_user", avatar: "", phone: undefined });
        navigate("/complete-profile");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const content = {
    rus: {
      title: "Войдите в аккаунт",
      subtitle: "Используйте Telegram для быстрого и безопасного входа",
      telegramButton: "Войти через Telegram",
      back: "Назад",
      secureLogin: "Безопасный вход",
      secureDesc: "Ваши данные защищены с помощью шифрования"
    },
    uzb: {
      title: "Akkauntga kiring",
      subtitle: "Tez va xavfsiz kirish uchun Telegram dan foydalaning",
      telegramButton: "Telegram orqali kirish",
      back: "Orqaga",
      secureLogin: "Xavfsiz kirish",
      secureDesc: "Sizning ma'lumotlaringiz shifrlash bilan himoyalangan"
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center overflow-hidden relative px-6" style={{ backgroundColor: colors.background }}>
      {/* Back Button */}
      <motion.button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-95 z-20"
        style={{ backgroundColor: colors.cardBackground }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <IconArrowLeft size={20} style={{ color: colors.text }} />
      </motion.button>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Telegram Icon */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-[#2AABEE] to-[#229ED9] rounded-full flex items-center justify-center shadow-2xl shadow-[#2AABEE]/30">
            <IconBrandTelegram size={48} className="text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          className="mb-3 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h1 className="text-3xl font-semibold" style={{ color: colors.text }}>
            {content[language].title}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-sm text-center mb-10 max-w-xs"
          style={{ color: colors.textSecondary }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          {content[language].subtitle}
        </motion.p>

        {/* Telegram Login Button */}
        <motion.button
          onClick={handleTelegramLogin}
          className="w-full max-w-sm py-4 rounded-full flex items-center justify-center gap-3 text-white text-base font-semibold shadow-2xl shadow-[#2AABEE]/30 transition-all active:scale-95 mb-6"
          style={{
            background: "linear-gradient(135deg, #2AABEE 0%, #229ED9 100%)"
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <IconBrandTelegram size={24} />
          {content[language].telegramButton}
        </motion.button>

        {/* Security Info */}
        <motion.div
          className="rounded-2xl p-4 max-w-sm w-full"
          style={{ backgroundColor: colors.cardBackground }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#22c55e] to-[#16a34a] flex items-center justify-center flex-shrink-0">
              <IconShieldCheck size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1" style={{ color: colors.text }}>
                {content[language].secureLogin}
              </h3>
              <p className="text-xs" style={{ color: colors.textSecondary }}>
                {content[language].secureDesc}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}