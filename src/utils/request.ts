import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';

// 创建 axios 实例
const service = axios.create({
  // 在开发环境中使用代理
  baseURL: import.meta.env.MODE === 'development' ? '' : 'http://localhost:5000',
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么，例如添加 token
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers = {
    //     ...config.headers,
    //     'Authorization': `Bearer ${token}`
    //   };
    // }
    return config;
  },
  (error: AxiosError) => {
    // 对请求错误做些什么
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;

    // 根据自定义错误码判断请求是否成功
    if (res.code && res.code !== 200) {
      // 处理业务错误
      ElMessage.error(res.message || '请求失败');

      // 特定错误码处理，例如未授权或token过期
      if (res.code === 401) {
        // 处理未授权情况，例如跳转到登录页
        // router.push('/login');
      }

      return Promise.reject(new Error(res.message || '请求失败'));
    } else {
      // 请求成功
      return res;
    }
  },
  (error: AxiosError) => {
    // 处理 HTTP 错误状态码
    let message = '请求失败';
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          message = '请求错误';
          break;
        case 401:
          message = '未授权，请重新登录';
          // 可以在这里处理登出逻辑
          break;
        case 403:
          message = '拒绝访问';
          break;
        case 404:
          message = '请求地址出错';
          break;
        case 408:
          message = '请求超时';
          break;
        case 500:
          message = '服务器内部错误';
          break;
        case 501:
          message = '服务未实现';
          break;
        case 502:
          message = '网关错误';
          break;
        case 503:
          message = '服务不可用';
          break;
        case 504:
          message = '网关超时';
          break;
        case 505:
          message = 'HTTP版本不受支持';
          break;
        default:
          message = `未知错误(${status})`;
      }
    } else if (error.message.includes('timeout')) {
      message = '请求超时';
    } else {
      message = '网络异常';
    }

    ElMessage.error(message);
    return Promise.reject(error);
  }
);

// 封装 GET 请求
export function get<T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
  return service.get(url, { params, ...config });
}

// 封装 POST 请求
export function post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  return service.post(url, data, config);
}

// 封装 PUT 请求
export function put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  return service.put(url, data, config);
}

// 封装 DELETE 请求
export function del<T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
  return service.delete(url, { params, ...config });
}

export default service;
