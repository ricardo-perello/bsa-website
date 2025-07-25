import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message']
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Log the contact form submission
    console.log('New contact form submission:', {
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
      submittedAt: new Date().toISOString()
    })

    // Send email notification to BSA team
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'BSA Website <noreply@bsa-epfl.ch>',
          to: ['bsa@epfl.ch'], // Replace with actual BSA email
          subject: `BSA Contact Form: ${body.subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1f273a;">New Contact Form Submission</h2>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1f273a;">Contact Information</h3>
                <p><strong>Name:</strong> ${body.name}</p>
                <p><strong>Email:</strong> ${body.email}</p>
                <p><strong>Subject:</strong> ${body.subject}</p>
              </div>

              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1f273a;">Message</h3>
                <p style="white-space: pre-wrap;">${body.message}</p>
              </div>

              <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #2d5a2d;">
                  <strong>Message submitted:</strong> ${new Date().toLocaleString()}
                </p>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                <p style="color: #666; font-size: 14px;">
                  This is an automated notification from the BSA website contact form. 
                  Please respond to the sender at: ${body.email}
                </p>
              </div>
            </div>
          `
        })
        
        console.log('Contact form email notification sent successfully')
      } catch (emailError) {
        console.error('Error sending contact form email notification:', emailError)
        // Don't fail the whole request if email fails
      }
    } else {
      console.log('RESEND_API_KEY not configured, skipping email notification')
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Message sent successfully'
    })
    
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
} 