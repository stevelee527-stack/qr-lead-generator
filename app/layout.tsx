import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "QR Lead Generator",
  description: "Dynamic QR code creator with landing page builder and lead management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-sand-100 text-sand-900 antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: '1rem',
              background: '#fff',
              color: '#332e28',
              boxShadow: '0 4px 25px -5px rgba(0, 0, 0, 0.06)',
              border: '1px solid #e8e4dd',
            },
          }}
        />
      </body>
    </html>
  );
}
