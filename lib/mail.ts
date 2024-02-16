import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorCodeEmail = async (
  email: string,
  token: string,
  name?: string | null
) => {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'NextAuth Two Factor Authentication Code',
      html: `<p>${
        name
          ? `Hello ${name}, here is your 2FA Code: <b>${token}</b>`
          : `Hello, here is your 2FA Code: ${token}`
      }</p>`,
    });
  } catch (error) {
    console.error(error);
    return {
      // TODO: changed verbage
      error: 'Unable to send 2FA email.',
    };
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
  name?: string | null
) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,      
      subject: 'NextAuth Password Reset Verification',
      html: `<p>${
        name
          ? `Hello ${name}, click <a href="${resetLink}">here</a> to reset your password.`
          : `Hello, click <a href="${resetLink}">here</a> to reset your password.`
      }</p>`,
    });
  } catch (error) {
    console.error(error);
    return { error: `Unable to send reset password email.` };
  }
};

export const sendVerificationEmail = async (
  email: string,
  token: string,
  name?: string | null
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
    console.error(error);
    return {
      error: 'Unable to send verification email.',
    };
  }
};
