<template>
  <div>
    <nav class="bg-white shadow-sm">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="hidden sm:ml-6 sm:flex">
              <nuxt-link
                to="/"
                class="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
              >
                Home
              </nuxt-link>
              <nuxt-link
                v-if="!$store.state.user"
                to="/registration"
                class="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
              >
                Register
              </nuxt-link>
              <nuxt-link
                v-if="!$store.state.user"
                to="/login"
                class="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
              >
                Login
              </nuxt-link>
              <nuxt-link
                v-if="$store.state.user"
                to="/account"
                class="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
              >
                Profile
              </nuxt-link>
              <a
                v-if="$store.state.user"
                @click="logout"
                class="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <nuxt />
  </div>
</template>

<script>
  export default {
    methods: {
      async logout() {
        try { 
          const result = await this.$axios.post('/api/logout');
          this.$store.commit('SET_USER', null);
        } catch(err) {
          throw new Error(err);
        }
      }
    }
  }
</script>