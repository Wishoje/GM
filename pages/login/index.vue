<template>
    <div class="w-full max-w-xs">
        <form v-if="!user" @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div>
                Login
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
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Sign In
                </button>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline" 
                    v-if="googleReady" @click="googleSubmit" :loading="googleLoading" :disabled="googleLoading">
                    Log in with Google
                </button>
            </div>
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?
            </a><br>
            <div v-if="error">{{ error }}</div>
        </form>
    </div>
</template>

<script>
import AuthenticationMixin from '../../mixins/authentication-mixin';
export default {
    name: 'login',
    mixins: [
        AuthenticationMixin
    ],
    data() {
        return {
            email: '',
            password: '',
            error: ''
        };
    },
    computed: {
        user() { 
            return this.$store.state.auth.user;
        }
    },
    methods: {
        async submitForm() {
            try {
                const result = await this.$store.dispatch('auth/login', {
                    email: this.email,
                    password: this.password
                });
                this.router.push('/account');
            } catch(err) {
                this.email = '';
                this.password = '';
                this.error = 'Username Or Password is incorrect';
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>