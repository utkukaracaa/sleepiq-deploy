"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuizAnswers } from "@/lib/sleepLogic";

// ─── Phase definitions ────────────────────────────────────────────────────────
interface Insight {
  type: "quote" | "fact" | "book";
  text: string;
  source: string;
  researcher?: { initials: string; name: string; institution: string; color: string; img?: string };
}

interface Testimonial {
  headline: string;
  quote: string;
  person: string;
  role: string;
  photoUrl: string;
  initials: string;
  avatarColor: string;
  corporateFact: string;
  corporateSource: string;
}

interface Phase {
  id: number;
  emoji: string;
  title: string;
  subtitle: string;
  insight?: Insight;
  testimonial?: Testimonial;
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
      researcher: {
        initials: "HVD",
        name: "Hans Van Dongen",
        institution: "University of Pennsylvania",
        color: "#0891B2",
        img: "/hans-van-dongen.jpg",
      },
    },
  },
  {
    id: 3,
    emoji: "🎯",
    title: "Kimliğin & Hedeflerin",
    subtitle: "Seni neyin motive ettiğini anlıyoruz",
    testimonial: {
      headline: "Dünyanın en başarılı şirketleri bunu çalışanlarından talep ediyor",
      quote: "\"Uyku benim için müzakere edilemez. 8 saat uyuduğumda daha net düşünüyor, daha iyi kararlar alıyorum. Yorgunluk üzerinden liderlik edemezsin.\"",
      person: "Jeff Bezos",
      role: "Amazon Kurucusu & Yönetim Kurulu Başkanı",
      photoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29.jpg/200px-Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_%2839074799225%29.jpg",
      initials: "JB",
      avatarColor: "#FF9900",
      corporateFact: "Aetna Insurance, 7+ saat uyuduğunu belgeleyen çalışanlarına yılda 300$ bonus veriyor. Şimdiye kadar 13.000'den fazla çalışan bu programdan yararlandı.",
      corporateSource: "Aetna Employee Wellness Program — Mark Bertolini, CEO",
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
      researcher: { initials: "MW", name: "Matthew Walker", institution: "UC Berkeley — Uyku Bilimci", color: "#7C3AED", img: "/matthew-walker.jpg" },
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
interface InterstitialCard {
  emoji: string;
  label: string;
  text: string;
  source: string;
  authorImg?: string;
}

interface BookDef {
  title: string;
  titleLines: string[];
  subtitle: string;
  author: string;
  publisher: string;
  bg: string;
  titleColor: string | string[];
  authorColor: string;
  accentColor: string;
  tagline?: string;
  authorImg?: string;
}

interface Question {
  id: keyof QuizAnswers;
  question: string;
  subtext?: string;
  options: string[];
  phase: number;
  autoAdvance?: boolean;
  afterCard?: InterstitialCard;
  type?: "standard" | "bookCheck" | "bookMultiSelect";
  book?: BookDef;
  books?: BookDef[];
}

// ─── Book definitions ─────────────────────────────────────────────────────────
const BOOK_WALKER: BookDef = {
  title: "Niçin Uyuruz?",
  titleLines: ["Niçin", "Uyuruz?"],
  subtitle: "Yeni Uyku ve Rüya Bilimi",
  author: "MATTHEW WALKER",
  publisher: "PEGASUS",
  bg: "#F4EFE6",
  titleColor: "#1A1A2E",
  authorColor: "#6B21A8",
  accentColor: "#B87333",
  tagline: "Uluslararası Çoksatan",
  authorImg: "/matthew-walker.jpg",
};

const BOOK_HUFFINGTON: BookDef = {
  title: "Uyku Devrimi",
  titleLines: ["UYKU", "DEVRİMİ"],
  subtitle: "Hayatınızı Her Gece Değiştirin",
  author: "ARIANNA HUFFINGTON",
  publisher: "DK",
  bg: "linear-gradient(180deg,#091525 0%,#122040 100%)",
  titleColor: "#FFFFFF",
  authorColor: "#FFFFFF",
  accentColor: "#5B9BD5",
  tagline: "Araştırma & İnceleme",
};

const BOOK_WINTER: BookDef = {
  title: "Uykunun Şifalı Gücü",
  titleLines: ["UYKUNUN", "ŞİFALI", "GÜCÜ"],
  subtitle: "Uykunuz neden bozulur ve nasıl düzelir?",
  author: "W. CHRIS WINTER",
  publisher: "KETEBE",
  bg: "#0D1B2A",
  titleColor: ["#FFFFFF", "#22D3EE", "#FCD34D"],
  authorColor: "#FFFFFF",
  accentColor: "#22D3EE",
};

const QUESTIONS: Question[] = [
  // Q0 — Segmentation
  {
    id: "ageSegment",
    question: "Yaşın kaç?",
    phase: 0,
    options: ["18–24", "25–34", "35–44", "45+"],
    autoAdvance: true,
  },
  // Phase 1 — Sleep Baseline
  {
    id: "morningFeel",
    question: "Sabah uyandığında kendini nasıl hissediyorsun?",
    phase: 1,
    options: ["Dinç ve enerjik", "Biraz yorgun", "Çok yorgun", "Alarmı sürekli erteliyorum"],
    afterCard: {
      emoji: "🧠",
      label: "Biliyor Muydun?",
      text: "Öğrenmeden önce uyumak beyni kuru bir sünger gibi hazırlar. Yeni bilgileri kaydetme kapasitesi uykusuz beyinde %40 oranında düşer.",
      source: "Matthew Walker, Why We Sleep",
      authorImg: "/matthew-walker.jpg",
    },
  },
  {
    id: "sleepLatency",
    question: "Uykuya dalman genelde ne kadar sürüyor?",
    phase: 1,
    options: ["Yatağa girdiğim andan itibaren", "10 dakikadan az", "10–30 dakika", "30–60 dakika", "1 saatten fazla"],
    afterCard: {
      emoji: "⏱️",
      label: "Biliyor muydun?",
      text: "Uykuya dalmak 20 dakikadan uzun sürüyorsa buna \"uyku gecikmesi\" denir ve bu başlı başına bir uyku bozukluğu işaretidir. İdeal süre 7–15 dakikadır.",
      source: "American Academy of Sleep Medicine",
      authorImg: "/aasm-logo.png",
    },
  },
  {
    id: "wakeCount",
    question: "Gece kaç kez uyanırsın?",
    phase: 1,
    options: ["Hiç", "1 kez", "2–3 kez", "Çok sık"],
    afterCard: {
      emoji: "🏨",
      label: "İlginç Gerçek",
      text: "Yabancı bir yerde ilk uyuduğunuz gece beyninizin bir yarısı diğer yarısı kadar derin uyumaz — evrimin size yerleştirdiği bir gece nöbetçisi.",
      source: "Current Biology (2016)",
    },
  },
  {
    id: "readWalker",
    question: "Bu kitabı okudun mu?",
    phase: 1,
    options: ["Evet, okudum", "Hayır, okumadım", "Duymamıştım"],
    type: "bookCheck",
    book: BOOK_WALKER,
  },
  {
    id: "sleepQuality",
    question: "Genel olarak uykunu nasıl değerlendirirsin?",
    phase: 1,
    options: ["Çok iyi", "Ortalama", "Zayıf", "Çok kötü"],
    afterCard: {
      emoji: "⚡",
      label: "Biliyor Muydun?",
      text: "Uyku eksikliği erkekleri 10 yaş yaşlandırır. Düzenli olarak 4–5 saat uyuyan erkeklerin testosteron seviyesi, 10 yaş büyük bir erkekle birebir aynıdır.",
      source: "Matthew Walker, Why We Sleep",
      authorImg: "/matthew-walker.jpg",
    },
  },
  // Phase 2 — Problem Deepening
  {
    id: "impactFrequency",
    question: "Sabahları dinlenmiş uyanamamak seni ne kadar etkiliyor?",
    phase: 2,
    options: ["Hiç etkilemiyor", "Bazen", "Sık sık", "Her gün"],
    afterCard: {
      emoji: "🧠",
      label: "Araştırma Bulgusu",
      text: "Haftada 3+ gün yorgun uyanmak, kronik uyku yoksunluğu kategorisine girer. Bu durum uzun vadede kalp hastalığı, obezite ve depresyon riskini ikiye katlıyor.",
      source: "National Sleep Foundation, Sleep Health Journal (2022)",
    },
  },
  {
    id: "impactArea",
    question: "Uyku bozulduğunda en çok ne etkileniyor?",
    phase: 2,
    options: ["Enerjim", "Odaklanmam", "Ruh halim", "Hepsi"],
  },
  {
    id: "readHuffington",
    question: "Bu kitabı okudun mu?",
    phase: 2,
    options: ["Evet, okudum", "Hayır, okumadım", "Duymamıştım"],
    type: "bookCheck",
    book: BOOK_HUFFINGTON,
  },
  {
    id: "caffeine",
    question: "Gün içinde kafein tüketiminiz?",
    subtext: "Kahve, çay, enerji içeceği dahil.",
    phase: 2,
    options: ["Hiç", "1 fincan", "2–3 fincan", "4+"],
    afterCard: {
      emoji: "☕",
      label: "Kafein Gerçeği",
      text: "Öğlen 12'de içtiğiniz kahvenin %25'i gece yarısı hala beyninizde dolanır ve derin uykunuzu %20 oranında bozar — uyusanız bile.",
      source: "Journal of Sleep Research",
    },
  },
  {
    id: "emptyBattery",
    question: "Gün içinde kendini \"boş pil\" gibi hissediyor musun?",
    phase: 2,
    options: ["Nadiren", "Bazen", "Sık sık", "Her gün"],
    afterCard: {
      emoji: "😔",
      label: "Biliyor Muydun?",
      text: "Uykusuzlukta beyin pozitif anıları yarı yarıya daha az hatırlar, ama negatif olayları aynı oranda hatırlar. Bu asimetri depresyona zemin hazırlar.",
      source: "Sleep Journal (2021)",
    },
  },
  {
    id: "bookInterest",
    question: "Aşağıdaki kitaplardan hangisi seni en çok ilgilendiriyor?",
    subtext: "Birden fazla seçebilirsin",
    phase: 2,
    options: [BOOK_WALKER.title, BOOK_HUFFINGTON.title, BOOK_WINTER.title],
    type: "bookMultiSelect",
    books: [BOOK_WALKER, BOOK_HUFFINGTON, BOOK_WINTER],
  },
  {
    id: "afternoonCrash",
    question: "Öğleden sonra enerji düşüşü yaşar mısın?",
    phase: 2,
    options: ["Hayır", "Bazen", "Çoğu gün", "Her gün"],
    afterCard: {
      emoji: "😤",
      label: "Biliyor Muydun?",
      text: "Uyku eksikliği duygusal merkezinizi (amigdala) %60 daha tepkisel ve öfkeli hale getirir; mantıklı kararlar alan prefrontal korteks ise neredeyse devre dışı kalır.",
      source: "Matthew Walker, Why We Sleep",
      authorImg: "/matthew-walker.jpg",
    },
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
    afterCard: {
      emoji: "💡",
      label: "Rüya Bilimi",
      text: "REM uykusunda beyin yeni bilgileri eski anılarla rastgele eşleştirir. Bu yüzden sabah kalktığında dün çözemediğin problemlere aniden çözüm bulursun.",
      source: "Nature Neuroscience",
    },
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
  6:  { from: PHASES[1], to: PHASES[2] },
  13: { from: PHASES[2], to: PHASES[3] },
  18: { from: PHASES[3], to: PHASES[4] },
  22: { from: PHASES[4], to: PHASES[5] },
};

// ─── SVG Company Logos ────────────────────────────────────────────────────────
function LogoGoogle() {
  return (
    <svg viewBox="0 0 18 18" width="18" height="18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.017 17.64 11.71 17.64 9.2z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.96L3.964 7.3C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

function LogoApple() {
  return (
    <svg viewBox="0 0 814 1000" width="13" height="16" fill="white">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-167.2-113.6C142.6 797.8 78.4 666.4 78.4 541.1c0-213.4 139.4-327.1 276.7-327.1 74.3 0 136.2 48.9 183.2 48.9 44.8 0 114.2-52.1 197.9-52.1zm-162.2-71.1c34.8-41.1 59.4-98.5 59.4-155.9 0-7.9-.7-15.8-1.9-22.9-56.8 2.1-124.2 38.1-164.7 85.9-31.4 36.7-61 94.9-61 153.1 0 8.4 1.3 16.9 1.9 19.5 3.2.6 8.4 1.3 13.6 1.3 50.8 0 113.3-33.6 152.7-81z"/>
    </svg>
  );
}

function LogoNike() {
  return (
    <svg viewBox="0 0 500 175" width="32" height="11" fill="white">
      <path d="M496.6 6.6c4.4 5.1 3.2 12.2-2.2 19.6L201.1 168.4c-7.3 5.1-14.6 7.3-21.2 7.3-10.9 0-19.9-6.6-25-19.2L107 55.2c-2.2-5.8-5.1-8-9.5-8-5.8 0-13.9 5.1-25 13.9L3.3 115.5 0 111.4 96 38c11.7-9.5 22.7-14.6 31.5-14.6 10.2 0 18.2 6.6 23.3 19.9l48.4 100.7c2.2 5.1 5.1 7.3 8.8 7.3 3.6 0 8-2.2 13.9-6.6L469.5 2.2c10.2-7.3 20.4-1.5 27 4.4z"/>
    </svg>
  );
}

function LogoGoldman() {
  return (
    <svg viewBox="0 0 140 30" width="70" height="15">
      <text x="0" y="22" fontFamily="Georgia, serif" fontSize="22" fontWeight="700" fill="white" letterSpacing="1">Goldman</text>
    </svg>
  );
}

function LogoAetna() {
  return (
    <svg viewBox="0 0 80 30" width="50" height="18">
      <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="800" fill="#7EC8E3" letterSpacing="0.5">aetna</text>
    </svg>
  );
}

const COMPANY_LOGOS = [
  { name: "Google",  Logo: LogoGoogle,  bg: "rgba(255,255,255,0.06)",  border: "rgba(255,255,255,0.1)" },
  { name: "Apple",   Logo: LogoApple,   bg: "rgba(255,255,255,0.06)",  border: "rgba(255,255,255,0.1)" },
  { name: "Nike",    Logo: LogoNike,    bg: "rgba(255,255,255,0.06)",  border: "rgba(255,255,255,0.1)" },
  { name: "Goldman", Logo: LogoGoldman, bg: "rgba(255,255,255,0.06)",  border: "rgba(255,255,255,0.1)" },
  { name: "Aetna",   Logo: LogoAetna,   bg: "rgba(255,255,255,0.06)",  border: "rgba(255,255,255,0.1)" },
];

// ─── Age Selection Grid ───────────────────────────────────────────────────────
const AGE_CARDS = [
  { label: "18–24", emoji: "🧑‍🎓", bg: "linear-gradient(160deg,#1e1b4b,#3730a3)", accent: "#818CF8" },
  { label: "25–34", emoji: "👩‍💼", bg: "linear-gradient(160deg,#1e1434,#5b21b6)", accent: "#A78BFA" },
  { label: "35–44", emoji: "🧔",   bg: "linear-gradient(160deg,#0c1a2e,#0369a1)", accent: "#38BDF8" },
  { label: "45+",   emoji: "👨‍🦳",  bg: "linear-gradient(160deg,#0f172a,#1e3a5f)", accent: "#7DD3FC" },
];

function AgeGrid({
  selected,
  onSelect,
}: {
  selected?: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        marginBottom: 32,
      }}
    >
      {AGE_CARDS.map((card) => {
        const isSelected = selected === card.label;
        return (
          <button
            key={card.label}
            onClick={() => onSelect(card.label)}
            style={{
              background: card.bg,
              border: `2px solid ${isSelected ? card.accent : "rgba(124,58,237,0.15)"}`,
              borderRadius: 18,
              overflow: "hidden",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.2s ease",
              transform: isSelected ? "scale(1.03)" : "scale(1)",
              boxShadow: isSelected ? `0 0 20px ${card.accent}40` : "none",
            }}
          >
            {/* Illustration area */}
            <div
              style={{
                height: 110,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 56,
                position: "relative",
              }}
            >
              {card.emoji}
              {isSelected && (
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 10,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: card.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    color: "#0A0E1A",
                    fontWeight: 800,
                  }}
                >
                  ✓
                </div>
              )}
            </div>
            {/* Label strip */}
            <div
              style={{
                background: isSelected ? card.accent : "rgba(124,58,237,0.15)",
                padding: "10px 0",
                fontSize: 14,
                fontWeight: 700,
                color: isSelected ? "#0A0E1A" : "#CBD5E1",
                textAlign: "center",
                transition: "all 0.2s ease",
              }}
            >
              Yaş: {card.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ─── Interstitial (mid-flow) Card ────────────────────────────────────────────
function InterstitialScreen({
  card,
  onContinue,
}: {
  card: InterstitialCard;
  onContinue: () => void;
}) {
  return (
    <div style={{ animation: "fadeInUp 0.3s ease forwards" }}>
      <div style={{ fontSize: 48, textAlign: "center", marginBottom: 16 }}>
        {card.emoji}
      </div>
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#7C3AED",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          textAlign: "center",
          margin: "0 0 18px",
        }}
      >
        {card.label}
      </p>
      <div
        style={{
          background: "rgba(124,58,237,0.08)",
          border: "1px solid rgba(124,58,237,0.2)",
          borderRadius: 18,
          padding: "22px 20px",
          marginBottom: 28,
        }}
      >
        <p
          style={{
            fontSize: 16,
            color: "#475569",
            lineHeight: 1.75,
            margin: "0 0 14px",
            textAlign: "center",
          }}
        >
          {card.text}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4, justifyContent: card.authorImg ? "flex-start" : "center" }}>
          {card.authorImg && (
            <img
              src={card.authorImg}
              alt="Kaynak"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              style={
                card.authorImg.includes("logo")
                  ? { height: 20, maxWidth: 72, objectFit: "contain", opacity: 0.7, flexShrink: 0 }
                  : { width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(124,58,237,0.4)", flexShrink: 0 }
              }
            />
          )}
          <p style={{ fontSize: 12, color: "#475569", fontStyle: "italic", margin: 0, textAlign: card.authorImg ? "left" : "center" }}>
            {card.source}
          </p>
        </div>
      </div>
      <button className="btn-primary" style={{ fontSize: 16 }} onClick={onContinue}>
        Anladım, Devam Et →
      </button>
    </div>
  );
}

// ─── Book Cover Art (CSS-rendered) ───────────────────────────────────────────
function BookCoverArt({ book, small }: { book: BookDef; small?: boolean }) {
  const h = small ? 140 : 200;
  const w = small ? 95 : 136;
  const isLight = typeof book.bg === "string" && book.bg.startsWith("#F");

  return (
    <div
      style={{
        width: w,
        height: h,
        background: book.bg,
        borderRadius: small ? 8 : 10,
        padding: small ? "10px 8px" : "14px 12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexShrink: 0,
        boxShadow: "4px 6px 20px rgba(0,0,0,0.5)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Tagline */}
      {book.tagline && (
        <div style={{ fontSize: small ? 7 : 9, color: isLight ? "#555" : "#aaa", marginBottom: 4 }}>
          {book.tagline}
        </div>
      )}
      {/* Author */}
      <div
        style={{
          fontSize: small ? 7 : 9,
          fontWeight: 800,
          color: typeof book.authorColor === "string" ? book.authorColor : "#fff",
          letterSpacing: "0.06em",
          marginBottom: small ? 2 : 4,
        }}
      >
        {book.author}
      </div>
      {/* Title lines */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {book.titleLines.map((line, i) => (
          <div
            key={i}
            style={{
              fontSize: small ? (book.titleLines.length > 2 ? 13 : 15) : (book.titleLines.length > 2 ? 18 : 22),
              fontWeight: 900,
              lineHeight: 1.1,
              color: Array.isArray(book.titleColor) ? book.titleColor[i] ?? "#fff" : book.titleColor,
              letterSpacing: "-0.01em",
            }}
          >
            {line}
          </div>
        ))}
      </div>
      {/* Subtitle */}
      <div
        style={{
          fontSize: small ? 6 : 8,
          color: isLight ? "#666" : "rgba(255,255,255,0.5)",
          lineHeight: 1.3,
          marginTop: 4,
        }}
      >
        {book.subtitle}
      </div>
      {/* Publisher */}
      <div
        style={{
          fontSize: small ? 7 : 9,
          fontWeight: 700,
          color: book.accentColor,
          marginTop: small ? 4 : 6,
          letterSpacing: "0.1em",
        }}
      >
        {book.publisher}
      </div>
    </div>
  );
}

// ─── Book Check Question ──────────────────────────────────────────────────────
function BookCheckQuestion({
  question,
  selected,
  onSelect,
}: {
  question: Question;
  selected?: string;
  onSelect: (v: string) => void;
}) {
  const book = question.book!;
  return (
    <div>
      {/* Book display */}
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "flex-start",
          marginBottom: 28,
          padding: "20px",
          background: "#FAFAFA",
          borderRadius: 16,
          border: "1px solid rgba(124,58,237,0.12)",
        }}
      >
        <BookCoverArt book={book} />
        <div style={{ flex: 1, paddingTop: 4 }}>
          <div style={{ fontSize: 11, color: "#7C3AED", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
            📚 Uyku Kitaplığı
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#1E293B", lineHeight: 1.2, marginBottom: 8 }}>
            {book.title}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            {book.authorImg && (
              <img
                src={book.authorImg}
                alt={book.author}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", border: "1.5px solid rgba(124,58,237,0.5)" }}
              />
            )}
            <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600 }}>{book.author}</div>
          </div>
          <div style={{ fontSize: 11, color: "#475569" }}>{book.subtitle}</div>
        </div>
      </div>
      {/* Yes / No options */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
        {question.options.map((opt) => {
          const sel = selected === opt;
          return (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              style={{
                padding: "15px 18px",
                borderRadius: 13,
                border: `1px solid ${sel ? "#7C3AED" : "rgba(124,58,237,0.15)"}`,
                background: sel ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.03)",
                color: sel ? "#A78BFA" : "#CBD5E1",
                fontSize: 15,
                fontWeight: sel ? 600 : 400,
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 12,
                transition: "all 0.15s ease",
              }}
            >
              <span style={{
                width: 22, height: 22, borderRadius: "50%",
                border: `2px solid ${sel ? "#7C3AED" : "rgba(255,255,255,0.2)"}`,
                background: sel ? "#7C3AED" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, color: "white", flexShrink: 0,
              }}>
                {sel ? "✓" : ""}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Book Multi-Select ────────────────────────────────────────────────────────
function BookMultiSelect({
  books,
  selected,
  onToggle,
}: {
  books: BookDef[];
  selected: string[];
  onToggle: (title: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
      {books.map((book) => {
        const sel = selected.includes(book.title);
        return (
          <button
            key={book.title}
            onClick={() => onToggle(book.title)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "14px 16px",
              borderRadius: 14,
              border: `1.5px solid ${sel ? "#7C3AED" : "rgba(124,58,237,0.15)"}`,
              background: sel ? "rgba(124,58,237,0.1)" : "rgba(255,255,255,0.02)",
              cursor: "pointer",
              transition: "all 0.15s ease",
              textAlign: "left",
            }}
          >
            <BookCoverArt book={book} small />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: sel ? "#A78BFA" : "#E2E8F0", marginBottom: 4 }}>
                {book.title}
              </div>
              <div style={{ fontSize: 12, color: "#64748B", marginBottom: 3 }}>{book.author}</div>
              <div style={{ fontSize: 11, color: "#475569", lineHeight: 1.4 }}>{book.subtitle}</div>
            </div>
            <div style={{
              width: 26, height: 26, borderRadius: 6, flexShrink: 0,
              border: `2px solid ${sel ? "#7C3AED" : "rgba(255,255,255,0.15)"}`,
              background: sel ? "#7C3AED" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, color: "white", transition: "all 0.15s ease",
            }}>
              {sel ? "✓" : ""}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ─── Phase Transition Screen ──────────────────────────────────────────────────
const INSIGHT_LABELS: Record<Insight["type"], string> = {
  quote: "💬 Alıntı",
  fact: "🔬 Bilimsel Gerçek",
  book: "📖 Kitaptan",
};

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div style={{ marginBottom: 28 }}>
      {/* Headline */}
      <p
        style={{
          fontSize: 13,
          color: "#94A3B8",
          textAlign: "center",
          margin: "0 0 16px",
          lineHeight: 1.5,
        }}
      >
        {t.headline}
      </p>

      {/* Real company logos */}
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        {COMPANY_LOGOS.map(({ name, Logo, bg, border }) => (
          <div
            key={name}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: bg,
              border: `1px solid ${border}`,
              borderRadius: 10,
              padding: "7px 14px",
              height: 36,
            }}
          >
            <Logo />
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(124,58,237,0.15)", marginBottom: 16 }} />

      {/* Personal testimonial with real photo */}
      <div
        style={{
          background: "rgba(124,58,237,0.06)",
          border: "1px solid rgba(124,58,237,0.18)",
          borderRadius: 14,
          padding: "16px 18px",
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: `2px solid ${t.avatarColor}`,
              overflow: "hidden",
              flexShrink: 0,
              background: t.avatarColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={t.photoUrl}
              alt={t.person}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
                (e.currentTarget.parentElement as HTMLElement).innerText = t.initials;
                Object.assign((e.currentTarget.parentElement as HTMLElement).style, {
                  fontSize: "14px", fontWeight: "800", color: "#fff",
                });
              }}
            />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1E293B" }}>{t.person}</div>
            <div style={{ fontSize: 11, color: "#64748B" }}>{t.role}</div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 11, color: "#FBBF24" }}>★★★★★</div>
        </div>
        <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
          {t.quote}
        </p>
      </div>

      {/* Corporate fact */}
      <div
        style={{
          background: "rgba(34,197,94,0.06)",
          border: "1px solid rgba(34,197,94,0.18)",
          borderRadius: 12,
          padding: "14px 16px",
        }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>📊</span>
          <div>
            <p style={{ fontSize: 13, color: "#86EFAC", lineHeight: 1.55, margin: "0 0 6px", fontWeight: 500 }}>
              {t.corporateFact}
            </p>
            <span style={{ fontSize: 11, color: "#475569", fontStyle: "italic" }}>
              {t.corporateSource}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhaseTransition({
  phase,
  onContinue,
}: {
  phase: Phase;
  onContinue: () => void;
}) {
  const hasContent = phase.insight || phase.testimonial;
  return (
    <div style={{ animation: "fadeInUp 0.35s ease forwards" }}>
      <div>
        {/* Phase header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: hasContent ? 24 : 40,
          }}
        >
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
              marginBottom: 18,
            }}
          >
            {phase.emoji}
          </div>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#1E293B",
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

        {/* Testimonial card */}
        {phase.testimonial && <TestimonialCard t={phase.testimonial} />}

        {/* Insight card */}
        {phase.insight && (
          <div
            style={{
              background: "rgba(124,58,237,0.08)",
              border: "1px solid rgba(124,58,237,0.2)",
              borderRadius: 16,
              padding: "20px 22px",
              marginBottom: 28,
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
            {/* Researcher portrait */}
            {phase.insight.researcher && (
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                {phase.insight.researcher.img ? (
                  <img
                    src={phase.insight.researcher.img}
                    alt={phase.insight.researcher.name}
                    onError={(e) => { const el = e.target as HTMLImageElement; el.style.display = "none"; el.nextElementSibling && ((el.nextElementSibling as HTMLElement).style.display = "flex"); }}
                    style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", border: `2px solid ${phase.insight.researcher.color}`, flexShrink: 0 }}
                  />
                ) : (
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${phase.insight.researcher.color}, ${phase.insight.researcher.color}88)`,
                    border: `2px solid ${phase.insight.researcher.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 800,
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  {phase.insight.researcher.initials}
                </div>
                )}
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#475569" }}>
                    {phase.insight.researcher.name}
                  </div>
                  <div style={{ fontSize: 11, color: "#64748B" }}>
                    {phase.insight.researcher.institution}
                  </div>
                </div>
              </div>
            )}
            <p
              style={{
                fontSize: 15,
                color: "#334155",
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
  const [showInterstitial, setShowInterstitial] = useState<InterstitialCard | null>(null);
  const [pendingNextIndex, setPendingNextIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const question = QUESTIONS[currentQ];
  const progress = (currentQ / QUESTIONS.length) * 100;
  const currentAnswer = answers[question.id];

  function advanceTo(nextIndex: number, updatedAnswers: Partial<QuizAnswers>) {
    if (nextIndex >= QUESTIONS.length) {
      localStorage.setItem("sleepiq_answers", JSON.stringify(updatedAnswers));
      router.push("/register");
      return;
    }
    if (PHASE_TRANSITIONS[nextIndex]) {
      setCurrentQ(nextIndex);
      setShowTransition(PHASE_TRANSITIONS[nextIndex].to);
      setIsTransitioning(false);
      return;
    }
    setCurrentQ(nextIndex);
    setIsTransitioning(false);
  }

  function handleAnswer(value: string) {
    const updated = { ...answers, [question.id]: value };
    setAnswers(updated);

    // Auto-advance for age question
    if (question.autoAdvance) {
      const nextIndex = currentQ + 1;
      setIsTransitioning(true);
      setTimeout(() => advanceTo(nextIndex, updated), 250);
    }
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
    const isMultiSelect = question.type === "bookMultiSelect";
    if (!isMultiSelect && !currentAnswer) return;
    if (isMultiSelect && multiSelected.length === 0) return;

    const nextIndex = currentQ + 1;

    // Show interstitial card if present
    if (question.afterCard) {
      setPendingNextIndex(nextIndex);
      setShowInterstitial(question.afterCard);
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => advanceTo(nextIndex, answers), 200);
  }

  function handleInterstitialContinue() {
    const nextIndex = pendingNextIndex!;
    setShowInterstitial(null);
    setPendingNextIndex(null);
    setIsTransitioning(true);
    setTimeout(() => advanceTo(nextIndex, answers), 200);
  }

  function handleMultiToggle(title: string) {
    const current = (answers.bookInterest ?? "").split(",").filter(Boolean);
    const next = current.includes(title)
      ? current.filter((t) => t !== title)
      : [...current, title];
    setAnswers((prev) => ({ ...prev, bookInterest: next.join(",") }));
  }

  const multiSelected = (answers.bookInterest ?? "").split(",").filter(Boolean);

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
            <span style={{ fontSize: 16, fontWeight: 700, color: "#1E293B" }}>
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
                      : "rgba(124,58,237,0.12)",
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
                            : "rgba(124,58,237,0.06)",
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

        {/* Interstitial / Phase Transition / Question — inline */}
        {showInterstitial ? (
          <InterstitialScreen
            card={showInterstitial}
            onContinue={handleInterstitialContinue}
          />
        ) : showTransition ? (
          <PhaseTransition
            phase={showTransition}
            onContinue={() => setShowTransition(null)}
          />
        ) : (
          <>
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
              color: "#1E293B",
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

          {/* Options — special rendering by question type */}
          {question.id === "ageSegment" ? (
            <AgeGrid selected={currentAnswer} onSelect={handleAnswer} />
          ) : question.type === "bookCheck" ? (
            <>
              <BookCheckQuestion question={question} selected={currentAnswer} onSelect={handleAnswer} />
              <button
                className="btn-primary"
                onClick={handleNext}
                disabled={!currentAnswer}
                style={{ opacity: currentAnswer ? 1 : 0.4, cursor: currentAnswer ? "pointer" : "not-allowed" }}
              >
                Devam Et →
              </button>
            </>
          ) : question.type === "bookMultiSelect" ? (
            <>
              <BookMultiSelect books={question.books!} selected={multiSelected} onToggle={handleMultiToggle} />
              <button
                className="btn-primary"
                onClick={handleNext}
                disabled={multiSelected.length === 0}
                style={{ opacity: multiSelected.length > 0 ? 1 : 0.4, cursor: multiSelected.length > 0 ? "pointer" : "not-allowed" }}
              >
                Devam Et →
              </button>
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginBottom: 32,
                }}
              >
                {question.options.map((opt) => {
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
                        border: `1px solid ${selected ? "#7C3AED" : "rgba(124,58,237,0.15)"}`,
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
            </>
          )}
        </div>
          </>
        )}
      </div>
    </main>
  );
}
