import { useLanguage } from "../contexts/LanguageContext";
import { UnderDevelopment } from "../components/UnderDevelopment";

export default function MyCar() {
  const { language } = useLanguage();
  
  const title = language === "rus" ? "Мой автомобиль" : "Mening mashinam";

  return <UnderDevelopment title={title} />;
}