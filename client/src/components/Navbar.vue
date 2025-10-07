<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <router-link to="/" class="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors">
          <Heart class="w-8 h-8" />
          <span class="text-xl font-bold">HealthTracker</span>
        </router-link>

        <div class="hidden md:flex items-center space-x-8">
          <router-link 
            to="/dashboard" 
            v-if="isAuthenticated"
            class="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
            :class="{ 'text-primary-600 bg-primary-50': $route.name === 'Dashboard' }"
          >
            <LayoutDashboard class="w-4 h-4" />
            <span>Dashboard</span>
          </router-link>
          
          <router-link 
            to="/health-tracker" 
            v-if="isAuthenticated"
            class="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
            :class="{ 'text-primary-600 bg-primary-50': $route.name === 'HealthTracker' }"
          >
            <Dumbbell class="w-4 h-4" />
            <span>Health Tracker</span>
          </router-link>
          
          <router-link 
            to="/articles"
            class="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
            :class="{ 'text-primary-600 bg-primary-50': $route.name === 'Articles' }"
          >
            <BookOpen class="w-4 h-4" />
            <span>Articles</span>
          </router-link>
          
          <router-link 
            to="/reports" 
            v-if="isAuthenticated"
            class="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
            :class="{ 'text-primary-600 bg-primary-50': $route.name === 'Reports' }"
          >
            <BarChart3 class="w-4 h-4" />
            <span>Reports</span>
          </router-link>
          
        </div>

        <div class="flex items-center space-x-4">
          <div v-if="isAuthenticated" class="relative">
            <button
              @click="showUserMenu = !showUserMenu"
              class="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              <img
                :src="userAvatar"
                :alt="currentUser?.name"
                class="w-8 h-8 rounded-full object-cover"
              />
              <span class="hidden sm:block font-medium">{{ currentUser?.name || 'User' }}</span>
              <ChevronDown class="w-4 h-4" />
            </button>

            <div 
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
            >
              <router-link 
                to="/profile" 
                @click="showUserMenu = false"
                class="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <User class="w-4 h-4" />
                <span>Profile</span>
              </router-link>
              
              <hr class="my-1 border-gray-200" />
              
              <button 
                @click.prevent="handleLogout"
                class="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
              >
                <LogOut class="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
          
          <router-link 
            v-else
            to="/login"
            class="btn btn-primary"
          >
            <LogIn class="w-4 h-4 mr-2" />
            Login
          </router-link>
        </div>

        <button
          @click="showMobileMenu = !showMobileMenu"
          class="md:hidden p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors"
        >
          <Menu v-if="!showMobileMenu" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>

      <div v-if="showMobileMenu" class="md:hidden py-4 border-t border-gray-200">
        <div class="space-y-2">
          <router-link 
            to="/dashboard" 
            v-if="isAuthenticated"
            @click="showMobileMenu = false"
            class="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LayoutDashboard class="w-4 h-4" />
            <span>Dashboard</span>
          </router-link>
          
          <router-link 
            to="/health-tracker" 
            v-if="isAuthenticated"
            @click="showMobileMenu = false"
            class="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Dumbbell class="w-4 h-4" />
            <span>Health Tracker</span>
          </router-link>
          
          <router-link 
            to="/articles"
            @click="showMobileMenu = false"
            class="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <BookOpen class="w-4 h-4" />
            <span>Articles</span>
          </router-link>
          
          <router-link 
            to="/reports" 
            v-if="isAuthenticated"
            @click="showMobileMenu = false"
            class="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <BarChart3 class="w-4 h-4" />
            <span>Reports</span>
          </router-link>
          
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { 
  Heart, 
  LayoutDashboard, 
  Dumbbell, 
  BookOpen, 
  BarChart3, 
  User, 
  LogOut, 
  LogIn, 
  ChevronDown, 
  Menu, 
  X 
} from 'lucide-vue-next'

export default {
  name: 'Navbar',
  components: {
    Heart,
    LayoutDashboard,
    Dumbbell,
    BookOpen,
    BarChart3,
    User,
    LogOut,
    LogIn,
    ChevronDown,
    Menu,
    X
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const showUserMenu = ref(false)
    const showMobileMenu = ref(false)

    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
    const currentUser = computed(() => store.getters['auth/currentUser'])

    const userAvatar = computed(() => {
      if (currentUser.value?.avatar) {
        return currentUser.value.avatar
      }
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.value?.name || 'User')}&background=6366f1&color=fff&size=32`
    })

    const logout = async () => {
      try {
        const result = await store.dispatch('auth/logout')
        window.location.href = '/'
      } catch (error) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/'
      }
    }

    const handleLogout = async () => {
      showUserMenu.value = false
      await logout()
    }

    const handleClickOutside = (event) => {
      if (!event.target.closest('.relative')) {
        showUserMenu.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      isAuthenticated,
      currentUser,
      userAvatar,
      showUserMenu,
      showMobileMenu,
      logout,
      handleLogout
    }
  }
}
</script>
