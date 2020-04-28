<template>
	<article class="c-banner">
		<h2>SHARE YOUR <br />FAVORITE PLAYLISTS!</h2>
		<h3>Join the gamers community where the music<br>
		lead you to the another level.</h3>
		<commonButton text="JOIN" />
	</article>
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
		color: white;
		text-align: center;

		h3 {
			margin-bottom: 3rem;
		}
	}
</style>