/**
 * 新闻相关的TypeScript类型定义
 */

// 新闻数据接口
export interface NewsItem {
  id: string
  title: string
  subTitle: string
  date: string
  imgUrl: string
  description: string
  content: string
}

// 新闻列表项接口（用于列表显示）
export interface NewsListItem {
  id: string
  mainTitle?: string
  title?: string
  subTitle: string
  date: string
  imgUrl: string
  image?: string
  description?: string
}

// 热点新闻项接口
export interface HotNewsItem {
  id: string
  mainTitle: string
  date: string
}

// 数据源类型
export type DataSourceType = 'static' | 'api' | 'hybrid'

// API配置接口
export interface ApiConfig {
  baseUrl: string
  endpoints: {
    news: string
    newsDetail: string
    hotNews: string
    latestNews: string
  }
  timeout: number
}

// 缓存项接口
export interface CacheItem<T = any> {
  data: T
  timestamp: number
}

// 新闻服务接口
export interface INewsService {
  setDataSource(sourceType: DataSourceType): void
  clearCache(): void
  getAllNews(): Promise<NewsItem[]>
  getNewsDetail(newsId: string): Promise<NewsItem | null>
  getLatestNews(count?: number): Promise<NewsItem[]>
  getHotNews(): Promise<NewsItem[]>
  getImageUrl(imageName: string): string
}

// 图片资源映射接口
export interface NewsImages {
  [key: string]: string
}
