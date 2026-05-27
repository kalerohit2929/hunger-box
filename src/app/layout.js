import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hunger Box",
  description: "Food delivery app",
  icons: {
    icon: "/logo.png",  // ← change here too
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="icon" href="/logo1.svg" type="image/svg+xml" />
         */}
        {/* <link rel="icon" href="/logo1.svg" type="image/svg+xml" sizes="any" />
         */}
         // To this
<link rel="icon" href="/logo.png" type="image/png" />
        <link rel="icon" href="/favicon.ico" sizes="16x16 32x32" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
