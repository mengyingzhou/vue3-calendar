import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

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
  email: string;
  username: string;
  birthdate?: string;
  gender?: string;
}

// 注册请求接口
interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  birthdate: string;
  gender: string;
}

// 登录请求接口
interface LoginRequest {
  email: string;
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
    const response = await apiClient.post<AuthResponse>('/register', userData);
    return response.data;
  },

  // 用户登录
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/login', credentials);
    return response.data;
  },

  // 获取当前用户信息
  async getCurrentUser(): Promise<User | null> {
    try {
      // 首先尝试从本地存储获取用户信息
      const storedUser = this.getStoredUser();
      if (!storedUser) {
        return null;
      }

      // 如果有token，尝试从服务器获取最新信息
      const token = localStorage.getItem('token');
      if (token) {
        const response = await apiClient.get('/user');
        // 更新本地存储的用户信息
        const updatedUser = {
          ...storedUser,
          ...response.data
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
      }
      
      return storedUser;
    } catch (error) {
      // 如果服务器请求失败，返回本地存储的用户信息
      return this.getStoredUser();
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
  }
};

export default AuthService;