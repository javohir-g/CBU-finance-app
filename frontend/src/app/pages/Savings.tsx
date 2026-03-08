import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { savingsService, Goal } from "../api/services/savings.service";
import { BottomNav } from "../components/BottomNav";
import { AddGoalDrawer } from "../components/AddGoalDrawer";
import { IconCar, IconPlane, IconHome, IconPlus, IconShoppingBag, IconBook, IconHeart, IconTrophy, IconGift } from "@tabler/icons-react";

export default function Savings() {
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [savingsGoals, setSavingsGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const content = {
    rus: {
      title: "Цели",
      saved: "Накоплено",
      goal: "Цель",
      addGoal: "Добавить цель"
    },
    uzb: {
      title: "Maqsadlar",
      saved: "Jamg'arildi",
      goal: "Maqsad",
      addGoal: "Maqsad qo'shish"
    }
  };

  const iconMap: Record<string, any> = {
    car: IconCar,
    plane: IconPlane,
    home: IconHome,
    shopping: IconShoppingBag,
    book: IconBook,
    heart: IconHeart,
    trophy: IconTrophy,
    gift: IconGift
  };

  // Fetch goals
  const fetchGoals = async () => {
    setIsLoading(true);
    try {
      const response = await savingsService.getGoals();
      setSavingsGoals(response.goals);
    } catch (error) {
      console.error("Failed to fetch goals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = async (newGoal: { name: string; amount: number; icon: string; color: string }) => {
    try {
      await savingsService.createGoal({
        name: newGoal.name,
        target_amount: newGoal.amount,
        icon: newGoal.icon,
        color: newGoal.color,
        currency: "USD"
      });
      fetchGoals(); // Refresh goals
      setIsAddGoalOpen(false);
    } catch (error) {
      console.error("Failed to create goal:", error);
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
        <div className="w-11" />
        <h1 className="text-xl font-semibold" style={{ color: colors.text }}>{content[language].title}</h1>
        <div className="w-11" />
      </motion.div>

      {/* Savings Goals */}
      <motion.div
        className="px-6 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse h-40 rounded-[24px] w-full" style={{ backgroundColor: colors.cardBackground }}></div>
            ))
          ) : savingsGoals.length > 0 ? (
            savingsGoals.map((goal, index) => {
              const progress = (goal.current_amount / goal.target_amount) * 100;
              const Icon = iconMap[goal.icon || "car"] || IconCar;
              const bgColorStyle = { backgroundColor: `${goal.color || "#7c3aed"}1A` };

              return (
                <motion.div
                  key={goal.id}
                  className="rounded-[24px] p-5 cursor-pointer transition-colors"
                  style={{ backgroundColor: colors.cardBackground }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={bgColorStyle}>
                        <Icon size={24} style={{ color: goal.color || "#7c3aed" }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg" style={{ color: colors.text }}>{goal.name}</h3>
                        <p className="text-xs" style={{ color: colors.textSecondary }}>{Math.round(progress)}%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl" style={{ color: colors.text }}>${goal.current_amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                      <p className="text-xs" style={{ color: colors.textSecondary }}>{content[language].saved}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: colors.background }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: goal.color || "#7c3aed" }}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, progress)}%` }}
                        transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm" style={{ color: colors.textSecondary }}>{content[language].goal}</p>
                    <p className="text-sm font-semibold" style={{ color: colors.textSecondary }}>${goal.target_amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${colors.text}08` }}>
                <IconTrophy size={40} style={{ color: colors.textSecondary }} />
              </div>
              <p className="text-lg font-semibold mb-1" style={{ color: colors.text }}>
                {language === "rus" ? "У вас пока нет целей" : "Hozircha maqsadlaringiz yo'q"}
              </p>
              <p className="text-sm px-8" style={{ color: colors.textSecondary }}>
                {language === "rus"
                  ? "Добавьте свою первую финансовую цель, чтобы начать копить на мечту"
                  : "Orzuyingiz uchun jamg'arishni boshlash uchun birinchi moliyaviy maqsadingizni qo'shing"}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Add New Goal Button */}
      <motion.div
        className="px-6 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <button
          onClick={() => setIsAddGoalOpen(true)}
          className="w-full bg-[#7c3aed] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#6d32d4] transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          <IconPlus size={20} />
          {content[language].addGoal}
        </button>
      </motion.div>

      <BottomNav />
      <AddGoalDrawer isOpen={isAddGoalOpen} onClose={() => setIsAddGoalOpen(false)} onAddGoal={handleAddGoal} />
    </div>
  );
}