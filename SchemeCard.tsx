import { Link, useLocation } from "react-router-dom";
import { useLang, t } from "@/lib/i18n";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const { lang, setLang } = useLang();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { path: "/", label: t(lang, "Home", "होम") },
    { path: "/eligibility", label: t(lang, "Check Eligibility", "पात्रता जांचें") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-primary border-b border-primary/20 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-accent" />
          <span className="font-bold text-lg text-primary-foreground tracking-tight">
            JanSarthi<span className="text-accent">-AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-accent"
                  : "text-primary-foreground/80 hover:text-primary-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="px-3 py-1.5 rounded-md text-xs font-semibold bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
          >
            {lang === "en" ? "हिंदी" : "English"}
          </button>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden text-primary-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10 px-4 pb-4 animate-fade-in">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm text-primary-foreground/80 hover:text-primary-foreground"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => { setLang(lang === "en" ? "hi" : "en"); setMobileOpen(false); }}
            className="mt-2 px-3 py-1.5 rounded-md text-xs font-semibold bg-accent text-accent-foreground"
          >
            {lang === "en" ? "हिंदी" : "English"}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
