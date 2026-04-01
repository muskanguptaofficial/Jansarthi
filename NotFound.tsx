import { createContext, useContext } from "react";

export type Lang = "en" | "hi";

export const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

export const useLang = () => useContext(LangContext);

export const t = (lang: Lang, en: string, hi: string) => (lang === "hi" ? hi : en);
