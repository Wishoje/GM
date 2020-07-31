<template>
    <div v-if="twitchData">
        AAAA {{ twitchData }}
    </div>
</template>

<script>
export default {
    name: 'TwitchIndex',
    data() {
        return {
            twitchData: null
        }
    },
    created() {
        this.getTwitchData();
    },
    methods: {
        async getTwitchData() {
            try {
                const result = await this.$axios.get('/api/twitch');
                console.log('client' + result);
                this.twitchData = result;
            } catch(error) {
                console.log('Error :', error);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
