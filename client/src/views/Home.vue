<template>
  <div class="home">
    <section class="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <div class="space-y-4">
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Stay Healthy &
                <span class="text-yellow-400">Feel Great</span>
              </h1>
              <p class="text-xl text-gray-200 max-w-2xl">
                A simple, free health tracker for everyone. Keep track of your 
                workouts, sleep, and wellness while living your busy life.
              </p>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4">
              <router-link 
                to="/register" 
                v-if="!isAuthenticated"
                class="btn btn-lg bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-xl"
              >
                <Rocket class="w-5 h-5 mr-2" />
                Get Started Free
              </router-link>
              <router-link 
                to="/dashboard" 
                v-if="isAuthenticated"
                class="btn btn-lg border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105"
              >
                <LayoutDashboard class="w-5 h-5 mr-2" />
                Go to Dashboard
              </router-link>
              <router-link 
                to="/articles" 
                class="btn btn-lg border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105"
              >
                <BookOpen class="w-5 h-5 mr-2" />
                Browse Articles
              </router-link>
            </div>
          </div>
          
          <div class="relative">
            <div class="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Health and Wellness"
                class="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
            <div class="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl"></div>
            <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Perfect for Busy Lives</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple tools to help you stay healthy while managing your daily routine
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="card card-hover p-8 text-center group">
            <div class="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
              <Dumbbell class="w-8 h-8 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Easy Health Tracking</h3>
            <p class="text-gray-600">
              Quick logging of workouts, sleep, water, and mood - perfect for busy schedules.
            </p>
          </div>
          
          <div class="card card-hover p-8 text-center group">
            <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
              <BarChart3 class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Simple Progress Tracking</h3>
            <p class="text-gray-600">
              See your health trends with easy-to-read charts and weekly summaries.
            </p>
          </div>
          
          <div class="card card-hover p-8 text-center group">
            <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
              <BookOpen class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Health Articles</h3>
            <p class="text-gray-600">
              Read helpful health and wellness articles whenever you have a few minutes.
            </p>
          </div>
          
          <div class="card card-hover p-8 text-center group">
            <div class="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-200 transition-colors">
              <Shield class="w-8 h-8 text-yellow-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Your Data, Your Control</h3>
            <p class="text-gray-600">
              We keep your health info completely private - no sharing with anyone!
            </p>
          </div>
          
          <div class="card card-hover p-8 text-center group">
            <div class="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-200 transition-colors">
              <Smartphone class="w-8 h-8 text-red-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Works on Your Phone</h3>
            <p class="text-gray-600">
              Log your health data on the go - at work, at the gym, or at home.
            </p>
          </div>
          
          <div class="card card-hover p-8 text-center group">
            <div class="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-200 transition-colors">
              <Shield class="w-8 h-8 text-gray-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Completely Free</h3>
            <p class="text-gray-600">
              No hidden fees, no premium plans - just a free tool to help you stay healthy.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gray-50 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 text-center text-white">
          <h3 class="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join people who are staying healthy while managing their busy lives.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link 
              to="/register" 
              v-if="!isAuthenticated"
              class="btn btn-lg bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-xl"
            >
              <UserPlus class="w-5 h-5 mr-2" />
              Sign Up Now
            </router-link>
            <router-link 
              to="/dashboard" 
              v-else
              class="btn btn-lg border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <LayoutDashboard class="w-5 h-5 mr-2" />
              View Dashboard
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { 
  Rocket, 
  LayoutDashboard, 
  BookOpen, 
  Dumbbell, 
  BarChart3, 
  Smartphone, 
  Shield, 
  UserPlus 
} from 'lucide-vue-next'

export default {
  name: 'Home',
  components: {
    Rocket,
    LayoutDashboard,
    BookOpen,
    Dumbbell,
    BarChart3,
    Smartphone,
    Shield,
    UserPlus
  },
  setup() {
    const store = useStore()
    
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

    return {
      isAuthenticated
    }
  }
}
</script>
