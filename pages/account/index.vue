<template>
    <div class="c-profile-wrapper">
        <div class="c-profile-wrapper-info m-flex-display">
            <div class="c-profile-image">
                <img v-if="user.image" :src="user.image" :title="user.name"/>
                <img v-else src="../../assets/Kajce.jpg">
            </div>
            <div class="c-profile-info">
                <span class="c-profile-info-name">{{ user.name }}</span><br>
                <span>Followers: {{ user.followers }}</span>
            </div>
        </div>
        <ul class="c-profile-links m-flex-display">
            <li>
                <nuxt-link class="c-cat-link" to=""><span>uploads</span></nuxt-link>
            </li>
            <li>
                <nuxt-link class="c-login-link" to=""><span>favorites</span></nuxt-link>
            </li>
        </ul>
        <div class="c-profile-playlist">
            <span>Your Uploads</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'account',
    computed: {
        user() {
            return this.$store.state.auth.user;
        }
    },
    asyncData({store, redirect}) {
        if (!store.state.auth.user) {
            return redirect('/registration');
        }
    }
}
</script>

<style lang="scss" scoped>
    .c-profile-image {
        padding: 120px 20px 0px 200px;
        img {
            height: 140px;
            border: 5px solid $primary-white;
        }  
    }
    .c-profile-info {
        padding-top: 185px;
    }
    .c-profile-info-name {
        font-size: 2rem;
        font-weight: 600;
    }
    .c-profile-playlist {
        font-size: 1.5rem;
        padding: 15px 200px;
    }
    .c-profile-wrapper-info {
        background: linear-gradient($primary-red 70%, transparent 30%) no-repeat;
        min-height: 270px;
    }
    .c-profile-wrapper {
        width: 60%;
        margin: 0 auto;
    }
    .c-profile-links {
        border-bottom: 1px solid $primary-border;
        padding: 5px 200px;
        li {
            padding-right: 10px;
            color: $primary-red;
        }
    }
</style>