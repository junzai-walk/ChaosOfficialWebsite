import { post } from '@/utils/request';

// 定义表单数据接口
export interface ConsultFormData {
  company: string;
  name: string;
  phone: string;
}

// 定义响应数据接口
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

/**
 * 提交咨询表单
 * @param data 表单数据
 * @returns Promise
 */
export function submitConsultForm(data: ConsultFormData): Promise<ApiResponse<any>> {
  return post<ApiResponse<any>>('/api/contact', data);
}
