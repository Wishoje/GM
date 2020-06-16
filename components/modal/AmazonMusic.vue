<template>
    <div>
        <div>
            <h3>AmazonMusic Share Playlist</h3>
        </div>
        <ol>
            <li>Select playlist you want to share</li>
            <li>Select Share Icon</li>
            <li>Copy Playlist Link</li>
            <li>Paste it into our upload form</li>
        </ol>
        <img src="../../assets/images/amazon.png" alt="amazonMusic">
        <img src="../../assets/images/amazon-2.png" alt="amazonMusic">
    </div>
</template>

<script>
export default {
    name: 'AmazonMusic'
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