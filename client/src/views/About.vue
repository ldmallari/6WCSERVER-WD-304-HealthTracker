<template>
  <div class="min-h-screen bg-gray-50">
    <section class="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          About <span class="text-yellow-400">HealthTracker</span>
        </h1>
        <p class="text-xl text-primary-100 max-w-3xl mx-auto">
          A free health tracking app built to help everyone stay healthy
        </p>
      </div>
    </section>
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <div class="card p-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p class="text-xl text-gray-600 mb-8">
              We got tired of complicated health apps with hidden fees and confusing features. 
              So we built something simple, free, and easy to use for everyone.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="text-center">
                <div class="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart class="w-8 h-8 text-red-600" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Health First</h3>
                <p class="text-gray-600">Prioritizing your physical and mental well-being</p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target class="w-8 h-8 text-blue-600" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Goal-Oriented</h3>
                <p class="text-gray-600">Helping you achieve your wellness objectives</p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield class="w-8 h-8 text-green-600" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Privacy</h3>
                <p class="text-gray-600">Your data is secure and private</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine cutting-edge technology with personalized health insights to create 
            a comprehensive wellness platform.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="card p-8 text-center group hover:scale-105 transition-transform duration-200">
            <div class="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
              <BarChart3 class="w-8 h-8 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Advanced Analytics</h3>
            <p class="text-gray-600">
              Get detailed insights into your health patterns with our sophisticated 
              data analysis and visualization tools.
            </p>
          </div>
          
          <div class="card p-8 text-center group hover:scale-105 transition-transform duration-200">
            <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
              <Shield class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Privacy & Security</h3>
            <p class="text-gray-600">
              Your health data is encrypted and protected with enterprise-grade security 
              measures and privacy controls.
            </p>
          </div>
          
          <div class="card p-8 text-center group hover:scale-105 transition-transform duration-200">
            <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
              <Smartphone class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Mobile-First Design</h3>
            <p class="text-gray-600">
              Access your health data anywhere with our responsive, mobile-optimized 
              interface that works on all devices.
            </p>
          </div>
          
          <div class="card p-8 text-center group hover:scale-105 transition-transform duration-200">
            <div class="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-200 transition-colors">
              <BookOpen class="w-8 h-8 text-yellow-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Expert Content</h3>
            <p class="text-gray-600">
              Access curated articles and resources from certified health professionals 
              and wellness experts.
            </p>
          </div>
          
          <div class="card p-8 text-center group hover:scale-105 transition-transform duration-200">
            <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
              <Zap class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Real-Time Tracking</h3>
            <p class="text-gray-600">
              Log your activities and health metrics in real-time with our intuitive 
              tracking system and instant feedback.
            </p>
          </div>
          
          <div class="card p-8 text-center group hover:scale-105 transition-transform duration-200">
            <div class="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-200 transition-colors">
              <Heart class="w-8 h-8 text-red-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Personalized Insights</h3>
            <p class="text-gray-600">
              Receive personalized recommendations and insights based on your unique 
              health data and wellness goals.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Our diverse team of health professionals, developers, and wellness experts 
            work together to create the best possible experience for you.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Dr. Sarah Johnson</h3>
            <p class="text-primary-600 mb-2">Chief Medical Officer</p>
            <p class="text-gray-600 text-sm">
              Board-certified physician with 15+ years of experience in preventive medicine.
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Michael Chen</h3>
            <p class="text-primary-600 mb-2">Lead Developer</p>
            <p class="text-gray-600 text-sm">
              Full-stack developer passionate about creating user-friendly health technology.
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Emily Rodriguez</h3>
            <p class="text-primary-600 mb-2">Wellness Coach</p>
            <p class="text-gray-600 text-sm">
              Certified nutritionist and fitness expert helping users achieve their goals.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Ready to Start Your Wellness Journey?</h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already tracking their health and achieving their goals.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/register" class="btn btn-lg bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-xl">
            <UserPlus class="w-5 h-5 mr-2" />
            Get Started Free
          </router-link>
          <router-link to="/articles" class="btn btn-lg border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105">
            <BookOpen class="w-5 h-5 mr-2" />
            Learn More
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { 
  Heart, 
  Target, 
  BarChart3, 
  Shield, 
  Smartphone, 
  BookOpen, 
  Zap, 
  UserPlus 
} from 'lucide-vue-next'

export default {
  name: 'About',
  components: {
    Heart,
    Target,
    BarChart3,
    Shield,
    Smartphone,
    BookOpen,
    Zap,
    UserPlus
  }
}
</script>