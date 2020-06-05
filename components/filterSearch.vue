<template>
  <article class="m-banner">
    <h2>Explore Playlists</h2>
    <h3>Combine and add more tags to show more playlists</h3>
    <div class="m-search-box">
      	<input type="text" class="m-search-text" placeholder="Search by Game Genre Platform">
    </div>
	<section>
		<ul>
			<li v-for="category in categories" :key="category.id">
				<button :class="{'selected': categoryQueryName.includes(category.name) }" @click="toggleCategory(category.id, category.name)">{{category.name}}</button>
			</li>
		</ul>
		{{ categoryQueryId }}
	</section>
  </article>
</template>

<script>
export default {
	name: 'filterSearch',
	props: {
		categoryQueryId: {
			type: Array,
			default: []
		},
		categoryQueryName: {
			type: Array,
			default: []
		},
		categories: {
			type: Array,
			default: []
		}
	},
	methods: {
		toggleCategory(id, name) {
            if (!this.categoryQueryId.includes(id) && !this.categoryQueryName.includes(name)) {
                this.categoryQueryId.push(id);
                this.categoryQueryName.push(name);
            } else {
                this.categoryQueryId = this.categoryQueryId.filter(item => item !== id);
                this.categoryQueryName = this.categoryQueryName.filter(item => item !== name);
            }
            this.$router.replace({query: {categoryId: this.categoryQueryId.slice(0), categoryName: this.categoryQueryName.slice(0)}});
        }
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