<template>
  <div>
    <navigation />
    <nuxt />
  </div>
</template>


<script>
	import navigation from '../components/navigation';

	export default {
		name: 'banner',
		components: {
			navigation
		}
	}
</script>