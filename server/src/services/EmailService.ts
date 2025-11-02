import nodemailer, { Transporter } from 'nodemailer';
import { logger } from '../config/logger';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

class EmailService {
  private transporter: Transporter;

  constructor() {
    // Configuration SMTP Microsoft 365
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true pour le port 465, false pour STARTTLS (587)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
    });

    // Vérifier la connexion au démarrage
    this.verifyConnection();
  }

  /**
   * Vérifie la connexion SMTP
   */
  private async verifyConnection(): Promise<void> {
    try {
      await this.transporter.verify();
      logger.info('✅ Connexion SMTP établie avec succès');
    } catch (error) {
      logger.error('❌ Erreur de connexion SMTP:', error);
    }
  }

  /**
   * Envoie un email
   */
  private async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL || process.env.SMTP_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || this.stripHtml(options.html)
      };

      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`✅ Email envoyé à ${options.to} - ID: ${info.messageId}`);
      return true;
    } catch (error) {
      logger.error(`❌ Erreur lors de l'envoi de l'email à ${options.to}:`, error);
      return false;
    }
  }

  /**
   * Retire les balises HTML pour créer la version texte
   */
  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  }

  /**
   * Génère le header HTML commun pour tous les emails
   */
  private getEmailHeader(): string {
    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Trio Digital</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
          }
          .header {
            background: linear-gradient(135deg, #1A237E 0%, #C2185B 100%);
            padding: 40px 20px;
            text-align: center;
          }
          .logo {
            color: #ffffff;
            font-size: 32px;
            font-weight: bold;
            margin: 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
          }
          .content {
            padding: 40px 30px;
          }
          .button {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #C2185B 0%, #FF4081 100%);
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
            box-shadow: 0 4px 6px rgba(194, 24, 91, 0.3);
          }
          .button:hover {
            box-shadow: 0 6px 8px rgba(194, 24, 91, 0.4);
          }
          .footer {
            background-color: #1A237E;
            color: #E0FFFF;
            padding: 30px;
            text-align: center;
            font-size: 14px;
          }
          .footer a {
            color: #00CED1;
            text-decoration: none;
          }
          .divider {
            height: 2px;
            background: linear-gradient(90deg, #1A237E 0%, #C2185B 50%, #00CED1 100%);
            margin: 30px 0;
          }
          .highlight-box {
            background: linear-gradient(135deg, rgba(0, 206, 209, 0.1) 0%, rgba(255, 64, 129, 0.1) 100%);
            border-left: 4px solid #C2185B;
            padding: 20px;
            border-radius: 4px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo">TRIO DIGITAL</h1>
            <p style="color: #E0FFFF; margin: 10px 0 0 0; font-size: 14px;">Social Media AI Platform</p>
          </div>
          <div class="content">
    `;
  }

  /**
   * Génère le footer HTML commun pour tous les emails
   */
  private getEmailFooter(): string {
    return `
          </div>
          <div class="footer">
            <p style="margin: 0 0 10px 0; font-weight: 600;">TRIO DIGITAL</p>
            <p style="margin: 0 0 15px 0; font-size: 13px;">Social Media AI Platform</p>
            <p style="margin: 0 0 15px 0;">
              <a href="mailto:${process.env.MAIL_FROM_EMAIL}" style="color: #00CED1;">${process.env.MAIL_FROM_EMAIL}</a>
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
    `;
  }

  /**
   * Email de bienvenue après inscription
   */
  async sendWelcomeEmail(to: string, name: string): Promise<boolean> {
    const html = `
      ${this.getEmailHeader()}
      <h2 style="color: #1A237E; margin-top: 0;">Bienvenue sur Trio Digital ! 🎉</h2>
      
      <p style="color: #333; line-height: 1.6;">
        Bonjour <strong>${name}</strong>,
      </p>
      
      <p style="color: #333; line-height: 1.6;">
        Nous sommes ravis de vous accueillir sur <strong>Trio Digital</strong>, votre plateforme d'intelligence artificielle pour la création de contenu sur les réseaux sociaux !
      </p>
      
      <div class="highlight-box">
        <h3 style="color: #C2185B; margin-top: 0;">✨ Ce que vous pouvez faire dès maintenant :</h3>
        <ul style="color: #333; line-height: 1.8;">
          <li>Créer des calendriers éditoriaux intelligents</li>
          <li>Générer des visuels créatifs avec l'IA</li>
          <li>Analyser vos produits automatiquement</li>
          <li>Planifier vos publications sur les réseaux sociaux</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.CLIENT_URL}/dashboard" class="button">
          Accéder à mon tableau de bord
        </a>
      </div>
      
      <div class="divider"></div>
      
      <p style="color: #666; font-size: 14px; line-height: 1.6;">
        <strong>Besoin d'aide ?</strong><br>
        Notre équipe est là pour vous accompagner. N'hésitez pas à nous contacter à 
        <a href="mailto:${process.env.MAIL_FROM_EMAIL}" style="color: #C2185B;">${process.env.MAIL_FROM_EMAIL}</a>
      </p>
      ${this.getEmailFooter()}
    `;

    return this.sendEmail({
      to,
      subject: '🎉 Bienvenue sur Trio Digital !',
      html
    });
  }

  /**
   * Email de réinitialisation de mot de passe
   */
  async sendPasswordResetEmail(to: string, name: string, resetToken: string): Promise<boolean> {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    
    const html = `
      ${this.getEmailHeader()}
      <h2 style="color: #1A237E; margin-top: 0;">Réinitialisation de votre mot de passe</h2>
      
      <p style="color: #333; line-height: 1.6;">
        Bonjour <strong>${name}</strong>,
      </p>
      
      <p style="color: #333; line-height: 1.6;">
        Vous avez demandé la réinitialisation de votre mot de passe sur <strong>Trio Digital</strong>.
      </p>
      
      <div class="highlight-box">
        <p style="color: #333; margin: 0; line-height: 1.6;">
          <strong>⏰ Ce lien est valide pendant 1 heure.</strong><br>
          Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe.
        </p>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" class="button">
          Réinitialiser mon mot de passe
        </a>
      </div>
      
      <p style="color: #666; font-size: 14px; line-height: 1.6;">
        Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :<br>
        <a href="${resetUrl}" style="color: #C2185B; word-break: break-all;">${resetUrl}</a>
      </p>
      
      <div class="divider"></div>
      
      <p style="color: #666; font-size: 14px; line-height: 1.6;">
        <strong>🔒 Vous n'avez pas demandé cette réinitialisation ?</strong><br>
        Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email en toute sécurité. 
        Votre mot de passe actuel reste inchangé.
      </p>
      ${this.getEmailFooter()}
    `;

    return this.sendEmail({
      to,
      subject: '🔒 Réinitialisation de votre mot de passe - Trio Digital',
      html
    });
  }

  /**
   * Email de notification de connexion
   */
  async sendLoginNotificationEmail(to: string, name: string, loginDate: Date, device?: string): Promise<boolean> {
    const formattedDate = loginDate.toLocaleString('fr-FR', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'Europe/Paris'
    });

    const html = `
      ${this.getEmailHeader()}
      <h2 style="color: #1A237E; margin-top: 0;">Nouvelle connexion détectée 🔐</h2>
      
      <p style="color: #333; line-height: 1.6;">
        Bonjour <strong>${name}</strong>,
      </p>
      
      <p style="color: #333; line-height: 1.6;">
        Nous vous informons qu'une connexion à votre compte <strong>Trio Digital</strong> a été effectuée.
      </p>
      
      <div class="highlight-box">
        <h3 style="color: #C2185B; margin-top: 0;">📋 Détails de la connexion :</h3>
        <ul style="color: #333; line-height: 1.8; margin: 10px 0;">
          <li><strong>Date et heure :</strong> ${formattedDate}</li>
          ${device ? `<li><strong>Appareil :</strong> ${device}</li>` : ''}
        </ul>
      </div>
      
      <p style="color: #333; line-height: 1.6;">
        Si vous êtes à l'origine de cette connexion, vous n'avez rien à faire. 
        Cet email est simplement une mesure de sécurité pour vous tenir informé.
      </p>
      
      <div class="divider"></div>
      
      <p style="color: #C2185B; font-size: 14px; line-height: 1.6;">
        <strong>⚠️ Ce n'était pas vous ?</strong><br>
        Si vous ne reconnaissez pas cette activité, nous vous recommandons de changer votre mot de passe immédiatement 
        et de contacter notre équipe de support.
      </p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.CLIENT_URL}/profile" class="button">
          Gérer mon compte
        </a>
      </div>
      ${this.getEmailFooter()}
    `;

    return this.sendEmail({
      to,
      subject: '🔐 Nouvelle connexion à votre compte - Trio Digital',
      html
    });
  }

  /**
   * Email de notification : calendrier prêt
   */
  async sendCalendarReadyEmail(
    to: string, 
    name: string, 
    calendarId: string, 
    postsCount: number,
    brandName?: string
  ): Promise<boolean> {
    const calendarUrl = `${process.env.CLIENT_URL}/results/${calendarId}`;
    
    const html = `
      ${this.getEmailHeader()}
      <h2 style="color: #1A237E; margin-top: 0;">Votre calendrier est prêt ! 🎨✨</h2>
      
      <p style="color: #333; line-height: 1.6;">
        Bonjour <strong>${name}</strong>,
      </p>
      
      <p style="color: #333; line-height: 1.6;">
        Excellente nouvelle ! Votre calendrier éditorial ${brandName ? `pour <strong>${brandName}</strong>` : ''} 
        a été généré avec succès par notre intelligence artificielle.
      </p>
      
      <div class="highlight-box">
        <h3 style="color: #00CED1; margin-top: 0;">📊 Résumé de votre calendrier :</h3>
        <ul style="color: #333; line-height: 1.8; margin: 10px 0;">
          <li><strong>${postsCount}</strong> publications créatives générées</li>
          <li>Visuels optimisés pour les réseaux sociaux</li>
          <li>Contenus personnalisés et engageants</li>
          <li>Prêt à être publié immédiatement</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${calendarUrl}" class="button">
          Voir mon calendrier
        </a>
      </div>
      
      <p style="color: #333; line-height: 1.6;">
        Vous pouvez maintenant consulter, télécharger et partager vos créations. 
        Tous vos contenus sont disponibles dans votre espace résultats.
      </p>
      
      <div class="divider"></div>
      
      <p style="color: #666; font-size: 14px; line-height: 1.6;">
        <strong>💡 Astuce :</strong> N'oubliez pas de sauvegarder vos contenus préférés et de les adapter 
        selon vos besoins avant publication !
      </p>
      ${this.getEmailFooter()}
    `;

    return this.sendEmail({
      to,
      subject: `🎨 Votre calendrier ${brandName ? brandName + ' ' : ''}est prêt ! - Trio Digital`,
      html
    });
  }
}

// Export singleton
export default new EmailService();
