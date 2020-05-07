<template>
	<main>
		<AppModal />
		<banner/>
		<categories/>
		<explore/>
		<lovedLists/>
	</main>
</template>

<script>

import banner from '../components/banner';
import explore from '../components/explore';
import categories from '../components/categories';
import lovedLists from '../components/lovedLists';
import AppModal from '../components/AppModal';

export default {
	name: 'homePage',
	components: {
		banner,
		explore,
		categories,
		lovedLists,
		AppModal
	}
}
</script>

<style>
</style>
