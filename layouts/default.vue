<template>
	<div>
		<AppModal />
		<navigationMobile v-if="$device.isMobile" />
		<navigation v-else />
		<nuxt />
	</div>
</template>

<script>
	import AppModal from '../components/AppModal';
	import navigation from '../components/navigation';
	import navigationMobile from '../components/navigationMobile';

	export default {
		components: {
			AppModal,
			navigationMobile,
			navigation
		}
	}
</script>

