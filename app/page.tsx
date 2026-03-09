"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const SLEEP_TYPES = [
  { emoji: "🦉", label: "Gece Kuşu", color: "#818CF8" },
  { emoji: "🌊", label: "Parçalı Uyuyan", color: "#38BDF8" },
  { emoji: "⚡", label: "Stres Uykucusu", color: "#FB923C" },
  { emoji: "🔋", label: "Recovery Açığı", color: "#F472B6" },
];


export default function LandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-4 py-12">
      {/* Background orbs */}
      <div
        style={{
          position: "fixed",
          top: "10%",
          right: "5%",
          width: 300,
          height: 300,
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "10%",
          left: "5%",
          width: 250,
          height: 250,
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            style={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, #7C3AED, #6366F1)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            🌙
          </div>
          <span style={{ fontSize: 20, fontWeight: 700, color: "#F8FAFC" }}>SleepIQ</span>
        </div>

        {/* Hero section */}
        <div className="text-center fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div
            style={{
              display: "inline-block",
              padding: "6px 14px",
              background: "rgba(124, 58, 237, 0.15)",
              border: "1px solid rgba(124, 58, 237, 0.3)",
              borderRadius: 100,
              fontSize: 13,
              color: "#A78BFA",
              fontWeight: 500,
              marginBottom: 20,
            }}
          >
            Bilimsel Uyku Analizi
          </div>

          <h1
            style={{
              fontSize: 40,
              fontWeight: 800,
              lineHeight: 1.15,
              margin: "0 0 16px 0",
              color: "#F8FAFC",
            }}
          >
            Uyku Yaşın{" "}
            <span className="gradient-text">Kaç?</span>
          </h1>

          <p
            style={{
              fontSize: 17,
              color: "#94A3B8",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Ücretsiz testle gerçek uyku profilini keşfet.
            Huberman & Walker metodolojisiyle hazırlandı.
          </p>
        </div>

        {/* Sleep type cards */}
        <div
          className="fade-in-up"
          style={{
            animationDelay: "0.2s",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            width: "100%",
          }}
        >
          {SLEEP_TYPES.map((type) => (
            <div
              key={type.label}
              className="glass"
              style={{
                borderRadius: 14,
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 22 }}>{type.emoji}</span>
              <span
                style={{ fontSize: 13, fontWeight: 500, color: type.color }}
              >
                {type.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="fade-in-up"
          style={{ animationDelay: "0.3s", width: "100%" }}
        >
          <button
            className="btn-primary pulse-glow"
            onClick={() => router.push("/quiz")}
            style={{ fontSize: 17, padding: "18px 32px" }}
          >
            Uyku Yaşımı Öğren →
          </button>
        </div>

        {/* Social proof */}
        <div
          className="fade-in-up glass"
          style={{
            animationDelay: "0.5s",
            borderRadius: 14,
            padding: "14px 20px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ display: "flex" }}>
            {["👨", "👩", "🧑", "👱"].map((emoji, i) => (
              <div
                key={i}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "rgba(124,58,237,0.3)",
                  border: "2px solid #0A0E1A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  marginLeft: i > 0 ? -8 : 0,
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "#94A3B8", margin: 0 }}>
            <strong style={{ color: "#F8FAFC" }}>12.847</strong> kişi bu ay uyku yaşını öğrendi
          </p>
        </div>
      </div>
    </main>
  );
}
