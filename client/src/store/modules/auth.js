import api from '../../services/api'

const state = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null
}

const getters = {
  isAuthenticated: state => !!state.token,
  currentUser: state => state.user,
  isLoading: state => state.loading,
  error: state => state.error
}

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_TOKEN(state, token) {
    state.token = token
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  },
  SET_USER(state, user) {
    state.user = user
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  },
  CLEAR_AUTH(state) {
    state.token = null
    state.user = null
    state.error = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}

const actions = {
  async login({ commit }, credentials) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)


      const response = await api.post('/api/auth/login', credentials)
      
      const { token, user } = response.data

      commit('SET_TOKEN', token)
      commit('SET_USER', user)

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      commit('SET_ERROR', message)
      return { success: false, error: message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async register({ commit }, userData) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      const response = await api.post('/api/auth/register', userData)
      const { token, user } = response.data

      commit('SET_TOKEN', token)
      commit('SET_USER', user)

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      commit('SET_ERROR', message)
      return { success: false, error: message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async logout({ commit }) {
    try {
      commit('CLEAR_AUTH')
      
      delete api.defaults.headers.common['Authorization']
      
      localStorage.clear()
      
      return { success: true }
    } catch (error) {
      commit('CLEAR_AUTH')
      delete api.defaults.headers.common['Authorization']
      localStorage.clear()
      return { success: false, error: error.message }
    }
  },

  async checkAuth({ commit, state }) {
    if (!state.token) return

    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`

      const response = await api.get('/api/auth/me')
      commit('SET_USER', response.data.user)
    } catch (error) {
      commit('CLEAR_AUTH')
      delete api.defaults.headers.common['Authorization']
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
