<template>
  <article class="m-banner">
    <h2>Explore Playlists</h2>
    <h3>Combine and add more tags to show more playlists</h3>
    <div class="m-search-box">
      <input type="text" class="m-search-text" placeholder="Search for genre">
    </div>
	<section>
		<ul>
			<li v-for="genre in genres" :key="genre.id">
				<button :class="{'selected': categoryQueryName.includes(genre.name) }" @click="toggleGenre(genre.id, genre.name)">{{genre.name}}</button>
			</li>
		</ul>
	</section>
  </article>
</template>

<script>
export default {
	name: 'filterSearch',
	data() {
		return {
			genres: [],
			categoryQueryId: [],
            categoryQueryName: []
		};
	},
	mounted() {
		this.getCategories();
	},
	methods: {
		async getCategories() {
			try {
				const result = await this.$axios.$get('/api/categories/genre');
				return this.genres = result;
			} catch(error) {
				console.log('Error :', error);
			}
		},
		toggleGenre(id, name) {
            const genreID = id;
            const genreName = name;
            if (!this.categoryQueryId.includes(genreID) && !this.categoryQueryName.includes(genreName)) {
                this.categoryQueryId.push(genreID);
                this.categoryQueryName.push(genreName);
            } else {
                this.categoryQueryId = this.categoryQueryId.filter(item => item !== genreID);
                this.categoryQueryName = this.categoryQueryName.filter(item => item !== genreName);
            }
            this.$router.replace({query: {categoryId: this.categoryQueryId.slice(0), categoryName: this.categoryQueryName.slice(0)}});
        },
	},
	async asyncData({$axios, route, store, params, query, req, res, redirect, error}) {
        const util = require('util');
		console.log('STORE ' + util.inspect(route.query, false, null, true /* enable colors */));
    }
}
</script>

<style lang="scss" scoped>
	section {
		width: 50%;
		margin: auto;

		ul {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;

			li {
				margin: 0.4rem;

				button {
					padding: 0.2rem 1.1rem;
					border: solid $primary-white 2px;
					border-radius: 0.2rem;

					&.selected {
						border: solid chartreuse 2px;
						background-color: chartreuse;
						color: black;
					}

					&:focus {
						outline: none;
					}
				}
			}
		}
	}
</style>