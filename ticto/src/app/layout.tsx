import type { Metadata } from "next";
import "./globals.scss";
export const metadata: Metadata = {
  title: "TICTO Finance",
  description: "Feito por Victor Santos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="favicon.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
