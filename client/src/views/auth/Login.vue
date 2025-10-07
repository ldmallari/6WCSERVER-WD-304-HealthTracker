<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="card p-8">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LogIn class="w-8 h-8 text-primary-600" />
          </div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p class="text-gray-600">Sign in to your HealthTracker account</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="label">Email Address</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail class="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                v-model="form.email"
                class="input pl-10"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.email }"
                placeholder="Enter your email"
                required
              />
            </div>
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <div>
            <label for="password" class="label">Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock class="w-5 h-5 text-gray-400" />
              </div>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="form.password"
                class="input pl-10 pr-10"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.password }"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                @click="showPassword = !showPassword"
              >
                <Eye v-if="!showPassword" class="w-5 h-5 text-gray-400 hover:text-gray-600" />
                <EyeOff v-else class="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">
              {{ errors.password }}
            </p>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                v-model="form.rememberMe"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label for="rememberMe" class="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div class="text-sm">
              <a href="#" class="font-medium text-primary-600 hover:text-primary-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex">
              <AlertCircle class="w-5 h-5 text-red-400 mr-2" />
              <p class="text-sm text-red-600">{{ error }}</p>
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary w-full py-3"
            :disabled="loading"
          >
            <Loader2 v-if="loading" class="w-5 h-5 mr-2 animate-spin" />
            <LogIn v-else class="w-5 h-5 mr-2" />
            {{ loading ? 'Signing In...' : 'Sign In' }}
          </button>

          <div class="text-center">
            <p class="text-sm text-gray-600">
              Don't have an account?
              <router-link to="/register" class="font-medium text-primary-600 hover:text-primary-500">
                Sign up here
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { 
  LogIn, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Loader2 
} from 'lucide-vue-next'

export default {
  name: 'Login',
  components: {
    LogIn,
    Mail,
    Lock,
    Eye,
    EyeOff,
    AlertCircle,
    Loader2
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const form = reactive({
      email: '',
      password: '',
      rememberMe: false
    })

    const errors = reactive({})
    const showPassword = ref(false)
    const loading = ref(false)
    const error = ref('')

    const validateForm = () => {
      const newErrors = {}

      if (!form.email) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = 'Email is invalid'
      }

      if (!form.password) {
        newErrors.password = 'Password is required'
      } else if (form.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }

      Object.assign(errors, newErrors)
      return Object.keys(newErrors).length === 0
    }

    const handleLogin = async () => {
      if (!validateForm()) return

      loading.value = true
      error.value = ''

      try {
        console.log('Attempting login with:', { email: form.email })
        console.log('Store state before login:', store.state.auth)
        console.log('isAuthenticated before login:', store.getters['auth/isAuthenticated'])
        
        const result = await store.dispatch('auth/login', {
          email: form.email,
          password: form.password
        })

        console.log('Login result:', result)
        console.log('Store state after login:', store.state.auth)
        console.log('isAuthenticated after login:', store.getters['auth/isAuthenticated'])

        if (result.success) {
          console.log('Login successful, redirecting to dashboard')
          router.push('/dashboard')
        } else {
          error.value = result.error
          console.error('Login failed:', result.error)
        }
      } catch (err) {
        console.error('Login error:', err)
        error.value = 'An unexpected error occurred'
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      errors,
      showPassword,
      loading,
      error,
      handleLogin
    }
  }
}
</script>