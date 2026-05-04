import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://muxp.art"),
  title: "Muxp Art",
  description: "Portafolio y sitio web personal de Muxp",
  openGraph: {
    title: "Muxp Art",
    description: "Portafolio y sitio web personal de Muxp",
    url: "https://muxp.art",
    siteName: "Muxp Art",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muxp Art",
    description: "Portafolio y sitio web personal de Muxp",
    creator: "@muxp_art", // Cámbialo por tu usuario real de Twitter si tienes
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
