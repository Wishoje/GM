<template>
	<article class="c-categories">
		<h2>MOST POPULAR <br />CATEGORIES</h2>
		<h3>Listen, share and connect your musical world.<br>
		Go explore the most popular tags.</h3>
		<section>
			<ul>
				<li v-for="category in computedLimit" :key="category.id">
					<a href="#">{{ category.name }}</a>
				</li>
			</ul>
			<commonButton @click.native="limit = null" class="c-button" text="SEE MORE" v-if="limit" />
			<commonButton @click.native="limit = 10" class="c-button" text="SEE LESS" v-else />
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
						console.log('result :', result);
						return this.categories = result
				} catch(error) {
					console.log('Error :', error);
				}
			}
		},
		computed: {
			computedLimit() {
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
					background-color: darkslategrey;
					color: $primary-white;
					&:hover {
						background-color: rgba($color: $primary-black, $alpha: 0.9);
						color: $primary-red;
					}
				}
			}
		}

		.c-button {
			margin-bottom: 3rem;
		}
	}
</style>