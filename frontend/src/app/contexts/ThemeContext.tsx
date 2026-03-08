import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colors: {
    background: string;
    cardBackground: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
    success: string;
    danger: string;
    warning: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme");
    return (saved as Theme) || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const colors = theme === "dark" 
    ? {
        background: "#1e2337",
        cardBackground: "#2a3350",
        text: "#ffffff",
        textSecondary: "rgba(255, 255, 255, 0.6)",
        border: "rgba(255, 255, 255, 0.1)",
        primary: "#7c3aed",
        success: "#22c55e",
        danger: "#ff4757",
        warning: "#f59e0b"
      }
    : {
        background: "#f5f7fa",
        cardBackground: "#ffffff",
        text: "#1e2337",
        textSecondary: "rgba(30, 35, 55, 0.6)",
        border: "rgba(30, 35, 55, 0.1)",
        primary: "#7c3aed",
        success: "#22c55e",
        danger: "#ff4757",
        warning: "#f59e0b"
      };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}