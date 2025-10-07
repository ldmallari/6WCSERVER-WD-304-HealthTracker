import { createStore } from 'vuex'
import auth from './modules/auth'
import healthLogs from './modules/healthLogs'
import articles from './modules/articles'
import user from './modules/user'

export default createStore({
  modules: {
    auth,
    healthLogs,
    articles,
    user
  }
})
