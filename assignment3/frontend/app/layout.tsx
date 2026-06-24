import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Assignment 3 Todo",
  description: "Next.js and FastAPI Todo app for assignment 3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
