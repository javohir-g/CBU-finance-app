import { useNavigate, useLocation } from "react-router";
import { 
  IconHome, 
  IconHomeFilled,
  IconCreditCard, 
  IconCreditCardFilled,
  IconStar, 
  IconStarFilled, 
  IconGridDots, 
  IconLayoutGridFilled,
  IconRepeat 
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { colors, theme } = useTheme();

  const navItems = [
    { icon: IconHome, iconFilled: IconHomeFilled, path: "/dashboard", label: "Home" },
    { icon: IconRepeat, iconFilled: IconRepeat, path: "/transactions", label: "Transactions" },
    { icon: IconStar, iconFilled: IconStarFilled, path: "/savings", label: "Goals" },
    { icon: IconCreditCard, iconFilled: IconCreditCardFilled, path: "/cards", label: "Cards" },
    { icon: IconGridDots, iconFilled: IconLayoutGridFilled, path: "/more", label: "More" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Gradient Background */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: `linear-gradient(to top, ${colors.background} 0%, ${colors.background}00 100%)`
        }}
      />
      
      {/* Navigation Bar */}
      <div className="relative px-6 pb-6">
        <div className="max-w-[430px] mx-auto rounded-full shadow-2xl p-2.5" style={{ backgroundColor: colors.cardBackground, borderWidth: '1px', borderColor: colors.border }}>
          <div className="flex items-center justify-between gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const IconFilled = item.iconFilled;
              const isActive = location.pathname === item.path;

              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden`}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#7c3aed] rounded-full"
                      style={{ boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)' }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1,
                    }}
                    transition={{
                      scale: { duration: 0.3 },
                    }}
                    className="relative z-10"
                  >
                    {isActive ? (
                      <IconFilled
                        size={24}
                        className="transition-colors duration-300"
                        style={{ color: theme === "light" && isActive ? "#ffffff" : colors.text }}
                      />
                    ) : (
                      <Icon
                        size={24}
                        className="transition-colors duration-300"
                        style={{ color: colors.textSecondary }}
                        stroke={2.5}
                      />
                    )}
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}