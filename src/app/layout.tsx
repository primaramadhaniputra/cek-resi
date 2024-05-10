import {Analytics} from "@vercel/analytics/react";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Cek Resi",
  description: "Cek nomor resi pengiriman paket",
  keywords: "resi, nomor, nomor resi, paket, jnt, jne, belanja online,",
  robots:
    "index, follow,resi, nomor, nomor resi, paket, jnt, jne, belanja online,",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Cek Resi</title>
        <meta name="description" content="Cek nomor resi pengiriman paket" />
        <meta
          name="keywords"
          content="resi, nomor, nomor resi, paket, jnt, jne, belanja online, tracking, delivery"
        />
        <meta property="og:title" content="Cek Resi" />
        <meta
          property="og:description"
          content="Cek nomor resi pengiriman paket"
        />
        <meta
          name="google-site-verification"
          content="HlyXKSMRB1N2kb9GwttIUnelISfSoWGzpE3-tDTkjoU"
        />
      </Head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
