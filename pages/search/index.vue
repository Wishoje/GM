<template>
	<div>
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline" :class="{'bg-pink-500': categoryQueryName.includes('Witcher') }" @click="test">
            Withcer
        </button>
        {{ categoryQueryId }}
	</div>
</template>

<script>
import commonButton from '../../components/commonButton';
export default {
    name: 'search',
    data() {
        return {
            categoryQueryId: [],
            categoryQueryName: []
        }
    },
    created() {
        if (this.$route.query.categoryId && this.$route.query.categoryName) {
            this.categoryQueryId.push(this.$route.query.categoryId);
            this.categoryQueryName.push(this.$route.query.categoryName);
        }
    },
    methods: {
        test() {
            const fakeCategoryId = 18;
            const fakeCategoryName = 'Witcher'
            if (!this.categoryQueryId.includes(fakeCategoryId) && !this.categoryQueryName.includes(fakeCategoryName)) {
                this.categoryQueryId.push(fakeCategoryId);
                this.categoryQueryName.push(fakeCategoryName);
            } else {
                this.categoryQueryId.pop(fakeCategoryId);
                this.categoryQueryName.pop(fakeCategoryName);
            }
            this.$router.push({query: {categoryId: this.categoryQueryId.slice(0), categoryName: this.categoryQueryName.slice(0)}});
        },
    },
    async asyncData({$axios, route, store, params, query, req, res, redirect, error}) {
        const util = require('util');
		console.log('STORE ' + util.inspect(route.query, false, null, true /* enable colors */));
    },
}
</script>
<style lang="scss">
</style>