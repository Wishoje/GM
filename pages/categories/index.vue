<template>
	<main>
		<categoryBanner />
		<h3>Explore playlists by game</h3>
		<categories :isCategoryPage="true" :limit="20" :categoriesURL="'/api/categories/games'" />
		<h3>Explore playlists by platform</h3>
		<categories :isCategoryPage="true" :limit="5" :categoriesURL="'/api/categories/platform'" />
		<h3>Explore playlists by genre</h3>
		<categories :isCategoryPage="true" :limit="20" :categoriesURL="'/api/categories/genre'" />
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

<style>
	h3 {
		text-align: center;
    margin-top: 5rem;
	}
</style>