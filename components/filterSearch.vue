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
            const categoryID = id;
            const categoryName = name;
            if (!this.categoryQueryId.includes(categoryID) && !this.categoryQueryName.includes(categoryName)) {
                this.categoryQueryId.push(categoryID);
                this.categoryQueryName.push(categoryName);
            } else {
                this.categoryQueryId = this.categoryQueryId.filter(item => item !== categoryID);
                this.categoryQueryName = this.categoryQueryName.filter(item => item !== categoryName);
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