import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../services/adminService';
import { 
  AdminUser, 
  CreateUserRequest, 
  UpdateUserRequest, 
  UserFilters, 
  UseUserManagementReturn 
} from '../types/admin';

export const useUserManagement = (): UseUserManagementReturn => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<UserFilters>({
    page: 1,
    limit: 20,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });

  const refreshUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getUsers(filters);
      // Fix: Access users array and pagination data from correct structure
      // response.data is PaginatedResponse<AdminUser> which has { data: AdminUser[], pagination: {...} }
      setUsers(response.data || []);
      setPagination({
        page: response.pagination?.page || 1,
        limit: response.pagination?.limit || 20,
        total: response.pagination?.total || 0,
        pages: response.pagination?.pages || 0
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la récupération des utilisateurs';
      setError(errorMessage);
      console.error('Erreur users:', err);
      // Ensure safe fallback values
      setUsers([]);
      setPagination({ page: 1, limit: 20, total: 0, pages: 0 });
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const createUser = useCallback(async (userData: CreateUserRequest): Promise<AdminUser> => {
    try {
      setError(null);
      const newUser = await adminService.createUser(userData);
      await refreshUsers(); // Refresh la liste
      return newUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la création de l\'utilisateur';
      setError(errorMessage);
      throw err;
    }
  }, [refreshUsers]);

  const updateUser = useCallback(async (id: string, userData: UpdateUserRequest): Promise<AdminUser> => {
    try {
      setError(null);
      const updatedUser = await adminService.updateUser(id, userData);
      await refreshUsers(); // Refresh la liste
      return updatedUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la mise à jour de l\'utilisateur';
      setError(errorMessage);
      throw err;
    }
  }, [refreshUsers]);

  const deleteUser = useCallback(async (id: string): Promise<void> => {
    try {
      setError(null);
      await adminService.deleteUser(id);
      await refreshUsers(); // Refresh la liste
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la suppression de l\'utilisateur';
      setError(errorMessage);
      throw err;
    }
  }, [refreshUsers]);

  const updateFilters = useCallback((newFilters: Partial<UserFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  return {
    users,
    loading,
    error,
    filters,
    pagination,
    setFilters: updateFilters,
    createUser,
    updateUser,
    deleteUser,
    refreshUsers
  };
};
