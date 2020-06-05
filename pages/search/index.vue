<template>
	<main>
        <filterSearch :categoryQueryId="categoryId" :categoryQueryName="categoryName" :categories="categories"/>
	</main>
</template>

<script>
import filterSearch from '../../components/filterSearch';

export default {
    name: 'search',
    data() {
        return {
            categoryId: [],
            categoryName: [],
            categories: []
        }
    },
    components: {
        filterSearch
    },
    async asyncData({$axios, route, error}) {
        try {
            let categoryQueryId = [];
            let categoryQueryName = [];
            if (route.query.categoryId && route.query.categoryName) {
                categoryQueryId.push(parseInt(route.query.categoryId));
                categoryQueryName.push(route.query.categoryName);
            }
            const categoriesData = await $axios.get('/api/categories');
            return {
                categoryId: categoryQueryId,
                categoryName: categoryQueryName,
                categories: categoriesData.data
            }
        } catch(error) {
				console.log('Error :', error);
        }
    }
}
</script>
<style lang="scss" scoped>
</style>