<template>
    <div class="c-profile-playlist">
        <div class="c-profile-lists">
            <div class="m-font-size-m">Explore More Playlists <a class="m-error m-underline" href="/search">Here</a> </div>
            <div  v-if="userFavorites&& userFavorites.length > 0">
                <div class="c-profile-playlist-iframe c-profile-fav" v-for="iframe in getPlaylistIframe" :key="iframe.id">
                    <div class="c-profile-playlist-wrapper" v-html="iframe.playlist"></div> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Favorites',
    created() {
        this.getUserFavorites();
    },
    data() {
        return {
            userFavorites: null
        }
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