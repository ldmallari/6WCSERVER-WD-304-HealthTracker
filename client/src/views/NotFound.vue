<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-center">
      <div class="card p-12">
        <!-- 404 Illustration -->
        <div class="mb-8">
          <div class="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle class="w-16 h-16 text-primary-600" />
          </div>
          <h1 class="text-8xl font-bold text-primary-600 mb-4">404</h1>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p class="text-gray-600 mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/" class="btn btn-primary">
            <Home class="w-4 h-4 mr-2" />
            Go Home
          </router-link>
          <button class="btn btn-outline-primary" @click="goBack">
            <ArrowLeft class="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>

        <!-- Helpful Links -->
        <div class="mt-12 pt-8 border-t border-gray-200">
          <p class="text-sm text-gray-600 mb-4">Maybe you were looking for:</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <router-link to="/dashboard" class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
              <LayoutDashboard class="w-4 h-4 text-primary-600 mr-2 group-hover:scale-110 transition-transform" />
              <span class="text-sm font-medium text-gray-700">Dashboard</span>
            </router-link>
            <router-link to="/health-tracker" class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
              <Dumbbell class="w-4 h-4 text-primary-600 mr-2 group-hover:scale-110 transition-transform" />
              <span class="text-sm font-medium text-gray-700">Health Tracker</span>
            </router-link>
            <router-link to="/articles" class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
              <BookOpen class="w-4 h-4 text-primary-600 mr-2 group-hover:scale-110 transition-transform" />
              <span class="text-sm font-medium text-gray-700">Articles</span>
            </router-link>
            <router-link to="/reports" class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
              <BarChart3 class="w-4 h-4 text-primary-600 mr-2 group-hover:scale-110 transition-transform" />
              <span class="text-sm font-medium text-gray-700">Reports</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { 
  AlertTriangle, 
  Home, 
  ArrowLeft, 
  LayoutDashboard, 
  Dumbbell, 
  BookOpen, 
  BarChart3 
} from 'lucide-vue-next'

export default {
  name: 'NotFound',
  components: {
    AlertTriangle,
    Home,
    ArrowLeft,
    LayoutDashboard,
    Dumbbell,
    BookOpen,
    BarChart3
  },
  setup() {
    const router = useRouter()

    const goBack = () => {
      router.go(-1)
    }

    return {
      goBack
    }
  }
}
</script>