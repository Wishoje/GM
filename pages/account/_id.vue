<template>
    <div class="c-profile-wrapper">
        aaa {{ id }}
        <div class="c-profile-wrapper-info m-flex-display">
            <div class="c-profile-image">
                <img v-if="user.image" :src="user.image" :title="user.name"/>
                <img v-else src="../../assets/9f812d4cf313e887ef99d8722229eee1.jpg">
            </div>
            <div class="c-profile-info">
                <span class="c-profile-info-name">{{ user.name }}</span><br>
                <span>Followers: {{ user.followers }}</span>
            </div>
        </div>
        <ul class="c-profile-links m-flex-display">
            <li>
                <nuxt-link class="c-cat-link" to="">
                    <span :class="{'m-underline': currentComponent === 'Uploads'}" @click="changeComponent('Uploads')">Uploads</span>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link class="c-login-link" to="">
                    <span :class="{'m-underline': currentComponent === 'Favorites' }" @click="changeComponent('Favorites')">Favorites</span>
                </nuxt-link>
            </li>
        </ul>
        <component :is="currentComponent" :userPosts="userPosts"></component>
    </div>
</template>

<script>
import Uploads from '../../components/profile/Uploads';
import Favorites from '../../components/profile/Favorites';

export default {
    name: 'account',
    components: {
        Uploads,
        Favorites
    },
    data() {
		return {
            userPosts: null,
            currentComponent: 'Uploads',
            id: this.$route.params.id
		};
    },
    computed: {
        user() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        changeComponent(activeComp) {
            this.currentComponent = activeComp;
        }
    },
    async asyncData({$axios, store, redirect, error}) {
        try {
            if (!store.state.auth.user) {
                return redirect('/registration');
            }
            const result = await $axios.get('/api/usersPosts');

            return {
                userPosts: result.data
            }
        } catch(error) {
            console.log({ statusCode: 404, message: 'Page Not Found!' })
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
    .c-profile-wrapper-info {
        background: linear-gradient($primary-red 70%, transparent 30%) no-repeat;
        min-height: 270px;
    }
    .c-profile-wrapper {
        width: 70%;
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
    .c-profile-icon {
        font-size: 24px;
        vertical-align: bottom;
    }

    @media #{$mq-tablet} {
        .c-profile-wrapper {
            width: 100%;
        }
    }

    @media #{$mq-mobile} {
        .c-profile-wrapper {
            width: 100%;
            flex-direction: column;
            display: flex;
            flex-wrap: wrap;
        }
        .c-profile-playlist {
            padding: 0;
            width: 90%;
            margin: 0 auto;
        }
        .c-profile-wrapper-info {
            background: linear-gradient($primary-red 50%, transparent 50%) no-repeat;
            min-height: 200px;
        }
        .c-profile-image {
            padding: 0;
            margin-top: 70px;
            margin-left: 20px;
            flex-shrink: 0;
            img {
                height: 100px;
                border: 2px solid $primary-white;
            }  
        }
        .c-profile-info {
            padding: 100px 20px 0 5px;
        }
        .c-profile-links {
            padding: 5px 20px;
        }
        .c-profile-playlist-wrapper {
            width: 100%;
        }
    }
</style>