<template>
	<article class="c-banner">
		<h2>Explore Our Musical World</h2>
		<h3>Find your favorite playlist</h3>

		<div class="c-search-box">
            <input class="c-search-text" placeholder="Search for game, platform or genre">
		</div>
	</article>
</template>

<script>
</script>

<style lang="scss" scoped>
	.c-banner {
		padding-top: 2.1rem;
		padding-bottom: 2.5rem;
		background-image: url('/images/banner.jpg');
		color: $primary-white;
		text-align: center;

    }
    
    .c-search-box{
        width: 40%;
        margin: 0 auto;
    }

    .c-search-box .c-search-text{
        background:white;
        border-radius: 0.2rem;
        color:black;
        padding:1.5rem 12.563rem;
        width:70%;
    }
</style>