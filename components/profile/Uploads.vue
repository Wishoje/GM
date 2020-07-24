<template>
    <div class="vld-parent c-profile-playlist">
        <spinner :isLoading="isLoading" />
        <div class="m-font-size-m">Add More Playlists <a class="m-error m-underline" href="/upload">Here</a></div>
        <div v-if="userPosts && userPosts.length > 0">
            <div class="c-profile-playlist-section" v-for="iframe in getPlaylistIframe" :key="iframe.id">
                <div class="c-profile-playlist-tags">
                    <div v-for="postDetail in iframe.postDetails" :key="postDetail.id"> 
                        #{{ postDetail.category_name }}&nbsp;&nbsp;
                    </div>
                </div>
                <div class="c-profile-playlist-iframe">
                    <div class="c-profile-playlist-wrapper" v-html="iframe.playlist"></div> 
                    <div class="c-profile-playlist-likes">
                        <img src="https://img.icons8.com/ios-filled/40/000000/like.png"/> <span class="c-profile-icon">{{ iframe.likes }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Spinner from '../../components/ui/Spinner';
export default {
    name: 'Uploads',
    data() {
        return {
			isLoading: true
        }
    },
    components: {
		Spinner
	},
    mounted() {
        this.$nextTick(() => {
            // Code that will run only after the entire view has been rendered
            setTimeout(() => {
				this.isLoading = false;
            }, 500);
        });
    },
    props: {
        userPosts: {
            type: null,
            required: true
        }
    },
    computed: {
        getPlaylistIframe() {
            return this.userPosts.map(userPost => {
                return {
                    playlist: userPost.playlist,
                    likes: userPost.likes,
                    postDetails: userPost.UserPostsCategories.map(userPostCategory => {
                        return {
                            category_name: userPostCategory.category_name
                        }
                    })
                }
            })
        }
    }
}
</script>
<style lang='scss' scoped>
    @import './assets/styles/profile.scss';
</style>