<template>
    <div>
        <div>
            <h3>YouTube Share Playlist</h3>
        </div>
        <ol>
            <li>Select playlist you want to share</li>
            <li>Select right arrow</li>
            <li>Copy Playlist Link</li>
            <li>Paste it into our upload form</li>
        </ol>
        <img width="80%" src="../../assets/images/yt.png" alt="youtube">
        <img src="../../assets/images/yt-2.png" alt="youtube">
    </div>
</template>

<script>
export default {
    name: 'Youtube'
}
</script>
<style scoped lang='scss'>
img {
    margin: 20px auto;
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