import { Shield } from "lucide-react";
import { useLang, t } from "@/lib/i18n";

const Footer = () => {
  const { lang } = useLang();
  return (
    <footer className="bg-primary py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Shield className="h-5 w-5 text-accent" />
          <span className="font-bold text-primary-foreground">JanSarthi-AI</span>
        </div>
        <p className="text-primary-foreground/60 text-sm">
          {t(lang, "Empowering citizens with AI-driven access to government schemes", "एआई-संचालित सरकारी योजनाओं तक पहुंच के साथ नागरिकों को सशक्त बनाना")}
        </p>
        <p className="text-primary-foreground/40 text-xs mt-4">© 2025 JanSarthi-AI. {t(lang, "All rights reserved.", "सर्वाधिकार सुरक्षित।")}</p>
      </div>
    </footer>
  );
};

export default Footer;
