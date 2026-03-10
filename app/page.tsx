"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const SLEEP_TYPES = [
  { emoji: "🦉", label: "Gece Kuşu", color: "#7C3AED" },
  { emoji: "🌊", label: "Parçalı Uyuyan", color: "#0891B2" },
  { emoji: "⚡", label: "Stres Uykucusu", color: "#F97316" },
  { emoji: "🔋", label: "Recovery Açığı", color: "#EC4899" },
];

export default function LandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FFF6F0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 440, display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 36, height: 36,
              background: "linear-gradient(135deg, #7C3AED, #EC4899)",
              borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18,
            }}
          >
            🌙
          </div>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#1E293B", letterSpacing: "-0.02em" }}>
            sleep<span style={{ background: "linear-gradient(135deg,#7C3AED,#EC4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>IQ</span>
          </span>
        </div>

        {/* Hero */}
        <div className="fade-in-up" style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-block", padding: "6px 16px",
              background: "#F0EBFF", border: "1px solid #C4B5FD",
              borderRadius: 100, fontSize: 13, color: "#7C3AED", fontWeight: 600,
              marginBottom: 18,
            }}
          >
            🔬 Bilimsel Uyku Analizi
          </div>
          <h1
            style={{
              fontSize: 38, fontWeight: 800, lineHeight: 1.15,
              color: "#1E293B", margin: "0 0 14px",
              letterSpacing: "-0.02em",
            }}
          >
            Uyku Skorun{" "}
            <span className="gradient-text">Kaç?</span>
          </h1>
          <p style={{ fontSize: 16, color: "#64748B", lineHeight: 1.65, margin: 0 }}>
            Gerçek uyku profilini bilimsel analizle keşfet.<br />
            Walker & Van Dongen metodolojisiyle hazırlandı.
          </p>
        </div>

        {/* Sleep type chips */}
        <div
          className="fade-in-up"
          style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 10, width: "100%", animationDelay: "0.1s",
          }}
        >
          {SLEEP_TYPES.map((type) => (
            <div
              key={type.label}
              style={{
                background: "#FFFFFF",
                border: "1.5px solid #EDE8F5",
                borderRadius: 14, padding: "14px 16px",
                display: "flex", alignItems: "center", gap: 10,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <span style={{ fontSize: 22 }}>{type.emoji}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: type.color }}>{type.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="fade-in-up" style={{ width: "100%", animationDelay: "0.2s" }}>
          <button
            className="btn-primary pulse-glow"
            onClick={() => router.push("/quiz")}
            style={{ fontSize: 17, padding: "18px 32px" }}
          >
            Uyku Skorumu Öğren →
          </button>
        </div>

        {/* Promise strip */}
        <div
          className="fade-in-up"
          style={{
            animationDelay: "0.3s", width: "100%",
            background: "#FFFFFF", border: "1.5px solid #EDE8F5",
            borderRadius: 14, padding: "14px 20px",
            display: "flex", alignItems: "center", gap: 16,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex" }}>
            {["👨", "👩", "🧑", "👱"].map((e, i) => (
              <div
                key={i}
                style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: "#F0EBFF", border: "2px solid #FFF6F0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, marginLeft: i > 0 ? -8 : 0,
                }}
              >
                {e}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>
            <strong style={{ color: "#1E293B" }}>12.847</strong> kişi bu ay uyku skorunu ölçtürdü
          </p>
        </div>

        {/* Trust */}
        <div
          className="fade-in-up"
          style={{
            animationDelay: "0.4s",
            display: "flex", gap: 20, justifyContent: "center",
            fontSize: 12, color: "#94A3B8",
          }}
        >
          <span>🔒 SSL Güvenli Ödeme</span>
          <span>⚡ 3 dakika</span>
          <span>✓ Bilimsel Analiz</span>
        </div>
      </div>
    </main>
  );
}
