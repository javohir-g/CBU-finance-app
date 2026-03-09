import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { userService } from "../api/services/user.service";
import { IconDeviceMobile, IconArrowRight, IconLoader2 } from "@tabler/icons-react";

export default function CompleteProfile() {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const { colors } = useTheme();
    const { user, login } = useAuth();

    const [phone, setPhone] = useState(user?.phone || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Redirect to dashboard if phone is already set (safety check)
    useEffect(() => {
        if (user?.phone) {
            navigate("/dashboard", { replace: true });
        }
    }, [user, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone.trim()) {
            setError(language === "rus" ? "Введите номер телефона" : "Telefon raqamini kiriting");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const updatedUser = await userService.updateProfile({ phone });

            // Update global context user (assuming token hasn't changed)
            if (user) {
                // We get the token from localStorage directly to preserve it
                const token = localStorage.getItem("auth_token") || "";
                login(token, { ...user, phone: updatedUser.phone });
            }

            navigate("/dashboard");
        } catch (err: any) {
            console.error("Failed to update profile", err);
            setError(
                language === "rus"
                    ? "Не удалось сохранить данные. Попробуйте еще раз."
                    : "Ma'lumotlarni saqlab bo'lmadi. Qaytadan urinib ko'ring."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const content = {
        rus: {
            title: "Завершение профиля",
            subtitle: "Пожалуйста, укажите ваш номер телефона для безопасности и уведомлений",
            phoneLabel: "Номер телефона",
            phonePlaceholder: "+998 90 123 45 67",
            save: "Сохранить и продолжить"
        },
        uzb: {
            title: "Profilni yakunlash",
            subtitle: "Xavfsizlik va xabarnomalar uchun telefon raqamingizni kiriting",
            phoneLabel: "Telefon raqami",
            phonePlaceholder: "+998 90 123 45 67",
            save: "Saqlash va davom etish"
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col px-6 pt-12" style={{ backgroundColor: colors.background }}>
            <motion.div
                className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <div className="w-20 h-20 bg-[#2AABEE]/10 rounded-full flex items-center justify-center mb-6">
                    <IconDeviceMobile size={40} className="text-[#2AABEE]" />
                </div>

                <h1 className="text-2xl font-bold mb-2 text-center" style={{ color: colors.text }}>
                    {content[language].title}
                </h1>
                <p className="text-center text-sm mb-8 px-4" style={{ color: colors.textSecondary }}>
                    {content[language].subtitle}
                </p>

                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                            {content[language].phoneLabel}
                        </label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={content[language].phonePlaceholder}
                            className="w-full px-4 py-3.5 rounded-2xl outline-none transition-all border-2 focus:border-[#2AABEE]"
                            style={{
                                backgroundColor: colors.cardBackground,
                                color: colors.text,
                                borderColor: error ? "#ff4757" : colors.border
                            }}
                            disabled={isSubmitting}
                        />
                        {error && (
                            <p className="text-xs text-[#ff4757] mt-2 ml-2">{error}</p>
                        )}
                    </div>

                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-full flex items-center justify-center gap-2 text-white font-semibold transition-all shadow-xl shadow-[#2AABEE]/30 disabled:opacity-70"
                        style={{ background: "linear-gradient(135deg, #2AABEE 0%, #229ED9 100%)" }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isSubmitting ? (
                            <IconLoader2 size={22} className="animate-spin" />
                        ) : (
                            <>
                                {content[language].save}
                                <IconArrowRight size={20} />
                            </>
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
