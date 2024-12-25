import { NextResponse } from 'next/server';
import Redis from 'ioredis';

// Khởi tạo Redis client
const redis = new Redis(process.env.REDIS_URL);

export async function POST(req: Request) {
  const { email, code } = await req.json();

  if (!email || !code) {
    return NextResponse.json(
      { message: 'Email and code are required' },
      { status: 400 }
    );
  }

  try {
    // Lấy mã xác minh từ Redis
    const storedCode = await redis.get(`verificationCode:${email}`);

    if (!storedCode) {
      return NextResponse.json(
        { success: false, message: 'Verification code expired or not found' },
        { status: 400 }
      );
    }

    if (storedCode === code) {
      // Xóa mã sau khi xác minh thành công
      await redis.del(`verificationCode:${email}`);
      return NextResponse.json(
        { success: true, message: 'Verification successful' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid verification code' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error verifying code:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
