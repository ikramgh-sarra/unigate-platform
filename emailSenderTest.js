import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const to = process.env.TEST_TO || 'PUT_EMAIL_HERE';
const host = process.env.SMTP_HOST || 'smtp.gmail.com';
const port = parseInt(process.env.SMTP_PORT || '465', 10);
const user = process.env.SMTP_USER || 'unigateuniv@gmail.com';
const pass = process.env.SMTP_PASS || 'hayg cbml eadp cpxs';

console.log('🔎 TEST email config =>', { to, host, port, secure: port === 465, user });


if (!to || to === 'PUT_EMAIL_HERE') {
  console.error('TEST_TO is missing. Set: TEST_TO="your_email@gmail.com"');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: { user, pass },
  tls: { rejectUnauthorized: false },
});

const subject = 'UniGate EMAIL TEST';
const html = `<!doctype html><html><body><h3>Test email UniGate</h3><p>Si vous recevez ce message, SMTP + envoi fonctionnent.</p></body></html>`;
const text = 'Test email UniGate. Si vous recevez ce message, SMTP + envoi fonctionnent.';

try {
  const info = await transporter.sendMail({
    from: '"UniGate Admissions" <unigateuniv@gmail.com>',
    to,
    subject,
    text,
    html,
  });
  console.log('✅ Mail accepté par le serveur SMTP. messageId:', info.messageId);
} catch (err) {
  console.error('❌ Envoi TEST échoué:', err);
  process.exit(1);
}

