/**
 * newsData.js 的TypeScript类型声明文件
 */

import { NewsItem, NewsImages } from '../types/news'

// 图片资源映射
export declare const newsImages: NewsImages

// 获取排序后的新闻数据
export declare function getSortedNewsData(): NewsItem[]

// 根据ID获取单条新闻数据
export declare function getNewsById(newsId: string): NewsItem | null

// 获取最新的N条新闻
export declare function getLatestNews(count?: number): NewsItem[]

// 获取热点推荐新闻
export declare function getHotNews(): NewsItem[]

// 默认导出所有新闻数据（已排序）
declare const newsData: NewsItem[]
export default newsData
