<template>
    <div class="c-profile-wrapper">
        <div class="c-profile-wrapper-info m-flex-display">
            <div class="c-profile-image">
                <img v-if="user.image" :src="user.image" :title="user.name"/>
                <img v-else src="../../assets/9f812d4cf313e887ef99d8722229eee1.jpg">
            </div>
            <div class="c-profile-info">
                <span class="c-profile-info-name">{{ userName }}</span><br>
                <!-- <span>Followers: {{ user.followers }}</span> -->
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
        <div v-if="!isGuest" class="c-profile-links m-flex-display">
            <span class="c-profile-link-share">Share: </span>
            <ShareNetwork class="c-profile-share-wrapper"
                v-for="network in networks"
                :network="network.network"
                :key="network.network"
                :style="{backgroundColor: network.color}"
                :url="sharing.url"
                :title="sharing.title"
                :description="sharing.description"
                :quote="sharing.quote"
                :hashtags="sharing.hashtags"
                :twitterUser="sharing.twitterUser"
            >   
            <div class="c-profile-share-icons">
                <i :class="network.icon"></i>
                <span class="c-hide-mobile">{{ network.name }}</span>
            </div>
            </ShareNetwork>
        </div>
        <component :is="currentComponent" :isLoading="isLoading" :userPosts="userPosts"></component>
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
            isLoading: true,
            isGuest: false,
              sharing: {
                url: `https://www.gamersmusic.com${this.$route.path}`,
                title: 'Check out my favorite playlists on GamersMusic',
                hashtags: 'GamersMusic',
                twitterUser: 'Mile'
            },
            networks: [
                { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },
                { network: 'reddit', name: 'Reddit', icon: 'fab fah fa-lg fa-reddit-alien', color: '#ff4500' },
                { network: 'skype', name: 'Skype', icon: 'fab fah fa-lg fa-skype', color: '#00aff0' },
                { network: 'telegram', name: 'Telegram', icon: 'fab fah fa-lg fa-telegram-plane', color: '#0088cc' },
                { network: 'twitter', name: 'Twitter', icon: 'fab fah fa-lg fa-twitter', color: '#1da1f2' },
                { network: 'viber', name: 'Viber', icon: 'fab fah fa-lg fa-viber', color: '#59267c' },
                { network: 'vk', name: 'Vk', icon: 'fab fah fa-lg fa-vk', color: '#4a76a8' },
                { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', color: '#25d366' }
            ]
		};
    },
    mounted() {
        this.$nextTick(() => {
            // Code that will run only after the entire view has been rendered
            setTimeout(() => {
				this.isLoading = false;
            }, 500);
        });
    },
    computed: {
        user() {
            return this.$store.state.auth.user;
        },
        userName() {
            return this.userPosts && this.userPosts.length > 0 ? this.userPosts[0].userName : this.user.name;
        },
        isMobile() {
            return this.$device.isMobile;
        }
    },
    methods: {
        changeComponent(activeComp) {
            this.currentComponent = activeComp;
        }
    },
    async asyncData({$axios, store, redirect, error, route}) {
        try {
            const userIdParam = Number(route.params.id);
            if (!store.state.auth.user) {
                return redirect('/registration');
            }
            const result = await $axios.get('/api/usersPosts', { 
                params: { 
                    userId: userIdParam || store.state.auth.user.id
                    }
                }
            );
            return {
                userPosts: result.data,
                isGuest: userIdParam !== store.state.auth.user.id ? true : false
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
        padding: 10px 200px;
        align-items: center;
        display: flex;
        li {
            padding-right: 10px;
            color: $primary-red;
        }
    }
    .c-profile-icon {
        font-size: 24px;
        vertical-align: bottom;
    }
    .c-profile-share-icons {
        display: inline-flex;
        cursor: pointer;
        align-items: baseline;
        span {
            padding-left: 5px;
        }
    }
    .c-profile-share-wrapper {
        color: $primary-white;
        padding: 5px;
        margin-left: 10px;
        border-radius: 5px;
    }
    .c-profile-link-share {
        color: $primary-red;
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
        .c-profile-share-wrapper {
            font-size: 12px;
        }
        .c-hide-mobile {
            display: none;
        }
    }
</style>