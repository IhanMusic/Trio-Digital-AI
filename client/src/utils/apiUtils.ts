import { config } from '../config/env';

/**
 * Utilitaire pour effectuer des requêtes API avec gestion automatique du token
 * et tentative de rafraîchissement en cas d'erreur 401
 */
export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  // Récupérer le token depuis sessionStorage
  const token = sessionStorage.getItem('token');
  const refreshToken = sessionStorage.getItem('refreshToken');

  if (!token) {
    throw new Error('Non authentifié');
  }

  // Ajouter le token d'authentification aux en-têtes
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`
  };

  // Effectuer la requête
  let response = await fetch(url, {
    ...options,
    headers
  });

  // Si la réponse est 401 (Unauthorized), tenter de rafraîchir le token
  if (response.status === 401 && refreshToken) {
    console.log('Token expiré, tentative de rafraîchissement...');
    
    try {
      // Appeler l'API de rafraîchissement du token
      const refreshResponse = await fetch(`${config.apiUrl}/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        const newToken = refreshData.data.accessToken;
        
        // Mettre à jour le token dans sessionStorage
        sessionStorage.setItem('token', newToken);
        
        // Réessayer la requête originale avec le nouveau token
        console.log('Token rafraîchi, nouvelle tentative de requête...');
        const newHeaders = {
          ...options.headers,
          'Authorization': `Bearer ${newToken}`
        };
        
        response = await fetch(url, {
          ...options,
          headers: newHeaders
        });
      } else {
        console.error('Échec du rafraîchissement du token');
        // Rediriger vers la page de connexion si le rafraîchissement échoue
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      // Rediriger vers la page de connexion en cas d'erreur
      window.location.href = '/login';
    }
  }

  return response;
};

/**
 * Utilitaire pour effectuer des requêtes GET avec authentification
 */
export const getWithAuth = async (url: string): Promise<any> => {
  const response = await fetchWithAuth(url);
  
  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData && errorData.error ? errorData.error : `Erreur ${response.status}`);
    } catch (jsonError) {
      // Si la réponse n'est pas du JSON valide
      throw new Error(`Erreur ${response.status}: Impossible de traiter la réponse du serveur`);
    }
  }
  
  try {
    return await response.json();
  } catch (jsonError) {
    console.error('Erreur lors du parsing de la réponse JSON:', jsonError);
    return { success: true, data: {} }; // Retourner un objet par défaut en cas d'erreur de parsing
  }
};

/**
 * Utilitaire pour effectuer des requêtes POST avec authentification
 */
export const postWithAuth = async (url: string, data: any): Promise<any> => {
  const response = await fetchWithAuth(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData && errorData.error ? errorData.error : `Erreur ${response.status}`);
    } catch (jsonError) {
      // Si la réponse n'est pas du JSON valide
      throw new Error(`Erreur ${response.status}: Impossible de traiter la réponse du serveur`);
    }
  }
  
  try {
    return await response.json();
  } catch (jsonError) {
    console.error('Erreur lors du parsing de la réponse JSON:', jsonError);
    return { success: true, data: {} }; // Retourner un objet par défaut en cas d'erreur de parsing
  }
};

/**
 * Utilitaire pour effectuer des requêtes PUT avec authentification
 */
export const putWithAuth = async (url: string, data: any): Promise<any> => {
  const response = await fetchWithAuth(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData && errorData.error ? errorData.error : `Erreur ${response.status}`);
    } catch (jsonError) {
      // Si la réponse n'est pas du JSON valide
      throw new Error(`Erreur ${response.status}: Impossible de traiter la réponse du serveur`);
    }
  }
  
  try {
    return await response.json();
  } catch (jsonError) {
    console.error('Erreur lors du parsing de la réponse JSON:', jsonError);
    return { success: true, data: {} }; // Retourner un objet par défaut en cas d'erreur de parsing
  }
};

/**
 * Utilitaire pour effectuer des requêtes DELETE avec authentification
 */
export const deleteWithAuth = async (url: string): Promise<any> => {
  const response = await fetchWithAuth(url, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData && errorData.error ? errorData.error : `Erreur ${response.status}`);
    } catch (jsonError) {
      // Si la réponse n'est pas du JSON valide
      throw new Error(`Erreur ${response.status}: Impossible de traiter la réponse du serveur`);
    }
  }
  
  try {
    return await response.json();
  } catch (jsonError) {
    console.error('Erreur lors du parsing de la réponse JSON:', jsonError);
    return { success: true, data: {} }; // Retourner un objet par défaut en cas d'erreur de parsing
  }
};
