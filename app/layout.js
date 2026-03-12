import "./globals.css";
import "./fanta.css"
import Head from "./Head";
import Link from "next/link";
import GoTo from "@/components/Goto";

export const metadata = {
  title: "Expenny · The Subscription Tracker",
  description: "Track all your subscription analytics!",
};

export default function RootLayout({ children }) {
  const header = (
    <header>
      <div>
        <Link href={'/'}>
        <h1 className="text-gradient">Expenny</h1>
        </Link>
        <p>The Subscription Tracker</p>
      </div>

      <GoTo />
    </header>
  )

  const footer = (
    <footer>
      <div className="hard-line" />
    </footer>
  )

  return (
    <html lang="en">
      <Head />
      <body >
        {header}
        <div className="full-line" />
        <main>
          {children}
        </main>
        {footer}
      </body>
    </html>
  );
}
