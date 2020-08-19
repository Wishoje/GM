<template>
	<div class="c-cookie-banner c-hidden" ref="cookieBanner" v-if="!cookie">
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
			this.cookieBanner.className = 'c-cookie-banner c-hidden';
		},
		cookieSeen() {
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
	left: 35%;
	right: 35%;
	width: 30%;
	padding: 2rem 3rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #eee;
	opacity: 0.95;
}

.c-hidden {
	display: none;
}

.c-close-banner {
	padding: 3px 10px;
  	background-color: $primary-red;
  	border: none;
  	color: $primary-white;
  	border-radius: 2px;
  	cursor: pointer;

	&:hover {
		color: $primary-black;
	}
}

@media #{$mq-tablet} {
	.c-cookie-banner {
		left: 25%;
		right: 25%;
		width: 50%;
	}
}

@media #{$mq-mobile} {
	.c-cookie-banner {
		left: 5%;
		right: 5%;
		width: 90%;
	}
}
</style>