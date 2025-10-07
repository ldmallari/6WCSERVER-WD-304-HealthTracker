<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl w-full space-y-8">
      <div class="card p-8">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus class="w-8 h-8 text-primary-600" />
          </div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p class="text-gray-600">Join HealthTracker and start your wellness journey</p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="name" class="label">Full Name *</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User class="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  class="input pl-10"
                  :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.name }"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <p v-if="errors.name" class="mt-1 text-sm text-red-600">
                {{ errors.name }}
              </p>
            </div>

            <div>
              <label for="email" class="label">Email Address *</label>
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
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="password" class="label">Password *</label>
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
                  placeholder="Create a password"
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

            <div>
              <label for="confirmPassword" class="label">Confirm Password *</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock class="w-5 h-5 text-gray-400" />
                </div>
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  class="input pl-10 pr-10"
                  :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.confirmPassword }"
                  placeholder="Confirm your password"
                  required
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
              <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">
                {{ errors.confirmPassword }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="age" class="label">Age</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar class="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="age"
                  v-model="form.age"
                  class="input pl-10"
                  :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.age }"
                  placeholder="Your age"
                  min="1"
                  max="120"
                />
              </div>
              <p v-if="errors.age" class="mt-1 text-sm text-red-600">
                {{ errors.age }}
              </p>
            </div>

            <div>
              <label for="gender" class="label">Gender</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users class="w-5 h-5 text-gray-400" />
                </div>
                <select
                  id="gender"
                  v-model="form.gender"
                  class="input pl-10"
                  :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.gender }"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              <p v-if="errors.gender" class="mt-1 text-sm text-red-600">
                {{ errors.gender }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="height" class="label">Height (cm)</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Ruler class="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="height"
                  v-model="form.height"
                  class="input pl-10"
                  :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.height }"
                  placeholder="Height in cm"
                  min="50"
                  max="300"
                />
              </div>
              <p v-if="errors.height" class="mt-1 text-sm text-red-600">
                {{ errors.height }}
              </p>
            </div>

            <div>
              <label for="weight" class="label">Weight (kg)</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Weight class="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="weight"
                  v-model="form.weight"
                  class="input pl-10"
                  :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.weight }"
                  placeholder="Weight in kg"
                  min="10"
                  max="500"
                  step="0.1"
                />
              </div>
              <p v-if="errors.weight" class="mt-1 text-sm text-red-600">
                {{ errors.weight }}
              </p>
            </div>
          </div>

          <div>
            <label class="label">Health Goals (Select all that apply)</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div v-for="goal in healthGoals" :key="goal.value" class="flex items-center">
                <input
                  :id="goal.value"
                  type="checkbox"
                  :value="goal.value"
                  v-model="form.goals"
                  class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label :for="goal.value" class="ml-2 block text-sm text-gray-700">
                  {{ goal.label }}
                </label>
              </div>
            </div>
          </div>

          <div>
            <label for="activityLevel" class="label">Activity Level</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Activity class="w-5 h-5 text-gray-400" />
              </div>
              <select
                id="activityLevel"
                v-model="form.activityLevel"
                class="input pl-10"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.activityLevel }"
              >
                <option value="">Select your activity level</option>
                <option value="sedentary">Sedentary (little to no exercise)</option>
                <option value="lightly-active">Lightly Active (light exercise 1-3 days/week)</option>
                <option value="moderately-active">Moderately Active (moderate exercise 3-5 days/week)</option>
                <option value="very-active">Very Active (hard exercise 6-7 days/week)</option>
                <option value="extremely-active">Extremely Active (very hard exercise, physical job)</option>
              </select>
            </div>
            <p v-if="errors.activityLevel" class="mt-1 text-sm text-red-600">
              {{ errors.activityLevel }}
            </p>
          </div>

          <div class="flex items-start">
            <input
              id="terms"
              type="checkbox"
              v-model="form.acceptTerms"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
              :class="{ 'border-red-500': errors.acceptTerms }"
              required
            />
            <label for="terms" class="ml-2 block text-sm text-gray-700">
              I agree to the <a href="#" class="font-medium text-primary-600 hover:text-primary-500">Terms of Service</a> and 
              <a href="#" class="font-medium text-primary-600 hover:text-primary-500">Privacy Policy</a>
            </label>
          </div>
          <p v-if="errors.acceptTerms" class="text-sm text-red-600">
            {{ errors.acceptTerms }}
          </p>

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
            <UserPlus v-else class="w-5 h-5 mr-2" />
            {{ loading ? 'Creating Account...' : 'Create Account' }}
          </button>

          <div class="text-center">
            <p class="text-sm text-gray-600">
              Already have an account?
              <router-link to="/login" class="font-medium text-primary-600 hover:text-primary-500">
                Sign in here
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
  UserPlus, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Calendar, 
  Users, 
  Ruler, 
  Weight, 
  Activity, 
  AlertCircle, 
  Loader2 
} from 'lucide-vue-next'

export default {
  name: 'Register',
  components: {
    UserPlus,
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Calendar,
    Users,
    Ruler,
    Weight,
    Activity,
    AlertCircle,
    Loader2
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const form = reactive({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      gender: '',
      height: '',
      weight: '',
      goals: [],
      activityLevel: '',
      acceptTerms: false
    })

    const errors = reactive({})
    const showPassword = ref(false)
    const showConfirmPassword = ref(false)
    const loading = ref(false)
    const error = ref('')

    const healthGoals = [
      { value: 'weight-loss', label: 'Weight Loss' },
      { value: 'weight-gain', label: 'Weight Gain' },
      { value: 'muscle-building', label: 'Muscle Building' },
      { value: 'general-fitness', label: 'General Fitness' },
      { value: 'stress-relief', label: 'Stress Relief' },
      { value: 'better-sleep', label: 'Better Sleep' }
    ]

    const validateForm = () => {
      const newErrors = {}

      if (!form.name || form.name.length < 2) {
        newErrors.name = 'Name must be at least 2 characters'
      }

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

      if (!form.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }

      if (form.age && (form.age < 1 || form.age > 120)) {
        newErrors.age = 'Age must be between 1 and 120'
      }

      if (form.height && (form.height < 50 || form.height > 300)) {
        newErrors.height = 'Height must be between 50 and 300 cm'
      }

      if (form.weight && (form.weight < 10 || form.weight > 500)) {
        newErrors.weight = 'Weight must be between 10 and 500 kg'
      }

      if (!form.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms and conditions'
      }

      Object.assign(errors, newErrors)
      return Object.keys(newErrors).length === 0
    }

    const handleRegister = async () => {
      if (!validateForm()) return

      loading.value = true
      error.value = ''

      try {
        const result = await store.dispatch('auth/register', {
          name: form.name,
          email: form.email,
          password: form.password,
          age: form.age ? parseInt(form.age) : undefined,
          gender: form.gender || undefined,
          height: form.height ? parseInt(form.height) : undefined,
          weight: form.weight ? parseFloat(form.weight) : undefined,
          goals: form.goals,
          activityLevel: form.activityLevel || undefined
        })

        if (result.success) {
          router.push('/dashboard')
        } else {
          error.value = result.error
        }
      } catch (err) {
        error.value = 'An unexpected error occurred'
      } finally {
        loading.value = false
      }
    }

    return {
      form,
      errors,
      showPassword,
      showConfirmPassword,
      loading,
      error,
      healthGoals,
      handleRegister
    }
  }
}
</script>