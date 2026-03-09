import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SleepIQ — Uyku Yaşını Keşfet",
  description: "Bilimsel uyku analizi ile uyku yaşını öğren ve kişisel planınla daha iyi uyu.",
  openGraph: {
    title: "SleepIQ — Uyku Yaşını Keşfet",
    description: "Ücretsiz 2 dakikalık test ile uyku yaşını hesapla.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <div className="ambient-purple" />
        {children}
      </body>
    </html>
  );
}
