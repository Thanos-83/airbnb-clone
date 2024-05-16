import { Resend } from 'resend';
import MagicLinkEmail from '../components/Email/MagicLinkEmail.jsx';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationRequest(params) {
  // console.log('Params in sendVerificationRequest: ', params);
  const { identifier, url } = params;
  try {
    const data = await resend.emails.send({
      from: 'My Company Name <onboarding@resend.dev>',
      to: ['th.sbonias@gmail.com'],
      subject: 'Hello dear customer!',
      react: <MagicLinkEmail identifier={identifier} url={url} />,
    });
    // console.log('Data from sendVerificationRequest: ', data);
    if (data.error) {
      return new Error(data.error.message);
    }
    return { success: true, data };
  } catch (error) {
    return new Error('Failed to send the verification Email');
  }
}
