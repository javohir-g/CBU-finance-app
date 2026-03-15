import { useLanguage } from "../contexts/LanguageContext";
import { UnderDevelopment } from "../components/UnderDevelopment";

export default function FinesMIB() {
  const { language } = useLanguage();
  
  const title = language === "rus" ? "Штрафы MIB" : "Jarimalar MIB";

  return <UnderDevelopment title={title} />;
}