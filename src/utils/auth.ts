import axios from 'axios';

const API_URL = 'http://wentaonism.com:3001/api';

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器，添加认证令牌
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器，处理令牌过期
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // 令牌过期或无效，清除本地存储并重定向到登录页面
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 用户接口
interface User {
  id: string;
  phone: string;
  email: string;
  username: string;
  birthdate?: string;
  gender?: string;
}

// 注册请求接口
interface RegisterRequest {
  phone: string;
  email: string;
  username: string;
  password: string;
  birthdate: string;
  gender: string;
}

// 登录请求接口
interface LoginRequest {
  email?: string;
  phone?: string;
  password: string;
}

// 认证响应接口
interface AuthResponse {
  token: string;
  user: User;
  message: string;
}

// 认证服务
export const AuthService = {
  // 注册新用户
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error;
    }
  },

  // 用户登录
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },

  // 获取当前用户信息
  async getCurrentUser(): Promise<User | null> {
    try {
      // 首先尝试从本地存储获取用户信息
      const storedUser = this.getStoredUser();
      if (!storedUser) {
        return null;
      }

      const response = await apiClient.get('/user', {
        params: {
          storedUser: storedUser  // 可选参数
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // 确保从响应中正确提取用户数据
      const userData = response.data.user || response.data;
      // 更新本地存储的用户信息
      const updatedUser = {
        ...storedUser,
        ...userData
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error: any) {
      console.error('Get user error:', error.response?.data || error.message);
      // 如果服务器请求失败，返回本地存储的用户信息
      return null;
    }
  },

  // 退出登录
  logout(): void {
    // 清除所有认证相关的本地存储
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // 清除所有可能存在的用户相关的本地存储
    const localStorageKeys = Object.keys(localStorage);
    localStorageKeys.forEach(key => {
      // 删除所有可能包含用户信息的项
      if (key.toLowerCase().includes('user') || 
          key.toLowerCase().includes('auth') || 
          key.toLowerCase().includes('token') ||
          key.toLowerCase().includes('profile')) {
        localStorage.removeItem(key);
      }
    });

    // 重置 axios 实例
    // 创建一个全新的 axios 实例替换当前实例
    const newApiClient = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // 复制新实例的属性到当前实例
    Object.assign(apiClient, newApiClient);
    
    // 重新添加拦截器
    apiClient.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    apiClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );

    // 使用 setTimeout 确保所有清理操作都已完成后再重定向
    setTimeout(() => {
      // 最后一次检查确保 token 和 user 已被清除
      if (localStorage.getItem('token') || localStorage.getItem('user')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
      
      // 重定向到登录页面
      window.location.href = '/login';
    }, 0);
  },

  // 检查用户是否已登录
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },

  // 获取存储的用户信息
  getStoredUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      return null;
    }
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  // 更新用户信息
  async updateUserInfo(userData: {
    username: string;
    phone: string;
    email: string;
    birthdate: string;
    gender: string;
  }): Promise<{ message: string }> {
    try {
      const response = await apiClient.put('/user/update', userData);
      
      // 更新本地存储的用户信息
      const storedUser = this.getStoredUser();
      if (storedUser) {
        const updatedUser = {
          ...storedUser,
          ...userData
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Update user info error:', error.response?.data || error.message);
      // 将服务器返回的错误消息传递给调用者
      throw {
        message: error.response?.data?.message || '更新用户信息失败',
        ...error
      };
    }
  },

  // 修改密码
  async changePassword(passwordData: {
    oldPassword: string;
    newPassword: string;
  }): Promise<void> {
    try {
      await apiClient.put('/user/change-password', passwordData);
    } catch (error: any) {
      console.error('Change password error:', error.response?.data || error.message);
      throw error;
    }
  }
};

export default AuthService;