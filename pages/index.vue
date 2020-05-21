<template>
	<main>
		<banner/>
		<categories :categoriesURL="'/api/categories/games'" />
		<explore/>
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

<style>
</style>
