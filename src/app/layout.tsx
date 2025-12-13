export const metadata = {
  title: "Oral Cavity Staging Ninja",
  description: "AJCC8 oral cavity staging practice",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
