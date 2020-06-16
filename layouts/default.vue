<template>
  <div>
    <AppModal />
    <navigationMobile v-if="isMobile" />
    <navigation v-else />
    <nuxt />
    <FooterGM />
  </div>
</template>

<script>
import AppModal from "../components/AppModal";
import navigation from "../components/navigation";
import navigationMobile from "../components/navigationMobile";
import FooterGM from "../components/FooterGM";

export default {
  components: {
    AppModal,
    navigationMobile,
    navigation,
    FooterGM
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    }
  }
};
</script>

