import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Redis from 'ioredis';

// Khởi tạo Redis client
const redis = new Redis(process.env.REDIS_URL);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  // Tạo mã xác minh
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Lưu mã xác minh vào Redis với TTL (thời gian sống)
    await redis.set(`verificationCode:${email}`, verificationCode, 'EX', 300); // TTL = 300 giây (5 phút)

    // Cấu hình Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Gửi email với mã xác minh
    await transporter.sendMail({
      from: '"Your App" <noreply@yourapp.com>',
      to: email,
      subject: 'Verify Your Email',
      text: `Your verification code is: ${verificationCode}`,
      html: `<p>Your verification code is: <strong>${verificationCode}</strong></p>`,
    });

    return NextResponse.json({ message: 'Verification email sent' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email or storing code:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
