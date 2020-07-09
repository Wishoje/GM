<template>
	<div class="c-cookie-banner m-hidden" ref="cookieBanner" v-if="!cookie">
			<p>
					By using our website, you agree to our cookie policy.
			</p>
			<button class="c-close-banner" @click="allowCookies">&times;</button>
    </div>
</template>

<script>
export default {
	name: 'cookieBanner',
	data() {
		return {
			cookie: false,
			cookieBanner: false
		}
	},
	methods: {
		allowCookies() {
			// this.cookieBanner = this.$refs.cookieBanner;
			localStorage.setItem('cookieSeen','shown');
			this.cookieBanner.className = 'c-cookie-banner m-hidden';
		},
		cookieSeen() {
			console.log('this.cookieBanner: ', this.cookieBanner);
			if (localStorage.getItem('cookieSeen') === 'shown') {
				
				this.cookie = true;
			} else {
				this.cookieBanner.className = 'c-cookie-banner';
			}
		}
	},
	mounted() {
		this.cookieBanner = this.$refs.cookieBanner;
		this.cookieSeen();
	}
};
</script>
<style lang="scss" scoped>

.c-cookie-banner {
  position: fixed;
  bottom: 40px;
  left: 10%;
  right: 10%;
  width: 80%;
  padding: 2rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #eee;
  border-radius: 5px;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}

.c-close-banner {
	width: 28px;
	padding: 2px;
  background-color: $primary-red;
  border: none;
  color: $primary-white;
  border-radius: 2px;
  cursor: pointer;

	&:hover {
		color: $primary-black;
	}
}
</style>