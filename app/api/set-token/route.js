import { COOKIE_NAME_TOKEN } from '@/app/constants';
import cookie from 'cookie';

export async function POST(req) {
  const { tokenExpires, refreshExpires, token } = await req.json();
  const cookieObj = JSON.stringify({ tokenExpires, refreshExpires, token });

  const serialized = cookie.serialize(COOKIE_NAME_TOKEN, cookieObj, {
    httpOnly: true,
    secure: process.env.NODE_ENV == 'production',
    sameSite: 'strict',
    maxAge: refreshExpires,
    path: '/',
  });

  return new Response(
    JSON.stringify({
      message: 'Berhasil Login!',
    }),
    {
      headers: {
        'Set-Cookie': serialized,
      },
    }
  );
}
