<template>
  <div>
    <AppModal />
    <navigationMobile v-if="isMobile" />
    <navigation v-else />
    <nuxt class="main"/>
    <FooterGM />
    <cookieBanner />
  </div>
</template>

<script>
import AppModal from "../components/AppModal";
import navigation from "../components/navigation";
import navigationMobile from "../components/navigationMobile";
import FooterGM from "../components/FooterGM";
import cookieBanner from "../components/cookieBanner";

export default {
  components: {
    AppModal,
    navigationMobile,
    navigation,
    FooterGM,
    cookieBanner
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    }
  }
};
</script>
<style lang="scss" scoped>

.main {
    min-height: calc(100vh - 428px);
}

@media #{$mq-tablet} {
	.main {
		min-height: calc(100vh - 200px);
	}
}

@media #{$mq-mobile} {
	.main {
		min-height: calc(100vh - 200px);
	}
}

@media #{$mq-mobile-portrait} {
	.main {
		min-height: calc(100vh);
	}
}
</style>

