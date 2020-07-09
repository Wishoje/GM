<template>
    <div>
        <div>
            <h2>SoundCloud Share Playlist</h2>
        </div>
        <ol>
            <li>Select playlist you want to share</li>
            <li>Select Share</li>
            <li>Copy Playlist Link</li>
            <li>Paste it into our upload form</li>
        </ol>
        <img src="../../assets/images/soundCloud-1.png" alt="SoundCloud">
        <img src="../../assets/images/soundCloud-2.png" alt="SoundCloud">
    </div>
</template>

<script>
export default {
    name: 'SoundCloud'
}
</script>
<style scoped lang='scss'>
img {
    margin: 0 auto;
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