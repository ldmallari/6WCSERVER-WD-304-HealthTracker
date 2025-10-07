<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 flex items-center">
              <Dumbbell class="w-8 h-8 mr-3 text-primary-600" />
              Health Tracker
            </h1>
            <p class="text-gray-600 mt-2">Track your daily health activities and progress</p>
          </div>
          <button 
            @click="showAddModal = true"
            class="btn btn-primary mt-4 sm:mt-0"
          >
            <Plus class="w-5 h-5 mr-2" />
            Add New Log
          </button>
        </div>
      </div>

      <div class="card p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="label">Filter by Type</label>
            <select 
              v-model="filters.type"
              @change="fetchLogs"
              class="input"
            >
              <option value="">All Types</option>
              <option value="exercise">Exercise</option>
              <option value="sleep">Sleep</option>
              <option value="water">Water</option>
              <option value="weight">Weight</option>
              <option value="mood">Mood</option>
              <option value="meal">Meal</option>
              <option value="meditation">Meditation</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label class="label">Start Date</label>
            <input 
              type="date" 
              v-model="filters.startDate"
              @change="fetchLogs"
              class="input"
            />
          </div>
          <div>
            <label class="label">End Date</label>
            <input 
              type="date" 
              v-model="filters.endDate"
              @change="fetchLogs"
              class="input"
            />
          </div>
          <div class="flex items-end">
            <button 
              @click="clearFilters"
              class="btn btn-outline w-full"
            >
              <X class="w-4 h-4 mr-2" />
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900 flex items-center">
            <ClipboardList class="w-5 h-5 mr-2 text-primary-600" />
            Health Logs
            <span class="badge badge-primary ml-2">{{ pagination.total }}</span>
          </h2>
        </div>
        <div class="p-6">
          <div v-if="loading" class="text-center py-12">
            <Loader2 class="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
            <p class="text-gray-600">Loading your health logs...</p>
          </div>

          <div v-else-if="logs.length === 0" class="text-center py-12">
            <div class="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ClipboardList class="w-8 h-8 text-gray-400" />
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No health logs found</h3>
            <p class="text-gray-600 mb-6">Start tracking your health by adding your first log!</p>
            <button 
              @click="showAddModal = true"
              class="btn btn-primary"
            >
              <Plus class="w-4 h-4 mr-2" />
              Add Your First Log
            </button>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="log in logs" 
              :key="log._id"
              class="card card-hover p-6"
            >
              <div class="flex justify-between items-start mb-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                    <component :is="getLogIcon(log.type)" class="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">{{ log.title }}</h3>
                    <p class="text-sm text-gray-600">{{ formatDate(log.date) }}</p>
                  </div>
                </div>
                <div class="relative">
                  <button 
                    @click="toggleDropdown(log._id)"
                    class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <MoreVertical class="w-4 h-4" />
                  </button>
                  <div 
                    v-if="activeDropdown === log._id"
                    class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
                  >
                    <button 
                      @click="editLog(log); activeDropdown = null"
                      class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Edit class="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button 
                      @click="deleteLog(log._id); activeDropdown = null"
                      class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <Trash2 class="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              <p v-if="log.description" class="text-gray-600 text-sm mb-4">
                {{ log.description }}
              </p>

              <div class="flex flex-wrap gap-2 mb-4">
                <span class="badge badge-primary">{{ log.type }}</span>
                <span v-if="log.duration" class="badge badge-success">{{ log.duration }}min</span>
                <span v-if="log.calories" class="badge badge-warning">{{ log.calories }} cal</span>
                <span v-if="log.waterAmount" class="badge badge-info">{{ log.waterAmount }}ml</span>
              </div>

              <div v-if="log.tags && log.tags.length > 0" class="flex flex-wrap gap-1">
                <span 
                  v-for="tag in log.tags" 
                  :key="tag"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
          </div>

          <div v-if="pagination.totalPages > 1" class="flex justify-center mt-8">
            <nav class="flex items-center space-x-2">
              <button 
                @click="changePage(pagination.currentPage - 1)"
                :disabled="pagination.currentPage === 1"
                class="btn btn-outline btn-sm"
                :class="{ 'opacity-50 cursor-not-allowed': pagination.currentPage === 1 }"
              >
                <ChevronLeft class="w-4 h-4" />
                Previous
              </button>
              
              <div class="flex space-x-1">
                <button 
                  v-for="page in visiblePages" 
                  :key="page"
                  @click="changePage(page)"
                  class="btn btn-sm"
                  :class="page === pagination.currentPage ? 'btn-primary' : 'btn-outline'"
                >
                  {{ page }}
                </button>
              </div>
              
              <button 
                @click="changePage(pagination.currentPage + 1)"
                :disabled="pagination.currentPage === pagination.totalPages"
                class="btn btn-outline btn-sm"
                :class="{ 'opacity-50 cursor-not-allowed': pagination.currentPage === pagination.totalPages }"
              >
                Next
                <ChevronRight class="w-4 h-4" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <div 
      v-if="showAddModal || showEditModal"
      class="fixed inset-0 z-50 overflow-y-auto"
    >
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>
        
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div class="bg-white px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">
                {{ editingLog ? 'Edit Health Log' : 'Add New Health Log' }}
              </h3>
              <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
                <X class="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div class="bg-white px-6 py-6">
            <HealthLogForm 
              :log="editingLog"
              @save="handleSave"
              @cancel="closeModal"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import HealthLogForm from '../components/HealthLogForm.vue'
import { 
  Dumbbell, 
  Plus, 
  X, 
  ClipboardList, 
  Loader2, 
  MoreVertical, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Activity,
  Bed,
  Droplets,
  Weight,
  Heart,
  Utensils,
  Brain,
  Target
} from 'lucide-vue-next'

export default {
  name: 'HealthTracker',
  components: {
    Dumbbell,
    Plus,
    X,
    ClipboardList,
    Loader2,
    MoreVertical,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    HealthLogForm
  },
  setup() {
    const store = useStore()
    
    const loading = ref(false)
    const showAddModal = ref(false)
    const showEditModal = ref(false)
    const editingLog = ref(null)
    const activeDropdown = ref(null)
    
    const filters = reactive({
      type: '',
      startDate: '',
      endDate: ''
    })

    const logs = computed(() => store.getters['healthLogs/allLogs'])
    const pagination = computed(() => store.getters['healthLogs/pagination'])

    const visiblePages = computed(() => {
      const current = pagination.value.currentPage
      const total = pagination.value.totalPages
      const pages = []
      
      for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
        pages.push(i)
      }
      
      return pages
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
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const fetchLogs = async () => {
      loading.value = true
      try {
        await store.dispatch('healthLogs/fetchLogs', {
          ...filters,
          page: pagination.value.currentPage
        })
      } catch (error) {
      } finally {
        loading.value = false
      }
    }

    const changePage = (page) => {
      if (page >= 1 && page <= pagination.value.totalPages) {
        store.dispatch('healthLogs/fetchLogs', {
          ...filters,
          page
        })
      }
    }

    const clearFilters = () => {
      filters.type = ''
      filters.startDate = ''
      filters.endDate = ''
      fetchLogs()
    }

    const toggleDropdown = (logId) => {
      activeDropdown.value = activeDropdown.value === logId ? null : logId
    }

    const editLog = (log) => {
      editingLog.value = { ...log }
      showEditModal.value = true
    }

    const deleteLog = async (logId) => {
      if (confirm('Are you sure you want to delete this health log?')) {
        const result = await store.dispatch('healthLogs/deleteLog', logId)
        if (result.success) {
          fetchLogs()
        }
      }
    }

    const handleSave = async (logData) => {
      if (editingLog.value) {
        const result = await store.dispatch('healthLogs/updateLog', {
          logId: editingLog.value._id,
          logData
        })
        if (result.success) {
          closeModal()
          fetchLogs()
        }
      } else {
        const result = await store.dispatch('healthLogs/createLog', logData)
        if (result.success) {
          closeModal()
          fetchLogs()
        }
      }
    }

    const closeModal = () => {
      showAddModal.value = false
      showEditModal.value = false
      editingLog.value = null
    }

    onMounted(() => {
      fetchLogs()
    })

    watch(filters, () => {
      fetchLogs()
    }, { deep: true })

    return {
      loading,
      showAddModal,
      showEditModal,
      editingLog,
      activeDropdown,
      filters,
      logs,
      pagination,
      visiblePages,
      getLogIcon,
      formatDate,
      fetchLogs,
      changePage,
      clearFilters,
      toggleDropdown,
      editLog,
      deleteLog,
      handleSave,
      closeModal
    }
  }
}
</script>