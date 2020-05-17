<template>
    <div class="c-profile-wrapper">
        <div>
            <span>Name: {{ user.name }}</span>
        </div>
        <div>
            <span>Email: {{ user.email }}</span>
        </div>
        <div>
            <span>Followers: {{ user.followers }}</span>
        </div>
        <div>
            <span>Playlists: {{ user.playlists }}</span>
        </div>
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
        }
    }
</script>

<style lang="scss" scoped>
    .c-profile-wrapper {
        background: linear-gradient(red 40%, transparent 40%) no-repeat;
        min-height: 800px;
    }
</style>