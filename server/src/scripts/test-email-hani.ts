import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const testEmailToHani = async () => {
  console.log('=== Test d\'envoi d\'email à hani@trio.digital ===\n');

  // Configuration SMTP
  const smtpConfig = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // false pour STARTTLS (port 587)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    }
  };

  console.log('📋 Configuration SMTP:');
  console.log(`   Serveur: ${smtpConfig.host}`);
  console.log(`   Port: ${smtpConfig.port}`);
  console.log(`   Utilisateur: ${smtpConfig.auth.user}`);
  console.log(`   Mot de passe: ${'*'.repeat(smtpConfig.auth.pass?.length || 0)}\n`);

  try {
    // Créer le transporteur
    console.log('🔄 Création du transporteur nodemailer...');
    const transporter = nodemailer.createTransport(smtpConfig);

    // Vérifier la connexion
    console.log('🔄 Vérification de la connexion au serveur SMTP...');
    await transporter.verify();
    console.log('✅ Connexion au serveur SMTP réussie!\n');

    // Préparer l'email de test
    const testEmail = {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: 'hani.mazouni@gmail.com',
      subject: '✅ Test Système Email - Trio Digital',
      text: `Bonjour Hani,

Ceci est un email de test pour vérifier que le système d'emailing de Trio Digital fonctionne correctement.

✅ Configuration testée avec succès:
- Serveur: ${smtpConfig.host}
- Port: ${smtpConfig.port}
- Méthode: STARTTLS
- Expéditeur: ${process.env.SMTP_USER}

Le système d'emailing est opérationnel et prêt à envoyer:
• Emails de bienvenue aux nouveaux utilisateurs
• Emails de réinitialisation de mot de passe
• Notifications de calendriers prêts
• Notifications de connexion

Date du test: ${new Date().toLocaleString('fr-FR', { 
  dateStyle: 'long', 
  timeStyle: 'long',
  timeZone: 'Europe/Paris'
})}

---
Trio Digital
Social Media AI Platform
donotreply@trio.digital`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Test Email - Trio Digital</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1A237E 0%, #C2185B 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 32px; font-weight: bold; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">TRIO DIGITAL</h1>
              <p style="color: #E0FFFF; margin: 10px 0 0 0; font-size: 14px;">Social Media AI Platform</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #1A237E; margin-top: 0;">✅ Test Système Email Réussi</h2>
              
              <p style="color: #333; line-height: 1.6;">
                Bonjour <strong>Hani</strong>,
              </p>
              
              <p style="color: #333; line-height: 1.6;">
                Excellente nouvelle ! Le système d'emailing de <strong>Trio Digital</strong> fonctionne parfaitement.
              </p>
              
              <!-- Configuration Box -->
              <div style="background: linear-gradient(135deg, rgba(0, 206, 209, 0.1) 0%, rgba(255, 64, 129, 0.1) 100%); border-left: 4px solid #C2185B; padding: 20px; border-radius: 4px; margin: 20px 0;">
                <h3 style="color: #C2185B; margin-top: 0;">📋 Configuration testée avec succès :</h3>
                <ul style="color: #333; line-height: 1.8; margin: 10px 0;">
                  <li><strong>Serveur SMTP:</strong> ${smtpConfig.host}</li>
                  <li><strong>Port:</strong> ${smtpConfig.port}</li>
                  <li><strong>Méthode:</strong> STARTTLS (sécurisé)</li>
                  <li><strong>Expéditeur:</strong> ${process.env.SMTP_USER}</li>
                </ul>
              </div>
              
              <!-- Features Box -->
              <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #00CED1; margin-top: 0;">✨ Fonctionnalités opérationnelles :</h3>
                <ul style="color: #333; line-height: 1.8;">
                  <li>✅ Emails de bienvenue aux nouveaux utilisateurs</li>
                  <li>✅ Emails de réinitialisation de mot de passe</li>
                  <li>✅ Notifications de calendriers prêts</li>
                  <li>✅ Notifications de connexion</li>
                  <li>✅ Templates HTML professionnels</li>
                </ul>
              </div>
              
              <div style="height: 2px; background: linear-gradient(90deg, #1A237E 0%, #C2185B 50%, #00CED1 100%); margin: 30px 0;"></div>
              
              <p style="color: #666; font-size: 14px; line-height: 1.6;">
                <strong>📅 Date du test:</strong><br>
                ${new Date().toLocaleString('fr-FR', { 
                  dateStyle: 'long', 
                  timeStyle: 'long',
                  timeZone: 'Europe/Paris'
                })}
              </p>
              
              <p style="color: #10b981; font-weight: 600; font-size: 16px; margin-top: 30px;">
                🎉 Le système d'emailing est prêt pour la production !
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #1A237E; color: #E0FFFF; padding: 30px; text-align: center; font-size: 14px;">
              <p style="margin: 0 0 10px 0; font-weight: 600;">TRIO DIGITAL</p>
              <p style="margin: 0 0 15px 0; font-size: 13px;">Social Media AI Platform</p>
              <p style="margin: 0 0 15px 0;">
                <a href="mailto:${process.env.MAIL_FROM_EMAIL}" style="color: #00CED1; text-decoration: none;">${process.env.MAIL_FROM_EMAIL}</a>
              </p>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(224, 255, 255, 0.3);">
                <p style="margin: 0; font-size: 12px; color: #E0FFFF; opacity: 0.8;">
                  © ${new Date().getFullYear()} Trio Digital. Tous droits réservés.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Envoyer l'email de test
    console.log('📧 Envoi de l\'email de test...');
    console.log(`   De: ${testEmail.from}`);
    console.log(`   À: ${testEmail.to}`);
    console.log(`   Sujet: ${testEmail.subject}\n`);

    const info = await transporter.sendMail(testEmail);

    console.log('✅ Email envoyé avec succès!');
    console.log(`   ID du message: ${info.messageId}`);
    console.log(`   Réponse du serveur: ${info.response}\n`);

    console.log('🎉 TEST RÉUSSI!');
    console.log('📬 Vérifiez la boîte de réception de hani@trio.digital');
    console.log('💡 Pensez à vérifier également les spams si l\'email n\'apparaît pas dans la boîte principale\n');

    console.log('✅ Le système d\'emailing est OPÉRATIONNEL et prêt pour la production!\n');

    process.exit(0);

  } catch (error) {
    console.error('\n❌ ERREUR lors du test SMTP:');
    
    if (error instanceof Error) {
      console.error(`   Message: ${error.message}`);
      
      // Diagnostics spécifiques
      if (error.message.includes('EAUTH')) {
        console.error('\n🔍 Diagnostic: Erreur d\'authentification');
        console.error('   Vérifiez:');
        console.error('   - Le nom d\'utilisateur (SMTP_USER) est correct');
        console.error('   - Le mot de passe (SMTP_PASS) est correct');
        console.error('   - Le compte Microsoft 365 est bien activé');
        console.error('   - L\'authentification SMTP est autorisée');
      } else if (error.message.includes('ECONNECTION') || error.message.includes('ETIMEDOUT')) {
        console.error('\n🔍 Diagnostic: Problème de connexion');
        console.error('   Vérifiez:');
        console.error('   - La connexion Internet fonctionne');
        console.error('   - Le serveur SMTP (smtp.office365.com) est accessible');
        console.error('   - Le port 587 n\'est pas bloqué par un firewall');
      } else if (error.message.includes('ENOTFOUND')) {
        console.error('\n🔍 Diagnostic: Serveur SMTP introuvable');
        console.error('   Vérifiez:');
        console.error('   - L\'adresse du serveur SMTP est correcte');
        console.error('   - La résolution DNS fonctionne');
      }
      
      console.error(`\n   Stack trace: ${error.stack}`);
    } else {
      console.error('   Erreur inconnue:', error);
    }

    console.error('\n❌ TEST ÉCHOUÉ\n');
    process.exit(1);
  }
};

// Exécuter le test
testEmailToHani();
