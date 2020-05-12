<template>
	<main>
		<categoryBanner />
		<categories :isCategoryPage="true" :limit="20" />
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
</style>
