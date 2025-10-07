<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <BookOpen class="w-10 h-10 mr-3 text-primary-600" />
          Health & Wellness Articles
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover expert tips and insights for your wellness journey
        </p>
      </div>

      <div class="card p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search class="w-5 h-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              class="input pl-10"
              placeholder="Search articles..."
              v-model="searchQuery"
              @input="debouncedSearch"
            />
          </div>
          
          <select 
            class="input"
            v-model="filters.category"
            @change="fetchArticles"
          >
            <option value="">All Categories</option>
            <option value="nutrition">Nutrition</option>
            <option value="exercise">Exercise</option>
            <option value="mental-health">Mental Health</option>
            <option value="sleep">Sleep</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="medical">Medical</option>
          </select>
          
          
          
          <button 
            class="btn btn-outline"
            @click="clearFilters"
          >
            <X class="w-4 h-4 mr-2" />
            Clear
          </button>
        </div>
      </div>


      <div>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900 flex items-center mb-4 sm:mb-0">
            <List class="w-6 h-6 mr-2 text-primary-600" />
            All Articles
            <span class="badge badge-primary ml-2">{{ articles.length }}</span>
          </h2>
          <div class="flex gap-2">
            <button 
              class="btn btn-sm"
              :class="sortBy === 'newest' ? 'btn-primary' : 'btn-outline'"
              @click="setSortBy('newest')"
            >
              <ArrowDown class="w-4 h-4 mr-1" />
              Newest
            </button>
          </div>
        </div>

        <div v-if="loading" class="text-center py-12">
          <Loader2 class="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
          <p class="text-gray-600">Loading articles...</p>
        </div>

        <div v-else-if="articles.length === 0" class="text-center py-12">
          <div class="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search class="w-8 h-8 text-gray-400" />
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
          <p class="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
          <button 
            class="btn btn-primary"
            @click="clearFilters"
          >
            <RefreshCw class="w-4 h-4 mr-2" />
            Clear Filters
          </button>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="article in articles" 
            :key="article._id"
            class="card card-hover group"
          >
            <div class="relative overflow-hidden">
              <img 
                v-if="article.featuredImage"
                :src="article.featuredImage" 
                :alt="article.title"
                class="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div v-else class="w-full h-40 bg-gray-200 flex items-center justify-center">
                <span class="text-gray-400 text-xs">No Image Provided</span>
              </div>
            </div>
            <div class="p-6">
              <div class="flex flex-wrap gap-2 mb-3">
                <span class="badge badge-primary">{{ article.category }}</span>
                <span class="badge badge-secondary">{{ article.difficulty }}</span>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {{ article.title }}
              </h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                {{ article.excerpt || truncateText(article.content, 100) }}
              </p>
              <div class="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span class="flex items-center">
                  <User class="w-4 h-4 mr-1" />
                  {{ article.author?.name || 'Anonymous' }}
                </span>
                <span class="flex items-center">
                  <Clock class="w-4 h-4 mr-1" />
                  {{ article.readTime }} min
                </span>
              </div>
              
              <a 
                :href="article.url || `/articles/${article._id}`" 
                class="btn btn-outline-primary w-full" target="_blank" rel="noopener noreferrer"
              >
                Read Article
              </a>
            </div>
          </div>
        </div>

        <div v-if="pagination.totalPages > 1" class="flex justify-center mt-12">
          <nav class="flex items-center space-x-2">
            <button 
              class="btn btn-outline btn-sm"
              :disabled="pagination.currentPage === 1"
              @click="changePage(pagination.currentPage - 1)"
            >
              <ChevronLeft class="w-4 h-4 mr-1" />
              Previous
            </button>
            
            <div class="flex space-x-1">
              <button 
                v-for="page in visiblePages" 
                :key="page"
                class="btn btn-sm"
                :class="page === pagination.currentPage ? 'btn-primary' : 'btn-outline'"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              class="btn btn-outline btn-sm"
              :disabled="pagination.currentPage === pagination.totalPages"
              @click="changePage(pagination.currentPage + 1)"
            >
              Next
              <ChevronRight class="w-4 h-4 ml-1" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { debounce } from 'lodash-es'
import { 
  BookOpen, 
  Search, 
  X, 
  List, 
  ArrowDown, 
  Loader2, 
  RefreshCw, 
  User, 
  Clock, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-vue-next'

export default {
  name: 'Articles',
  components: {
    BookOpen,
    Search,
    X,
    List,
    ArrowDown,
    Loader2,
    RefreshCw,
    User,
    Clock,
    ChevronLeft,
    ChevronRight
  },
  setup() {
    const store = useStore()
    
    const loading = ref(false)
    const searchQuery = ref('')
    const sortBy = ref('newest')
    
    const filters = reactive({
      category: ''
    })

    const articles = computed(() => store.getters['articles/allArticles'])
    const pagination = computed(() => store.getters['articles/pagination'])

    const visiblePages = computed(() => {
      const current = pagination.value.currentPage
      const total = pagination.value.totalPages
      const pages = []
      
      for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
        pages.push(i)
      }
      
      return pages
    })


    const truncateText = (text, length) => {
      if (!text) return ''
      return text.length > length ? text.substring(0, length) + '...' : text
    }

    const fetchArticles = async () => {
      loading.value = true
      try {
        const params = {
          ...filters,
          search: searchQuery.value,
          page: pagination.value.currentPage,
          limit: 10
        }
        
        params.sortBy = 'createdAt'

        await store.dispatch('articles/fetchArticles', params)
      } catch (error) {
      } finally {
        loading.value = false
      }
    }

    const debouncedSearch = debounce(() => {
      fetchArticles()
    }, 500)

    const changePage = (page) => {
      if (page >= 1 && page <= pagination.value.totalPages) {
        store.dispatch('articles/fetchArticles', {
          ...filters,
          search: searchQuery.value,
          page,
          limit: 10
        })
      }
    }

    const setSortBy = (sort) => {
      sortBy.value = sort
      fetchArticles()
    }

    const clearFilters = () => {
      searchQuery.value = ''
      filters.category = ''
      sortBy.value = 'newest'
      fetchArticles()
    }

    onMounted(() => {
      fetchArticles()
    })

    watch(filters, () => {
      fetchArticles()
    }, { deep: true })

    return {
      loading,
      searchQuery,
      sortBy,
      filters,
      articles,
      pagination,
      visiblePages,
      truncateText,
      fetchArticles,
      debouncedSearch,
      changePage,
      setSortBy,
      clearFilters
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>