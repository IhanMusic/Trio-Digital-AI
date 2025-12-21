import React, { useState } from 'react';
import { useUserManagement } from '../../hooks/useUserManagement';
import { AdminUser } from '../../types/admin';
import EmptyState from '../common/EmptyState';

// Icônes SVG
const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const Edit = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const Trash = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const UserManagement: React.FC = () => {
  const { 
    users, 
    loading, 
    error, 
    filters, 
    pagination, 
    setFilters, 
    deleteUser, 
    refreshUsers 
  } = useUserManagement();

  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);

  const handleSearch = (query: string) => {
    setFilters({ search: query, page: 1 });
  };

  const handleRoleFilter = (role: string) => {
    setFilters({ role: role as any, page: 1 });
  };

  const handleSort = (sortBy: string) => {
    const newOrder = filters.sortBy === sortBy && filters.sortOrder === 'asc' ? 'desc' : 'asc';
    setFilters({ sortBy: sortBy as any, sortOrder: newOrder });
  };

  const handlePageChange = (page: number) => {
    setFilters({ page });
  };

  const handleDeleteClick = (user: AdminUser) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete._id);
        setShowDeleteModal(false);
        setUserToDelete(null);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-purple-500/20 text-purple-300';
      case 'admin': return 'bg-red-500/20 text-red-300';
      case 'editor': return 'bg-blue-500/20 text-blue-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-400';
      case 'canceled': return 'bg-red-400';
      case 'expired': return 'bg-yellow-400';
      default: return 'bg-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Gestion des utilisateurs</h1>
        </div>
        
        <div className="glass-panel p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-white/20 rounded w-1/4"></div>
                  <div className="h-3 bg-white/20 rounded w-1/3"></div>
                </div>
                <div className="h-6 bg-white/20 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestion des utilisateurs</h1>
          <p className="text-white/60 mt-1">
            {pagination?.total || 0} utilisateur{(pagination?.total || 0) > 1 ? 's' : ''} au total
          </p>
        </div>
        <button className="glass-button flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Nouvel utilisateur</span>
        </button>
      </div>

      {/* Filters */}
      <div className="glass-panel p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Rechercher par nom ou email..."
                onChange={(e) => handleSearch(e.target.value)}
                className="glass-input pl-10 pr-4 py-3 w-full"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={filters.role || 'all'}
              onChange={(e) => handleRoleFilter(e.target.value)}
              className="glass-input px-3 py-2 text-sm"
            >
              <option value="all">Tous les rôles</option>
              <option value="owner">Propriétaire</option>
              <option value="admin">Administrateur</option>
              <option value="editor">Éditeur</option>
              <option value="viewer">Visualiseur</option>
            </select>
            
            <select
              value={filters.plan || 'all'}
              onChange={(e) => setFilters({ plan: e.target.value as any, page: 1 })}
              className="glass-input px-3 py-2 text-sm"
            >
              <option value="all">Tous les plans</option>
              <option value="free">Gratuit</option>
              <option value="starter">Starter</option>
              <option value="pro">Pro</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="glass-panel p-6 border-red-500/20">
          <div className="text-center">
            <div className="text-red-400 mb-2">⚠️</div>
            <h3 className="text-lg font-medium text-white mb-2">Erreur</h3>
            <p className="text-white/60 mb-4">{error}</p>
            <button onClick={refreshUsers} className="glass-button">
              Réessayer
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      {users.length > 0 ? (
        <div className="glass-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr>
                  <th 
                    className="text-left p-4 text-white/80 font-medium cursor-pointer hover:text-white"
                    onClick={() => handleSort('name')}
                  >
                    Utilisateur
                  </th>
                  <th 
                    className="text-left p-4 text-white/80 font-medium cursor-pointer hover:text-white"
                    onClick={() => handleSort('role')}
                  >
                    Rôle
                  </th>
                  <th className="text-left p-4 text-white/80 font-medium">Plan</th>
                  <th className="text-left p-4 text-white/80 font-medium">Statut</th>
                  <th 
                    className="text-left p-4 text-white/80 font-medium cursor-pointer hover:text-white"
                    onClick={() => handleSort('createdAt')}
                  >
                    Inscription
                  </th>
                  <th className="text-right p-4 text-white/80 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#53dfb2] to-[#3fa88a] rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-white/60 text-sm">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-white/80 capitalize">{user.subscription.plan}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(user.subscription.status)}`} />
                        <span className="text-white/80 text-sm capitalize">{user.subscription.status}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-white/60 text-sm">
                        {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4 text-white/60 hover:text-white" />
                        </button>
                        {user.email !== 'hello@thirdadvertising.dz' && (
                          <button 
                            onClick={() => handleDeleteClick(user)}
                            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash className="w-4 h-4 text-red-400 hover:text-red-300" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-white/10">
              <div className="text-white/60 text-sm">
                Page {pagination.page} sur {pagination.pages} ({pagination.total} résultats)
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 text-white/60" />
                </button>
                
                {[...Array(Math.min(5, pagination.pages))].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        page === pagination.page
                          ? 'bg-[#53dfb2] text-white'
                          : 'text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4 text-white/60" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <EmptyState
          title="Aucun utilisateur trouvé"
          description="Aucun utilisateur ne correspond à vos critères de recherche"
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)} />
          <div className="glass-panel p-6 max-w-md w-full relative">
            <h3 className="text-lg font-semibold text-white mb-4">Confirmer la suppression</h3>
            <p className="text-white/80 mb-6">
              Êtes-vous sûr de vouloir supprimer l'utilisateur <strong>{userToDelete.name}</strong> ?
              Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-white/60 hover:text-white transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
