import { useLanguage } from "../contexts/LanguageContext";
import { UnderDevelopment } from "../components/UnderDevelopment";

export default function MyHome() {
  const { language } = useLanguage();
  
  const title = language === "rus" ? "Мой дом" : "Mening uyim";

  return <UnderDevelopment title={title} />;
}