<template>
	<button class="button">
		{{text}}
	</button>
</template>

<script>
	export default {
		name: 'commonButton',
		props: {
			text: String
		}
	}
</script>

<style lang="scss" scoped>
	.button {
		background-color: $primary-red;
		color: black;
		text-align: center;
		margin-top: 3rem;
		padding: 1rem 2rem;
		border-radius: 0.2rem;
	}
</style>