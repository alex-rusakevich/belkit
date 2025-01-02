import type { Metadata } from "next";
import "./globals.css";
import { getDictionary } from "@/lang/dictionary";

export const metadata: Metadata = {
  title: getDictionary().title,
  description: getDictionary().description,
  icons: [
    { rel: "icon", url: "/static/favicon.ico" }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="be">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
