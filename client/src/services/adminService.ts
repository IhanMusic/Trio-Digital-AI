import { apiClient } from '../utils/apiClient';
import { 
  AdminUser, 
  CreateUserRequest, 
  UpdateUserRequest, 
  AdminStats, 
  UserFilters, 
  PaginatedResponse, 
  ApiResponse,
  ActivityLog,
  SystemMetric
} from '../types/admin';

class AdminService {
  private baseUrl = '/admin';

  // Gestion des utilisateurs
  async getUsers(filters?: UserFilters): Promise<PaginatedResponse<AdminUser>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== 'all') {
          params.append(key, value.toString());
        }
      });
    }

    const queryString = params.toString();
    const url = `${this.baseUrl}/users${queryString ? `?${queryString}` : ''}`;
    
    const response = await apiClient.get(url);
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Erreur lors de la récupération des utilisateurs');
    }
    
    return response.data;
  }

  async createUser(userData: CreateUserRequest): Promise<AdminUser> {
    const response = await apiClient.post(
      `${this.baseUrl}/users`,
      userData
    );
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Erreur lors de la création de l\'utilisateur');
    }
    
    return response.data;
  }

  async updateUser(id: string, userData: UpdateUserRequest): Promise<AdminUser> {
    const response = await apiClient.put(
      `${this.baseUrl}/users/${id}`,
      userData
    );
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Erreur lors de la mise à jour de l\'utilisateur');
    }
    
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    const response = await apiClient.delete(
      `${this.baseUrl}/users/${id}`
    );
    
    if (!response.success) {
      throw new Error(response.error || 'Erreur lors de la suppression de l\'utilisateur');
    }
  }

  async getUserById(id: string): Promise<AdminUser> {
    const response = await apiClient.get(
      `${this.baseUrl}/users/${id}`
    );
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Utilisateur non trouvé');
    }
    
    return response.data;
  }

  // Statistiques et métriques
  async getStats(): Promise<AdminStats> {
    const response = await apiClient.get(
      `${this.baseUrl}/stats`
    );
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Erreur lors de la récupération des statistiques');
    }
    
    return response.data;
  }

  async getSystemMetrics(): Promise<SystemMetric[]> {
    const response = await apiClient.get(
      `${this.baseUrl}/metrics`
    );
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Erreur lors de la récupération des métriques système');
    }
    
    return response.data;
  }

  // Logs d'activité
  async getActivityLogs(page = 1, limit = 50): Promise<PaginatedResponse<ActivityLog>> {
    const response = await apiClient.get(
      `${this.baseUrl}/logs?page=${page}&limit=${limit}`
    );
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Erreur lors de la récupération des logs');
    }
    
    return response.data;
  }

  // Vérification des permissions
  async verifyAdminAccess(): Promise<boolean> {
    try {
      const response = await apiClient.get(
        `${this.baseUrl}/verify-access`
      );
      
      return response.success && response.data?.isAdmin === true;
    } catch (error) {
      console.error('Erreur lors de la vérification des permissions admin:', error);
      return false;
    }
  }

  // Gestion des prompts (si nécessaire)
  async getPrompts(): Promise<any[]> {
    const response = await apiClient.get(
      `${this.baseUrl}/prompts`
    );
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Erreur lors de la récupération des prompts');
    }
    
    return response.data;
  }

  async updatePrompt(id: string, data: { content: string; description: string }): Promise<any> {
    const response = await apiClient.put(
      `${this.baseUrl}/prompts/${id}`,
      data
    );
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Erreur lors de la mise à jour du prompt');
    }
    
    return response.data;
  }

  // Utilitaires
  async exportUsers(format: 'csv' | 'json' = 'csv'): Promise<Blob> {
    const response = await fetch(`/api${this.baseUrl}/users/export?format=${format}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'export des utilisateurs');
    }

    return response.blob();
  }

  async sendBulkEmail(userIds: string[], subject: string, message: string): Promise<void> {
    const response = await apiClient.post(
      `${this.baseUrl}/bulk-email`,
      { userIds, subject, message }
    );
    
    if (!response.success) {
      throw new Error(response.error || 'Erreur lors de l\'envoi des emails');
    }
  }

  // Gestion du cache
  async clearCache(cacheType?: 'users' | 'stats' | 'all'): Promise<void> {
    const response = await apiClient.post(
      `${this.baseUrl}/cache/clear`,
      { type: cacheType || 'all' }
    );
    
    if (!response.success) {
      throw new Error(response.error || 'Erreur lors de la suppression du cache');
    }
  }

  // Monitoring système
  async getSystemHealth(): Promise<{ [key: string]: 'healthy' | 'warning' | 'error' }> {
    const response = await apiClient.get(
      `${this.baseUrl}/health`
    );
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Erreur lors de la vérification de l\'état du système');
    }
    
    return response.data;
  }

  async restartService(serviceName: string): Promise<void> {
    const response = await apiClient.post(
      `${this.baseUrl}/services/${serviceName}/restart`,
      {}
    );
    
    if (!response.success) {
      throw new Error(response.error || `Erreur lors du redémarrage du service ${serviceName}`);
    }
  }
}

export const adminService = new AdminService();
export default adminService;
