import { Scheme, schemes } from "@/data/schemes";

export interface UserProfile {
  age: number;
  gender: string;
  occupation: string;
  income: number;
  state: string;
  education: string;
  disability: boolean;
}

export interface EligibilityResult {
  scheme: Scheme;
  score: number;
  matchReasons: string[];
  matchReasonsHi: string[];
}

function calculateScore(scheme: Scheme, user: UserProfile): EligibilityResult | null {
  let score = 0;
  const reasons: string[] = [];
  const reasonsHi: string[] = [];

  // Age match (+20)
  const ageMatch =
    (scheme.ageMin === undefined || user.age >= scheme.ageMin) &&
    (scheme.ageMax === undefined || user.age <= scheme.ageMax);
  if (ageMatch) {
    score += 20;
    reasons.push("Age criteria met");
    reasonsHi.push("आयु मानदंड पूरा");
  } else {
    return null; // hard filter
  }

  // Income match (+20)
  if (scheme.incomeMax !== undefined) {
    if (user.income <= scheme.incomeMax) {
      score += 20;
      reasons.push("Income within limit");
      reasonsHi.push("आय सीमा के भीतर");
    } else {
      return null;
    }
  } else {
    score += 15;
  }

  // Category/Occupation match (+30)
  if (scheme.occupations.includes(user.occupation)) {
    score += 30;
    reasons.push("Occupation matches");
    reasonsHi.push("व्यवसाय मेल खाता है");
  } else {
    return null;
  }

  // State match (+20)
  if (scheme.states.includes("all") || scheme.states.includes(user.state)) {
    score += 20;
    reasons.push("Available in your state");
    reasonsHi.push("आपके राज्य में उपलब्ध");
  } else {
    return null;
  }

  // Gender match (+5)
  if (scheme.gender === "all" || scheme.gender === user.gender) {
    score += 5;
    reasons.push("Gender criteria met");
    reasonsHi.push("लिंग मानदंड पूरा");
  } else {
    return null;
  }

  // Education bonus (+5)
  if (scheme.educationLevels && scheme.educationLevels.includes(user.education)) {
    score += 5;
    reasons.push("Education level matches");
    reasonsHi.push("शिक्षा स्तर मेल खाता है");
  }

  // Disability bonus
  if (scheme.disabilityEligible && user.disability) {
    score += 5;
    reasons.push("Disability benefits available");
    reasonsHi.push("विकलांगता लाभ उपलब्ध");
  }

  // Cap at 100
  score = Math.min(score, 100);

  return { scheme, score, matchReasons: reasons, matchReasonsHi: reasonsHi };
}

export function getEligibleSchemes(user: UserProfile): EligibilityResult[] {
  const results: EligibilityResult[] = [];

  for (const scheme of schemes) {
    const result = calculateScore(scheme, user);
    if (result) {
      results.push(result);
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 10);
}
