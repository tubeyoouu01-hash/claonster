"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Navbar from "../../components/navbar";
import { usePathname } from "next/navigation";
import Navbar from "../../../components/navbar";
import { Footer } from "../../../components/footer";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   // @ts-ignore: for demonstration, you may need proper typing

const pathname = usePathname();
// app/layoutConfig.ts
//  const pageFeatures = [
//   { path: "/", mainHeader: false,},
//   { path: "/about", header: true, hero: false },
//   { path: "/contact", header: true, hero: false },
//   { path: "/login", header: false, hero: false },
// ];

// const config = pageFeatures.find((p) => p.path === pathname) || {
//    mainHeader:true
//   };

  const hideMainHeader = (children as any).type;

console.log(hideMainHeader)

  return (
  
      <div
        className={`min-h-screen flex flex-col`}
      >

        {/* <Navbar/> */}
      <main className="flex-1 ">
        {children}
      </main>
        {/* <div className="mt-auto " ><Footer/></div> */}
      </div>
 
  );
}
