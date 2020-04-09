<template>
    <div class="w-full max-w-xs">
        <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div>
                Create Account
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
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input 
                    v-model="password" 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******">
            </div>
            <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Create Account
            </button>
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?1
            </a>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'registration',
        data() {
            return {
                email: '',
                password: '',
                error: ''
            };
        },
        computed: {
            users() { 
                return this.$store.state.user;
            }
        },
        methods: {
            async submitForm() {
                try {
                    const result = await this.$axios.get('/api/users', { email: this.email, password: this.password });
                    const util = require('util');
		            console.log('AAAAAAAAAA' + util.inspect(result, false, null, true /* enable colors */));
                    if (result && result.data) {
                        this.$store.commit('SET_USER', result.data);
                    }
                } catch(err) {
                    this.email = '';
                    this.password = '';
                    this.error = err;
                    console.log('ccc' + this.error);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>