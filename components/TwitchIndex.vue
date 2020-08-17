<template>
    <VueSlickCarousel class="c-twitch" v-bind="settings">
        <div>
            <div class="c-twitch-second">
                <div class="c-twitch-second-boxes color-1">
                    <article @click="showModal({modalName: 'ModalLogin', modalType:'modalRegister'})">
                        <img src="../assets/images/upload.svg" alt="Upload">
                        <h2>
                            Upload playlists from your favorite music platform
                        </h2>
                    </article>
                    <article class="c-twitch-article">
                        Share your music profile with other gamers,
                        search playlists by genre, platform or games and many more!
                        <button @click="showModal({modalName: 'ModalLogin', modalType:'modalRegister'})" type="button" class="c-twitch-button m-font-bold">
                            UPLOAD
                        </button>
                    </article>
                </div>
                <div class="c-twitch-second-boxes color-2">
                    <article @click="showModal({modalName: 'ModalLogin', modalType:'modalRegister'})">
                        <img src="../assets/images/connect.svg" alt="Connect">
                        <h2>
                            Connect with your fans by sharing your favorite playlist
                        </h2>
                        <article class="c-twitch-article">
                            Now you have the power to connect with your fans 
                            through the music you love!
                            <button @click="showModal({modalName: 'ModalLogin', modalType:'modalRegister'})" type="button" class="c-twitch-button-two m-font-bold">
                                STREAMER 
                            </button>
                        </article>
                    </article>
                </div>
            </div>
        </div>
        <div>
            <h2>Live Twitch Streamers</h2>
            <ul>
                <li v-for="item in twitchData" :key="item.id">
                    <img :src="item.profileImageUrl"/>
                    <div class="c-twitch-overlay">
                        <div class="c-twitch-overlay-text">
                            <span>{{ item.displayName }}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </VueSlickCarousel>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import { mapMutations } from 'vuex';

export default {
    name: 'TwitchIndex',
    head () {
		return {
			link: [
				{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css' },
				{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css' }
			]
		}
  	},
    data() {
        return {
            twitchData: null,
            settings: {
                dots: true,
                speed: 500,
                slidesToShow: 1,
                infinite: true,
                slidesToScroll: 1,
                touchThreshold: 5,
                focusOnSelect: true,
                arrows: false,
                initialSlide: 0,
                swipeToSlide: true,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 5000,
                cssEase: 'linear'
            }
        }
    },
    components: {
		VueSlickCarousel
    },
    created() {
        this.getTwitchData();
    },
    methods: {
        ...mapMutations('modal', ['showModal']),
        async getTwitchData() {
            try {
                const result = await this.$axios.get('/api/twitch');
                const resultData = result.data;
                this.twitchData = resultData.slice(0,18);
            } catch(error) {
                console.log('Error :', error);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .c-twitch {
        align-content: flex-start;
        width: 80%;
        margin: 0px auto 20px auto;
        display: flex;
        flex-wrap: wrap;
        .c-twitch-second {
            display: flex;
            border: none;
            justify-content: center;
            margin-top: 90px;
            .color-1 {
                background-color: $primary-white;
                color: $primary-red;
            }
            .color-2 {
                background-color: $primary-red;
                color: $primary-white;
            }
            .c-twitch-second-boxes {
                display: flex;
                flex-direction: column;
                width: 45%;
                align-items: center;
                border: 1px solid #ccc;
                padding: 80px;
                border-radius: 18px;
                box-shadow: 5px 5px 15px #999;
                transition: 0.5s ease;
                cursor: pointer;
                article {
                    text-align: center;
                    img {
                        margin: 0 auto;
                    }
                    .c-twitch-button {
                        display: block;
                        margin: 40px auto;
                        background-color: $primary-red;
                        color: $primary-white;
                        text-align: center;
                        padding: 0.7rem 5rem;
                        border-radius: 0.2rem;
                    }
                    .c-twitch-button-two {
                        background-color: $primary-white;
                        color: $primary-red;
                        text-align: center;
                        padding: 0.7rem 5rem;
                        border-radius: 0.2rem;
                        display: block;
                        margin: 40px auto;
                    }
                }
                .c-twitch-article {
                    padding: 45px;
                }
            }
            .c-twitch-second-boxes:hover {
                transform: scale(1.02);
                box-shadow: 5px 5px 15px #ccc;
            }
            .c-twitch-second-boxes + .c-twitch-second-boxes {
                margin-left: 3%;
            }
        }
        h2 {
            padding-bottom: 10px;
        }
        ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            li {
                position: relative;
				display: flex;
				margin: 10px;
                cursor: pointer;
                img {
                    width: 200px;
                    height: 200px;
                }
            }
            li:hover .c-twitch-overlay {
                opacity: 1;
            }
        }
    }
    .c-twitch-overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 200px;
        width: 200px;
        opacity: 0;
        transition: .5s ease;
        background-color: #008CBA;
    }
    .c-twitch-overlay-text {
        color: white;
        font-size: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        text-align: center;
    }

    @media #{$mq-mobile-portrait} {
		.c-twitch {
            width: 100%;
			ul {
				li {
					margin: 0.2rem 0;
                    img {
                        width: 120px;
                        height: 120px;
                    }
				}
			}
		}
        .c-twitch-overlay {
            width: 120px;
            height: 120px;
        }
	}
	
	@media #{$mq-desktop-large} {
		.c-twitch {
            width: 60%;
		}
	}
</style>
