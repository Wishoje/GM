<template>
	<button class="commonButton">
		{{text}}
	</button>
</template>

<script>
	export default {
		name: 'commonButton',
		props: {
			text: String
		}
		// data() {
		// 	return {
		// 			text: 'Hello World'
		// 	}
		// }
	}
</script>

<style lang="scss" scoped>
	.commonButton {
		background-color: $primary-red;
		color: black;
		text-align: center;
		padding: 1rem 2rem;
		border-radius: 0.2rem;
	}
</style>