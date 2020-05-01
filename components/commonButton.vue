<template>
	<button class="c-button m-font-bold">
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
	.c-button {
		background-color: $primary-red;
		color: $primary-black;
		text-align: center;
		margin-top: 3rem;
		padding: 1rem 2rem;
		border-radius: 0.2rem;
	}
</style>