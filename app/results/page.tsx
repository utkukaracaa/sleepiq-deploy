"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  calculateSleepResult,
  SleepResult,
  SLEEP_TYPES,
  QuizAnswers,
} from "@/lib/sleepLogic";

// ─── Loading ──────────────────────────────────────────────────────────────────
const LOADING_STEPS = [
  "Uyku verilerin analiz ediliyor...",
  "Sirkadiyen ritmin hesaplanıyor...",
  "Uyku tipin belirleniyor...",
  "Kişisel plan oluşturuluyor...",
];

function LoadingScreen() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setStep((s) => (s < LOADING_STEPS.length - 1 ? s + 1 : s));
    }, 750);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        padding: 24,
      }}
    >
      <div style={{ position: "relative", width: 80, height: 80 }}>
        <div
          className="spin-slow"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "3px solid transparent",
            borderTopColor: "#7C3AED",
            borderRightColor: "#818CF8",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 12,
            background: "rgba(124,58,237,0.1)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
          }}
        >
          🌙
        </div>
      </div>
      <div style={{ textAlign: "center", maxWidth: 280 }}>
        <p
          style={{
            fontSize: 17,
            fontWeight: 600,
            color: "#F8FAFC",
            margin: "0 0 16px",
          }}
        >
          {LOADING_STEPS[step]}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
          {LOADING_STEPS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i <= step ? 24 : 6,
                height: 6,
                borderRadius: 3,
                background:
                  i <= step
                    ? "linear-gradient(90deg, #7C3AED, #818CF8)"
                    : "rgba(255,255,255,0.1)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Score Circle ─────────────────────────────────────────────────────────────
function ScoreCircle({ score }: { score: number }) {
  const [displayed, setDisplayed] = useState(0);
  const r = 45;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    let n = 0;
    const t = setInterval(() => {
      n += 2;
      if (n >= score) { setDisplayed(score); clearInterval(t); }
      else setDisplayed(n);
    }, 18);
    return () => clearInterval(t);
  }, [score]);

  const color = score >= 75 ? "#34D399" : score >= 50 ? "#FBBF24" : "#F87171";
  const offset = circ - (displayed / 100) * circ;

  return (
    <div style={{ position: "relative", width: 110, height: 110 }}>
      <svg width={110} height={110} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={55} cy={55} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={7} />
        <circle
          cx={55} cy={55} r={r} fill="none" stroke={color}
          strokeWidth={7} strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.04s linear" }}
        />
      </svg>
      <div
        style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 26, fontWeight: 800, color, lineHeight: 1 }}>{displayed}</span>
        <span style={{ fontSize: 10, color: "#64748B", marginTop: 2 }}>/ 100</span>
      </div>
    </div>
  );
}

// ─── Personalized CTA copy ────────────────────────────────────────────────────
function ctaCopy(result: SleepResult): { headline: string; sub: string } {
  const goalMap: Record<string, string> = {
    Spor: "antrenman performansını",
    "Kendime zaman": "kişisel zamanını",
    "İş / üretim": "üretkenliğini",
    "Aile / sosyal hayat": "sosyal enerjini",
  };
  const morningMap: Record<string, string> = {
    Enerjik: "enerjik",
    Sakin: "sakin ve dingin",
    Üretken: "üretken",
    Odaklı: "odaklı",
  };
  const fearMap: Record<string, string> = {
    "Kronik yorgunluk": "kronik yorgunluğu",
    "Sağlık sorunları": "uzun vadeli sağlık risklerini",
    "Performans düşüşü": "performans kaybını",
    "Yaşam kalitesinin azalması": "yaşam kalitesi kaybını",
  };
  const urgencyMap: Record<string, string> = {
    Biraz: "Küçük bir adım at",
    Kararlıyım: "Planını başlat",
    "Çok kararlıyım": "Bugün başla",
    "Acil çözmem lazım": "Şimdi harekete geç",
  };

  const goal = goalMap[result.extraTwoHoursGoal] ?? "potansiyelini";
  const morning = morningMap[result.idealMorning] ?? "dinlenmiş";
  const fear = fearMap[result.biggestFear] ?? "uyku problemlerini";
  const urgency = urgencyMap[result.commitmentLevel] ?? "Başla";

  return {
    headline: `${urgency} — ${fear} önle`,
    sub: `${goal} geri kazan. Her sabah ${morning} uyan.`,
  };
}

// ─── Main Results Page ────────────────────────────────────────────────────────
export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<SleepResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("sleepiq_answers");
    if (!stored) { router.push("/quiz"); return; }
    const answers: QuizAnswers = JSON.parse(stored);
    const res = calculateSleepResult(answers);
    setTimeout(() => { setResult(res); setLoading(false); }, 3400);
  }, [router]);

  if (!mounted) return null;
  if (loading) return <LoadingScreen />;
  if (!result) return null;

  const typeInfo = SLEEP_TYPES[result.sleepType];
  const ageDiff = result.sleepAge - result.realAge;
  const isOlder = ageDiff > 0;
  const cta = ctaCopy(result);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "24px 16px 60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 10 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
          <span style={{ fontSize: 18 }}>🌙</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#F8FAFC" }}>SleepIQ</span>
          <div
            style={{
              marginLeft: "auto", padding: "4px 10px",
              background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)",
              borderRadius: 100, fontSize: 12, color: "#34D399", fontWeight: 500,
            }}
          >
            ✓ Analiz tamamlandı
          </div>
        </div>

        {/* Sleep Age — Hero card */}
        <div
          className="fade-in-up glass"
          style={{
            borderRadius: 20, padding: "28px 24px", marginBottom: 14, textAlign: "center",
            border: "1px solid rgba(124,58,237,0.25)", background: "rgba(124,58,237,0.04)",
          }}
        >
          <p style={{ fontSize: 13, color: "#94A3B8", margin: "0 0 6px" }}>
            Senin uyku yaşın
          </p>
          <div
            className="gradient-text"
            style={{ fontSize: 76, fontWeight: 800, lineHeight: 1, margin: "0 0 10px" }}
          >
            {result.sleepAge}
          </div>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "6px 14px",
              background: isOlder ? "rgba(248,113,113,0.1)" : "rgba(52,211,153,0.1)",
              border: `1px solid ${isOlder ? "rgba(248,113,113,0.3)" : "rgba(52,211,153,0.3)"}`,
              borderRadius: 100, fontSize: 13,
              color: isOlder ? "#F87171" : "#34D399", fontWeight: 600,
            }}
          >
            {isOlder ? "▲" : "▼"} Gerçek yaşından {Math.abs(ageDiff)} yıl{" "}
            {isOlder ? "büyük" : "küçük"} görünüyor
          </div>
        </div>

        {/* Type + Score row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div
            className="fade-in-up glass"
            style={{
              borderRadius: 16, padding: 20,
              border: `1px solid ${typeInfo.color}22`,
              animationDelay: "0.1s",
            }}
          >
            <div style={{ fontSize: 30, marginBottom: 10 }}>{typeInfo.emoji}</div>
            <p style={{ fontSize: 11, color: "#64748B", margin: "0 0 4px" }}>Uyku tipin</p>
            <p style={{ fontSize: 15, fontWeight: 700, color: typeInfo.color, margin: 0 }}>
              {typeInfo.label}
            </p>
          </div>
          <div
            className="fade-in-up glass"
            style={{
              borderRadius: 16, padding: 20, animationDelay: "0.15s",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            }}
          >
            <ScoreCircle score={result.sleepScore} />
            <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>Uyku skoru</p>
          </div>
        </div>

        {/* Primary Issue */}
        <div
          className="fade-in-up glass"
          style={{
            borderRadius: 16, padding: 20, marginBottom: 14,
            animationDelay: "0.2s", borderLeft: "3px solid #F87171",
          }}
        >
          <p style={{ fontSize: 11, color: "#64748B", margin: "0 0 6px" }}>En kritik sorunun</p>
          <p style={{ fontSize: 15, fontWeight: 600, color: "#F87171", margin: "0 0 8px" }}>
            {result.primaryIssue}
          </p>
          <p style={{ fontSize: 14, color: "#94A3B8", margin: 0, lineHeight: 1.55 }}>
            {typeInfo.shortDesc}
          </p>
        </div>

        {/* Locked Plan Preview */}
        <div
          className="fade-in-up"
          style={{
            borderRadius: 16, marginBottom: 14, position: "relative",
            overflow: "hidden", animationDelay: "0.25s",
          }}
        >
          <div
            className="glass"
            style={{
              padding: 20, borderRadius: 16,
              filter: unlocked ? "none" : "blur(5px)",
              transition: "filter 0.35s ease",
            }}
          >
            <p style={{ fontSize: 11, color: "#64748B", margin: "0 0 6px" }}>
              Kişisel önerin
            </p>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#A78BFA", margin: "0 0 10px" }}>
              Bu gece yapman gereken tek şey:
            </p>
            {result.sleepType === "stress" && (
              <p style={{ fontSize: 14, color: "#CBD5E1", margin: 0, lineHeight: 1.6 }}>
                Yatmadan 90 dakika önce ekranları kapat. 4-7-8 nefes tekniğini
                uygula: 4 saniye içeri, 7 saniye tut, 8 saniye dışarı. 3 tur yeterli.
              </p>
            )}
            {result.sleepType === "fragmented" && (
              <p style={{ fontSize: 14, color: "#CBD5E1", margin: 0, lineHeight: 1.6 }}>
                Bu gece yatmadan önce 300mg magnezyum glisinat al. Odanın
                sıcaklığını 18–19°C'ye getir. Derin uyku süresi %40'a kadar artabilir.
              </p>
            )}
            {result.sleepType === "night-owl" && (
              <p style={{ fontSize: 14, color: "#CBD5E1", margin: 0, lineHeight: 1.6 }}>
                Bu gece normal uyku saatinden 15 dakika önce yat. Her gün 15 dakika
                kaydır. 21 günde sirkadiyen ritmin sıfırlanır.
              </p>
            )}
            {result.sleepType === "recovery-deprived" && (
              <p style={{ fontSize: 14, color: "#CBD5E1", margin: 0, lineHeight: 1.6 }}>
                Bu hafta sonu 1 saat fazla uyu. Kronik uyku borcu ancak tutarlı
                geri ödemeyle kapanır — tek seferlik uyku işe yaramaz.
              </p>
            )}
            {result.sleepType === "balanced" && (
              <p style={{ fontSize: 14, color: "#CBD5E1", margin: 0, lineHeight: 1.6 }}>
                Sabah uyandıktan sonraki 30 dakika içinde 10 dakika doğal ışığa
                çık. Bu tek alışkanlık kortizol ritmini optimize eder.
              </p>
            )}
          </div>

          {!unlocked && (
            <div
              style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                background: "rgba(10,14,26,0.2)", borderRadius: 16, gap: 8,
              }}
            >
              <div style={{ fontSize: 28 }}>🔒</div>
              <p style={{ fontSize: 13, color: "#94A3B8", margin: 0, fontWeight: 500 }}>
                Planını görmek için kayıt ol
              </p>
            </div>
          )}
        </div>

        {/* What's in the plan */}
        {!unlocked && (
          <div
            className="fade-in-up glass"
            style={{ borderRadius: 16, padding: 20, marginBottom: 24, animationDelay: "0.3s" }}
          >
            <p
              style={{
                fontSize: 11, fontWeight: 700, color: "#64748B",
                margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.06em",
              }}
            >
              Kişisel planında neler var?
            </p>
            {[
              { icon: "📊", text: "21 Günlük Recovery Programı" },
              { icon: "⏰", text: "Kişisel uyku–uyanma saatlerin" },
              { icon: "🎯", text: "Günlük uyku görevleri" },
              { icon: "💊", text: "Takviye & beslenme önerileri" },
              { icon: "📈", text: "Haftalık ilerleme takibi" },
            ].map((item, i) => (
              <div
                key={item.text}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 0",
                  borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
              >
                <span style={{ fontSize: 17 }}>{item.icon}</span>
                <span style={{ fontSize: 14, color: "#94A3B8", flex: 1 }}>{item.text}</span>
                <span style={{ fontSize: 12, color: "#475569" }}>🔒</span>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="fade-in-up" style={{ animationDelay: "0.35s" }}>
          {/* Personalized urgency banner */}
          <div
            style={{
              padding: "12px 16px",
              background: "rgba(251,146,60,0.08)",
              border: "1px solid rgba(251,146,60,0.2)",
              borderRadius: 12,
              marginBottom: 14,
              fontSize: 13,
              color: "#FB923C",
              lineHeight: 1.5,
            }}
          >
            <strong>{cta.headline}.</strong> {cta.sub}
          </div>

          <button
            className="btn-primary"
            style={{ fontSize: 17, padding: "18px 32px", marginBottom: 10 }}
            onClick={() => {
              setUnlocked(true);
              setTimeout(
                () => window.scrollTo({ top: 0, behavior: "smooth" }),
                100
              );
            }}
          >
            Ücretsiz Başla — 7 Gün Dene →
          </button>

          <button
            onClick={() => router.push("/")}
            style={{
              width: "100%", padding: "12px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14, color: "#64748B", fontSize: 14, cursor: "pointer",
            }}
          >
            Ana sayfaya dön
          </button>

          <p
            style={{
              textAlign: "center", fontSize: 12,
              color: "#475569", marginTop: 12,
            }}
          >
            Kredi kartı gerekmez · İstediğin zaman iptal et
          </p>
        </div>
      </div>
    </main>
  );
}
