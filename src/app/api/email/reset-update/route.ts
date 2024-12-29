import { NextResponse } from 'next/server';
import Redis from 'ioredis';
import { apiLinks, httpClient } from '@/src/utils';

const redis = new Redis(process.env.REDIS_URL);

export async function PUT(req: Request) {
  const { token, email, password } = await req.json();

  if (!token || !email || !password) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    // Verify the token
    const storedToken = await redis.get(`resetToken:${email}`);
    if (!storedToken || storedToken !== token) {
      return NextResponse.json({ message: 'Invalid or expired reset token' }, { status: 400 });
    }

    // Token is valid, call your API to update the password
    const response = await httpClient.patch({
      url: apiLinks.authen.updatePassword,
      data: { login: email, password: password },
    });

    // Check response status
    if (response.status !== 200) {
      console.error('Failed to update password:', response.data);
      return NextResponse.json(
        { message: 'Failed to reset password. Please try again.' },
        { status: response.status }
      );
    }

    // Delete the used token
    await redis.del(`resetToken:${email}`);

    return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json({ message: 'Failed to reset password' }, { status: 500 });
  }
}
