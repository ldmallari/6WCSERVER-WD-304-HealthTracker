<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="loading" class="text-center py-20">
        <Loader2 class="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
        <p class="text-gray-600">Loading article...</p>
      </div>

      <div v-else-if="!article" class="text-center py-20">
        <div class="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <AlertTriangle class="w-8 h-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Article not found</h3>
        <p class="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <router-link to="/articles" class="btn btn-primary">
          <ArrowLeft class="w-4 h-4 mr-2" />
          Back to Articles
        </router-link>
      </div>

      <div v-else>
        <nav class="mb-8">
          <ol class="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <router-link to="/" class="hover:text-primary-600 transition-colors">Home</router-link>
            </li>
            <li class="flex items-center">
              <ChevronRight class="w-4 h-4 mx-2" />
              <router-link to="/articles" class="hover:text-primary-600 transition-colors">Articles</router-link>
            </li>
            <li class="flex items-center">
              <ChevronRight class="w-4 h-4 mx-2" />
              <span class="text-gray-900 font-medium">{{ article.title }}</span>
            </li>
          </ol>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div class="lg:col-span-3">
            <div class="card mb-8">
              <div class="relative overflow-hidden">
                <img 
                  :src="article.featuredImage || getDefaultImage(article.category)" 
                  :alt="article.title"
                  class="w-full h-64 md:h-80 object-cover"
                />
                <div class="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span class="badge badge-primary">{{ article.category }}</span>
                  <span class="badge badge-success">{{ article.difficulty }}</span>
                </div>
              </div>
              <div class="p-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ article.title }}</h1>
                <p class="text-xl text-gray-600 mb-6">{{ article.excerpt }}</p>
                
                <div class="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
                  <div class="flex items-center">
                    <User class="w-4 h-4 mr-2" />
                    <span>{{ article.author?.name || 'Anonymous' }}</span>
                  </div>
                  <div class="flex items-center">
                    <Calendar class="w-4 h-4 mr-2" />
                    <span>{{ formatDate(article.date) }}</span>
                  </div>
                  <div class="flex items-center">
                    <Clock class="w-4 h-4 mr-2" />
                    <span>{{ article.readTime }} min read</span>
                  </div>
                  <div class="flex items-center">
                    <Eye class="w-4 h-4 mr-2" />
                    <span>{{ article.views }} views</span>
                  </div>
                </div>

                <div class="flex flex-wrap gap-3">
                  <button 
                    @click="toggleLike"
                    class="btn"
                    :class="isLiked ? 'btn-primary' : 'btn-outline'"
                  >
                    <Heart class="w-4 h-4 mr-2" :class="isLiked ? 'fill-current' : ''" />
                    {{ article.likes + (isLiked ? 1 : 0) }} likes
                  </button>
                  <button 
                    @click="toggleBookmark"
                    class="btn"
                    :class="isBookmarked ? 'btn-primary' : 'btn-outline'"
                  >
                    <Bookmark class="w-4 h-4 mr-2" :class="isBookmarked ? 'fill-current' : ''" />
                    {{ isBookmarked ? 'Saved' : 'Save' }}
                  </button>
                  <button 
                    @click="shareArticle"
                    class="btn btn-outline"
                  >
                    <Share2 class="w-4 h-4 mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </div>

            <div class="card p-8 mb-8">
              <div class="prose prose-lg max-w-none" v-html="article.content"></div>
            </div>

            <div v-if="article.tags && article.tags.length > 0" class="card p-6 mb-8">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in article.tags" 
                  :key="tag"
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>

            <div v-if="article.author" class="card p-6 mb-8">
              <div class="flex items-start space-x-4">
                <div class="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ article.author.name }}</h3>
                  <p class="text-gray-600 mb-3">{{ article.author.bio || 'Health and wellness expert' }}</p>
                  <div class="flex space-x-4 text-sm text-gray-500">
                    <span>{{ article.author.articlesCount || 0 }} articles</span>
                    <span>{{ article.author.followers || 0 }} followers</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-6">Comments ({{ comments.length }})</h3>
              
              <div class="mb-6">
                <textarea 
                  v-model="newComment"
                  class="input mb-4"
                  rows="3"
                  placeholder="Share your thoughts on this article..."
                ></textarea>
                <button 
                  @click="addComment"
                  class="btn btn-primary"
                  :disabled="!newComment.trim()"
                >
                  <MessageCircle class="w-4 h-4 mr-2" />
                  Add Comment
                </button>
              </div>

              <div class="space-y-4">
                <div 
                  v-for="comment in comments" 
                  :key="comment.id"
                  class="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <div class="flex items-start space-x-3">
                    <div class="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div class="flex-1">
                      <div class="flex items-center space-x-2 mb-1">
                        <span class="font-medium text-gray-900">{{ comment.author }}</span>
                        <span class="text-sm text-gray-500">{{ formatDate(comment.date) }}</span>
                      </div>
                      <p class="text-gray-700">{{ comment.content }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Related Articles</h3>
              <div class="space-y-4">
                <div 
                  v-for="relatedArticle in relatedArticles" 
                  :key="relatedArticle._id"
                  class="flex space-x-3 group cursor-pointer"
                  @click="$router.push(`/articles/${relatedArticle._id}`)"
                >
                  <img 
                    :src="relatedArticle.featuredImage || getDefaultImage(relatedArticle.category)" 
                    :alt="relatedArticle.title"
                    class="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {{ relatedArticle.title }}
                    </h4>
                    <p class="text-xs text-gray-500 mt-1">{{ relatedArticle.readTime }} min read</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h3>
              <nav class="space-y-2">
                <a 
                  v-for="heading in tableOfContents" 
                  :key="heading.id"
                  :href="`#${heading.id}`"
                  class="block text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  {{ heading.text }}
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { 
  Loader2, 
  AlertTriangle, 
  ArrowLeft, 
  ChevronRight, 
  User, 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  Bookmark, 
  Share2, 
  MessageCircle 
} from 'lucide-vue-next'

export default {
  name: 'ArticleDetail',
  components: {
    Loader2,
    AlertTriangle,
    ArrowLeft,
    ChevronRight,
    User,
    Calendar,
    Clock,
    Eye,
    Heart,
    Bookmark,
    Share2,
    MessageCircle
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const loading = ref(false)
    const article = ref(null)
    const isLiked = ref(false)
    const isBookmarked = ref(false)
    const newComment = ref('')
    const comments = ref([])
    const relatedArticles = ref([])
    const tableOfContents = ref([])

    const getDefaultImage = (category) => {
      const images = {
        nutrition: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        exercise: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        'mental-health': 'https://images.unsplash.com/photo-1506905925346-14b1e5dba1c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        sleep: 'https://images.unsplash.com/photo-1541781774459-671136451e50?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        lifestyle: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        medical: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        tips: 'https://images.unsplash.com/photo-1506905925346-14b1e5dba1c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        general: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
      }
      return images[category] || images.general
    }

    const formatDate = (date) => {
      if (!date) return 'N/A'
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    const toggleLike = () => {
      isLiked.value = !isLiked.value
    }

    const toggleBookmark = () => {
      isBookmarked.value = !isBookmarked.value
    }

    const shareArticle = () => {
      if (navigator.share) {
        navigator.share({
          title: article.value.title,
          text: article.value.excerpt,
          url: window.location.href
        })
      } else {
        navigator.clipboard.writeText(window.location.href)
      }
    }

    const addComment = () => {
      if (!newComment.value.trim()) return
      
      const comment = {
        id: Date.now(),
        author: 'You',
        content: newComment.value,
        date: new Date().toISOString()
      }
      
      comments.value.unshift(comment)
      newComment.value = ''
    }

    const fetchArticle = async () => {
      loading.value = true
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        article.value = {
          _id: route.params.id,
          title: 'The Complete Guide to Healthy Living',
          excerpt: 'Discover the essential principles of healthy living and how to implement them in your daily routine.',
          content: '<p>This is a comprehensive guide to healthy living...</p>',
          category: 'lifestyle',
          difficulty: 'beginner',
          author: {
            name: 'Dr. Sarah Johnson',
            bio: 'Board-certified physician with 15+ years of experience',
            articlesCount: 25,
            followers: 1200
          },
          date: new Date().toISOString(),
          readTime: 8,
          views: 1250,
          likes: 45,
          tags: ['health', 'lifestyle', 'wellness', 'tips'],
          featuredImage: null
        }
        
        relatedArticles.value = [
          {
            _id: '1',
            title: '10 Tips for Better Sleep',
            category: 'sleep',
            readTime: 5
          },
          {
            _id: '2',
            title: 'Nutrition Basics for Beginners',
            category: 'nutrition',
            readTime: 7
          }
        ]
        
        tableOfContents.value = [
          { id: 'introduction', text: 'Introduction' },
          { id: 'nutrition', text: 'Nutrition Guidelines' },
          { id: 'exercise', text: 'Exercise Recommendations' },
          { id: 'sleep', text: 'Sleep Optimization' },
          { id: 'conclusion', text: 'Conclusion' }
        ]
        
        comments.value = [
          {
            id: 1,
            author: 'John Doe',
            content: 'Great article! Very helpful tips.',
            date: new Date().toISOString()
          }
        ]
      } catch (error) {
        console.error('Error fetching article:', error)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchArticle()
    })

    return {
      loading,
      article,
      isLiked,
      isBookmarked,
      newComment,
      comments,
      relatedArticles,
      tableOfContents,
      getDefaultImage,
      formatDate,
      toggleLike,
      toggleBookmark,
      shareArticle,
      addComment
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.prose {
  color: #374151;
}

.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
  color: #111827;
  font-weight: 600;
}

.prose p {
  margin-bottom: 1.5rem;
}

.prose ul, .prose ol {
  margin-bottom: 1.5rem;
}

.prose li {
  margin-bottom: 0.5rem;
}
</style>