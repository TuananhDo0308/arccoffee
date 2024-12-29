import { NextResponse } from 'next/server';
import Redis from 'ioredis';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const redis = new Redis(process.env.REDIS_URL);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  try {
    // Generate a unique reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Store the reset token in Redis with TTL (1 hour expiration)
    await redis.set(`resetToken:${email}`, resetToken, 'EX', 3600);

    // Create reset password link
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email with reset password link
    await transporter.sendMail({
      from: '"Your App" <noreply@yourapp.com>',
      to: email,
      subject: 'Reset Your Password',
      text: `Click on this link to reset your password: ${resetLink}`,
      html: `<p>Click on this link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
    });

    return NextResponse.json({ message: 'Password reset email sent' }, { status: 200 });
  } catch (error) {
    console.error('Error sending reset password email:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

