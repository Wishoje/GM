<template>
	<main>
		<categoryBanner />
		<div class="c-main-wrapper">
			<h2>Explore playlists by game</h2>
			<categories :isCategoryPage="true" :limit="20" :categoriesURL="'/api/categories/games'" />
			<h2>Explore playlists by platform</h2>
			<categories :isCategoryPage="true" :limit="5" :categoriesURL="'/api/categories/platform'" />
			<h2>Explore playlists by genre</h2>
			<categories :isCategoryPage="true" :limit="20" :categoriesURL="'/api/categories/genre'" />
		</div>
	</main>
</template>

<script>

import categories from '../../components/categories';
import categoryBanner from '../../components/categoryBanner';

export default {
	name: 'homePage',
	components: {
		categories,
		categoryBanner
	}
}
</script>

<style lang="scss" scoped>
	@media #{$mq-mobile} {
		.c-main-wrapper {
			padding: 0 10px;
		}
	}
</style>