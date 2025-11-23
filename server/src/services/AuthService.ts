import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';
import { Types } from 'mongoose';

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  private static readonly ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret';
  private static readonly REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';
  private static readonly RESET_TOKEN_SECRET = process.env.JWT_RESET_SECRET || 'reset_secret';
  private static readonly ACCESS_TOKEN_EXPIRY = '24h';
  private static readonly REFRESH_TOKEN_EXPIRY = '7d';
  private static readonly RESET_TOKEN_EXPIRY = '1h';

  /**
   * Génère les tokens d'authentification pour un utilisateur
   */
  static generateAuthTokens(user: IUser & { _id: Types.ObjectId }): AuthTokens {
    const payload: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    };

    const accessToken = jwt.sign(payload, this.ACCESS_TOKEN_SECRET, {
      expiresIn: this.ACCESS_TOKEN_EXPIRY
    });

    const refreshToken = jwt.sign(payload, this.REFRESH_TOKEN_SECRET, {
      expiresIn: this.REFRESH_TOKEN_EXPIRY
    });

    return { accessToken, refreshToken };
  }

  /**
   * Vérifie et décode un access token
   */
  static verifyAccessToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, this.ACCESS_TOKEN_SECRET) as TokenPayload;
      return decoded;
    } catch (error) {
      throw new Error('Token invalide ou expiré');
    }
  }

  /**
   * Vérifie et décode un refresh token
   */
  static verifyRefreshToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, this.REFRESH_TOKEN_SECRET) as TokenPayload;
      return decoded;
    } catch (error) {
      throw new Error('Refresh token invalide ou expiré');
    }
  }

  /**
   * Rafraîchit l'access token en utilisant le refresh token
   */
  static refreshAccessToken(refreshToken: string): string {
    try {
      const decoded = this.verifyRefreshToken(refreshToken);
      const payload: TokenPayload = {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role
      };

      return jwt.sign(payload, this.ACCESS_TOKEN_SECRET, {
        expiresIn: this.ACCESS_TOKEN_EXPIRY
      });
    } catch (error) {
      throw new Error('Impossible de rafraîchir le token');
    }
  }

  /**
   * Extrait le token Bearer de l'en-tête Authorization
   */
  static extractTokenFromHeader(authHeader?: string): string {
    if (!authHeader) {
      throw new Error('En-tête Authorization manquant');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new Error('Format de token invalide');
    }

    return parts[1];
  }

  /**
   * Vérifie si un utilisateur a le rôle requis
   */
  static hasRole(user: IUser, requiredRole: string): boolean {
    const roles = {
      owner: 3,
      admin: 2,
      editor: 1,
      viewer: 0
    };

    return roles[user.role as keyof typeof roles] >= roles[requiredRole as keyof typeof roles];
  }

  /**
   * Génère un token de réinitialisation de mot de passe
   */
  static generatePasswordResetToken(userId: string, email: string): string {
    const payload = {
      userId,
      email,
      type: 'password_reset'
    };

    return jwt.sign(payload, this.RESET_TOKEN_SECRET, {
      expiresIn: this.RESET_TOKEN_EXPIRY
    });
  }

  /**
   * Vérifie un token de réinitialisation de mot de passe
   */
  static verifyPasswordResetToken(token: string): { userId: string; email: string } {
    try {
      const decoded = jwt.verify(token, this.RESET_TOKEN_SECRET) as { userId: string; email: string; type: string };
      
      if (decoded.type !== 'password_reset') {
        throw new Error('Type de token invalide');
      }

      return {
        userId: decoded.userId,
        email: decoded.email
      };
    } catch (error) {
      throw new Error('Token de réinitialisation invalide ou expiré');
    }
  }
}

export default AuthService;
