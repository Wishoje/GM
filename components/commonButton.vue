<template>
	<button :type="buttonType" class="c-button m-font-bold">
		{{text}}
	</button>
</template>

<script>
	export default {
		name: 'commonButton',
		props: {
			text: {
				type: String,
				required: true
			},
			buttonType: {
				type: String,
				default: "button"
			}
		}
	}
</script>

<style lang="scss">
	.c-button {
		background-color: $primary-red;
		color: $primary-black;
		text-align: center;
		padding: 0.5rem 4rem;
		border-radius: 0.2rem;
		margin-top:0.2rem;
	}
</style>