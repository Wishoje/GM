<template>

    <nav>
    <img class="logo" src="#" alt="logo">
    <ul class="c-links">
    <li> <a class="cat-link" href="#"><button><span>Categories</span></button></a></li>
    <li> <a class="login-link" href="#"><button><span>Login</span></button></a></li>
    <li> <a class="join-link" href="#"><button><span>JOIN</span></button></a></li>
    </ul>
    </nav>
</template>

<script>
	export default {
		name: 'navigation',
        methods: {
            async logout() {
                try { 
                    const result = await this.$axios.post('/api/logout');
                    this.$store.commit('SET_USER', null);
                } catch(err) {
                    throw new Error(err);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@media(min-width:768px) {

}
nav {
  font-family:Arial;
  font-size:1rem;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items:center;
  padding: 1.6875rem 9.6rem;

}
.c-links li {
  display:inline-block;
}

.cat-link {
  transition: all 0.3s ease 0s;
  color:red;
  padding: 1.3125rem;
}
.cat-link:hover span{
  color:red;
  font-weight:bold;
  text-decoration:underline;

}

.login-link {
  transition: all 0.3s ease 0s;
  color:white;
    padding: 0.5625rem;

}

.login-link:hover span{
  color:white;
  font-weight:bold;
  text-decoration:underline;
}

.join-link {
  justify-content:flex-end;
  transition: all 0.3s ease 0s;
  color: black;
  background-color: red;
  padding:0.4375rem 0.5625rem;
  border-radius: 0.2rem;
  background-clip: border-box;
  
}
.join-link:hover span{
  color:black;
  font-weight:bold;
  text-decoration:underline;
}

.logo {
  color:black;
  justify-content:flex-start;
  background-color:red;
  background-clip: border-box;
  padding:0.8125rem 5.8125rem;
  border-radius: 0.2rem; 
}

</style>