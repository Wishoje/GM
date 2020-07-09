<template>
	<nav class="navbar">
		<div class="c-logo">
			<nuxt-link to="/"><img src="../assets/images/gamersmusiclogo.svg" alt="Gamers Music Logo"></nuxt-link>
		</div>
		<navigationLinks />
	</nav>
</template>

<script>
	import { mapMutations } from 'vuex';
	import navigationLinks from './navigationLinks';

	export default {
		name: 'navigation',
		components: {
			navigationLinks
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
		z-index: 1000;
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

	.c-logo {
		img {
			width: 80%;
		}
	}

	@media #{$mq-tablet} {
		nav {
			padding: 0.7rem 3rem;
		}
	}

	@media #{$mq-mobile} {
		nav {
			padding: 0.7rem 2rem;
		}
	}

	@media #{$mq-mobile-portrait} {
		nav {
			padding: 0.7rem 0.5rem;
		}
	}
</style>
