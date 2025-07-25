import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'studyProgram', 
      'yearOfStudy', 'interests', 'experience', 'motivation', 'howDidYouHear'
    ]
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Log the application
    console.log('New join application:', {
      name: `${body.firstName} ${body.lastName}`,
      email: body.email,
      studyProgram: body.studyProgram,
      yearOfStudy: body.yearOfStudy,
      interests: body.interests,
      experience: body.experience,
      motivation: body.motivation,
      howDidYouHear: body.howDidYouHear,
      additionalInfo: body.additionalInfo,
      submittedAt: new Date().toISOString()
    })

    // Send email notification to BSA team
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'BSA Website <noreply@bsa-epfl.ch>',
          to: ['bsa@epfl.ch'], // Replace with actual BSA email
          subject: `New BSA Join Application: ${body.firstName} ${body.lastName}`,
          html: `   
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1f273a;">New BSA Join Application</h2>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1f273a;">Applicant Information</h3>
                <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
                <p><strong>Email:</strong> ${body.email}</p>
                <p><strong>Student ID:</strong> ${body.studentId || 'Not provided'}</p>
                <p><strong>Study Program:</strong> ${body.studyProgram}</p>
                <p><strong>Year of Study:</strong> ${body.yearOfStudy}</p>
              </div>

              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1f273a;">Interests & Experience</h3>
                <p><strong>Areas of Interest:</strong></p>
                <ul>
                  ${body.interests.map((interest: string) => `<li>${interest}</li>`).join('')}
                </ul>
                <p><strong>Experience Level:</strong> ${body.experience}</p>
              </div>

              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1f273a;">Motivation</h3>
                <p>${body.motivation}</p>
              </div>

              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #1f273a;">Additional Information</h3>
                <p><strong>How they heard about BSA:</strong> ${body.howDidYouHear}</p>
                ${body.additionalInfo ? `<p><strong>Additional Info:</strong> ${body.additionalInfo}</p>` : ''}
              </div>

              <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #2d5a2d;">
                  <strong>Application submitted:</strong> ${new Date().toLocaleString()}
                </p>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
                <p style="color: #666; font-size: 14px;">
                  This is an automated notification from the BSA website. 
                  Please respond to the applicant at: ${body.email}
                </p>
              </div>
            </div>
          `
        })
        
        console.log('Email notification sent successfully')
      } catch (emailError) {
        console.error('Error sending email notification:', emailError)
        // Don't fail the whole request if email fails
      }
    } else {
      console.log('RESEND_API_KEY not configured, skipping email notification')
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Application submitted successfully'
    })
    
  } catch (error) {
    console.error('Error processing join application:', error)
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    )
  }
} 