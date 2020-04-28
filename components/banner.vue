<template>
	<section class="c-banner">
		<h2>SHARE YOUR <br />FAVORITE PLAYLISTS!</h2>
		<h3>Join the gamers community where the music<br>
		lead you to the another level.</h3>
		<commonButton text="JOIN" />
	</section>
</template>

<script>
import commonButton from './commonButton';


export default {
	name: 'banner',
	components: {
		commonButton
	}
}
</script>

<style lang="scss" scoped>
	.c-banner {
		height: 670px;
		background-image: url('../assets/images/banner.jpg');
		color: $primary-white;
		text-align: center;

		h2 {
			font-size: 4rem;
			line-height: 4.2rem;
			padding-top: 12.5rem;
			font-weight: 500;
		}

		h3 {
			font-size: 1.5rem;
			padding-top: 2.25rem;
			font-weight: bold;
		}
	}
</style>