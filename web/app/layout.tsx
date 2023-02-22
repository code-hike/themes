import "@/styles/globals.css";
import { Inter as FontSans } from "@next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="dark">
      <head />
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-800 dark:text-slate-50">
        <style
          dangerouslySetInnerHTML={{
            __html: `:root { --font-sans: ${fontSans.style.fontFamily}; }`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
