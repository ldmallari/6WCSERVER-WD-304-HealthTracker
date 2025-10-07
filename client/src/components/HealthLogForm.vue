<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="label">Log Type *</label>
        <select 
          v-model="form.type"
          class="input"
          :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.type }"
          required
        >
          <option value="">Select type</option>
          <option value="exercise">Exercise</option>
          <option value="sleep">Sleep</option>
          <option value="water">Water</option>
          <option value="weight">Weight</option>
          <option value="mood">Mood</option>
          <option value="meal">Meal</option>
          <option value="meditation">Meditation</option>
          <option value="other">Other</option>
        </select>
        <p v-if="errors.type" class="mt-1 text-sm text-red-600">
          {{ errors.type }}
        </p>
      </div>

      <div>
        <label class="label">Date *</label>
        <input 
          type="datetime-local" 
          v-model="form.date"
          class="input"
          :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.date }"
          required
        />
        <p v-if="errors.date" class="mt-1 text-sm text-red-600">
          {{ errors.date }}
        </p>
      </div>
    </div>

    <div>
      <label class="label">Title *</label>
      <input 
        type="text" 
        v-model="form.title"
        class="input"
        :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': errors.title }"
        placeholder="Enter a title for this log"
        required
      />
      <p v-if="errors.title" class="mt-1 text-sm text-red-600">
        {{ errors.title }}
      </p>
    </div>

    <div>
      <label class="label">Description</label>
      <textarea 
        v-model="form.description"
        rows="3"
        class="input"
        placeholder="Add a description (optional)"
      ></textarea>
    </div>

    <div v-if="form.type === 'exercise'" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="label">Duration (minutes)</label>
        <input 
          type="number" 
          v-model="form.duration"
          min="0"
          class="input"
          placeholder="Duration in minutes"
        />
      </div>
      <div>
        <label class="label">Intensity</label>
        <select v-model="form.intensity" class="input">
          <option value="">Select intensity</option>
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <label class="label">Calories Burned</label>
        <input 
          type="number" 
          v-model="form.calories"
          min="0"
          class="input"
          placeholder="Calories burned"
        />
      </div>
    </div>

    <div v-if="form.type === 'sleep'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="label">Sleep Hours</label>
        <input 
          type="number" 
          v-model="form.sleepHours"
          min="0"
          max="24"
          step="0.5"
          class="input"
          placeholder="Hours of sleep"
        />
      </div>
      <div>
        <label class="label">Sleep Quality</label>
        <select v-model="form.sleepQuality" class="input">
          <option value="">Select quality</option>
          <option value="poor">Poor</option>
          <option value="fair">Fair</option>
          <option value="good">Good</option>
          <option value="excellent">Excellent</option>
        </select>
      </div>
    </div>

    <div v-if="form.type === 'water'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="label">Water Amount (ml)</label>
        <input 
          type="number" 
          v-model="form.waterAmount"
          min="0"
          class="input"
          placeholder="Amount in milliliters"
        />
      </div>
    </div>

    <div v-if="form.type === 'weight'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="label">Weight (kg)</label>
        <input 
          type="number" 
          v-model="form.weight"
          min="10"
          max="500"
          step="0.1"
          class="input"
          placeholder="Weight in kilograms"
        />
      </div>
    </div>

    <div v-if="form.type === 'mood'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="label">Mood</label>
        <select v-model="form.mood" class="input">
          <option value="">Select mood</option>
          <option value="very-bad">Very Bad</option>
          <option value="bad">Bad</option>
          <option value="neutral">Neutral</option>
          <option value="good">Good</option>
          <option value="very-good">Very Good</option>
        </select>
      </div>
    </div>

    <div v-if="form.type === 'meal'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="label">Meal Type</label>
        <select v-model="form.mealType" class="input">
          <option value="">Select meal type</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
      </div>
    </div>

    <div>
      <label class="label">Tags</label>
      <input 
        type="text" 
        v-model="tagsInput"
        class="input"
        placeholder="Enter tags separated by commas (e.g., morning, cardio, outdoor)"
      />
      <p class="mt-1 text-sm text-gray-500">
        Separate multiple tags with commas
      </p>
    </div>


    <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <div class="flex">
        <AlertCircle class="w-5 h-5 text-red-400 mr-2" />
        <p class="text-sm text-red-600">{{ error }}</p>
      </div>
    </div>

    <div class="flex justify-end space-x-3">
      <button 
        type="button" 
        class="btn btn-outline"
        @click="$emit('cancel')"
      >
        Cancel
      </button>
      <button 
        type="submit" 
        class="btn btn-primary"
        :disabled="loading"
      >
        <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
        <Save v-else class="w-4 h-4 mr-2" />
        {{ loading ? 'Saving...' : (log ? 'Update Log' : 'Save Log') }}
      </button>
    </div>
  </form>
</template>

<script>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { AlertCircle, Loader2, Save } from 'lucide-vue-next'

export default {
  name: 'HealthLogForm',
  components: {
    AlertCircle,
    Loader2,
    Save
  },
  props: {
    log: {
      type: Object,
      default: null
    }
  },
  emits: ['save', 'cancel'],
  setup(props, { emit }) {
    const loading = ref(false)
    const error = ref('')
    const tagsInput = ref('')

    const form = reactive({
      type: '',
      title: '',
      description: '',
      date: '',
      duration: '',
      intensity: '',
      calories: '',
      sleepHours: '',
      sleepQuality: '',
      waterAmount: '',
      weight: '',
      mood: '',
      mealType: '',
      tags: [],
      isPublic: false
    })

    const errors = reactive({})

    const validateForm = () => {
      const newErrors = {}

      if (!form.type) {
        newErrors.type = 'Log type is required'
      }

      if (!form.title) {
        newErrors.title = 'Title is required'
      }

      if (!form.date) {
        newErrors.date = 'Date is required'
      }

      Object.assign(errors, newErrors)
      return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
      if (!validateForm()) return

      loading.value = true
      error.value = ''

      try {
        const tags = tagsInput.value
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0)

        const logData = {
          ...form,
          tags,
          duration: form.duration ? parseInt(form.duration) : undefined,
          calories: form.calories ? parseInt(form.calories) : undefined,
          sleepHours: form.sleepHours ? parseFloat(form.sleepHours) : undefined,
          waterAmount: form.waterAmount ? parseInt(form.waterAmount) : undefined,
          weight: form.weight ? parseFloat(form.weight) : undefined
        }

        Object.keys(logData).forEach(key => {
          if (logData[key] === '' || logData[key] === null || logData[key] === undefined) {
            delete logData[key]
          }
        })

        emit('save', logData)
      } catch (err) {
        error.value = 'An error occurred while saving the log'
      } finally {
        loading.value = false
      }
    }

    const initializeForm = () => {
      if (props.log) {
        Object.assign(form, {
          type: props.log.type || '',
          title: props.log.title || '',
          description: props.log.description || '',
          date: props.log.date ? new Date(props.log.date).toISOString().slice(0, 16) : '',
          duration: props.log.duration || '',
          intensity: props.log.intensity || '',
          calories: props.log.calories || '',
          sleepHours: props.log.sleepHours || '',
          sleepQuality: props.log.sleepQuality || '',
          waterAmount: props.log.waterAmount || '',
          weight: props.log.weight || '',
          mood: props.log.mood || '',
          mealType: props.log.mealType || '',
          isPublic: props.log.isPublic || false
        })
        
        tagsInput.value = props.log.tags ? props.log.tags.join(', ') : ''
      } else {
        form.date = new Date().toISOString().slice(0, 16)
      }
    }

    watch(() => props.log, () => {
      initializeForm()
    }, { immediate: true })

    onMounted(() => {
      initializeForm()
    })

    return {
      loading,
      error,
      form,
      errors,
      tagsInput,
      handleSubmit
    }
  }
}
</script>