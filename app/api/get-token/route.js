import { COOKIE_NAME_TOKEN, PERPUSTAKAAN_API_URL } from '@/app/constants';
import apiClient from '@/app/network/api_client';
import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const cookieStore = cookies();
  const tokenData = cookieStore.get(COOKIE_NAME_TOKEN);

  if (!tokenData) {
    return NextResponse.json(
      {
        message: 'Anda belum terautentikasi!',
      },
      {
        status: 401,
      }
    );
  }

  var { tokenExpires, token } = JSON.parse(tokenData.value);
  const currentTime = Date.now() / 1000;
  var tokenRefreshed = false;

  if (currentTime >= tokenExpires) {
    try {
      const response = await axios.post(
        `${PERPUSTAKAAN_API_URL}/v1/refresh-token`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      var { token, token_expires_in, refresh_expires_in } = response.data.data;
      await axios.post('/api/set-token', {
        tokenExpires: token_expires_in,
        refreshExpires: refresh_expires_in,
        token: token,
      });
      tokenRefreshed = true;
    } catch (error) {
      return NextResponse.json(
        {
          message: 'Anda belum terautentikasi!',
          messageRaw: error.toString(),
        },
        {
          status: 401,
        }
      );
    }
  }

  return NextResponse.json(
    {
      token: token,
      tokenRefreshed,
    },
    {
      status: 200,
    }
  );
}
