<template>
	<main class="c-main-wrapper" :class="{'c-main-wrapper-show': !isLoading}">
		<transition appear appear-class="custom-appear-class" appear-to-class="animated-1 fadeIn">
			<banner />
		</transition>
		<transition appear appear-class="custom-appear-class" appear-to-class="animated-1 fadeIn">
			<TwitchIndex />
		</transition>
		<transition appear appear-class="custom-appear-class" appear-to-class="animated-2 fadeIn">
			<categories class="c-main-mobile" :categoriesURL="'/api/categories/games'" />
		</transition>
		<!-- <explore/> -->
		<transition appear appear-class="custom-appear-class" appear-to-class="animated-1 fadeIn">
			<lovedLists />
		</transition>
	</main>
</template>

<script>
import banner from '../components/banner';
import explore from '../components/explore';
import categories from '../components/categories';
import lovedLists from '../components/lovedLists';
import TwitchIndex from '../components/TwitchIndex';

export default {
	name: 'homePage',
	components: {
		banner,
		explore,
		categories,
		lovedLists,
		TwitchIndex
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
    },
}
</script>

<style lang="scss" scoped>
	.c-main-wrapper {
		opacity: 0;
	}
	.c-main-wrapper-show {
		opacity: 1;
	}
	@media #{$mq-desktop} {
		.c-desktop {
			display: block;
		}
	}
	@media #{$mq-tablet} {
		.c-desktop {
			display: none
		}
	}
	@media #{$mq-mobile} {
		.c-main-mobile {
			padding: 0 10px;
		}
		.c-desktop {
			display: none
		}
	}
</style>
