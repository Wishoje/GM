<template>
    <div class="vld-parent c-profile-playlist">
        <spinner :isLoading="isLoading" />
        <div class="c-profile-lists">
            <div class="m-font-size-m">Explore More Playlists <a class="m-error m-underline" href="/search?categoryId=2&categoryName=Dota%202">Here</a> </div>
            <div  v-if="userFavorites&& userFavorites.length > 0">
                <div class="c-profile-playlist-iframe c-profile-fav" v-for="iframe in getPlaylistIframe" :key="iframe.id">
                    <div class="c-profile-playlist-wrapper" v-html="iframe.playlist"></div> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Spinner from '../../components/ui/Spinner';

export default {
    name: 'Favorites',
    components: {
		Spinner
    },
    data() {
        return {
            userFavorites: null,
            isLoading: true
        }
    },
    created() {
        this.getUserFavorites();
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
        getPlaylistIframe() {
            if (this.userFavorites.length > 0) {
                return this.userFavorites.map(userFavorite => {
                    return {
                        playlistId: userFavorite.id,
                        playlist: userFavorite.playlist
                    }
                })
            }
        }
    },
    methods: {
        async getUserFavorites() {
            try {
				const result = await this.$axios.get('/api/usersPosts/favorites');
                this.userFavorites = result.data;
            } catch(error) {
                console.log('Error :', error);
            }
        }
    }
}
</script>
<style lang='scss' scoped>
    @import './assets/styles/profile.scss';
</style>