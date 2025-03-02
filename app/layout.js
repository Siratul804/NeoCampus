import { SidebarPage } from "@/components/Sidebar";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NeoFetchHackathon",
  description: "Neo Fetch Hackathon",
  metadataBase: new URL("http://localhost:3000/"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
  openGraph: {
    images: "",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <div className="flex h-screen bg-[#e5e7eb]">
            <SidebarPage />
            <div className="flex flex-col flex-1 overflow-hidden">
              <main className="flex-1 overflow-y-auto px-4 py-0 ">
                <Navbar/>
                {children}
              </main>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
