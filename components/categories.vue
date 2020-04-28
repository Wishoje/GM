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
			<commonButton @click.native="limit = null" class="button" text="SEE MORE" v-if="limit" />
			<commonButton @click.native="limit = 10" class="button" text="SEE LESS" v-else />
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
			this.getCategories()
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
				return this.limit ? this.categories.slice(0, this.limit) : this.categories
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
				width: 15rem;
				margin: 1rem;
				height: 11rem;
				background-color: darkslategrey;

				a {
					position: relative;
    			text-align: center;
					top: 4.5rem;
					color: white;
				}
			}
		}

		.button {
			margin-bottom: 3rem;
		}
	}
</style>