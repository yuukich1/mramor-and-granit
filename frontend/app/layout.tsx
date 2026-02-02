import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Мрамор и Гранит",
  description: "Закажите памятник из натурального гранита и мрамора в компании «Мрамор и Гранит». Работаем с 2009 года. Гарантия качества, собственное производство, установка и благоустройство. Оставьте заявку на сайте!",


  keywords: [
    "изготовление памятников Самара",
    "памятники из гранита цена",
    "купить надгобие",
    "мемориальные комплексы",
    "заказать памятник на могилу"
  ],

  openGraph: {
    title: "Мрамор и Гранит",
    description: "Профессиональное изготовление памятников с 2009 года. Посмотрите наш каталог и рассчитайте стоимость на сайте.",
    siteName: "Мрамор и Гранит",
    images: [
      {
        url: "/site-preview.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ru_RU",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
