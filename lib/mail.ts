import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name?: string
) => {
  // change to actual domain if it will be used to send email to others
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'NextAuth Email Verification',
      html: `<p>${
        name
          ? `Hello ${name}, click <a href="${confirmLink}">here</a> to verify your email.`
          : `Hello, click <a href="${confirmLink}">here</a> to verify your email.`
      }</p>`,   
    });
  } catch (error) {
    return {
      error: 'Unable to send verification email.',
    };
  }
};
