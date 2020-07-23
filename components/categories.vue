<template>
	<article class="c-categories">
		<div v-if="!isCategoryPage">
			<h2>MOST POPULAR CATEGORIES</h2>
			<h3>Listen, share and connect with the musical world. Go explore the most popular tags.</h3>
		</div>
		<section>
			<ul>
				<li v-for="category in computedLimit" :key="category.id" v-bind:style="{ 'background-image': `url('${category.image}')`, 'background-size': 'cover' }">
					<a :href="`/search?categoryId=${category.id}&categoryName=${category.name}`">{{ category.name }}</a>
				</li>
			</ul>
			<div class="c-button-wrapper" v-if="!isCategoryPage">
				<commonButton @click.native="limit = null" text="SEE MORE" v-if="limit" />
				<commonButton @click.native="limit = 10" text="SEE LESS" v-else />
			</div>
		</section>
	</article>
</template>

<script>
	import commonButton from './commonButton';

	/**
	 * Categories component
	 * @param {boolean} isCategoryPage - Set to true for category page to show titles and show more/less button.
	 * @param {string} categoriesURL - Api url endpoint to get different categories (games, genre, platform).
	 * @param {number} limit - Show specific number of categories.
	 */
	export default {
		name: 'categories',
		components: {
			commonButton
		},
		props: {
			isCategoryPage: {
				type: Boolean,
				default: false
			},
			categoriesURL: {
				type: String,
				default: ''
			},
			limit: {
				type: Number,
				default: 10
			}
		},
		data() {
			return {
				categories: []
			};
		},
		created() {
			this.getCategories();
		},
		methods: {
			async getCategories() {
				try {
					this.categories = await this.$axios.$get(this.categoriesURL);
				} catch(error) {
					console.log('Error :', error);
				}
			}
		},
		computed: {
			computedLimit() {
				this.categories = this.categories.sort( (a, b) => {
					return a.sort - b.sort;
				});
				return this.limit ? this.categories.slice(0, this.limit) : this.categories;
			}
		}
	}
</script>

<style scoped lang="scss">
	.c-categories {
		text-align: center;

		.c-button-wrapper {
			margin-top: 50px;
		}

		ul {
			align-content: flex-start;
			width: 80%;
			margin: 50px auto 0 auto;
			justify-content: center;
			display: flex;
			flex-wrap: wrap;

			li {
				display: flex;
				width: 15rem;
				margin: 1rem;
				height: 11rem;

				a {
					width: 100%;
					height: 100%;
					line-height: 10.5rem;
					font-size: 24px;
					color: $primary-white;
					&:hover {
						background-color: rgba($color: $primary-black, $alpha: 0.8);
						color: $primary-red;
					}
				}
			}
		}
	}

	@media #{$mq-mobile-portrait} {
		.c-categories {
			ul {
				width: 100%;

				li {
					width: 100%;
					margin: 0.2rem 0;
					height: 5rem;

					a {
						line-height: 5rem;
					}
				}
			}
		}
	}
	
	@media #{$mq-desktop-large} {
		.c-categories {
			ul {
				width: 60%;
			}
		}
	}
	
</style>
