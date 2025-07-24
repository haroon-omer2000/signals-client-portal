import { Resend } from 'resend'

import { WelcomeEmailData, EmailResponse } from '@/types/client.types'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(data: WelcomeEmailData): Promise<EmailResponse> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured, skipping email send')
      return {
        success: true,
        messageId: 'skipped-no-api-key',
      }
    }

    const { data: result, error } = await resend.emails.send({
      from: 'onboarding@yourdomain.com', // Replace with your verified domain
      to: [data.to],
      subject: `Welcome to our Accountancy Firm, ${data.clientName}!`,
      html: generateWelcomeEmailHTML(data),
    })

    if (error) {
      console.error('Resend email error:', error)
      return {
        success: false,
        error: error.message || 'Failed to send email',
      }
    }

    return {
      success: true,
      messageId: result?.id,
    }
  } catch (error) {
    console.error('Email service error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown email error',
    }
  }
}

function generateWelcomeEmailHTML(data: WelcomeEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Our Accountancy Firm</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #6c757d; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome, ${data.clientName}!</h1>
            <p>We're excited to have ${data.businessName} as our client</p>
          </div>
          <div class="content">
            <h2>Thank you for choosing our accountancy services!</h2>
            <p>We've successfully received your information and set up your account in our client portal.</p>
            
            <p><strong>What's next?</strong></p>
            <ul>
              <li>Our team will review your business details</li>
              <li>You'll receive a follow-up call within 1-2 business days</li>
              <li>We'll schedule an initial consultation to discuss your accounting needs</li>
            </ul>
            
            <a href="${process.env.NEXT_PUBLIC_APP_URL}" class="button">Visit Client Portal</a>
            
            <p>If you have any immediate questions, feel free to reply to this email or call us at (555) 123-4567.</p>
            
            <p>Best regards,<br>Your Accountancy Team</p>
          </div>
          <div class="footer">
            <p>This email was sent because you were added as a client to our portal.</p>
          </div>
        </div>
      </body>
    </html>
  `
} 