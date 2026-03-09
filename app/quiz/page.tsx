"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuizAnswers } from "@/lib/sleepLogic";

// ─── Phase definitions ────────────────────────────────────────────────────────
interface Insight {
  type: "quote" | "fact" | "book";
  text: string;
  source: string;
}

interface Phase {
  id: number;
  emoji: string;
  title: string;
  subtitle: string;
  insight?: Insight;
}

const PHASES: Phase[] = [
  { id: 0, emoji: "📋", title: "Hızlı bir soru", subtitle: "Seni tanıyalım" },
  {
    id: 1,
    emoji: "😴",
    title: "Uyku Temeliniz",
    subtitle: "Şu anki durumunu anlıyoruz",
  },
  {
    id: 2,
    emoji: "🔍",
    title: "Problemi Derinleştiriyoruz",
    subtitle: "Gerçek nedeni buluyoruz",
    insight: {
      type: "fact",
      text: "6 saatten az uyuyan birinin bilişsel performansı, 10 gün içinde tamamen uykusuz kalmakla eşdeğer hale gelir — ama kişi bunu fark etmez.",
      source: "Van Dongen et al., University of Pennsylvania (2003)",
    },
  },
  {
    id: 3,
    emoji: "🎯",
    title: "Kimliğin & Hedeflerin",
    subtitle: "Seni neyin motive ettiğini anlıyoruz",
    insight: {
      type: "quote",
      text: "\"Uyku önceliğimin bir göstergesidir. Yorgunken iyi kararlar veremiyorum, iyi düşünemiyorum. Uyku benim için müzakere edilemez.\"",
      source: "Jeff Bezos — Amazon Kurucusu",
    },
  },
  {
    id: 4,
    emoji: "💪",
    title: "Kararlılık",
    subtitle: "Hazır olup olmadığını ölçüyoruz",
    insight: {
      type: "book",
      text: "Matthew Walker'ın 'Why We Sleep' kitabına göre uyku süresi 6'dan 8 saate çıktığında öğrenme kapasitesi %40 artıyor ve duygusal tepkisellik dramatik biçimde düşüyor.",
      source: "Why We Sleep — Matthew Walker (2017)",
    },
  },
  {
    id: 5,
    emoji: "⚠️",
    title: "Risk Değerlendirmesi",
    subtitle: "Son 2 soru",
    insight: {
      type: "fact",
      text: "Kronik uyku eksikliği bağışıklık sistemini %70'e kadar zayıflatır. CDC, uyku yoksunluğunu resmi olarak halk sağlığı krizi ilan etmiştir.",
      source: "CDC — Centers for Disease Control and Prevention",
    },
  },
];

// ─── Question definitions ─────────────────────────────────────────────────────
interface Question {
  id: keyof QuizAnswers;
  question: string;
  subtext?: string;
  options: string[];
  phase: number;
}

const QUESTIONS: Question[] = [
  // Q0 — Segmentation
  {
    id: "ageSegment",
    question: "Yaş aralığın nedir?",
    phase: 0,
    options: ["18–24", "25–34", "35–44", "45+"],
  },
  // Phase 1 — Sleep Baseline
  {
    id: "morningFeel",
    question: "Sabah uyandığında kendini nasıl hissediyorsun?",
    phase: 1,
    options: ["Dinç ve enerjik", "Biraz yorgun", "Çok yorgun", "Alarmı sürekli erteliyorum"],
  },
  {
    id: "sleepLatency",
    question: "Uykuya dalman genelde ne kadar sürüyor?",
    phase: 1,
    options: ["Yatağa girdiğim andan itibaren", "10 dakikadan az", "10–30 dakika", "30–60 dakika", "1 saatten fazla"],
  },
  {
    id: "wakeCount",
    question: "Gece kaç kez uyanırsın?",
    phase: 1,
    options: ["Hiç", "1 kez", "2–3 kez", "Çok sık"],
  },
  {
    id: "sleepQuality",
    question: "Genel olarak uykunu nasıl değerlendirirsin?",
    phase: 1,
    options: ["Çok iyi", "Ortalama", "Zayıf", "Çok kötü"],
  },
  // Phase 2 — Problem Deepening
  {
    id: "impactFrequency",
    question: "Sabahları dinlenmiş uyanamamak seni ne kadar etkiliyor?",
    phase: 2,
    options: ["Hiç etkilemiyor", "Bazen", "Sık sık", "Her gün"],
  },
  {
    id: "impactArea",
    question: "Uyku bozulduğunda en çok ne etkileniyor?",
    phase: 2,
    options: ["Enerjim", "Odaklanmam", "Ruh halim", "Hepsi"],
  },
  {
    id: "caffeine",
    question: "Gün içinde kafein tüketiminiz?",
    subtext: "Kahve, çay, enerji içeceği dahil.",
    phase: 2,
    options: ["Hiç", "1 fincan", "2–3 fincan", "4+"],
  },
  {
    id: "emptyBattery",
    question: "Gün içinde kendini \"boş pil\" gibi hissediyor musun?",
    phase: 2,
    options: ["Nadiren", "Bazen", "Sık sık", "Her gün"],
  },
  {
    id: "afternoonCrash",
    question: "Öğleden sonra enerji düşüşü yaşar mısın?",
    phase: 2,
    options: ["Hayır", "Bazen", "Çoğu gün", "Her gün"],
  },
  // Phase 3 — Identity & Aspiration
  {
    id: "energeticPeople",
    question: "Sence sınırsız enerjiye sahip insanlar neyi farklı yapıyor?",
    phase: 3,
    options: ["Daha erken uyuyorlar", "Daha disiplinliler", "Daha az stresli", "Bilmiyorum"],
  },
  {
    id: "extraTwoHours",
    question: "Günde ekstra 2 saatin olsa ne yapardın?",
    phase: 3,
    options: ["Spor", "Kendime zaman", "İş / üretim", "Aile / sosyal hayat"],
  },
  {
    id: "sleepLimitsPotential",
    question: "Uyku düzenin potansiyelini sınırlıyor mu?",
    phase: 3,
    options: ["Hayır", "Biraz", "Evet", "Kesinlikle"],
  },
  {
    id: "sleepTrust",
    question: "Uyku konusunda en çok kime güvenirsin?",
    phase: 3,
    options: ["Doktorlar", "Bilim insanları", "Sporcular", "Deneyimleyen insanlar"],
  },
  {
    id: "idealMorning",
    question: "İdeal sabahın nasıl olurdu?",
    phase: 3,
    options: ["Enerjik", "Sakin", "Üretken", "Odaklı"],
  },
  // Phase 4 — Commitment
  {
    id: "triedBefore",
    question: "Daha önce uyku problemini çözmek için bir şey denedin mi?",
    phase: 4,
    options: ["Hayır", "Birkaç şey", "Çok şey", "Her şeyi denedim"],
  },
  {
    id: "whyPostpone",
    question: "Uykunu düzeltmeyi neden erteliyorsun?",
    phase: 4,
    options: [
      "Zaman yok",
      "Disiplin zor",
      "Nereden başlayacağımı bilmiyorum",
      "Ertelemiyorum",
    ],
  },
  {
    id: "commitment",
    question: "Daha iyi uyku için ne kadar kararlısın?",
    phase: 4,
    options: ["Biraz", "Kararlıyım", "Çok kararlıyım", "Acil çözmem lazım"],
  },
  {
    id: "wouldApplyPlan",
    question: "Sana özel bir plan olsa uygular mıydın?",
    phase: 4,
    options: ["Hayır", "Belki", "Büyük ihtimalle", "Kesinlikle"],
  },
  // Phase 5 — Loss Aversion
  {
    id: "wouldLose",
    question: "Uyku problemin devam ederse en çok ne kaybedersin?",
    phase: 5,
    options: ["Enerjimi", "Sağlığımı", "Performansımı", "Hepsini"],
  },
  {
    id: "biggestFear",
    question: "En büyük korkun nedir?",
    phase: 5,
    options: [
      "Kronik yorgunluk",
      "Sağlık sorunları",
      "Performans düşüşü",
      "Yaşam kalitesinin azalması",
    ],
  },
];

const PHASE_TRANSITIONS: Record<number, { from: Phase; to: Phase }> = {
  5: { from: PHASES[1], to: PHASES[2] },
  10: { from: PHASES[2], to: PHASES[3] },
  15: { from: PHASES[3], to: PHASES[4] },
  19: { from: PHASES[4], to: PHASES[5] },
};

// ─── Phase Transition Screen ──────────────────────────────────────────────────
const INSIGHT_LABELS: Record<Insight["type"], string> = {
  quote: "💬 Alıntı",
  fact: "🔬 Bilimsel Gerçek",
  book: "📖 Kitaptan",
};

function PhaseTransition({
  phase,
  onContinue,
}: {
  phase: Phase;
  onContinue: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0A0E1A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 24px",
        zIndex: 100,
        animation: "fadeInUp 0.4s ease forwards",
      }}
    >
      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Phase header */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: phase.insight ? 32 : 40 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(99,102,241,0.3))",
              border: "1px solid rgba(124,58,237,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              marginBottom: 20,
            }}
          >
            {phase.emoji}
          </div>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#F8FAFC",
              margin: "0 0 8px",
              textAlign: "center",
            }}
          >
            {phase.title}
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "#64748B",
              margin: 0,
              textAlign: "center",
            }}
          >
            {phase.subtitle}
          </p>
        </div>

        {/* Insight card */}
        {phase.insight && (
          <div
            style={{
              background: "rgba(124,58,237,0.08)",
              border: "1px solid rgba(124,58,237,0.2)",
              borderRadius: 16,
              padding: "20px 22px",
              marginBottom: 32,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#7C3AED",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                display: "block",
                marginBottom: 12,
              }}
            >
              {INSIGHT_LABELS[phase.insight.type]}
            </span>
            <p
              style={{
                fontSize: 15,
                color: "#CBD5E1",
                lineHeight: 1.65,
                margin: "0 0 12px",
              }}
            >
              {phase.insight.text}
            </p>
            <span
              style={{
                fontSize: 12,
                color: "#475569",
                fontStyle: "italic",
              }}
            >
              {phase.insight.source}
            </span>
          </div>
        )}

        <button
          className="btn-primary"
          style={{ fontSize: 16 }}
          onClick={onContinue}
        >
          Devam Et →
        </button>
      </div>
    </div>
  );
}

// ─── Main Quiz ─────────────────────────────────────────────────────────────────
export default function QuizPage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [showTransition, setShowTransition] = useState<Phase | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const question = QUESTIONS[currentQ];
  const progress = (currentQ / QUESTIONS.length) * 100;
  const currentAnswer = answers[question.id];

  function handleAnswer(value: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }

  function handleBack() {
    if (currentQ > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQ(currentQ - 1);
        setIsTransitioning(false);
      }, 200);
    } else {
      router.push("/");
    }
  }

  function handleNext() {
    if (!currentAnswer) return;

    const nextIndex = currentQ + 1;

    // Check if next question starts a new phase
    if (nextIndex < QUESTIONS.length && PHASE_TRANSITIONS[nextIndex]) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQ(nextIndex);
        setShowTransition(PHASE_TRANSITIONS[nextIndex].to);
        setIsTransitioning(false);
      }, 200);
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => {
      if (nextIndex >= QUESTIONS.length) {
        // Done — save and navigate
        const finalAnswers = answers as QuizAnswers;
        localStorage.setItem("sleepiq_answers", JSON.stringify(finalAnswers));
        router.push("/results");
      } else {
        setCurrentQ(nextIndex);
        setIsTransitioning(false);
      }
    }, 200);
  }

  if (showTransition) {
    return (
      <PhaseTransition
        phase={showTransition}
        onContinue={() => setShowTransition(null)}
      />
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px 16px 48px",
        position: "relative",
      }}
    >
      <div
        style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 10 }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <button
            onClick={handleBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              color: "#64748B",
              fontSize: 14,
              cursor: "pointer",
              padding: "4px 0",
            }}
          >
            ← Geri
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18 }}>🌙</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#F8FAFC" }}>
              SleepIQ
            </span>
          </div>
          <span style={{ fontSize: 13, color: "#64748B" }}>
            {currentQ + 1} / {QUESTIONS.length}
          </span>
        </div>

        {/* Two-tier progress: phase (top) + question (bottom) */}
        <div style={{ marginBottom: 12 }}>
          {/* Phase-level bar */}
          <div style={{ display: "flex", gap: 4, marginBottom: 3 }}>
            {PHASES.slice(1).map((ph) => {
              const phaseQuestions = QUESTIONS.filter((q) => q.phase === ph.id);
              const isActive = question.phase === ph.id;
              const isDone = phaseQuestions.every((q) => answers[q.id] !== undefined);
              return (
                <div
                  key={ph.id}
                  style={{
                    flex: phaseQuestions.length,
                    height: 5,
                    borderRadius: 3,
                    background: isDone
                      ? "linear-gradient(90deg, #7C3AED, #818CF8)"
                      : isActive
                      ? "rgba(124,58,237,0.45)"
                      : "rgba(255,255,255,0.07)",
                    transition: "all 0.3s ease",
                  }}
                />
              );
            })}
          </div>
          {/* Question-level bar */}
          <div style={{ display: "flex", gap: 4 }}>
            {PHASES.slice(1).map((ph) => {
              const phaseQuestions = QUESTIONS.filter((q) => q.phase === ph.id);
              const isActive = question.phase === ph.id;
              return (
                <div
                  key={ph.id}
                  style={{ flex: phaseQuestions.length, display: "flex", gap: 2 }}
                >
                  {phaseQuestions.map((q) => {
                    const isAnswered = answers[q.id] !== undefined;
                    const isCurrent = q.id === question.id;
                    return (
                      <div
                        key={q.id}
                        style={{
                          flex: 1,
                          height: 2,
                          borderRadius: 1,
                          background: isAnswered
                            ? "linear-gradient(90deg, #7C3AED, #818CF8)"
                            : isCurrent
                            ? "rgba(124,58,237,0.6)"
                            : isActive
                            ? "rgba(124,58,237,0.15)"
                            : "rgba(255,255,255,0.04)",
                          transition: "all 0.25s ease",
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Phase label */}
        <div style={{ marginBottom: 28 }}>
          <span
            style={{
              fontSize: 12,
              color: "#7C3AED",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {PHASES.find((p) => p.id === question.phase)?.title}
          </span>
        </div>

        {/* Question */}
        <div
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? "translateY(-8px)" : "translateY(0)",
            transition: "all 0.2s ease",
          }}
        >
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#F8FAFC",
              margin: "0 0 8px",
              lineHeight: 1.35,
            }}
          >
            {question.question}
          </h2>
          {question.subtext && (
            <p style={{ fontSize: 14, color: "#64748B", margin: "0 0 24px" }}>
              {question.subtext}
            </p>
          )}
          {!question.subtext && <div style={{ marginBottom: 24 }} />}

          {/* Options */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginBottom: 32,
            }}
          >
            {question.options.map((opt, i) => {
              const selected = currentAnswer === opt;
              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "16px 18px",
                    borderRadius: 14,
                    border: `1px solid ${selected ? "#7C3AED" : "rgba(255,255,255,0.08)"}`,
                    background: selected
                      ? "rgba(124, 58, 237, 0.15)"
                      : "rgba(255,255,255,0.03)",
                    color: selected ? "#A78BFA" : "#CBD5E1",
                    fontSize: 15,
                    fontWeight: selected ? 600 : 400,
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      border: `2px solid ${selected ? "#7C3AED" : "rgba(255,255,255,0.2)"}`,
                      background: selected ? "#7C3AED" : "transparent",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      color: "white",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {selected ? "✓" : ""}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Next */}
          <button
            className="btn-primary"
            onClick={handleNext}
            disabled={!currentAnswer}
            style={{
              opacity: currentAnswer ? 1 : 0.4,
              cursor: currentAnswer ? "pointer" : "not-allowed",
            }}
          >
            {currentQ < QUESTIONS.length - 1
              ? "Devam Et →"
              : "Sonuçlarımı Göster →"}
          </button>
        </div>
      </div>
    </main>
  );
}
