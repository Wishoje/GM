<template>
<div class="c-appModal">
	<transition
		name="custom-classes-transition"
		enter-active-class="animated fadeIn"
		leave-active-class="animated fadeOut"
	>
		<div v-if="visible" class="c-appModal__overlay"/>
	</transition>
	<transition
		name="custom-classes-transition"
		enter-active-class="animated fadeInUp"
		leave-active-class="animated fadeOutDown"
	>
		<div v-if="visible" class="c-appModal__content" @click.self="hideModal">
			<div class="c-appModal__innerContent">
				<div class="c-appModal__closeModal" @click="hideModal" role="button" aria-label="Close Modal" tabindex="0">
					<span></span>
					<span></span>
				</div>
				<component :is="component" :modalTypeProps="type"/>
			</div>
		</div>
	</transition>
</div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapMutations } from 'vuex';

export default {
	name: `AppModal`,
	data() {
		return {
			component: null,
			type: null
		};
	},
	props: {
		modalTypeProps: {
			type: String
		}
	},
	computed: {
		...mapState('modal', {
			visible: `modalVisible`,
			modalComponent: `modalComponent`,
			modalType: `modalType`
		})
	},
	watch: {
		modalComponent(componentName) {
			if (!componentName) return;
			Vue.component(componentName, () => import(`./modal/${componentName}`));
			this.component = componentName;
		},
		modalType(type) {
			this.type = type;
		}

	},
	mounted() {
		const escapeHandler = (e) => {
			if (e.key === `Escape` && this.visible) {
				this.hideModal();
			}
		};

		document.addEventListener(`keydown`, escapeHandler);
		this.$once(`hook:destroyed`, () => {
			document.removeEventListener(`keydown`, escapeHandler);
		});
	},
	methods: {
		...mapMutations('modal', [`hideModal`]),
	},
};
</script>

<style lang="scss">
	.c-appModal {
		&__overlay {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 900;
			background: rgba(#222, 0.8);
		}

		&__content {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 901;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		&__innerContent {
			padding: 2em;
			background: #fff;
		}

		&__closeModal {
			width: 30px;
			height: 30px;
			margin-left: auto;

			span {
				width: 30px;
				height: 5px;
				display: block;
				position: absolute;
				background-color: #777;
				border-radius: 2px;
			}

			span:first-child {
				transform: rotate(45deg) translate(10px, 10px);
			}

			span:last-child {
				transform: rotate(-45deg) translate(-10px, 10px);
			}

			&:hover {
				span {
					background-color: #ddd;
				}
			}
		}
	}

	.animated {
		animation-duration: 0.3s;
		animation-fill-mode: both;
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

	.fadeOut {
		animation-name: fadeOut;

		@keyframes fadeOut {
			from {
				opacity: 1;
			}

			to {
				opacity: 0;
			}
		}
	}

	.fadeInUp {
		animation-name: fadeInUp;

		@keyframes fadeInUp {
			from {
				opacity: 0;
				transform: translate3d(0, 100%, 0);
			}

			to {
				opacity: 1;
				transform: none;
			}
		}
	}

	.fadeOutDown {
		animation-name: fadeOutDown;

		@keyframes fadeOutDown {
			from {
				opacity: 1;
			}

			to {
				opacity: 0;
				transform: translate3d(0, 100%, 0);
			}
		}
	}
</style>
