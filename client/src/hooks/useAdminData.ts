import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../services/adminService';
import { AdminStats, AdminUser, UseAdminDataReturn } from '../types/admin';

export const useAdminData = (): UseAdminDataReturn => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshStats = useCallback(async () => {
    try {
      setError(null);
      const statsData = await adminService.getStats();
      setStats(statsData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la récupération des statistiques';
      setError(errorMessage);
      console.error('Erreur stats:', err);
    }
  }, []);

  const refreshUsers = useCallback(async () => {
    try {
      setError(null);
      const usersResponse = await adminService.getUsers({ limit: 10 });
      // Fix: Access users array from paginated response
      // usersResponse is PaginatedResponse<AdminUser> which has { data: AdminUser[], pagination: {...} }
      setUsers(usersResponse.data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la récupération des utilisateurs';
      setError(errorMessage);
      console.error('Erreur users:', err);
      // Ensure users is always an array even on error
      setUsers([]);
    }
  }, []);

  const loadInitialData = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([refreshStats(), refreshUsers()]);
    } catch (err) {
      console.error('Erreur lors du chargement initial:', err);
    } finally {
      setLoading(false);
    }
  }, [refreshStats, refreshUsers]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return {
    stats,
    users,
    loading,
    error,
    refreshStats,
    refreshUsers
  };
};
