<template>
	<article class="c-banner">
		<div class="c-banner-header">
			<h1>SHARE YOUR FAVORITE PLAYLISTS!</h1>
			<h3>Join The Gamers Community Where The Music Leads You To Another Level</h3>
		</div>
		<div class="c-button-wrapper">
			<commonButton v-if="!$store.state.auth.user" @click.native="showModal({modalName: 'ModalLogin', modalType:'modalRegister'})" text="JOIN" />
		</div>
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
		}
	}
	
</script>

<style lang="scss" scoped>
	.c-banner {
		display: flex;
		justify-content: center;
		flex-direction: column;
		background-image: url(/images/bg2.jpg);
		color: #fff;
		min-height: 350px;
		background-repeat: no-repeat;
		background-size: cover;
		background-position-y: 74%;
	}
	.c-banner-header {
		margin-bottom: 30px;
	}
	.c-button-wrapper {
		margin: 0 auto;
	}
	@media #{$mq-mobile} {
		.c-banner {
   	 		background-size: auto;
		}
	}
</style>