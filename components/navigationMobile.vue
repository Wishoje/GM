<template>
<div>
    <div class="curtain" v-bind:class="{change: $store.state.navigation.isHamburgerActive}">
        <navigationLinks />
    </div>
	<nav class="navbar">
		<div class="c-logo">
			<nuxt-link to="/">
			<img src="../assets/images/gamersmusiclogo.svg" alt="Gamers Music Logo">
			</nuxt-link>
		</div>
        <div class="hamburger" v-bind:class="{change: $store.state.navigation.isHamburgerActive}" @click="toggleHamburger">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
        </div>
	</nav>
</div>
</template>

<script>
import { mapMutations } from 'vuex';
import commonButton from './commonButton';
import navigationLinks from './navigationLinks';
    

export default {
    name: 'navigationMobile',
    components: {
        commonButton,
        navigationLinks
    },
    props: {
        modalType: String
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
.navbar {
    position: fixed;
    width: 100%;
    top: 0;
    overflow: hidden;
    z-index: 1000;
    
    .hamburger {
        position: relative;
        right: 20px;
        bottom: 4px;
        cursor: pointer;
    
        .bar1, .bar2, .bar3 {
            width: 35px;
            height: 4px;
            background-color: white;
            margin: 6px 0;
            transition: 0.4s;
        }
    }

    /* Rotate first bar */
    .change .bar1 {
        -webkit-transform: rotate(-45deg) translate(-6px, 6px);
        transform: rotate(-45deg) translate(-6px, 6px);
        background-color: $primary-red;
    }

    /* Fade out the second bar */
    .change .bar2 {
        opacity: 0;
    }

    /* Rotate last bar */
    .change .bar3 {
        -webkit-transform: rotate(45deg) translate(-8px, -8px);
        transform: rotate(45deg) translate(-8px, -8px);
        background-color: $primary-red;
    }
}

.curtain {
    position: fixed;
    width: 100%;
    height: 100%;
    display: none;
    z-index: 1000;
    &.change {
        background-color: black;
        display: block;
    }
}

nav {
    font-family: Arial;
    font-size: 1rem;
    background-color: $primary-black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0 10px 0;
}

.c-logo {
    img {
        width: 80%;
        padding-left: 20px;
    }
}
</style>
