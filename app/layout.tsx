import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Preloader from "@/components/site/Preloader";
import Cursor from "@/components/site/Cursor";

export const metadata: Metadata = {
  title: "Team Order. All Volleyball.",
  description:
    "The order experience for coaches and club directors. Volleyball only. Built for teams and clubs where average is not good enough.",
};

export const viewport: Viewport = {
  themeColor: "#0e0f10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <div className="grain" aria-hidden />
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
