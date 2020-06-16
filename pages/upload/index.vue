<template>
	<div>
		<div class="c-upload-wrapper m-flex-display">
			<div class="c-options c-upload-header">
                <div class="c-upload-join" v-if="!user">.
                    <h3>Upload</h3>
				    <h2>Join Our Gamers Community To Explore New Awesome Music While You Are Playing Your Favorite Game</h2>
                    <div class="c-upload-login">
                        <commonButton v-if="!$store.state.auth.user" @click.native="showModal({modalName: 'ModalLogin', modalType:'modalRegister'})" text="UPLOAD A PLAYLIST" />
                    </div>
                </div>
                <div v-else>
				    <h3>Upload Your Playlist From Your Favorite Music App</h3>
                </div>
			</div>
			<div class="c-upload-form" v-if="user">
				<form @submit.prevent="submitForm">
					<form-inputs type="text" field="playlist" :required="true" v-model="playlist">
						Playlist Link:
					</form-inputs>

					<div class="c-options">
						<multiselect v-model="game" tag-placeholder="Add this as a New Game" placeholder="Search For Your Favorite Games" label="name" track-by="id" :options="gameList" :multiple="true" :taggable="true" @tag="addGameTag"></multiselect>
					</div>

					<div class="c-options">
						<multiselect v-model="musicApp" :custom-label="addPlatformTag" placeholder="Search For Platform Name" label="name" track-by="id" :options="platformList"></multiselect>
					</div>

					<div class="c-options">
						<multiselect v-model="genre" tag-placeholder="Add This as a New Genre" placeholder="Search For Most Popular Genres on Your Playlist" label="name" track-by="id" :options="genreList" :multiple="true" :taggable="true" @tag="addGenreTag"></multiselect>
					</div>

					<form-inputs class="c-options" type="text" field="twitch" v-model="twitch">
						Twitch Account:
					</form-inputs>

					<form-inputs class="c-options" type="text" field="mixer"  v-model="mixer">
						Mixer Account:
					</form-inputs>

					<checkbox field="streamer" v-model="streamer">Streamer</checkbox>

					<div class="c-options">
						<commonButton buttonType="submit" class="c-button-modify" text="Upload" />
					</div>
                    <span class="error" v-if="error">{{ error }}</span>
				</form>
			</div>
			<div v-if="user" class="c-upload-how-to">
				<div class="c-upload-playlist-link">How To Find The Playlist Link From Your Favorite Music App:</div>
				<div v-for="platform in platformList" :key="platform.id">
					<commonButton @click.native="showModal({modalName:`${platform.name}`, modalType:`${platform.name}`})" class="c-upload-ul c-button-white" :text="`${platform.name}`"></commonButton>
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
			mixer: '',
            gameList: null,
            platformList: null,
            genreList: null,
            error: ''
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
		},
		async submitForm() {
            try {
                if (this.errorHandling()) {
                    const result = await this.$axios.post('/api/usersPosts', {
                        playlist: this.playlist,
                        game: this.game,
                        musicApp: this.musicApp,
                        genre: this.genre,
                        twitch: this.twitch,
                        mixer: this.mixer
                    });
                    this.resetForm();
                    this.showModal({modalName: 'Success', modalType:'Success'});
                }
            } catch(err) {
				throw new Error(err);
            }
        },
        errorHandling() {
            if (!this.playlist || !this.game || !this.musicApp || !this.genre) {
                this.error = 'Please Enter Your Playlist, Game, Music App and Genre';
                return false
            }
            return true
        },
        resetForm() {
            this.playlist = '',
            this.game = '',
            this.musicApp = '',
            this.genre = '',
            this.streamer = false,
			this.twitch = '',
            this.mixer = '',
            this.error = ''
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
            return error('Something went wrong please try again', e);
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
        background-color: $primary-black;
        color: $primary-white;
	}
    .c-button-white {
        color: $primary-white;
    }
	.c-upload-divider {
		padding: 20px 0;
		border-bottom: 1px solid $primary-border;
	}
    .c-upload-login {
        text-align: center;
        margin-top: 50px;
    }
    .c-upload-join {
        width: 65%;
        margin: 0 auto;
        line-height: 50px;
        h2 {
            line-height: 50px
        }
    }
    .error {
        color: $primary-red;
    }
    @media #{$mq-tablet} {
        .c-upload-wrapper {
            width: 90%;
        }
    }
     @media #{$mq-mobile} {
        .c-upload-wrapper {
            width: 95%;
            flex-direction: column;
            padding-top: 0;
        }
        .c-upload-form, .c-upload-how-to {
            width: 95%;
            margin: 0 auto;
        }
        .c-button-modify, .c-upload-ul {
            width: 100%;
	    }
        .c-upload-join {
            width: 90%;
            line-height: 40px;
            h2 {
                font-size: 20px;
            }
            
        }
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