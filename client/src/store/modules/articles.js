import api from '../../services/api'

const state = {
  articles: [],
  currentArticle: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    total: 0
  }
}

const getters = {
  allArticles: state => state.articles,
  currentArticle: state => state.currentArticle,
  isLoading: state => state.loading,
  error: state => state.error,
  pagination: state => state.pagination
}

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_ARTICLES(state, articles) {
    state.articles = articles
  },
  SET_CURRENT_ARTICLE(state, article) {
    state.currentArticle = article
  },
  SET_PAGINATION(state, pagination) {
    state.pagination = pagination
  }
}

const actions = {
  async fetchArticles({ commit }, params = {}) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      const perPage = 50
      const url = new URL('https://dev.to/api/articles')
      url.searchParams.set('per_page', String(perPage))
      
      // Map our health categories to dev.to tags
      const healthTags = {
        'nutrition': 'nutrition',
        'exercise': 'fitness',
        'mental-health': 'mentalhealth',
        'sleep': 'health',
        'lifestyle': 'wellness',
        'medical': 'health'
      }
      
      if (params.category && healthTags[params.category]) {
        url.searchParams.set('tag', healthTags[params.category])
      } else {
        // Default to health-related content
        url.searchParams.set('tag', 'health')
      }

      const response = await fetch(url.toString(), {
        method: 'GET'
      })
      if (!response.ok) {
        throw new Error('Failed to fetch external articles')
      }
      const data = await response.json()

      const mapped = data.map(item => ({
        _id: String(item.id),
        title: item.title,
        excerpt: item.description,
        content: '',
        author: { name: item.user?.name || item.user?.username || 'Author' },
        category: (item.tag_list || [])[0] || 'general',
        tags: item.tag_list || [],
        featuredImage: item.social_image || item.cover_image || '',
        isPublished: true,
        readTime: item.reading_time_minutes || 5,
        url: item.url,
        createdAt: item.published_at
      }))

      let filtered = mapped

      // Filter for health and wellness related content
      const healthKeywords = ['health', 'wellness', 'fitness', 'nutrition', 'mental', 'exercise', 'diet', 'medical', 'sleep', 'lifestyle', 'wellbeing', 'therapy', 'mindfulness', 'yoga', 'meditation']
      
      filtered = filtered.filter(article => {
        const title = (article.title || '').toLowerCase()
        const excerpt = (article.excerpt || '').toLowerCase()
        const tags = (article.tags || []).map(tag => tag.toLowerCase())
        
        return healthKeywords.some(keyword => 
          title.includes(keyword) || 
          excerpt.includes(keyword) || 
          tags.some(tag => tag.includes(keyword))
        )
      })

      if (params.search) {
        const q = params.search.toLowerCase()
        filtered = filtered.filter(a =>
          (a.title && a.title.toLowerCase().includes(q)) ||
          (a.excerpt && a.excerpt.toLowerCase().includes(q))
        )
      }

      const total = filtered.length
      const articles = filtered.slice(0, 10) // Use limit from params

      commit('SET_ARTICLES', articles)
      commit('SET_PAGINATION', { 
        totalPages: Math.ceil(total / (params.limit || 10)), 
        currentPage: params.page || 1, 
        total 
      })
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch articles'
      commit('SET_ERROR', message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchArticle({ commit }, articleId) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      const response = await api.get(`/api/articles/${articleId}`)
      commit('SET_CURRENT_ARTICLE', response.data)
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch article'
      commit('SET_ERROR', message)
    } finally {
      commit('SET_LOADING', false)
    }
  },


  clearError({ commit }) {
    commit('SET_ERROR', null)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
