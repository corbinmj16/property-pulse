import "./globals.css";

export const metadata = {
  title: "Property Pulse",
  description: "Find the rental property that's right for you.",
  keywords: "rental, property, real estate",
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
