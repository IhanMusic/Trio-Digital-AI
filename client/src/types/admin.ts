// Types pour l'administration
export interface AdminUser {
  _id: string;
  email: string;
  name: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  isAdmin: boolean;
  subscription: {
    plan: 'free' | 'starter' | 'pro' | 'enterprise';
    status: 'active' | 'canceled' | 'expired';
    currentPeriodEnd?: Date;
  };
  settings: {
    language: string;
    notifications: boolean;
    timezone: string;
  };
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role?: 'owner' | 'admin' | 'editor' | 'viewer';
}

export interface UpdateUserRequest {
  name?: string;
  role?: 'owner' | 'admin' | 'editor' | 'viewer';
  subscription?: {
    plan: 'free' | 'starter' | 'pro' | 'enterprise';
    status: 'active' | 'canceled' | 'expired';
  };
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  totalGenerations: number;
  generationsThisMonth: number;
  systemHealth: {
    database: 'healthy' | 'warning' | 'error';
    gptService: 'healthy' | 'warning' | 'error';
    geminiService: 'healthy' | 'warning' | 'error';
    storageService: 'healthy' | 'warning' | 'error';
  };
}

export interface SystemMetric {
  name: string;
  value: number | string;
  status: 'healthy' | 'warning' | 'error';
  lastUpdated: Date;
  description?: string;
}

export interface ActivityLog {
  _id: string;
  userId: string;
  userEmail: string;
  action: string;
  resource: string;
  details?: any;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface UserFilters {
  search?: string;
  role?: 'owner' | 'admin' | 'editor' | 'viewer' | 'all';
  plan?: 'free' | 'starter' | 'pro' | 'enterprise' | 'all';
  status?: 'active' | 'canceled' | 'expired' | 'all';
  sortBy?: 'name' | 'email' | 'createdAt' | 'lastLogin';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Types pour les modales
export interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: AdminUser;
  onSave: (user: AdminUser) => void;
}

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

// Types pour les hooks
export interface UseAdminDataReturn {
  stats: AdminStats | null;
  users: AdminUser[];
  loading: boolean;
  error: string | null;
  refreshStats: () => Promise<void>;
  refreshUsers: () => Promise<void>;
}

export interface UseUserManagementReturn {
  users: AdminUser[];
  loading: boolean;
  error: string | null;
  filters: UserFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  setFilters: (filters: Partial<UserFilters>) => void;
  createUser: (userData: CreateUserRequest) => Promise<AdminUser>;
  updateUser: (id: string, userData: UpdateUserRequest) => Promise<AdminUser>;
  deleteUser: (id: string) => Promise<void>;
  refreshUsers: () => Promise<void>;
}

// Types pour les composants de tableau
export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
  width?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  onSort?: (key: string, order: 'asc' | 'desc') => void;
  sortKey?: string;
  sortOrder?: 'asc' | 'desc';
  emptyMessage?: string;
}

// Types pour les notifications
export interface NotificationState {
  show: boolean;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}
