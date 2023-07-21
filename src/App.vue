<template>
  <Sidebar></Sidebar>
  <div id="main" :style="{ 'margin-left': sidebarWidthPadding }">
    <LoginModal :isLoginOpen="isLoginOpen"
    ></LoginModal>
    <router-view/>
  </div>
</template>

<script>
import Sidebar from "@/components/sidebar/Sidebar";
import LoginModal from "@/components/modal/LoginModal";

import { sidebarWidthPadding } from "@/components/sidebar/state";

export default {
  data() {
    return {
      isLoginOpen: false,
    };
  },
  components: {
    Sidebar,
    LoginModal,
  },
  computed() {
    this.$store.LoginModal
    console.log(this.$store.LoginModal)
  },
  setup() {
    return {
      sidebarWidthPadding,
    };
  },
  methods: {
  },
};
</script>

