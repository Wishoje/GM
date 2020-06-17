<template>
    <ul :class="[isMobile ? 'c-links-mobile' : 'c-links' ]" @click="toggleHamburger">
        <li>
            <nuxt-link class="c-cat-link" to="/categories"><span>Categories</span></nuxt-link>
        </li>
        <li>
            <nuxt-link class="c-cat-link c-podcast-link" to="/podcasts"><span>Podcasts</span></nuxt-link>
        </li>
        <li>
            <nuxt-link class="c-login-link" to="/upload"><span>Upload</span></nuxt-link>
        </li>
        <li v-if="!$store.state.auth.user">
            <button class="c-login-link" @click="showModal({modalName: 'ModalLogin', modalType:'modalLogin'})">Login</button>
        </li>
        <li v-if="!$store.state.auth.user">
            <commonButton class="c-join-link" @click.native="showModal({modalName: 'ModalLogin', modalType:'modalRegister'})" text="JOIN" />
        <li v-if="$store.state.auth.user">
            <nuxt-link class="c-login-link" to="/account"><span>Profile</span></nuxt-link>
        </li>
        <li v-if="$store.state.auth.user">
            <a @click="logout" class="c-login-link"><span>Logout</span></a>
        </li>
    </ul>
</template>

<script>
	import { mapMutations } from 'vuex';
	import commonButton from './commonButton';

	export default {
		name: 'navigationLinks',
		components: {
			commonButton
		},
		props: {
			modalType: String
		},
		computed: {
			isMobile() {
				return this.$device.isMobile;
			}
		},
		methods: {
            ...mapMutations('modal', ['showModal']),
            toggleHamburger() {
                this.$store.commit('navigation/SET_HAMBURGER');
            },
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


.c-cat-link {
    transition: all 0.3s ease 0s;
    color: $primary-red;
    padding: 0.3rem;
}

// Desktop classes
.c-links {
    li {
        display: inline-block;
    }

	.c-podcast-link {
		padding-right: 1.3rem;
	}

	.c-cat-link:hover span {
		color: #ff797f;
	}

	.c-login-link {
		cursor: pointer;
		transition: all 0.3s ease 0s;
		color: $primary-white;
		padding: 0.3rem;
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
	
	@media #{$mq-mobile-portrait} {
		span {
			font-size: 0.7rem;
		}
	}
}
// Desktop classes end

// Mobile classes
.c-links-mobile {
    font-size: 1.7rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    height: 90%;

    li {
        padding: 1rem;
        color: white;
    }
}

</style>