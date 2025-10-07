<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand Section -->
        <div class="lg:col-span-1">
          <div class="flex items-center space-x-2 mb-4">
            <Heart class="w-8 h-8 text-primary-500" />
            <span class="text-xl font-bold">HealthTracker</span>
          </div>
          <p class="text-gray-400 mb-6 max-w-sm">
            A simple, free health tracker for everyone. Keep track of your 
            wellness while managing your busy life.
          </p>
        </div>
        
        <!-- Features -->
        <div>
          <h6 class="font-semibold text-white mb-4">Features</h6>
          <ul class="space-y-3">
            <li>
              <router-link to="/dashboard" class="text-gray-400 hover:text-white transition-colors">
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link to="/health-tracker" class="text-gray-400 hover:text-white transition-colors">
                Health Tracker
              </router-link>
            </li>
            <li>
              <router-link to="/articles" class="text-gray-400 hover:text-white transition-colors">
                Articles
              </router-link>
            </li>
            <li>
              <router-link to="/reports" class="text-gray-400 hover:text-white transition-colors">
                Reports
              </router-link>
            </li>
          </ul>
        </div>
        
        <!-- Resources -->
        <div>
          <h6 class="font-semibold text-white mb-4">Resources</h6>
          <ul class="space-y-3">
            <li>
              <router-link to="/about" class="text-gray-400 hover:text-white transition-colors">
                About Us
              </router-link>
            </li>
          </ul>
        </div>
        
      </div>
      
      <div class="border-t border-gray-800 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">
            &copy; {{ currentYear }} HealthTracker. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref } from 'vue'
import { Heart } from 'lucide-vue-next'

export default {
  name: 'Footer',
  components: {
    Heart
  },
  setup() {
    const currentYear = new Date().getFullYear()

    return {
      currentYear
    }
  }
}
</script>
