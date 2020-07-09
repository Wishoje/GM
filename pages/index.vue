<template>
	<main>
		<banner/>
		<categories class="c-main-wrapper" :categoriesURL="'/api/categories/games'" />
		<!-- <explore/> -->
		<lovedLists/>
	</main>
</template>

<script>

import banner from '../components/banner';
import explore from '../components/explore';
import categories from '../components/categories';
import lovedLists from '../components/lovedLists';

export default {
	name: 'homePage',
	components: {
		banner,
		explore,
		categories,
		lovedLists
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
