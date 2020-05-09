<template>
	<article class="c-banner">
		<h2>SHARE YOUR <br />FAVORITE PLAYLISTS!</h2>
		<h3>Join the gamers community where the music<br>
		lead you to the another level.</h3>
		<commonButton @click.native="showModal('ModalLogin')" text="JOIN" />
	</article>
</template>

<script>
	import { mapMutations } from 'vuex';
	import commonButton from './commonButton';

	export default {
		name: 'banner',
		components: {
			commonButton
		},
		methods: {
			...mapMutations('modal', ['showModal']),
		},
		data() {
			return {
					categories: [],
					limit: 10
			};
		},
	}
</script>

<style lang="scss" scoped>
	.c-banner {
		height: 670px;
		background-image: url('/images/banner.jpg');
		color: $primary-white;
		text-align: center;

		h3 {
			margin-bottom: 3rem;
		}
	}
</style>