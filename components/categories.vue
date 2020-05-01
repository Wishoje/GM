<template>
	<article class="c-categories">
		<h2>MOST POPULAR <br />CATEGORIES</h2>
		<h3>Listen, share and connect your musical world.<br>
		Go explore the most popular tags.</h3>
		<section>
			<ul>
				<li v-for="category in computedLimit" :key="category.id" v-bind:style="{ 'background-image': `url('${category.image}')` }">
					<a href="#">{{ category.name }}</a>
				</li>
			</ul>
			<commonButton @click.native="limit = null" text="SEE MORE" v-if="limit" />
			<commonButton @click.native="limit = 10" text="SEE LESS" v-else />
		</section>
	</article>
</template>

<script>
	import commonButton from './commonButton';

	export default {
		name: 'categories',
		components: {
			commonButton
		},
		data() {
			return {
					categories: [],
					limit: 10
			};
		},
		mounted() {
			this.getCategories();
		},
		methods: {
			async getCategories() {
				try {
					const result = await this.$axios.$get('/api/categories');
					return this.categories = result
				} catch(error) {
					console.log('Error :', error);
				}
			}
		},
		computed: {
			computedLimit() {
				(() => {
					return this.categories = this.categories.sort( (a, b) => {
						return a.sort - b.sort;
					});
				})();
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
</style>