<template>
    <div>
        <div>
            <h3>AppleMusic Share Playlist</h3>
        </div>
        <ol>
            <li>Select playlist you want to share</li>
            <li>Select Share Icon (three dots)</li>
            <li>Copy Playlist Link</li>
            <li>Paste it into our upload form</li>
        </ol>
        <img src="../../assets/images/apple.png" width="90%" alt="appleMusic">
    </div>
</template>

<script>
export default {
    name: 'AppleMusic'
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