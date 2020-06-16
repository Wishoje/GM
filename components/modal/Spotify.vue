<template>
    <div>
        <div>
            <h3>Spotify Share Playlist</h3>
        </div>
        <ol>
            <li>Select playlist you want to share</li>
            <li>Select more (three dots)</li>
            <li>Share -> Copy Playlist Link</li>
            <li>Paste it into our upload form</li>
        </ol>
        <img src="../../assets/images/spotify.png" alt="Spotify">
    </div>
</template>

<script>
export default {
    name: 'Spotify'
}
</script>
<style scoped lang='scss'>
img {
    padding: 20px;
}
ol {
    list-style: none;
    counter-reset: li;
    padding: 20px;
}
li::before {
    content: counter(li);
    color: red;
    display: inline-block;
    width: 1em;
    margin-left: -1em
}
li {
    counter-increment: li
}
</style>