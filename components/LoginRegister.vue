<template>
	<div>
        <div class="c-registration" v-if="!user">
            <h1>{{ loginType }}</h1>
            <h2>Join Our Gamers Community To Explore New Awesome Music</h2>
            <h3>
                Upload playlists from from your favorite music platform,
                Share your music profile with other gamers,
                Search playlists by genre, platform or games and many more!
            </h3>
            <div class="c-registration-button">
                <commonButton v-if="!user" @click.native="showModal({modalName: 'ModalLogin', modalType:`${modalType}`})" :text="buttonText" />
            </div>
        </div>
    </div>
</template>

<script>
import commonButton from './commonButton';
import { mapMutations } from 'vuex';

export default {
    name: 'LoginRegister',
    components: {
        commonButton
    },
    props: {
        buttonText: {
            type: String,
            required: true
        },
        modalType: {
            type: String,
            required: true
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.user;
        },
        loginType() {
            return this.modalType === 'modalRegister' ? 'Create Account' : 'Login';
        }
    },
    methods: {
        ...mapMutations('modal', ['showModal'])
    }
}
</script>

<style lang="scss" scoped>
    .c-registration {
        margin: 0 auto;
        padding-top: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 60%;
    }
    .c-registration-button {
        text-align: center;
        margin-top: 30px;
    }
    @media #{$mq-mobile} {
        .c-registration {
            width: 100%;
        }
    }
</style>