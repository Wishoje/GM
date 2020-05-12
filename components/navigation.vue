<template>
	<nav>
		<div class="c-logo">
			Logo
		</div>
		<ul class="c-links">
			<li>
				<nuxt-link class="c-cat-link" to="/categories"><span>Categories</span></nuxt-link>
			</li>
			<li v-if="!$store.state.auth.user">
				<nuxt-link class="c-login-link" to="/login"><span>Login</span></nuxt-link>
			</li>
			<li v-if="!$store.state.auth.user">
				<nuxt-link class="c-join-link" to="/registration"><span>JOIN</span></nuxt-link>
			</li>
			<li v-if="$store.state.auth.user">
				<nuxt-link class="c-login-link" to="/account"><span>Profile</span></nuxt-link>
			</li>
			<li v-if="$store.state.auth.user">
				<nuxt-link class="c-login-link" to="/"><span>Logout</span></nuxt-link>
			</li>
		</ul>
	</nav>
</template>

<script>
	export default {
		name: 'navigation',
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

<style lang="scss" scoped>
	nav {
		font-family: Arial;
		font-size: 1rem;
		background-color: $primary-black;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.6875rem 9.6rem;
	}

	.c-links li {
		display: inline-block;
	}

	.c-cat-link {
		transition: all 0.3s ease 0s;
		color: $primary-red;
		padding: 1.3125rem;
	}

	.c-cat-link:hover span{
		color: $primary-red;
		font-weight: bold;
		text-decoration: underline;
	}

	.c-login-link {
		transition: all 0.3s ease 0s;
		color: $primary-white;
		padding: 0.5625rem;

	}

	.c-login-link:hover span{
		color: $primary-white;
		font-weight:bold;
		text-decoration:underline;
	}

	.c-join-link {
		justify-content:flex-end;
		transition: all 0.3s ease 0s;
		color: $primary-black;
		background-color: $primary-red;
		padding:0.4375rem 0.5625rem;
		border-radius: 0.2rem;
		background-clip: border-box;
	}

	.c-join-link:hover span{
		color:black;
		font-weight:bold;
		text-decoration:underline;
	}

	.c-logo {
		color:black;
		justify-content:flex-start;
		background-color: $primary-red;
		background-clip: border-box;
		padding:0.8125rem 5.8125rem;
		border-radius: 0.2rem; 
	}
</style>