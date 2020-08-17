<template>
    <div class="c-upload-carousel" id="c-carousel">
        <h2 v-if="!isMain" class="c-upload-featured c-upload-white">Check Out Our Featured List</h2>
        <h2 v-else class="c-upload-featured c-upload-white">Check Out Our Featured List</h2>
        <VueSlickCarousel v-bind="settings">
            <div class="c-carousel-wrapper">
                <iframe 
                    allow="autoplay *; encrypted-media *;"
                    frameborder="0"
                    height="400"
                    width="100%"
                    style="max-width:400px;overflow:hidden;background:transparent;"
                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/playlist/chill-house/pl.bd55c25265aa4de8b3fc3e0960751846?app=music">
                </iframe>
                <div class="c-upload-mid-space">
                    <span class="c-upload-orange">Uploaded by: </span> <span class="c-upload-white">GodMan</span><br>
                    <span class="c-upload-orange">Games: </span> <span class="c-upload-white">Dota 2, LoL</span>
                </div>
            </div>
            <div class="c-carousel-wrapper">
                <iframe
                    width="100%"
                    height="400"
                    src="https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG"
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen>
                </iframe>
                <div class="c-upload-mid-space">
                    <span class="c-upload-orange">Uploaded by: </span> <span class="c-upload-white">Crash</span><br>
                    <span class="c-upload-orange">Games: </span> <span class="c-upload-white">Starcraft</span>
                </div>
            </div>
            <div class="c-carousel-wrapper">
                <iframe id='AmazonMusicEmbedB088BK6ZG4' scrolling="no"
                    src='https://music.amazon.com/embed/B088BK6ZG4/?id=IbCYiN8K07&marketplaceId=ATVPDKIKX0DER&musicTerritory=US'
                    width='100%'
                    height='400px'
                    style='border:1px solid rgba(0, 0, 0, 0.12);max-width:400px;overflow-x:hidden;'>
                </iframe>
                <div class="c-upload-mid-space">
                    <span class="c-upload-orange">Uploaded by: </span> <span class="c-upload-white">BratMinli</span><br>
                    <span class="c-upload-orange">Games: </span> <span class="c-upload-white">CSGO</span>
                </div>
            </div>
            <div class="c-carousel-wrapper">
                <iframe
                    src="https://open.spotify.com/embed/playlist/0e7sxPYOixPoNOD3L37wbz"
                    width="100%"
                    height="400"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media">
                </iframe>
                <div class="c-upload-mid-space">
                    <span class="c-upload-orange">Uploaded by: </span> <span class="c-upload-white">Sususam</span><br>
                    <span class="c-upload-orange">Games: </span> <span class="c-upload-white">Poker</span>
                </div>
            </div>
            <div class="c-carousel-wrapper">
                <iframe 
                    width="100%"
                    height="400"
                    scrolling="no"
                    frameborder="no"
                    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/637658580&color=%23ff5500&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true">
                </iframe>
                <div class="c-upload-mid-space">
                    <span class="c-upload-orange">Uploaded by: </span> <span class="c-upload-white">Bombina</span><br>
                    <span class="c-upload-orange">Games: </span> <span class="c-upload-white">Dota 2</span>
                </div>
            </div>
             <div class="c-carousel-wrapper">
                <iframe
                    src="https://open.spotify.com/embed/playlist/34I0XfKpnMJtVsRZgr50JR"
                    width="100%"
                    height="400"
                    frameborder="0"
                    allowtransparency="true"
                    allow="encrypted-media">
                </iframe>
                <div class="c-upload-mid-space">
                    <span class="c-upload-orange">Uploaded by: </span> <span class="c-upload-white">Gangam</span><br>
                    <span class="c-upload-orange">Games: </span> <span class="c-upload-white">LOL, Fortnite</span>
                </div>
            </div>
        </VueSlickCarousel>
    </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';

export default {
    name: 'Carousel',
    head () {
		return {
			link: [
				{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css' },
				{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css' }
			]
		}
  	},
    components: {
        VueSlickCarousel
    },
    props: {
        isMain: {
            type: Boolean,
            required: false
        }
    },
    data() {
        return {
            settings: {
                dots: false,
                speed: 500,
                slidesToShow: 4,
                infinite: true,
                slidesToScroll: 4,
                touchThreshold: 5,
                focusOnSelect: true,
                arrows: true,
                initialSlide: 0,
                swipeToSlide: true,
                responsive: [{
                        breakpoint: 1279,
                        settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                                infinite: true,
                                dots: true
                        }
                        },
                        {
                        breakpoint: 1025,
                        settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                initialSlide: 2
                        }
                        },
                        {
                        breakpoint: 760,
                        settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                initialSlide: 1
                        }
                        }
                ]
            }
        }
    }
}
</script>

<style lang="scss" scoped>
	.c-upload-carousel {
		width: 80%;
		margin: 0 auto;
	}

	.c-upload-featured {
		text-align: center;
		padding: 80px 0 30px 0;
	}
	.c-upload-white {
        color: $primary-white;
    }
    .c-upload-orange {
        color: $primary-orange;
	}
	.c-upload-mid-space {
        font-size: 10px;
        padding-top: 10px
	}
	.c-carousel-wrapper {
        padding: 0 20px;
	}
</style>