import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import '@stream-io/video-react-sdk/dist/css/styles.css'
import 'react-datepicker/dist/react-datepicker.css'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EnderMeet - Secure, Real-Time Video Conferencing",
  description: "EnderMeet is a secure, real-time video conferencing application with a focus on user experience and flexibility. Hold seamless meetings with low latency and no time restrictions.",
  keywords: [
    "EnderMeet",
    "Endermeet",
    "endermeet",
    "Video Conferencing",
    "Efficient",
    "Secure Video Conferencing",
    "Real-time Video Meetings",
    "Seamless Online Meetings",
    "Low Latency Video Calls",
    "Unlimited Meeting Duration",
    "Video Conference Application",
    "Online Collaboration Tool",
    "Virtual Meeting Software",
    "HD Video Conferencing",
    "Cross-Platform Video Meetings",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: "/icons/endermeet-logo.svg",
            socialButtonsVariant: "iconButton",
          },
          variables: {
            colorText: "#fff",
            colorPrimary: "#0E78F9",
            colorBackground: "#1c1f2e",
            colorInputBackground: "#252a41",
            colorInputText: "#fff",
          },
        }}
      >
        <body className={`${inter.className} bg-dark-2`}>
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
