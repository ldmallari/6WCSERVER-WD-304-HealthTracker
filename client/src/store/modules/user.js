import axios from 'axios'

const state = {
  profile: null,
  loading: false,
  error: null
}

const getters = {
  profile: state => state.profile,
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
  SET_PROFILE(state, profile) {
    state.profile = profile
  },
  UPDATE_PROFILE(state, profile) {
    state.profile = { ...state.profile, ...profile }
  }
}

const actions = {
  async fetchProfile({ commit }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      const response = await axios.get('/api/users/profile')
      commit('SET_PROFILE', response.data.user)
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch profile'
      commit('SET_ERROR', message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updateProfile({ commit }, profileData) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      const response = await axios.put('/api/users/profile', profileData)
      commit('UPDATE_PROFILE', response.data.user)
      return { success: true, user: response.data.user }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update profile'
      commit('SET_ERROR', message)
      return { success: false, error: message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async updatePassword({ commit }, passwordData) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      await axios.put('/api/users/password', passwordData)
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update password'
      commit('SET_ERROR', message)
      return { success: false, error: message }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async deleteAccount({ commit }) {
    try {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)

      await axios.delete('/api/users/account')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete account'
      commit('SET_ERROR', message)
      return { success: false, error: message }
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
