import "./globals.css";
import "./fanta.css"

export const metadata = {
  title: "Expenny · The Subscription Tracker",
  description: "Track all your subscription analytics!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
