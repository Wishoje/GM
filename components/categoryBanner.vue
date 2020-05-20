<template>
	<article class="c-banner">
		<h2>Explore Our Musical World</h2>
		<h3>Find your favorite playlist</h3>

		<div class="c-search-box">
            <input class="c-search-text" placeholder='Search for game, platform or genre' onblur="this.placeholder='Search for game, platform or genre'" onfocus="this.placeholder=''">
		</div>
	</article>
</template>

<script>
	export default {
		name: 'categoryBanner'
	}
		
</script>

<style lang="scss" scoped>
	.c-banner {
		padding-top: 2.1rem;
		padding-bottom: 2.5rem;
		background-image: url('/images/banner.jpg');
		color: $primary-white;
		text-align: center;
    }
    
    .c-search-box {
        width: 40%;
        margin: 0 auto;
    }

    .c-search-text {
        background:white;
        border-radius: 0.2rem;
        color:black;
        padding: 1rem 0 1rem 2rem;
		width:70%;
	}

	input::placeholder {
		text-align: center;
	}

	input:focus {
		color: #ff0000;
		padding-left: 10rem;
		@media #{$mq-desktop-large} { 
			padding-left: 15rem;
		}
	}
	
</style>