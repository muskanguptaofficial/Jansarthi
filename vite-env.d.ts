import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang, t } from "@/lib/i18n";
import { UserProfile, getEligibleSchemes } from "@/lib/eligibility";
import { indianStates, occupationOptions, educationOptions } from "@/data/schemes";
import { Search, Loader2 } from "lucide-react";

const Eligibility = () => {
  const { lang } = useLang();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    age: "",
    gender: "male",
    occupation: "farmer",
    income: "",
    state: "Haryana",
    education: "secondary",
    disability: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const profile: UserProfile = {
      age: parseInt(form.age),
      gender: form.gender,
      occupation: form.occupation,
      income: parseInt(form.income),
      state: form.state,
      education: form.education,
      disability: form.disability,
    };

    // Simulate AI processing
    setTimeout(() => {
      const results = getEligibleSchemes(profile);
      setLoading(false);
      navigate("/results", { state: { results, profile } });
    }, 1500);
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border bg-card text-card-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm";
  const labelClass = "block text-sm font-medium text-foreground mb-1.5";

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t(lang, "Check Your Eligibility", "अपनी पात्रता जांचें")}
          </h1>
          <p className="text-muted-foreground">
            {t(lang, "Fill in your details to find schemes you're eligible for.", "अपनी पात्र योजनाएं खोजने के लिए अपना विवरण भरें।")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-xl border shadow-sm p-6 md:p-8 space-y-5 animate-slide-up">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>{t(lang, "Age", "आयु")} *</label>
              <input
                type="number"
                required
                min={0}
                max={120}
                className={inputClass}
                placeholder={t(lang, "Enter your age", "अपनी आयु दर्ज करें")}
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>{t(lang, "Gender", "लिंग")} *</label>
              <select
                className={inputClass}
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              >
                <option value="male">{t(lang, "Male", "पुरुष")}</option>
                <option value="female">{t(lang, "Female", "महिला")}</option>
                <option value="other">{t(lang, "Other", "अन्य")}</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>{t(lang, "Occupation", "व्यवसाय")} *</label>
              <select
                className={inputClass}
                value={form.occupation}
                onChange={(e) => setForm({ ...form, occupation: e.target.value })}
              >
                {occupationOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {lang === "hi" ? o.labelHi : o.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>{t(lang, "Annual Income (₹)", "वार्षिक आय (₹)")} *</label>
              <input
                type="number"
                required
                min={0}
                className={inputClass}
                placeholder={t(lang, "e.g. 300000", "उदा. 300000")}
                value={form.income}
                onChange={(e) => setForm({ ...form, income: e.target.value })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>{t(lang, "State", "राज्य")} *</label>
              <select
                className={inputClass}
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
              >
                {indianStates.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>{t(lang, "Education Level", "शिक्षा स्तर")}</label>
              <select
                className={inputClass}
                value={form.education}
                onChange={(e) => setForm({ ...form, education: e.target.value })}
              >
                {educationOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {lang === "hi" ? o.labelHi : o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="disability"
              checked={form.disability}
              onChange={(e) => setForm({ ...form, disability: e.target.checked })}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="disability" className="text-sm text-foreground">
              {t(lang, "Person with Disability", "विकलांग व्यक्ति")}
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !form.age || !form.income}
            className="w-full bg-saffron-gradient text-accent-foreground py-3 rounded-lg font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {t(lang, "Analyzing with AI...", "एआई से विश्लेषण हो रहा है...")}
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                {t(lang, "Find Eligible Schemes", "पात्र योजनाएं खोजें")}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Eligibility;
