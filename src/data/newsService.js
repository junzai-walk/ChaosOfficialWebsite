/**
 * 新闻数据服务抽象层
 * 为CMS系统预留接口，提供统一的数据获取方式
 * 支持从静态配置或API获取数据，保持向后兼容性
 */

import { 
  getSortedNewsData, 
  getNewsById, 
  getLatestNews, 
  getHotNews,
  newsImages 
} from './newsData.js'

/**
 * 数据源类型枚举
 */
export const DATA_SOURCE_TYPE = {
  STATIC: 'static',    // 静态数据源（当前使用）
  API: 'api',          // API数据源（为CMS系统预留）
  HYBRID: 'hybrid'     // 混合数据源
}

/**
 * 当前数据源配置
 * 可通过环境变量或配置文件动态调整
 */
const currentDataSource = DATA_SOURCE_TYPE.STATIC

/**
 * API配置（为CMS系统预留）
 */
const API_CONFIG = {
  baseUrl: import.meta.env.VITE_CMS_API_URL || '/api/cms',
  endpoints: {
    news: '/news',
    newsDetail: '/news/:id',
    hotNews: '/news/hot',
    latestNews: '/news/latest'
  },
  timeout: 10000
}

/**
 * 新闻数据服务类
 * 提供统一的数据获取接口
 */
class NewsService {
  constructor() {
    this.dataSource = currentDataSource
    this.cache = new Map()
    this.cacheTimeout = 5 * 60 * 1000 // 5分钟缓存
  }

  /**
   * 设置数据源类型
   * @param {string} sourceType - 数据源类型
   */
  setDataSource(sourceType) {
    if (Object.values(DATA_SOURCE_TYPE).includes(sourceType)) {
      this.dataSource = sourceType
      this.clearCache()
    } else {
      console.warn(`Invalid data source type: ${sourceType}`)
    }
  }

  /**
   * 清除缓存
   */
  clearCache() {
    this.cache.clear()
  }

  /**
   * 缓存管理
   * @param {string} key - 缓存键
   * @param {*} data - 缓存数据
   */
  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    })
  }

  /**
   * 获取缓存
   * @param {string} key - 缓存键
   * @returns {*} 缓存数据或null
   */
  getCache(key) {
    const cached = this.cache.get(key)
    if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
      return cached.data
    }
    this.cache.delete(key)
    return null
  }

  /**
   * 获取所有新闻数据（已排序）
   * @returns {Promise<Array>} 新闻数据数组
   */
  async getAllNews() {
    const cacheKey = 'all_news'
    const cached = this.getCache(cacheKey)
    if (cached) return cached

    try {
      let newsData = []
      
      switch (this.dataSource) {
        case DATA_SOURCE_TYPE.STATIC:
          newsData = getSortedNewsData()
          break
          
        case DATA_SOURCE_TYPE.API:
          newsData = await this.fetchFromAPI(API_CONFIG.endpoints.news)
          break
          
        case DATA_SOURCE_TYPE.HYBRID:
          // 优先从API获取，失败时回退到静态数据
          try {
            newsData = await this.fetchFromAPI(API_CONFIG.endpoints.news)
          } catch (error) {
            console.warn('API fetch failed, falling back to static data:', error)
            newsData = getSortedNewsData()
          }
          break
          
        default:
          newsData = getSortedNewsData()
      }

      this.setCache(cacheKey, newsData)
      return newsData
    } catch (error) {
      console.error('Error fetching news data:', error)
      // 出错时返回静态数据作为备选
      return getSortedNewsData()
    }
  }

  /**
   * 根据ID获取单条新闻
   * @param {string} newsId - 新闻ID
   * @returns {Promise<Object|null>} 新闻数据对象或null
   */
  async getNewsDetail(newsId) {
    if (!newsId) return null

    const cacheKey = `news_${newsId}`
    const cached = this.getCache(cacheKey)
    if (cached) return cached

    try {
      let newsDetail = null
      
      switch (this.dataSource) {
        case DATA_SOURCE_TYPE.STATIC:
          newsDetail = getNewsById(newsId)
          break
          
        case DATA_SOURCE_TYPE.API:
          const endpoint = API_CONFIG.endpoints.newsDetail.replace(':id', newsId)
          newsDetail = await this.fetchFromAPI(endpoint)
          break
          
        case DATA_SOURCE_TYPE.HYBRID:
          try {
            const endpoint = API_CONFIG.endpoints.newsDetail.replace(':id', newsId)
            newsDetail = await this.fetchFromAPI(endpoint)
          } catch (error) {
            console.warn('API fetch failed, falling back to static data:', error)
            newsDetail = getNewsById(newsId)
          }
          break
          
        default:
          newsDetail = getNewsById(newsId)
      }

      if (newsDetail) {
        this.setCache(cacheKey, newsDetail)
      }
      return newsDetail
    } catch (error) {
      console.error('Error fetching news detail:', error)
      return getNewsById(newsId)
    }
  }

  /**
   * 获取最新新闻
   * @param {number} count - 获取数量
   * @returns {Promise<Array>} 最新新闻数组
   */
  async getLatestNews(count = 5) {
    const cacheKey = `latest_news_${count}`
    const cached = this.getCache(cacheKey)
    if (cached) return cached

    try {
      let latestNews = []
      
      switch (this.dataSource) {
        case DATA_SOURCE_TYPE.STATIC:
          latestNews = getLatestNews(count)
          break
          
        case DATA_SOURCE_TYPE.API:
          latestNews = await this.fetchFromAPI(`${API_CONFIG.endpoints.latestNews}?count=${count}`)
          break
          
        case DATA_SOURCE_TYPE.HYBRID:
          try {
            latestNews = await this.fetchFromAPI(`${API_CONFIG.endpoints.latestNews}?count=${count}`)
          } catch (error) {
            console.warn('API fetch failed, falling back to static data:', error)
            latestNews = getLatestNews(count)
          }
          break
          
        default:
          latestNews = getLatestNews(count)
      }

      this.setCache(cacheKey, latestNews)
      return latestNews
    } catch (error) {
      console.error('Error fetching latest news:', error)
      return getLatestNews(count)
    }
  }

  /**
   * 获取热点新闻
   * @returns {Promise<Array>} 热点新闻数组
   */
  async getHotNews() {
    const cacheKey = 'hot_news'
    const cached = this.getCache(cacheKey)
    if (cached) return cached

    try {
      let hotNews = []
      
      switch (this.dataSource) {
        case DATA_SOURCE_TYPE.STATIC:
          hotNews = getHotNews()
          break
          
        case DATA_SOURCE_TYPE.API:
          hotNews = await this.fetchFromAPI(API_CONFIG.endpoints.hotNews)
          break
          
        case DATA_SOURCE_TYPE.HYBRID:
          try {
            hotNews = await this.fetchFromAPI(API_CONFIG.endpoints.hotNews)
          } catch (error) {
            console.warn('API fetch failed, falling back to static data:', error)
            hotNews = getHotNews()
          }
          break
          
        default:
          hotNews = getHotNews()
      }

      this.setCache(cacheKey, hotNews)
      return hotNews
    } catch (error) {
      console.error('Error fetching hot news:', error)
      return getHotNews()
    }
  }

  /**
   * 获取图片资源
   * @param {string} imageName - 图片名称
   * @returns {string} 图片URL
   */
  getImageUrl(imageName) {
    return newsImages[imageName] || ''
  }

  /**
   * 从API获取数据（为CMS系统预留）
   * @param {string} endpoint - API端点
   * @returns {Promise<*>} API响应数据
   */
  async fetchFromAPI(endpoint) {
    const url = `${API_CONFIG.baseUrl}${endpoint}`
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout)
    
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          // 可添加认证头等
        }
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data.data || data // 适配不同的API响应格式
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
  }

  /**
   * 数据验证
   * @param {*} data - 待验证的数据
   * @returns {boolean} 验证结果
   */
  validateNewsData(data) {
    if (!data || !Array.isArray(data)) return false
    
    return data.every(item => 
      item.id && 
      item.title && 
      item.date && 
      item.content
    )
  }
}

// 创建单例实例
const newsService = new NewsService()

// 导出服务实例和相关配置
export default newsService
export { API_CONFIG }
