import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { form, selectedServices, totalPrice } = await request.json();

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or use SMTP settings
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS, // your app password
      },
    });

    // Format services list for email
    const servicesList = selectedServices
      .map((s: any) => `${s.name} - ${s.price}`)
      .join('\n');

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: form.email, // Send to customer
      bcc: process.env.EMAIL_USER, // Also send to salon
      subject: 'Jumuia Salon - Booking Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #171717; padding: 30px; text-align: center;">
            <h1 style="color: #fbbf24; margin: 0;">Jumuia Salon</h1>
            <p style="color: white; margin: 5px 0 0;">Est. 2026</p>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #171717; margin-top: 0;">Booking Confirmation</h2>
            
            <p>Dear <strong>${form.name}</strong>,</p>
            <p>Thank you for booking with Jumuia Salon. We're looking forward to seeing you!</p>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #fbbf24; margin-top: 0;">Appointment Details</h3>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666;">Date:</td>
                  <td style="padding: 8px 0; font-weight: bold;">${form.date}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Time:</td>
                  <td style="padding: 8px 0; font-weight: bold;">${form.time}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Stylist:</td>
                  <td style="padding: 8px 0; font-weight: bold;">${form.stylist}</td>
                </tr>
              </table>
              
              <h3 style="color: #fbbf24; margin: 20px 0 10px;">Services</h3>
              <table style="width: 100%; border-collapse: collapse;">
                ${selectedServices
                  .map(
                    (s: any) => `
                  <tr>
                    <td style="padding: 5px 0; color: #666;">${s.name}</td>
                    <td style="padding: 5px 0; font-weight: bold; text-align: right;">${s.price}</td>
                  </tr>
                `
                  )
                  .join('')}
                <tr>
                  <td style="padding: 15px 0 5px; border-top: 2px solid #fbbf24; font-weight: bold;">Total</td>
                  <td style="padding: 15px 0 5px; border-top: 2px solid #fbbf24; font-weight: bold; text-align: right; color: #fbbf24;">
                    ${formatKsh(totalPrice)}
                  </td>
                </tr>
              </table>
            </div>
            
            ${form.notes ? `
              <div style="background-color: #fff3e0; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h4 style="color: #fbbf24; margin: 0 0 10px;">Your Notes:</h4>
                <p style="margin: 0; color: #666;">${form.notes}</p>
              </div>
            ` : ''}
            
            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #2e7d32; font-size: 14px;">
                <strong>📍 Important:</strong> Please arrive 5 minutes before your appointment. 
                Need to reschedule? Contact us at +254 700 123 456.
              </p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              We can't wait to see you!<br>
              <strong>The Jumuia Salon Team</strong>
            </p>
          </div>
          
          <div style="background-color: #171717; padding: 20px; text-align: center; color: white; font-size: 12px;">
            <p style="margin: 0;">Jumuia Salon · Nairobi, Kenya · +254 700 123 456</p>
            <p style="margin: 10px 0 0; color: #999;">© 2026 Jumuia Salon. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}

function formatKsh(amount: number): string {
  return `Ksh ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}