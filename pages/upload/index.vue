<template>
    <div class="c-upload-wrapper">
        <h3 v-if="!user">How to Upload Your Favorite Playlist</h3>
         <form v-if="user">
            <h3>Upload your Playlist:</h3>
            <div class="c-upload-form">
                <form-inputs type="text" field="playlist" :required="true" v-model="playlist">
                    Playlist Link:
                </form-inputs>

                <form-inputs type="text" field="game" :required="true" v-model="game">
                    Game:
                </form-inputs>

                <form-inputs type="text" field="musicApp" :required="true" v-model="musicApp">
                    Music APP:
                </form-inputs>

                <form-inputs type="text" field="genre" :required="true" v-model="genre">
                    Genre:
                </form-inputs>

                <form-inputs type="text" field="twitch" :required="true" v-model="twitch">
                    Twitch:
                </form-inputs>

                <checkbox field="streamer" v-model="streamer">
                    Streamer:
                </checkbox>
            
                <div>
                    <commonButton text="AWESOME" />
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import FormInputs from '../../components/ui/FormInputs';
import commonButton from '../../components/commonButton'
import Checkbox from '../../components/ui/Checkbox'
export default {
    name: 'account',
    components: {
        FormInputs,
        commonButton,
        Checkbox
    },
    data() {
        return {
            playlist: '',
            game: '',
            musicApp: '',
            genre: '',
            streamer: '',
            twitch: ''
        } 
dock
    },
    computed: {
        user() {
            return this.$store.state.auth.user;
        }
    }
}
</script>

<style lang="scss" scoped>
    .c-upload-wrapper {
        width: 60%;
        margin: 0 auto;
    }
    .c-upload-form {
        margin-top: 20px;
    }
</style>