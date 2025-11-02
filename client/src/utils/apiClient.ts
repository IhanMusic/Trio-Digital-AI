import { config } from '../config/env';
import { fetchWithAuth, getWithAuth, postWithAuth, putWithAuth, deleteWithAuth } from './apiUtils';
import axios from 'axios';

/**
 * Client API pour effectuer des requêtes avec authentification
 * Fournit une interface similaire à axios
 */
export const apiClient = {
  /**
   * Effectue une requête GET avec authentification
   * @param url URL relative ou absolue
   * @param options Options supplémentaires
   * @returns Promesse avec les données de la réponse
   */
  get: async (url: string, options?: any) => {
    const fullUrl = url.startsWith('http') ? url : `${config.apiUrl}${url}`;
    return getWithAuth(fullUrl);
  },

  /**
   * Effectue une requête POST avec authentification
   * @param url URL relative ou absolue
   * @param data Données à envoyer
   * @param options Options supplémentaires
   * @returns Promesse avec les données de la réponse
   */
  post: async (url: string, data: any, options?: any) => {
    // Si les options contiennent des en-têtes spécifiques pour multipart/form-data,
    // utiliser axios directement car notre fetchWithAuth ne gère pas bien les fichiers
    if (options?.headers?.['Content-Type'] === 'multipart/form-data') {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('Non authentifié');
      }

      const fullUrl = url.startsWith('http') ? url : `${config.apiUrl}${url}`;
      return axios.post(fullUrl, data, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`
        }
      });
    }

    const fullUrl = url.startsWith('http') ? url : `${config.apiUrl}${url}`;
    return postWithAuth(fullUrl, data);
  },

  /**
   * Effectue une requête PUT avec authentification
   * @param url URL relative ou absolue
   * @param data Données à envoyer
   * @param options Options supplémentaires
   * @returns Promesse avec les données de la réponse
   */
  put: async (url: string, data: any, options?: any) => {
    const fullUrl = url.startsWith('http') ? url : `${config.apiUrl}${url}`;
    return putWithAuth(fullUrl, data);
  },

  /**
   * Effectue une requête DELETE avec authentification
   * @param url URL relative ou absolue
   * @param options Options supplémentaires
   * @returns Promesse avec les données de la réponse
   */
  delete: async (url: string, options?: any) => {
    const fullUrl = url.startsWith('http') ? url : `${config.apiUrl}${url}`;
    return deleteWithAuth(fullUrl);
  },

  /**
   * Effectue une requête avec authentification
   * @param options Options de la requête
   * @returns Promesse avec les données de la réponse
   */
  request: async (options: { 
    method: string; 
    url: string; 
    data?: any; 
    headers?: any;
  }) => {
    const { method, url, data, headers } = options;
    const fullUrl = url.startsWith('http') ? url : `${config.apiUrl}${url}`;

    switch (method.toLowerCase()) {
      case 'get':
        return getWithAuth(fullUrl);
      case 'post':
        return postWithAuth(fullUrl, data);
      case 'put':
        return putWithAuth(fullUrl, data);
      case 'delete':
        return deleteWithAuth(fullUrl);
      default:
        throw new Error(`Méthode non supportée: ${method}`);
    }
  }
};
