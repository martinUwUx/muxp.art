import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muxp Art",
  description: "Muxp's personal website",
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
