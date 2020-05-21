<template>
  <div class="c-modalLogin">

    <form v-if="!user" @submit.prevent="submitForm">
      <h3>
        Login
      </h3>
      <div>
        <label for="name">Email</label>
        <input
          class="m-rounded"
          v-model="email"
          id="email"
          type="text"
          placeholder="Email">
      </div>

      <div>
        <label for="password">Password</label>
        <input 
          class="m-rounded"
          v-model="password" 
          id="password"
          type="password"
          placeholder="******">
      </div>

      <div>
        <button
          class="c-modalLogin__login m-rounded" type="submit">
          Login
        </button>
        <div class="g-signin2"
              data-onsuccess="onSignIn"
              @click="googleSubmit"
              :loading="googleLoading"
              :disabled="googleLoading">
        </div>
        <!-- <button
          class="c-modalLogin__google m-rounded"
          v-if="googleReady" @click="googleSubmit" :loading="googleLoading" :disabled="googleLoading">
          Log in with Google
        </button> -->
      </div>

      <a href="#">
          Forgot Password?
      </a><br>
      <div v-if="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import AuthenticationMixin from '../../mixins/authentication-mixin';

  export default {
    name: `ModalLogin`,
    mixins: [
        AuthenticationMixin
    ],
    data() {
        return {
            email: '',
            password: '',
            error: ''
        };
    },
    computed: {
        user() { 
            return this.$store.state.auth.user;
        }
    },
    methods: {
      ...mapMutations('modal', [`hideModal`]),
      async submitForm() {
        try {
          const result = await this.$store.dispatch('auth/login', {
              email: this.email,
              password: this.password
          });
          console.log(`User with email: ${this.email} is logged in.`);
          this.hideModal();
          this.router.push('/account');
        } catch(err) {
          this.email = '';
          this.password = '';
          this.error = 'Username Or Password is incorrect';
        }
      }
    },
  };
</script>

<style lang="scss">
  .c-modalLogin {
    > :not(:first-child) {
      margin-top: 1em;
    }

    &__login {
      background-color: $primary-blue;
    }

    &__google {
      background-color: $primary-red;
    }

    form {
      h3 {
        color: $primary-grey;
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
        color: $primary-blue;
      }
    }
  }
</style>

