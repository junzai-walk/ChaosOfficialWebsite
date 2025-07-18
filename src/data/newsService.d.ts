/**
 * newsService.js 的TypeScript类型声明文件
 */

import { NewsItem, DataSourceType, ApiConfig, INewsService } from '../types/news'

// 数据源类型常量
export declare const DATA_SOURCE_TYPE: {
  readonly STATIC: 'static'
  readonly API: 'api'
  readonly HYBRID: 'hybrid'
}

// API配置
export declare const API_CONFIG: ApiConfig

// 新闻服务类
declare class NewsService implements INewsService {
  dataSource: DataSourceType
  cache: Map<string, any>
  cacheTimeout: number

  constructor()
  
  setDataSource(sourceType: DataSourceType): void
  clearCache(): void
  setCache(key: string, data: any): void
  getCache(key: string): any
  getAllNews(): Promise<NewsItem[]>
  getNewsDetail(newsId: string): Promise<NewsItem | null>
  getLatestNews(count?: number): Promise<NewsItem[]>
  getHotNews(): Promise<NewsItem[]>
  getImageUrl(imageName: string): string
  fetchFromAPI(endpoint: string): Promise<any>
  validateNewsData(data: any): boolean
}

// 默认导出的服务实例
declare const newsService: NewsService
export default newsService
