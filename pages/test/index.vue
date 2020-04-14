<template>
    <div class="w-full max-w-xs">
        <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div>
                Test Route
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                    Email
                </label>
                <input 
                    v-model="email"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="text"
                    placeholder="Email">
            </div>
            <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Submit
            </button>
            </div>
        </form>
        Test AsyncData:
        <ul>
            <li v-for="user in allUsers" :key="user">{{ user.email }}</li>
        </ul>
        <div v-if="error">{{ error }}</div>
    </div>
</template>

<script>
    export default {
        name: 'test',
        data() {
            return {
                email: '',
                error: '',
                allUsers: null
            };
        },
        async asyncData({$axios, error}) {
            try {
                const result = await $axios.get('/api/users');
                return {
                    allUsers: result.data
                }
            } catch(err) {
                error({ statusCode: 404, message: 'Page Not Found!' })
            }
        },
        methods: {
             async submitForm() {
                try {
                    const results = await this.$axios.get('/api/users');
                    console.log(results);
                } catch(err) {
                    this.email = '';
                    this.error = err;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>