<template>
	<div>
		<div class="c-upload-wrapper m-flex-display">
			<div class="c-options c-upload-header">
				<h3 v-if="!user">How to Upload Your Favorite Playlist</h3>
				<h3 v-else>Upload your Playlist From Your Favorite Music App</h3>
			</div>
			<div class="c-upload-form" v-if="user">
				<form>
					<form-inputs type="text" field="playlist" :required="true" v-model="playlist">
						Playlist Link:
					</form-inputs>

					<div class="c-options">
						<multiselect v-model="game" tag-placeholder="Add this as a New Game" placeholder="Search For Your Favorite Games Or Add " label="name" track-by="id" :options="gameList" :multiple="true" :taggable="true" @tag="addGameTag"></multiselect>
					</div>

					<div class="c-options">
						<multiselect v-model="musicApp" :custom-label="addPlatformTag" placeholder="Search For Platform Name Or Add" label="name" track-by="id" :options="platformList"></multiselect>
					</div>

					<div class="c-options">
						<multiselect v-model="genre" tag-placeholder="Add This as a New Genre" placeholder="Search For Most Popular Genres on Your Playlist Or Add" label="name" track-by="id" :options="genreList" :multiple="true" :taggable="true" @tag="addGenreTag"></multiselect>
					</div>

					<form-inputs class="c-options" type="text" field="twitch" v-model="twitch">
						Twitch Account:
					</form-inputs>

					<form-inputs class="c-options" type="text" field="mixer"  v-model="mixer">
						Mixer Account:
					</form-inputs>

					<checkbox field="streamer" v-model="streamer">Streamer</checkbox>

					<div class="c-options">
						<commonButton text="AWESOME" />
					</div>
				</form>
			</div>
			<div class="c-upload-how-to">
				<div class="c-upload-playlist-link">How To Find Playlist Link From Your Favorite Music App:</div>
				<div v-for="platform in platformList" :key="platform.id">
					<commonButton @click.native="showModal(`${platform.name}`)" class="c-upload-ul c-button-modify" :text="`${platform.name}`"></commonButton>
				</div>
			</div>
		</div>
		<div class="c-upload-divider"></div>
		<carousel/>
	</div>
</template>

<script>
import FormInputs from '../../components/ui/FormInputs';
import commonButton from '../../components/commonButton';
import Checkbox from '../../components/ui/Checkbox';
import Multiselect from 'vue-multiselect';
import VTooltip from 'v-tooltip';
import { mapMutations } from 'vuex';
import Carousel from '../../components/ui/Carousel';

export default {
    name: 'account',
    components: {
        FormInputs,
        commonButton,
        Checkbox,
		Multiselect,
		Carousel
    },
    head () {
		return {
			link: [
				{ rel: 'stylesheet', href: 'https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css' }
			]
		}
  	},
    data() {
        return {
            playlist: '',
            game: '',
            musicApp: '',
            genre: '',
            streamer: false,
            twitch: '',
            gameList: null,
            platformList: null,
            genreList: null,
			mixer: ''
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        ...mapMutations('modal', ['showModal']),
        addGameTag(newGameTag) {
            const gameTag = {
                name: newGameTag.name,
                id: newGameTag.id
            }
            this.gameList.push(gameTag)
            this.game.push(gameTag)
        },
        addPlatformTag(platform) {
            return `${platform.name}`;
        },
        addGenreTag(newGenreTag) {
            const genreTag = {
                name: newGenreTag.name,
                id: newGenreTag.id
            }
            this.genreList.push(genreTag)
            this.genre.push(genreTag)
        }
    },
    async asyncData({$axios, error}) {
        try {
            const [
                gameResult,
                platformResult,
                genreResult
            ] = await Promise.all([
                $axios.get('/api/categories/games'),
                $axios.get('/api/categories/platform'),
                $axios.get('/api/categories/genre')
            ]);

            return {
                gameList: gameResult.data || null,
                platformList: platformResult.data || null,
                genreList: genreResult.data || null
            }
        } catch (e) {
            return error('Something went wrong please try again');
        }
    },
}
</script>
<style lang="scss">
    .c-upload-wrapper {
        width: 60%;
        margin: 0 auto;
        padding-top: 20px;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .c-upload-form {
        margin: 20px 0;
        flex-grow: 1;
        width: 50%;
    }
    .c-options {
        margin: 20px 0;
    }
    .c-upload-how-to {
        margin: 80px 10px 10px;
        flex-grow: 1;
        text-align: center;
        width: 30%;
    }
    .c-upload-header {
        width: 100%;
    }
    .c-upload-playlist-link {
        padding-bottom: 20px;
    }
    .c-upload-ul {
        cursor: pointer;
        width: 300px;
        margin-bottom: 5px;
    }
    .c-button-modify {
        background-color: $primary-white;
        border: 1px solid $primary-border;
	}
	.c-upload-divider {
		padding: 20px 0;
		border-bottom: 1px solid $primary-border;
	}
</style>

<style lang="scss">
    .multiselect {
        .multiselect__tags {
            padding: 14px 17px 0 28px;
            border-radius: 0;
            min-height: 54px;
            border: 1px solid $primary-border;
        }
    }
</style>