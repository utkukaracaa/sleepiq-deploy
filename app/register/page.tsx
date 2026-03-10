"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const BADGES = [
  { top: "Sleep Science", main: "En İyi\nUyku Uygulaması", size: "large" },
  { top: "App Store", main: "Editörün\nSeçimi", size: "small" },
  { top: "App Store", main: "Günün\nUygulaması", size: "small" },
];

function Badge({ top, main, size }: { top: string; main: string; size: string }) {
  const big = size === "large";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        width: big ? 120 : 100,
      }}
    >
      {/* Wreath SVG */}
      <svg width={big ? 90 : 76} height={big ? 90 : 76} viewBox="0 0 90 90" fill="none">
        {/* Left branch */}
        <path d="M20 70 C12 60, 8 48, 10 36 C14 28, 20 24, 26 22" stroke="#93C5FD" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M10 36 C6 32, 8 26, 12 24" stroke="#93C5FD" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M12 44 C8 42, 8 36, 10 32" stroke="#93C5FD" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M16 54 C10 54, 8 48, 10 44" stroke="#93C5FD" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M20 63 C14 64, 12 58, 14 54" stroke="#93C5FD" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Right branch */}
        <path d="M70 70 C78 60, 82 48, 80 36 C76 28, 70 24, 64 22" stroke="#93C5FD" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M80 36 C84 32, 82 26, 78 24" stroke="#93C5FD" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M78 44 C82 42, 82 36, 80 32" stroke="#93C5FD" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M74 54 C80 54, 82 48, 80 44" stroke="#93C5FD" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M70 63 C76 64, 78 58, 76 54" stroke="#93C5FD" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Bottom tie */}
        <path d="M38 74 C42 78, 48 78, 52 74" stroke="#93C5FD" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        {/* Star at top */}
        <text x="45" y="28" textAnchor="middle" fontSize="10" fill="#60A5FA">★</text>
        {/* Label */}
        <text x="45" y="44" textAnchor="middle" fontSize="7.5" fill="#6B9FD4" fontWeight="600" letterSpacing="0.3">{top}</text>
        {/* Main text */}
        {main.split("\n").map((line, i) => (
          <text key={i} x="45" y={56 + i * 11} textAnchor="middle" fontSize={big ? 9 : 8} fill="#2563EB" fontWeight="800">
            {line}
          </text>
        ))}
      </svg>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  const isValid = name.trim().length > 1 && email.includes("@") && email.includes(".");

  function handleSubmit() {
    if (!isValid) return;
    localStorage.setItem("sleepiq_user", JSON.stringify({ name: name.trim(), email: email.trim() }));
    router.push("/results");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FFF6F0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px 48px",
        fontFamily: "inherit",
      }}
    >
      <div style={{ width: "100%", maxWidth: 440 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
            <span style={{ fontSize: 22, fontWeight: 900, color: "#1E293B", letterSpacing: "-0.03em" }}>
              sleep
            </span>
            <span
              style={{
                fontSize: 22, fontWeight: 900, letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #7C3AED, #EC4899)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}
            >
              IQ
            </span>
            <span style={{ fontSize: 18, marginLeft: -2, marginBottom: 8 }}>✦</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#1E293B",
              margin: "0 0 12px",
              lineHeight: 1.25,
            }}
          >
            Hedeflerine{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7C3AED, #EC4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              SleepIQ
            </span>
            {"'la ulaş"}
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "#64748B",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Kişisel uyku planına ulaşmak için{" "}
            <span style={{ color: "#7C3AED", fontWeight: 500 }}>adını ve e-postanı</span> gir
          </p>
        </div>

        {/* Inputs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
          {/* Name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 18px",
              background: "#FFFFFF",
              borderRadius: 16,
              border: `1.5px solid ${nameFocused ? "#7C3AED" : "#E8E0F0"}`,
              transition: "border-color 0.15s ease",
              boxShadow: nameFocused ? "0 0 0 3px rgba(124,58,237,0.08)" : "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <span style={{ fontSize: 16, opacity: 0.4 }}>👤</span>
            <input
              type="text"
              placeholder="Ad"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              style={{
                flex: 1, border: "none", outline: "none",
                fontSize: 16, color: "#1E293B", background: "transparent",
              }}
            />
          </div>

          {/* Email */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 18px",
              background: "#FFFFFF",
              borderRadius: 16,
              border: `1.5px solid ${emailFocused ? "#7C3AED" : "#E8E0F0"}`,
              transition: "border-color 0.15s ease",
              boxShadow: emailFocused ? "0 0 0 3px rgba(124,58,237,0.08)" : "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <span style={{ fontSize: 16, opacity: 0.4 }}>✉️</span>
            <input
              type="email"
              placeholder="E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              style={{
                flex: 1, border: "none", outline: "none",
                fontSize: 16, color: "#1E293B", background: "transparent",
              }}
            />
          </div>
        </div>

        {/* Privacy note */}
        <p
          style={{
            fontSize: 12,
            color: "#94A3B8",
            lineHeight: 1.65,
            textAlign: "center",
            margin: "0 0 24px",
          }}
        >
          Devam ederek gizlilik politikamızı kabul etmiş olursunuz. Gizliliğine saygı duyuyor ve{" "}
          <span style={{ color: "#7C3AED" }}>e-posta adresini asla satmayacağımızı</span>,
          kiralamayacağımızı veya paylaşmayacağımızı garanti ediyoruz.{" "}
          <span style={{ color: "#7C3AED", fontWeight: 600 }}>Bu sadece bir politika değil, bizim kişisel taahhüdümüzdür!</span>
        </p>

        {/* CTA Button */}
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: 16,
            border: "none",
            background: isValid
              ? "linear-gradient(135deg, #7C3AED, #EC4899)"
              : "#E8E0F0",
            color: isValid ? "#FFFFFF" : "#94A3B8",
            fontSize: 16,
            fontWeight: 700,
            cursor: isValid ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
            boxShadow: isValid ? "0 8px 24px rgba(124,58,237,0.3)" : "none",
            marginBottom: 36,
          }}
        >
          Planımı Göster →
        </button>

        {/* Badges */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: 12,
            marginBottom: 40,
          }}
        >
          {BADGES.map((b, i) => (
            <Badge key={i} {...b} />
          ))}
        </div>

        {/* Footer links */}
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: 13, color: "#7C3AED", cursor: "pointer" }}>
            Kullanım Koşulları
          </span>
          <span style={{ fontSize: 13, color: "#94A3B8", margin: "0 8px" }}>|</span>
          <span style={{ fontSize: 13, color: "#7C3AED", cursor: "pointer" }}>
            Gizlilik Şartları
          </span>
        </div>
      </div>
    </main>
  );
}
