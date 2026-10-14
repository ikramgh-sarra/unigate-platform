import dotenv from "dotenv";
// 1. Charger dotenv immédiatement au sommet absolu du fichier
dotenv.config();

// 2. Forcer la correction de l'URL système AVANT tout chargement de module
if (process.env.DATABASE_URL) {
  if (process.env.DATABASE_URL.startsWith("postgres://")) {
    process.env.DATABASE_URL = process.env.DATABASE_URL.replace("postgres://", "postgresql://");
  } else if (process.env.DATABASE_URL.startsWith("postgresql://")) {
    process.env.DATABASE_URL = process.env.DATABASE_URL.replace("postgresql://", "postgresql://");
  }
}
if (process.env.DB_URL) {
  if (process.env.DB_URL.startsWith("postgres://")) {
    process.env.DB_URL = process.env.DB_URL.replace("postgres://", "postgresql://");
  } else if (process.env.DB_URL.startsWith("postgresql://")) {
    process.env.DB_URL = process.env.DB_URL.replace("postgresql://", "postgresql://");
  }
}

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import cors from "cors";
import nodemailer from "nodemailer";

let prisma = null;

async function initPrisma() {
  if (prisma) return prisma;

  try {
    const { PrismaClient } = await import("./generated/prisma/index.js");
    prisma = new PrismaClient();
    return prisma;
  } catch (err) {
    prisma = null;
    return null;
  }
}

import { students as initialSeed } from "./seed.js";

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 5000;

  app.use(cors());
  app.use(express.json({ limit: "50mb" }));

  const dbPath = path.join(process.cwd(), "applications.json");
  let applications = [];

  // Read local database json file
  if (fs.existsSync(dbPath)) {
    try {
      applications = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    } catch (e) {
      applications = [...initialSeed];
    }
  } else {
    applications = [...initialSeed];
    fs.writeFileSync(dbPath, JSON.stringify(applications, null, 2));
  }

  const refreshApplications = () => {
    if (fs.existsSync(dbPath)) {
      try {
        applications = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
      } catch (e) {}
    }
  };

  // Configuration de Nodemailer pour l'envoi d'emails 
  function getTransporter() {
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "465", 10);
    const user = process.env.SMTP_USER || "unigateuniv@gmail.com";
    const pass = process.env.SMTP_PASS || "hayg cbml eadp cpxs";

    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
    });
  }

  const transporter = getTransporter();

  // Vérification de la configuration au démarrage
  if (transporter) {
    transporter.verify(function (error) {
      if (error) {
        console.log("❌ Erreur de configuration Email:", error);
      } else {
        console.log("✅ Serveur SMTP prêt - Authentification réussie");
      }
    });
  } else {
    console.warn(
      "⚠️ SMTP non configuré (SMTP_HOST/SMTP_USER/SMTP_PASS manquants). Les emails ne seront pas envoyés."
    );
  }

  /**
   * Envoie un e-mail professionnel selon le statut de l'admission.
   */
  async function sendStatusEmail(email, studentData, status) {
    console.log("🧾 sendStatusEmail() request =>", {
      to: email,
      status,
      student: {
        firstName: studentData?.firstName,
        lastName: studentData?.lastName,
        level: studentData?.level,
        choice: studentData?.choice,
      },
    });

    const isAdmis = ["Admis", "Validé", "Valide", "Admis avec dette"].includes(status);
    const isEnCours = ["En cours de traitement", "En cours", "EN_ATTENTE", "EN_COURS"].includes(status);
    const isAjourne = ["Ajourné", "AJOURNE"].includes(status);

    let subject = "";
    let badgeLabel = "";
    let badgeColor = "";
    let badgeText = "";
    let headerBg = "";
    let mainText = "";
    let secondaryText = "";

    if (isAdmis) {
      subject = "🎓 Félicitations pour votre admission directe à l'Université — UniGate";
      badgeLabel = "✓ ADMISSION DIRECTE PRONONCÉE";
      badgeColor = "#dcfce7";
      badgeText = "#15803d";
      headerBg = "#0f172a";
      mainText = `Au vu de vos excellents résultats et des crédits requis validés, votre admission directe en <strong>${studentData.level} (${studentData.choice})</strong> a été officiellement prononcée !`;
      secondaryText = "Vous recevrez sous peu le calendrier officiel des inscriptions pédagogiques.";
      if (status === "Admis avec dette") {
        badgeLabel = "✓ ADMIS AVEC DETTE";
        mainText = `Votre admission en <strong>${studentData.level} (${studentData.choice})</strong> a été prononcée avec des crédits à rattraper (admission avec dette).`;
      }
    } else if (isEnCours) {
      subject = "📝 Confirmation de réception de votre candidature — UniGate";
      badgeLabel = "⌛ DOSSIER EN COURS DE TRAITEMENT";
      badgeColor = "#e0f2fe";
      badgeText = "#0369a1";
      headerBg = "#0f172a";
      mainText = `Nous vous confirmons avoir bien reçu votre dossier de candidature pour le niveau <strong>${studentData.level}</strong>. Nos équipes pédagogiques procèdent actuellement à son examen.`;
      secondaryText = "Vous recevrez une notification par email dès que votre statut sera mis à jour.";
    } else if (isAjourne) {
      subject = "📢 Information sur votre dossier — UniGate";
      badgeLabel = "⚠ DOSSIER AJOURNÉ";
      secondaryText = "Vous recevrez une notification par email dès que votre statut sera mis à jour.";
    } else {
      subject = "📢 Notification concernant votre demande d'admission — UniGate";
      badgeLabel = "✗ CANDIDATURE NON RETENUE";
      badgeColor = "#fee2e2";
      badgeText = "#991b1b";
      headerBg = "#0d1117";
      mainText = `Nous regrettons de vous informer qu'il n'a pas été possible de donner une suite favorable à votre demande d'admission pour la filière <strong>${studentData.choice}</strong>.`;
      secondaryText = "Nous vous encourageons vivement à poursuivre vos projets d'études et vous souhaitons une excellente réussite.";
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b; background-color: #f8fafc; padding: 20px; margin: 0; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
          .header { background-color: ${headerBg}; color: #ffffff; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 26px; font-weight: 700; }
          .content { padding: 40px 30px; line-height: 1.6; }
          .greeting { font-size: 18px; font-weight: bold; margin-bottom: 20px; }
          .badge { display: inline-block; background-color: ${badgeColor}; color: ${badgeText}; font-weight: bold; padding: 6px 12px; border-radius: 9999px; font-size: 13px; margin-top: 5px; }
          .details-box { background-color: #f1f5f9; border-radius: 12px; padding: 20px; margin: 25px 0; border: 1px solid #e2e8f0; }
          .detail-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
          .detail-label { color: #64748b; font-weight: 500; }
          .detail-value { font-weight: 600; color: #0f172a; }
          .footer { background-color: #f8fafc; padding: 20px 30px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>UniGate</h1>
            <p>Service des Admissions Académiques</p>
          </div>
          <div class="content">
            <div class="greeting">${isAdmis ? "Félicitations" : "Bonjour"} M./Mme ${studentData.firstName} ${studentData.lastName},</div>

            <p>${mainText}</p>

            <span class="badge">${badgeLabel}</span>

            <div class="details-box">
              <div class="detail-row"><span class="detail-label">Étudiant :</span><span class="detail-value">${studentData.firstName} ${studentData.lastName}</span></div>
              <div class="detail-row"><span class="detail-label">Niveau :</span><span class="detail-value">${studentData.level}</span></div>
              <div class="detail-row"><span class="detail-label">Filière :</span><span class="detail-value">${studentData.choice}</span></div>
              <div class="detail-row"><span class="detail-label">Décision :</span><span class="detail-value" style="color: ${badgeText};">${isAdmis ? "Admis" : "Non retenu"}</span></div>
            </div>

            <p style="margin-top: 25px;">${secondaryText}</p>

            <p style="margin-top: 30px; color: #64748b; font-size: 13px;">
              Cordialement,<br>
              <strong>Le Bureau des Inscriptions & de la Scolarité</strong><br>
              Plateforme UniGate
            </p>
          </div>
          <div class="footer">
            <p>© 2026 UniGate — Tous droits réservés.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = isAdmis
      ? `Félicitations ${studentData.firstName} ! Votre admission en ${studentData.level} (${studentData.choice}) a été validée.`
      : `Bonjour ${studentData.firstName}. Nous regrettons de vous informer que votre dossier pour ${studentData.choice} n'a pas été retenu.`;

    try {
      if (!transporter) throw new Error("Transporter non configuré");

      await transporter.sendMail({
        from: '"UniGate Admissions" <unigateuniv@gmail.com>',
        to: email,
        subject,
        text: textContent,
        html: htmlContent,
        headers: { "X-UniGate-Message": "status-email" },
        mailHeaders: {
          'List-Unsubscribe': '<mailto:unsubscribe@unigate.dz>',
          'Precedence': 'bulk'
        },
      });

      console.log(`✨ E-mail ${status} envoyé (sendMail accepté SMTP) à ${email}`);
    } catch (error) {
      console.error(`❌ Erreur lors de l'envoi de l'e-mail à ${email}:`, error);
    }
  }

  // 1. GET /api/applications
  app.get("/api/applications", async (req, res) => {
    refreshApplications();
    const prismaInstance = await initPrisma();

    if (prismaInstance) {
      try {
        const dbApps = await prismaInstance.application.findMany({
          include: { student: { include: { user: true } } },
        });

        if (dbApps && dbApps.length > 0) {
          const formatted = dbApps.map((app) => {
            const fName = app.student?.firstName || "Étudiant";
            const lName = app.student?.lastName || "Inconnu";
            return {
              id: String(app.id),
              matricule: app.student?.matricule || `2024-${app.targetLevel}-MOCK`,
              studentName: `${fName} ${lName}`.trim(),
              firstName: fName,
              lastName: lName,
              email: app.student?.user?.email || "scolarite@unimate.dz",
              phone: app.student?.phone || "",
              level: app.targetLevel || "L1",
              choice:
                app.student?.level === "L3"
                  ? app.student.choiceL3 || "Général"
                  : app.student?.level === "L2"
                    ? app.student.choiceL2
                    : app.student?.choiceL1,
              status: app.isDebtStudent
                ? "Admis avec dette"
                : app.status === "VALIDE"
                  ? "Admis"
                  : app.status === "REFUSE"
                    ? "Refusé"
                    : "En cours de traitement",
              documentUrl: app.documentUrl,
              bacAverage: Number(app.student?.bacAverage ?? 0),
              mathGrade: Number(app.student?.mathGrade ?? 0),
              scienceGrade: Number(app.student?.scienceGrade ?? 0),
              credits: Number(app.creditsObtained ?? (app.targetLevel === "L1" ? 0 : 60)),
              birthDate: app.student?.birthDate,
              submittedAt: app.createdAt ? app.createdAt.toISOString() : new Date().toISOString(),
            };
          });
          return res.json({ success: true, data: formatted });
        }
      } catch (err) {
        
      }
    }

    const localFormatted = applications.map((app, index) => {
      let fName = app.firstName;
      let lName = app.lastName;
      if (!fName && app.studentName) {
        const parts = app.studentName.split(" ");
        fName = parts[0] || "Étudiant";
        lName = parts.slice(1).join(" ") || "Inconnu";
      }

      return {
        id: String(app.id || index + 1),
        matricule: app.matricule || "Sans Matricule",
        studentName: app.studentName || `${fName} ${lName}`.trim(),
        firstName: fName || "Étudiant",
        lastName: lName || "Inconnu",
        email: app.email || "student@unigate.dz",
        phone: app.phone || "",
        level: app.level || "L1",
        choice: app.choice || "Informatique",
        status: app.status || "En cours de traitement",
        bacAverage: Number(app.bacAverage ?? 0),
        mathGrade: Number(app.mathGrade ?? 0),
        scienceGrade: Number(app.scienceGrade ?? 0),
        credits: Number(app.credits ?? app.ectsCredits ?? (app.level === "L1" ? 0 : 60)),
        documentUrl: app.documentUrl,
        birthDate: app.birthDate,
        submittedAt: app.submittedAt || new Date().toISOString(),
      };
    });

    return res.json({ success: true, data: localFormatted });
  });

  // 2. PUT /api/applications/:id/status
  app.put("/api/applications/:id/status", (req, res) => {
    try {
      if (typeof refreshApplications === "function") refreshApplications();

      const { id } = req.params;
      const rawStatus = req.body.status || req.body.decision;

      if (!rawStatus) {
        return res.status(400).json({ success: false, error: "Statut manquant" });
      }

      let internalStatus = rawStatus;
      if (["Validé", "Valide", "Admis"].includes(rawStatus)) internalStatus = "Admis";
      if (["Refusé", "Refuse"].includes(rawStatus)) internalStatus = "Refusé";

      
      applications = applications.map((app) => {
        if (String(app.id) === String(id) || app.matricule === id) {
          return { ...app, status: internalStatus };
        }
        return app;
      });

      const updatedApp = applications.find((app) => String(app.id) === String(id) || app.matricule === id);

      const syncPrisma = async () => {
        const prismaInstance = await initPrisma();
        if (!prismaInstance) return null;

        try {
          const dbStatusValue = internalStatus === "Admis" ? "VALIDE" : "REFUSE";
          const prismaId = parseInt(id, 10);

          if (!isNaN(prismaId)) {
            const updated = await prismaInstance.application.update({
              where: { id: prismaId },
              data: { status: dbStatusValue },
              include: { student: { include: { user: true } } },
            });

            return {
              email: updated.student?.user?.email,
              firstName: updated.student?.firstName,
              lastName: updated.student?.lastName,
              level: updated.targetLevel,
              choice: updated.student?.choiceL1 || updated.student?.choiceL2 || updated.student?.choiceL3,
            };
          }
        } catch (err) {
          console.error("Erreur synchro Prisma:", err?.message || err);
        }

        return null;
      };

     
      syncPrisma()
        .then(async (dbInfo) => {
          const targetEmail = dbInfo?.email || updatedApp?.email;
          const studentInfo =
            dbInfo ||
            ({
              firstName: updatedApp?.firstName || "Étudiant",
              lastName: updatedApp?.lastName || "",
              level: updatedApp?.level || "L1",
              choice: updatedApp?.choice || "Formation",
            });

          const emailSkipReason = !targetEmail
            ? "Aucune adresse email trouvée (Prisma vide + applications.json sans email)."
            : internalStatus === "En cours de traitement"
              ? "Statut ne déclenche pas l'envoi (En cours de traitement)."
              : null;

          console.log("📤 Email decision =>", {
            id,
            rawStatus,
            internalStatus,
            targetEmail,
            emailSkipReason,
          });

          if (targetEmail && !emailSkipReason) {
            void sendStatusEmail(targetEmail, studentInfo, internalStatus).catch((mailError) => {
              console.error("❌ Erreur lors de l'envoi de l'email:", mailError);
            });
          }
        })
        .catch((e) => {
          console.error("⚠️ Erreur tâche fond PUT:", e?.message || e);
        });

      
      return res.json({
        success: true,
        status: rawStatus,
        decision: rawStatus,
        appStatus: internalStatus,
        ...(updatedApp || {}),
        data: {
          id,
          success: true,
          status: rawStatus,
          statusInternal: internalStatus,
          ...(updatedApp || {}),
        },
      });
    } catch (globalRouteError) {
      console.error("Erreur évitée dans la route PUT :", globalRouteError.message);
      return res.status(500).json({ success: false, error: "Erreur interne" });
    }
  });

  // 3. POST /api/applications
  app.post("/api/applications", async (req, res) => {
    refreshApplications();
    const { lastName, firstName, email, phone, bacAverage, mathGrade, scienceGrade, stream, choice } = req.body;

    const newApp = {
      ...req.body,
      id: Math.random().toString(36).substr(2, 9),
      matricule: `2024-${choice ? choice.substring(0, 4).toUpperCase() : "ST"}-${Math.floor(Math.random() * 900) + 100}`,
      status: "En cours de traitement",
      submittedAt: new Date().toISOString(),
    };

    applications.push(newApp);
    try {
      fs.writeFileSync(dbPath, JSON.stringify(applications, null, 2));
    } catch (e) {
      console.error(e);
    }

    if (email) {
      sendStatusEmail(
        email,
        {
          firstName: firstName || "Étudiant",
          lastName: lastName || "",
          level: "L1",
          choice: choice,
        },
        "En cours de traitement"
      ).catch((err) => console.error("Email de réception non envoyé:", err));
    }

    const prismaInstance = await initPrisma();
    if (prismaInstance) {
      try {
        let prUser = await prismaInstance.user.findUnique({ where: { email } });
        if (!prUser) {
          prUser = await prismaInstance.user.create({
            data: { email, passwordHash: "UniGate2026#", role: "STUDENT" },
          });
        }

        let prStudent = await prismaInstance.student.create({
          data: {
            userId: prUser.id,
            firstName: firstName || "Nouveau",
            lastName: lastName || "Bachelier",
            birthDate: new Date(),
            birthPlace: "Algérie",
            gender: "M",
            adress: "Non configurée",
            phone: phone || "",
            level: "L1",
            matricule: newApp.matricule,
            choiceL1: choice || "ST",
            bacAverage: parseFloat(bacAverage) || 0,
            mathGrade: parseFloat(mathGrade) || 0,
            scienceGrade: parseFloat(scienceGrade) || 0,
            stream: stream || "Mathématiques",
          },
        });

        await prismaInstance.application.create({
          data: {
            studentId: prStudent.id,
            academicYear: "2025-2026",
            targetLevel: "L1",
            status: "EN_ATTENTE",
            documentUrl: req.body.documentUrl || "mock-url",
          },
        });
      } catch (err) {
        console.error("⚠️ Enregistrement Prisma échoué:", err?.message || err);
      }
    }

    res.status(201).json(newApp);
  });

  // 4. POST /api/inscriptions
  app.post("/api/inscriptions", async (req, res) => {
    refreshApplications();
    let { lastName, firstName, birthDate, email, phone, level, choice, ectsCredits, specialty, matricule } = req.body;

    const emailNormalized = email ? email.toLowerCase().trim() : "";
    const l1StEmails = [
      "nassimlekhal@gmail.com",
      "aminabelkacem@gmail.com",
      "faridzerrouk@gmail.com",
      "mustafachaoui@gmail.com",
      "hanaghali@gmail.com",
      "hadiajalal@gmail.com",
    ];

    const isFromL1ST =
      l1StEmails.includes(emailNormalized) ||
      (matricule && matricule.toUpperCase().includes("-ST-")) ||
      (choice && choice.toUpperCase().includes("ST"));

    if (level === "L2" && isFromL1ST) {
      choice = "Chimie";
    }

    let targetSpecialty = specialty;
    let finalChoiceValue = choice;

    if (level === "L3") {
      const choiceLower = (choice || "").toLowerCase();
      if (choiceLower.includes("chimie")) {
        if (choice && choice.startsWith("L3 Chimie - ")) {
          targetSpecialty = choice.replace("L3 Chimie - ", "").trim();
        }
        const allowedSpecialties = ["Chimie fondamentale", "Chimie analytique", "Chimie des matériaux (GP)"];
        if (!targetSpecialty || !allowedSpecialties.includes(targetSpecialty)) {
          return res.status(400).json({ error: "Spécialité L3 Chimie invalide." });
        }
        finalChoiceValue = `L3 Chimie - ${targetSpecialty}`;
      }
    }

    const credits = parseInt(ectsCredits || "0", 10);
    let calculatedStatus = "Ajourné";
    if (credits >= 30) {
      calculatedStatus = "Admis";
    }

    const generatedMatricule = matricule || `2026-${level}-${Math.floor(Math.random() * 900) + 100}`;

    const newApp = {
      ...req.body,
      id: req.body.id || Math.random().toString(36).substr(2, 9),
      lastName,
      firstName,
      birthDate,
      email: emailNormalized,
      phone,
      level,
      choice: finalChoiceValue,
      credits: credits,
      specialty: targetSpecialty || "",
      matricule: generatedMatricule,
      status: calculatedStatus,
      submittedAt: new Date().toISOString(),
    };

    applications.push(newApp);
    try {
      fs.writeFileSync(dbPath, JSON.stringify(applications, null, 2));
    } catch (e) {
      console.error("Erreur d'écriture JSON:", e);
    }

    if (emailNormalized) {
      sendStatusEmail(
        emailNormalized,
        {
          firstName: firstName || "Étudiant",
          lastName: lastName || "",
          level,
          choice: finalChoiceValue,
        },
        calculatedStatus
      ).catch((err) => console.error("Email non envoyé:", err));
    }

    const prismaInstance = await initPrisma();
    if (prismaInstance) {
      try {
        let prUser = await prismaInstance.user.findUnique({ where: { email: emailNormalized } });
        if (!prUser) {
          prUser = await prismaInstance.user.create({
            data: { email: emailNormalized, passwordHash: "UniGate2026#", role: "STUDENT" },
          });
        }

        let prStudent = await prismaInstance.student.findUnique({ where: { userId: prUser.id } });
        if (!prStudent) {
          prStudent = await prismaInstance.student.create({
            data: {
              userId: prUser.id,
              firstName: firstName || "Étudiant",
              lastName: lastName || "Réinscription",
              birthDate: birthDate ? new Date(birthDate) : new Date(),
              birthPlace: "Algérie",
              gender: "M",
              adress: "Non fournie",
              phone: phone || "",
              level,
              matricule: generatedMatricule,
              choiceL2: level === "L2" ? finalChoiceValue : undefined,
              choiceL3: level === "L3" ? finalChoiceValue : undefined,
            },
          });
        } else {
          await prismaInstance.student.update({
            where: { id: prStudent.id },
            data: {
              level,
              choiceL2: level === "L2" ? finalChoiceValue : prStudent.choiceL2,
              choiceL3: level === "L3" ? finalChoiceValue : prStudent.choiceL3,
            },
          });
        }

        await prismaInstance.application.create({
          data: {
            studentId: prStudent.id,
            academicYear: "2025-2026",
            targetLevel: level,
            status: calculatedStatus === "Admis" ? "VALIDE" : "EN_ATTENTE",
            creditsObtained: credits,
            isDebtStudent: false,
            documentUrl: req.body.documentUrl || "mock-upload-url-pdf",
          },
        });
      } catch (err) {
        console.error("⚠️ Erreur Prisma PostgreSQL:", err?.message || err);
      }
    }

    res.status(201).json(newApp);
  });

  
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Serveur en écoute sur le port ${PORT}`);
  });
}

startServer();

