"use client"
import NavBar from "@/components/NavBar";
import "./globals.css";
import { usePathname } from "next/navigation";



export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
  
}>) {
	const pathname = usePathname();
	const hideNavBar = pathname === "/auth/signin" || pathname === "/auth/signup";


  return (
    <html lang="en">
      <body
      >
		 <div className="min-h-screen w-full bg-gradient-to-br">
		 <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 xl:px-32">
		 {!hideNavBar && <NavBar />}
        {children}
		</div>
		</div>
      </body>
    </html>
  );
}
