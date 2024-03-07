// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'e-Maca - Register',
  description: 'Halaman untuk register e-Maca',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
