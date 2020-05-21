<template>
	<div>
		<AppModal />
		<navigation />
		<nuxt />
	</div>
</template>


<script>
	import AppModal from '../components/AppModal';
	import navigation from '../components/navigation';

	export default {
		components: {
			AppModal,
			navigation
		}
	}
</script>