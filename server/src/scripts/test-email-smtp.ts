import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const testEmailConnection = async () => {
  console.log('=== Test de connexion SMTP Microsoft 365 ===\n');

  // Configuration SMTP
  const smtpConfig = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true pour le port 465, false pour les autres ports (utilise STARTTLS)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false // Pour éviter les problèmes de certificats en développement
    }
  };

  console.log('📋 Configuration SMTP:');
  console.log(`   Serveur: ${smtpConfig.host}`);
  console.log(`   Port: ${smtpConfig.port}`);
  console.log(`   Sécurité: ${smtpConfig.secure ? 'SSL/TLS' : 'STARTTLS'}`);
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
      subject: 'Test de configuration SMTP - Trio Digital',
      text: `Ceci est un email de test pour vérifier la configuration SMTP.
      
Si vous recevez cet email, cela signifie que la configuration Microsoft 365 via GoDaddy fonctionne correctement!

Configuration testée:
- Serveur: ${smtpConfig.host}
- Port: ${smtpConfig.port}
- De: ${process.env.SMTP_USER}

Date du test: ${new Date().toLocaleString('fr-FR')}

---
Trio Digital
Social Media AI Platform`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1 style="color: #2563eb; margin-bottom: 20px;">✅ Test de configuration SMTP</h1>
            
            <p style="color: #333; line-height: 1.6; margin-bottom: 15px;">
              <strong>Félicitations!</strong> Si vous recevez cet email, cela signifie que la configuration Microsoft 365 via GoDaddy fonctionne correctement!
            </p>
            
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #1f2937; margin-top: 0;">Configuration testée:</h3>
              <ul style="color: #4b5563; line-height: 1.8;">
                <li><strong>Serveur:</strong> ${smtpConfig.host}</li>
                <li><strong>Port:</strong> ${smtpConfig.port}</li>
                <li><strong>Méthode:</strong> ${smtpConfig.secure ? 'SSL/TLS' : 'STARTTLS'}</li>
                <li><strong>De:</strong> ${process.env.SMTP_USER}</li>
              </ul>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
              Date du test: ${new Date().toLocaleString('fr-FR', { 
                dateStyle: 'long', 
                timeStyle: 'long',
                timeZone: 'Europe/Paris'
              })}
            </p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">
            
            <div style="text-align: center; color: #9ca3af; font-size: 12px;">
              <p style="margin: 5px 0;"><strong>Trio Digital</strong></p>
              <p style="margin: 5px 0;">Social Media AI Platform</p>
              <p style="margin: 5px 0;">donotreply@trio.digital</p>
            </div>
          </div>
        </div>
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
    console.log('Vérifiez la boîte de réception de hani.mazouni@gmail.com');
    console.log('(Pensez à vérifier également les spams si l\'email n\'apparaît pas dans la boîte principale)\n');

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
        console.error('   - L\'authentification SMTP est autorisée dans les paramètres du compte');
      } else if (error.message.includes('ECONNECTION') || error.message.includes('ETIMEDOUT')) {
        console.error('\n🔍 Diagnostic: Problème de connexion');
        console.error('   Vérifiez:');
        console.error('   - La connexion Internet fonctionne');
        console.error('   - Le serveur SMTP (smtp.office365.com) est accessible');
        console.error('   - Le port 587 n\'est pas bloqué par un firewall');
      } else if (error.message.includes('ENOTFOUND')) {
        console.error('\n🔍 Diagnostic: Serveur SMTP introuvable');
        console.error('   Vérifiez:');
        console.error('   - L\'adresse du serveur SMTP est correcte (smtp.office365.com)');
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
testEmailConnection();
