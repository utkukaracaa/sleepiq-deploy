"use client";

import { useState } from "react";

const TIPS = [
  {
    num: 1,
    title: "Kendinizi Profesyonel Bir Uyuyan Olarak Tanımlayın",
    body: "Az uyumayı öven çalışma kültürünü reddedin ve uykuyu hayatınızdaki bir numaralı önceliğiniz haline getirin. Bu sayede kendinizi daha iyi hissedecek, daha iyi görünecek ve hayatınızdaki her şeyi daha kolay hale getireceksiniz.",
    emoji: "🏆",
    tag: "Zihniyet",
    color: "#7C3AED",
  },
  {
    num: 2,
    title: "Tutarlı Bir Uyku Saatine Sahip Olun",
    body: "Vücudunuza her gün aynı saatte uyuduğunuz mesajını vermek için uyku saatini günün en önemli toplantısı gibi düşünün. Geç kalmamaya özen gösterin ve programınızı bu saate göre ayarlayın.",
    emoji: "⏰",
    tag: "Ritim",
    color: "#0891B2",
  },
  {
    num: 3,
    title: "Bir Wind-Down Rutini Oluşturun",
    body: "Yatmadan 30–60 dakika önce günün sorunlarını zihninizden uzaklaştırın. Kitap okumak veya yürüyüş yapmak gibi rahatlatıcı ritüeller edinin; ekranlardan ve sizi strese sokacak aktivitelerden kaçının.",
    emoji: "🌙",
    tag: "Rutin",
    color: "#7C3AED",
  },
  {
    num: 4,
    title: "Erken Saatte Yemek Yiyin",
    body: "Uykunuz üzerinde olumsuz etkiler yaratabilecek büyük ve ağır öğünleri günün son saatlerinde tüketmekten kaçının. Akşam yemeğini daha erken bir saatte yemeyi ve sosyal etkinliklerde hafif yiyecekler seçmeyi deneyin.",
    emoji: "🍽️",
    tag: "Beslenme",
    color: "#059669",
  },
  {
    num: 5,
    title: "Uyarıcılardan Kaçının",
    body: "Uyku kalitenizi düşüren ve derin uykunuzu büyük ölçüde azaltabilen alkol ve kafein tüketimini bırakın veya bunlardan uzak durmaya özen gösterin.",
    emoji: "🚫",
    tag: "Alışkanlık",
    color: "#DC2626",
  },
  {
    num: 6,
    title: "Akşam Saatlerinde Işığı Düzenleyin",
    body: "Mavi ışığı filtreleyen uygulamalar veya gözlükler kullanın, yatak odanızı tamamen karartacak perdeler edinin ve seyahat ediyorsanız uyku maskesi takın. Ekranları dinlenme evresinde hayatınızdan çıkarmak en kritik adımdır.",
    emoji: "💡",
    tag: "Ortam",
    color: "#D97706",
  },
  {
    num: 7,
    title: "İdeal Bir Uyku Sıcaklığı Sağlayın",
    body: "Uykunuzun bölünmemesi için odanın ne çok sıcak ne de çok soğuk olmasını sağlayın. Klima ayarlarınızı, termostatınızı ve yatak takımlarınızı kişisel ihtiyacınıza göre optimize edin.",
    emoji: "🌡️",
    tag: "Ortam",
    color: "#0891B2",
  },
  {
    num: 8,
    title: "Huzurlu Bir Uyku Ortamı Yaratın",
    body: "Ailenizle veya komşularınızla uyku saatlerine saygı gösterilmesi konusunda kurallar belirleyin. Yatak odanızı sadece uyumak için kullanarak vücudunuza doğru mesajı verin.",
    emoji: "🛏️",
    tag: "Ortam",
    color: "#7C3AED",
  },
  {
    num: 9,
    title: "Sabahları Işık Alın",
    body: "Sabah uyandığınızda vücudunuza günün başladığını bildirmek için birkaç dakika boyunca 10.000 lüks ışık kaynağına veya doğal güneş ışığına maruz kalın. Ruh halinizi ve enerjinizi artırır.",
    emoji: "☀️",
    tag: "Sabah",
    color: "#D97706",
  },
  {
    num: 10,
    title: "Veri Toplayın",
    body: "Neyin uykunuzu iyileştirdiğini veya kötüleştirdiğini anlamak için verilerden faydalanın. Uyku sürenizi, kalitesini ve günlük eforunuzu takip edebileceğiniz giyilebilir bir teknoloji (örneğin Whoop band) kullanın.",
    emoji: "📊",
    tag: "Takip",
    color: "#059669",
  },
];

export default function PerfectSleepPage() {
  const [openTip, setOpenTip] = useState<number | null>(null);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080C18",
        color: "#F8FAFC",
        fontFamily: "inherit",
      }}
    >
      {/* ── Hero ── */}
      <div style={{ position: "relative", width: "100%", maxHeight: 420, overflow: "hidden" }}>
        <img
          src="/bryan-cranston-sleep.jpg"
          alt="Perfect Sleep"
          style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: 420 }}
        />
        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(8,12,24,0.1) 0%, rgba(8,12,24,0.6) 60%, rgba(8,12,24,1) 100%)",
          }}
        />
        {/* Title overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: 0,
            right: 0,
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#A78BFA",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: 8,
            }}
          >
            Bryan Cranston ile
          </div>
          <h1
            style={{
              fontSize: 42,
              fontWeight: 900,
              color: "#FFFFFF",
              margin: 0,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              textShadow: "0 2px 20px rgba(0,0,0,0.8)",
            }}
          >
            PERFECT SLEEP
          </h1>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "36px 20px 64px" }}>
        {/* Intro */}
        <div
          style={{
            background: "rgba(124,58,237,0.08)",
            border: "1px solid rgba(124,58,237,0.2)",
            borderRadius: 16,
            padding: "20px 22px",
            marginBottom: 36,
          }}
        >
          <p
            style={{
              fontSize: 15,
              color: "#CBD5E1",
              lineHeight: 1.7,
              margin: 0,
              textAlign: "center",
            }}
          >
            Mükemmel bir uyku skoru elde etmek için{" "}
            <strong style={{ color: "#A78BFA" }}>10 temel alışkanlık</strong>. Her birini hayatına
            ekledikçe uyku kalitenin nasıl değiştiğini hissedeceksin.
          </p>
        </div>

        {/* Tips */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {TIPS.map((tip) => {
            const isOpen = openTip === tip.num;
            return (
              <div
                key={tip.num}
                style={{
                  borderRadius: 16,
                  border: `1px solid ${isOpen ? tip.color + "55" : "rgba(255,255,255,0.07)"}`,
                  background: isOpen
                    ? `linear-gradient(135deg, ${tip.color}12, ${tip.color}05)`
                    : "rgba(255,255,255,0.02)",
                  overflow: "hidden",
                  transition: "all 0.25s ease",
                }}
              >
                {/* Header row — always visible */}
                <button
                  onClick={() => setOpenTip(isOpen ? null : tip.num)}
                  style={{
                    width: "100%",
                    padding: "16px 18px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    textAlign: "left",
                  }}
                >
                  {/* Number + emoji badge */}
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      background: `linear-gradient(135deg, ${tip.color}30, ${tip.color}15)`,
                      border: `1.5px solid ${tip.color}50`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: 18, lineHeight: 1 }}>{tip.emoji}</span>
                    <span style={{ fontSize: 9, fontWeight: 800, color: tip.color, marginTop: 1 }}>
                      {tip.num < 10 ? `0${tip.num}` : tip.num}
                    </span>
                  </div>

                  {/* Title + tag */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 6,
                        fontWeight: 700,
                        color: tip.color,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginBottom: 4,
                      }}
                    >
                      {tip.tag}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: isOpen ? "#F8FAFC" : "#CBD5E1",
                        lineHeight: 1.3,
                      }}
                    >
                      {tip.title}
                    </div>
                  </div>

                  {/* Chevron */}
                  <div
                    style={{
                      fontSize: 16,
                      color: "#475569",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                      flexShrink: 0,
                    }}
                  >
                    ▾
                  </div>
                </button>

                {/* Body — visible when open */}
                {isOpen && (
                  <div
                    style={{
                      padding: "0 18px 18px 78px",
                      animation: "fadeInUp 0.2s ease forwards",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 14,
                        color: "#94A3B8",
                        lineHeight: 1.75,
                        margin: 0,
                      }}
                    >
                      {tip.body}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA bottom */}
        <div
          style={{
            marginTop: 40,
            textAlign: "center",
            padding: "28px 24px",
            background: "rgba(124,58,237,0.08)",
            border: "1px solid rgba(124,58,237,0.2)",
            borderRadius: 20,
          }}
        >
          <div style={{ fontSize: 28, marginBottom: 12 }}>🌙</div>
          <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.6, margin: "0 0 20px" }}>
            Bu alışkanlıkları hayatına eklemek için kişisel uyku planını oluştur.
          </p>
          <a
            href="/quiz"
            style={{
              display: "inline-block",
              padding: "14px 32px",
              borderRadius: 14,
              background: "linear-gradient(135deg, #7C3AED, #6366F1)",
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 8px 24px rgba(124,58,237,0.35)",
            }}
          >
            Ücretsiz Uyku Testini Yap →
          </a>
        </div>
      </div>
    </main>
  );
}
