import { EligibilityResult } from "@/lib/eligibility";
import { useLang, t } from "@/lib/i18n";
import { FileText, ExternalLink, Calendar, Building2 } from "lucide-react";
import { useState } from "react";

interface Props {
  result: EligibilityResult;
  index: number;
}

const SchemeCard = ({ result, index }: Props) => {
  const { lang } = useLang();
  const { scheme, score, matchReasons, matchReasonsHi } = result;
  const [expanded, setExpanded] = useState(false);

  const scoreColor =
    score >= 80 ? "bg-success-gradient" : score >= 60 ? "bg-saffron-gradient" : "bg-muted";
  const scoreText =
    score >= 80 ? "text-success-foreground" : score >= 60 ? "text-accent-foreground" : "text-foreground";

  return (
    <div
      className="bg-card rounded-lg border shadow-sm hover:shadow-md transition-all duration-300 animate-slide-up overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-card-foreground text-lg leading-tight">
              {lang === "hi" ? scheme.nameHi : scheme.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 text-muted-foreground text-xs">
              <Building2 className="h-3 w-3" />
              {lang === "hi" ? scheme.ministryHi : scheme.ministry}
            </div>
          </div>
          <div className={`${scoreColor} ${scoreText} px-3 py-1.5 rounded-full text-sm font-bold whitespace-nowrap`}>
            {score}% {t(lang, "Eligible", "पात्र")}
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {lang === "hi" ? scheme.descriptionHi : scheme.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {(lang === "hi" ? matchReasonsHi : matchReasons).map((r, i) => (
            <span key={i} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
              ✓ {r}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {scheme.deadline}
          </span>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-primary font-medium hover:underline"
        >
          {expanded
            ? t(lang, "Hide Details", "विवरण छुपाएं")
            : t(lang, "View Details & Documents", "विवरण और दस्तावेज़ देखें")}
        </button>

        {expanded && (
          <div className="mt-4 pt-4 border-t animate-fade-in">
            <h4 className="text-sm font-semibold text-card-foreground mb-2 flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              {t(lang, "Required Documents", "आवश्यक दस्तावेज़")}
            </h4>
            <ul className="space-y-1 mb-4">
              {(lang === "hi" ? scheme.documentsHi : scheme.documents).map((doc, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                  {doc}
                </li>
              ))}
            </ul>
            <a
              href={scheme.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {t(lang, "Apply Now", "अभी आवेदन करें")}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemeCard;
