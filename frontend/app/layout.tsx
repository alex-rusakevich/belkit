import type { Metadata } from "next";
import "./globals.css";
import { getDictionary } from "@/lang/dictionary";
import QueryClientContextProvider from "./queryprovider";


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
        <QueryClientContextProvider>
          {children}
        </QueryClientContextProvider>
      </body>
    </html>
  );
}
