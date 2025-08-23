import type { Metadata } from "next";
import "../themes/styles/globals.scss";



export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your expenses with detailed analytics and insights",
  icons: {
    icon: './favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
