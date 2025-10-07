import api from '../../services/api'

const state = {
  logs: [],
  currentLog: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    total: 0
  },
  stats: []
}

const getters = {
  allLogs: state => state.logs,
  currentLog: state => state.currentLog,
  isLoading: state => state.loading,
  error: state => state.error,
  pagination: state => state.pagination,
  stats: state => state.stats
}

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  SET_LOGS(state, logs) {
    state.logs = logs
  },
  SET_CURRENT_LOG(state, log) {
    state.currentLog = log
  },
  ADD_LOG(state, log) {
    state.logs.unshift(log)
  },
  UPDATE_LOG(state, updatedLog) {
    const index = state.logs.findIndex(log => log._id === updatedLog._id)
    if (index !== -1) {
      state.logs.splice(index, 1, updatedLog)
    }
  },
  REMOVE_LOG(state, logId) {
    state.logs = state.logs.filter(log => log._id !== logId)
  },
  SET_PAGINATION(state, pagination) {
    state.pagination = pagination
  },
  SET_STATS(state, stats) {
    state.stats = stats
  }
}

const actions = {
  async fetchLogs({ commit }, params = {}) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      const response = await api.get('/api/health-logs', { params })
      const { logs, totalPages, currentPage, total } = response.data

      commit('SET_LOGS', logs)
      commit('SET_PAGINATION', { totalPages, currentPage, total })
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch health logs'
      commit('SET_ERROR', message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchLog({ commit }, logId) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      const response = await api.get(`/api/health-logs/${logId}`)
      commit('SET_CURRENT_LOG', response.data)
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch health log'
      commit('SET_ERROR', message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createLog({ commit }, logData) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      const response = await api.post('/api/health-logs', logData)
      commit('ADD_LOG', response.data)
      return { success: true, log: response.data }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create health log'
      commit('SET_ERROR', message)
      return { success: false, error: message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateLog({ commit }, { logId, logData }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      const response = await api.put(`/api/health-logs/${logId}`, logData)
      commit('UPDATE_LOG', response.data)
      return { success: true, log: response.data }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update health log'
      commit('SET_ERROR', message)
      return { success: false, error: message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async deleteLog({ commit }, logId) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      await api.delete(`/api/health-logs/${logId}`)
      commit('REMOVE_LOG', logId)
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete health log'
      commit('SET_ERROR', message)
      return { success: false, error: message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchStats({ commit }, params = {}) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      const response = await api.get('/api/health-logs/stats/summary', { params })
      commit('SET_STATS', response.data)
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch health stats'
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
