import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { IconX, IconCar, IconPlane, IconHome, IconShoppingBag, IconBook, IconHeart, IconTrophy, IconGift } from "@tabler/icons-react";

interface AddGoalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGoal: (goal: { name: string; amount: number; icon: string; color: string }) => void;
}

export function AddGoalDrawer({ isOpen, onClose, onAddGoal }: AddGoalDrawerProps) {
  const { language } = useLanguage();
  const { colors } = useTheme();
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("car");
  const [selectedColor, setSelectedColor] = useState("#ff4757");

  const content = {
    rus: {
      title: "Новая Цель",
      goalName: "Название цели",
      goalAmount: "Сумма цели",
      selectIcon: "Выберите иконку",
      selectColor: "Выберите цвет",
      cancel: "Отмена",
      add: "Добавить",
      enterName: "Введите название",
      enterAmount: "Введите сумму"
    },
    uzb: {
      title: "Yangi Maqsad",
      goalName: "Maqsad nomi",
      goalAmount: "Maqsad summasi",
      selectIcon: "Ikonka tanlang",
      selectColor: "Rang tanlang",
      cancel: "Bekor qilish",
      add: "Qo'shish",
      enterName: "Nomini kiriting",
      enterAmount: "Summani kiriting"
    }
  };

  const icons = [
    { id: "car", Icon: IconCar },
    { id: "plane", Icon: IconPlane },
    { id: "home", Icon: IconHome },
    { id: "shopping", Icon: IconShoppingBag },
    { id: "book", Icon: IconBook },
    { id: "heart", Icon: IconHeart },
    { id: "trophy", Icon: IconTrophy },
    { id: "gift", Icon: IconGift }
  ];

  const colors_options = [
    "#ff4757",
    "#7c3aed",
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#ec4899",
    "#14b8a6",
    "#f97316"
  ];

  const handleSubmit = () => {
    if (goalName.trim() && goalAmount && parseFloat(goalAmount) > 0) {
      onAddGoal({
        name: goalName,
        amount: parseFloat(goalAmount),
        icon: selectedIcon,
        color: selectedColor
      });
      // Reset form
      setGoalName("");
      setGoalAmount("");
      setSelectedIcon("car");
      setSelectedColor("#ff4757");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
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
              <div className="w-12 h-1.5 rounded-full" style={{ backgroundColor: colors.textSecondary, opacity: 0.3 }} />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: colors.border }}>
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>{content[language].title}</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: colors.cardBackground }}
              >
                <IconX size={20} style={{ color: colors.text }} />
              </button>
            </div>

            {/* Form */}
            <div className="px-6 py-6 space-y-6">
              {/* Goal Name */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  {content[language].goalName}
                </label>
                <input
                  type="text"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  placeholder={content[language].enterName}
                  className="w-full px-4 py-3 rounded-2xl text-base outline-none transition-colors"
                  style={{
                    backgroundColor: colors.cardBackground,
                    color: colors.text,
                    border: `1px solid ${colors.border}`
                  }}
                />
              </div>

              {/* Goal Amount */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  {content[language].goalAmount}
                </label>
                <input
                  type="number"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                  placeholder={content[language].enterAmount}
                  className="w-full px-4 py-3 rounded-2xl text-base outline-none transition-colors"
                  style={{
                    backgroundColor: colors.cardBackground,
                    color: colors.text,
                    border: `1px solid ${colors.border}`
                  }}
                />
              </div>

              {/* Select Icon */}
              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: colors.text }}>
                  {content[language].selectIcon}
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {icons.map(({ id, Icon }) => (
                    <button
                      key={id}
                      onClick={() => setSelectedIcon(id)}
                      className="w-full aspect-square rounded-2xl flex items-center justify-center transition-all"
                      style={{
                        backgroundColor: selectedIcon === id ? selectedColor : colors.cardBackground,
                        border: selectedIcon === id ? `2px solid ${selectedColor}` : `1px solid ${colors.border}`
                      }}
                    >
                      <Icon 
                        size={28} 
                        style={{ color: selectedIcon === id ? "#ffffff" : colors.text }} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Color */}
              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: colors.text }}>
                  {content[language].selectColor}
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {colors_options.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className="w-full aspect-square rounded-2xl flex items-center justify-center transition-all"
                      style={{
                        backgroundColor: color,
                        border: selectedColor === color ? "3px solid white" : "none",
                        boxShadow: selectedColor === color ? "0 0 0 2px " + color : "none"
                      }}
                    >
                      {selectedColor === color && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 py-4 rounded-full font-semibold text-base transition-colors"
                  style={{
                    backgroundColor: colors.cardBackground,
                    color: colors.text
                  }}
                >
                  {content[language].cancel}
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-4 rounded-full font-semibold text-base bg-[#7c3aed] text-white hover:bg-[#6d32d4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!goalName.trim() || !goalAmount || parseFloat(goalAmount) <= 0}
                >
                  {content[language].add}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}