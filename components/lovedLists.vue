<template>
    <div class="c-lovedLists">
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
</style>