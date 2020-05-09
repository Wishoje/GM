<template>
    <div>
        <h1>Profile Page</h1>
        {{ user }}
    </div>
</template>

<script>
    export default {
        name: 'account',
        computed: {
            user() { 
                return this.$store.state.auth.user;
            }
        },
        asyncData({store, redirect}) {
            if (!store.state.auth.user) {
                return redirect('/registration');
            }
        },
    }
</script>

<style lang="scss" scoped>
</style>