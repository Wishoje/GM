<template>
    <div class="c-loved-lists">
        <carousel :isMain="true"/>
    </div>
</template>

<script>
import Carousel from '../components/ui/Carousel';
export default {
    name: 'lovedLists',
    components: {
		Carousel
    }
}
</script>

<style scoped lang="scss">
    .c-loved-lists {
        background-color: $primary-purple;
        min-height: 680px;
    }
</style>