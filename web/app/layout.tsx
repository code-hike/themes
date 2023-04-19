import "../styles/globals.css";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-600 dark:text-slate-50">
        {children}
      </body>
    </html>
  );
}