import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { COOKIE_NAME_TOKEN } from './app/constants';
// import { ApiService } from './app/network/services';
const protectedRoutes = [
  '/account',
  '/buku',
  '/explore',
  '/koleksi',
  '/peminjaman',
];

const authRoutes = ['/auth/login', '/auth/register'];

export async function middleware(req) {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME_TOKEN);
  const nextUrl = req.nextUrl.pathname;

  if (nextUrl == '/') {
    if (token) {
      return NextResponse.redirect(new URL('/explore', req.url));
    }
    return NextResponse.redirect(new URL('auth/login', req.url));
  } else if (authRoutes.includes(nextUrl) && token) {
    return NextResponse.redirect(new URL('/explore', req.url));
  }

  if (!token && protectedRoutes.includes(nextUrl)) {
    return NextResponse.redirect(new URL('/', req.url));
  }
}
