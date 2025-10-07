<template>
  <div id="app" class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar v-if="!isAuthPage" />
    <main class="flex-1" :class="{ 'pt-20': !isAuthPage }">
      <router-view />
    </main>
    <Footer v-if="!isAuthPage" />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  setup() {
    const route = useRoute()
    
    const isAuthPage = computed(() => {
      return route.name === 'Login' || route.name === 'Register'
    })

    return {
      isAuthPage
    }
  }
}
</script>

<style>
::-webkit-scrollbar {
  @apply w-2;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-400 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-500;
}

.fade-enter-active, .fade-leave-active {
  @apply transition-opacity duration-300;
}

.fade-enter-from, .fade-leave-to {
  @apply opacity-0;
}

.slide-enter-active, .slide-leave-active {
  @apply transition-transform duration-300;
}

.slide-enter-from {
  @apply -translate-x-full;
}

.slide-leave-to {
  @apply translate-x-full;
}
</style>
