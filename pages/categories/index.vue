<template>
	<main>
		<categories :isCategoryPage="true" :limit="20" />
	</main>
</template>

<script>

import categories from '../../components/categories';

export default {
	name: 'homePage',
	components: {
		categories
	}
}
</script>

<style>
</style>
