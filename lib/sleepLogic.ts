export interface QuizAnswers {
  // Q0 — Segmentation
  ageSegment: string;
  // Phase 1 — Sleep Baseline
  morningFeel: string;
  sleepLatency: string;
  wakeCount: string;
  sleepQuality: string;
  // Phase 2 — Problem Deepening
  impactFrequency: string;
  impactArea: string;
  caffeine: string;
  emptyBattery: string;
  afternoonCrash: string;
  // Phase 3 — Identity & Aspiration
  energeticPeople: string;
  extraTwoHours: string;
  sleepLimitsPotential: string;
  sleepTrust: string;
  idealMorning: string;
  // Phase 4 — Commitment
  triedBefore: string;
  whyPostpone: string;
  commitment: string;
  wouldApplyPlan: string;
  // Phase 5 — Loss Aversion
  wouldLose: string;
  biggestFear: string;
  // Book engagement (optional)
  readWalker?: string;
  readHuffington?: string;
  bookInterest?: string;
}

export type SleepType =
  | "night-owl"
  | "fragmented"
  | "stress"
  | "recovery-deprived"
  | "balanced";

export interface SleepResult {
  sleepAge: number;
  realAge: number;
  sleepType: SleepType;
  sleepScore: number;
  primaryIssue: string;
  typeDescription: string;
  // Personalization hooks from Phase 3–5
  extraTwoHoursGoal: string;
  idealMorning: string;
  biggestFear: string;
  commitmentLevel: string;
}

export const SLEEP_TYPES: Record<
  SleepType,
  { label: string; emoji: string; color: string; shortDesc: string }
> = {
  "night-owl": {
    label: "Gece Kuşu",
    emoji: "🦉",
    color: "#818CF8",
    shortDesc: "Sirkadiyen ritmin geç faza kaymış.",
  },
  fragmented: {
    label: "Parçalı Uyuyan",
    emoji: "🌊",
    color: "#38BDF8",
    shortDesc: "Uyku süresi var ama kalite yok.",
  },
  stress: {
    label: "Stres Uykucusu",
    emoji: "⚡",
    color: "#FB923C",
    shortDesc: "Zihnin gece boyunca kapanmıyor.",
  },
  "recovery-deprived": {
    label: "Recovery Açığı",
    emoji: "🔋",
    color: "#F472B6",
    shortDesc: "Kronik uyku borcu birikmiş.",
  },
  balanced: {
    label: "Dengeli Uyuyan",
    emoji: "⚖️",
    color: "#34D399",
    shortDesc: "İyi temelin var, optimize edebilirsin.",
  },
};

const AGE_MIDPOINTS: Record<string, number> = {
  "18–24": 21,
  "25–34": 29,
  "35–44": 39,
  "45+": 50,
};

// Scoring: higher = worse sleep
function scoreMorningFeel(v: string) {
  return (
    { "Dinç ve enerjik": 0, "Biraz yorgun": 1, "Çok yorgun": 3, "Alarmı sürekli erteliyorum": 5 }[v] ?? 2
  );
}
function scoreSleepLatency(v: string) {
  return (
    { "10 dakikadan az": 0, "10–30 dakika": 1, "30–60 dakika": 3, "1 saatten fazla": 5 }[v] ?? 2
  );
}
function scoreWakeCount(v: string) {
  return { Hiç: 0, "1 kez": 1, "2–3 kez": 3, "Çok sık": 5 }[v] ?? 2;
}
function scoreSleepQuality(v: string) {
  return (
    { "Çok iyi": 0, Ortalama: 1, Zayıf: 3, "Çok kötü": 5 }[v] ?? 2
  );
}
function scoreCaffeine(v: string) {
  return { Hiç: 0, "1 fincan": 0, "2–3 fincan": 1, "4+": 3 }[v] ?? 1;
}
function scoreEmptyBattery(v: string) {
  return { Nadiren: 0, Bazen: 1, "Sık sık": 2, "Her gün": 4 }[v] ?? 1;
}
function scoreAfternoonCrash(v: string) {
  return { Hayır: 0, Bazen: 1, "Çoğu gün": 2, "Her gün": 3 }[v] ?? 1;
}

export function calculateSleepResult(answers: QuizAnswers): SleepResult {
  const realAge = AGE_MIDPOINTS[answers.ageSegment] ?? 30;

  const morningScore = scoreMorningFeel(answers.morningFeel);
  const latencyScore = scoreSleepLatency(answers.sleepLatency);
  const wakeScore = scoreWakeCount(answers.wakeCount);
  const qualityScore = scoreSleepQuality(answers.sleepQuality);
  const caffeineScore = scoreCaffeine(answers.caffeine);
  const batteryScore = scoreEmptyBattery(answers.emptyBattery);
  const crashScore = scoreAfternoonCrash(answers.afternoonCrash);

  const totalPenalty =
    morningScore + latencyScore + wakeScore + qualityScore +
    caffeineScore + batteryScore + crashScore;

  const maxPenalty = 5 + 5 + 5 + 5 + 3 + 4 + 3; // 30
  const penaltyRatio = totalPenalty / maxPenalty;

  // Sleep age: can be up to +18 years worse
  const ageDelta = Math.round(penaltyRatio * 18);
  const sleepAge = Math.min(realAge + 25, Math.max(realAge - 3, realAge + ageDelta));

  // Sleep score (0–100)
  const sleepScore = Math.round(Math.max(20, 100 - penaltyRatio * 75));

  // Sleep type logic
  let sleepType: SleepType = "balanced";
  if (latencyScore >= 3 && batteryScore >= 2) {
    sleepType = "stress";
  } else if (wakeScore >= 3) {
    sleepType = "fragmented";
  } else if (morningScore >= 3 && qualityScore >= 3) {
    sleepType = "recovery-deprived";
  } else if (qualityScore >= 2 && crashScore >= 2) {
    sleepType = "night-owl";
  }

  const primaryIssues: Record<SleepType, string> = {
    "night-owl": "Gecikmiş sirkadiyen ritim — biyolojik saatin kayıyor",
    fragmented: "Parçalı uyku — derin uyku fazına geçemiyorsun",
    stress: "Yüksek kortizol — zihnin gece boyunca kapanmıyor",
    "recovery-deprived": "Kronik uyku borcu — vücudun onarım fırsatı bulamıyor",
    balanced: "Küçük tutarsızlıklar — temelin iyi ama optimize edebilirsin",
  };

  return {
    sleepAge,
    realAge,
    sleepType,
    sleepScore,
    primaryIssue: primaryIssues[sleepType],
    typeDescription: SLEEP_TYPES[sleepType].shortDesc,
    extraTwoHoursGoal: answers.extraTwoHours,
    idealMorning: answers.idealMorning,
    biggestFear: answers.biggestFear,
    commitmentLevel: answers.commitment,
  };
}
