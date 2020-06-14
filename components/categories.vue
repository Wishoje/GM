<template>
	<article class="c-categories">
		<div v-if="!isCategoryPage">
			<h2>MOST POPULAR <br />CATEGORIES</h2>
			<h3>Listen, share and connect wtih the musical world. Go explore the most popular tags.</h3>
		</div>
		<section>
			<ul>
				<li v-for="category in computedLimit" :key="category.id" v-bind:style="{ 'background-image': `url('${category.image}')` }">
					<a :href="`/search?categoryId=${category.id}&categoryName=${category.name}`">{{ category.name }}</a>
				</li>
			</ul>
			<div v-if="!isCategoryPage">
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
		mounted() {
			this.getCategories();
		},
		methods: {
			async getCategories() {
				try {
					const result = await this.$axios.$get(this.categoriesURL);
					return this.categories = result;
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

		ul {
			align-content: flex-start;
			width: 80%;
			margin: 3rem auto;
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
					font-size: 1.8rem;
					color: $primary-white;
					&:hover {
						background-color: rgba($color: $primary-black, $alpha: 0.8);
						color: $primary-red;
					}
				}
			}
		}

		section {
			margin-bottom: 3rem;
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
