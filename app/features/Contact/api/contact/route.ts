import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { form } = await request.json();

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content to customer
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: form.email,
      bcc: process.env.EMAIL_USER, // Also send to salon
      subject: 'Jumuia Beauty Studio - We Received Your Message',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #171717; padding: 30px; text-align: center;">
            <h1 style="color: #fbbf24; margin: 0;">Jumuia Beauty Studio</h1>
            <p style="color: white; margin: 5px 0 0;">Est. 2026</p>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #171717; margin-top: 0;">Thank You for Reaching Out!</h2>
            
            <p>Dear <strong>${form.name}</strong>,</p>
            <p>We've received your message and we're excited to connect with you! One of our team members will get back to you within 1 hour during our business hours.</p>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #fbbf24; margin-top: 0;">Your Message Details</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; width: 100px;">Name:</td>
                  <td style="padding: 8px 0; font-weight: bold;">${form.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Email:</td>
                  <td style="padding: 8px 0; font-weight: bold;">${form.email}</td>
                </tr>
                ${form.phone ? `
                <tr>
                  <td style="padding: 8px 0; color: #666;">Phone:</td>
                  <td style="padding: 8px 0; font-weight: bold;">${form.phone}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; color: #666;">Subject:</td>
                  <td style="padding: 8px 0; font-weight: bold;">${form.subject || 'General Enquiry'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Message:</td>
                  <td style="padding: 8px 0; font-weight: bold;">${form.message}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #fff3e0; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #b45309; font-size: 14px;">
                <strong>⏰ Our Business Hours:</strong><br>
                Monday – Friday: 8:00 AM – 7:00 PM<br>
                Saturday: 9:00 AM – 6:00 PM<br>
                Sunday: 2:00 PM – 4:00 PM
              </p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              We can't wait to chat with you!<br>
              <strong>The Jumuia Beauty Studio Team</strong>
            </p>
          </div>
          
          <div style="background-color: #171717; padding: 20px; text-align: center; color: white; font-size: 12px;">
            <p style="margin: 0;">Jumuia Beauty Studio · Nairobi, Kenya · +254 743 861 565</p>
            <p style="margin: 10px 0 0; color: #999;">© 2026 Jumuia Beauty Studio. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(customerMailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}