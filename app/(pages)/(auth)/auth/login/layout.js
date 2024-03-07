// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'e-Maca - Login',
  description: 'Halaman untuk login e-Maca',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
