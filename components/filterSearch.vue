<template>
  <article>
	<div class="m-banner c-banner">
		<h1>Explore Playlists</h1>
		<h2>Combine and add more tags to show more playlists</h2>
		<div class="m-search-box">
			<input type="text" id="searchQuery" class="m-search-text" v-model="searchQuery" @keyup="searchFilter()" placeholder="Search by Game Genre Platform">
		</div>
		<section>
			<ul>
				<li v-for="category in categoriesToRender" :key="category.id">
					<button :class="{'selected': categoryQueryName.includes(category.name) }" @click="toggleCategory(category.id, category.name)">{{category.name}}</button>
				</li>
			</ul>
		</section>
	</div>
	<div class="vld-parent">
		<div class="c-profile-playlist">
			<spinner :isLoading="isLoading" />
			<div v-if="!isLoading">
				<div class="c-no-results" v-if="!categoriesPosts || categoriesPosts.length == 0">
					<div>No Results</div>
				</div>
				<div class="c-profile-lists" v-else>
					<div class="c-profile-playlist-iframe" v-for="iframe in getPlaylistIframe" :key="iframe.id">
						<div class="c-profile-playlist-wrapper" v-html="iframe.playlist"></div> 
						<div class="c-profile-playlist-likes">
							<div>
								<span class="c-profile-playlist-user">Uploaded By:</span><span @click="checkProfile(iframe.userId)" class="c-profile-name m-cursor-pointer"> {{ iframe.userName }}</span>
							</div>
							<div @click="submitLike(iframe.playlistId)" class="c-profile-playlist-icon">
								<img :src="likeImage"/> <span class="c-profile-icon">{{ iframe.likes }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>
	</div>
  </article>
</template>

<script>
import { mapMutations } from 'vuex';
import Spinner from '../components/ui/Spinner';


export default {
	name: 'filterSearch',
	data() {
        return {
            categoryQueryId: [],
			categoryQueryName: [],
			categoriesPosts: null,
			searchQuery: '',
			categoriesToRender: [],
			likedPosts: [],
			likeImage: 'https://img.icons8.com/ios-filled/40/000000/like.png',
			isLoading: false
        }
	},
	components: {
		Spinner
	},
    created() {
		this.getAllCategoriesFromProps();
        if (this.$route.query.categoryId && this.$route.query.categoryName) {
            this.categoryQueryId.push(parseInt(this.$route.query.categoryId));
            this.categoryQueryName.push(this.$route.query.categoryName);
        }
    },
	props: {
		allCategories: {
			type: Array,
			default: []
		}
	},
	computed: {
        getPlaylistIframe() {
            return this.categoriesPosts.map(categoryPost => {
                return {
					playlistId: categoryPost.id,
                    playlist: categoryPost.playlist,
					likes: categoryPost.likes,
					userName: categoryPost.userName,
					userId: categoryPost.userId
                }
            })
		},
		user() { 
			return this.$store.state.auth.user;
		}
    },
	mounted() {
		this.getSelectedCategories();
		if (this.user) {
			this.getAlreadyLikedPlaylists();
		}
	},
	methods: {
		...mapMutations('modal', ['showModal']),
		searchFilter() {
			if (this.searchQuery.length > 1) {
				const result = this.allCategories.filter( category => {
					if (category.name.toLowerCase().includes(this.searchQuery.trim().toLowerCase())) {
						return category
					}
				});
				this.categoriesToRender = result;
			} else {
				this.getAllCategoriesFromProps();
			}
		},
		getAllCategoriesFromProps() {
			this.categoriesToRender = this.allCategories;
		},
		async toggleCategory(id, name) {
			try {
				if (!this.categoryQueryId.includes(id) && !this.categoryQueryName.includes(name)) {
					this.categoryQueryId.push(id);
					this.categoryQueryName.push(name);
				} else {
					this.categoryQueryId = this.categoryQueryId.filter(item => item !== id);
					this.categoryQueryName = this.categoryQueryName.filter(item => item !== name);
				}
				this.$router.replace({query: {categoryId: this.categoryQueryId.slice(0), categoryName: this.categoryQueryName.slice(0)}});
				this.getSelectedCategories();
			} catch(error) {
				console.log('Error :', error);
			}
		},
		async getSelectedCategories() {
			try {
				this.isLoading = true;
				const result = await this.$axios.get('/api/usersPosts/categories', { 
					params: { 
						categoriesData: this.categoryQueryId 
						}
					}
				);
				if (result && result.data) {
					this.categoriesPosts = result.data;
					setTimeout(() => {
						this.isLoading = false;
                	}, 500);
				}
			} catch(error) {
				console.log('Error :', error);
			}
		},
		async getAlreadyLikedPlaylists() {
			try {
				const result = await this.$axios.get('/api/usersPosts/liked');
				this.likedPosts = result.data;
			} catch(error) {
				console.log('Error :', error);
			}
		},
		async likePlaylist(id) {
			try {
				const foundPost = this.likedPosts.filter(likedPost => likedPost.userpost.id === id);
				if (foundPost && foundPost.length > 0) {
					this.showModal({modalName: 'LikedAlreadyPost', modalType:'LikedAlreadyPost'});
				} else {
					const result = await this.$axios.post('/api/usersPosts/like', { playlistId: id });
					this.getSelectedCategories(); // nonon
					this.getAlreadyLikedPlaylists();
				}
			} catch(error) {
				console.log('Error :', error);
			}
		},
		submitLike(id) {
			this.user ? this.likePlaylist(id) : this.showModal({modalName: 'ModalLogin', modalType:'modalRegister'});
		},
		checkProfile(id) {
			this.user ? this.$router.push(`/account/${id}`) : this.showModal({modalName: 'ModalLogin', modalType:'modalRegister'});
		} 
	}
}
</script>

<style lang="scss" scoped>
	.c-banner {
		padding: 30px 0;
	}
	.c-profile-playlist {
        font-size: 1.5rem;
		padding: 30px 0;
		width: 60%;
		margin: 0 auto;
		min-height: 50vh;
    }
	section {
		width: 65%;
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
	.c-profile-playlist-iframe {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		width: 50%;
		margin-bottom: 30px;
		padding: 40px;
    }
	.c-profile-playlist-likes {
        img {
            display: inline;
        }
		display: flex;
		flex-direction: row;
		justify-content: space-between;
    }
	.c-profile-playlist-user {
		color: $primary-red;
		font-size: 16px;
	}
	.c-profile-name {
		font-size: 18px;
	}
	.c-profile-playlist-icon {
		cursor: pointer;
		img {
			width: 50%;
		}
	}
	.c-profile-lists {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.c-profile-icon {
		font-size: 19px;
	}
	.c-no-results {
		text-align: center;
	}

	@media #{$mq-tablet} {
		.c-profile-playlist-iframe, .c-profile-playlist {
            width: 100%;
		}
		.c-banner {
			.m-search-box {
				width: 50%;
				input {
					width: 100%;
				}
			}
		}
		.c-profile-wrapper {
            width: 100%;
        }
	}

	@media #{$mq-mobile} {
        .c-profile-playlist-iframe, .c-profile-playlist {
            width: 100%;
		}
		.c-banner {
			.m-search-box {
				width: 60%;
				input {
					width: 100%;
				}
			}
		}
    }

	@media #{$mq-mobile-portrait} {
		.c-banner {
			.m-search-box {
				width: 80%;
				input {
					width: 100%;
				}
			}
			section {
				width: 95%;
			}
		}
	}
</style>