<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <div class="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div class="mb-6 lg:mb-0">
              <h1 class="text-3xl font-bold mb-2">
                Welcome back, {{ currentUser?.name || 'User' }}!
              </h1>
              <p class="text-primary-100 text-lg">
                Here's your health overview for today
              </p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold">{{ currentDate }}</div>
              <div class="text-primary-100">{{ currentDay }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="card p-6 text-center group hover:scale-105 transition-transform duration-200">
          <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
            <Dumbbell class="w-6 h-6 text-primary-600" />
          </div>
          <div class="text-2xl font-bold text-primary-600 mb-1">{{ todayStats.exercise || 0 }}</div>
          <div class="text-sm text-gray-600">Exercise Sessions</div>
        </div>
        
        <div class="card p-6 text-center group hover:scale-105 transition-transform duration-200">
          <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
            <Moon class="w-6 h-6 text-green-600" />
          </div>
          <div class="text-2xl font-bold text-green-600 mb-1">{{ todayStats.sleep || 0 }}h</div>
          <div class="text-sm text-gray-600">Sleep Hours</div>
        </div>
        
        <div class="card p-6 text-center group hover:scale-105 transition-transform duration-200">
          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
            <Droplets class="w-6 h-6 text-blue-600" />
          </div>
          <div class="text-2xl font-bold text-blue-600 mb-1">{{ todayStats.water || 0 }}L</div>
          <div class="text-sm text-gray-600">Water Intake</div>
        </div>
        
        <div class="card p-6 text-center group hover:scale-105 transition-transform duration-200">
          <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors">
            <Weight class="w-6 h-6 text-yellow-600" />
          </div>
          <div class="text-2xl font-bold text-yellow-600 mb-1">{{ todayStats.weight || '--' }}kg</div>
          <div class="text-sm text-gray-600">Current Weight</div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="card">
            <div class="p-6 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-semibold text-gray-900 flex items-center">
                  <BarChart3 class="w-5 h-5 mr-2 text-primary-600" />
                  Recent Activity
                </h2>
                <router-link to="/health-tracker" class="btn btn-outline-primary btn-sm">
                  View All
                </router-link>
              </div>
            </div>
            <div class="p-6">
              <div v-if="loading" class="text-center py-8">
                <Loader2 class="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
                <p class="text-gray-600">Loading your activity...</p>
              </div>
              <div v-else-if="recentLogs.length === 0" class="text-center py-8">
                <div class="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ClipboardList class="w-8 h-8 text-gray-400" />
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
                <p class="text-gray-600 mb-6">Start tracking your health by adding your first log!</p>
                <router-link to="/health-tracker" class="btn btn-primary">
                  <Plus class="w-4 h-4 mr-2" />
                  Add Your First Log
                </router-link>
              </div>
              <div v-else class="space-y-4">
                <div 
                  v-for="log in recentLogs" 
                  :key="log._id"
                  class="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    <component :is="getLogIcon(log.type)" class="w-5 h-5 text-primary-600" />
                  </div>
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-900">{{ log.title }}</h4>
                    <p class="text-sm text-gray-600">
                      {{ formatDate(log.date) }} • {{ log.type }}
                    </p>
                  </div>
                  <div class="badge badge-primary">
                    {{ log.type }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Zap class="w-5 h-5 mr-2 text-yellow-600" />
              Quick Actions
            </h3>
            <div class="space-y-3">
              <router-link to="/health-tracker" class="flex items-center p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors group">
                <Plus class="w-5 h-5 text-primary-600 mr-3 group-hover:scale-110 transition-transform" />
                <span class="font-medium text-primary-900">Add Health Log</span>
              </router-link>
              <router-link to="/reports" class="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group">
                <BarChart3 class="w-5 h-5 text-green-600 mr-3 group-hover:scale-110 transition-transform" />
                <span class="font-medium text-green-900">View Reports</span>
              </router-link>
              <router-link to="/articles" class="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
                <BookOpen class="w-5 h-5 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
                <span class="font-medium text-blue-900">Read Articles</span>
              </router-link>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Lightbulb class="w-5 h-5 mr-2 text-yellow-600" />
              Daily Tip
            </h3>
            <div class="bg-yellow-50 rounded-lg p-4">
              <div class="flex items-start">
                <Quote class="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                <p class="text-sm text-gray-700">{{ dailyTip }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { 
  Dumbbell, 
  Moon, 
  Droplets, 
  Weight, 
  BarChart3, 
  ClipboardList, 
  Plus, 
  Zap, 
  BookOpen, 
  Lightbulb, 
  Quote, 
  Loader2,
  Activity,
  Bed,
  Coffee,
  Heart,
  Utensils,
  Brain,
  Target
} from 'lucide-vue-next'

export default {
  name: 'Dashboard',
  components: {
    Dumbbell,
    Moon,
    Droplets,
    Weight,
    BarChart3,
    ClipboardList,
    Plus,
    Zap,
    BookOpen,
    Lightbulb,
    Quote,
    Loader2
  },
  setup() {
    const store = useStore()
    
    const loading = ref(false)
    const recentLogs = ref([])
    const todayStats = ref({
      exercise: 0,
      sleep: 0,
      water: 0,
      weight: null
    })

    const currentUser = computed(() => store.getters['auth/currentUser'])
    
    const currentDate = computed(() => {
      return new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    })

    const currentDay = computed(() => {
      return new Date().toLocaleDateString('en-US', { weekday: 'long' })
    })

    const dailyTips = [
      "Stay hydrated! Aim for 8 glasses of water per day.",
      "Get at least 7-8 hours of sleep for optimal health.",
      "Take a 10-minute walk every hour if you work at a desk.",
      "Eat a variety of colorful fruits and vegetables daily.",
      "Practice deep breathing exercises to reduce stress.",
      "Stretch for 5-10 minutes every morning.",
      "Limit screen time before bedtime for better sleep quality."
    ]

    const dailyTip = computed(() => {
      const today = new Date().getDate()
      return dailyTips[today % dailyTips.length]
    })

    const getLogIcon = (type) => {
      const icons = {
        exercise: Dumbbell,
        sleep: Bed,
        water: Droplets,
        weight: Weight,
        mood: Heart,
        meal: Utensils,
        meditation: Brain,
        other: Activity
      }
      return icons[type] || Activity
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const fetchDashboardData = async () => {
      loading.value = true
      try {
        await store.dispatch('healthLogs/fetchLogs', { limit: 5 })
        recentLogs.value = store.getters['healthLogs/allLogs']

        const today = new Date().toISOString().split('T')[0]
        await store.dispatch('healthLogs/fetchStats', {
          startDate: today,
          endDate: today
        })
        
        const stats = store.getters['healthLogs/stats']
        const exerciseStats = stats.find(s => s._id === 'exercise')
        const sleepStats = stats.find(s => s._id === 'sleep')
        const waterStats = stats.find(s => s._id === 'water')
        const weightStats = stats.find(s => s._id === 'weight')
        
        todayStats.value = {
          exercise: exerciseStats?.count || 0,
          sleep: sleepStats?.avgSleepHours ? Math.round(sleepStats.avgSleepHours * 10) / 10 : 0,
          water: waterStats?.totalWater ? Math.round(waterStats.totalWater / 1000 * 10) / 10 : 0, // Convert ml to liters
          weight: weightStats?.avgWeight ? Math.round(weightStats.avgWeight * 10) / 10 : null
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchDashboardData()
    })

    return {
      loading,
      recentLogs,
      todayStats,
      currentUser,
      currentDate,
      currentDay,
      dailyTip,
      getLogIcon,
      formatDate
    }
  }
}
</script>