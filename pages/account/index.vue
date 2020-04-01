<template>
    <div>
        <h1>Profile Page</h1>
    </div>
</template>

<script>
    export default {
        name: 'account',
        asyncData({store, redirect}) {
            if (!store.state.user || store.state.user.isAuthenticated === false) {
                return redirect('/registration');
            }
        },
    }
</script>

<style lang="scss" scoped>
</style>