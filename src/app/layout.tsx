import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "~/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "App Management",
  description: "Control your to-do tasks in one place",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
