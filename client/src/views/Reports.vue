<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <BarChart3 class="w-8 h-8 mr-3 text-primary-600" />
          Health Reports
        </h1>
        <p class="text-gray-600">Track your progress with detailed analytics and insights</p>
      </div>

      <div class="card p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="label">Start Date</label>
            <input 
              type="date" 
              class="input"
              v-model="dateRange.startDate"
              @change="fetchReportData"
            />
          </div>
          <div>
            <label class="label">End Date</label>
            <input 
              type="date" 
              class="input"
              v-model="dateRange.endDate"
              @change="fetchReportData"
            />
          </div>
          <div>
            <label class="label">Quick Select</label>
            <select class="input" @change="setQuickRange">
              <option value="">Select period</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
          </div>
          <div class="flex items-end">
            <button 
              class="btn btn-primary w-full"
              @click="fetchReportData"
              :disabled="loading"
            >
              <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
              <RefreshCw v-else class="w-4 h-4 mr-2" />
              {{ loading ? 'Loading...' : 'Update Reports' }}
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="card p-6 text-center group hover:scale-105 transition-transform duration-200">
          <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
            <Dumbbell class="w-6 h-6 text-primary-600" />
          </div>
          <div class="text-2xl font-bold text-primary-600 mb-1">{{ summaryStats.exerciseSessions || 0 }}</div>
          <div class="text-sm text-gray-600">Exercise Sessions</div>
        </div>
        
        <div class="card p-6 text-center group hover:scale-105 transition-transform duration-200">
          <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
            <Moon class="w-6 h-6 text-green-600" />
          </div>
          <div class="text-2xl font-bold text-green-600 mb-1">{{ summaryStats.avgSleepHours || 0 }}h</div>
          <div class="text-sm text-gray-600">Avg Sleep Hours</div>
        </div>
        
        <div class="card p-6 text-center group hover:scale-105 transition-transform duration-200">
          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
            <Droplets class="w-6 h-6 text-blue-600" />
          </div>
          <div class="text-2xl font-bold text-blue-600 mb-1">{{ summaryStats.totalWater || 0 }}ml</div>
          <div class="text-sm text-gray-600">Total Water Intake</div>
        </div>
        
        <div class="card p-6 text-center group hover:scale-105 transition-transform duration-200">
          <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors">
            <TrendingUp class="w-6 h-6 text-yellow-600" />
          </div>
          <div class="text-2xl font-bold text-yellow-600 mb-1">{{ summaryStats.weightChange || 0 }}kg</div>
          <div class="text-sm text-gray-600">Weight Change</div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div class="card p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center">
              <Dumbbell class="w-5 h-5 mr-2 text-primary-600" />
              Exercise Activity
            </h3>
            <div class="flex space-x-2">
              <button 
                class="btn btn-sm"
                :class="exerciseChartType === 'line' ? 'btn-primary' : 'btn-outline'"
                @click="exerciseChartType = 'line'"
              >
                <TrendingUp class="w-4 h-4" />
              </button>
              <button 
                class="btn btn-sm"
                :class="exerciseChartType === 'bar' ? 'btn-primary' : 'btn-outline'"
                @click="exerciseChartType = 'bar'"
              >
                <BarChart3 class="w-4 h-4" />
              </button>
            </div>
          </div>
          <div class="h-64">
            <canvas ref="exerciseChart"></canvas>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900 flex items-center">
              <Moon class="w-5 h-5 mr-2 text-green-600" />
              Sleep Pattern
            </h3>
            <div class="flex space-x-2">
              <button 
                class="btn btn-sm"
                :class="sleepChartType === 'line' ? 'btn-primary' : 'btn-outline'"
                @click="sleepChartType = 'line'"
              >
                <TrendingUp class="w-4 h-4" />
              </button>
              <button 
                class="btn btn-sm"
                :class="sleepChartType === 'bar' ? 'btn-primary' : 'btn-outline'"
                @click="sleepChartType = 'bar'"
              >
                <BarChart3 class="w-4 h-4" />
              </button>
            </div>
          </div>
          <div class="h-64">
            <canvas ref="sleepChart"></canvas>
          </div>
        </div>
      </div>

      <div class="card p-6 mb-8">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center">
            <Droplets class="w-5 h-5 mr-2 text-blue-600" />
            Water Intake
          </h3>
          <div class="flex space-x-2">
            <button 
              class="btn btn-sm"
              :class="waterChartType === 'line' ? 'btn-primary' : 'btn-outline'"
              @click="waterChartType = 'line'"
            >
              <TrendingUp class="w-4 h-4" />
            </button>
            <button 
              class="btn btn-sm"
              :class="waterChartType === 'bar' ? 'btn-primary' : 'btn-outline'"
              @click="waterChartType = 'bar'"
            >
              <BarChart3 class="w-4 h-4" />
            </button>
          </div>
        </div>
        <div class="h-64">
          <canvas ref="waterChart"></canvas>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Heart class="w-5 h-5 mr-2 text-red-600" />
            Mood Tracking
          </h3>
          <div class="h-64">
            <canvas ref="moodChart"></canvas>
          </div>
        </div>

        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Weight class="w-5 h-5 mr-2 text-yellow-600" />
            Weight Progress
          </h3>
          <div class="h-64">
            <canvas ref="weightChart"></canvas>
          </div>
        </div>
      </div>

      <div class="card p-6 mt-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Lightbulb class="w-5 h-5 mr-2 text-yellow-600" />
          Health Insights
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="insight in insights" :key="insight.id" class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-start">
              <div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <component :is="insight.icon" class="w-4 h-4 text-primary-600" />
              </div>
              <div>
                <h4 class="font-medium text-gray-900 mb-1">{{ insight.title }}</h4>
                <p class="text-sm text-gray-600">{{ insight.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import { useStore } from 'vuex'
import { 
  BarChart3, 
  Loader2, 
  RefreshCw, 
  Dumbbell, 
  Moon, 
  Droplets, 
  TrendingUp, 
  Heart, 
  Weight, 
  Lightbulb,
  Target,
  Activity,
  Zap
} from 'lucide-vue-next'
import Chart from 'chart.js/auto'

export default {
  name: 'Reports',
  components: {
    BarChart3,
    Loader2,
    RefreshCw,
    Dumbbell,
    Moon,
    Droplets,
    TrendingUp,
    Heart,
    Weight,
    Lightbulb,
    Target,
    Activity,
    Zap
  },
  setup() {
    const store = useStore()
    
    const loading = ref(false)
    const exerciseChart = ref(null)
    const sleepChart = ref(null)
    const waterChart = ref(null)
    const moodChart = ref(null)
    const weightChart = ref(null)
    
    const exerciseChartType = ref('line')
    const sleepChartType = ref('line')
    const waterChartType = ref('line')

    const dateRange = reactive({
      startDate: '',
      endDate: ''
    })

    const summaryStats = reactive({
      exerciseSessions: 0,
      avgSleepHours: 0,
      totalWater: 0,
      weightChange: 0
    })

    const insights = ref([])

    const setQuickRange = (event) => {
      const days = parseInt(event.target.value)
      if (days) {
        const endDate = new Date()
        const startDate = new Date()
        startDate.setDate(endDate.getDate() - days)
        
        dateRange.endDate = endDate.toISOString().split('T')[0]
        dateRange.startDate = startDate.toISOString().split('T')[0]
        
        fetchReportData()
      }
    }

    const fetchReportData = async () => {
      loading.value = true
      try {
        if (!dateRange.startDate || !dateRange.endDate) {
          const endDate = new Date()
          const startDate = new Date()
          startDate.setDate(startDate.getDate() - 30)
          
          dateRange.startDate = startDate.toISOString().split('T')[0]
          dateRange.endDate = endDate.toISOString().split('T')[0]
        }

        await store.dispatch('healthLogs/fetchLogs', {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate
        })

        await store.dispatch('healthLogs/fetchStats', {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate
        })

        const logs = store.getters['healthLogs/allLogs']
        const stats = store.getters['healthLogs/stats']

        const exerciseStats = stats.find(s => s._id === 'exercise')
        const sleepStats = stats.find(s => s._id === 'sleep')
        const waterStats = stats.find(s => s._id === 'water')
        const weightStats = stats.find(s => s._id === 'weight')

        summaryStats.exerciseSessions = exerciseStats?.count || 0
        summaryStats.avgSleepHours = sleepStats?.avgSleepHours ? Math.round(sleepStats.avgSleepHours * 10) / 10 : 0
        summaryStats.totalWater = waterStats?.totalWater ? Math.round(waterStats.totalWater / 1000 * 10) / 10 : 0
        summaryStats.weightChange = weightStats?.avgWeight ? Math.round(weightStats.avgWeight * 10) / 10 : 0

        generateInsights(logs, stats)
        
        await nextTick()
        createCharts(logs)
      } catch (error) {
        console.error('Error fetching report data:', error)
      } finally {
        loading.value = false
      }
    }

    const generateInsights = (logs, stats) => {
      const newInsights = []
      
      const exerciseStats = stats.find(s => s._id === 'exercise')
      if (exerciseStats && exerciseStats.count > 0) {
        newInsights.push({
          id: 1,
          title: 'Exercise Activity',
          description: `You've completed ${exerciseStats.count} exercise sessions this period.`,
          icon: Target
        })
      }

      const sleepStats = stats.find(s => s._id === 'sleep')
      if (sleepStats && sleepStats.avgSleepHours > 0) {
        const sleepQuality = sleepStats.avgSleepHours >= 7 ? 'excellent' : sleepStats.avgSleepHours >= 6 ? 'good' : 'needs improvement'
        newInsights.push({
          id: 2,
          title: 'Sleep Quality',
          description: `Your average sleep is ${sleepStats.avgSleepHours}h per night (${sleepQuality}).`,
          icon: Moon
        })
      }

      const waterStats = stats.find(s => s._id === 'water')
      if (waterStats && waterStats.totalWater > 0) {
        const dailyAvg = waterStats.totalWater / 30 / 1000
        newInsights.push({
          id: 3,
          title: 'Hydration',
          description: `You've consumed ${Math.round(waterStats.totalWater / 1000)}L total (${Math.round(dailyAvg * 10) / 10}L/day average).`,
          icon: Droplets
        })
      }

      const weightStats = stats.find(s => s._id === 'weight')
      if (weightStats && weightStats.avgWeight > 0) {
        newInsights.push({
          id: 4,
          title: 'Weight Tracking',
          description: `Your average weight is ${Math.round(weightStats.avgWeight * 10) / 10}kg.`,
          icon: Weight
        })
      }

      const moodLogs = logs.filter(log => log.type === 'mood')
      if (moodLogs.length > 0) {
        newInsights.push({
          id: 5,
          title: 'Mood Tracking',
          description: `You've logged your mood ${moodLogs.length} times this period.`,
          icon: Heart
        })
      }

      if (logs.length > 0) {
        newInsights.push({
          id: 6,
          title: 'Activity Level',
          description: `You've logged ${logs.length} health activities this period.`,
          icon: Activity
        })
      }

      insights.value = newInsights
    }

    const generateChartLabels = () => {
      const labels = []
      const startDate = new Date(dateRange.startDate)
      const endDate = new Date(dateRange.endDate)
      const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
      
      if (daysDiff <= 7) {
        for (let i = 0; i <= daysDiff; i++) {
          const date = new Date(startDate)
          date.setDate(date.getDate() + i)
          labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }))
        }
      } else if (daysDiff <= 30) {
        const weeks = Math.ceil(daysDiff / 7)
        for (let i = 0; i < weeks; i++) {
          labels.push(`Week ${i + 1}`)
        }
      } else {
        const months = Math.ceil(daysDiff / 30)
        for (let i = 0; i < months; i++) {
          const date = new Date(startDate)
          date.setMonth(date.getMonth() + i)
          labels.push(date.toLocaleDateString('en-US', { month: 'short' }))
        }
      }
      
      return labels
    }

    const generateExerciseData = (logs) => {
      const exerciseLogs = logs.filter(log => log.type === 'exercise')
      const daysDiff = Math.ceil((new Date(dateRange.endDate) - new Date(dateRange.startDate)) / (1000 * 60 * 60 * 24))
      
      if (daysDiff <= 7) {
        const data = new Array(daysDiff + 1).fill(0)
        exerciseLogs.forEach(log => {
          const logDate = new Date(log.date)
          const dayIndex = Math.floor((logDate - new Date(dateRange.startDate)) / (1000 * 60 * 60 * 24))
          if (dayIndex >= 0 && dayIndex < data.length) {
            data[dayIndex]++
          }
        })
        return data
      } else {
        const data = new Array(generateChartLabels().length).fill(0)
        exerciseLogs.forEach(log => {
          const logDate = new Date(log.date)
          const periodIndex = Math.floor((logDate - new Date(dateRange.startDate)) / (1000 * 60 * 60 * 24 * (daysDiff <= 30 ? 7 : 30)))
          if (periodIndex >= 0 && periodIndex < data.length) {
            data[periodIndex]++
          }
        })
        return data
      }
    }

    const generateSleepData = (logs) => {
      const sleepLogs = logs.filter(log => log.type === 'sleep')
      const daysDiff = Math.ceil((new Date(dateRange.endDate) - new Date(dateRange.startDate)) / (1000 * 60 * 60 * 24))
      
      if (daysDiff <= 7) {
        const data = new Array(daysDiff + 1).fill(0)
        sleepLogs.forEach(log => {
          const logDate = new Date(log.date)
          const dayIndex = Math.floor((logDate - new Date(dateRange.startDate)) / (1000 * 60 * 60 * 24))
          if (dayIndex >= 0 && dayIndex < data.length) {
            data[dayIndex] = log.sleepHours || 0
          }
        })
        return data
      } else {
        const data = new Array(generateChartLabels().length).fill(0)
        const periodCounts = new Array(data.length).fill(0)
        
        sleepLogs.forEach(log => {
          const logDate = new Date(log.date)
          const periodIndex = Math.floor((logDate - new Date(dateRange.startDate)) / (1000 * 60 * 60 * 24 * (daysDiff <= 30 ? 7 : 30)))
          if (periodIndex >= 0 && periodIndex < data.length) {
            data[periodIndex] += log.sleepHours || 0
            periodCounts[periodIndex]++
          }
        })
        
        return data.map((total, index) => periodCounts[index] > 0 ? total / periodCounts[index] : 0)
      }
    }

    const generateWaterData = (logs) => {
      const waterLogs = logs.filter(log => log.type === 'water')
      const daysDiff = Math.ceil((new Date(dateRange.endDate) - new Date(dateRange.startDate)) / (1000 * 60 * 60 * 24))
      
      if (daysDiff <= 7) {
        const data = new Array(daysDiff + 1).fill(0)
        waterLogs.forEach(log => {
          const logDate = new Date(log.date)
          const dayIndex = Math.floor((logDate - new Date(dateRange.startDate)) / (1000 * 60 * 60 * 24))
          if (dayIndex >= 0 && dayIndex < data.length) {
            data[dayIndex] += (log.waterAmount || 0) / 1000 // Convert to liters
          }
        })
        return data
      } else {
        const data = new Array(generateChartLabels().length).fill(0)
        waterLogs.forEach(log => {
          const logDate = new Date(log.date)
          const periodIndex = Math.floor((logDate - new Date(dateRange.startDate)) / (1000 * 60 * 60 * 24 * (daysDiff <= 30 ? 7 : 30)))
          if (periodIndex >= 0 && periodIndex < data.length) {
            data[periodIndex] += (log.waterAmount || 0) / 1000 // Convert to liters
          }
        })
        return data
      }
    }

    const createCharts = (logs = []) => {
      if (exerciseChart.value) {
        new Chart(exerciseChart.value, {
          type: exerciseChartType.value,
          data: {
            labels: generateChartLabels(),
            datasets: [{
              label: 'Exercise Sessions',
              data: generateExerciseData(logs),
              borderColor: '#6366f1',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            }
          }
        })
      }

      if (sleepChart.value) {
        new Chart(sleepChart.value, {
          type: sleepChartType.value,
          data: {
            labels: generateChartLabels(),
            datasets: [{
              label: 'Sleep Hours',
              data: generateSleepData(logs),
              borderColor: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            }
          }
        })
      }

      if (waterChart.value) {
        new Chart(waterChart.value, {
          type: waterChartType.value,
          data: {
            labels: generateChartLabels(),
            datasets: [{
              label: 'Water Intake (L)',
              data: generateWaterData(logs),
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            }
          }
        })
      }

      if (moodChart.value) {
        new Chart(moodChart.value, {
          type: 'line',
          data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
              label: 'Mood Score',
              data: [4, 3, 5, 4, 5, 4, 5],
              borderColor: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: 5
              }
            },
            plugins: {
              legend: {
                display: false
              }
            }
          }
        })
      }

      if (weightChart.value) {
        new Chart(weightChart.value, {
          type: 'line',
          data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
              label: 'Weight (kg)',
              data: [75, 74.5, 74, 73.8],
              borderColor: '#f59e0b',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            }
          }
        })
      }
    }

    onMounted(() => {
      const endDate = new Date()
      const startDate = new Date()
      startDate.setDate(endDate.getDate() - 30)
      
      dateRange.endDate = endDate.toISOString().split('T')[0]
      dateRange.startDate = startDate.toISOString().split('T')[0]
      
      fetchReportData()
    })

    return {
      loading,
      exerciseChart,
      sleepChart,
      waterChart,
      moodChart,
      weightChart,
      exerciseChartType,
      sleepChartType,
      waterChartType,
      dateRange,
      summaryStats,
      insights,
      setQuickRange,
      fetchReportData
    }
  }
}
</script>