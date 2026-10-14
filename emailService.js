import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Creates and returns the helper transporter for Nodemailer.
 */
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn("⚠️ SMTP configuré de manière incomplète dans le fichier .env. Les e-mails d'admission seront affichés dans la console.");
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for others
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Sends a highly professional university admission congratulatory email.
 * 
 * @param {string} toEmail 
 * @param {object} studentData - Contains firstName, lastName, choice, level, creditsObtained, etc.
 */
export async function sendAdmissionEmail(toEmail, studentData) {
  const { firstName, lastName, choice, level, creditsObtained } = studentData;
  const recipientEmail = toEmail || studentData.email;

  if (!recipientEmail) {
    console.error("❌ Impossible d'envoyer l'e-mail : Adresse e-mail du destinataire non fournie.");
    return;
  }

  const subject = `🎓 Félicitations pour votre admission directe à l'Université — UniGate`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          color: #1e293b;
          background-color: #f8fafc;
          padding: 20px;
          margin: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }
        .header {
          background-color: #0f172a;
          color: #ffffff;
          padding: 40px 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -0.025em;
        }
        .header p {
          margin: 8px 0 0 0;
          font-size: 14px;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .content {
          padding: 40px 30px;
          line-height: 1.6;
        }
        .greeting {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .badge {
          display: inline-block;
          background-color: #dcfce7;
          color: #15803d;
          font-weight: bold;
          padding: 6px 12px;
          border-radius: 9999px;
          font-size: 13px;
          margin-top: 5px;
        }
        .details-box {
          background-color: #f1f5f9;
          border-radius: 12px;
          padding: 20px;
          margin: 25px 0;
          border: 1px solid #e2e8f0;
        }
        .details-box h3 {
          margin-top: 0;
          font-size: 14px;
          color: #64748b;
          border-bottom: 1px solid #cbd5e1;
          padding-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 14px;
        }
        .detail-row:last-child {
          margin-bottom: 0;
        }
        .detail-label {
          color: #64748b;
          font-weight: 500;
        }
        .detail-value {
          font-weight: 600;
          color: #0f172a;
        }
        .congratulations {
          font-size: 15px;
          color: #334155;
          margin-bottom: 20px;
        }
        .footer {
          background-color: #f8fafc;
          padding: 20px 30px;
          text-align: center;
          font-size: 12px;
          color: #64748b;
          border-top: 1px solid #e2e8f0;
        }
        .footer p {
          margin: 4px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>UniGate</h1>
          <p>Service des Admissions Académiques</p>
        </div>
        <div class="content">
          <div class="greeting">Félicitations M./Mme ${firstName} ${lastName},</div>
          
          <p class="congratulations">
            Nous avons le grand plaisir de vous informer que votre dossier d'inscription pour l'année universitaire a été examiné par notre jury académique. 
            Au vu de vos excellents résultats et des crédits requis validés, votre admission directe a été officiellement prononcée !
          </p>

          <span class="badge">✓ ADMISSION DIRECTE PRONONCÉE</span>

          <div class="details-box">
            <h3>Détails du Parcours Universitaire</h3>
            <div class="detail-row">
              <span class="detail-label">Étudiant :</span>
              <span class="detail-value">${firstName} ${lastName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Niveau d'admission :</span>
              <span class="detail-value">${level}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Filière / Spécialisation :</span>
              <span class="detail-value">${choice}</span>
            </div>
            ${creditsObtained ? `
            <div class="detail-row">
              <span class="detail-label">Nombre de crédits ECTS d'origine :</span>
              <span class="detail-value">${creditsObtained} / 60 ECTS</span>
            </div>
            ` : ''}
            <div class="detail-row">
              <span class="detail-label">Décision Académique :</span>
              <span class="detail-value" style="color: #15803d;">Admis</span>
            </div>
          </div>

          <p style="margin-top: 25px;">
            Vous recevrez sous peu le calendrier officiel des inscriptions pédagogiques ainsi que les formalités administratives à compléter pour l'obtention de votre carte d'étudiant définitive.
          </p>

          <p style="font-weight: 500; margin-top: 20px;">
            Encore toutes nos félicitations pour cette étape brillante. Nous vous souhaitons une excellente réussite dans votre nouveau cursus !
          </p>
          
          <p style="margin-top: 30px; color: #64748b; font-size: 13px;">
            Cordialement,<br>
            <strong>Le Bureau des Inscriptions & de la Scolarité</strong><br>
            Plateforme UniGate
          </p>
        </div>
        <div class="footer">
          <p>Ce message a été envoyé de manière automatique par la plateforme institutionnelle UniGate d'Inscription Universitaire.</p>
          <p>© 2026 UniGate — Tous droits réservés.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `Félicitations ${firstName} ${lastName} ! Votre admission directe en ${level} (${choice}) a été officiellement validée. Nous vous félicitons sincèrement pour cette étape brillante.`;

  const transporter = getTransporter();

  if (!transporter) {
    console.log("======================================== EMAIL SIMULATEUR ========================================");
    console.log(`Destinataire : ${recipientEmail}`);
    console.log(`Sujet : ${subject}`);
    console.log(`Message : \n${textContent}`);
    console.log("==================================================================================================");
    return { success: true, simulated: true };
  }

  try {
    const info = await transporter.sendMail({
      from: '"UniGate Admissions" <no-reply@unigate.dz>',
      to: recipientEmail,
      subject,
      text: textContent,
      html: htmlContent,
    });
    console.log(`✨ E-mail d'admission envoyé avec succès à ${recipientEmail}. ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`❌ Erreur lors de l'envoi de l'e-mail à ${recipientEmail}:`, error);
    throw error;
  }
}