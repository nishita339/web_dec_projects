// app/api/users/[id]/route.js (for App Router)
// or pages/api/users/[id].js for Pages Router

import { connectDB } from '@/lib/mongoose';
import User from '@/models/User';
import nodemailer from 'nodemailer';

export async function PUT(request, { params }) {
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ error: 'User ID is missing' }), { status: 400 });
  }

  await connectDB();

  try {
    // 1. Find user
    const user = await User.findById(id);
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // 2. Configure transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 3. Send email
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: user.email,
      subject: '🎉 Your Invitation Has Been Accepted!',
      html: `
        <p>Hi ${user.name},</p>
        <p>Your invitation has been <strong>accepted</strong>! 🎉</p>
        <p>We’re thrilled to have you with us.</p>
        <br>
        <p>Best regards,<br>Team Greetify</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // 4. Update visibility
    user.visibility = false;
    await user.save();

    return new Response(
      JSON.stringify({ message: 'Email sent and visibility updated successfully' }),
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Error in PUT /api/users/[id]:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send email and update user' }),
      { status: 500 }
    );
  }
}
