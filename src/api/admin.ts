import { get, post, del } from '@/utils/request';

// 定义管理员登录数据接口
export interface AdminLoginData {
  username: string;
  password: string;
}

// 定义联系人数据接口
export interface ContactData {
  id: number;
  company: string;
  name: string;
  phone: string;
  wish?: string;
  formType: 'consult' | 'cooperation';
  formTypeName: string;
  createdAt: string;
  updatedAt: string;
}

// 定义分页信息接口
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// 定义联系人列表响应接口
export interface ContactListResponse {
  contacts: ContactData[];
  pagination: PaginationInfo;
}

// 定义统计信息接口
export interface StatsData {
  total: number;
  consult: number;
  cooperation: number;
  today: number;
  week: number;
  month: number;
}

// 管理员登录响应数据
export interface LoginResponse {
  token: string;
  username: string;
  role: string;
  roleName: string;
  permissions: string[];
}

// 用户信息接口
export interface UserInfo {
  username: string;
  role: string;
  roleName: string;
  permissions: string[];
}

// 导出数据接口
export interface ExportData {
  contacts: any[];
  total: number;
  exportTime: string;
  exportBy: string;
}

// 定义查询参数接口
export interface ContactQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: 'all' | 'consult' | 'cooperation';
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

// 定义响应数据接口
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

/**
 * 管理员登录
 * @param data 登录数据
 * @returns Promise
 */
export function adminLogin(data: AdminLoginData): Promise<ApiResponse<LoginResponse>> {
  return post<ApiResponse<LoginResponse>>('/admin/login', data);
}

/**
 * 获取联系人列表
 * @param params 查询参数
 * @returns Promise
 */
export function getContactList(params: ContactQueryParams = {}): Promise<ApiResponse<ContactListResponse>> {
  const token = localStorage.getItem('adminToken');
  return get<ApiResponse<ContactListResponse>>('/admin/contacts', params, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

/**
 * 获取统计信息
 * @returns Promise
 */
export function getContactStats(): Promise<ApiResponse<StatsData>> {
  const token = localStorage.getItem('adminToken');
  return get<ApiResponse<StatsData>>('/admin/contacts/stats', undefined, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

/**
 * 检查管理员登录状态
 * @returns boolean
 */
export function isAdminLoggedIn(): boolean {
  const token = localStorage.getItem('adminToken');
  return !!token;
}

/**
 * 管理员登出
 */
export function adminLogout(): void {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUsername');
  localStorage.removeItem('adminRole');
  localStorage.removeItem('adminRoleName');
  localStorage.removeItem('adminPermissions');
}

/**
 * 保存管理员登录信息
 * @param loginData 登录响应数据
 */
export function saveAdminInfo(loginData: LoginResponse): void {
  localStorage.setItem('adminToken', loginData.token);
  localStorage.setItem('adminUsername', loginData.username);
  localStorage.setItem('adminRole', loginData.role);
  localStorage.setItem('adminRoleName', loginData.roleName);
  localStorage.setItem('adminPermissions', JSON.stringify(loginData.permissions));
}

/**
 * 获取管理员用户名
 * @returns string | null
 */
export function getAdminUsername(): string | null {
  return localStorage.getItem('adminUsername');
}

/**
 * 获取管理员用户信息
 * @returns UserInfo | null
 */
export function getAdminUserInfo(): UserInfo | null {
  const username = localStorage.getItem('adminUsername');
  const role = localStorage.getItem('adminRole');
  const roleName = localStorage.getItem('adminRoleName');
  const permissionsStr = localStorage.getItem('adminPermissions');

  if (!username || !role || !roleName || !permissionsStr) {
    return null;
  }

  try {
    const permissions = JSON.parse(permissionsStr);
    return {
      username,
      role,
      roleName,
      permissions
    };
  } catch (error) {
    return null;
  }
}

/**
 * 检查用户是否有指定权限
 * @param permission 权限名称
 * @returns boolean
 */
export function hasPermission(permission: string): boolean {
  const userInfo = getAdminUserInfo();
  return userInfo ? userInfo.permissions.includes(permission) : false;
}

/**
 * 获取用户信息（从服务器）
 * @returns Promise
 */
export function getUserInfo(): Promise<ApiResponse<UserInfo>> {
  const token = localStorage.getItem('adminToken');
  return get<ApiResponse<UserInfo>>('/admin/user/info', undefined, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

/**
 * 导出联系人数据
 * @param params 导出参数
 * @returns Promise
 */
export function exportContacts(params: ContactQueryParams = {}): Promise<ApiResponse<ExportData>> {
  const token = localStorage.getItem('adminToken');
  return post<ApiResponse<ExportData>>('/admin/contacts/export', params, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

/**
 * 删除联系人记录
 * @param id 记录ID
 * @returns Promise
 */
export function deleteContact(id: number): Promise<ApiResponse<any>> {
  const token = localStorage.getItem('adminToken');
  return del<ApiResponse<any>>(`/admin/contacts/${id}`, undefined, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}
