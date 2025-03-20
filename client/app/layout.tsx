import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/global/Header";
import { UserProvider } from "@/app/context/UserContext";
import { Toaster } from "sonner";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Driton Gashi",
  description: "Food App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased relative`}>
        <UserProvider>
          <Header />
          {children}
          <Toaster position="top-center" richColors />
        </UserProvider>
      </body>
    </html>
  );
}