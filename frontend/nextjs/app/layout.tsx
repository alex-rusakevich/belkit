import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
