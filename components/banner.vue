<template>
	<article class="c-banner">
		<div class="c-banner-header">
			<h1>SHARE YOUR FAVORITE PLAYLISTS!</h1>
			<h3>Join The Gamers Community Where The Music Leads You To Another Level</h3>
		</div>
		<commonButton v-if="!$store.state.auth.user" @click.native="showModal({modalName: 'ModalLogin', modalType:'modalRegister'})" text="JOIN" />
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
		background-image: url(/images/bg1.jpg);
		color: #fff;
		text-align: center;
		padding: 70px 10px;
		min-height: 350px;
		background-repeat: no-repeat;
		background-size: cover;
		background-position-y: 22%;
	}
	c-heading {
		margin: 0;
		margin-top:0.4rem;
	}

	.c-banner-header {
		margin-bottom: 50px;
	}

	@media #{$mq-mobile} {
		.c-banner {
			background-position-x: 100%;
   	 		background-size: auto;
		}
	}
</style>