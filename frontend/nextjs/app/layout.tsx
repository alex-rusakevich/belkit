import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "БелКіт",
  description: "Беларуска-кітайскі анлайн слоўнік — гэта адкрытая анлайн-платформа для дапамогі перакладчыкам і ўмацавання культурнай сувязі Беларусі і Кітая",
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
