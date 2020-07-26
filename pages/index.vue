<template>
	<main class="c-main-wrapper" :class="{'c-main-wrapper-show': !isLoading}">
		<transition appear appear-class="custom-appear-class" appear-to-class="animated-1 fadeIn">
			<banner />
		</transition>
		<transition appear appear-class="custom-appear-class" appear-to-class="animated-2 fadeInLeft">
			<categories :categoriesURL="'/api/categories/games'" />
		</transition>
		<!-- <explore/> -->
		<transition appear appear-class="custom-appear-class" appear-to-class="animated-3 fadeIn">
			<lovedLists />
		</transition>
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

<style lang="scss">
	.animated-1 {
		animation-duration: 1s;
		animation-fill-mode: both;
	}
	.animated-2 {
		animation-duration: 1.5s;
		animation-fill-mode: both;
	}
	.animated-3 {
		animation-duration: 3s;
		animation-fill-mode: both;
	}

	.fadeInLeft {
		animation-name: fadeInLeft;

		@keyframes fadeInLeft {
			from {
				opacity: 0;
				transform: translate3d(80vw,0,0) translateX(-100%);
			}

			to {
				opacity: 1;
				transform: none;
			}
		}
	}
	.fadeIn {
		animation-name: fadeIn;

		@keyframes fadeIn {
			from {
				opacity: 0;
			}

			to {
				opacity: 1;
			}
		}
	}
	.c-main-wrapper {
		opacity: 0;
	}
	.c-main-wrapper-show {
		opacity: 1;
	}
	@media #{$mq-mobile} {
		.c-main-wrapper {
			padding: 0 10px;
			display: none;
		}
	}
</style>
