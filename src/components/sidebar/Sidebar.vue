<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <img
          alt="Vue logo"
          :style="{ 'max-width': sidebarWidth }"
          src="@/assets/DiabloIV.png"
        />
      </span>
      <span v-else
        ><img
          alt="Vue logo"
          :style="{ 'max-width': sidebarWidth }"
          src="@/assets/DiabloIV.png"
      /></span>
    </h1>

    <SidebarLink to="/" icon="fas fa-home">Home</SidebarLink>
    <SidebarLink to="/shop" icon="fas fa-shop">Shop</SidebarLink>
    <SidebarLink v-if="isLoggedIn"  to="/myItems" icon="fas fa-chart-bar">My Items</SidebarLink>
    <SidebarLink   to="/about" icon="fas fa-image">About</SidebarLink>
    <SidebarLink v-if="isLoggedIn" to="/profile" icon="fas fa-user">Profile</SidebarLink>
    <a v-if="!isLoggedIn" icon="fas fa-user" class="link" @click="loginModal"><i class="fas fa-user icon"></i>
      <transition name="fade">
        <span v-if="!collapsed">
            Login
        </span>
    </transition>
    </a>

    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fas fa-angle-double-left"></i>
    </span>
  </div>
</template>

<script>
import SidebarLink from "./SidebarLink";
import { mapGetters } from "vuex";

import { collapsed, toggleSidebar, sidebarWidth } from "./state";

export default {
  name: "vue-Sidebar",
  props: {},
  components: {
    SidebarLink,
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  methods: {
    loginModal() {
      this.$store.commit("setLoginModal", true);
    }
  },
  setup() {
    const logedin = true;
    return {
      collapsed,
      toggleSidebar,
      sidebarWidth,
      logedin,
    };
  },
};
</script>