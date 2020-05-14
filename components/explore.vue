<template>
    <article class="c-explore">
        <div class="top">YOUR FAVORITE <br> STREAMER'S PLAYLIST
        </div>

        <div class="box1">
            <h3>box 1</h3>
        </div>
        <div class="box2">
            <h3>box 2</h3>

        </div>
        <div class="box3">
            <h3>box 3</h3>

        </div>
        <div class="box4">
            <h3>box 4</h3>

        </div>
        <div class="box5">
            <h3>box 5</h3>

        </div>

    </article>
</template>

<script>
export default {
    name: 'explore'
}
</script>

<style scoped lang="scss">
    .c-explore {
        height: 430px;
        font-size:3rem;
        background-color: purple;
        color: $primary-white;
        text-align: center;
        display:flex;
        flex-direction:column;
        justify-content:center;
    }
</style>