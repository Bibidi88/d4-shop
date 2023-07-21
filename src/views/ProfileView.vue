<template>
<div class="about">
    <h1>This is an Profile page</h1>
</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push("/login");
    }
  },
}
</script>