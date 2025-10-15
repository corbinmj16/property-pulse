import "./globals.css";
import { Lexend } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Property Pulse",
  description: "Find the rental property that's right for you.",
  keywords: "rental, property, real estate",
};

const MainLayout = ({ children }) => {
  return (
    <html className={lexend.className}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
