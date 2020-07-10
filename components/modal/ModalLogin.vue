<template>
	<div>
		<div class="c-modalRegister" v-if="modalTypeProps === 'modalRegister'">
			<form @submit.prevent>
				<h2>Create Account</h2>
				<div>
					<label for="name">Nickname</label>
					<input class="m-rounded" v-model="name" id="name" type="text"	placeholder="Name" required>
				</div>
				<div>
					<label for="email">Email</label>
					<input class="m-rounded" v-model="email" id="email" type="text"	placeholder="Email" required>
				</div>
				<div>
					<label for="password">Password</label>
					<input class="m-rounded" v-model="password" id="password" type="password" placeholder="******" required>
				</div>
				<div class="error" v-if="error">{{ error }}</div>
				<div>
					<div>
						<button class="c-modalLogin__login m-rounded" @click="errorHandling('register')">
							Create Account
						</button>
						<div id="c-customGoogleBtn"
							class="customGPlusSignIn m-rounded"
							v-if="googleReady"
							@click="googleSubmit"
							:loading="googleLoading"
							:disabled="googleLoading">
							<span class="icon"></span>
							<span class="buttonText">Log in with Google</span>
						</div>
						
					</div>
					Forgot your password? <a href="#">Reset it here.</a><br>
				</div>
			</form>
		</div>

		<div class="c-modalLogin" v-if="modalTypeProps === 'modalLogin'">
			<form v-if="!user" @submit.prevent>
				<h2>Login</h2>
				<div>
					<label for="name">Email</label>
					<input class="m-rounded" v-model="email" id="email" type="text" placeholder="Email" required>
				</div>

				<div>
					<label for="password">Password</label>
					<input class="m-rounded" v-model="password"  id="password" type="password" placeholder="******" required>
				</div>
				<div class="error" v-if="error">{{ error }}</div>
				<div>
					<button class="c-modalLogin__login m-rounded" @click="errorHandling('login')">
						LOG IN
					</button>
					<div id="c-customGoogleBtn"
						class="customGPlusSignIn m-rounded"
						v-if="googleReady"
						@click="googleSubmit"
						:loading="googleLoading"
						:disabled="googleLoading">
						<span class="icon"></span>
						<span class="buttonText">Log in with Google</span>
					</div>
				</div>

				<div class="c-modalLogin__smallPrint">New to GamersMusic? You can <a href="#">sign up here.</a>
					<br>
					Forgot your password? <a href="#">Reset it here.</a><br>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
import AuthenticationMixin from '../../mixins/authentication-mixin';

export default {
	name: `ModalLogin`,
	props: {
		modalTypeProps: {
			type: String
		}
	},
	mixins: [
		AuthenticationMixin
	],
	head () {
		return {
			script: [
				{ src: 'https://apis.google.com/js/platform.js?onload=renderButton' }
			],
			link: [
				{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap' }
			]
		}
  	},
	data() {
		return {
			email: '',
			password: '',
			name: '',
			error: ''
		};
	},
	computed: {
		user() { 
			return this.$store.state.auth.user;
		},
		users() { 
			return this.$store.state.user;
		}
	},
	methods: {
		...mapMutations('modal', [`hideModal`]),
		errorHandling(type) {
			if (type === 'register') {
				if (this.name.length < 3) {
					return this.error = 'Nickname should be at least 3 characters long.';
				} else {
					this.error = '';
				}
			}
			if (!/\S+@\S+\.\S+/.test(this.email)) {
				return this.error = 'This is not a valid email.';
			} else {
				this.error = '';
			}
			if (this.password.length < 6) {
				return this.error = 'Password needs to be at least 6 characters long.';
			} else {
				this.error = '';
			}
			if (this.error === '') {
				type === 'register' ? this.submitRegisterForm() : this.submitForm();
			}
		},
		async submitForm() {
			try {
				const result = await this.$store.dispatch('auth/login', {
					email: this.email,
					password: this.password
				});
				this.hideModal();
				this.router.push('/account');
			} catch(err) {
				this.email = '';
				this.password = '';
				this.error = 'Username Or Password is incorrect';
			}
		},
		async submitRegisterForm() {
			try {
				const result = await this.$store.dispatch('auth/register', {
					email: this.email,
					password: this.password,
					name: this.name
				});
				this.hideModal();
			} catch(err) {
				this.email = '';
				this.password = '';
				this.error = 'Something went wrong please try again';
			}
			
		}
	},
};
</script>

<style lang="scss">
	.c-modalLogin, .c-modalRegister {
		> :not(:first-child) {
			margin-top: 1em;
		}

		&__login {
			background-color: $primary-red;
			width: 100%;
			margin-bottom: 2rem;

			&:hover {
				box-shadow: 0px 0px 7px 1px rgba(189,189,189,1);
				// background-color: $primary-blue-dark;
			}
		}

		&__google {
			background-color: $primary-red;
		}

		form {
			h3, h2 {
				color: $primary-red;
				margin-top: 0;
			}
		
			input {
				width: 100%;
				padding: 8px 10px;
				border-color: #bdc7d8;
				border: 1px solid #ccd0d5;
				margin-bottom: 1rem;
			}

			button {
				margin-top: 1rem;
				padding: 0.75rem 1rem;
				color: $primary-white;
			}

			a {
				margin-top: 1rem;
				font-weight: bold;
				color: $primary-red;
			}
		}

		&__smallPrint {
			text-align: center;
			font-size: 0.9rem;
		}
	}

	.error {
		color: $primary-red;
	}

	#c-customGoogleBtn {
		display: inline-block;
		color: #444;
		width: 100%;
		border: thin solid #888;
		box-shadow: 1px 1px 1px grey;
		white-space: nowrap;
		margin-bottom: 2rem;

		&:hover {
			cursor: pointer;
			border: thin solid #666;
		}

		span.label {
			font-family: serif;
			font-weight: normal;
		}
		span.icon {
			background: url('https://developers-dot-devsite-v2-prod.appspot.com/identity/sign-in/g-normal.png') transparent 5px 50% no-repeat;
			display: inline-block;
			vertical-align: middle;
			width: 42px;
			height: 42px;
			background-clip: white;
		}
		span.buttonText {
			position: relative;
			width: 100%;
			display: inline-block;
			vertical-align: middle;
			text-align: center;
			padding-right: 69px;
			font-size: 14px;
			font-family: 'Roboto', sans-serif;
		}
	}
</style>

