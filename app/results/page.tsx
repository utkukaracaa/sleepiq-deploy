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

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatTime(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const PLANS = [
  {
    id: "1ay",
    label: "1 Ay",
    originalPrice: "₺399",
    price: "₺299",
    perDay: "₺9,97/gün",
    discount: "%25 İndirim",
    popular: false,
  },
  {
    id: "3ay",
    label: "3 Ay",
    originalPrice: "₺999",
    price: "₺729",
    perDay: "₺8,10/gün",
    discount: "%27 İndirim",
    popular: true,
  },
  {
    id: "6ay",
    label: "6 Ay",
    originalPrice: "₺1.999",
    price: "₺1.438",
    perDay: "₺7,99/gün",
    discount: "%28 İndirim",
    popular: false,
  },
] as const;

type PlanId = "1ay" | "3ay" | "6ay";

// ─── Plan Selector ────────────────────────────────────────────────────────────
function PlanSelector({
  selectedPlan,
  onSelect,
}: {
  selectedPlan: PlanId;
  onSelect: (id: PlanId) => void;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <p
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "#1E293B",
          margin: "0 0 10px",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        Planınızı seçin
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {PLANS.map((plan) => {
          const selected = selectedPlan === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => onSelect(plan.id as PlanId)}
              style={{
                border: selected
                  ? "2px solid #2563EB"
                  : "1.5px solid #EDE8F5",
                borderRadius: 14,
                overflow: "hidden",
                cursor: "pointer",
                background: "#FFFFFF",
                transition: "border-color 0.2s",
              }}
            >
              {plan.popular && (
                <div
                  style={{
                    background: "#2563EB",
                    color: "#FFFFFF",
                    fontSize: 11,
                    fontWeight: 700,
                    textAlign: "center",
                    padding: "4px 0",
                    letterSpacing: "0.04em",
                  }}
                >
                  EN POPÜLER
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 16px",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: selected ? "6px solid #2563EB" : "2px solid #CBD5E1",
                    flexShrink: 0,
                    transition: "border 0.2s",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#1E293B",
                      marginBottom: 2,
                    }}
                  >
                    {plan.label}
                  </div>
                  <div style={{ fontSize: 12, color: "#64748B" }}>
                    <span
                      style={{
                        textDecoration: "line-through",
                        marginRight: 4,
                      }}
                    >
                      {plan.originalPrice}
                    </span>
                    <span style={{ color: "#1E293B", fontWeight: 600 }}>
                      {plan.price} toplam
                    </span>
                    {" · "}
                    {plan.perDay}
                  </div>
                </div>
                <div
                  style={{
                    background: "#FFF7ED",
                    color: "#F97316",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 8px",
                    borderRadius: 8,
                    whiteSpace: "nowrap",
                  }}
                >
                  {plan.discount}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Payment Footer ───────────────────────────────────────────────────────────
function PaymentFooter({ finePrint = false }: { finePrint?: boolean }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          fontSize: 12,
          color: "#64748B",
          marginBottom: finePrint ? 8 : 0,
        }}
      >
        <span>🛡️</span>
        <span>Güvenle ödeyin:</span>
        <span style={{ color: "#94A3B8" }}>
          PayPal · GPay · Apple Pay · Visa · Mastercard
        </span>
      </div>
      {finePrint && (
        <p style={{ fontSize: 11, color: "#94A3B8", margin: 0 }}>
          Aboneliğiniz seçilen dönem sonunda otomatik olarak yenilenir.
        </p>
      )}
    </div>
  );
}

// ─── Main Results Page ────────────────────────────────────────────────────────
export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<SleepResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Paywall state
  const [offerActive, setOfferActive] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("3ay");
  const [countdown, setCountdown] = useState(894); // 14:54
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("sleepiq_answers");
    if (!stored) {
      router.push("/quiz");
      return;
    }
    const answers: QuizAnswers = JSON.parse(stored);
    const res = calculateSleepResult(answers);
    setTimeout(() => {
      setResult(res);
      setLoading(false);
    }, 3400);
  }, [router]);

  useEffect(() => {
    if (loading) return;
    const t = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, [loading]);

  if (!mounted) return null;
  if (loading) return <LoadingScreen />;
  if (!result) return null;

  const typeInfo = SLEEP_TYPES[result.sleepType];
  const ageDiff = result.sleepAge - result.realAge;
  const isOlder = ageDiff > 0;

  const handleCta = () => {
    router.push("/payment");
  };

  const faqs = [
    {
      q: "SleepIQ planı nasıl çalışır?",
      a: "Quiz sonuçlarına göre uyku tipine özel 21 günlük program hazırlanır. Her gün küçük, bilimsel görevler gelir.",
    },
    {
      q: "Sonuçları ne zaman görmeye başlarım?",
      a: "Kullanıcıların %78'i ilk 7 günde belirgin fark hissediyor. Tam dönüşüm 21 günde tamamlanıyor.",
    },
    {
      q: "Aboneliğimi nasıl iptal ederim?",
      a: "İstediğin zaman, tek tıkla iptal edebilirsin. Taahhüt yok, ceza yok.",
    },
    {
      q: "Ödeme güvenli mi?",
      a: "256-bit SSL şifreleme kullanıyoruz. Kart bilgilerin asla sunucularımızda saklanmaz.",
    },
    {
      q: "Mobil uygulaması var mı?",
      a: "iOS ve Android uygulamaları mevcut. Kayıt sonrası erişim bilgileri e-postana gelir.",
    },
  ];

  const testimonials = [
    {
      name: "Ayşe K.",
      initials: "AK",
      avatarBg: "linear-gradient(135deg, #7C3AED, #EC4899)",
      text: "3 haftada sabahları tamamen farklı hissediyorum. Artık alarm çalmadan uyanıyorum.",
    },
    {
      name: "Mehmet T.",
      initials: "MT",
      avatarBg: "linear-gradient(135deg, #2563EB, #38BDF8)",
      text: "Gece 3'te uyanıp saatlerce uyuyamadığım günler geride kaldı. Plan gerçekten işe yarıyor.",
    },
    {
      name: "Selin A.",
      initials: "SA",
      avatarBg: "linear-gradient(135deg, #EC4899, #F97316)",
      text: "İş performansım gözle görülür şekilde arttı. Odaklanma sürem neredeyse iki katına çıktı.",
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FFF6F0",
        color: "#1E293B",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── 1. HEADER ─────────────────────────────────────────────────────── */}
      <div
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #EDE8F5",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#1E293B" }}>
            sleep
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              background: "linear-gradient(135deg, #7C3AED, #EC4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            IQ
          </span>
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "#DCFCE7",
            border: "1px solid #BBF7D0",
            borderRadius: 100,
            padding: "5px 12px",
            fontSize: 12,
            fontWeight: 600,
            color: "#16A34A",
          }}
        >
          <span>✓</span>
          <span>Analiz tamamlandı</span>
        </div>
      </div>

      {/* ── PAGE CONTENT ──────────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
          padding: "0 16px 80px",
        }}
      >
        {/* ── 2. RESULT SUMMARY ───────────────────────────────────────────── */}
        <div style={{ paddingTop: 24 }}>
          {/* Sleep Age Hero */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #EDE8F5",
              borderRadius: 20,
              padding: "28px 24px",
              marginBottom: 14,
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: 13,
                color: "#64748B",
                margin: "0 0 4px",
                fontWeight: 500,
              }}
            >
              Senin uyku yaşın:
            </p>
            <div
              style={{
                fontSize: 80,
                fontWeight: 800,
                lineHeight: 1,
                background: "linear-gradient(135deg, #7C3AED, #EC4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                margin: "4px 0 12px",
              }}
            >
              {result.sleepAge}
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 16px",
                background: isOlder ? "#FEF2F2" : "#F0FDF4",
                border: `1px solid ${isOlder ? "#FECACA" : "#BBF7D0"}`,
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 600,
                color: isOlder ? "#DC2626" : "#16A34A",
              }}
            >
              {isOlder ? "▲" : "▼"} {Math.abs(ageDiff)} yıl{" "}
              {isOlder ? "büyük" : "küçük"} görünüyor
            </div>
          </div>

          {/* Sleep Type + Score row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 14,
            }}
          >
            {/* Type chip */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #EDE8F5",
                borderRadius: 16,
                padding: "18px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 32 }}>{typeInfo.emoji}</span>
              <p style={{ fontSize: 11, color: "#64748B", margin: 0 }}>
                Uyku tipin
              </p>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: typeInfo.color,
                  margin: 0,
                }}
              >
                {typeInfo.label}
              </p>
            </div>
            {/* Score chip */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #EDE8F5",
                borderRadius: 16,
                padding: "18px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 800,
                  background:
                    result.sleepScore >= 75
                      ? "linear-gradient(135deg, #16A34A, #34D399)"
                      : result.sleepScore >= 50
                      ? "linear-gradient(135deg, #D97706, #FBBF24)"
                      : "linear-gradient(135deg, #DC2626, #F87171)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1,
                }}
              >
                {result.sleepScore}
              </div>
              <p style={{ fontSize: 11, color: "#64748B", margin: 0 }}>
                / 100 uyku skoru
              </p>
            </div>
          </div>

          {/* Primary Issue card */}
          <div
            style={{
              background: "#FFFFFF",
              border: "1.5px solid #EDE8F5",
              borderLeft: "4px solid #F97316",
              borderRadius: 16,
              padding: "18px 18px",
              marginBottom: 14,
            }}
          >
            <p
              style={{
                fontSize: 11,
                color: "#64748B",
                margin: "0 0 6px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontWeight: 600,
              }}
            >
              Birincil sorunun
            </p>
            <p
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#DC2626",
                margin: "0 0 8px",
                lineHeight: 1.4,
              }}
            >
              {result.primaryIssue}
            </p>
            <p
              style={{
                fontSize: 13,
                color: "#64748B",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {typeInfo.shortDesc}
            </p>
          </div>

          {/* Promise box */}
          <div
            style={{
              background: "#EFF6FF",
              border: "1.5px solid #BFDBFE",
              borderRadius: 16,
              padding: "16px 18px",
              marginBottom: 28,
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
            }}
          >
            <span style={{ fontSize: 20, flexShrink: 0 }}>💡</span>
            <p
              style={{
                fontSize: 14,
                color: "#1E40AF",
                margin: 0,
                lineHeight: 1.6,
                fontWeight: 500,
              }}
            >
              <strong>İyi haber:</strong> Bu tablo 21 günde tamamen değişebilir.
              Kişisel planın seni bekliyor.
            </p>
          </div>
        </div>

        {/* ── 3. TOP PAYWALL ──────────────────────────────────────────────── */}
        {offerActive && (
          <div style={{ marginBottom: 32 }}>
            {/* Offer banner */}
            <div
              style={{
                background: "#F97316",
                borderRadius: "16px 16px 0 0",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF", flex: 1 }}>
                %27 indirim sizin için ayrıldı:{" "}
                <span
                  style={{
                    fontVariantNumeric: "tabular-nums",
                    background: "rgba(0,0,0,0.18)",
                    padding: "2px 8px",
                    borderRadius: 6,
                  }}
                >
                  {formatTime(countdown)}
                </span>
              </span>
              <button
                onClick={() => setOfferActive(false)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  color: "#FFFFFF",
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  padding: 0,
                }}
                aria-label="Kapat"
              >
                ×
              </button>
            </div>

            {/* Main paywall card */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #EDE8F5",
                borderTop: "none",
                borderRadius: "0 0 20px 20px",
                padding: "20px 18px",
              }}
            >
              {/* Discount code box */}
              <div
                style={{
                  background: "#FFF7ED",
                  border: "1.5px solid #FED7AA",
                  borderRadius: 12,
                  padding: "12px 14px",
                  marginBottom: 18,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#F97316",
                      fontWeight: 700,
                      marginBottom: 2,
                    }}
                  >
                    🏷️ İndirim kodunuz uygulandı!
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: "#1E293B",
                      letterSpacing: "0.06em",
                    }}
                  >
                    UYKU_10_2026
                  </div>
                </div>
                <div
                  style={{
                    background: "#F97316",
                    color: "#FFFFFF",
                    fontSize: 13,
                    fontWeight: 800,
                    padding: "6px 10px",
                    borderRadius: 8,
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatTime(countdown)}
                </div>
              </div>

              {/* Plan selector */}
              <PlanSelector
                selectedPlan={selectedPlan}
                onSelect={setSelectedPlan}
              />

              {/* CTA button */}
              <button
                onClick={handleCta}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: "#2563EB",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: 14,
                  fontSize: 17,
                  fontWeight: 700,
                  cursor: "pointer",
                  marginBottom: 12,
                  letterSpacing: "0.01em",
                }}
              >
                Devam et →
              </button>

              {/* Payment icons */}
              <PaymentFooter />
            </div>
          </div>
        )}

        {/* ── 4. COMMUNITY SOCIAL PROOF ───────────────────────────────────── */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1.5px solid #EDE8F5",
            borderRadius: 20,
            padding: "22px 18px",
            marginBottom: 24,
          }}
        >
          <h3
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#1E293B",
              margin: "0 0 4px",
            }}
          >
            SleepIQ topluluğuna katılın
          </h3>
          <p
            style={{
              fontSize: 13,
              color: "#64748B",
              margin: "0 0 16px",
            }}
          >
            12.847 kişi SleepIQ&apos;yu tercih ediyor
          </p>

          {/* Comparison boxes */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                background: "#F8FAFC",
                border: "1.5px solid #E2E8F0",
                borderRadius: 12,
                padding: "14px 12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 6 }}>😴</div>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#475569",
                  margin: "0 0 4px",
                }}
              >
                Kendi başına denemen
              </p>
              <p style={{ fontSize: 12, color: "#94A3B8", margin: 0 }}>
                aylarca sürer
              </p>
            </div>
            <div
              style={{
                background: "#EFF6FF",
                border: "1.5px solid #BFDBFE",
                borderRadius: 12,
                padding: "14px 12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 6 }}>⚡</div>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1E40AF",
                  margin: "0 0 4px",
                }}
              >
                Kişisel planın
              </p>
              <p style={{ fontSize: 12, color: "#3B82F6", margin: 0 }}>
                3 haftada sonuç
              </p>
            </div>
          </div>

          <div
            style={{
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              borderRadius: 10,
              padding: "10px 14px",
              fontSize: 13,
              color: "#16A34A",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            🔴 Son 1 saatte 47 kişi uyku planı oluşturdu
          </div>
        </div>

        {/* ── 5. FEATURES LIST ────────────────────────────────────────────── */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1.5px solid #EDE8F5",
            borderRadius: 20,
            padding: "22px 18px",
            marginBottom: 24,
          }}
        >
          <h3
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#1E293B",
              margin: "0 0 16px",
            }}
          >
            SleepIQ ile neler elde edeceksin?
          </h3>
          {[
            "21 günlük bilimsel uyku programı",
            "Uyku tipine özel günlük görevler",
            "Sabah ve gece rutinleri",
            "Sirkadiyen ritim optimizasyonu",
            "Haftalık ilerleme takibi",
            "Bilimsel kaynaklı içerikler (Walker, Van Dongen)",
          ].map((feature, i, arr) => (
            <div
              key={feature}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 0",
                borderBottom:
                  i < arr.length - 1 ? "1px solid #F1F5F9" : "none",
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  color: "#2563EB",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                ☆
              </span>
              <span style={{ fontSize: 14, color: "#1E293B" }}>{feature}</span>
            </div>
          ))}
        </div>

        {/* ── 6. PROMISES ─────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 24 }}>
          <h3
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#1E293B",
              margin: "0 0 14px",
            }}
          >
            Sana söz veriyoruz
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              {
                icon: "🌙",
                title: "İlk 7 günde fark",
                desc: "Çoğu kullanıcı ilk haftada uykusunun iyileştiğini hissediyor",
              },
              {
                icon: "⚡",
                title: "21 günde tam dönüşüm",
                desc: "Tutarlı uygulama ile sirkadiyen ritmin sıfırlanır",
              },
              {
                icon: "💰",
                title: "30 gün iade garantisi",
                desc: "Memnun kalmazsan, soru sormadan iade",
              },
            ].map((promise) => (
              <div
                key={promise.title}
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #EDE8F5",
                  borderRadius: 16,
                  padding: "16px 18px",
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: 28, flexShrink: 0 }}>
                  {promise.icon}
                </span>
                <div>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#1E293B",
                      margin: "0 0 4px",
                    }}
                  >
                    {promise.title}
                  </p>
                  <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>
                    {promise.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 7. FAQ ──────────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 24 }}>
          <h3
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#1E293B",
              margin: "0 0 14px",
            }}
          >
            Sıkça Sorulan Sorular
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  style={{
                    background: "#FFFFFF",
                    border: `1.5px solid ${isOpen ? "#BFDBFE" : "#EDE8F5"}`,
                    borderRadius: 14,
                    overflow: "hidden",
                    transition: "border-color 0.2s",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{
                      width: "100%",
                      padding: "15px 16px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 10,
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#1E293B",
                        flex: 1,
                      }}
                    >
                      {faq.q}
                    </span>
                    <span
                      style={{
                        fontSize: 18,
                        color: "#64748B",
                        transform: isOpen ? "rotate(45deg)" : "none",
                        transition: "transform 0.2s",
                        flexShrink: 0,
                        lineHeight: 1,
                      }}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: "0 16px 15px",
                        fontSize: 13,
                        color: "#64748B",
                        lineHeight: 1.65,
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 8. TESTIMONIALS ─────────────────────────────────────────────── */}
        <div style={{ marginBottom: 32 }}>
          <h3
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#1E293B",
              margin: "0 0 6px",
            }}
          >
            Herkes SleepIQ&apos;yu seviyor
          </h3>
          <div
            style={{
              display: "flex",
              gap: 14,
              marginBottom: 16,
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                color: "#64748B",
              }}
            >
              <span>App Store</span>
              <span style={{ color: "#F59E0B" }}>⭐</span>
              <span style={{ fontWeight: 700, color: "#1E293B" }}>4.5</span>
            </div>
            <div
              style={{ width: 1, height: 14, background: "#E2E8F0" }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                color: "#64748B",
              }}
            >
              <span>Google Play</span>
              <span style={{ color: "#F59E0B" }}>⭐</span>
              <span style={{ fontWeight: 700, color: "#1E293B" }}>4.6</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {testimonials.map((t) => (
              <div
                key={t.name}
                style={{
                  background: "#FFFFFF",
                  border: "1.5px solid #EDE8F5",
                  borderRadius: 16,
                  padding: "18px 16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: t.avatarBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#FFFFFF",
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#1E293B",
                        margin: "0 0 2px",
                      }}
                    >
                      {t.name}
                    </p>
                    <span style={{ fontSize: 13, color: "#F59E0B" }}>
                      ★★★★★
                    </span>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "#475569",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 9. BOTTOM PAYWALL ───────────────────────────────────────────────── */}
      <div
        style={{
          background: "#1E2533",
          padding: "32px 16px 48px",
        }}
      >
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          {/* Section heading */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#FFFFFF",
                margin: "0 0 6px",
              }}
            >
              Uyku dönüşümüne başla
            </h2>
            <p style={{ fontSize: 14, color: "#94A3B8", margin: 0 }}>
              21 günde fark yaratacak kişisel planını al
            </p>
          </div>

          {/* Plan selector — reuse same state */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: 20,
              padding: "20px 18px",
              marginBottom: 0,
            }}
          >
            <PlanSelector
              selectedPlan={selectedPlan}
              onSelect={setSelectedPlan}
            />

            {/* CTA */}
            <button
              onClick={handleCta}
              style={{
                width: "100%",
                padding: "17px",
                background: "#2563EB",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 14,
                fontSize: 17,
                fontWeight: 700,
                cursor: "pointer",
                marginBottom: 14,
                letterSpacing: "0.01em",
              }}
            >
              Devam et →
            </button>

            <PaymentFooter finePrint={true} />
          </div>
        </div>
      </div>
    </main>
  );
}
