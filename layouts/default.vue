<template>
  <div>
    <AppModal />
    <navigationMobile v-if="isMobile" />
    <navigation v-else />
    <nuxt />
    <footer />
  </div>
</template>

<script>
import AppModal from "../components/AppModal";
import navigation from "../components/navigation";
import navigationMobile from "../components/navigationMobile";
import footer from "../components/footer";

export default {
  components: {
    AppModal,
    navigationMobile,
    navigation,
    footer
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    }
  }
};
</script>

