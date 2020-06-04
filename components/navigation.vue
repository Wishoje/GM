<template>
	<nav class="navbar">
		<div class="c-logo">
			<nuxt-link to="/">Logo</nuxt-link>
		</div>

		<ul class="c-links">
			<li>
				<nuxt-link class="c-cat-link" to="/categories"><span>Categories</span></nuxt-link>
			</li>
			<li v-if="!$store.state.auth.user">
				<button class="c-login-link" @click="showModal({modalName: 'ModalLogin', modalType:'modalLogin'})">Login</button>
			</li>
			<li v-if="!$store.state.auth.user">
				<commonButton class="c-join-link" @click.native="showModal({modalName: 'ModalLogin', modalType:'modalRegister'})" text="JOIN" />
			<li>
				<nuxt-link class="c-login-link" to="/upload"><span>Upload</span></nuxt-link>
			</li>
			<li v-if="$store.state.auth.user">
				<nuxt-link class="c-login-link" to="/account"><span>Profile</span></nuxt-link>
			</li>
			<li v-if="$store.state.auth.user">
				<a @click="logout" class="c-login-link"><span>Logout</span></a>
			</li>
		</ul>
	</nav>
</template>

<script>
	import { mapMutations } from 'vuex';
	import commonButton from './commonButton';

	export default {
		name: 'navigation',
		components: {
			commonButton
		},
		props: {
			modalType: String
		},
		methods: {
			...mapMutations('modal', ['showModal']),
			async logout() {
				try {
					await this.$store.dispatch('auth/reset');
					this.$router.go();
				} catch(err) {
					throw new Error(err);
				}
			}
		}
  }
</script>

<style lang="scss" scoped>
	.navbar {
		position: fixed;
		width: 100%;
		top: 0;
		overflow: hidden;
		z-index: 100;
	}
	nav {
		font-family: Arial;
		font-size: 1rem;
		background-color: $primary-black;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.7rem 9.6rem;
	}

	.c-links li {
		display: inline-block;
	}

	.c-cat-link {
		transition: all 0.3s ease 0s;
		color: $primary-red;
		padding: 1.3125rem;
	}

	.c-cat-link:hover span {
		color: #ff797f;
	}

	.c-login-link {
		transition: all 0.3s ease 0s;
		color: $primary-white;
		padding: 0.5625rem;
	}

	.c-login-link:hover span {
		color: #ff797f;
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

	.c-join-link:hover span {
		color:black;
		font-weight:bold;
		text-decoration:underline;
	}

	.c-logo {
		color:black;
		justify-content:flex-start;
		background-color: $primary-red;
		background-clip: border-box;
		padding:0.4rem 5.8125rem;
		border-radius: 0.2rem; 
	}
</style>