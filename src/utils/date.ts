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

// 收藏日期接口
interface DateCollection {
  id: string;
  userId: string;
  dateString: string;
  relation: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
}

// 添加收藏日请求接口
interface AddDateRequest {
  dateString: string;
  userId?: string; // 可选，如果在请求中已经有认证令牌，服务器端可以从令牌中获取
}

// 更新收藏日请求接口
interface UpdateDateRequest {
  id: string;
  relation: string;
  gender: string;
}

// 收藏日响应接口
interface DateCollectionResponse {
  message: string;
  collections?: DateCollection[];
  collection?: DateCollection;
}

// 日期服务
export const DateService = {
  // 查询用户的所有收藏日
  async getDateCollections(userId?: string): Promise<DateCollection[]> {
    try {
      // 如果提供了userId，则作为查询参数传递
      const params = userId ? { userId } : {};
      const response = await apiClient.get<DateCollectionResponse>('/date-collection', { params });
      return response.data.collections || [];
    } catch (error: any) {
      console.error('获取收藏日错误:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // 检查特定日期是否已被收藏
  async isDateFavorited(dateString: string, userId?: string): Promise<boolean> {
    try {
      const collections = await this.getDateCollections(userId);
      return collections.some(collection => collection.dateString === dateString);
    } catch (error: any) {
      console.error('检查日期收藏状态错误:', error.response?.data || error.message);
      return false;
    }
  },

  // 添加新的收藏日
  async addDate(dateData: AddDateRequest): Promise<DateCollection> {
    try {
      const response = await apiClient.post<DateCollectionResponse>('/add-date', dateData);
      return response.data.collection as DateCollection;
    } catch (error: any) {
      console.error('添加收藏日错误:', error.response?.data || error.message);
      throw error;
    }
  },

  // 更新收藏日信息
  async updateDate(updateData: UpdateDateRequest): Promise<{ message: string }> {
    try {
      const response = await apiClient.put<DateCollectionResponse>(`/update-date`, updateData);
      return { message: response.data.message };
    } catch (error: any) {
      console.error('更新收藏日错误:', error.response?.data || error.message);
      throw error;
    }
  },

  // 删除收藏日
  async deleteDate(id: string): Promise<{ message: string }> {
    try {
      const response = await apiClient.delete<DateCollectionResponse>(`/delete-date/${id}`);
      return { message: response.data.message };
    } catch (error: any) {
      console.error('删除收藏日错误:', error.response?.data || error.message);
      throw error;
    }
  }
};

export default DateService;