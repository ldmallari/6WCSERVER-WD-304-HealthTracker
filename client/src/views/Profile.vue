<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <User class="w-8 h-8 mr-3 text-primary-600" />
          Profile Settings
        </h1>
        <p class="text-gray-600">Manage your account information and preferences</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div class="card">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-xl font-semibold text-gray-900 flex items-center">
                <UserEdit class="w-5 h-5 mr-2 text-primary-600" />
                Personal Information
              </h2>
            </div>
            <div class="p-6">
              <form @submit.prevent="updateProfile" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="label">Full Name</label>
                    <input 
                      type="text" 
                      class="input"
                      v-model="profileForm.name"
                      :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.name }"
                    />
                    <p v-if="errors.name" class="mt-1 text-sm text-red-600">
                      {{ errors.name }}
                    </p>
                  </div>
                  <div>
                    <label class="label">Email Address</label>
                    <input 
                      type="email" 
                      class="input bg-gray-50"
                      v-model="profileForm.email"
                      disabled
                    />
                    <p class="mt-1 text-sm text-gray-500">Email cannot be changed</p>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="label">Age</label>
                    <input 
                      type="number" 
                      class="input"
                      v-model="profileForm.age"
                      min="1"
                      max="120"
                    />
                  </div>
                  <div>
                    <label class="label">Gender</label>
                    <select class="input" v-model="profileForm.gender">
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="label">Height (cm)</label>
                    <input 
                      type="number" 
                      class="input"
                      v-model="profileForm.height"
                      min="50"
                      max="300"
                    />
                  </div>
                  <div>
                    <label class="label">Weight (kg)</label>
                    <input 
                      type="number" 
                      class="input"
                      v-model="profileForm.weight"
                      min="10"
                      max="500"
                      step="0.1"
                    />
                  </div>
                </div>

                <div>
                  <label class="label">Bio</label>
                  <textarea 
                    class="input"
                    rows="3"
                    v-model="profileForm.bio"
                    placeholder="Tell us about yourself..."
                  ></textarea>
                </div>

                <div v-if="profileError" class="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div class="flex">
                    <AlertCircle class="w-5 h-5 text-red-400 mr-2" />
                    <p class="text-sm text-red-600">{{ profileError }}</p>
                  </div>
                </div>

                <div v-if="profileSuccess" class="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div class="flex">
                    <CheckCircle class="w-5 h-5 text-green-400 mr-2" />
                    <p class="text-sm text-green-600">{{ profileSuccess }}</p>
                  </div>
                </div>

                <button 
                  type="submit" 
                  class="btn btn-primary"
                  :disabled="profileLoading"
                >
                  <Loader2 v-if="profileLoading" class="w-4 h-4 mr-2 animate-spin" />
                  <Save v-else class="w-4 h-4 mr-2" />
                  {{ profileLoading ? 'Updating...' : 'Update Profile' }}
                </button>
              </form>
            </div>
          </div>

          <div class="card">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-xl font-semibold text-gray-900 flex items-center">
                <Target class="w-5 h-5 mr-2 text-primary-600" />
                Health Goals
              </h2>
            </div>
            <div class="p-6">
              <form @submit.prevent="updateGoals" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div v-for="goal in healthGoals" :key="goal.value" class="flex items-center">
                    <input
                      :id="goal.value"
                      type="checkbox"
                      :value="goal.value"
                      v-model="profileForm.goals"
                      class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label :for="goal.value" class="ml-2 block text-sm text-gray-700">
                      {{ goal.label }}
                    </label>
                  </div>
                </div>

                <div>
                  <label class="label">Activity Level</label>
                  <select class="input" v-model="profileForm.activityLevel">
                    <option value="">Select your activity level</option>
                    <option value="sedentary">Sedentary (little to no exercise)</option>
                    <option value="lightly-active">Lightly Active (light exercise 1-3 days/week)</option>
                    <option value="moderately-active">Moderately Active (moderate exercise 3-5 days/week)</option>
                    <option value="very-active">Very Active (hard exercise 6-7 days/week)</option>
                    <option value="extremely-active">Extremely Active (very hard exercise, physical job)</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  class="btn btn-primary"
                  :disabled="goalsLoading"
                >
                  <Loader2 v-if="goalsLoading" class="w-4 h-4 mr-2 animate-spin" />
                  <Target v-else class="w-4 h-4 mr-2" />
                  {{ goalsLoading ? 'Updating...' : 'Update Goals' }}
                </button>
              </form>
            </div>
          </div>

          <div class="card">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-xl font-semibold text-gray-900 flex items-center">
                <Lock class="w-5 h-5 mr-2 text-primary-600" />
                Change Password
              </h2>
            </div>
            <div class="p-6">
              <form @submit.prevent="changePassword" class="space-y-6">
                <div>
                  <label class="label">Current Password</label>
                  <div class="relative">
                    <input 
                      :type="showCurrentPassword ? 'text' : 'password'"
                      class="input pr-10"
                      v-model="passwordForm.currentPassword"
                      :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': passwordErrors.currentPassword }"
                    />
                    <button
                      type="button"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center"
                      @click="showCurrentPassword = !showCurrentPassword"
                    >
                      <Eye v-if="!showCurrentPassword" class="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      <EyeOff v-else class="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  </div>
                  <p v-if="passwordErrors.currentPassword" class="mt-1 text-sm text-red-600">
                    {{ passwordErrors.currentPassword }}
                  </p>
                </div>

                <div>
                  <label class="label">New Password</label>
                  <div class="relative">
                    <input 
                      :type="showNewPassword ? 'text' : 'password'"
                      class="input pr-10"
                      v-model="passwordForm.newPassword"
                      :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': passwordErrors.newPassword }"
                    />
                    <button
                      type="button"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center"
                      @click="showNewPassword = !showNewPassword"
                    >
                      <Eye v-if="!showNewPassword" class="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      <EyeOff v-else class="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  </div>
                  <p v-if="passwordErrors.newPassword" class="mt-1 text-sm text-red-600">
                    {{ passwordErrors.newPassword }}
                  </p>
                </div>

                <div>
                  <label class="label">Confirm New Password</label>
                  <div class="relative">
                    <input 
                      :type="showConfirmPassword ? 'text' : 'password'"
                      class="input pr-10"
                      v-model="passwordForm.confirmPassword"
                      :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': passwordErrors.confirmPassword }"
                    />
                    <button
                      type="button"
                      class="absolute inset-y-0 right-0 pr-3 flex items-center"
                      @click="showConfirmPassword = !showConfirmPassword"
                    >
                      <Eye v-if="!showConfirmPassword" class="w-5 h-5 text-gray-400 hover:text-gray-600" />
                      <EyeOff v-else class="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  </div>
                  <p v-if="passwordErrors.confirmPassword" class="mt-1 text-sm text-red-600">
                    {{ passwordErrors.confirmPassword }}
                  </p>
                </div>

                <div v-if="passwordError" class="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div class="flex">
                    <AlertCircle class="w-5 h-5 text-red-400 mr-2" />
                    <p class="text-sm text-red-600">{{ passwordError }}</p>
                  </div>
                </div>

                <div v-if="passwordSuccess" class="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div class="flex">
                    <CheckCircle class="w-5 h-5 text-green-400 mr-2" />
                    <p class="text-sm text-green-600">{{ passwordSuccess }}</p>
                  </div>
                </div>

                <button 
                  type="submit" 
                  class="btn btn-primary"
                  :disabled="passwordLoading"
                >
                  <Loader2 v-if="passwordLoading" class="w-4 h-4 mr-2 animate-spin" />
                  <Lock v-else class="w-4 h-4 mr-2" />
                  {{ passwordLoading ? 'Updating...' : 'Change Password' }}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="card p-6">
            <div class="text-center">
              <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User class="w-10 h-10 text-primary-600" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900">{{ currentUser?.name || 'User' }}</h3>
              <p class="text-gray-600">{{ currentUser?.email }}</p>
              <div class="mt-4 space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Member since:</span>
                  <span class="font-medium">{{ formatDate(currentUser?.date) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Health logs:</span>
                  <span class="font-medium">{{ userStats.totalLogs || 0 }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Articles read:</span>
                  <span class="font-medium">{{ userStats.articlesRead || 0 }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
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

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { 
  User, 
  UserEdit, 
  Target, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle, 
  Save, 
  Loader2, 
  Plus, 
  BarChart3, 
  BookOpen 
} from 'lucide-vue-next'

export default {
  name: 'Profile',
  components: {
    User,
    UserEdit,
    Target,
    Lock,
    Eye,
    EyeOff,
    AlertCircle,
    CheckCircle,
    Save,
    Loader2,
    Plus,
    BarChart3,
    BookOpen
  },
  setup() {
    const store = useStore()

    const profileLoading = ref(false)
    const goalsLoading = ref(false)
    const passwordLoading = ref(false)
    const profileError = ref('')
    const profileSuccess = ref('')
    const passwordError = ref('')
    const passwordSuccess = ref('')

    const showCurrentPassword = ref(false)
    const showNewPassword = ref(false)
    const showConfirmPassword = ref(false)

    const currentUser = computed(() => store.getters['auth/currentUser'])

    const profileForm = reactive({
      name: '',
      email: '',
      age: '',
      gender: '',
      height: '',
      weight: '',
      bio: ''
    })

    const passwordForm = reactive({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })

    const errors = reactive({})
    const passwordErrors = reactive({})

    const healthGoals = [
      { value: 'weight-loss', label: 'Weight Loss' },
      { value: 'weight-gain', label: 'Weight Gain' },
      { value: 'muscle-building', label: 'Muscle Building' },
      { value: 'general-fitness', label: 'General Fitness' },
      { value: 'stress-relief', label: 'Stress Relief' },
      { value: 'better-sleep', label: 'Better Sleep' }
    ]

    const userStats = reactive({
      totalLogs: 0,
      articlesRead: 0
    })

    const formatDate = (date) => {
      if (!date) return 'N/A'
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      })
    }

    const updateProfile = async () => {
      profileLoading.value = true
      profileError.value = ''
      profileSuccess.value = ''

      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        profileSuccess.value = 'Profile updated successfully!'
      } catch (error) {
        profileError.value = 'Failed to update profile'
      } finally {
        profileLoading.value = false
      }
    }

    const updateGoals = async () => {
      goalsLoading.value = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error('Error updating goals:', error)
      } finally {
        goalsLoading.value = false
      }
    }

    const changePassword = async () => {
      passwordLoading.value = true
      passwordError.value = ''
      passwordSuccess.value = ''

      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        passwordSuccess.value = 'Password changed successfully!'
        passwordForm.currentPassword = ''
        passwordForm.newPassword = ''
        passwordForm.confirmPassword = ''
      } catch (error) {
        passwordError.value = 'Failed to change password'
      } finally {
        passwordLoading.value = false
      }
    }

    onMounted(() => {
      if (currentUser.value) {
        Object.assign(profileForm, {
          name: currentUser.value.name || '',
          email: currentUser.value.email || '',
          age: currentUser.value.age || '',
          gender: currentUser.value.gender || '',
          height: currentUser.value.height || '',
          weight: currentUser.value.weight || '',
          bio: currentUser.value.bio || ''
        })
      }
    })

    return {
      profileLoading,
      goalsLoading,
      passwordLoading,
      profileError,
      profileSuccess,
      passwordError,
      passwordSuccess,
      showCurrentPassword,
      showNewPassword,
      showConfirmPassword,
      currentUser,
      profileForm,
      passwordForm,
      errors,
      passwordErrors,
      healthGoals,
      userStats,
      formatDate,
      updateProfile,
      updateGoals,
      changePassword
    }
  }
}
</script>