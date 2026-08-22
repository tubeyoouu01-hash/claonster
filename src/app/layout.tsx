import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fairhaven Capital Partners",
  description: "Sample lending brokerage website — portfolio demonstration only.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
