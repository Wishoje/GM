<template>
    <div>
        <div>How to Upload Your Favorite Playlist</div>
         <form>
            <div>
                Upload your Playlist:
            </div>
            <div>
                <label for="playlist">Playlist:</label>
                <input id="playlist" name="playlist" type="text" />
            </div>

            <div>
                <label for="game">Favorite Game:</label>
                <select id="game" name="game"><!-- options --></select>
            </div>

            <div>
                <label for="musicApp">Music APP:</label>
                <select id="musicApp" name="musicApp"><!-- options --></select>
            </div>

            <div>
                <label for="genre">Genre:</label>
                <input id="genre" name="genre" type="text" />
            </div>
            
             <div>
                <input id="streamer" name="streamer" type="checkbox" />
                <label for="streamer">Streamer</label>
            </div>
            
            <div>
                <label for="twitch">Twitch:</label>
                <input id="twitch" name="twitch" type="text" />
            </div>

            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'account',
        computed: {
            user() {
                return this.$store.state.auth.user;
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>