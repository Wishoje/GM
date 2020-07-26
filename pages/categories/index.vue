<template>
	<transition appear appear-class="custom-appear-class" appear-to-class="animated-1 fadeIn">
		<main class="c-main-wrapper" :class="{'c-main-wrapper-show': !isLoading}">
			<categoryBanner />
			<div class="c-categories-mobile">
				<h2>Explore playlists by game</h2>
				<categories :isCategoryPage="true" :limit="20" :categoriesURL="'/api/categories/games'" />
				<h2>Explore playlists by platform</h2>
				<categories :isCategoryPage="true" :limit="5" :categoriesURL="'/api/categories/platform'" />
				<h2>Explore playlists by genre</h2>
				<categories :isCategoryPage="true" :limit="20" :categoriesURL="'/api/categories/genre'" />
			</div>
		</main>
	</transition>
</template>

<script>

import categories from '../../components/categories';
import categoryBanner from '../../components/categoryBanner';

export default {
	name: 'homePage',
	components: {
		categories,
		categoryBanner
	},
	data() {
        return {
            isLoading: true
        }
    },
	mounted() {
        this.$nextTick(() => {
			// Code that will run only after the entire view has been rendered
			setTimeout(() => {
				this.isLoading = false;
			}, 500);
        });
    }
}
</script>

<style lang="scss" scoped>
	.c-main-wrapper {
		opacity: 0;
	}
	.c-main-wrapper-show {
		opacity: 1;
	}
	@media #{$mq-mobile} {
		.c-categories-mobile {
			padding: 0 10px;
		}
	}
</style>