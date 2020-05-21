<template>
  <div class="c-modalRegister">
    <form @submit.prevent="submitForm">
      <div>
          Create Account
      </div>
      <div>
        <label for="email">
            NickName
        </label>
        <input 
          v-model="name"
          id="name"
          type="text"
          placeholder="name">
      </div>
      <div>
        <label for="email">
            Email
        </label>
        <input 
          v-model="email"
          id="email"
          type="text"
          placeholder="Email">
      </div>
      <div>
        <label for="password">
            Password
        </label>
        <input 
          v-model="password" 
          id="password"
          type="password"
          placeholder="******">
      </div>
      <div>
        <button
          class="c-modalRegister__register"
          @click="submitForm"
        >
          Create Account
        </button>
        <a class="c-modalRegister__forgetPassword" href="#">
            Forgot Password?
        </a>
      </div><br><br>
      <div v-if="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  console.log('mapMutations :', mapMutations);

  export default {
    name: `ModalRegister`,
    data() {
      return {
        email: '',
        password: '',
        name: '',
        error: ''
      };
    },
    computed: {
      users() { 
        return this.$store.state.user;
      }
    },
    methods: {
      ...mapMutations('modal', [`hideModal`]),
      async submitForm() {
        try {
          const result = await this.$store.dispatch('auth/register', {
            email: this.email,
            password: this.password,
            name: this.name
          });
        } catch(err) {
          this.email = '';
          this.password = '';
          this.error = 'Something went wrong please try again';
        }
        this.hideModal();
      }
    }
  };
</script>

<style lang="scss">
  .c-modalRegister {
    > :not(:first-child) {
      margin-top: 1em;
    }

    input {
      width: 100%;
    }
  }
</style>